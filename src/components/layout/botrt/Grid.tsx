// src/components/layout/BotrtGrid.tsx
'use client';

// --- Framework e UI Libs ---
import {
    Heading,
    Text,
    Icon,
    VStack,
    SimpleGrid,
    Flex,
} from "@chakra-ui/react";
import { motion, Variants } from 'framer-motion';
import { PiClockClockwise, PiShieldCheck, PiChartLineUp } from "react-icons/pi";

// ============================================================================
//   VARIÁVEL gridData COM TODOS OS TEXTOS E SRCs
// ============================================================================
export const gridData = {
    section: {
        heading: "Tudo que você precisa",
        description: "Desfrute de listas personalizáveis, ferramentas de trabalho em equipe e rastreamento inteligente, tudo em um só lugar. Defina tarefas, receba lembretes e veja seu progresso de forma simples e rápida."
    },
    features: [
        {
            iconSrc: "PiClockClockwise",
            title: "Eficiência Máxima",
            description: "Transforme horas de pesquisa manual em segundos. Nossa automação extrai dados processuais de forma rápida e contínua, liberando sua equipe para focar em atividades estratégicas."
        },
        {
            iconSrc: "PiShieldCheck",
            title: "Precisão e Segurança",
            description: "Elimine o risco de erro humano na coleta de informações. O BoTRT garante dados precisos e confiáveis, oferecendo mais segurança e tranquilidade na gestão dos seus prazos e processos."
        },
        {
            iconSrc: "PiChartLineUp",
            title: "Inteligência Estratégica",
            description: "Não apenas colete dados, use-os a seu favor. A plataforma organiza as informações de forma inteligente, permitindo uma visão clara e analítica da sua carteira de casos."
        }
    ]
};

// ============================================================================
//   DADOS DAS VANTAGENS
// ============================================================================
const featuresData = [
    {
        icon: PiClockClockwise,
        title: gridData.features[0].title,
        description: gridData.features[0].description
    },
    {
        icon: PiShieldCheck,
        title: gridData.features[1].title,
        description: gridData.features[1].description
    },
    {
        icon: PiChartLineUp,
        title: gridData.features[2].title,
        description: gridData.features[2].description
    }
];

// ============================================================================
//   VARIANTES DE ANIMAÇÃO (Framer Motion)
// ============================================================================
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        }
    }
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
};

// ============================================================================
//   COMPONENTE PRINCIPAL: BotrtGrid
// ============================================================================
export function BotrtGrid() {
    const MotionFlex = motion(Flex);

    return (
        <Flex
            as="section"
            flexDir={'column'}
            w="100%"
            py={{ base: 16, md: 24 }}
            px={{ base: 4, md: 8 }}
            bg="black"
            color="white"
        >
            <VStack gap={4} textAlign="center" mb={{ base: 12, md: 16 }}>
                <Heading
                    as="h2"
                    fontSize={{ base: '4xl', md: '6xl' }}
                    fontWeight="bold"
                    lineHeight={1.2}
                >
                    {gridData.section.heading}
                </Heading>
                <Text
                    fontSize={{ base: 'md', md: 'xl' }}
                    color="gray.400"
                    maxW="2xl"
                    mx="auto"
                >
                    {gridData.section.description}
                </Text>
            </VStack>

            <MotionFlex
                flexDir={{ base: 'column', md: 'row' }}
                gap={{ base: 6, md: 8 }}
                maxW="container.lg"
                mx="auto"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                {featuresData.map((feature, index) => (
                    <MotionFlex
                        key={index}
                        variants={cardVariants}
                    >
                        <FeatureCard
                            icon={feature.icon}
                            title={feature.title}
                            description={feature.description}
                        />
                    </MotionFlex>
                ))}
            </MotionFlex>
        </Flex>
    );
}

// ============================================================================
//   SUB-COMPONENTE: FeatureCard
// ============================================================================
interface FeatureCardProps {
    icon: React.ElementType;
    title: string;
    description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
    return (
        <VStack
            p={{base:4, md:8}}
            bg="#0b0b0bff"
            borderRadius="xl"
            border="1px solid"
            borderColor="gray.800"
            gap={5}
            textAlign="center"
            h="100%"
            transition="transform 0.2s ease-in-out, border-color 0.2s ease-in-out"
            _hover={{
                transform: "translateY(-5px)",
                borderColor: "brand.500"
            }}
        >
            <Flex
                p={3}
                bg="gray.800"
                borderRadius="lg"
                justify="center"
                align="center"
            >
                <Icon as={icon} boxSize={12} color="white" />
            </Flex>
            <Heading as="h3" size={{base:"lg", md:"2xl"}}>{title}</Heading>
            <Text color="gray.400" fontSize={{base:"md", md:"lg"}}>{description}</Text>
        </VStack>
    );
}
