import { Main } from "@/components/layout/Main/Main";
import GestaoPage from "@/app/consultoria/page";
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
    >
      {/* Seção principal */}
      <Main />
      <GestaoPage />
    </Flex>
  );
}
