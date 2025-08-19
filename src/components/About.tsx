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
		x: 110,
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
		x: -60,
		transition: {
			duration: 1.5,
			ease: "easeOut"
		}
	}
};

export function About() {
	// Configurações responsivas
	const headingSize = useBreakpointValue({ base: 'xl', md: '2xl', lg: '4xl' });
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
			bg="neutral.100"
			textAlign="center"
			initial="hidden"
			animate="visible"
			variants={containerVariants}
		>
			<Flex
				w="100%"
				h="100%"
				direction={{ base: 'column', md: 'row' }}
				m={{ base: 4, md: 8 }}
				align="center"
				justify="center"
			>
				<MotionImage
					flex={{ base: 'none', md: '0 0 40%' }}
					w={{ base: '100%', md: '40%' }}
					h={{ base: '400px', md: '600px' }}
					bgImage={`linear-gradient(rgba(255, 255, 255, 0.2), rgba(252, 252, 252, 0.2)), url('/about/about-bg.jpg')`}
					bgSize="cover"
					bgPos="center"
					borderRadius="md"
					mr={{ base: 0, md: 8 }}
					mb={{ base: 8, md: 0 }}
					variants={imageVariantsLeft}
				/>
				{/* Right: Content */}
				<MotionFlex
					w={{ base: '100%', md: '60%' }}
					h={{ base: '250px', md: '300px' }}
					flex={{ base: 'none', md: '0 0 50%' }}					
					direction="column"
					align="center"
					justify="center"
					textAlign="left"
					color="white"
					variants={flexVariantsRight}
					zIndex={2}
					px={paddingX}
					py={paddingY}
					m={{ base: 10, md: 20 }}
					minH={{ base: '50vh', md: '60vh' }}
					border="8px solid"
					borderColor="brand.700"
					boxShadow="lg"
				>
					<Heading
						as="h2"
						fontSize={headingSize}
						fontWeight="bold"
						m={{ base: 6, md: 4 }}
						maxW="4xl"
						lineHeight={1.2}
						color="neutral.700"
					>
						Uma empresa especializada em renovar o seu negócio
					</Heading>

					<Text
						fontSize={textSize}
						m={{ base: 6, md: 4 }}
						maxW="2xl"
						lineHeight={1.6}
						fontWeight="medium"
						color={"neutral.400"}
					>
						Este é um ótimo espaço para escrever um texto longo sobre a sua empresa e seus serviços.
						Você pode usar esse espaço para entrar em detalhes sobre a sua empresa. Fale sobre a sua
						equipe e sobre os serviços prestados por você. Conte aos seus visitantes sobre como teve
						a ideia de iniciar o seu negócio e o que o torna diferente de seus competidores.
						Faça com que sua empresa se destaque e mostre quem você é.
					</Text>
				</MotionFlex>
			</Flex>
		</MotionFlex>
	);
};