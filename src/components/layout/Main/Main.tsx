'use client'
import { Flex, Image, Text } from "@chakra-ui/react"; // Importa os componentes do Chakra UI
import { Title } from "./Title"; // Importa o componente Title
import { motion, Variants } from "framer-motion"; // Importa as funções do framer-motion
import { CustomersCarousel } from "../Customers/CustomersCarousel"; // Importa o componente CustomersCarousel
import { mainImageData } from "@/data/main";


export function Main() {


    const ImageMotion = motion(Image) // Cria um componente Image do framer-motion

    const imageVariants: Variants = { // Define as variantes de animação para a imagem
        hidden: { opacity: 0 }, // Começa invisível
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1, // Duração da animação
                ease: "easeInOut",
                delay: 3 + 0.6,    // <<<< ATRASO PARA O PRIMEIRO TEXTO APARECER
            }
        }
    }

    return (
        <Flex // Container principal
            flexDir={'column'} // Direção flexível da coluna
            alignItems={{ base: 'start', md: 'center' }} // Alinhamento dos itens
            justifyContent={'center'} // Justifica o conteúdo ao centro
            w='100%' // Largura de 100%
        >
            <Flex // Container para título e imagem
                w='100%' // Largura de 100%
                justifyContent={'space-between'} // Justifica o conteúdo com espaço entre
                alignItems={{ base: 'start', md: 'center' }} // Alinha os itens
                py={{ base: 2, md: 32 }} // Preenchimento superior e inferior
                flexDir={{ base: 'column-reverse', md: 'row' }} // Direção flexível da linha
                gap={{ base: 8, md: 0 }} // Espaçamento entre os elementos
            >
                <Title />  {/* Título */}
                <ImageMotion // Imagem com animação
                    borderRadius={'full'} // Borda arredondada
                    visibility={{ base: 'visible', md: 'visible' }} // Visibilidade
                    mx='auto' // Margem horizontal automática
                    variants={imageVariants} // Variantes de animação
                    initial='hidden' // Estado inicial
                    animate='visible' // Estado final
                    className={'rotating-bg'} // Classe CSS para rotação
                    src={mainImageData.imageSrc} // Caminho da imagem
                    boxSize={{ base: '80vw', md: 'lg' }} // Tamanho da caixa
                    zIndex={100} // Z-index
                />
            </Flex>
            <CustomersCarousel /> {/* Carrossel de clientes */}
        </Flex>
    )
}