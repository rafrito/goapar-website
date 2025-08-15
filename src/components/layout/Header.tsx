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
    Spinner, // Adicionado para feedback de carregamento
} from "@chakra-ui/react";
import { motion, Variants } from "framer-motion";
import { useAuth0 } from '@auth0/auth0-react';

// --- Componentes e Dados Locais ---
import { CustomText } from "../ui/CustomText";
import { HeaderMobileMenu } from "./HeaderMobileMenu";
import { headerData } from "@/data/header";
import { useProfile } from "@/contexts/ProfileContext"; // 1. Importa o nosso hook de perfil

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
    const { isAuthenticated, loginWithRedirect } = useAuth0();
    // 2. Obtém os dados do perfil do nosso contexto
    const { profile, isLoading: isProfileLoading } = useProfile();

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
            backgroundColor={'grayBlue.900'}
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
                    />
                </ChakraLink>
            </Flex>

            {/* Seção Direita: Navegação */}
            <Flex alignItems={'center'} gap={{ base: 2, sm: 3, md: 4 }}>

                {/* Navegação para Desktop */}
                <Flex
                    gap={8}
                    fontSize={'sm'}
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
                                color={'light.200'}
                                text={item.title}
                                letterSpacing={1.8}
                                textTransform={'uppercase'}
                                _hover={{ cursor: "pointer", color: 'brand.500', textDecoration: 'underline' }}
                            />
                        </ChakraLink>
                    ))}

                </Flex>

                {/* Menu Mobile (Hamburger) */}
                <HeaderMobileMenu
                    isAuthenticated={isAuthenticated}
                    isAwerClient={profile?.isAwerClient || false}
                />

            </Flex>
        </MotionFlex>
    );
}
