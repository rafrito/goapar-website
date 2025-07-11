// src/components/layout/Title.tsx
'use client';

import { CustomText } from "@/components/ui/CustomText";
import { titleData } from "@/data/main";
import { Button, Flex, Link } from "@chakra-ui/react";
import { motion, Variants } from 'framer-motion';
import { FaLongArrowAltRight } from "react-icons/fa";

const MotionFlex = motion(Flex);
const MotionButton = motion(Button)

export function Title() {
    const titleVariants: Variants = {
        hidden: { opacity: 0, y: 120 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 2,
                ease: "easeInOut",
                delay: 0.8,
            }
        }
    };

    const subtitleVariants: Variants = {
        hidden: { opacity: 0, y: 60 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1.5,
                ease: "easeOut",
                delay: 2.4,
            }
        }
    };

    const buttonVariantsContainer: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                ease: "easeOut",
                delay: 3.0,
            }
        }
    };
    const barVariants: Variants = {
        hidden: { opacity: 0, width: 0 },
        visible: {
            opacity: 1,
            width: '95%',
            transition: {
                duration: 1,
                ease: "easeOut",
                delay: 3.0,
            }
        }
    };

    const buttonVariants: Variants = {
        initial: {
            boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
            color: '#FFFFFF',
            backgroundColor: '#FF5F5E',
            width: 150
        },
        hover: {
            backgroundColor: 'transparent',
            boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
            width: 600,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 100
            }
        },
        tap: {
            scale: 0.80,
        }
    };

    return (
        <Flex
            as="section"
            flexDir={'column'}
            gap={8}
            p={{ base: 4, md: 2 }}
            alignItems={'start'}
            justifyContent={'start'}
            width="100%"
            overflow="hidden"
        >
            <MotionFlex
                flexDir={'column'}
                gap={{ base: 4, md: 2 }}
                textAlign={'start'}
                alignItems={'start'}
                justifyContent={'start'}
            >
                <MotionFlex
                    variants={titleVariants}
                    initial='hidden'
                    animate='visible'
                >
                    <CustomText
                        as={'h1'}
                        maxW={{ base: "100%", sm: "80%", md: "700px" }}
                        text={titleData.title1}
                        fontWeight={'semibold'}
                        fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '64px' }}
                        lineHeight={1.1}
                        color="transparent"
                        bgClip="text"
                        bgGradient="to-l"
                        gradientFrom={'brand.900'}
                        gradientTo={'brand.500'}
                    />
                </MotionFlex>
                <MotionFlex
                    variants={titleVariants}
                    initial='hidden'
                    animate='visible'
                >
                    <CustomText
                        as={'h1'}
                        maxW={{ base: "100%", sm: "80%", md: "700px" }}
                        text={titleData.title2}
                        fontWeight={'semibold'}
                        fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '64px' }}
                        lineHeight={1.1}
                        color="textPrimary"
                    />
                </MotionFlex>

                <MotionFlex
                    variants={subtitleVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <CustomText
                        as={'h2'}
                        maxW={{ base: "100%", sm: "70%", md: "600px" }}
                        py={{ base: 2, md: 8 }}
                        text={titleData.subtitle}
                        lineHeight={1.5}
                        fontSize={{ base: 'md', md: 'lg', lg: '2xl' }}
                        color='textSecondary'
                    />
                </MotionFlex>

                <MotionFlex
                    variants={barVariants}
                    initial="hidden"
                    animate="visible"
                    h={0.2} w={'95%'} bgColor={'red'}
                    bgGradient="to-r"
                    gradientFrom={'brand.400'}
                    gradientTo={'brand.900'}
                />
            </MotionFlex>

            <Link href={titleData.buttonLink} target="_blank">
                <MotionFlex
                    variants={buttonVariantsContainer}
                    initial="hidden"
                    animate="visible"
                >
                    <MotionButton
                        initial='initial'
                        whileHover="hover"
                        variants={buttonVariants}
                        borderRadius={'3xl'}
                        border={'1px solid #ff5f5e'}
                        color={'textPrimary'}
                        justifyContent={'space-between'}
                    >
                        {titleData.buttonText}
                        <FaLongArrowAltRight />
                    </MotionButton>
                </MotionFlex>
            </Link>
        </Flex>
    );
}
