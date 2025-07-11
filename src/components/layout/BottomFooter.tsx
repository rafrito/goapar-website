// src/components/layout/BottomFooter.tsx
'use client';

// ============================================================================
//   IMPORTS
// ============================================================================

// --- Componentes Chakra UI ---
import {
    Flex,
    Text,
    Link,
    IconButton,
    HStack,
} from '@chakra-ui/react';

// --- Ícones ---
import { FaLinkedinIn, FaInstagram, FaWhatsapp } from 'react-icons/fa';

// --- Dados Locais ---
import { BottomFooterData } from '@/data/bottomFooter'; // Dados de texto e links para o rodapé

// ============================================================================
//   COMPONENTE PRINCIPAL: BottomFooter
// ============================================================================
export function BottomFooter() {

    // --- Constantes de Estilo ---
    // Define as cores a serem usadas, buscando do seu tema do Chakra UI
    const bgColor = 'bottomFooterBg';
    const textColor = 'bottomFooterColor';
    const iconHoverBg = 'bottomFooterIconBgHover';

    // --- Renderização do Componente ---
    return (
        // Container externo que ocupa 100% da largura e define as cores de fundo e texto
        <Flex bg={bgColor} color={textColor} w='100%'>
            <Flex
                as="footer" // Tag semântica para rodapé

                // Layout
                w='100%'
                align="center"
                justify="space-between"
                flexDir={{ base: 'column-reverse', sm: 'row' }} // Inverte a ordem no mobile
                gap={{ base: 4, sm: 2 }}

                // Estilo
                py={{ base: 4, md: 5 }}
                borderTopWidth="1px" // Linha sutil no topo para separar do conteúdo
            >
                {/* -------------------------------------------------------------------- */}
                {/* Texto de Copyright (Esquerda)                                      */}
                {/* -------------------------------------------------------------------- */}
                <Text fontSize="sm">
                    {BottomFooterData.copyrightText}
                </Text>

                {/* -------------------------------------------------------------------- */}
                {/* Ícones de Redes Sociais (Direita)                                  */}
                {/* -------------------------------------------------------------------- */}
                <HStack gap={3}>

                    {/* Ícone do Instagram */}
                    <Link href={BottomFooterData.instagramLink} target='_blank'>
                        <IconButton
                            aria-label="Instagram" // Corrigido para acessibilidade
                            variant="ghost"
                            size="sm"
                            bgColor={'bottomFooterIconBg'}
                            color={textColor}
                            _hover={{ bg: iconHoverBg }}
                        >
                            <FaInstagram />
                        </IconButton>
                    </Link>

                    {/* Ícone do LinkedIn */}
                    <Link href={BottomFooterData.linkedinLink} target='_blank'>
                        <IconButton
                            aria-label="LinkedIn" // Corrigido para acessibilidade
                            variant="ghost"
                            size="sm"
                            bgColor={'bottomFooterIconBg'}
                            color={textColor}
                            _hover={{ bg: iconHoverBg }}
                        >
                            <FaLinkedinIn />
                        </IconButton>
                    </Link>

                    {/* Ícone do WhatsApp */}
                    <Link href={BottomFooterData.whatsappLink} target='_blank'>
                        <IconButton
                            aria-label="WhatsApp" // Corrigido para acessibilidade
                            variant="ghost"
                            size="sm"
                            bgColor={'bottomFooterIconBg'}
                            color={textColor}
                            _hover={{ bg: iconHoverBg }}
                        >
                            <FaWhatsapp />
                        </IconButton>
                    </Link>

                </HStack>
            </Flex>
        </Flex>
    );
}
