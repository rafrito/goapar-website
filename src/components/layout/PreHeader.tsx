import { Flex, Text } from "@chakra-ui/react";


export function PreHeader() {

    return (
        <Flex justifyContent={'center'} p={2} w='100%' bgColor={'preHeaderBg'}>
            <Text fontSize={'xs'} color={'invertedColor'}>
                Complimentary U.S. No-Rush Shipping on orders of $95 or more. Shop now
            </Text>
        </Flex>
    )
}