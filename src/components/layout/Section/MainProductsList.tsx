import { Flex, Menu, Portal, Text } from "@chakra-ui/react"
import { useState, useEffect, useMemo } from "react";
import { PiCaretDownLight } from "react-icons/pi"
import { CustomText } from "../../ui/CustomText";
import { CustomButton } from "../../ui/CustomButton";
import { ProductsList } from "./ProductsList";
import { ShopifyProduct } from "@/types";
import { getProducts, getProductTypes } from "@/lib/shopify";


interface MainProductsListProps {
    start: number;
    end: number;
}

export function MainProductsList({ start, end }: MainProductsListProps) {

    const [products, setProducts] = useState<ShopifyProduct[]>([]);
    const [productTypes, setProductTypes] = useState<string[]>([]);
    const [selectedProductType, setSelectedProductType] = useState<string | null>(null);


    const columnsPerPage = {
        base: 2,
        md: 4
    }

    const [sortValue, setSortValue] = useState("name-asc")
    const items = [
        { label: "Name: Ascending", value: "name-asc" },
        { label: "Name: Descending", value: "name-desc" },
        { label: "Price: Low to High", value: "price-asc" },
        { label: "Price: High to Low", value: "price-desc" },
    ]

    useEffect(() => {
        const fetchProducts = async () => {
            // Assuming getProducts and Product type are imported from your Shopify API client
            // e.g., import { getProducts, Product } from '@/lib/shopify';
            try {
                const products: ShopifyProduct[] = await getProducts(end);
                console.log("Produtos recebidos no cliente:", products);
                setProducts(products);
                const productTypes: string[] = await getProductTypes();
                console.log("Collections recebidos no cliente:", productTypes);
                setProductTypes(productTypes);
                // For now, as getProducts is not defined, I'll use a placeholder
                console.log("Fetching products...");
                // Replace with actual API call when getProducts is available
            } catch (error) {
                console.error("Erro ao buscar produtos:", error);
            }
        };

        fetchProducts();
    }, []);

    // Função para lidar com o clique no botão de tipo de produto
    const handleProductTypeSelect = (type: string) => {
        if (selectedProductType === type) {
            setSelectedProductType(null); // Se clicar no tipo já selecionado, limpa o filtro
        } else {
            setSelectedProductType(type); // Define o novo filtro
        }
    };


    const filteredAndSortedProducts = useMemo(() => {
        if (!products) return [];

        // 1. Filtrar os produtos
        let filteredProducts = products;
        if (selectedProductType) {
            filteredProducts = products.filter(
                (product) => product.productType === selectedProductType // Assumindo que seu ShopifyProduct tem 'productType'
            );
        }

        // 2. Ordenar os produtos filtrados
        const sorted = [...filteredProducts].sort((a, b) => {
            const [sortBy, sortOrder] = sortValue.split('-');

            if (sortBy === 'name') {
                const nameA = a.title.toLowerCase();
                const nameB = b.title.toLowerCase();
                return sortOrder === "asc" ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
            } else if (sortBy === 'price') {
                const priceA = parseFloat(a.priceRange.minVariantPrice.amount);
                const priceB = parseFloat(b.priceRange.minVariantPrice.amount);
                return sortOrder === "asc" ? priceA - priceB : priceB - priceA;
            }
            return 0;
        });
        return sorted;
    }, [products, sortValue, selectedProductType]); // Adicionado selectedProductType como dependência


    return (
        <Flex gap={8} w='100%' alignItems={'center'} justifyContent={'space-between'} flexDir={'column'}>


            <Flex flexDir={'column'} w='100%' p={{base:2,md:4}} borderBottom={'1px solid'} borderColor={'borderColor'} gap={4}>
                <Flex>
                    <CustomText text={'Shop'} fontSize={'lg'} fontWeight={'semibold'} />
                </Flex>
                <Flex flexDir={{base:'column', md:'row'}} justifyContent={'space-between'} alignItems={{base:'start', md:'center'}} gap={4} w='100%'>
                    <Flex gap={1}>
                        <CustomButton
                            text="Todos"
                            onClick={() => setSelectedProductType(null)}
                            variant={selectedProductType === null ? "solid" : "outline"} // Estilo para botão ativo
                            // Adicione outros estilos que seu CustomButton aceita
                            borderColor={selectedProductType === null ? 'black' : 'buttonDarkBg'} // Exemplo de borda
                            colorScheme={selectedProductType === null ? 'black' : undefined} // Exemplo de esquema de cor
                            rounded={'2xl'}
                            isDark={selectedProductType === null}
                            bgColorHover='brand.600' colorHover='white'
                            h={8}
                        />
                        {productTypes.map((type, idx) => {
                            return (
                                <CustomButton key={type + idx} text={type} border={'1px solid'} borderColor={'buttonDarkBg'} rounded={'2xl'} h={8}
                                    bgColorHover='brand.600' colorHover='white'
                                    onClick={() => handleProductTypeSelect(type)} isDark={selectedProductType === type} // CHAMA A FUNÇÃO DE FILTRO
                                />
                            )
                        })}
                    </Flex>
                    <Flex gap={{base:4, md:24}} px={{base:2, md:24}}>
                        <Flex>
                            <Menu.Root>
                                <Menu.Trigger asChild>
                                    <Flex cursor={'pointer'} alignItems={'center'} gap={1}>
                                        <Text>Sort</Text>
                                        <PiCaretDownLight />
                                    </Flex>
                                </Menu.Trigger>
                                <Portal>
                                    <Menu.Positioner>
                                        <Menu.Content minW="10rem">
                                            <Menu.RadioItemGroup
                                                value={sortValue}
                                                onValueChange={(e) => setSortValue(e.value)}
                                            >
                                                {items.map((item) => (
                                                    <Menu.RadioItem key={item.value} value={item.value}>
                                                        {item.label}
                                                        <Menu.ItemIndicator />
                                                    </Menu.RadioItem>
                                                ))}
                                            </Menu.RadioItemGroup>
                                        </Menu.Content>
                                    </Menu.Positioner>
                                </Portal>
                            </Menu.Root>
                        </Flex>
                        <Flex> Filter</Flex>
                    </Flex>
                </Flex>
            </Flex>

            <ProductsList start={start} end={end} columnsPerPage={columnsPerPage} products={filteredAndSortedProducts} />
        </Flex>
    )
}

