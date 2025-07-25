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
    // Componentes para o Menu do Usuário
    Avatar,
    Menu,
    Portal,
    Button,
    Text, // Adicionado para o menu
    Icon, // Adicionado para o menu
} from "@chakra-ui/react";
import { motion, Variants } from "framer-motion";
import { useAuth0 } from '@auth0/auth0-react'; // Hook do Auth0

// --- Componentes e Dados Locais ---
import { CustomText } from "../ui/CustomText";
import { MotionButton } from "../ui/MotionButton";
import { HeaderMobileMenu } from "./HeaderMobileMenu";
import { headerData } from "@/data/header";
import { whatsappLink } from "@/utils";
import { PiSignOut } from "react-icons/pi";
import { UserAvatar } from "./UserAvatar";

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
    // Hook do Auth0 para obter o status de autenticação, dados do usuário e funções de logout
    const { isAuthenticated, user, logout, loginWithRedirect } = useAuth0();

    console.log('User Authenticated:', isAuthenticated);
    console.log('User Data:', user);
    console.log('Logout Function:', logout);
    // --- Renderização do Componente ---
    return (
        <MotionFlex
            as="header"
            initial="hidden"
            animate="visible"
            variants={headerVariants}
            justifyContent={'space-between'}
            alignItems="center"
            py={4}
            px={{ base: 4, md: 12 }}
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
                    alignItems="center" // Alinha verticalmente os itens
                >
                    {/* Links de Navegação Padrão */}
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

                    {/* LÓGICA CONDICIONAL: Mostra o botão de contato ou o avatar do usuário */}
                    {isAuthenticated ? (
                        <UserAvatar />
                    ) : (
                        <Button
                            color={'ghostWhite'}
                            bgColor='transparent'
                            border='1px solid'
                            borderColor='whiteAlpha.300'
                            onClick={() => loginWithRedirect()}
                            _hover={{ bgColor: 'brand.600' }}
                        >
                            Entrar
                        </Button>
                    )}
                </Flex>

                {/* Menu Mobile (Hamburger): Agora precisa saber se o usuário está logado */}
                {/* Lembre-se de atualizar o componente HeaderMobileMenu para lidar com essa prop */}
                <HeaderMobileMenu isAuthenticated={isAuthenticated} />

            </Flex>
        </MotionFlex>
    );
}