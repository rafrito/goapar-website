// src/components/Footer.tsx (ou onde preferir)
'use client'; // Se estiver usando Next.js App Router e hooks/interatividade do Chakra

import { footerSections, logoSrc } from '@/utils';
import {Flex, Text, Heading, Link, Image} from '@chakra-ui/react';
import { MobileFooterSection } from './MobileFooterSection';

export function Footer() {
    const bgColor = 'footerBg'
    const textColor = 'footerColor'
    const headingColor = 'footerHeaderColor'

    return (
        <Flex bg={bgColor} color={textColor} py={{ base: 10, md: 16 }} px={{ base: 4, md: 8, lg: 12 }} w='100%'>
            <Flex
                w='100%'
                direction={{ base: 'column', md: 'row' }}
                justifyContent="space-between"
                alignItems={{ base: 'center', md: 'flex-start' }}
                gap={10}
            >
                {/* Coluna Esquerda: Logo e Texto */}
                <Flex
                    gap={4}
                    flexDir={'column'}
                    alignItems={{ base: 'center', md: 'flex-start' }}
                    textAlign={{ base: 'center', md: 'left' }}
                    flex={{ base: 'none', md: 1 }}
                    maxW={{ base: '100%', md: '350px' }}
                >
                    {/* Substitua SiChakraui pelo seu componente de Logo/Image */}
                    <Image src={logoSrc} alt="Logo" objectFit={'contain'} maxW={{ base: 24, md: 32 }} />
                    <Text fontSize="md">
                        A tecnologia é a ferramenta que impulsiona o progresso, mas a consultoria especializada é o mapa detalhado que guia você rumo ao sucesso estratégico e à inovação contínua.
                    </Text>
                </Flex>

                {/* Coluna Direita: Seções de Links */}
                <Flex
                    direction={{ base: 'column', md: 'row' }}
                    justifyContent={{ base: 'center', md: 'flex-end' }}
                    alignItems={{ base: 'center', md: 'flex-start' }}
                    flex={{ base: 'none', md: 2 }}
                    gap={{ base: 8, md: 16 }}
                    w={{ base: '100%', md: 'auto' }}
                >
                    {/* A imagem mostrava "Sections" como um título acima de 3 colunas de links idênticos.
                        Vamos replicar isso. Se forem seções diferentes, a estrutura interna mudaria.
                    */}
                    <Flex flexDir={'column'} textAlign={{ base: 'center', md: 'left' }} display={{ base: 'none', sm: 'flex' }}>
                        <Heading as="h4" size="lg" mb={6} color={headingColor}>
                            Guia
                        </Heading>
                        <Flex flexDir={{ base: 'column', md: 'row' }} gapX={{ base: 8, md: 16 }} gapY={{ base: 4, sm: 0 }}>
                            <Flex flexDir={'column'} gap={3} align={{ base: 'center', md: 'flex-start' }}>
                                {footerSections.consultoria.map((item, idx) => {
                                    return (
                                        <Link key={item.label + idx} href="#" _hover={{ textDecoration: 'underline' }} color={textColor}>{item.label}</Link>
                                    )
                                })}
                            </Flex>
                            <Flex flexDir={'column'} gap={3} align={{ base: 'center', md: 'flex-start' }}>
                                {footerSections.tecnologia.map((item, idx) => {
                                    return (
                                        <Link key={item.label + idx} href="#" _hover={{ textDecoration: 'underline' }} color={textColor}>{item.label}</Link>
                                    )
                                })}
                            </Flex>
                            <Flex flexDir={'column'} gap={3} align={{ base: 'center', md: 'flex-start' }}>
                                {footerSections.empresa.map((item, idx) => {
                                    return (
                                        <Link key={item.label + idx} href="#" _hover={{ textDecoration: 'underline' }} color={textColor}>{item.label}</Link>
                                    )
                                })}
                            </Flex>
                        </Flex>
                    </Flex>


                    <MobileFooterSection />
                    {/* Se você tivesse mais grupos de seções, adicionaria mais <Box> ou <VStack> aqui */}
                </Flex>
            </Flex>
        </Flex>
    );
}