import { Flex, Heading } from "@chakra-ui/react";
import { ProductTypes } from "./Section/ProductTypes";
import { CustomText } from "./ui/CustomText";
import { MainProductsList } from "./Section/MainProductsList";


export function Section() {
    
    
    const subTitle = <>
        Elevate your lifestyle with a more intelligent, superior wardrobe. <br></br>
        Our range is crafted sustainably with longevity in mind.
    </>

    return (
        <Flex flexDir={'column'} p={8} w='100%' gap={12}>
            <Flex w='100%' alignItems={'start'} justifyContent={'start'}>
                <CustomText text={subTitle} fontWeight={'semibold'} fontSize={'md'}/>
            </Flex>
            <ProductTypes start={0} end={3} height={532} />
            <MainProductsList start={0} end={5}/>
            <ProductTypes start={3} end={5} height={719}/>
        </Flex>
    )
}