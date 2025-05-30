import { Box, Menu, Button, Portal, Link as ChakraLink } from "@chakra-ui/react";
import { PiList } from "react-icons/pi";


export function HeaderMobileMenu() {

    return (
        <Box display={{ base: 'block', md: 'none' }}>
            <Menu.Root> {/* Contêiner principal do menu */}
                <Menu.Trigger asChild>
                    <Button variant="outline" size="sm">
                        <PiList />
                    </Button>
                </Menu.Trigger>
                <Portal> {/* Importante para renderizar o menu no local correto do DOM */}
                    <Menu.Positioner> {/* Lida com o posicionamento */}
                        <Menu.Content>
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
                            <Menu.Item value="contact" px={3} py={2}>
                                Contact
                            </Menu.Item>
                            {/* Se precisar de um separador: <Menu.Separator /> */}
                            {/* Se quiser a setinha (opcional): <Menu.Arrow><Menu.ArrowTip /></Menu.Arrow> */}
                        </Menu.Content>
                    </Menu.Positioner>
                </Portal>
            </Menu.Root>
        </Box>
    )
}