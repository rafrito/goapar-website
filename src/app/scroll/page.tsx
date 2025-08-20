'use client'

import React, { useRef } from 'react';
import { Box, Flex, Heading, Text, Button, VStack } from '@chakra-ui/react';
import { RefObject } from 'react';

const ScrollDemo = () => {
  // Criando referências para os componentes alvo
  const section1Ref = useRef<HTMLDivElement | null>(null);
  const section2Ref = useRef<HTMLDivElement | null>(null);
  const section3Ref = useRef<HTMLDivElement | null>(null);


  // Função para scroll suave até o componente
  const scrollToComponent = (ref: RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };


  return (
    <Box minH="100vh" p={5}>
      <VStack align="center" mb={12}>
        <Heading as="h1" size="2xl" textAlign="center">
          Navegação com Scroll Suave
        </Heading>
        <Text fontSize="xl" textAlign="center">
          Clique nos botões para navegar para seções específicas da página
        </Text>

        <Flex gap={4} wrap="wrap" justify="center">
          <Button
            colorScheme="blue"
            size="lg"
            onClick={() => scrollToComponent(section1Ref)}
          >
            Seção 1
          </Button>
          <Button
            colorScheme="green"
            size="lg"
            onClick={() => scrollToComponent(section2Ref)}
          >
            Seção 2
          </Button>
          <Button
            colorScheme="purple"
            size="lg"
            onClick={() => scrollToComponent(section3Ref)}
          >
            Seção 3
          </Button>
        </Flex>
      </VStack>

      {/* Seção 1 */}
      <Box
        ref={section1Ref}
        bg="blue.50"
        p={10}
        borderRadius="lg"
        mb={8}
        minH="60vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <VStack>
          <Heading as="h2" size="xl" color="blue.700">
            Seção 1
          </Heading>
          <Text fontSize="lg">
            Esta é a primeira seção da página. Ela foi scrolled até aqui
            quando você clicou no botão "Seção 1".
          </Text>
          <Text fontSize="lg">
            O scroll é suave e leva você diretamente para esta parte da página.
          </Text>
        </VStack>
      </Box>

      {/* Seção 2 */}
      <Box
        ref={section2Ref}
        bg="green.50"
        p={10}
        borderRadius="lg"
        mb={8}
        minH="60vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <VStack>
          <Heading as="h2" size="xl" color="green.700">
            Seção 2
          </Heading>
          <Text fontSize="lg">
            Esta é a segunda seção. Você chegou aqui ao clicar no botão "Seção 2".
          </Text>
          <Text fontSize="lg">
            Esta funcionalidade é útil para criar uma navegação suave em páginas de uma só aplicação (SPA).
          </Text>
        </VStack>
      </Box>

      {/* Seção 3 */}
      <Box
        ref={section3Ref}
        bg="purple.50"
        p={10}
        borderRadius="lg"
        mb={8}
        minH="60vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <VStack>
          <Heading as="h2" size="xl" color="purple.700">
            Seção 3
          </Heading>
          <Text fontSize="lg">
            Esta é a terceira e última seção. Você navegou até aqui clicando no botão "Seção 3".
          </Text>
          <Text fontSize="lg">
            Experimente clicar nos botões novamente para ver a animação de scroll suave.
          </Text>
        </VStack>
      </Box>
    </Box>
  );
};

export default ScrollDemo;