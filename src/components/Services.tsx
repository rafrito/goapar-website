import React from 'react';
import {
  Box,
  Grid,
  Heading,
  Text,
  Icon,
  Container,
  VStack,
} from '@chakra-ui/react';
import { services } from '@/data/how-it-works';

export function Services() {
  return (
    <Box as="section" py={16} px={4} position="relative">
      <Box
        position="absolute"
        top={0}
        left={0}
        w="100%"
        h="60%"
        bg="brand.200"
		opacity={0.2}
        zIndex={0}
      />

      <Container maxW="6xl" mx="auto" position="relative" zIndex={1}>
        <Box textAlign="center" mb={12} pt={8}>
          <Heading as="h2" fontSize="4xl" fontWeight="bold" color="black" mb={2}>
            COMO FUNCIONA
          </Heading>
          <Box w={{ base: 50, md: 80 }} h={1.5} bg="dark.700" mx="auto" />
        </Box>

        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)"
          }}
          gap={0}
          boxShadow="xl"
          borderRadius="md"
          overflow="hidden"
        >
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Box
                key={index}
                bg={service.bgColor}
                color={service.textColor}
                p={8}
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                minH={{ base: "400px", md: "300px", lg: "500px" }}
                transition="all 0.3s"
                _hover={{
                  transform: "translateY(-5px)",
                  boxShadow: "2xl",
                }}
              >
                <VStack align="center" textAlign="center" my={{ base: 4, md: 6 }}>
                  <Icon as={IconComponent} boxSize={12} />
                  <Heading as="h3" fontSize="2xl" fontWeight="semibold" py={4}>
                    {service.title}
                  </Heading>
                  <Text fontSize="sm" lineHeight="relaxed" opacity={0.9}>
                    {service.description}
                  </Text>
                </VStack>
              </Box>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}
