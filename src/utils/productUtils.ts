export const COLOR_NAME_TO_HEX_MAP: Record<string, string> = {
    // Cores básicas que você já tinha
    "BEGE": "#F5F5DC",
    "OURO ROSA": "#B76E79", // Mantendo o nome composto, se for assim no Shopify
    "PRETO": "#000000",
    "BRANCO": "#FFFFFF",
    "VERMELHO": "#FF0000",
    "AZUL": "#0000FF",

    // Adicionando mais cores comuns
    "CINZA": "#808080",
    "CINZA CLARO": "#D3D3D3",
    "CINZA ESCURO": "#A9A9A9",
    "PRATA": "#C0C0C0",
    "DOURADO": "#FFD700", // Gold
    "AMARELO": "#FFFF00",
    "AMARELA": "#FFFF00",
    "LARANJA": "#FFA500",
    "VERDE": "#008000",
    "VERDE CLARO": "#90EE90",
    "VERDE ESCURO": "#006400",
    "VERDE OLIVA": "#808000",
    "AZUL MARINHO": "#000080",
    "AZUL CELESTE": "#87CEEB", // Sky Blue
    "AZUL ROYAL": "#4169E1",
    "ROXO": "#800080", // Purple
    "LILÁS": "#C8A2C8", // Lilac
    "LAVANDA": "#E6E6FA",
    "ROSA": "#FFC0CB",
    "PINK": "#FF69B4", // Hot Pink
    "MAGENTA": "#FF00FF",
    "MARROM": "#A52A2A",
    "MARROM CLARO": "#D2B48C", // Tan (pode ser parecido com Bege)
    "MARROM ESCURO": "#8B4513", // SaddleBrown
    "CREME": "#FFFDD0",
    "CAQUI": "#F0E68C", // Khaki
    "SALMÃO": "#FA8072",
    "CORAL": "#FF7F50",
    "TURQUESA": "#40E0D0",
    "CIANO": "#00FFFF", // Cyan (parecido com Azul Celeste)
    "VIOLETA": "#EE82EE",

    // Cores mais específicas ou com nomes compostos (adapte aos seus produtos)
    "AZUL PETRÓLEO": "#008081", // Teal (pode ser um nome comum)
    "VERDE MUSGO": "#8FBC8F",
    "TERRACOTA": "#E2725B",
    "VINHO": "#722F37", // Burgundy/Wine
    "GRAFITE": "#36454F", // Charcoal
    "CHUMBO": "#727472", // Lead
    "NUDE": "#E3BC9A", // Exemplo, Nude pode ter muitas variações
    "GOLD": "#FFD700", // Gold (pode ser o mesmo que Dourado)
    "BRONZE": "#CD7F32", // Bronze

    // Se você tiver cores com nomes muito específicos do seu fornecedor, adicione-as:
    // "AZUL SERENITY": "#B0C4DE",
    // "VERDE MENTA": "#98FF98",
};


// NOVO: Mapeamento de Tamanhos (Shopify/Padrão para Exibição em Português)
export const SIZE_NAME_MAP: Record<string, string> = {
    // Chaves: Valores como podem vir do Shopify (ou seu padrão interno) - NORMALIZADOS PARA MAIÚSCULAS
    // Valores: Como você quer exibir
    "XS": "XP", // Extra Small -> Extra Pequeno
    "S": "P",  // Small -> Pequeno
    "M": "M",  // Medium -> Médio (mantém)
    "L": "G",  // Large -> Grande
    "XL": "XG", // Extra Large -> Extra Grande (ou GG)
    "XXL": "XXG",// Double Extra Large -> Duplo Extra Grande (ou XGG)
    "XXXL": "XXXG",// Triple Extra Large
  
    // Adicione outros tamanhos comuns ou específicos que você usa
    "EXTRA SMALL": "XP",
    "SMALL": "P",
    "MEDIUM": "M",
    "LARGE": "G",
    "EXTRA LARGE": "XG", // ou "GG"
    "DOUBLE EXTRA LARGE": "XXG", // ou "XGG"
  
    // Tamanhos numéricos (se vierem como string e você quiser um label)
    // "36": "36",
    // "38": "38",
    // "40": "40",
    // "42": "42",
    // "44": "44",
  
    // Tamanho único
    "ÚNICO": "Único",
    "ONE SIZE": "Único",
    "U": "Único",
  };
  




