import { footerSectionsLabel, footerSections } from "@/utils"
import { Menu, Button, Portal, Flex, Text } from "@chakra-ui/react"
import { LuChevronRight } from "react-icons/lu"
import { PiCaretDownLight } from "react-icons/pi"


export function MobileFooterSection() {

    return (
        <Flex display={{ base: 'flex', sm: 'none' }}>
            <Menu.Root >
                <Menu.Trigger asChild>
                    <Button variant="outline" size="sm">
                        <Flex gap={2} alignItems={'end'}>
                            <Text>
                                Conheça mais sobre nossos produtos
                            </Text>
                            <PiCaretDownLight />
                        </Flex>
                    </Button>
                </Menu.Trigger>
                <Portal>
                    <Menu.Positioner>
                        <Menu.Content>
                            <Menu.Root positioning={{ placement: "top-start", gutter: 0 }}>
                                <Menu.TriggerItem>
                                    <Flex justifyContent={'space-between'} w='100%' alignItems={'center'}>
                                        <Text>
                                            {footerSectionsLabel.consultoria}
                                        </Text>
                                        <LuChevronRight />
                                    </Flex>
                                </Menu.TriggerItem>
                                <Portal>
                                    <Menu.Positioner>
                                        <Menu.Content>
                                            {footerSections.consultoria.map((item, idx) => {
                                                return (
                                                    <Menu.Item key={item.label + idx} value={item.label}>{item.label}</Menu.Item>
                                                )
                                            })}

                                        </Menu.Content>
                                    </Menu.Positioner>
                                </Portal>
                            </Menu.Root>
                            <Menu.Root positioning={{ placement: "right-start", gutter: 2 }}>
                                <Menu.TriggerItem>
                                    <Flex justifyContent={'space-between'} w='100%' alignItems={'center'}>
                                        <Text>
                                            {footerSectionsLabel.tecnologia}
                                        </Text>
                                        <LuChevronRight />
                                    </Flex>
                                </Menu.TriggerItem>
                                <Portal>
                                    <Menu.Positioner>
                                        <Menu.Content>
                                            {footerSections.tecnologia.map((item, idx) => {
                                                return (
                                                    <Menu.Item key={item.label + idx} value={item.label}>{item.label}</Menu.Item>
                                                )
                                            })}

                                        </Menu.Content>
                                    </Menu.Positioner>
                                </Portal>
                            </Menu.Root>
                            <Menu.Root positioning={{ placement: "right-start", gutter: 2 }}>
                                <Menu.TriggerItem>
                                    <Flex justifyContent={'space-between'} w='100%' alignItems={'center'}>
                                        <Text>
                                            {footerSectionsLabel.empresa}
                                        </Text>
                                        <LuChevronRight />
                                    </Flex>
                                </Menu.TriggerItem>
                                <Portal>
                                    <Menu.Positioner>
                                        <Menu.Content>
                                            {footerSections.empresa.map((item, idx) => {
                                                return (
                                                    <Menu.Item key={item.label + idx} value={item.label}>{item.label}</Menu.Item>
                                                )
                                            })}

                                        </Menu.Content>
                                    </Menu.Positioner>
                                </Portal>
                            </Menu.Root>
                        </Menu.Content>
                    </Menu.Positioner>
                </Portal>
            </Menu.Root>
        </Flex>
    )
} 