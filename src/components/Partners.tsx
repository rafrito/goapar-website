import React from "react";
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Image,
  Text,
} from "@chakra-ui/react";

const partners = [
  { name: "Easy House", logo: "/logos/easy-house.png" },
  { name: "Desygn", logo: "/logos/desygn.png" },
  { name: "Docs Fácil", logo: "/logos/docs-facil.png" },
  { name: "Helena S.A.", logo: "/logos/helena.png" },
  { name: "Abstract", logo: "/logos/abstract.png" },
  { name: "Symbia", logo: "/logos/symbia.png" },
];

export function Partners() {
  return (
    <Box
      as="section"
      position="relative"
      py={{ base: 16, md: 24 }}
      px={4}
      bgImage="url('/main/partners.jpg')"
      bgSize="cover"
      bgPos="center"
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        w: "100%",
        h: "100%",
        bg: "rgba(22, 39, 55, 0.75)",
        zIndex: 0,
      }}
    >
      <Container maxW="6xl" position="relative" zIndex={1} textAlign="center">
        {/* Cabeçalho */}
        <Heading
          as="h2"
          fontSize={{ base: "3xl", md: "4xl" }}
          fontWeight="bold"
          color="white"
          mb={6}
        >
          CLIENTES
        </Heading>
        <Box w={{ base: 50, md: 80 }} h={1} bg="accent.400" mx="auto" mb={12} />

        {/* Logos */}
        <SimpleGrid
          columns={{ base: 2, md: 3 }}
          justifyItems="center"
          alignItems="center"
        >
          {partners.map((partner, index) => (
            <Box key={index} textAlign="center">
              <Image
                src={partner.logo}
                alt={partner.name}
                maxH="60px"
                mx="auto"
                mb={4}
                objectFit="contain"
                filter="brightness(0) invert(1)" // deixa branco como no exemplo
              />
              <Text color="white" fontSize="sm" fontWeight="medium">
                {partner.name}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
