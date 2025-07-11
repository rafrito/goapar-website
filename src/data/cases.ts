import { title } from "process";

export interface CasesProps {
    orientation: 'image-left' | 'image-right';
    image: string;
    product: string;
    tagLabel: string;
    description: string;
    link?: string
}


export const cases: CasesProps[] = [
    {
        orientation: 'image-left', // Imagem à direita, texto à esquerda
        image: 'cases/consultoria-2.svg', // Placeholder
        product: 'Consultoria Estratégica Integrada', // Título do pilar
        tagLabel: 'Consultoria', // Categoria
        description: 'Oferecemos uma visão 360º para o seu negócio, conectando planejamento comercial, prospecção, gestão financeira e otimização de processos para impulsionar seus resultados e garantir crescimento sustentável.',
        link: '/consultoria' // Link para a página principal de consultoria
    },
    {
        orientation: 'image-right', // Imagem à esquerda, texto à direita
        image: 'cases/tech.svg', // Placeholder
        product: 'Soluções Tecnológicas Sob Medida', // Título do pilar
        tagLabel: 'Tecnologia', // Categoria
        description: 'Desenvolvemos desde e-commerces headless de alta performance e landing pages otimizadas para conversão, até robôs de automação (crawlers) e aplicações web/desktop, utilizando as tecnologias mais modernas para transformar suas ideias em realidade.',
        link: '/tecnologia' // Link para a página principal de tecnologia/portfólio
    }
];

export const callToAction = {
    title: 'Clique para saber mais'
}
