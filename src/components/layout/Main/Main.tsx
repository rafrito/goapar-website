'use client'
import { Flex, Image } from "@chakra-ui/react";
import { Title } from "./Title";
import { motion, Variants } from "framer-motion";
import { CustomersCarousel } from "../Customers/CustomersCarousel";


export function Main() {

    const ImageMotion = motion(Image)

    const imageVariants: Variants = {
        hidden: { opacity: 0 }, // Começa invisível e um pouco abaixo
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 2, // Duração da animação
                ease: "easeInOut",
                delay: 0.2,    // <<<< ATRASO PARA O PRIMEIRO TEXTO APARECER
            }
        }
    }

    return (
        <Flex flexDir={'column'} alignItems={{base:'start', md:'center'}} justifyContent={'center'} w='100%' pt={{base:2, md:8}} pb={16}
            // bgImage={'url(main/faixa.svg)'} bgRepeat={'no-repeat'} bgPos={'bottom'}
        >
            <Flex w='100%' justifyContent={'space-between'} alignItems={{base:'start', md:'center'}} py={{ base: 2, md: 32 }} flexDir={{base:'column-reverse', md:'row'}}>
                <Title />
                <ImageMotion
                    visibility={{base:'visible', md:'visible'}}
                    mx='auto'
                    variants={imageVariants}
                    initial='hidden' // Começa no estado 'hidden'
                    animate='visible' // Anima para o estado 'visible' quando o componente monta
                    className={'rotating-bg'} src={'main/background.svg'} boxSize={{ base: 48, md: 'lg' }} zIndex={-100}
                />
            </Flex>
            <CustomersCarousel />
        </Flex>
    )
}