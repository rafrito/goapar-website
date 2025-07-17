// src/components/layout/Header.tsx
'use client';

// ============================================================================
//   IMPORTS
// ============================================================================

// --- Framework e UI Libs ---
import { Flex, Image, Link as ChakraLink } from "@chakra-ui/react";
import { motion, Variants } from "framer-motion";

// --- Componentes e Dados Locais ---
import { CustomText } from "../ui/CustomText";
import { MotionButton } from "../ui/MotionButton";
import { HeaderMobileMenu } from "./HeaderMobileMenu";
import { headerData } from "@/data/header";
import { instagramLink, whatsappLink } from "@/utils";

// ============================================================================
//   VARIANTES DE ANIMAÇÃO (Framer Motion)
// ============================================================================
// Definida fora do componente para melhor performance, evitando recriação a cada render.
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

// ============================================================================
//   COMPONENTE PRINCIPAL: Header
// ============================================================================
export function Header() {

    // --- Componentes com Animação ---
    const MotionFlex = motion(Flex);

    // --- Renderização do Componente ---
    return (
        <MotionFlex
            as="header" // Tag semântica para cabeçalho

            // Animação de entrada
            initial="hidden"
            animate="visible"
            variants={headerVariants}

            // Layout e Estilo
            justifyContent={'space-between'}
            alignItems="center"
            py={4}
            px={{ base: 4, md: 12 }} // Padding horizontal adaptável

            w='100%'
            color={'headerColor'}
        >
            {/* -------------------------------------------------------------------- */}
            {/* Seção Esquerda: Logo                                               */}
            {/* -------------------------------------------------------------------- */}
            <Flex alignItems={'center'} gap={{ base: 2, md: 8 }}>
                <ChakraLink href="/" _focus={{ boxShadow: 'none' }}>
                    <Image
                        src={headerData.logoSrc}
                        alt="Logo da Awer"
                        objectFit={'contain'}
                        maxW={{ base: 32, md: 32 }}
                    />
                </ChakraLink>
            </Flex>

            {/* -------------------------------------------------------------------- */}
            {/* Seção Direita: Navegação Desktop e Menu Mobile                     */}
            {/* -------------------------------------------------------------------- */}
            <Flex alignItems={'center'} gap={{ base: 2, sm: 3, md: 4 }}>

                {/* Navegação para Desktop: Visível apenas em telas maiores que 'md' */}
                <Flex
                    gap={8}
                    fontSize={'sm'}
                    display={{ base: 'none', md: 'flex' }}
                >
                    {headerData.menu.map((item, index) => (
                        <ChakraLink
                            key={index}
                            href={item.href}
                            _hover={{ cursor: 'pointer', color: 'brand.500', textDecoration: 'none' }}
                        >
                            <CustomText
                                color={'headerColor'}
                                text={item.title}
                                letterSpacing={1.8}
                                textTransform={'uppercase'}
                            />
                        </ChakraLink>
                    ))}
                    <ChakraLink href={whatsappLink()} _hover={{ cursor: 'pointer', color: 'brand.500', textDecoration: 'none' }} target="_blank">
                        {/* Supondo que MotionButton seja o seu botão de "Contato" ou "Orçamento" */}
                        <MotionButton />
                    </ChakraLink>
                </Flex>

                {/* Menu Mobile (Hamburger): Renderiza um componente separado */}
                <HeaderMobileMenu />

            </Flex>
        </MotionFlex>
    );
}
