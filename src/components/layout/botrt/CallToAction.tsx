import { Button, Text } from "@chakra-ui/react";
import { motion, Variants } from "framer-motion";



export function BoTRTCallToAction() {

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
        <MotionButton
            w={{ base: 'min', md: 'auto' }
            }
            px={18}
            py={10}
            bgColor={'white'}
            color={'black'}
            fontWeight={'bold'}
            fontSize={{ base: 'lg', md: 'xl' }}
            borderRadius={'lg'}
            textTransform={'uppercase'}
            letterSpacing={'wider'}
            _hover={{ bgColor: "brand.600", color: 'white', transition: 'background-color 0.6s ease' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <MotionText fontSize={'md'} variants={itemVariants}>Teste grátis</MotionText>
        </MotionButton >
    )
}