import { Flex } from "@chakra-ui/react";
import { CustomText } from "../ui/CustomText";


export function BrandMessage() {

    const brandTitle = 'The Art of Fewer, Better Choices'
    const brandMessage = 'Opting for quality over quantity means selecting timeless, durable, and responsibly made items. This approach simplifies our lives and fosters a deeper appreciation for our surroundings. Emphasizing longevity and responsible production resonates with a more sustainable and mindful lifestyle.'

    return(
        <Flex flexDir={'column'} alignItems={'center'} justifyContent={'center'} gap={4} p={24} bgColor={'brandBg'} w={'100%'}>
            <CustomText text={brandTitle} fontSize={'xl'} fontWeight={'semibold'}/>
            <CustomText text={brandMessage} fontSize={'sm'} maxW={720} textAlign={'center'} fontWeight={'semibold'}/>
        </Flex>
    )
}