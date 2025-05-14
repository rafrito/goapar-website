// src/lib/shopify.ts
import { createStorefrontApiClient, type StorefrontApiClient } from '@shopify/storefront-api-client';
import { Cart } from '../contexts/cart-provider';
import { ShopifyCollection, ShopifyProduct } from '@/types';
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


export async function getProductTypes(): Promise<string[]> {
  // Query para buscar APENAS o productType de um número grande de produtos
  // Aumente 'first' se necessário, mas cuidado com limites da API e performance
  const query = `#graphql
    query GetProductTypes {
      products(first: 250) { # Busca até 250 produtos (limite máximo por requisição)
        nodes {
          productType
        }
        pageInfo { # Informação para paginação futura, se necessário
            hasNextPage
            endCursor
        }
      }
    }
  `;

  try {
    const { data, errors } = await client.request<{ products: { nodes: { productType: string }[] } }>(query);

    if (errors) {
      console.error("Erro GraphQL (getProductTypes):", errors);
      throw new Error(`Erro GraphQL ao buscar tipos de produto: ${JSON.stringify(errors)}`);
    }

    const allTypes = data?.products?.nodes
      .map(node => node.productType) // Pega apenas o productType de cada produto
      .filter(type => type && type.trim() !== ''); // Filtra tipos vazios ou nulos

    // Cria um Set para obter apenas os valores únicos e depois converte para array
    const uniqueTypes = Array.from(new Set(allTypes));

    console.log("Tipos de Produto Únicos Encontrados:", uniqueTypes);
    return uniqueTypes;

  } catch (error) {
    console.error("Erro ao buscar tipos de produto do Shopify:", error);
    return []; // Retorna array vazio em caso de erro
  }
}

export async function getCollections(first: number = 20): Promise<ShopifyCollection[]> {
  // Query GraphQL para buscar as coleções
  const query = `#graphql
    query GetCollections($first: Int!) {
      collections(first: $first) {
        nodes {
          id
          title
          handle
          descriptionHtml
          image {
            url
            altText
            width
            height
          }
        }
      }
    }
  `;

  try {
    // Executa a query usando o cliente oficial
    const { data, errors, extensions } = await client.request<{ collections: { nodes: ShopifyCollection[] } }>(query, {
      variables: { first }
    });

    // Verifica se houve erros específicos do GraphQL
    if (errors) {
      console.error("Erro GraphQL (getCollections):", errors);
      // Você pode querer tratar diferentes tipos de erros GraphQL aqui
      throw new Error(`Erro GraphQL ao buscar coleções: ${JSON.stringify(errors)}`);
    }

    // Retorna o array de nós (coleções) ou um array vazio se não houver dados
    return data?.collections?.nodes || [];

  } catch (error) {
    // Captura erros gerais (rede, parsing, etc.) ou os erros lançados acima
    console.error("Erro ao buscar coleções do Shopify (getCollections):", error);
    // Retorna um array vazio em caso de erro para não quebrar o frontend,
    // mas o erro foi logado para depuração.
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
