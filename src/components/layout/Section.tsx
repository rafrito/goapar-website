import { Flex, useBreakpointValue } from "@chakra-ui/react";
import { ProductTypes } from "./Section/ProductTypes";
import { HomepageProductsList } from "./Section/HomepageProductsList";
import { CustomText } from "../ui/CustomText";


export function Section() {
    
    
    const subTitle = <>
        Elevate your lifestyle with a more intelligent, superior wardrobe. <br></br>
        Our range is crafted sustainably with longevity in mind.
    </>

    const productListSize = useBreakpointValue({base:4, sm:5}) ?? 4
    
    return (
        <Flex flexDir={'column'} p={{base:2, md:8}} w='100%' gap={12}>
            <Flex w='100%' alignItems={'start'} justifyContent={'start'}>
                <CustomText text={subTitle} fontWeight={'semibold'} fontSize={'md'}/>
            </Flex>
            <ProductTypes start={0} end={3} height={532} />
            <HomepageProductsList start={0} end={productListSize}/>
            <ProductTypes start={3} end={5} height={719}/>
        </Flex>
    )
}