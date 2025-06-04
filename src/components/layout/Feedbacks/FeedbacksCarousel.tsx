// src/components/layout/FeedbacksCarousel.tsx
'use client';

import {
    Box,
    Text,
    Flex,
    Avatar, // Para a imagem do autor
    Heading,
    HStack,
    Icon,
    VStack,
} from '@chakra-ui/react';
import { useColorModeValue } from '@/components/ui/color-mode';
import { Testimonial } from '@/data/testimonials';
import { PiStarFill } from 'react-icons/pi';

interface TestimonialCardProps {
    testimonial: Testimonial;
}
export function FeedbacksCarousel({ testimonial }: TestimonialCardProps) {

    const cardBg = useColorModeValue('gray.700', 'gray.800'); // Fundo escuro como na imagem
    const quoteColor = useColorModeValue('gray.200', 'gray.300');
    const authorNameColor = useColorModeValue('white', 'white');
    const authorTitleColor = useColorModeValue('gray.400', 'gray.500');
    const starColor = useColorModeValue('yellow.400', 'yellow.500');


    return (
        <Flex
            direction="column"
            bg={cardBg}
            p={{ base: 6, md: 8 }}
            borderRadius="2xl" // Bordas bem arredondadas como na imagem
            boxShadow="xl"
            minH="320px" // Altura mínima para consistência
            justifyContent="space-between"
            color="white" // Cor de texto padrão para o card escuro
            width="100%"
        >
            <Box>
                <Text fontSize={{ base: 'md', md: 'lg' }} color={quoteColor} mb={6} lineHeight="tall">
                    "{testimonial.quote}"
                </Text>
            </Box>

            <VStack gap={3} align="flex-start" mt={4}>
                <Flex align="center" width="full">
                    {testimonial.authorImage && (

                        <Avatar.Root size={'md'}>
                            <Avatar.Fallback name={testimonial.authorName} />
                            <Avatar.Image src={testimonial.authorImage} />
                        </Avatar.Root>
                    )}
                    <Box>
                        <Text fontWeight="bold" fontSize="md" color={authorNameColor}>
                            {testimonial.authorName}
                        </Text>
                        <Text fontSize="sm" color={authorTitleColor}>
                            {testimonial.authorTitle}
                        </Text>
                    </Box>
                </Flex>
                {testimonial.rating && testimonial.rating > 0 && (
                    <HStack gap={1}>

                        {Array(5).map((idx) => {
                            return (
                                <Icon
                                    key={idx}
                                    as={PiStarFill}
                                    color={starColor} // Preenche estrelas conforme a nota
                                    boxSize={5}
                                />
                            )
                        })}
                    </HStack>
                )}
            </VStack>
        </Flex>
    )
}