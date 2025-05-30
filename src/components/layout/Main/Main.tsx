import { CustomText } from "@/components/ui/CustomText";
import { MotionButton } from "@/components/ui/MotionButton";
import { Flex } from "@chakra-ui/react";
import { ProductCarousel } from "./ProductCarousel";
import { Title } from "./Title";


export function Main() {

    return (
        <Flex flexDir={'column'} alignItems={'center'} justifyContent={'center'} w='100%' py={8}>
            <Title />
            <ProductCarousel/>
        </Flex>
    )
}