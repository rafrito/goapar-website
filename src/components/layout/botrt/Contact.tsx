// src/components/layout/ContactUs.tsx
'use client';

// --- React e Frameworks ---
import { useState } from 'react';
import {
    Flex,
    Heading,
    Text,
    VStack,
    Button,
    Icon,
    Field,
    Input,
    Textarea,
    Stack,
} from "@chakra-ui/react";
import { motion, Variants } from 'framer-motion';
import { useForm } from "react-hook-form";

// --- Ícones ---
import { PiHeadset, PiWhatsappLogo } from "react-icons/pi";

// ============================================================================
//   DADOS E FUNÇÕES UTILITÁRIAS
// ============================================================================

const whatsappNumber = 5511971815592;

// Interface para os valores do formulário
interface FormValues {
    name: string;
    message: string;
}

// Função que gera o link do WhatsApp
const generateWhatsappLink = (name: string, message: string): string => {
    const formattedMessage = `Olá, meu nome é ${name}. Gostaria de falar sobre o seguinte: ${message}`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(formattedMessage)}`;
};

// ============================================================================
//   VARIANTES DE ANIMAÇÃO (Framer Motion)
// ============================================================================
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2 }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

// ============================================================================
//   COMPONENTE PRINCIPAL: ContactUs
// ============================================================================
export function ContactUs() {
    const MotionFlex = motion(Flex);
    const MotionHeading = motion(Heading);
    const MotionText = motion(Text);

    // Configuração do react-hook-form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();

    // Função chamada no envio bem-sucedido do formulário
    const onSubmit = handleSubmit((data) => {
        const link = generateWhatsappLink(data.name, data.message);
        window.open(link, '_blank');
    });

    return (
        <MotionFlex
            as="section"
            w="100%"
            py={{ base: 16, md: 24 }}
            px={{ base: 4, md: 8 }}
            bg="gray.900"
            color="white"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            <Flex
                w="100%"
                direction={{ base: 'column', lg: 'row' }}
                gap={{ base: 12, lg: 16 }}
                alignItems="center"
            >
                {/* Coluna da Esquerda (Visual de Suporte) */}
                <MotionFlex
                    justify="center"
                    align="center"
                    variants={itemVariants}
                    w='100%'
                >
                    <Flex
                        w={{ base: '200px', md: '300px' }}
                        h={{ base: '200px', md: '300px' }}
                        justify="center"
                        align="center"
                        bgGradient="radial(circle, brand.700, gray.900 70%)"
                        borderRadius="full"
                    >
                        <Icon as={PiHeadset} boxSize={{ base: 24, md: 40 }} color="brand.400" />
                    </Flex>
                </MotionFlex>

                {/* Coluna da Direita (Formulário) */}
                <MotionFlex
                    direction="column"
                    gap={4}
                    w="100%"
                    variants={itemVariants}
                >
                    <MotionHeading as="h2" size="2xl" fontWeight="bold" variants={itemVariants}>
                        Fale Conosco
                    </MotionHeading>
                    <MotionText color="gray.400" fontSize="lg" maxW="lg" variants={itemVariants}>
                        Tem alguma dúvida ou quer discutir um projeto? Preencha o formulário abaixo e nossa equipe entrará em contato o mais breve possível.
                    </MotionText>

                    {/* Seu formulário, agora integrado */}
                    <Flex as="form" onSubmit={onSubmit} w="100%" mt={8}>
                        <Stack gap="6" w="100%" maxW="lg">
                            <Field.Root invalid={!!errors.name}>
                                <Field.Label>Seu Nome</Field.Label>
                                <Input
                                    placeholder="Digite seu nome completo"
                                    size="lg"
                                    {...register("name", { required: "O nome é obrigatório" })}
                                />
                                <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
                            </Field.Root>

                            <Field.Root invalid={!!errors.message}>
                                <Field.Label>Mensagem</Field.Label>
                                <Textarea
                                    placeholder="Como podemos ajudar?"
                                    size="lg"
                                    rows={5}
                                    {...register("message", { required: "A mensagem é obrigatória" })}
                                />
                                <Field.ErrorText>{errors.message?.message}</Field.ErrorText>
                            </Field.Root>

                            <Button
                                type="submit"
                                bgColor={"brand.500"}
                                color={"white"}
                                _hover={{ bgColor: "brand.600" }}
                                size="lg"
                                w={{ base: '100%', md: 'auto' }}
                                alignSelf={{ base: 'stretch', md: 'flex-start' }}

                            >
                                <PiWhatsappLogo />
                                Enviar via WhatsApp
                            </Button>
                        </Stack>
                    </Flex>
                </MotionFlex>
            </Flex>
        </MotionFlex>
    );
}
