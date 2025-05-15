import { Flex } from "@chakra-ui/react"
import { useState, useEffect } from "react";
import { ProductsList } from "./ProductsList";
import { getProducts } from "@/lib/shopify";
import { ShopifyProduct } from "@/types";


interface MainProductsListProps {
    start: number;
    end: number;
}

export function HomepageProductsList({ start, end }: MainProductsListProps) {

    const [products, setProducts] = useState<ShopifyProduct[]>([]);

    const columnsPerPage = {
        base: 2,
        md: 5
    }


    useEffect(() => {
        const fetchProducts = async () => {
            // Assuming getProducts and Product type are imported from your Shopify API client
            // e.g., import { getProducts, Product } from '@/lib/shopify';
            try {
                const products: ShopifyProduct[] = await getProducts(end);
                console.log("Products fetched:", products);
                setProducts(products);
                // For now, as getProducts is not defined, I'll use a placeholder
                console.log("Fetching products...");
                // Replace with actual API call when getProducts is available
            } catch (error) {
                console.error("Erro ao buscar produtos:", error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <Flex gap={8} w='100%' alignItems={'center'} justifyContent={'space-between'} flexDir={'column'}>
            <ProductsList start={start} end={end} columnsPerPage={columnsPerPage} products={products} />
        </Flex>
    )
}
