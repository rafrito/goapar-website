'use client';

import React, { useRef } from 'react';
import { RefObject } from 'react';
import {
    Flex,
    Image,
    Link as ChakraLink,
} from "@chakra-ui/react";
import { motion, Variants } from "framer-motion";

import { CustomText } from "@/components/ui/CustomText";
import { headerData } from "@/data/header";

const headerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: "easeInOut",
        }
    }
};

export function Header() {

    const MotionFlex = motion(Flex);

    const scrollToComponent = (ref: RefObject<HTMLDivElement | null>) => {
        if (ref.current) {
            ref.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    const sections = headerData.menu.map((item) => ({
        title: item.title,
        ref: useRef<HTMLDivElement | null>(null)
    }));

    return (
        <MotionFlex
            as="header"
            initial="hidden"
            animate="visible"
            variants={headerVariants}
            justifyContent={'space-between'}
            alignItems="center"
            py={6}
            px={{ base: 4, md: 64 }}
            w='100%'
            backgroundColor={'brand.900'}
        >
            {/* Seção Esquerda: Logo */}
            <Flex alignItems={'center'} gap={{ base: 2, md: 8 }}>
                <ChakraLink href="/" _focus={{ boxShadow: 'none' }}>
                    <Image
                        src={headerData.logoSrc}
                        alt="Logo da GoaPar Imóveis"
                        objectFit={'contain'}
                        maxW={{ base: 32, md: 32 }}
                        width={{ base: "64px", md: "64px" }}
                        filter="brightness(0) invert(1)"
                    />
                </ChakraLink>
            </Flex>

            {/* Seção Direita: Navegação */}
            <Flex alignItems={'center'} gap={{ base: 2, sm: 3, md: 4 }}>

                {/* Navegação para Desktop */}
                <Flex
                    gap={8}
                    display={{ base: 'none', md: 'flex' }}
                    alignItems="center"
                    justifyContent={"center"}
                    flex={1}
                >
                    {/* Links de Navegação Padrão */}
                    {sections.map((item, index) => (
                        <ChakraLink
                            key={index}
                            onClick={() => scrollToComponent(item.ref)}
                        >
                            <CustomText
                                fontSize={'md'}
                                color={'neutral.200'}
                                text={item.title}
                                letterSpacing={1.8}
                                textTransform={'uppercase'}
                                _hover={{ cursor: "pointer", color: 'brand.500', textDecoration: 'underline' }}
                            />
                        </ChakraLink>
                    ))}

                </Flex>

            </Flex>
        </MotionFlex>
    );
}
