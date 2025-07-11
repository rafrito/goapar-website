'use client';


import { CustomText } from "@/components/ui/CustomText";
import { GetStartedMotionButton } from "@/components/ui/MotionButton";
import { awerServices, Service } from "@/data/services";
import { Flex, IconButton, Image, Text, useBreakpointValue } from "@chakra-ui/react";

// Importações do Swiper
import { Navigation, A11y, Autoplay } from 'swiper/modules'; // Módulos que você quer usar

// Importar os estilos do Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { motion, Variants } from 'framer-motion';
import { Swiper, SwiperSlide } from "swiper/react";
import { PiCaretLeft, PiCaretRight } from "react-icons/pi";


export function ProductCarousel() {

    const slidesPerView = 1
    const FlexMotion = motion(Flex)

    const ProductCarouselVariants: Variants = {
        hidden: { opacity: 0 }, // Começa invisível e um pouco abaiopacityo
        visible: {
            opacity: 1,
            transition: {
                duration: 1, // Duração da animação
                ease: "easeInOut",
                delay: 0.2,    // <<<< ATRASO PARA O PRIMEIRO TEXTO APARECER
            }
        }
    };

    return (
        < FlexMotion
            w='100%'
            bg="gunMetal"
            justifyContent={'center'}
            alignItems={'center'}
            variants={ProductCarouselVariants}
            initial="hidden"
            whileInView="visible" // Anima quando entra na viewport
            viewport={{ once: true }
            }
        >
            <Flex

                flexDir={'row'} w='100%' borderRadius={64} bgColor={'transparent'} >
                <Swiper
                    modules={[Navigation, A11y, Autoplay]}
                    spaceBetween={30} // Espaço entre os slides
                    slidesPerView={slidesPerView}
                    navigation={{ // Configuração dos botões de navegação customizados
                        nextEl: '.swiper-button-next-custom',
                        prevEl: '.swiper-button-prev-custom',
                    }}
                    pagination={{ clickable: true, dynamicBullets: true }}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    loop={true}
                >
                    {awerServices.map((service, idx) => (
                        <SwiperSlide key={service.id || idx}>

                            <ServiceSlide service={service} />

                        </SwiperSlide>))}
                </Swiper>
            </Flex>
        </FlexMotion >
    )
}



// Componente para um slide individual
interface ServiceSlideProps {
    service: Service;
}

function ServiceSlide({ service }: ServiceSlideProps) {

    const MotionFlex = motion(Flex)

    const isMobile = useBreakpointValue({
        base: true,
        md: false
    })
    // Variantes de animação para o conteúdo do slide
    const slideContentVariants: Variants = {
        hidden: { opacity: 0, x: 120 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 1, ease: "easeOut" }
        }
    };

    const ProductCarouselVariants: Variants = {
        hidden: { opacity: 0, y: 60 }, // Começa invisível e um pouco abaixo
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1, // Duração da animação
                ease: "easeInOut",
                delay: 0.2,    // <<<< ATRASO PARA O PRIMEIRO TEXTO APARECER
            }
        }
    };

    return (
        // O Flex que você já tinha, adaptado para um slide
        <Flex
            w='100%'
            h='100%'
            overflow="hidden" // Para garantir que o conteúdo não vaze do border radius
        >
            <Flex
                w='100%'
                maxH={{ base: '100%', md: 400 }}
                flexDir={{ base: 'column-reverse', md: 'row' }}
                alignItems="center"
                justify="space-between"
                gap={{ base: 4, md: 12 }}
                pl={{ base: 0, md: 10, lg: 16 }}
            >
                {/* Bloco de Texto e Botão (Esquerdo) */}
                <MotionFlex
                    style={{ flex: 1.2, display: 'flex', flexDirection: 'column', gap: '1rem', cursor: 'grab' }} // Ajustado para MotionFlex
                    alignItems={'stretch'}
                    initial="hidden"
                    whileInView="visible" // Anima quando entra na viewport
                    viewport={{ once: true, amount: 0.3 }} // Configurações do viewport
                    variants={slideContentVariants}
                >
                    <MotionFlex
                        flexDir={'column'} justifyContent={'space-between'} p={{ base: 8, md: '' }} gap={12}
                        initial='hidden'
                        whileInView='visible'
                        variants={ProductCarouselVariants}
                    >

                        <Flex flexDir={'column'} justifyContent={'space-between'} gap={{ base: 4, md: 6 }} my='auto'>
                            <Flex flexDir={'column'} gap={{ base: 4, md: 2 }} textAlign={{ base: 'center', md: 'left' }} >
                                <CustomText
                                    as={'h2'} // Use tags semânticas corretas
                                    text={service.title}
                                    fontSize={{ base: '2xl', md: '3xl', lg: '5xl' }}
                                    color={'textPrimary'} // Do seu tema
                                    fontWeight="bold" // Títulos geralmente são bold
                                    lineHeight={1.2}
                                />
                                {service.subtitle && (
                                    <CustomText
                                        as={'h3'}
                                        text={service.subtitle}
                                        fontSize={{ base: 'md', md: 'lg' }}
                                        color="textSecondary" // Do seu tema
                                        mb={{ base: 4, md: 6 }}
                                    />
                                )}
                            </Flex>
                            {!isMobile ? (

                                <Flex width="full" justifyContent={{ base: 'center', md: 'flex-start' }}>
                                    <GetStartedMotionButton
                                        text="Saiba Mais"
                                    />
                                </Flex>
                            ) : null}
                        </Flex>

                        <Flex w={{ base: '100%' }} justifyContent={{ base: 'space-between', md: 'initial' }}>
                            <IconButton
                                className="swiper-button-prev-custom"
                                aria-label="Call support"
                                variant={'ghost'}
                                _hover={{ bg: 'transparent', color: 'brand.500' }}
                            >
                                <PiCaretLeft />
                            </IconButton>

                            {isMobile ?
                                <Flex width="full" justifyContent={{ base: 'center', md: 'flex-start' }}>
                                    <GetStartedMotionButton
                                        text="Saiba Mais"
                                    />
                                </Flex>
                                : ''
                            }
                            <IconButton
                                className="swiper-button-next-custom"
                                aria-label="Call support"
                                variant={'ghost'}
                                _hover={{ bg: 'transparent', color: 'brand.500' }}
                            >
                                <PiCaretRight />
                            </IconButton>
                        </Flex>

                    </MotionFlex>
                </MotionFlex>

                {/* Imagem (Direita) - Você precisará de imagens para cada serviço */}
                <MotionFlex
                    style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}
                    initial="hidden"
                    whileInView="visible"
                    // viewport={{ once: true, amount: 0.3 }}
                    variants={slideContentVariants}
                >
                    {/* Substitua por uma imagem real do serviço ou um ícone grande */}
                    <Image
                        w='100%'
                        h='100%'
                        maxH={{ base: 64, md: '100%' }} // Altura máxima para manter a proporção
                        src={service.image ? `/showcase/${service.image}` : `https://placehold.co/400x300/FF5F5E/FFFFFF?text=${encodeURIComponent(service.title)}`} // Exemplo
                        alt={`Ilustração para ${service.title}`}
                        objectFit="cover" // Use 'contain' para ícones ou ilustrações
                        objectPosition={'center'}
                    />
                </MotionFlex>
            </Flex>

        </Flex>
    );
}