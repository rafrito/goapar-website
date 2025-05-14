import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { CustomButton } from "../ui/CustomButton";
import { CustomText } from "../ui/CustomText";


export function Banner() {

    const bannerText = <>
        Elevate Your Style <br></br>
        Timeless Fashion, Sustainable <br></br>
        Choices <br></br>
    </>

    return (
        <Flex w='100%' minH={712} alignItems={'end'} justifyContent={'start'} bgImage={'url(photos/banner.png)'} bgSize={'105%'}>
            <Flex flexDir={'column'} p={8} gap={4}>
                <CustomText text={bannerText} fontSize={'lg'} color={'white'}/>
                <CustomButton />
            </Flex>
        </Flex>
    )
}