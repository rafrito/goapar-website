// src/components/layout/BotrtExamples.tsx
'use client';

// ============================================================================
//   IMPORTS
// ============================================================================

// --- Framework e UI Libs ---
import { Flex, Image, Text, VStack, Heading, Box, Icon } from "@chakra-ui/react";
import { motion, Variants } from 'framer-motion';
import { PiFlowArrowDuotone } from "react-icons/pi";

// --- Ícones ---
// Adicionando o ícone que você escolheu

// ============================================================================
//   VARIANTES DE ANIMAÇÃO (Framer Motion)
// ============================================================================
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2, // Anima os filhos em sequência
        }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    }
};

// Nova variante de animação para a seta
const arrowVariants: Variants = {
    hover: {
        x: [0, 8, 0], // Move a seta para a direita e de volta
        transition: {
            duration: 1.5,
            ease: "easeInOut",
            repeat: Infinity // Repete a animação infinitamente enquanto o mouse estiver sobre
        }
    }
};

// ============================================================================
//   COMPONENTE PRINCIPAL: BotrtExamples
// ============================================================================
export function BotrtExamples() {
    const MotionFlex = motion(Flex);
    const MotionVStack = motion(VStack);
    const MotionHeading = motion(Heading);
    const MotionText = motion(Text);
    const MotionIcon = motion(Icon);

    return (
        // Container principal da seção
        <MotionFlex
            as="section"
            w="100%"
            py={{ base: 16, md: 24 }}
            px={{ base: 4, md: 8 }}
            bg="black" // Fundo escuro para destacar as imagens
            color="white"
            direction="column"
            align="center"
            gap={{ base: 12, md: 16 }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            alignItems={'center'}
            justifyContent={'center'}
            viewport={{ once: true, amount: 0.2 }}
        >
            {/* Título da Seção */}
            <MotionVStack textAlign="center" gap={4} variants={itemVariants}>
                <Heading as="h2" fontSize={{ base: '3xl', md: '5xl' }} fontWeight="bold">
                    A máquina trabalhando para você
                </Heading>
                <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.400" maxW="2xl">
                    Deixe o BoTRT automatizar tarefas repetitivas e transformar dados complexos em informações acessíveis, enquanto você foca no que realmente importa.
                </Text>
            </MotionVStack>

            {/* Container das duas colunas de exemplo */}
            <Flex
                w='100%'
                maxW="container.xl"
                direction={{ base: 'column', lg: 'row' }}
                alignItems='center'
                justifyContent='center'
                gap={{ base: 10, lg: 8 }}
            >
                {/* -------------------------------------------------------------------- */}
                {/* Coluna 1: Acesso ao Dashboard                                      */}
                {/* -------------------------------------------------------------------- */}
                <MotionVStack
                    flex={1}
                    w='100%'
                    gap={6}
                    variants={itemVariants}
                    p={{ base: 6, md: 8 }}
                    bg="#1C1C1C"
                    borderRadius="2xl"
                    border="1px solid"
                    borderColor="gray.800"
                    maxW={{ base: '100%', md: "lg" }}
                    _hover={{
                        transform: "translateY(-5px)",
                        borderColor: "brand.500",
                        transition: "transform 0.3s ease, border-color 0.3s ease"
                    }}
                >
                    <Box mb={4}>
                        <Image
                            src='/botrt/visual/trt-dash.svg'
                            alt='Imagem do BoTRT acessando o dashboard do TRT'
                            borderRadius="xl"
                            border="2px solid"
                            borderColor="gray.700"
                            p={1}
                            boxShadow="0 0 20px 5px rgba(44, 105, 238, 0.15)"
                        />
                    </Box>
                    <VStack textAlign="center" gap={3}>
                        <Heading as="h3" size="lg">Visão Centralizada</Heading>
                        <Text color="gray.400">
                            Acesse um dashboard unificado que consolida as informações mais importantes. Navegue pelos processos de forma intuitiva, sem precisar alternar entre múltiplas abas e sistemas.
                        </Text>
                    </VStack>
                </MotionVStack>

                {/* -------------------------------------------------------------------- */}
                {/* Divisor com a Seta Animada                                         */}
                {/* -------------------------------------------------------------------- */}
                <MotionFlex
                    align="center"
                    justify="center"
                    display={{ base: 'none', lg: 'flex' }}
                    variants={itemVariants} // Anima a entrada junto com os cards
                    whileHover="hover" // Ativa a animação de hover
                >
                    <MotionIcon
                        as={PiFlowArrowDuotone}
                        boxSize={10} // Equivalente a 32px
                        color="brand.500"
                        variants={arrowVariants} // Aplica a animação de pulsação
                    />
                </MotionFlex>

                {/* -------------------------------------------------------------------- */}
                {/* Coluna 2: Extração de Dados                                        */}
                {/* -------------------------------------------------------------------- */}
                <MotionVStack
                    flex={1}
                    w='100%'
                    gap={6}
                    variants={itemVariants}
                    direction={{ base: 'column-reverse', lg: 'column' }}
                    alignItems={'center'}
                    justifyContent={'center'}
                    p={{ base: 6, md: 8 }}
                    bg="#1C1C1C"
                    borderRadius="2xl"
                    border="1px solid"
                    borderColor="gray.800"
                    maxW={{ base: '100%', md: "6xl" }}
                    _hover={{
                        transform: "translateY(-5px)",
                        borderColor: "brand.500",
                        transition: "transform 0.3s ease, border-color 0.3s ease"
                    }}
                >
                    <Box >
                        <Image
                            src='/botrt/visual/trt-list.svg'
                            alt='Imagem do BoTRT extraindo dados de uma lista de processos'
                            borderRadius="xl"
                            border="2px solid"
                            borderColor="gray.700"
                            p={1}
                            boxShadow="0 0 20px 5px rgba(44, 105, 238, 0.15)"
                        />
                    </Box>
                    <VStack textAlign="center" gap={3}>
                        <Heading as="h3" size="lg">Extração Inteligente</Heading>
                        <Text color="gray.400">
                            Com um clique, o BoTRT varre, coleta e organiza todos os dados da seção selecionada. Transforme listas processuais complexas em relatórios estruturados e prontos para análise.
                        </Text>
                    </VStack>
                </MotionVStack>

            </Flex>
        </MotionFlex>
    );
}
