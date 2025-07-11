'use client';


import { CustomText } from "@/components/ui/CustomText";
import { GetStartedMotionButton, MotionButton } from "@/components/ui/MotionButton";
import { awerServices, Service } from "@/data/services";
import { Flex, IconButton, Image, useBreakpointValue } from "@chakra-ui/react";

// Importações do Swiper
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules'; // Módulos que você quer usar

// Importar os estilos do Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { motion, Variants } from 'framer-motion';
import { Swiper, SwiperSlide } from "swiper/react";
import { PiArrowLeft, PiArrowLeftBold, PiArrowRightBold, PiCaretLeft, PiCaretRight } from "react-icons/pi";


export function ProductCarousel() {

    const slidesPerView = 1


    return (
        <Flex w='100%' justifyContent={'center'} alignItems={'center'} p={{ base: 4, md: 20 }}>
            <Flex flexDir={'row'} w='100%' borderRadius={64} p={1} bgColor={'transparent'}>
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
        </Flex>
    )
}



// Componente para um slide individual
interface ServiceSlideProps {
    service: Service;
}

function ServiceSlide({ service }: ServiceSlideProps) {

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
            transition: { duration: 1, ease: [0.0, 0.0, 0.58, 1.0] }
        }
    };

    return (
        // O Flex que você já tinha, adaptado para um slide
        <Flex
            w='100%'
            bg="gray.900" // Do seu tema
            border={'1px solid'}
            borderColor={'showCaseBorder'}
            borderRadius={"md"}
            overflow="hidden" // Para garantir que o conteúdo não vaze do border radius
        >
            <Flex
                flexDir={{ base: 'column-reverse', md: 'row' }}
                gap={{ base: 4, md: 8 }}
                pl={{ base: 0, md: 10, lg: 16 }}
                align="center"
                justify="space-between"
                maxH={{ base: 600, md: 600 }}
            >
                {/* Bloco de Texto e Botão (Esquerdo) */}
                <motion.div
                    initial="hidden"
                    whileInView="visible" // Anima quando entra na viewport
                    viewport={{ once: true, amount: 0.3 }} // Configurações do viewport
                    variants={slideContentVariants}
                    style={{ flex: 1.2, display: 'flex', flexDirection: 'column', gap: '1rem', cursor: 'grab' }} // Ajustado para motion.div
                >
                    <Flex flexDir={'column'} justifyContent={'space-between'} p={{ base: 8, md:'' }} gap={8}>
                        <Flex flexDir={'column'}>
                            <Flex flexDir={'column'} gap={{ base: 4, md: 2 }} textAlign={{ base: 'center', md: 'left' }}>
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
                    </Flex>
                </motion.div>

                {/* Imagem (Direita) - Você precisará de imagens para cada serviço */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={slideContentVariants}
                    style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'}}
                >
                    {/* Substitua por uma imagem real do serviço ou um ícone grande */}
                    <Image
                        src={service.image ? `/showcase/${service.image}` : `https://placehold.co/400x300/FF5F5E/FFFFFF?text=${encodeURIComponent(service.title)}`} // Exemplo
                        alt={`Ilustração para ${service.title}`}
                        borderRadius="md"
                        w='100%'
                        h={{ base: 200, md: 500 }}
                        objectFit="cover" // Use 'contain' para ícones ou ilustrações
                        objectPosition={'center'}
                    />
                </motion.div>
            </Flex>

        </Flex>
    );
}