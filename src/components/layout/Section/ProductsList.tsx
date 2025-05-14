// /d:/awer/awer-shop/src/app/components/Section/ProductsList.tsx
import { SimpleGrid, Flex, SimpleGridProps, useDisclosure } from "@chakra-ui/react";
import { CustomText } from "../../ui/CustomText";
import { useState } from "react";
import { ProductDetailModal } from "./ProductDetailModal";
import { ShopifyProduct } from "@/types";
interface ProductsListProps {
    start: number;
    end: number;
    columnsPerPage: SimpleGridProps["columns"];
    products: ShopifyProduct[]; // Ensure ShopifyProduct type is defined/imported
}

export function ProductsList({ start, end, columnsPerPage, products }: ProductsListProps) {
    const { open, onOpen, onClose } = useDisclosure();
    const [selectedProduct, setSelectedProduct] = useState<ShopifyProduct | null>(null);

    const handleProductClick = (product: ShopifyProduct) => {
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
                                bgImage={`url(${prod.featuredImage?.url})`}
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
                                <CustomText text={prod.title} fontSize={'md'} fontWeight={'semibold'} />
                                <CustomText text={`R$ ${prod.priceRange.minVariantPrice.amount}`} fontSize={'md'} fontWeight={'semibold'} />
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
