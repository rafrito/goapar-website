import { Avatar, Flex, Image, Text } from "@chakra-ui/react";
import { PiCarThin, PiHeart, PiMagnifyingGlass, PiMagnifyingGlassThin, PiShoppingCart, PiShoppingCartThin, PiSuitcase } from "react-icons/pi";
import { ColorModeButton, useColorModeValue } from "./ui/color-mode";
import { useCartDrawer } from "./ui/cart-drawer-provider";


export function Header() {

    const { open: openCart, onOpen: onOpenCart, onClose:onCloseCart } = useCartDrawer(); // Pega do contexto!

    const image = useColorModeValue('logos/logo.svg', 'logos/logo-white.svg')

    return (
        <Flex justifyContent={'space-between'} p={4} w='100%' borderBottom={'1px solid'} borderColor='borderColor' >
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
                <Flex gap={8} fontSize={'md'}>

                    <Flex alignItems={'center'} justifyContent={'center'} gap={2}>
                        <PiMagnifyingGlass />
                        <Text>Stores</Text>
                    </Flex>
                    <Flex alignItems={'center'} justifyContent={'center'} gap={2}>
                        <PiHeart />
                        <Text>0</Text>
                    </Flex>
                    <Flex alignItems={'center'} justifyContent={'center'} gap={2} _hover={{ cursor: 'pointer', color: 'brand.500', transition: '500ms' }}
                        onClick={() => onOpenCart()} // Se usar useDisclosure
                    >
                        <PiShoppingCartThin />
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