'use client'


import {
    Flex,
    Image,
    Link as ChakraLink,
    Box,
    Portal,
    Menu,
    Button, // Importe o Portal do Chakra UI ou da biblioteca do seu Menu
} from "@chakra-ui/react";
import { PiList } from "react-icons/pi";
import { ColorModeButton } from "../ui/color-mode";
import { CustomText } from "../ui/CustomText";
import { MotionButton } from "../ui/MotionButton";
import { logoSrc } from "@/utils";
import { HeaderMobileMenu } from "./HeaderMobileMenu";
import { motion, Variants } from "framer-motion";

export function Header() {

    const MotionFlex = motion(Flex);


    const headerlVariants: Variants = {
        hidden: { opacity: 0 }, // Começa invisível e um pouco abaixo
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6, // Duração da animação
                ease: "easeInOut",
            }
        }
    }

    return (
        <MotionFlex
            as="header"
            justifyContent={'space-between'}
            initial="hidden"
            animate="visible"
            variants={headerlVariants}
            alignItems="center"
            py={4}
            px={{ base: 4, md: 2 }}
            w='100%'
            color={'headerColor'}
        >
            {/* Seção Esquerda: Logo e Navegação Desktop */}
            <Flex alignItems={'center'} gap={{ base: 2, md: 8 }}>
                <ChakraLink href="/" _focus={{ boxShadow: 'none' }}>
                    <Image src={logoSrc} alt="Logo" objectFit={'contain'} maxW={{ base: 32, md: 32 }} />
                </ChakraLink>
            </Flex>

            {/* Seção Direita: Ações e Menu Mobile */}
            <Flex alignItems={'center'} gap={{ base: 2, sm: 3, md: 4 }}>

                <Flex gap={8} fontSize={'sm'} display={{ base: 'none', md: 'flex' }}>
                    <ChakraLink _hover={{ cursor: 'pointer', color: 'brand.500', textDecoration: 'none' }}>
                        <CustomText color={'headerColor'} text={'Home'} letterSpacing={1.8} textTransform={'uppercase'} />
                    </ChakraLink>
                    <ChakraLink _hover={{ cursor: 'pointer', color: 'brand.500', textDecoration: 'none' }}>
                        <CustomText color={'headerColor'} text={'Consultoria'}letterSpacing={1.8} textTransform={'uppercase'} />
                    </ChakraLink>
                    <ChakraLink _hover={{ cursor: 'pointer', color: 'brand.500', textDecoration: 'none' }}>
                        <CustomText color={'headerColor'} text={'Tecnologia'}letterSpacing={1.8} textTransform={'uppercase'} />
                    </ChakraLink>
                    <ChakraLink _hover={{ cursor: 'pointer', color: 'brand.500', textDecoration: 'none' }}>
                        <MotionButton />
                    </ChakraLink>
                </Flex>


                {/* Menu Mobile (Hamburger) - Usando a estrutura Menu.Root */}
                <HeaderMobileMenu />

            </Flex>
        </MotionFlex>
    );
}