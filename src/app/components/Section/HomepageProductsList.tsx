import { Button, Circle, Flex, Input, Popover, Portal, SimpleGrid, Text } from "@chakra-ui/react"
import axios from "axios";
import { Main } from "next/document"
import { useState, useEffect } from "react";
import { PiArrowArcRight, PiCaretDoubleDown, PiMinus, PiPlus, PiPlusCircle } from "react-icons/pi"
import { CustomText } from "../ui/CustomText";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import { ProductsList } from "./ProductsList";


interface MainProductsListProps {
    start: number;
    end: number;
}

export function HomepageProductsList({ start, end }: MainProductsListProps) {

    const [products, setProducts] = useState<Products[]>([]);

    const columnsPerPage = {
        base: 2,
        md: 5
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
        <Flex gap={8} w='100%' alignItems={'center'} justifyContent={'space-between'} flexDir={'column'}>
            <ProductsList start={start} end={end} columnsPerPage={columnsPerPage} products={products} />
        </Flex>
    )
}
