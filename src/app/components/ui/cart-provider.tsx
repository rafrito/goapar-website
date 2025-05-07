// src/contexts/CartContext.tsx
'use client'; // Context providers com estado geralmente precisam ser Client Components

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
// Importe as funções que farão as chamadas à API Storefront
import {
  createCart,
  getCart,
  addToCart,
  removeFromCart,
  updateCartQuantity,
  createCheckoutUrl, // Você criará estas funções em shopify.ts (próximo passo)
} from '@/lib/shopify'; // Ajuste o caminho para onde você criará seu helper shopify

// --- Interfaces (Baseadas na Shopify Storefront API Cart) ---
// Adapte estas interfaces conforme a resposta exata da sua API
interface CartImage {
  url: string;
  altText?: string;
}

interface CartPrice {
  amount: string; // Preços geralmente vêm como string da API
  currencyCode: string;
}

interface CartLineMerchandise {
  id: string; // ID da Variante do Produto (ex: gid://shopify/ProductVariant/12345)
  title: string; // Nome da Variante
  product: {
    title: string; // Nome do Produto
    handle: string; // Slug do Produto
  };
  image?: CartImage;
}

export interface CartLine {
  id: string; // ID da linha do carrinho (ex: gid://shopify/CartLine/abcde)
  quantity: number;
  cost: {
    totalAmount: CartPrice; // Custo total desta linha (preço unitário * quantidade)
  };
  merchandise: CartLineMerchandise;
}

interface CartCost {
  subtotalAmount: CartPrice;
  totalAmount: CartPrice;
  totalTaxAmount?: CartPrice; // Opcional
}

export interface Cart {
  id: string; // ID do Carrinho (ex: gid://shopify/Cart/xyz123)
  lines: {
    nodes: CartLine[]; // A API geralmente retorna as linhas em 'nodes' ou 'edges'
  };
  cost: CartCost;
  checkoutUrl: string; // URL para redirecionar para o checkout do Shopify
  totalQuantity: number; // Quantidade total de itens
}

// --- Interface para o Valor do Contexto ---
interface CartContextType {
  cart: Cart | null; // O objeto do carrinho (ou null se não houver/carregando)
  cartId: string | null; // O ID do carrinho, para persistência
  isLoading: boolean; // Para indicar carregamento (ex: ao adicionar/remover)
  error: string | null; // Para armazenar erros
  addItem: (variantId: string, quantity: number) => Promise<void>; // Adiciona item
  removeItem: (lineId: string) => Promise<void>; // Remove item pela ID da linha
  updateItemQuantity: (lineId: string, quantity: number) => Promise<void>; // Atualiza quantidade
  initiateCheckout: () => Promise<string | null>; // Inicia o checkout e retorna a URL
  clearCartState: () => void; // Limpa o estado local (ex: após logout)
}

// --- Criação do Contexto ---
const CartContext = createContext<CartContextType | undefined>(undefined);

// --- Componente Provider ---
export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [cartId, setCartId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Começa carregando
  const [error, setError] = useState<string | null>(null);

  // Função para buscar ou criar carrinho ao iniciar
  const initializeCart = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    let currentCartId = localStorage.getItem('shopify_cart_id');

    try {
      if (currentCartId) {
        // Tenta buscar o carrinho existente
        const existingCart = await getCart(currentCartId);
        if (existingCart) {
          setCart(existingCart);
          setCartId(currentCartId);
        } else {
          // Se o carrinho antigo não for encontrado (ex: expirou), cria um novo
          localStorage.removeItem('shopify_cart_id');
          currentCartId = null; // Força a criação de um novo
        }
      }

      // Se não havia ID ou o carrinho antigo não foi encontrado
      if (!currentCartId) {
        const newCart = await createCart();
        if (newCart) {
          setCart(newCart);
          setCartId(newCart.id);
          localStorage.setItem('shopify_cart_id', newCart.id);
        } else {
            throw new Error("Falha ao criar um novo carrinho.");
        }
      }
    } catch (err: any) {
      console.error('Erro ao inicializar o carrinho:', err);
      setError(err.message || 'Erro ao carregar carrinho.');
      // Limpa ID inválido se houver erro ao buscar
      if (currentCartId) localStorage.removeItem('shopify_cart_id');
      setCartId(null);
      setCart(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Efeito para inicializar o carrinho quando o provider monta
  useEffect(() => {
    initializeCart();
  }, [initializeCart]);

  // --- Funções de Manipulação (Chamadas à API + Atualização do Estado) ---

  const addItem = useCallback(async (variantId: string, quantity: number) => {
    setIsLoading(true);
    setError(null);
    let currentCartId = cartId;

    try {
      // Se não houver carrinho ainda, cria um primeiro
      if (!currentCartId) {
        const newCart = await createCart();
        if (!newCart) throw new Error("Não foi possível criar o carrinho para adicionar o item.");
        currentCartId = newCart.id;
        setCartId(newCart.id);
        localStorage.setItem('shopify_cart_id', newCart.id);
      }

      // Adiciona o item ao carrinho (existente ou recém-criado)
      const updatedCart = await addToCart(currentCartId, [{ merchandiseId: variantId, quantity }]);
      setCart(updatedCart); // Atualiza o estado local com a resposta da API
    } catch (err: any) {
      console.error('Erro ao adicionar item ao carrinho:', err);
      setError(err.message || 'Erro ao adicionar item.');
    } finally {
      setIsLoading(false);
    }
  }, [cartId]);

  const removeItem = useCallback(async (lineId: string) => {
    if (!cartId) return; // Não faz nada se não houver carrinho
    setIsLoading(true);
    setError(null);
    try {
      const updatedCart = await removeFromCart(cartId, [lineId]);
      setCart(updatedCart);
    } catch (err: any) {
      console.error('Erro ao remover item do carrinho:', err);
      setError(err.message || 'Erro ao remover item.');
    } finally {
      setIsLoading(false);
    }
  }, [cartId]);

  const updateItemQuantity = useCallback(async (lineId: string, quantity: number) => {
    if (!cartId || quantity < 1) return; // Quantidade mínima é 1
    setIsLoading(true);
    setError(null);
    try {
      const updatedCart = await updateCartQuantity(cartId, [{ id: lineId, quantity }]);
      setCart(updatedCart);
    } catch (err: any) {
      console.error('Erro ao atualizar quantidade do item:', err);
      setError(err.message || 'Erro ao atualizar quantidade.');
    } finally {
      setIsLoading(false);
    }
  }, [cartId]);

  const initiateCheckout = useCallback(async (): Promise<string | null> => {
    if (!cart?.checkoutUrl) {
        setError("Não é possível iniciar o checkout.");
        return null;
    }
    // A URL já está no estado 'cart'
    return cart.checkoutUrl;
  }, [cart]);

  const clearCartState = useCallback(() => {
    setCart(null);
    setCartId(null);
    localStorage.removeItem('shopify_cart_id');
    console.log("Estado do carrinho local limpo.");
  }, []);


  // --- Valor fornecido pelo Contexto ---
  const value = {
    cart,
    cartId,
    isLoading,
    error,
    addItem,
    removeItem,
    updateItemQuantity,
    initiateCheckout,
    clearCartState,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// --- Hook Customizado para usar o Contexto ---
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

