'use client';

// ============================================================================
//   IMPORTS
// ============================================================================

// --- Framework e UI Libs ---
import { Button, Flex, Image, Link, Text } from "@chakra-ui/react";
import { motion, Variants } from "framer-motion";

// --- Dados Locais ---
import { aboutData } from "@/data/about"; // Dados de texto para o componente

// ============================================================================
//   COMPONENTE PRINCIPAL: About
// ============================================================================
export function About() {

    // --- Hooks e Componentes com Animação ---
    // Criação de componentes "Motion" para permitir animações via Framer Motion
    const MotionFlex = motion(Flex);
    const MotionText = motion(Text);
    const MotionButton = motion(Button);

    // --- Definição das Variantes de Animação ---
    // Variante genérica para animar a entrada de elementos
    const itemVariants: Variants  = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    // --- Renderização do Componente ---
    return (
        // Container principal com layout flexível e responsivo
        <MotionFlex
            w='100%'
            gap={{ base: 8, md: 16 }}
            direction={{ base: 'column-reverse', lg: 'row' }} // Inverte a ordem no mobile
            alignItems={'center'}
            justifyContent={'space-between'}
        >

            {/* -------------------------------------------------------------------- */}
            {/* Coluna da Esquerda (Imagens Ilustrativas)                           */}
            {/* -------------------------------------------------------------------- */}
            <Flex
                flex={1} // Ocupa uma fração do espaço disponível
                p={{ base: 4, md: 0 }}
                gap={{ base: 4, lg: 8 }}
                direction={{ base: 'column', lg: 'row' }} // Colunas no desktop, linhas no mobile
                alignItems={'stretch'}
                justifyContent={'space-between'}
            >
                {/* Sub-coluna 1 (Imagem "Inovação") */}
                <Flex
                    w='100%'
                    flexDir={'column'}
                    gap={4}
                    alignItems={'start'}
                    justifyContent={'start'}
                >
                    <MotionFlex w='100%'>
                        <Image
                            src={'about/inovation.jpg'}
                            alt="Equipe trabalhando com inovação"
                            borderRadius={'md'}
                            w='100%'
                            minHeight={{ base: 'auto', md: 400 }}
                            h={{ base: '30vh', md: '100%' }}
                            objectFit={'cover'}
                            objectPosition={'center'}
                        />
                    </MotionFlex>
                    <MotionFlex
                        flexDir={'column'}
                        gap={2}
                        alignItems={'start'}
                        justifyContent={'start'}
                        bgColor={'gunMetal'}
                        p={4}
                        borderRadius={'md'}
                    >
                        <MotionText
                            color="brand.500"
                            textTransform="uppercase"
                            letterSpacing="wider"
                            fontSize={{ base: 'lg', md: 'xl' }}
                            lineHeight={1.2}
                        >
                            {aboutData.inovationText}
                        </MotionText>
                        <MotionText
                            color={'ghostWhite'}
                            letterSpacing={'wide'}
                        >
                            {aboutData.inovationDescription}
                        </MotionText>
                    </MotionFlex>
                </Flex>

                {/* Sub-coluna 2 (Imagem "Conexão") */}
                <Flex
                    w='100%'
                    flexDir={{ base: "column-reverse", md: 'column' }}
                    gap={4}
                    alignItems={'start'}
                    justifyContent={'start'}
                >
                    <MotionFlex
                        flexDir={'column'}
                        gap={2}
                        alignItems={'start'}
                        justifyContent={'start'}
                        bgColor={'gunMetal'}
                        p={4}
                        borderRadius={'md'}
                    >
                        <MotionText
                            color="cadetBlue"
                            textTransform="uppercase"
                            letterSpacing="wider"
                            fontSize={{ base: 'lg', md: 'xl' }}
                            lineHeight={1.2}
                        >
                            {aboutData.connectionText}
                        </MotionText>
                        <MotionText
                            color={'ghostWhite'}
                            letterSpacing={'wide'}
                        >
                            {aboutData.connectionDescription}
                        </MotionText>
                    </MotionFlex>
                    <MotionFlex h='100%'>
                        <Image
                            src={'about/connection.jpg'}
                            alt="Pessoas conectadas em reunião"
                            borderRadius={'md'}
                            w='100%'
                            minHeight={{ base: 'auto', md: 400 }}
                            h='100%'
                            objectFit={'cover'}
                            objectPosition={'center'}
                        />
                    </MotionFlex>
                </Flex>
            </Flex>

            {/* -------------------------------------------------------------------- */}
            {/* Coluna da Direita (Texto Principal e Botão)                         */}
            {/* -------------------------------------------------------------------- */}
            <MotionFlex
                flex={1} // Ocupa uma fração do espaço disponível
                p={8}
                direction="column"
                gap={12}
                justify="center"
                textAlign={{ base: 'start', lg: 'left' }}
                align={{ base: 'center', lg: 'start' }}
                variants={itemVariants}
            >
                {/* Bloco de Texto Principal */}
                <Flex flexDir={'column'} gap={4}>
                    <MotionText
                        color="brand.500"
                        textTransform="uppercase"
                        letterSpacing="wider"
                        fontSize={{ base: 'lg', md: 'xl' }}
                        lineHeight={1.2}
                        fontWeight={'normal'}
                        variants={itemVariants}
                    >
                        {aboutData.aboutUsTitle}
                    </MotionText>
                    <MotionText
                        fontSize={{ base: '5xl', md: '6xl' }}
                        lineHeight={1.2}
                        fontWeight={'normal'}
                        mt={2}
                        mb={6}
                        color="textPrimary"
                        variants={itemVariants}
                    >
                        {aboutData.aboutUsSubtitle}
                    </MotionText>
                    <MotionText
                        fontSize={{ base: 'lg', md: 'xl' }}
                        letterSpacing={'wide'}
                        color="textSecondary"
                        lineHeight="tall"
                        variants={itemVariants}
                    >
                        {aboutData.aboutUsDescription}
                    </MotionText>
                </Flex>

                {/* Botão de Ação */}
                <Link href={aboutData.ourHistoryButtonLink} target="_blank">
                    <MotionButton
                        w={{ base: '100%', md: 'auto' }}
                        px={6}
                        py={6}
                        bgColor={'brand.500'}
                        color={'textPrimary'}
                        fontWeight={'regular'}
                        fontSize={{ base: 'md', md: 'lg' }}
                        borderRadius={'sm'}
                        textTransform={'uppercase'}
                        letterSpacing={'wider'}
                        _hover={{ bgColor: "cadetBlue", transition: 'background-color 0.6s ease' }}
                        variants={itemVariants}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                    >
                        {aboutData.ourHistoryButtonText}
                    </MotionButton>
                </Link>
            </MotionFlex>

        </MotionFlex>
    );
}
