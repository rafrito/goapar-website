// src/app/pagamento/sucesso/page.tsx
'use client';

import {
    Flex,
    Heading,
    Text,
    Icon,
    VStack,
    Button,
    Box,
} from "@chakra-ui/react";
import { motion, Variants } from 'framer-motion';
import { PiCheckCircleFill, PiDownloadSimpleBold } from "react-icons/pi";

// ============================================================================
//   VARIANTES DE ANIMAÇÃO (Framer Motion)
// ============================================================================
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1,
        },
    },
};

const itemVariants: Variants = {
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

const iconVariants: Variants = {
    hidden: { scale: 0.5, opacity: 0 },
    visible: {
        scale: 1,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.2,
        },
    },
};

// ============================================================================
//   COMPONENTE PRINCIPAL: PaginaSucesso
// ============================================================================
export default function PaginaSucesso() {
    const MotionFlex = motion(Flex);
    const MotionHeading = motion(Heading);
    const MotionText = motion(Text);
    const MotionIcon = motion(Icon);
    const MotionButton = motion(Button);

    // TODO: Adicione o link real para o download do seu aplicativo
    const downloadLink = "https://drive.usercontent.google.com/download?id=1c0SrVPOCOoXvY9SavZxQHexEpwO5jf6i&export=download&authuser=0&confirm=t&uuid=b28a986d-7231-4ee9-90c5-5ad3dcb0e36b&at=AN8xHopSl39tLCNRWBX5Ef8A6edI:1753397455028";

    return (
        <MotionFlex
            w="100%"
            minH="80vh" // Garante que ocupe a maior parte da tela
            justifyContent="center"
            alignItems="center"
            textAlign="center"
            px={4}
            color="white"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <VStack
                gap={6}
                bg="#1C1C1C"
                p={{ base: 8, md: 12 }}
                borderRadius="2xl"
                border="1px solid"
                borderColor="gray.700"
                boxShadow="xl"
                maxW="lg"
            >
                {/* Ícone de Sucesso */}
                <MotionIcon
                    as={PiCheckCircleFill}
                    boxSize={{ base: 16, md: 20 }}
                    color="green.400"
                    variants={iconVariants}
                />

                {/* Título Principal */}
                <MotionHeading
                    as="h1"
                    fontSize={{ base: '2xl', md: '4xl' }}
                    fontWeight="bold"
                    color="white"
                    variants={itemVariants}
                >
                    Pagamento Aprovado!
                </MotionHeading>

                {/* Texto de Apoio */}
                <MotionText
                    fontSize={{ base: 'md', md: 'lg' }}
                    color="gray.300"
                    variants={itemVariants}
                >
                    Obrigado por se juntar à Awer! Sua assinatura do BoTRT está ativa. O próximo passo é baixar e instalar o aplicativo.
                </MotionText>

                <Flex h={2} w='100%' my={2} borderColor="gray.700" />

                {/* Botão de Download */}
                <MotionButton
                    onClick={() => window.open(downloadLink, '_blank')}
                    colorScheme="brand"
                    size="lg"
                    w="100%"
                    py={7}
                    
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <PiDownloadSimpleBold />
                    Baixar o BoTRT
                </MotionButton>

                <MotionText fontSize="sm" color="gray.500" pt={2} variants={itemVariants}>
                    Lembre-se: use a mesma conta que você acabou de criar para fazer login no aplicativo.
                </MotionText>
            </VStack>
        </MotionFlex>
    );
}
