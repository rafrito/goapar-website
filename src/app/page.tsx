import { Flex } from "@chakra-ui/react";
import Main from "@/app/main/page";

export default function Home() {
  // Componente principal da página inicial
  return (
    // Container principal usando Flex do Chakra UI
    <Flex
      flexDir={'column'} // Direção flexível definida como coluna
      gap={{ base: 24, md: 32 }} // Espaçamento entre os elementos filhos, adaptável para base e md breakpoints
      w='100%' // Largura de 100%
      minH={'100vh'} // Altura mínima de 100vh (viewport height)
      bgColor={'neutral.100'}
    >
      {/* Seção principal */}
      <Flex direction="column" w="100%">
        <Main/>
      </Flex>
    </Flex>
  );
}
