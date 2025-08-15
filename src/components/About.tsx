import React from 'react';
import {
	Box,
	Flex,
	Heading,
	Text,
	Button,
	useBreakpointValue
} from '@chakra-ui/react';
import { motion, Variants } from 'framer-motion';


const containerVariants: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.15 }
	}
};

const imageVariantsLeft: Variants = {
	hidden: {
		opacity: 0,
		x: -50
	},
	visible: {
		opacity: 1,
		x: 100,
		transition: {
			duration: 0.8,
			ease: "easeOut"
		}
	}
};

const flexVariantsRight: Variants = {
	hidden: {
		opacity: 0,
		x: 50
	},
	visible: {
		opacity: 1,
		x: -50,
		transition: {
			duration: 0.8,
			ease: "easeOut"
		}
	}
};

export function About() {
	// Configurações responsivas
	const headingSize = useBreakpointValue({ base: '2xl', md: '4xl', lg: '5xl' });
	const textSize = useBreakpointValue({ base: 'md', md: 'lg' });
	const paddingX = useBreakpointValue({ base: 4, md: 8, lg: 16 });
	const paddingY = useBreakpointValue({ base: 16, md: 24, lg: 32 });

	const MotionFlex = motion(Flex);
	const MotionImage = motion(Box);

	return (
		<MotionFlex
			as="section"
			w="100%"
			minH={{ base: '700px', md: '700px' }}
			justifyContent="center"
			alignItems="center"
			px={{ base: 4, md: 8 }}
			bg="light.100"
			textAlign="center"
			initial="hidden"
			animate="visible"
			variants={containerVariants}
		>
			<Flex
				w="100%"
				h="100%"
				direction={{ base: 'column', md: 'row' }}
				align="center"
				justify="center"
			>
				<MotionImage
					flex={{ base: 'none', md: '0 0 40%' }}
					w={{ base: '100%', md: '40%' }}
					h={{ base: '300px', md: '500px' }}  // Fixed height
					bgImage={`linear-gradient(rgba(255, 255, 255, 0.9), rgba(252, 252, 252, 0)), url('/about/about-bg.jpg')`}
					bgSize="cover"
					bgPos="center"  // Changed from bgPos
					borderRadius="md"
					initial="hidden"
					animate="visible"    // Changed from whileInView
					mr={{ base: 0, md: 8 }}
					mb={{ base: 8, md: 0 }}
					overflow="hidden"    // Added to ensure image stays within bounds
					variants={imageVariantsLeft}
				/>
				{/* Right: Content */}
				<MotionFlex
					w={{ base: '100%', md: '60%' }}
					h={{ base: '300px', md: '500px' }}
					flex="1"
					direction="column"
					align="center"
					justify="center"
					textAlign="center"
					color="white"
					variants={flexVariantsRight}
					zIndex={2}
					px={paddingX}
					py={paddingY}
					my={{ base: 8, md: 8 }}
					minH={{ base: '60vh', md: '70vh' }}
					border="6px solid"
					borderColor="brand.300"
					borderRadius="md"
					boxShadow="lg"
				>
					<Heading
						as="h1"
						fontSize={headingSize}
						fontWeight="bold"
						mb={6}
						maxW="4xl"
						lineHeight={1.2}
						color="dark.700"
					>
						Uma empresa especializada em renovar o seu negócio
					</Heading>

					<Text
						fontSize={textSize}
						mb={8}
						maxW="2xl"
						lineHeight={1.6}
						fontWeight="medium"
						color={"dark.400"}
					>
						Este é um ótimo espaço para escrever um texto longo sobre a sua empresa e seus serviços.
						Você pode usar esse espaço para entrar em detalhes sobre a sua empresa. Fale sobre a sua
						equipe e sobre os serviços prestados por você. Conte aos seus visitantes sobre como teve
						a ideia de iniciar o seu negócio e o que o torna diferente de seus competidores.
						Faça com que sua empresa se destaque e mostre quem você é.
					</Text>

					<Button
						size="lg"
						colorScheme="blue"
						px={8}
						py={6}
						fontSize="lg"
						fontWeight="bold"
						borderRadius="md"
						_hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
						transition="all 0.2s"
					>
						Saiba Mais
					</Button>
				</MotionFlex>
			</Flex>
		</MotionFlex>
	);
};