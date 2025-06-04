'use client'
import { CustomText } from "@/components/ui/CustomText";
import { CasesProps } from "@/data/cases";
import { Button, Flex, Link, Tag, Text } from "@chakra-ui/react";
import { motion, Variants } from "framer-motion";
import { FaLongArrowAltRight } from "react-icons/fa";


interface CasesDataProps {
    c: CasesProps
}

export function Cases({ c }: CasesDataProps) {

    const { description, image, orientation, product, tagLabel } = c

    const MotionText = motion(CustomText)
    const MotionFlex = motion(Flex)
    const MotionTag = motion(Tag.Root)
    const MotionButton = motion(Button)


    const isImageLeft = orientation === 'image-left';

    const CaseFlexVariantsRight: Variants = {
        hidden: {
            opacity: 0, x: '10%'
        },
        inView: {
            opacity: 1, x: 0,
            transition: {
                duration: 1.4, ease: 'easeInOut'
            }
        }
    }

    const CaseFlexVariantsLeft: Variants = {
        hidden: {
            opacity: 0, x: '-10%'
        },
        inView: {
            opacity: 1, x: 0,
            transition: {
                duration: 1.4, ease: 'easeInOut'
            }
        }
    }

    const buttonVariants: Variants = {
        initial: { // Estado normal (sem hover, sem clique)
            boxShadow: "0px 2px 5px rgba(0,0,0,0.1)", // Sombra sutil inicial (opcional)
            width: 240
        },
        hover: { // Estado no hover
            backgroundColor: '#FF5F5E',
            boxShadow: "0px 4px 12px rgba(0,0,0,0.15)", // Sombra um pouco maior
            width: 600,
            transition: { // Transição específica para o estado de hover
                type: "spring", // Tipo de transição (spring, tween)
                stiffness: 400,
                damping: 100
            }
        },
        tap: { // Estado ao clicar/pressionar
            scale: 0.80, // Diminui 5%
        }
    };

    return (
        <Flex justifyContent="center">
            <Flex
                w="100%"
                maxWidth="1440px" // or any other max width you want
                justifyContent={'center'}
                alignItems={'start'}
                gap={{ base: 8, md: 24 }}
                flexDir={{ base: 'column', md: isImageLeft ? 'row' : 'row-reverse' }}
            >

                {/* Imagem */}
                <MotionFlex
                    variants={CaseFlexVariantsLeft}
                    initial='hidden'
                    whileInView='inView'
                    w='100%'
                    justifyContent={'right'}
                    pos={'relative'}
                    bgImage={`url(${image})`} h={{ base: 400, md: '100%' }} bgSize={'cover'} bgPos={'center'}
                >
                    <Flex
                        position="absolute"
                        top="0"
                        left="0"
                        right="0"
                        bottom="0"
                        bgGradient="to-r" gradientFrom="#000000" gradientTo="transparent 66%"
                    />
                </MotionFlex>

                {/* Textos */}
                <MotionFlex
                    variants={CaseFlexVariantsRight}
                    initial='hidden'
                    whileInView='inView'
                    flexDir={'column'} w='100%' gap={{ base: 2, md: 8 }}>

                    <Flex flexDir={'column'} gap={{ base: 2, md: 8 }}>

                        <Flex>
                            <MotionText
                                variants={{
                                    hidden: { opacity: 0, y: -20 },
                                    inView: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.5 } }
                                }}
                                text={product} fontSize={{ base: '3xl', md: '6xl' }} lineHeight={1.2} />
                        </Flex>
                        <Flex>
                            <MotionTag
                                variants={{
                                    hidden: { opacity: 0, y: -20 },
                                    inView: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 1 } }
                                }}
                            >
                                <Tag.Label
                                    fontSize={{ base: 'lg', md: 'xl' }}
                                    color={'textSecondary'}
                                    py={{ base: 2, md: 4 }}
                                    px={{ base: 4, md: 6 }}
                                >
                                    {tagLabel}
                                </Tag.Label>
                            </MotionTag>
                        </Flex>
                    </Flex>
                    <Flex>
                        <MotionText
                            variants={{
                                hidden: { opacity: 0, y: -20 },
                                inView: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 1.5 } }
                            }}
                            fontSize={{ base: 'md', md: 'xl' }}
                            color='textSecondary'
                            fontWeight={'regular'}
                            letterSpacing={1.3}
                            text={description} />
                    </Flex>
                    <Flex>
                        <MotionButton
                            fontSize={'md'}
                            initial='initial'
                            whileHover="hover"
                            variants={buttonVariants}
                            borderRadius={'3xl'}
                            bgColor={'transparent'}
                            border={'1px solid #ff5f5e88'}
                            color={'textPrimary'}
                            justifyContent={'space-between'}
                        >
                            Clique para saber mais
                            <FaLongArrowAltRight />
                        </MotionButton>

                    </Flex>
                </MotionFlex>
            </Flex>
        </Flex>
    )
}