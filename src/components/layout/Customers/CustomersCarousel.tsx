// src/components/sections/ClientLogosCarousel.tsx
'use client';

import React from 'react';
import { Box, Flex, Image, VisuallyHidden } from '@chakra-ui/react';
import { motion, Variants } from 'framer-motion';
import { awerClientLogos, awerClientLogos2, ClientLogo } from '@/data/clientLogos';

interface ClientLogosCarouselProps {
    logos?: ClientLogo[];
    animationDuration?: number;
    logoHeight?: string | number;
}

export function CustomersCarousel({
    logos = awerClientLogos,
    animationDuration = 40,
    logoHeight = 40,
}: ClientLogosCarouselProps) {
    if (!logos || logos.length === 0) {
        return null;
    }

    // Motion component for Framer Motion animations
    const MotionFlex = motion(Flex);

    // Duplicate logos for the infinite loop effect
    const duplicatedLogos1 = [...awerClientLogos, ...awerClientLogos];
    const duplicatedLogos2 = [...awerClientLogos2, ...awerClientLogos2];

    // Marquee animation variants
    const marqueeVariants: Variants  = {
        animate: {
            x: [0, "-60%"],
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
    const marqueeVariants2: Variants  = {
        animate: {
            x: [0, "-60%"],
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

    // Carousel animation variants
    const carouselVariants: Variants = {
        hidden: { opacity: 0, y: 0 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                ease: "easeInOut",
                delay: 3.6,
            }
        }
    }

    return (
        <MotionFlex
            width="full"
            variants={carouselVariants}
            initial="hidden"
            animate="visible"
            py={{ base: 8, md: 4 }}
            position="relative"
            h='100%'
            flexDir={'column'}
            gap={4}
        >
            <VisuallyHidden>Nossos Clientes</VisuallyHidden>
            <MotionFlex
                style={{ display: 'flex', width: `${logos.length * 2 * 200}px` }}
                variants={marqueeVariants}
                animate="animate"
            >
                {duplicatedLogos1.map((logo, index) => (
                    <Flex
                        key={`logo-${logo.alt}-${index}`}
                        alignItems="center"
                        justifyContent="center"
                        minWidth="180px"
                        height={{base:20, md: logoHeight}}
                        mx={{ base: 4, md: 8 }}
                    >
                        <Flex flexDir={'column'} gap={8}>
                            <Image
                                src={logo.src}
                                alt={logo.alt}
                                maxHeight={logo.height || { base: 20, md: logoHeight }}
                                maxWidth={logo.width || "150px"}
                                objectFit="contain"
                                filter="grayscale(100%)"
                                opacity={0.7}
                                _hover={{
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
                style={{ display: 'flex', width: `${logos.length * 2 * 200}px` }}
                variants={marqueeVariants2}
                animate="animate"
            >
                {duplicatedLogos2.map((logo, index) => (
                    <Flex
                        key={`logo-${logo.alt}-${index}`}
                        alignItems="center"
                        justifyContent="center"
                        minWidth="180px"
                        height={{base:20, md: logoHeight}}
                        mx={{ base: 4, md: 8 }}
                        pr={40}
                    >
                        <Flex flexDir={'column'} gap={8}>
                            <Image
                                src={logo.src}
                                alt={logo.alt}
                                maxHeight={logo.height || { base: 20, md: logoHeight }}
                                maxWidth={logo.width || "150px"}
                                objectFit="contain"
                                filter="grayscale(100%)"
                                opacity={0.7}
                                _hover={{
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
        </MotionFlex>
    );
}
