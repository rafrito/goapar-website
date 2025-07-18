import { whatsappLink } from "@/utils";
import { Button, Flex, Text } from "@chakra-ui/react";
import { motion, Variants } from "framer-motion";



export function BoTRTCallToAction() {

    const MotionFlex = motion(Flex);
    const MotionButton = motion(Button);
    const MotionText = motion(Text);

    // Animação genérica para cada item de conteúdo (título, texto, botão).
    const itemVariants: Variants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut",
            },
        },
    };

    return (
        <MotionFlex
            w={{ base: 'min', md: 'xl' }}
            zIndex={10}
            px={18}
            py={4}
            bgColor={'brand.700'}
            color={'white'}
            fontWeight={'bold'}
            borderRadius={'sm'}
            textTransform={'uppercase'}
            letterSpacing={'wider'}
            _hover={{ bgColor: "white", color: 'brand.600', transition: 'background-color 0.6s ease' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open(whatsappLink(`Acessei o site do boTRT e gostaria de testar o produto`), '_blank')}
            cursor={'pointer'}
            alignItems={'center'}
            justifyContent={'center'}
        >
            <MotionText fontSize={{ base: 'xl', md: '2xl' }} variants={itemVariants}>Teste grátis</MotionText>
        </MotionFlex >
    )
}