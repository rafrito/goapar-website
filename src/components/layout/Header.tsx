import {
    Avatar,
    Flex,
    Image,
    Link as ChakraLink,
    Box,
    Portal,
    Menu,
    Button, // Importe o Portal do Chakra UI ou da biblioteca do seu Menu
} from "@chakra-ui/react";
import { PiList, PiShoppingCartThin } from "react-icons/pi";
import { ColorModeButton, useColorModeValue } from "../ui/color-mode";
import { useCartDrawer } from "../../contexts/cart-drawer-provider";
import { useCart } from "@/contexts/cart-provider";
import { CustomText } from "../ui/CustomText";
import { scrollToSection } from "@/utils";

// ASSUMA que 'Menu' aqui é o objeto da sua biblioteca que contém .Root, .Trigger, etc.
// Ex: import * as Menu from '@ark-ui/react' (se estiver usando Ark UI diretamente)
// Ou se você tem um alias/wrapper: import { Menu } from '@/components/ui/menu'
// Por favor, ajuste o import de 'Menu' conforme a sua configuração.

export function Header() {
    const { onOpen: onOpenCart } = useCartDrawer();
    const { cart } = useCart();
    const logoSrc = useColorModeValue('logos/logo.svg', 'logos/logo-white.svg');
    const totalCartQuantity = cart?.totalQuantity || 0;

    return (
        <Flex
            as="header"
            justifyContent={'space-between'}
            alignItems="center"
            p={4}
            w='100%'
            borderBottom={'1px solid'}
            borderColor='borderColor'
        >
            {/* Seção Esquerda: Logo e Navegação Desktop */}
            <Flex alignItems={'center'} gap={{ base: 2, md: 8 }}>
                <ChakraLink href="/" _focus={{ boxShadow: 'none' }}>
                    <Image src={logoSrc} alt="Logo" objectFit={'contain'} maxW={{ base: "70px", md: "86px" }} />
                </ChakraLink>

                <Flex gap={8} fontSize={'sm'} display={{ base: 'none', md: 'flex' }}>
                    <ChakraLink href="/products" _hover={{ color: 'brand.500', textDecoration: 'none' }}>
                        <CustomText text={'Products'} />
                    </ChakraLink>
                    <ChakraLink href="https://instagram.com/" _hover={{ color: 'brand.500', textDecoration: 'none' }}>
                        <CustomText text={'Instagram'} />
                    </ChakraLink>
                    <ChakraLink onClick={() => scrollToSection('contato')} _hover={{ cursor: 'pointer', color: 'brand.500', textDecoration: 'none' }}>
                        <CustomText text={'Contact'} />
                    </ChakraLink>
                </Flex>
            </Flex>

            {/* Seção Direita: Ações e Menu Mobile */}
            <Flex alignItems={'center'} gap={{ base: 2, sm: 3, md: 4 }}>
                <Flex
                    alignItems={'center'}
                    justifyContent={'center'}
                    gap={1}
                    _hover={{ cursor: 'pointer', color: 'brand.500', transition: 'color 0.2s ease-in-out' }}
                    onClick={onOpenCart}
                    position="relative"
                    p={2}
                >
                    <PiShoppingCartThin size="24px" />
                    {totalCartQuantity > 0 && (
                        <Flex
                            as="span"
                            position="absolute"
                            top="-1px"
                            right="-1px"
                            fontSize="xs"
                            fontWeight="bold"
                            color="white"
                            bg="red.500"
                            borderRadius="full"
                            boxSize="18px"
                            alignItems="center"
                            justifyContent="center"
                        >
                            {totalCartQuantity}
                        </Flex>
                    )}
                </Flex>

                <ColorModeButton />

                <Flex display={{ base: 'none', sm: 'block' }}>
                    {/* Seu componente Avatar.Root/Image/Fallback ou o Avatar do Chakra UI */}
                    <Avatar.Root size={'sm'}>
                        <Avatar.Fallback name="Segun Adebayo" />
                        <Avatar.Image src="https://encurtador.com.br/YZ8Yj" />
                    </Avatar.Root>
                </Flex>

                {/* Menu Mobile (Hamburger) - Usando a estrutura Menu.Root */}
                <Box display={{ base: 'block', md: 'none' }}>
                    <Menu.Root> {/* Contêiner principal do menu */}
                        <Menu.Trigger asChild>
                            <Button variant="outline" size="sm">
                                <PiList />
                            </Button>
                        </Menu.Trigger>
                        <Portal> {/* Importante para renderizar o menu no local correto do DOM */}
                            <Menu.Positioner> {/* Lida com o posicionamento */}
                                <Menu.Content // O contêiner visual do menu dropdown
                                // Você pode adicionar estilos do Chakra aqui se Menu.Content aceitar props de estilo
                                // ex: bg={useColorModeValue('white', 'gray.700')} boxShadow="md" borderRadius="md"
                                >
                                    <Menu.Item value="products" asChild>
                                        {/* Use ChakraLink aqui, e Menu.Item com asChild para que o Link seja o elemento renderizado */}
                                        <ChakraLink href="/products" w="100%" display="block" px={3} py={2}>
                                            Products
                                        </ChakraLink>
                                    </Menu.Item>
                                    <Menu.Item value="instagram" asChild>
                                        <ChakraLink href="https://instagram.com/" w="100%" display="block" px={3} py={2}>
                                            Instagram
                                        </ChakraLink>
                                    </Menu.Item>
                                    {/* Para onClick, o Menu.Item pode ser o elemento clicável diretamente */}
                                    <Menu.Item value="contact" onClick={() => scrollToSection('contato')} px={3} py={2}>
                                        Contact
                                    </Menu.Item>
                                    {/* Se precisar de um separador: <Menu.Separator /> */}
                                    {/* Se quiser a setinha (opcional): <Menu.Arrow><Menu.ArrowTip /></Menu.Arrow> */}
                                </Menu.Content>
                            </Menu.Positioner>
                        </Portal>
                    </Menu.Root>
                </Box>
            </Flex>
        </Flex>
    );
}