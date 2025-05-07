// /d:/awer/awer-shop/src/app/components/Section/ProductsList.tsx
import { SimpleGrid, Flex, SimpleGridProps, useDisclosure } from "@chakra-ui/react";
import { CustomText } from "../ui/CustomText";
import { useState } from "react";
import { ProductDetailModal } from "./ProductDetailModal";

// Define or import your Products type
// interface ProductColor {
//     hex: string;
//     name: string;
// }
// interface Products {
//     id: string | number;
//     name: string;
//     image: string;
//     price: number | string;
//     colors: ProductColor[];
// }

interface ProductsListProps {
    start: number;
    end: number;
    columnsPerPage: SimpleGridProps["columns"];
    products: Products[]; // Ensure Products type is defined/imported
}

export function ProductsList({ start, end, columnsPerPage, products }: ProductsListProps) {
    const { open, onOpen, onClose } = useDisclosure();
    const [selectedProduct, setSelectedProduct] = useState<Products | null>(null);

    const handleProductClick = (product: Products) => {
        setSelectedProduct(product);
        onOpen();
    };

    return (
        <>
            <SimpleGrid columns={columnsPerPage} gap={4} w='100%' maxW={1920} p={4}>
                {products.slice(start, end).map((prod) => {
                    return (
                        <Flex key={prod.id} flexDir={'column'}>
                            <Flex
                                h={{ base: 300, md: 348 }}
                                w={'100%'}
                                flexDir={'column'}
                                alignItems={'end'}
                                justifyContent={'end'}
                                gap={4}
                                bgImage={`url(${prod.image})`}
                                bgSize={'cover'}
                                bgPos={'center'}
                                borderRadius={8}
                                position={'relative'}
                                cursor="pointer"
                                onClick={() => handleProductClick(prod)}
                                _hover={{
                                    boxShadow: "md", // Optional: visual feedback on hover
                                }}
                            >
                                {/* Removed on-card color display and plus/caret icons */}
                            </Flex>
                            <Flex flexDir={'column'} alignItems={'start'} justifyContent={'start'} gap={1} py={2} w='100%'>
                                <CustomText text={prod.name} fontSize={'md'} fontWeight={'semibold'} />
                                <CustomText text={`R$ ${prod.price}`} fontSize={'md'} fontWeight={'semibold'} />
                            </Flex>
                        </Flex>
                    );
                })}
            </SimpleGrid>

            {selectedProduct && (
                <ProductDetailModal
                    isOpen={open}
                    onClose={onClose}
                    product={selectedProduct}
                />
            )}
        </>
    );
}
