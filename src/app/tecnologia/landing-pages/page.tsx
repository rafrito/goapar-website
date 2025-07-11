// src/app/consultoria/page.tsx
'use client';

import { Flex, Heading, Text, Icon, VStack } from "@chakra-ui/react";
import { motion, Variants } from 'framer-motion';
import { PiWrench } from "react-icons/pi"; // Ícone de ferramenta, apropriado para "construção"

export default function LandingPages() {
    // Componentes com animação
    const MotionFlex = motion(Flex);
    const MotionHeading = motion(Heading);
    const MotionText = motion(Text);
    const MotionIcon = motion(Icon);

    // Variantes de animação para a entrada dos elementos
    const containerVariants: Variants  = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2, // Anima os filhos em sequência
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants: Variants  = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut",
            },
        },
    };

    return (
        // Container principal que centraliza o conteúdo na tela
        <MotionFlex
            w="100%"
            minH="70vh" // Garante que ocupe a maior parte da tela verticalmente
            justifyContent="center"
            alignItems="center"
            textAlign="center"
            px={4}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <VStack gap={6}>
                {/* Ícone animado */}
                <MotionIcon
                    as={PiWrench}
                    boxSize={{ base: 16, md: 24 }}
                    color="brand.500" // Cor do seu tema
                    variants={itemVariants}
                />

                {/* Título Principal */}
                <MotionHeading
                    as="h1"
                    fontSize={{ base: '3xl', md: '5xl' }}
                    fontWeight="bold"
                    color="textPrimary" // Cor do seu tema
                    variants={itemVariants}
                >
                    Página em Construção
                </MotionHeading>

                {/* Texto de Apoio */}
                <MotionText
                    fontSize={{ base: 'lg', md: 'xl' }}
                    color="textSecondary" // Cor do seu tema
                    maxW="xl"
                    variants={itemVariants}
                >
                    Estamos trabalhando para trazer novidades e soluções incríveis para você. Volte em breve para conferir!
                </MotionText>
            </VStack>
        </MotionFlex>
    );
}
