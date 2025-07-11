// src/components/layout/Title.tsx (ou onde estiver seu componente)
'use client'; // Necessário para Framer Motion e interatividade

import { CustomText } from "@/components/ui/CustomText";
import { GetStartedMotionButton } from "@/components/ui/MotionButton"; // Seu botão já animado
import { Box, Button, Flex } from "@chakra-ui/react";
import { hover, motion, Variants } from 'framer-motion'; // Importe motion e Variants
import { FaArrowRight, FaLongArrowAltRight } from "react-icons/fa";

// Vamos criar componentes motion a partir do Flex para usá-los como contêineres de animação
// Isso é útil se CustomText não for um componente motion por si só
const MotionFlex = motion(Flex);
const MotionButton = motion(Button)

export function TitleST() {
    // Variantes para o primeiro CustomText (título)
    const titleVariants: Variants = {
        hidden: { opacity: 0, y: 120 }, // Começa invisível e um pouco abaixo
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 2, // Duração da animação
                ease: "easeInOut",
                delay: 0.2,    // <<<< ATRASO PARA O PRIMEIRO TEXTO APARECER
            }
        }
    };

    // Variantes para o segundo CustomText (subtítulo)
    const subtitleVariants: Variants = {
        hidden: { opacity: 0, y: 60 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1.5,
                ease: [0.0, 0.0, 0.58, 1.0],
                delay: 1.8,    // <<<< ATRASO MAIOR PARA O SEGUNDO TEXTO APARECER
            }
        }
    };

    // Variantes para o botão
    const buttonVariantsContainer: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                ease: [0.0, 0.0, 0.58, 1.0],
                delay: 2.4,    // <<<< ATRASO AINDA MAIOR PARA O BOTÃO
            }
        }
    };
    // Variantes para o botão
    const barVariants: Variants = {
        hidden: { opacity: 0, width: 0 },
        visible: {
            opacity: 1,
            width: '95%',
            transition: {
                duration: 1,
                ease: [0.0, 0.0, 0.58, 1.0],
                delay: 2.4,    // <<<< ATRASO AINDA MAIOR PARA O BOTÃO
            }
        }
    };

    const buttonVariants: Variants = {
        initial: { // Estado normal (sem hover, sem clique)
            boxShadow: "0px 2px 5px rgba(0,0,0,0.1)", // Sombra sutil inicial (opcional)
            color: '#FFFFFF',
            backgroundColor: '#FF5F5E', // Cor de fundo inicial
            width: 150
        },
        hover: { // Estado no hover
            backgroundColor: 'transparent', // Cor de fundo transparente no hover
            color: 'white', // Cor do texto no hover
            border: '1px solid white', // Borda vermelha no hover
            boxShadow: "0px 4px 12px rgba(0,0,0,0.15)", // Sombra um pouco maior
            width: 500,
            transition: { // Transição específica para o estado de hover
                type: "spring", // Tipo de transição (spring, tween)
                stiffness: 400,
                damping: 100
            }
        },
        tap: { // Estado ao clicar/pressionar
            scale: 0.80, // Diminui 5%
        }
    };

    return (
        <Flex
            as="section" // Boa prática usar tags semânticas
            flexDir={'column'}
            gap={8}
            p={{ base: 8, md: 2 }}
            alignItems={'start'}
            justifyContent={'start'}
            width="100%" // Garante que o Flex ocupe a largura
            overflow="hidden" // Para evitar que a animação 'y: 20' cause scrollbar
        >
            <MotionFlex
                flexDir={'column'}
                gap={{ base: 4, md: 2 }} // Ajustei o gap
                textAlign={'start'}
                alignItems={'start'}
                justifyContent={'start'}
            // Para controlar a animação dos filhos em sequência,
            // você pode usar 'staggerChildren' no contêiner pai,
            // mas definir delays individuais como fiz acima é mais explícito para este caso.
            >
                {/* Envolve o CustomText com motion.div ou MotionFlex se CustomText não for motion */}
                <MotionFlex
                    variants={titleVariants}
                    initial='hidden' // Começa no estado 'hidden'
                    animate='visible' // Anima para o estado 'visible' quando o componente monta
                >
                    <CustomText
                        as={'h1'}
                        maxW={{ base: "100%", sm: "80%", md: "100%" }} // Use valores responsivos ou específicos
                        text={'Soluções personalizadas.'}
                        fontWeight={'semibold'}
                        fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: 80 }} // Ajuste responsivo
                        lineHeight={1.1}
                        color='ghostWhite'
                    />
                </MotionFlex>
                {/* Envolve o CustomText com motion.div ou MotionFlex se CustomText não for motion */}
                <MotionFlex
                    variants={titleVariants}
                    initial='hidden' // Começa no estado 'hidden'
                    animate='visible' // Anima para o estado 'visible' quando o componente monta
                >
                    <CustomText
                        as={'h1'}
                        maxW={{ base: "100%", sm: "80%", md: "100%" }} // Use valores responsivos ou específicos
                        text={'Resultados Imediatos.'}
                        fontWeight={'semibold'}
                        fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: 72 }} // Ajuste responsivo
                        lineHeight={1.1}
                        color="textPrimary" // Use seu token semântico
                    />
                </MotionFlex>

                <MotionFlex
                    variants={subtitleVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <CustomText
                        as={'h2'}
                        maxW={{ base: "100%", sm: "70%", md: "800px" }} // Ajuste responsivo
                        py={{ base: 2, md: 8 }}
                        text={'Descubra como nossa consultoria e tecnologia podem otimizar seus processos e impulsionar o crescimento do seu negócio.'}
                        lineHeight={1.5} // Aumentei um pouco para melhor legibilidade
                        fontSize={{ base: 'md', md: 'lg', lg: 28 }} // Ajuste responsivo
                        color='textPrimary' // Use seu token semântico
                    />
                </MotionFlex>


            </MotionFlex>

            <MotionFlex
                variants={buttonVariantsContainer} // Anima o container do botão
                initial="hidden"
                animate="visible"
            >
                {/* <MotionButton text="Conheça nosso trabalho" size={{ base: "md", md: "lg" }} /> */}
                <MotionButton
                    borderRadius={'sm'}
                    color={'textPrimary'}
                    bgColor={'brand.500'}
                    _hover={{color: 'ghostwhite', bgColor: 'transparent', border: '1px solid white', transition: '300ms ease-in-out'}}
                    justifyContent={'space-between'}
                    size={{ base: "md", md: "2xl" }}
                >
                    Saiba mais
                </MotionButton>
            </MotionFlex>
        </Flex>
    );
}
