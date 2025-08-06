// Em um arquivo de dados, ou diretamente no componente onde for usar

export interface Service {
  id: string;
  title: string; // Título principal do serviço
  subtitle?: string; // Um subtítulo ou slogan curto (opcional)
  description: string; // Descrição mais detalhada
  category: 'Tecnologia' | 'Consultoria'; // Para filtrar ou agrupar
  image?: string; // Opcional: nome de um ícone (ex: 'RocketLaunch', 'ChartLineUp')
  link?: string; // Opcional: link para uma página de detalhes do serviço
}

export const awerServices: Service[] = [
  // --- Serviços de Tecnologia ---
  {
    id: 'headless-ecommerce',
    title: 'E-commerce Headless Personalizado',
    subtitle: 'Lojas virtuais únicas, rápidas e integradas.',
    description: 'Desenvolvemos frontends de e-commerce sob medida com Next.js, proporcionando design exclusivo e performance superior, integrados a plataformas robustas como Shopify para gestão de produtos, pedidos e pagamentos.',
    category: 'Tecnologia',
    image: 'Ecommerce.jpg',
    link: '/tecnologia/ecommerce',
  },
  {
    id: 'web-crawlers',
    title: 'Desenvolvimento de Crawlers Web',
    subtitle: 'Extraia dados públicos da web de forma automatizada.',
    description: 'Criamos soluções de web scraping (crawlers com Puppeteer e Node.js) para coletar dados públicos, monitorar informações de mercado e automatizar a obtenção de dados para sua empresa.',
    category: 'Tecnologia',
    image: 'Crawler.jpg',
    link: '/tecnologia/crawlers',
  },
  {
    id: 'landing-pages',
    title: 'Landing Pages de Alta Conversão',
    subtitle: 'Páginas focadas em resultados para suas campanhas.',
    description: 'Design e desenvolvimento de Landing Pages otimizadas (Next.js, Chakra UI) para capturar leads, promover produtos ou serviços específicos, com foco em usabilidade, performance e conversão.',
    category: 'Tecnologia',
    image: 'LandingPage.jpg',
    link: '/tecnologia/landing-pages',
  },
  {
    id: 'aplicativos-web',
    title: 'Aplicações Web Sob Medida',
    subtitle: 'Sistemas e plataformas digitais para suas necessidades.',
    description: 'Desenvolvimento completo de aplicações web modernas e responsivas, desde o frontend (Next.js) até o backend (Node.js) e banco de dados (MongoDB/Prisma), incluindo integrações com APIs e sistemas de autenticação (Auth0).',
    category: 'Tecnologia',
    image: 'AppWeb.jpg',
    link: '/tecnologia/aplicativos-web',
  },
  {
    id: 'robos-desktop-automacao',
    title: 'Robôs Desktop de Automação',
    subtitle: 'Soluções customizadas para automatizar tarefas e coletar dados.',
    description: 'Desenvolvemos robôs (aplicativos desktop com Nextron/Electron) para automatizar processos repetitivos, extrair dados de sistemas ou da web (crawlers), e integrar informações, aumentando a eficiência e a inteligência do seu negócio.',
    category: 'Tecnologia',
    image: 'Robot.jpg',
    link: '/tecnologia/botrt',
  },
  {
    id: 'ia-integration',
    title: 'Integração de Inteligência Artificial',
    subtitle: 'Adicione inteligência e automação aos seus processos.',
    description: 'Exploramos e implementamos soluções com IA (usando Vercel AI SDK, modelos como Gemini/OpenAI) para criar chatbots, analisar dados, gerar conteúdo e otimizar tarefas em suas aplicações.',
    category: 'Tecnologia',
    image: 'AI.jpg',
    link: '/tecnologia/AI',
  },

  // --- Serviços de Consultoria (Expandido) ---
  {
    id: 'consultoria-gestao-estrategia', // ID ajustado para ser mais específico
    title: 'Consultoria de Gestão e Estratégia',
    subtitle: 'Otimize processos e impulsione seus resultados.',
    description: 'Conectamos nossos clientes a novas oportunidades, implementando boas práticas de gestão, tecnologia e planejamento estratégico para otimização de processos e geração de melhores resultados.',
    category: 'Consultoria',
    image: 'Strategy.jpg', // ou 'Lightbulb'
    link: '/gestao/gestao-estrategia', // Link mais específico
  },
  {
    id: 'consultoria-comercial-vendas', // ID ajustado
    title: 'Consultoria Comercial e Vendas',
    subtitle: 'Planejamento e metas para alavancar suas vendas.',
    description: 'Levamos uma perspectiva externa e experiência especializada para estruturar seu planejamento de vendas, definir metas realistas e implementar estratégias que impulsionam o sucesso comercial.',
    category: 'Consultoria',
    image: 'TrendUp.jpg', // ou 'Target', 'ChartBar'
    link: '/gestao/comercial-vendas',
  },
  {
    id: 'consultoria-prospeccao',
    title: 'Consultoria em Prospecção de Clientes',
    subtitle: 'Encontre e conquiste novas oportunidades de negócio.',
    description: 'Ajudamos sua empresa a identificar e alcançar novos clientes através de estratégias de prospecção eficazes, otimizando seus canais e abordagens para expandir sua base de clientes.',
    category: 'Consultoria',
    image: 'Prospecção.jpg', // ou 'Binoculars'
    link: '/gestao/prospeccao',
  },
  {
    id: 'consultoria-acompanhamento-desempenho',
    title: 'Acompanhamento de Desempenho Comercial',
    subtitle: 'Métricas, análises e feedback para crescimento contínuo.',
    description: 'Realizamos análises periódicas do desempenho comercial da sua empresa, utilizando métricas bem definidas para fornecer feedback contínuo e insights para a tomada de decisões estratégicas.',
    category: 'Consultoria',
    image: 'Acompanhamento.jpg', // ou 'PresentationChart'
    link: '/gestao/acompanhamento-desempenho',
  },
  {
    id: 'consultoria-gestao-financeira',
    title: 'Consultoria em Gestão Financeira',
    subtitle: 'Planejamento e análise para decisões financeiras assertivas.',
    description: 'Avaliamos o cenário financeiro da sua empresa para oferecer suporte na tomada de decisões, desenvolvendo um planejamento financeiro completo para a organização e otimização dos seus recursos.',
    category: 'Consultoria',
    image: 'Finances.jpg', // ou 'Bank', 'Calculator'
    link: '/gestao/gestao-financeira',
  },
  {
    id: 'consultoria-apoio-operacional',
    title: 'Consultoria para Apoio Operacional',
    subtitle: 'Automatize e facilite suas atividades diárias.',
    description: 'Oferecemos o suporte necessário para identificar oportunidades de automação e facilitar processos dentro das suas atividades operacionais, aumentando a eficiência e reduzindo custos.',
    category: 'Consultoria',
    image: 'Apoio.jpg', // ou 'Wrench', 'FlowArrow'
    link: '/gestao/apoio-operacional',
  }
];
