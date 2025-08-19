import React from 'react';
import { 
  Box, 
  Flex, 
  Heading, 
  Text, 
  useBreakpointValue,
  Icon,
  Container
} from '@chakra-ui/react';
import { 
  FiBox, 
  FiTruck, 
  FiShoppingCart, 
  FiUsers, 
  FiBarChart2, 
  FiTarget 
} from 'react-icons/fi';

const BusinessProcess = () => {
  // Configuração responsiva
  const direction = useBreakpointValue({ base: 'column', md: 'row' });
  const spacing = useBreakpointValue({ base: 6, md: 8 });
  const iconSize = useBreakpointValue({ base: 10, md: 12 });

  // Dados dos processos de negócio
  const processes = [
    {
      icon: FiBox,
      title: 'Aquisição de Matérias-Primas',
      description: 'Selecionamos cuidadosamente os melhores fornecedores e materiais para garantir a qualidade desde o início.'
    },
    {
      icon: FiTruck,
      title: 'Logística Inteligente',
      description: 'Nossa rede de distribuição otimizada garante entregas rápidas e com menor impacto ambiental.'
    },
    {
      icon: FiShoppingCart,
      title: 'Experiência de Compra',
      description: 'Proporcionamos uma jornada de compra simplificada e personalizada para cada cliente.'
    },
    {
      icon: FiUsers,
      title: 'Atendimento ao Cliente',
      description: 'Nossa equipe especializada oferece suporte contínuo e soluções personalizadas.'
    },
    {
      icon: FiBarChart2,
      title: 'Análise de Resultados',
      description: 'Monitoramos constantemente os indicadores de performance para melhorar continuamente.'
    },
    {
      icon: FiTarget,
      title: 'Inovação Contínua',
      description: 'Investimos em pesquisa e desenvolvimento para antecipar as necessidades do mercado.'
    }
  ];

  return (
    <Box bg="gray.50" py={16}>
      <Container maxW="container.xl">
        <Heading 
          as="h2" 
          textAlign="center" 
          mb={12}
          fontSize={{ base: '3xl', md: '4xl' }}
          color="blue.700"
        >
          Nossa Lógica de Negócio
        </Heading>
        
        <Text 
          textAlign="center" 
          maxW="2xl" 
          mx="auto" 
          mb={16}
          fontSize={{ base: 'lg', md: 'xl' }}
          color="gray.600"
        >
          Conheça os pilares que sustentam nossa operação e nos permitem entregar excelência em todos os aspectos.
        </Text>

        <Flex 
          direction={{ base: 'column', md: 'row' }} 
          wrap="wrap" 
          justify="center"
          gap={spacing}
        >
          {processes.map((process, index) => (
            <Box
              key={index}
              flex={{ base: '1 1 100%', md: '1 1 calc(33.333% - 32px)', lg: '1 1 calc(25% - 32px)' }}
              bg="white"
              p={8}
              borderRadius="xl"
              boxShadow="lg"
              textAlign="center"
              transition="all 0.3s"
              _hover={{
                transform: 'translateY(-5px)',
                boxShadow: 'xl',
              }}
            >
              <Flex
                justify="center"
                align="center"
                mb={6}
              >
                <Box
                  p={4}
                  borderRadius="full"
                  bg="blue.50"
                  color="blue.600"
                >
                  <Icon as={process.icon} boxSize={iconSize} />
                </Box>
              </Flex>
              
              <Heading as="h3" fontSize="xl" mb={4} color="gray.800">
                {process.title}
              </Heading>
              
              <Text color="gray.600" lineHeight="tall">
                {process.description}
              </Text>
            </Box>
          ))}
        </Flex>
      </Container>
    </Box>
  );
};

export { BusinessProcess };