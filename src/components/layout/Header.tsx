// src/components/layout/Header.tsx
'use client';

// ============================================================================
//   IMPORTS
// ============================================================================

// --- React e Frameworks ---
import {
    Flex,
    Image,
    Link as ChakraLink,
    Button,
    Text,
    Icon,
    Spinner, // Adicionado para feedbak de carregamento
} from "@chakra-ui/react";
import { motion, Variants } from "framer-motion";

// --- Componentes e Dados Locais ---
import { CustomText } from "../ui/CustomText";
import { HeaderMobileMenu } from "./HeaderMobileMenu";
import { headerData } from "@/data/header";

// ============================================================================
//   VARIANTES DE ANIMAÇÃO (Framer Motion)
// ============================================================================
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

    // --- Hooks e Estado ---
    const MotionFlex = motion(Flex);

    // --- Renderização do Componente ---
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
                    {headerData.menu.map((item, index) => (
                        <ChakraLink
                            key={index}
                            href={item.href}
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
