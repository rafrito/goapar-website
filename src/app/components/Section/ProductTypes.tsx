import { CustomText } from "../ui/CustomText";
import { useEffect, useState } from "react";
import axios from "axios";
import { Flex, FlexProps, Image, Spinner } from "@chakra-ui/react";
import CustomSpinner from "../ui/CustomSpinner";

// Define the type for the API response
interface ProductType {
    createdAt: string;
    departament: string;
    products: object; // Consider defining a more specific type for products
    id: string;
}
interface ProductTypesProps {
    start: number;
    end: number;
    height: FlexProps['height'];
}

export function ProductTypes({start, end, height}:ProductTypesProps) {
    const [productTypes, setProductTypes] = useState<ProductType[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/get-productTypes')
                const data: ProductType[] = await response.data;
                setProductTypes(data);
            } catch (error) {
                console.error("Failed to fetch product types:", error);
            }
        };

        fetchData();
    }, []); // The empty dependency array ensures this effect runs only once when the component mounts.

    return (
        <Flex gap={4}>
            {productTypes ?
                productTypes.slice(start, end).map((prods, idx) => {
                    return (
                        <Flex key={idx} w='100%' minH={height} alignItems={'end'} justifyContent={'start'} bgImage={`url(photos/collection-${idx + start + 1}.png)`} bgSize={'cover'}>
                            <CustomText text={prods.departament} fontSize={'lg'} color={'white'} p={8} />
                        </Flex>
                    )
                })
                :
                <CustomSpinner/>
            }
        </Flex>
    );
}
