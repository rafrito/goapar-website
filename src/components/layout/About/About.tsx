'use client'

import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";

// Componente About
export function About() {

    // Criação de componentes Motion do Framer Motion para animações
    const MotionFlex = motion(Flex);
    const MotionText = motion(Text);
    const MotionButton = motion(Button);

    // Variantes de animação para os itens
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        // Container principal com layout flexível e responsivo
        <MotionFlex
            w='100%'
            gap={{ base: 8, md: 16 }}
            direction={{ base: 'column-reverse', lg: 'row' }}
            alignItems={'center'}
            justifyContent={'space-between'}
        >

            {/* Coluna da Esquerda (Imagens ilustrativas) */}
            <Flex
                flex={1}
                p={{ base: 4, md: 0 }}
                gap={{ base: 4, lg: 8 }}
                direction={{ base: 'column', lg: 'row' }}
                alignItems={'stretch'}
                justifyContent={'space-between'}
            >
                {/* Container para a primeira imagem e texto */}
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
                            borderRadius={'md'}
                            w='100%' // Ocupa 100% da largura do contêiner pai
                            minHeight={{ base: 'auto', md: 400 }}
                            h={{ base: '30vh', md: '100%' }} // Define uma altura fixa e responsiva
                            objectFit={'cover'} // Garante que a imagem cubra a área sem distorcer
                            objectPosition={'center'}
                        />
                    </MotionFlex>
                    {/* Container para o texto sobre inovação */}
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
                            INOVAÇÃO
                        </MotionText>
                        <MotionText
                            color={'ghostWhite'}
                            letterSpacing={'wide'}
                        >
                            Inovação é a força que nos move e a base do nosso negócio. Buscamos constantemente novas maneiras de criar soluções tecnológicas que impulsionem o sucesso de nossos clientes.
                        </MotionText>
                    </MotionFlex>
                </Flex>

                {/* Container para a segunda imagem e texto */}
                <Flex
                    w='100%'
                    flexDir={{ base: "column-reverse", md: 'column' }}
                    gap={4}
                    alignItems={'start'}
                    justifyContent={'start'}
                >
                    {/* Container para o texto sobre conexão */}
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
                            CONEXÃO
                        </MotionText>
                        <MotionText
                            color={'ghostWhite'}
                            letterSpacing={'wide'}
                        >
                            Conectamos nossos clientes às soluções mais eficazes para seus problemas, construindo pontes tecnológicas que impulsionam o sucesso e a inovação.
                        </MotionText>
                    </MotionFlex>

                    <MotionFlex h='100%'>
                        <Image
                            src={'about/connection.jpg'}
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

            {/* Coluna da Direita (Texto e Botão) */}
            <MotionFlex
                flex={1}
                p={8}
                direction="column"
                gap={12}
                justify="center"
                textAlign={{ base: 'start', lg: 'left' }}
                align={{ base: 'center', lg: 'start' }}
                variants={itemVariants}
            >
                {/* Container para o texto "Um Pouco Sobre Nós" */}
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
                        Um Pouco
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
                        Sobre Nós
                    </MotionText>
                    <MotionText
                        fontSize={{ base: 'lg', md: 'xl' }}
                        letterSpacing={'wide'}
                        color="textSecondary"
                        lineHeight="tall"
                        variants={itemVariants}
                    >
                        Na Awer, transformamos ideias complexas em soluções tecnológicas elegantes e eficientes. Nossa paixão é construir produtos digitais que não apenas funcionam, mas que impulsionam o crescimento e resolvem problemas reais para nossos clientes.
                    </MotionText>
                </Flex>
                {/* Botão "nossa história" */}
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
                    onClick={() => window.location.href = '/sobre'}
                >
                    nossa história
                </MotionButton>
            </MotionFlex>
        </MotionFlex>
    )
}