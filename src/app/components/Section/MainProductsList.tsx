import { Flex, Menu, Portal, Text } from "@chakra-ui/react"
import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import { PiCaretDownLight } from "react-icons/pi"
import { CustomText } from "../ui/CustomText";
import { CustomButton } from "../ui/CustomButton";
import { ProductsList } from "./ProductsList";
import { ShopifyCollection, ShopifyProduct } from "@/types";
import { getCollections, getProducts, getProductTypes } from "@/lib/shopify";


interface MainProductsListProps {
    start: number;
    end: number;
}

export function MainProductsList({ start, end }: MainProductsListProps) {

    const [products, setProducts] = useState<ShopifyProduct[]>([]);
    const [productTypes, setProductTypes] = useState<string[]>([]);

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

    const sortedProducts = useMemo(() => {
        if (!products) return [];
        const sorted = [...products].sort((a, b) => {
            const [sortBy, sortOrder] = sortValue.split('-');

            if (sortBy === 'name') {
                const nameA = a.title.toLowerCase();
                const nameB = b.title.toLowerCase();
                if (sortOrder === "asc") {
                    return nameA.localeCompare(nameB);
                } else {
                    return nameB.localeCompare(nameA);
                }
            } else if (sortBy === 'price') {
                const priceA = parseFloat(a.priceRange.minVariantPrice.amount);
                const priceB = parseFloat(b.priceRange.minVariantPrice.amount);
                if (sortOrder === "asc") {
                    return priceA - priceB;
                } else {
                    return priceB - priceA;
                }
            }
            return 0;
        });
        return sorted;
    }, [products, sortValue]);

    return (
        <Flex gap={8} w='100%' alignItems={'center'} justifyContent={'space-between'} flexDir={'column'}>


            <Flex flexDir={'column'} w='100%' p={4} borderBottom={'1px solid'} borderColor={'borderColor'} gap={4}>
                <Flex>
                    <CustomText text={'Shop'} fontSize={'lg'} fontWeight={'semibold'} />
                </Flex>
                <Flex justifyContent={'space-between'} alignItems={'center'} gap={4} w='100%'>
                    <Flex gap={1}>
                        {productTypes.map((type, idx) => {
                            return (
                                <CustomButton key={type+idx} text={type} border={'1px solid'} borderColor={'buttonDarkBg'} rounded={'2xl'} h={8} />
                            )
                        })}
                    </Flex>
                    <Flex gap={24} px={24}>
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

            <ProductsList start={start} end={end} columnsPerPage={columnsPerPage} products={sortedProducts} />
        </Flex>
    )
}

