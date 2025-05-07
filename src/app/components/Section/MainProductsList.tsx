import { Flex, Menu, Portal, Text } from "@chakra-ui/react"
import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import { PiCaretDownLight } from "react-icons/pi"
import { CustomText } from "../ui/CustomText";
import { CustomButton } from "../ui/CustomButton";
import { ProductsList } from "./ProductsList";


interface MainProductsListProps {
    start: number;
    end: number;
}

export function MainProductsList({ start, end }: MainProductsListProps) {

    const [products, setProducts] = useState<Products[]>([]);
    const [productTypes, setProductTypes] = useState<ProductType[]>([]);

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
        const fetchData = async () => {
            try {
                const productsApiResponse = await axios.get('/api/get-products')
                const productsData: Products[] = await productsApiResponse.data;
                setProducts(productsData);

                const productTypeApiresponse = await axios.get('/api/get-productTypes')
                const productTypesData: ProductType[] = await productTypeApiresponse.data;
                setProductTypes(productTypesData);

            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };

        fetchData();
    }, []);

    const sortedProducts = useMemo(() => {
        if (!products) return [];
        const sorted = [...products].sort((a, b) => {
            const [sortBy, sortOrder] = sortValue.split('-');

            if (sortBy === 'name') {
                const nameA = a.name.toLowerCase();
                const nameB = b.name.toLowerCase();
                if (sortOrder === "asc") {
                    return nameA.localeCompare(nameB);
                } else {
                    return nameB.localeCompare(nameA);
                }
            } else if (sortBy === 'price') {
                const priceA = parseFloat(a.price);
                const priceB = parseFloat(b.price);
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
                                <CustomButton key={type.id} text={type.departament} border={'1px solid'} borderColor={'buttonDarkBg'} rounded={'2xl'} h={8} />
                            )
                        })}
                    </Flex>
                    <Flex gap={24} px={24}>
                        <Flex>
                            <Menu.Root>
                                <Menu.Trigger asChild>
                                    <Flex cursor={'pointer'} alignItems={'center'} gap={1}>
                                        <Text>Sort</Text>
                                        <PiCaretDownLight/>
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

