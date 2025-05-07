import { Avatar, Flex, Image, Text } from "@chakra-ui/react";
import { PiHeart, PiMagnifyingGlass, PiMagnifyingGlassThin, PiSuitcase } from "react-icons/pi";
import { ColorModeButton, useColorModeValue } from "./ui/color-mode";


export function Header() {

    const image = useColorModeValue('logos/logo.svg', 'logos/logo-white.svg')

    return (
        <Flex justifyContent={'space-between'} p={4} w='100%'>
            <Flex gap={8} alignItems={'center'} justifyContent={'center'}>
                <Image src={'logos/logo.svg'} objectFit={'contain'} objectPosition={'center'} maxW={86} />
                <Flex gap={8} fontSize={'sm'}>
                    <Text>Shop</Text>
                    <Text>New Arrivals</Text>
                    <Text>Sales</Text>
                    <Text>Journel</Text>
                </Flex>
            </Flex>
            <Flex gap={8}>
                <Flex gap={8} fontSize={'sm'}>

                    <Flex alignItems={'center'} justifyContent={'center'} gap={2}>
                        <PiMagnifyingGlass />
                        <Text>Stores</Text>
                    </Flex>
                    <Flex alignItems={'center'} justifyContent={'center'} gap={2}>
                        <PiHeart />
                        <Text>0</Text>
                    </Flex>
                    <Flex alignItems={'center'} justifyContent={'center'} gap={2}>
                        <PiSuitcase />
                        <Text>2</Text>

                    </Flex>
                    <Flex alignItems={'center'} justifyContent={'center'} gap={2}>
                        <ColorModeButton />
                        <Avatar.Root>
                            <Avatar.Fallback name="Awer Mabil" />
                            <Avatar.Image src="https://img.a.transfermarkt.technology/portrait/big/255729-1601548252.jpg?lm=1" />
                        </Avatar.Root>
                    </Flex>

                </Flex>
            </Flex>
        </Flex>
    )
}