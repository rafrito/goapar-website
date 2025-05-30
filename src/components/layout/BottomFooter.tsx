// src/components/BottomFooter.tsx (ou onde preferir)
'use client'; // Se estiver usando Next.js App Router e hooks/interatividade do Chakra

import {
    Box,
    Flex,
    Text,
    Link,
    IconButton,
    HStack, // Para agrupar os ícones horizontalmente
} from '@chakra-ui/react';
// Importando ícones do react-icons. Escolha os que correspondem aos da imagem.
// A imagem parece ter Twitter, LinkedIn e Discord (ou similar).
import { FaTwitter, FaLinkedinIn, FaDiscord } from 'react-icons/fa';

export function BottomFooter() {
    const bgColor = 'bottomFooterBg'
    const textColor = 'bottomFooterColor'
    const iconHoverBg = 'bottomFooterIconBgHover'

    return (
        <Flex bg={bgColor} color={textColor} w='100%' >
            <Flex
                as="footer"
                align="center"
                justify="space-between"
                py={{ base: 4, md: 5 }}
                px={{ base: 4, md: 8 }}
                w='100%'
                borderTopWidth="1px" // Adiciona uma borda no topo se desejar, para separar do conteúdo acima
                flexDir={{base:'column-reverse', sm:'row'}}
                gap={{base:4, sm:2}}
            >
                <Text fontSize="sm">
                    2021-2025 Awer Soluções. Todos os direitos reservados. {/* Adapte o texto conforme necessário */}
                </Text>

                <HStack gap={3}> {/* Espaçamento entre os ícones */}
                    <Link href="https://twitter.com/yourprofile">
                        <IconButton
                            bgColor={'bottomFooterIconBg'}
                            aria-label="Twitter"
                            variant="ghost"
                            size="sm"
                            color={textColor}
                            _hover={{ bg: iconHoverBg }}
                        >
                            <FaTwitter />

                        </IconButton>
                    </Link>
                    <Link href="https://linkedin.com/in/yourprofile">
                        <IconButton
                            bgColor={'bottomFooterIconBg'}
                            aria-label="Twitter"
                            variant="ghost"
                            size="sm"
                            color={textColor}
                            _hover={{ bg: iconHoverBg }}
                        >
                            <FaLinkedinIn />

                        </IconButton>
                    </Link>
                    <Link href="https://discord.com/yourserver">
                        <IconButton
                            bgColor={'bottomFooterIconBg'}
                            aria-label="Twitter"
                            variant="ghost"
                            size="sm"
                            color={textColor}
                            _hover={{ bg: iconHoverBg }}
                        >
                            <FaDiscord />

                        </IconButton>
                    </Link>
                </HStack>
            </Flex>
        </Flex>
    );
}