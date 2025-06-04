// src/components/sections/ClientLogosCarousel.tsx (ou onde preferir)
'use client';

import React from 'react';
import { Box, Flex, Image, VisuallyHidden } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { awerClientLogos, awerClientLogos2, ClientLogo } from '@/data/clientLogos'; // Importe seus logos

interface ClientLogosCarouselProps {
    logos?: ClientLogo[];
    animationDuration?: number; // Duração da animação em segundos
    logoHeight?: string | number; // Altura padrão para os logos
}

export function CustomersCarousel({
    logos = awerClientLogos,
    animationDuration = 40, // Mais longo para um scroll mais lento
    logoHeight = 40, // Ajuste conforme necessário
}: ClientLogosCarouselProps) {
    if (!logos || logos.length === 0) {
        return null; // Não renderiza nada se não houver logos
    }

    // Duplica os logos para criar o efeito de loop infinito

    const MotionFlex = motion(Flex)

    const duplicatedLogos1 = [...awerClientLogos, ...awerClientLogos];
    const duplicatedLogos2 = [...awerClientLogos2, ...awerClientLogos2];

    const marqueeVariants = {
        animate: {
            x: [0, "-60%"], // Anima da posição inicial até mover todo o primeiro conjunto para a esquerda
            transition: {
                x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: animationDuration,
                    ease: "linear",
                },
            },
        },
    };
    const marqueeVariants2 = {
        animate: {
            x: [0, "-60%"], // Anima da posição inicial até mover todo o primeiro conjunto para a esquerda
            transition: {
                x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: animationDuration,
                    ease: "linear",
                },
            },
        },
    };

    return (
        <Flex
            width="full"
            py={{ base: 8, md: 2 }} // Espaçamento vertical
            position="relative"
            h='100%'
            flexDir={'column'}
            gap={4}
        >
            <VisuallyHidden>Nossos Clientes</VisuallyHidden> {/* Para acessibilidade */}
            <MotionFlex
                style={{ display: 'flex', width: `${logos.length * 2 * 200}px` }} // Largura total estimada (Nº logos * 2 * largura estimada por logo)
                variants={marqueeVariants}
                animate="animate"
            >
                {duplicatedLogos1.map((logo, index) => (
                    <Flex
                        key={`logo-${logo.alt}-${index}`}
                        alignItems="center"
                        justifyContent="center"
                        minWidth="180px" // Largura mínima para cada logo no carrossel
                        height={logoHeight}
                        mx={{ base: 4, md: 8 }} // Espaçamento horizontal entre os logos
                    >
                        <Flex flexDir={'column'} gap={8}>

                            <Image
                                src={logo.src}
                                alt={logo.alt}
                                maxHeight={logo.height || logoHeight} // Usa altura específica do logo se definida, senão a padrão
                                maxWidth={logo.width || "150px"} // Largura máxima para o logo
                                objectFit="contain"
                                filter="grayscale(100%)" // Opcional: Deixa os logos em escala de cinza
                                opacity={0.7} // Opcional: Opacidade para um visual mais sutil
                                _hover={{ // Opcional: Efeito no hover
                                    filter: "grayscale(0%)",
                                    opacity: 1,
                                    transform: "scale(1.1)",
                                    transition: "filter 0.3s ease, opacity 0.3s ease, transform 0.3s ease",
                                }}
                            />
                        </Flex>
                    </Flex>
                ))}
            </MotionFlex>
            <MotionFlex
                style={{ display: 'flex', width: `${logos.length * 2 * 200}px` }} // Largura total estimada (Nº logos * 2 * largura estimada por logo)
                variants={marqueeVariants2}
                animate="animate"
                
            >
                {duplicatedLogos2.map((logo, index) => (
                    <Flex
                        key={`logo-${logo.alt}-${index}`}
                        alignItems="center"
                        justifyContent="center"
                        minWidth="180px" // Largura mínima para cada logo no carrossel
                        height={logoHeight}
                        mx={{ base: 4, md: 8 }} // Espaçamento horizontal entre os logos
                        pr={40}
                    >
                        <Flex flexDir={'column'} gap={8}>

                            <Image
                                src={logo.src}
                                alt={logo.alt}
                                maxHeight={logo.height || logoHeight} // Usa altura específica do logo se definida, senão a padrão
                                maxWidth={logo.width || "150px"} // Largura máxima para o logo
                                objectFit="contain"
                                filter="grayscale(100%)" // Opcional: Deixa os logos em escala de cinza
                                opacity={0.7} // Opcional: Opacidade para um visual mais sutil
                                _hover={{ // Opcional: Efeito no hover
                                    filter: "grayscale(0%)",
                                    opacity: 1,
                                    transform: "scale(1.1)",
                                    transition: "filter 0.3s ease, opacity 0.3s ease, transform 0.3s ease",
                                }}
                            />
                        </Flex>
                    </Flex>
                ))}
            </MotionFlex>

        </Flex>
    );
}
