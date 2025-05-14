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

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get('/api/get-products')
    //             const data: Products[] = await response.data;
    //             setProducts(data);
    //         } catch (error) {
    //             console.error("Failed to fetch product types:", error);
    //         }
    //     };

    //     fetchData();
    // }, []); // The empty dependency array ensures this effect runs only once when the component mounts.

    const [hoveredProductIndex, setHoveredProductIndex] = useState<number | null>(null); // Estado para controlar o hover individualmente

    return (
        <Flex gap={8} w='100%' alignItems={'center'} justifyContent={'space-between'} flexDir={'column'}>
            <ProductsList start={start} end={end} columnsPerPage={columnsPerPage} products={products} />
        </Flex>
    )
}
