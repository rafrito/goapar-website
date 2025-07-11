// src/components/layout/HeaderMobileMenu.tsx
'use client';

// ============================================================================
//   IMPORTS
// ============================================================================

// --- Componentes Chakra UI ---
// Usando o Menu do Ark UI, que é a base para o Chakra v3
import { Box, Menu, Button, Portal, Link as ChakraLink } from "@chakra-ui/react";

// --- Ícones ---
import { PiList } from "react-icons/pi";

// --- Dados Locais ---
import { headerData } from "@/data/header";

// ============================================================================
//   COMPONENTE PRINCIPAL: HeaderMobileMenu
// ============================================================================
// Este componente cria o menu "hamburger" que é exibido apenas em telas pequenas.

export function HeaderMobileMenu() {
    return (
        // Container que só exibe este componente em telas pequenas ('base')
        // e o esconde em telas a partir de 'md' (medium).
        <Box display={{ base: 'block', md: 'none' }}>

            {/* Menu Principal (Raiz) */}
            <Menu.Root>

                {/* O botão que aciona a abertura do menu (ícone de lista/hamburger) */}
                <Menu.Trigger asChild>
                    <Button variant="outline" size="sm">
                        <PiList />
                    </Button>
                </Menu.Trigger>

                {/* O Portal garante que o conteúdo do menu seja renderizado no topo da árvore DOM,
                    evitando problemas de sobreposição (z-index). */}
                <Portal>
                    <Menu.Positioner>
                        <Menu.Content>

                            {headerData.menu.map((item) => (
                                <Menu.Item key={item.title} value={item.title} asChild>
                                    <ChakraLink
                                        href={item.href}
                                        w="100%"
                                        display="block"
                                        px={3}
                                        py={2}
                                    >
                                        {item.title}
                                    </ChakraLink>
                                </Menu.Item>
                            ))}

                        </Menu.Content>
                    </Menu.Positioner>
                </Portal>
            </Menu.Root>
        </Box>
    );
}
