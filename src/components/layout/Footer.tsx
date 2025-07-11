// src/components/layout/Footer.tsx
'use client';

// ============================================================================
//   IMPORTS
// ============================================================================

// --- Componentes Chakra UI ---
import { Flex, Text, Heading, Link, Image } from '@chakra-ui/react';

// --- Componentes e Dados Locais ---
import { MobileFooterSection } from './MobileFooterSection'; // Componente para a versão mobile
import { footerData, footerSections } from '@/data/footer'; // Dados de texto para o rodapé

// ============================================================================
//   COMPONENTE PRINCIPAL: Footer
// ============================================================================
export function Footer() {

    // --- Constantes de Estilo ---
    // Define as cores a serem usadas, buscando do seu tema do Chakra UI
    const bgColor = 'footerBg';
    const textColor = 'footerColor';
    const headingColor = 'footerHeaderColor';

    // --- Renderização do Componente ---
    return (
        // Container externo que ocupa 100% da largura e define o padding e as cores
        <Flex
            as="footer" // Tag semântica para rodapé
            bg={bgColor}
            color={textColor}
            py={{ base: 10, md: 16 }}
            px={{ base: 4, md: 8, lg: 12 }}
            w='100%'
            mt={{ base: 8, md: 16 }}
        >
            <Flex
                // Container interno para alinhar o conteúdo
                w='100%'
                direction={{ base: 'column', md: 'row' }}
                justifyContent="space-between"
                alignItems={{ base: 'center', md: 'flex-start' }}
                gap={10}
            >
                {/* -------------------------------------------------------------------- */}
                {/* Coluna da Esquerda: Logo e Descrição                               */}
                {/* -------------------------------------------------------------------- */}
                <Flex
                    gap={4}
                    flexDir={'column'}
                    alignItems={{ base: 'center', md: 'flex-start' }}
                    textAlign={{ base: 'center', md: 'left' }}
                    flex={{ base: 'none', md: 1 }} // Define a proporção de espaço que a coluna ocupa
                    maxW={{ base: '100%', md: '350px' }}
                >
                    <Image src={footerData.logoSrc} alt={footerData.logoAlt} objectFit={'contain'} maxW={{ base: 24, md: 32 }} />
                    <Text fontSize="md">
                        {footerData.footerDescription}
                    </Text>
                </Flex>

                {/* -------------------------------------------------------------------- */}
                {/* Coluna da Direita: Seções de Links                                 */}
                {/* -------------------------------------------------------------------- */}
                <Flex
                    direction={{ base: 'column', md: 'row' }}
                    justifyContent={{ base: 'center', md: 'flex-end' }}
                    alignItems={{ base: 'center', md: 'flex-start' }}
                    flex={{ base: 'none', md: 2 }} // Ocupa o dobro do espaço da coluna esquerda
                    gap={{ base: 8, md: 16 }}
                    w={{ base: '100%', md: 'auto' }}
                >
                    {/* Links para Desktop: Visível apenas em telas maiores que 'sm' */}
                    <Flex
                        flexDir={'column'}
                        textAlign={{ base: 'center', md: 'left' }}
                        display={{ base: 'none', sm: 'flex' }}
                    >
                        <Heading as="h4" size="lg" mb={6} color={headingColor}>
                            {footerData.guideHeading}
                        </Heading>
                        <Flex flexDir={{ base: 'column', md: 'row' }} gapX={{ base: 8, md: 16 }} gapY={{ base: 4, sm: 0 }}>
                            
                            {/* Coluna de Links: Consultoria */}
                            <Flex flexDir={'column'} gap={3} align={{ base: 'center', md: 'flex-start' }}>
                                {footerSections.consultoria.map((item, idx) => (
                                    <Link key={item.label + idx} href={item.href} _hover={{ textDecoration: 'underline' }} color={textColor}>
                                        {item.label}
                                    </Link>
                                ))}
                            </Flex>

                            {/* Coluna de Links: Tecnologia */}
                            <Flex flexDir={'column'} gap={3} align={{ base: 'center', md: 'flex-start' }}>
                                {footerSections.tecnologia.map((item, idx) => (
                                    <Link key={item.label + idx} href={item.href} _hover={{ textDecoration: 'underline' }} color={textColor}>
                                        {item.label}
                                    </Link>
                                ))}
                            </Flex>

                            {/* Coluna de Links: Empresa */}
                            <Flex flexDir={'column'} gap={3} align={{ base: 'center', md: 'flex-start' }}>
                                {footerSections.empresa.map((item, idx) => (
                                    <Link key={item.label + idx} href={item.href} _hover={{ textDecoration: 'underline' }} color={textColor}>
                                        {item.label}
                                    </Link>
                                ))}
                            </Flex>

                        </Flex>
                    </Flex>

                    {/* Links para Mobile: Renderiza um componente separado para a versão mobile (ex: Accordion) */}
                    <MobileFooterSection />
                    
                </Flex>
            </Flex>
        </Flex>
    );
}
