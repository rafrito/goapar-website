import { About } from "@/components/layout/About/About";
import { CasesContainer } from "@/components/layout/Cases/CasesContainer";
import { FeedbacksCarousel } from "@/components/layout/Feedbacks/FeedbacksCarousel";
import { Main } from "@/components/layout/Main/Main";
import { ProductCarousel } from "@/components/layout/Products/ProductCarousel";
import { Flex } from "@chakra-ui/react";

export default function Home() {
  // Componente principal da página inicial
  return (
    // Container principal usando Flex do Chakra UI
    <Flex
      flexDir={'column'} // Direção flexível definida como coluna
      gap={{ base: 24, md: 32 }} // Espaçamento entre os elementos filhos, adaptável para base e md breakpoints
      px={{ base: 4, md: 8 }} // Padding horizontal adaptável
      w='100%' // Largura de 100%
      minH={'100vh'} // Altura mínima de 100vh (viewport height)
      bgColor={'backgroundPrimary'} // Cor de fundo definida como a variável backgroundPrimary
    >
      {/* Seção principal */}
      <Main />
      {/* Seção de cases */}
      <CasesContainer />
      {/* Carrossel de produtos */}
      <ProductCarousel />
      {/* Seção sobre */}
      <About />
      {/* Carrossel de feedbacks */}
      <FeedbacksCarousel />
    </Flex>
  );
}
