// src/components/layout/Title.tsx (ou onde estiver seu componente)
'use client'; // Necessário para Framer Motion e interatividade

import { CustomText } from "@/components/ui/CustomText";
import { MotionButton } from "@/components/ui/MotionButton"; // Seu botão já animado
import { Flex } from "@chakra-ui/react";
import { hover, motion, Variants } from 'framer-motion'; // Importe motion e Variants

// Vamos criar componentes motion a partir do Flex para usá-los como contêineres de animação
// Isso é útil se CustomText não for um componente motion por si só
const MotionFlex = motion(Flex);

export function Title() {
    // Variantes para o primeiro CustomText (título)
    const titleVariants: Variants = {
        hidden: { opacity: 0, y: 100 }, // Começa invisível e um pouco abaixo
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 2, // Duração da animação
                ease: "easeInOut",
                delay: 1,    // <<<< ATRASO PARA O PRIMEIRO TEXTO APARECER
            }
        }
    };

    // Variantes para o segundo CustomText (subtítulo)
    const subtitleVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
                delay: 0.6,    // <<<< ATRASO MAIOR PARA O SEGUNDO TEXTO APARECER
            }
        }
    };

    // Variantes para o botão
    const buttonVariantsContainer: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
                delay: 0.9,    // <<<< ATRASO AINDA MAIOR PARA O BOTÃO
            }
        }
    };

    return (
        <Flex
            as="section" // Boa prática usar tags semânticas
            flexDir={'column'}
            gap={8}
            py={{ base: 20, md: 24 }} // Ajustei o padding vertical para ser responsivo
            alignItems={'center'}
            justifyContent={'center'}
            bgImage={'url(/main/blur.png)'} // Certifique-se que este caminho está correto na pasta public
            bgPos={'center'} // Mudei para 'center' para um fundo mais equilibrado
            bgSize={'contain'} // 'cover' pode ser melhor para preencher
            bgRepeat={'no-repeat'}
            width="100%" // Garante que o Flex ocupe a largura
            overflow="hidden" // Para evitar que a animação 'y: 20' cause scrollbar
        >
            <MotionFlex
                flexDir={'column'}
                gap={{ base: 4, md: 6 }} // Ajustei o gap
                textAlign={'center'}
                alignItems={'center'}
                justifyContent={'center'}
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
                        maxW={{ base: "100%", sm: "80%", md: "700px" }} // Use valores responsivos ou específicos
                        text={'Soluções que Geram Resultados Reais'}
                        fontWeight={'semibold'}
                        fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '64px' }} // Ajuste responsivo
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
                        maxW={{ base: "100%", sm: "70%", md: "600px" }} // Ajuste responsivo
                        px={{ base: 12, md: 2 }}
                        text={'Descubra como nossa consultoria e tecnologia podem otimizar seus processos e impulsionar o crescimento do seu negócio.'}
                        lineHeight={1.5} // Aumentei um pouco para melhor legibilidade
                        fontSize={{ base: 'md', md: 'lg', lg: '18px' }} // Ajuste responsivo
                        color='textSecondary' // Use seu token semântico
                    />
                </MotionFlex>
            </MotionFlex>

            <MotionFlex
                variants={buttonVariantsContainer} // Anima o container do botão
                initial="hidden"
                animate="visible"
            >
                <MotionButton text="Conheça nosso trabalho" size={{ base: "md", md: "lg" }} />
            </MotionFlex>
        </Flex>
    );
}
