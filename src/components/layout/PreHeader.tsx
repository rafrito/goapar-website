import { Avatar, Flex, Image, Text } from "@chakra-ui/react";
import { PiHeart, PiMagnifyingGlass, PiMagnifyingGlassThin, PiSuitcase } from "react-icons/pi";


export function PreHeader() {

    return (
        <Flex justifyContent={'center'} p={2} w='100%' bgColor={'preHeaderBg'}>
            <Text fontSize={'xs'} color={'invertedColor'}>
                Complimentary U.S. No-Rush Shipping on orders of $95 or more. Shop now
            </Text>
        </Flex>
    )
}