import { GestaoPageData } from "@/types";
import { whatsappLink } from "@/utils";

const pageData: GestaoPageData = {
    hero: {
        title: "Inteligência Financeira para Decisões Estratégicas",
        subtitle: "Alinhamos seus dados financeiros aos seus objetivos de negócio, transformando números em um roteiro claro para o crescimento sustentável.",
        ctaButton: "Fale com um Especialista",
    },
    // A MUDANÇA: Novos dados para as seções de serviço
    services: [
        {
            tagLabel: 'Fluxo de Caixa', // Categoria
            tagLabelColor: 'brand.500', // Categoria
            link:whatsappLink(),
            product: "Gestão Inteligente de Fluxo de Caixa",
            description: "Monitore entradas e saídas, otimize o capital de giro e garanta a saúde financeira da sua empresa com nosso sistema de gestão de fluxo de caixa.",
            image: "/gestao/fluxo-de-caixa.jpg",
            orientation: "image-right" // texto na direita, imagem na esquerda
        },
        {
            tagLabel: 'Estoque e Compras', // Categoria
            tagLabelColor: 'yellow.600', // Categoria
            link:whatsappLink(),
            product: "Gestão Inteligente de Estoque",
            description: "Controle seu estoque de forma eficiente, evitando perdas e otimizando o armazenamento. Gerencie suas compras de forma estratégica para não deixar o seu dinheiro parado",
            image: "/gestao/estoque-2.png",
            orientation: "image-left" // texto na esquerda, imagem na direita
        },
        {
            tagLabel: 'Gestão à Vista', // Categoria
            tagLabelColor: 'cadetBlue', // Categoria
            link:whatsappLink(),
            product: "Painel de Resultados",
            description: "Acompanhe seus principais indicadores de desempenho em tempo real e tome decisões mais assertivas. Visualize seus resultados de forma clara e objetiva.",
            image: "/gestao/dashboard.jpg",
            orientation: "image-right"
        },
        {
            tagLabel: 'Preço e Margens', // Categoria
            tagLabelColor: 'blue.600', // Categoria
            link:whatsappLink(),
            product: "Definição de Preços e Margens de Produtos",
            description: "Defina preços e margens de lucro de forma estratégica, garantindo que seu negócio seja rentável. Valorize seus  seus produtos e otimize seus ganhos.",
            image: "/gestao/compras.jpg",
            orientation: "image-left"
        }
    ]
};


export {pageData}