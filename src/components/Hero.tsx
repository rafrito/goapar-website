
// ============================================================================
//   VARIANTES DE ANIMAÇÃO (Framer Motion)

import { GestaoPageData } from "@/types";
import { whatsappLink } from "@/utils";
import { Flex, Heading, Button, VStack, HStack, Image, Text } from "@chakra-ui/react";
import { motion, Variants } from "framer-motion";

// ============================================================================
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 1.5, ease: "easeOut" }
    }
};



export function Hero({pageData}: { pageData: GestaoPageData}) {

    const MotionFlex = motion(Flex);
    const MotionHeading = motion(Heading);
    const MotionText = motion(Text);
    const MotionButton = motion(Button);
    const MotionImage = motion(Image);
    return (

        < MotionFlex
            as="section"
            w="100%"
            minH={{ base: '700px', md: '700px' }}
            justifyContent="center"
            alignItems="center"
            px={{ base: 4, md: 8 }}
            bg="black"
            // bgImage={`url('/gestao/bg.png')`}
            bgImage={`linear-gradient(rgba(255, 255, 255, 0.0), rgba(255, 255, 255, 0.8)), url('/gestao/bg.jpg')`}
            bgPos="center"
            bgRepeat="no-repeat"
            bgSize={"cover"}
            textAlign="center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            >
            <VStack gap={6} maxW="4xl">
                <MotionImage
                    src={pageData.hero.imgSrc}
                    alt="Logo da GoaPar Imóveis"
                    objectFit={'contain'}
                    maxW={{ base: 64, md: 64 }}
                    variants={itemVariants}
                />
                <MotionHeading
                    as="h1"
                    fontSize={{ base: '3xl', md: '5xl' }}
                    fontWeight="bold"
                    lineHeight={1.2}
                    variants={itemVariants}
                    color="black"
                >
                    {pageData.hero.title}
                </MotionHeading>
                <MotionText
                    fontSize={{ base: 'md', md: 'lg' }}
                    color="black"
                    variants={itemVariants}
                >
                    {pageData.hero.subtitle}
                </MotionText>
                <MotionButton
                    onClick={() => window.open(whatsappLink(), '_blank')}
                    size="lg"
                    py={7}
                    px={8}
                    bgColor={'black'}
                    _hover={{ bgColor: 'ghostWhite', color:'brand.900', transition: '0.3s' }}
                    color={'neutral.200'}
                    fontWeight={"bold"}
                    variants={itemVariants}
                >
                    <HStack gap={2}>
                        <Text>{pageData.hero.ctaButton}</Text>
                    </HStack>
                </MotionButton>
            </VStack>
        </MotionFlex >
    )
}