// src/lib/shopify.ts
import { createStorefrontApiClient, type StorefrontApiClient } from '@shopify/storefront-api-client';
import { Cart } from '../app/components/ui/cart-provider';
// Importe os tipos que você precisará para o carrinho (do seu CartContext)


// Configuração do Cliente
// =======================
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const shopifyDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const apiVersion = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_VERSION; // Ou a versão que você quer usar

if (!storefrontAccessToken || !shopifyDomain || !apiVersion) {
  throw new Error("Variáveis de ambiente Shopify (Storefront) não configuradas!");
}

const client: StorefrontApiClient = createStorefrontApiClient({
  storeDomain: `https://${shopifyDomain}`, // Precisa do https://
  apiVersion: apiVersion,
  publicAccessToken: storefrontAccessToken,
});

// --- Funções para Interagir com a API ---

// Função para buscar produtos
// Tipagem do retorno pode vir da biblioteca ou você pode criar a sua
interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  descriptionHtml: string;
  featuredImage?: { url: string; altText?: string };
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  variants: { nodes: any[] }; // Simplificado, idealmente tipar melhor
}

export async function getProducts(first: number = 10): Promise<ShopifyProduct[]> {
  const query = `
    query GetProducts($first: Int!) {
      products(first: $first) {
        nodes {
          id
          title
          handle
          descriptionHtml
          featuredImage {
            url
            altText
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          variants(first: 5) {
             nodes {
                id
                title
                availableForSale
                price { amount currencyCode }
                image { url altText }
                selectedOptions { name value }
             }
          }
        }
      }
    }
  `;

  try {
    // Usa o método 'request' do cliente oficial
    const { data, errors, extensions } = await client.request<{ products: { nodes: ShopifyProduct[] } }>(query, {
      variables: { first } // Passa variáveis aqui
    });

    if (errors) {
        console.error("Erro GraphQL (getProducts):", errors);
        throw new Error(JSON.stringify(errors)); // Lança erro com detalhes
    }
    // A biblioteca já pode tratar a estrutura { data: { products: { nodes: ... } } }
    return data?.products?.nodes || [];

  } catch (error) {
    console.error("Erro ao buscar produtos do Shopify:", error);
    return [];
  }
}

// --- Funções do Carrinho (adaptadas para o cliente oficial) ---

// Criar Carrinho
export async function createCart(): Promise<Cart | null> {
  const mutation = `#graphql
    mutation cartCreate {
      cartCreate {
        cart {
          id
          checkoutUrl
          cost { subtotalAmount { amount currencyCode } totalAmount { amount currencyCode } }
          lines(first: 100) { nodes { id quantity cost { totalAmount { amount currencyCode } } merchandise { ... on ProductVariant { id title product { title handle } image { url altText } price { amount currencyCode } } } } }
          totalQuantity
        }
        userErrors { field message }
      }
    }
  `; // Use #graphql para syntax highlighting se seu editor suportar
  try {
    const { data, errors } = await client.request<{ cartCreate: { cart: Cart } }>(mutation);
     if (errors) throw new Error(JSON.stringify(errors));
    return data?.cartCreate?.cart || null;
  } catch (error) {
    console.error("Erro Shopify - createCart:", error);
    return null;
  }
}

// Buscar Carrinho
export async function getCart(cartId: string): Promise<Cart | null> {
  const query = `#graphql
    query getCart($cartId: ID!) {
      cart(id: $cartId) {
        id checkoutUrl cost { subtotalAmount { amount currencyCode } totalAmount { amount currencyCode } } lines(first: 100) { nodes { id quantity cost { totalAmount { amount currencyCode } } merchandise { ... on ProductVariant { id title product { title handle } image { url altText } price { amount currencyCode } } } } } totalQuantity
      }
    }
  `;
  try {
    const { data, errors } = await client.request<{ cart: Cart }>(query, { variables: { cartId } });
     if (errors) throw new Error(JSON.stringify(errors));
    return data?.cart || null;
  } catch (error) {
    console.error("Erro Shopify - getCart:", error);
    return null;
  }
}

// Adicionar ao Carrinho
export async function addToCart(cartId: string, lines: any[]): Promise<Cart | null> {
  const mutation = `#graphql
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart { id checkoutUrl cost { subtotalAmount { amount currencyCode } totalAmount { amount currencyCode } } lines(first: 100) { nodes { id quantity cost { totalAmount { amount currencyCode } } merchandise { ... on ProductVariant { id title product { title handle } image { url altText } price { amount currencyCode } } } } } totalQuantity }
        userErrors { field message }
      }
    }
  `;
  try {
    const { data, errors } = await client.request<{ cartLinesAdd: { cart: Cart } }>(mutation, { variables: { cartId, lines } });
     if (errors) throw new Error(JSON.stringify(errors));
    // Verifique data?.cartLinesAdd?.userErrors aqui se quiser tratamento mais fino
    return data?.cartLinesAdd?.cart || null;
  } catch (error) {
    console.error("Erro Shopify - addToCart:", error);
    return null;
  }
}

// Remover do Carrinho
export async function removeFromCart(cartId: string, lineIds: string[]): Promise<Cart | null> {
   const mutation = `#graphql
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart { id checkoutUrl cost { subtotalAmount { amount currencyCode } totalAmount { amount currencyCode } } lines(first: 100) { nodes { id quantity cost { totalAmount { amount currencyCode } } merchandise { ... on ProductVariant { id title product { title handle } image { url altText } price { amount currencyCode } } } } } totalQuantity }
        userErrors { field message }
      }
    }
  `;
   try {
    const { data, errors } = await client.request<{ cartLinesRemove: { cart: Cart } }>(mutation, { variables: { cartId, lineIds } });
     if (errors) throw new Error(JSON.stringify(errors));
    return data?.cartLinesRemove?.cart || null;
  } catch (error) {
    console.error("Erro Shopify - removeFromCart:", error);
    return null;
  }
}

// Atualizar Quantidade
export async function updateCartQuantity(cartId: string, lines: any[]): Promise<Cart | null> {
     const mutation = `#graphql
    mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart { id checkoutUrl cost { subtotalAmount { amount currencyCode } totalAmount { amount currencyCode } } lines(first: 100) { nodes { id quantity cost { totalAmount { amount currencyCode } } merchandise { ... on ProductVariant { id title product { title handle } image { url altText } price { amount currencyCode } } } } } totalQuantity }
        userErrors { field message }
      }
    }
  `;
   try {
    const { data, errors } = await client.request<{ cartLinesUpdate: { cart: Cart } }>(mutation, { variables: { cartId, lines } });
     if (errors) throw new Error(JSON.stringify(errors));
    return data?.cartLinesUpdate?.cart || null;
  } catch (error) {
    console.error("Erro Shopify - updateCartQuantity:", error);
    return null;
  }
}

// Função para criar URL de checkout (mantida)
export async function createCheckoutUrl(cartId: string): Promise<string | null> {
    const cartData = await getCart(cartId);
    return cartData?.checkoutUrl || null;
}
