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
    const downloadLink = "https://release-assets.githubusercontent.com/github-production-release-asset/999249052/23d3411b-1193-4254-9b5c-6121eba5aa27?sp=r&sv=2018-11-09&sr=b&spr=https&se=2025-07-24T23%3A06%3A27Z&rscd=attachment%3B+filename%3DBoTRT-Setup-0.0.901.exe&rsct=application%2Foctet-stream&skoid=96c2d410-5711-43a1-aedd-ab1947aa7ab0&sktid=398a6654-997b-47e9-b12b-9515b896b4de&skt=2025-07-24T22%3A05%3A50Z&ske=2025-07-24T23%3A06%3A27Z&sks=b&skv=2018-11-09&sig=I0x51UuadOP422oS2UR74MYhLUwsBoepSMk9W8UlzWE%3D&jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmVsZWFzZS1hc3NldHMuZ2l0aHVidXNlcmNvbnRlbnQuY29tIiwia2V5Ijoia2V5MSIsImV4cCI6MTc1MzM5NTU0MCwibmJmIjoxNzUzMzk1MjQwLCJwYXRoIjoicmVsZWFzZWFzc2V0cHJvZHVjdGlvbi5ibG9iLmNvcmUud2luZG93cy5uZXQifQ.8_UDfI9RRWhslg1JvysUeXh_C867UVSDQ8Upb1ywX9U&response-content-disposition=attachment%3B%20filename%3DBoTRT-Setup-0.0.901.exe&response-content-type=application%2Foctet-stream";

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
