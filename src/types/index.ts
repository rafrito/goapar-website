// SHOPIFY TYPES

export interface ShopifyCollection {
    id: string; // Ex: "gid://shopify/Collection/12345"
    title: string; // O nome da coleção (ex: "Camisetas")
    handle: string; // O slug para a URL (ex: "camisetas")
    descriptionHtml?: string | null; // Descrição da coleção (opcional)
    image?: ShopifyImage | null; // Imagem da coleção (opcional)
    // Adicione outros campos se precisar (ex: products(first: N) para pegar alguns produtos da coleção)
}

// Tipo para a resposta da query que busca múltiplas coleções
export interface CollectionsQueryResult {
    collections: {
        nodes: ShopifyCollection[];
    };
}


// Tipo básico para imagens
export interface ShopifyImage {
    url: string;
    altText?: string | null; // Pode ser null
    width?: number | null;
    height?: number | null;
}

// Tipo para dinheiro/preço
export interface MoneyV2 {
    amount: string; // Vem como string da API
    currencyCode: string; // Ex: "BRL", "USD"
}

// Tipo para opções selecionadas de uma variante (ex: Cor: Azul)
export interface SelectedOption {
    name: string;  // Ex: "Cor", "Tamanho"
    value: string; // Ex: "Azul", "M"
}

// Tipo para uma Variante do Produto
export interface ProductVariant {
    id: string; // ID da variante (ex: "gid://shopify/ProductVariant/123...")
    title: string; // Nome completo da variante (ex: "P / Azul")
    availableForSale: boolean; // Se tem estoque
    price: MoneyV2;
    image?: ShopifyImage | null; // Imagem específica da variante
    selectedOptions: SelectedOption[];
    // Você pode adicionar 'quantityAvailable' se pedir na query e tiver permissão
}

// Tipo para a faixa de preço do produto
export interface ProductPriceRange {
    minVariantPrice: MoneyV2;
    maxVariantPrice?: MoneyV2; // Opcional
}

// Tipo principal para o Produto
export interface ShopifyProduct {
    id: string; // ID do produto (ex: "gid://shopify/Product/456...")
    title: string;
    handle: string; // Slug para URL
    descriptionHtml?: string | null;
    vendor?: string | null; // Marca/Fabricante
    productType?: string | null;
    tags?: string[] | null;
    featuredImage?: ShopifyImage | null; // Imagem principal
    images?: { // Galeria de imagens adicionais
        nodes: ShopifyImage[];
    } | null;
    priceRange: ProductPriceRange;
    variants: { // Conexão de variantes
        nodes: ProductVariant[];
    };
    // Adicione outros campos que você busca na sua query GraphQL
}

// Tipo para a resposta da query que busca múltiplos produtos
export interface ProductsQueryResult {
    products: {
        nodes: ShopifyProduct[];
    };
}

// Tipo para a resposta da query que busca um único produto pelo handle
export interface ProductByHandleQueryResult {
    productByHandle: ShopifyProduct | null; // Pode ser null se não encontrar
}

// --- Tipos para o Carrinho (do CartContext) ---
// Repetindo aqui para referência, mas idealmente importe de CartContext.tsx

interface CartImage {
    url: string;
    altText?: string;
}

interface CartPrice {
    amount: string;
    currencyCode: string;
}

interface CartLineMerchandise {
    id: string; // ID da Variante
    title: string;
    product: {
        title: string;
        handle: string;
    };
    image?: CartImage;
}

export interface CartLine {
    id: string; // ID da Linha do Carrinho
    quantity: number;
    cost: {
        totalAmount: CartPrice;
    };
    merchandise: CartLineMerchandise;
}

interface CartCost {
    subtotalAmount: CartPrice;
    totalAmount: CartPrice;
    totalTaxAmount?: CartPrice;
}

export interface Cart {
    id: string; // ID do Carrinho
    lines: {
        nodes: CartLine[];
    };
    cost: CartCost;
    checkoutUrl: string;
    totalQuantity: number;
}

// Tipos para as funções de mutação do carrinho (do lib/shopify.ts)
export interface CartLineInput {
    merchandiseId: string; // ID da Variante
    quantity: number;
}

export interface CartLineUpdateInput {
    id: string; // ID da Linha do Carrinho
    quantity: number;
}

// Em algum arquivo de tipos, ou no próprio componente
export interface ColorOption {
    name: string; // Ex: "Bege", "Ouro rosa"
    hex?: string; // Opcional: código hexadecimal para a bolinha de cor
}