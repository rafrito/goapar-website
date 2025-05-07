import { Button, Circle, Flex, Input, Popover, Portal, SimpleGrid, Text } from "@chakra-ui/react"
import axios from "axios";
import { Main } from "next/document"
import { useState, useEffect } from "react";
import { PiArrowArcRight, PiCaretDoubleDown, PiMinus, PiPlus, PiPlusCircle } from "react-icons/pi"
import { CustomText } from "../ui/CustomText";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";


interface MainProductsListProps {
    start: number;
    end: number;
}

export function MainProductsList({ start, end }: MainProductsListProps) {

    const [products, setProducts] = useState<Products[]>([]);

    const path = usePathname().split('/')

    console.log(path)

    const columnsPerPage = {
        base: 2,
        md: path[1] === 'products' ? 4 : 5
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/get-products')
                const data: Products[] = await response.data;
                setProducts(data);
            } catch (error) {
                console.error("Failed to fetch product types:", error);
            }
        };

        fetchData();
    }, []); // The empty dependency array ensures this effect runs only once when the component mounts.

    const [hoveredProductIndex, setHoveredProductIndex] = useState<number | null>(null); // Estado para controlar o hover individualmente

    return (
        <Flex gap={8} w='100%' alignItems={'center'} justifyContent={'space-between'}>
            <SimpleGrid columns={columnsPerPage} gap={4} w='100%' maxW={1920} p={4} >
                {products.slice(start, end).map((prod, idx) => {
                    return (
                        // bgImage={`url(/photos/prod-${idx + 1}.png)`}
                        <Flex flexDir={'column'}>
                            <Flex key={idx} h={{ base: 300, md: 348 }} w={'100%'} flexDir={'column'} alignItems={'end'} justifyContent={'end'} gap={4} bgImage={`url(${prod.image})`} bgSize={'cover'} bgPos={'center'} borderRadius={8} position={'relative'}>

                                <Flex
                                    position="absolute" // ESSENCIAL para posicionar a div de cores
                                    w='100%'
                                    alignItems={'end'}
                                    justifyContent={'end'}
                                >
                                    <Flex
                                        w='100%'
                                        bgColor={'whiteAlpha.800'}
                                        borderRadius={8}
                                        opacity={hoveredProductIndex === idx ? 1 : 0} // Altera a opacidade com base no índice do produto
                                        transition="opacity 0.2s ease-in-out" // Transição suave
                                        alignItems={'end'}
                                        justifyContent={'start'}
                                    >
                                        <Flex flexDir={'column'} alignItems={'start'} justifyContent={'start'} gap={4} p={4}>
                                            <Flex>
                                                <CustomText text={prod.name} fontSize={'sm'} color={'black'} fontWeight={'semibold'} />
                                            </Flex>
                                            <Flex gap={2}>
                                                {prod.colors.map((color) => (
                                                    <Circle
                                                        key={color.hex}
                                                        size="20px"
                                                        bg={color.hex}
                                                        border="1px solid"
                                                        borderColor={
                                                            color.hex.toLowerCase() === '#ffffff' || color.hex.toLowerCase() === '#fff'
                                                                ? 'gray.300'
                                                                : 'transparent'
                                                        }
                                                        cursor="pointer"
                                                        onClick={(e) => {
                                                            e.stopPropagation(); // Impede que o clique feche o popover se ele estiver dentro de um trigger
                                                            // handleColorClick(color); // Assuming handleColorClick is defined elsewhere or will be added
                                                        }}
                                                        _hover={{
                                                            transform: 'scale(1.2)',
                                                            boxShadow: 'outline',
                                                        }}
                                                        title={color.name}
                                                        transition="transform 0.1s ease-in-out, box-shadow 0.1s ease-in-out"
                                                    />
                                                ))}
                                            </Flex>
                                        </Flex>
                                    </Flex>

                                </Flex>
                                <Flex
                                    position="absolute" // ESSENCIAL para posicionar a div de cores
                                    bottom={4}
                                    right={4}
                                    cursor={'pointer'}
                                    onClick={() => setHoveredProductIndex(hoveredProductIndex === idx ? null : idx)} // Alterna o estado do produto clicado
                                >
                                    {hoveredProductIndex === idx ?
                                        <PiCaretDoubleDown size={24} />
                                        :
                                        <PiPlus size={24} />
                                    }
                                </Flex>
                            </Flex>
                            <Flex flexDir={'column'} alignItems={'start'} justifyContent={'start'} gap={1} py={2} w='100%'>
                                <CustomText text={prod.name} fontSize={'md'} fontWeight={'semibold'} />
                                <CustomText text={`R$ ${prod.price}`} fontSize={'md'} fontWeight={'semibold'} />
                            </Flex>
                        </Flex>
                    )
                })}
            </SimpleGrid>
        </Flex>
    )
}
