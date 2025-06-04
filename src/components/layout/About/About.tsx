'use client'
import { CustomText } from "@/components/ui/CustomText";
import { about } from "@/data/texts";
import { Flex, Text } from "@chakra-ui/react";
import { motion, Variants } from "framer-motion";



export function About() {
    const MotionFlex = motion(Flex)

    const aboutVariants: Variants = {
        hidden: {
            opacity: 0, y: 120
        },
        visible: {
            opacity: 1, y: 0,
            transition: { duration: 2, ease: 'easeInOut' }
        }
    }

    return (

        <MotionFlex flexDir={'column'} alignItems={'center'} justifyContent={'center'} p={{ base: 4, md: 40 }} textAlign={'center'} gap={4}
            variants={aboutVariants}
            initial='hidden'
            whileInView={'visible'}>
            <Flex>
                <CustomText
                    letterSpacing={1.3}
                    textTransform={'uppercase'}
                    fontSize={{ base: '3xl', md: '5xl' }}
                    text={about.title}
                />
            </Flex>
            <Flex>
                <CustomText
                    letterSpacing={1.3}
                    lineHeight={1.8}
                    fontSize={{ base: 'sm', md: '2xl' }}
                    text={about.description}
                />
            </Flex>
        </MotionFlex>
    )
}