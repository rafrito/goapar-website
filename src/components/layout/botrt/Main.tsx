// src/app/consultoria/page.tsx
'use client';

// ============================================================================
//   IMPORTS
// ============================================================================

// --- Framework e UI Libs ---
import { Flex, Heading, Text, Icon, VStack, Button, Box } from "@chakra-ui/react";
import { motion, Variants } from 'framer-motion';

// --- Ícones ---
import { PiRocketLaunchBold, PiWrench } from "react-icons/pi";

// ============================================================================
//   CONSTANTES DE ESTILO
// ============================================================================
// Centraliza as cores usadas no componente para fácil manutenção e consistência.
const COLORS = {
    black: "#000000",       // Um azul noturno, quase preto, para o início
    darkBlue: "#0A225C",    // Um azul escuro e profundo para a transição
    blue: "#0052D4",        // Um azul royal vibrante
    lightBlue: "    #2d0303ff",    // Um azul elétrico para o final
    shadow: "rgba(44, 105, 238, 0.3)", // Sombra baseada no azul final
    boxShadow: "rgba(105, 6, 6, 1)"  // Brilho baseado no azul final
};


// ============================================================================
//   COMPONENTE PRINCIPAL: Main
// ============================================================================
export function Main() {

    // --- Componentes com Animação (Framer Motion) ---
    const MotionButton = motion(Button);
    const MotionFlex = motion(Flex);
    const MotionHeading = motion(Heading);
    const MotionText = motion(Text);
    const MotionIcon = motion(Icon);

    // --- Variantes de Animação ---
    // Animação para o container principal, orquestrando a entrada dos filhos.
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2, // Anima os filhos em sequência
            },
        },
    };

    // Animação genérica para cada item de conteúdo (título, texto, botão).
    const itemVariants: Variants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut",
            },
        },
    };

    // --- Renderização do Componente ---
    return (
        // Container principal da seção Hero
        <MotionFlex
            position="relative"
            w="100%"
            px={{ base: 2, md: '' }}
            py={{ base: 2, md: 20 }}
            minH={{ base: "88vh", md: 832 }}
            justifyContent="center"
            alignItems="start"
            // // Gradiente de fundo complexo
            // bgGradient="to-b"
            // gradientFrom={`${COLORS.black} 0%`}
            // gradientVia={`${COLORS.black}ff 5%,${COLORS.darkBlue} 34%, ${COLORS.blue} 65%`}
            // gradientTo={`${COLORS.lightBlue} 82%`}
            color="white"
            overflow="hidden" // Essencial para cortar a elipse que vaza
        >
            {/* Conteúdo Centralizado (Título, Descrição e Botão) */}
            <MotionFlex
                as={VStack} // Usa VStack para empilhar e espaçar o conteúdo facilmente
                gap={{ base: 12, md: 20 }}
                textAlign="center"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                zIndex={1} // Garante que o conteúdo fique na frente da elipse
            >
                {/* Título Principal */}
                <MotionText
                    as="h1"
                    w='100%'
                    maxW={{ base: '100%', md: '6xl' }}
                    fontSize={{ base: '6xl', md: '9xl' }}
                    fontWeight="semibold"
                    variants={itemVariants}
                    lineHeight={{ base: '1.1', md: '0.85' }}
                    textShadow={`0px 2px 10px ${COLORS.shadow}`}
                    textAlign={'center'}
                >
                    Horas de Trabalho em Segundos.
                </MotionText>

                {/* Texto de Descrição */}
                <MotionText
                    fontSize={{ base: 'lg', md: '2xl' }}
                    color="gray.300"
                    maxW={'4xl'}
                    variants={itemVariants}
                >
                    Tenha o controle total sobre as informações dos seus casos. Com o BoTRT, você acessa dados atualizados e confiáveis de forma instantânea, garantindo mais segurança e agilidade para o seu escritório.
                </MotionText>

                {/* Botão de Call-to-Action */}
                <MotionButton
                    w={{ base: 'min', md: 'auto' }}
                    px={8}
                    py={6}
                    bgColor={'white'}
                    color={'black'}
                    fontWeight={'bold'}
                    fontSize={{ base: 'md', md: 'lg' }}
                    borderRadius={'lg'}
                    textTransform={'uppercase'}
                    letterSpacing={'wider'}
                    _hover={{ bgColor: "brand.600", color: 'white', transition: 'background-color 0.6s ease' }}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                >
                    <MotionText fontSize={'md'} variants={itemVariants}>Teste grátis</MotionText>
                </MotionButton>

            </MotionFlex>

            {/* Elipse Decorativa na Base */}
            <Box
                // Posicionamento e dimensionamento
                position="absolute"
                bottom={{ base: "-10vh", md: "-60px", lg: "-400px" }}
                left="50%"
                transform="translateX(-50%)"
                width={{ base: "150%", md: "150%" }}
                height={{ base: "20vh", md: "120px", lg: "640px" }}
                zIndex={0} // Fica atrás do conteúdo
                
                // Estilo da Elipse
                borderTop="2px solid"
                borderColor={'brand.400'}
                borderRadius="100%"
                bgColor={COLORS.black}
                boxShadow={`0px 0px 80px 80px ${COLORS.boxShadow}`}
                style={{
                    background: `radial-gradient(${COLORS.black} 50%, ${COLORS.lightBlue} 70%)`
                }}
            />
        </MotionFlex>
    );
}
