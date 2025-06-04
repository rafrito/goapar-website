// Exemplo: src/data/testimonials.ts
export interface Testimonial {
  id: string;
  quote: string; // O depoimento em si
  authorName: string;
  authorTitle: string;
  authorImage?: string; // URL da imagem do autor (opcional)
  rating?: number; // Número de estrelas (0-5)
}

export const awerTestimonials: Testimonial[] = [
  {
    id: '1',
    quote: "Designers precisam ter um forte entendimento dos princípios do design para criar soluções eficazes. Eles também devem estar cientes das últimas tendências e tecnologias para que possam se manter à frente.",
    authorName: 'Jane Doe',
    authorTitle: 'CEO da Inkyy.com',
    authorImage: 'https://placehold.co/100x100/E2E8F0/4A5568?text=JD', // Placeholder
    rating: 5,
  },
  {
    id: '2',
    quote: "A Awer transformou nossa presença online! O novo site é rápido, moderno e nossos leads aumentaram significativamente. Excelente trabalho de consultoria e desenvolvimento.",
    authorName: 'Carlos Silva',
    authorTitle: 'Diretor da TechSolutions',
    authorImage: 'https://placehold.co/100x100/CBD5E0/2D3748?text=CS',
    rating: 5,
  },
  {
    id: '3',
    quote: "O crawler desenvolvido pela Awer economizou horas de trabalho manual para nossa equipe. A precisão e a velocidade da coleta de dados são impressionantes.",
    authorName: 'Ana Pereira',
    authorTitle: 'Gerente de Operações na DataCorp',
    // authorImage: 'url_da_imagem_da_ana.jpg',
    rating: 4,
  },
  // Adicione mais depoimentos
];