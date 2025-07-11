// src/components/layout/MobileFooterSection.tsx
'use client';

// ============================================================================
//   IMPORTS
// ============================================================================

// --- Componentes Chakra UI ---
// Usando o Menu do Ark UI, que é a base para o Chakra v3
import { Menu, Button, Portal, Flex, Text } from "@chakra-ui/react";

// --- Ícones ---
import { LuChevronRight } from "react-icons/lu";
import { PiCaretDownLight } from "react-icons/pi";

// --- Dados Locais ---
import { footerSections, mobileFooterData } from "@/data/footer";
import { footerSectionsLabel } from "@/utils";

// ============================================================================
//   COMPONENTE PRINCIPAL: MobileFooterSection
// ============================================================================
// Este componente cria um menu suspenso para a navegação do rodapé,
// otimizado para telas menores. Ele é escondido em telas maiores.

export function MobileFooterSection() {

    return (
        // Container principal que só exibe este componente em telas pequenas ('base')
        // e o esconde em telas a partir de 'sm' (small).
        <Flex display={{ base: 'flex', sm: 'none' }}>
            
            {/* Menu Principal (Raiz) */}
            <Menu.Root>
                
                {/* O botão que aciona a abertura do menu */}
                <Menu.Trigger asChild>
                    <Button variant="outline" size="sm">
                        <Flex gap={2} alignItems={'end'}>
                            <Text>
                                {mobileFooterData.buttonLabel}
                            </Text>
                            <PiCaretDownLight />
                        </Flex>
                    </Button>
                </Menu.Trigger>

                {/* O Portal garante que o conteúdo do menu seja renderizado no topo da árvore DOM, evitando problemas de z-index. */}
                <Portal>
                    <Menu.Positioner>
                        <Menu.Content>

                            {/* -------------------------------------------------------------------- */}
                            {/* Sub-menu: Consultoria                                              */}
                            {/* -------------------------------------------------------------------- */}
                            <Menu.Root positioning={{ placement: "top-start", gutter: 0 }}>
                                <Menu.TriggerItem>
                                    <Flex justifyContent={'space-between'} w='100%' alignItems={'center'}>
                                        <Text>{footerSectionsLabel.consultoria}</Text>
                                        <LuChevronRight />
                                    </Flex>
                                </Menu.TriggerItem>
                                <Portal>
                                    <Menu.Positioner>
                                        <Menu.Content>
                                            {footerSections.consultoria.map((item, idx) => (
                                                <Menu.Item key={item.label + idx} value={item.label}>
                                                    {item.label}
                                                </Menu.Item>
                                            ))}
                                        </Menu.Content>
                                    </Menu.Positioner>
                                </Portal>
                            </Menu.Root>

                            {/* -------------------------------------------------------------------- */}
                            {/* Sub-menu: Tecnologia                                               */}
                            {/* -------------------------------------------------------------------- */}
                            <Menu.Root positioning={{ placement: "right-start", gutter: 2 }}>
                                <Menu.TriggerItem>
                                    <Flex justifyContent={'space-between'} w='100%' alignItems={'center'}>
                                        <Text>{footerSectionsLabel.tecnologia}</Text>
                                        <LuChevronRight />
                                    </Flex>
                                </Menu.TriggerItem>
                                <Portal>
                                    <Menu.Positioner>
                                        <Menu.Content>
                                            {footerSections.tecnologia.map((item, idx) => (
                                                <Menu.Item key={item.label + idx} value={item.label}>
                                                    {item.label}
                                                </Menu.Item>
                                            ))}
                                        </Menu.Content>
                                    </Menu.Positioner>
                                </Portal>
                            </Menu.Root>

                            {/* -------------------------------------------------------------------- */}
                            {/* Sub-menu: Empresa                                                  */}
                            {/* -------------------------------------------------------------------- */}
                            <Menu.Root positioning={{ placement: "right-start", gutter: 2 }}>
                                <Menu.TriggerItem>
                                    <Flex justifyContent={'space-between'} w='100%' alignItems={'center'}>
                                        <Text>{footerSectionsLabel.empresa}</Text>
                                        <LuChevronRight />
                                    </Flex>
                                </Menu.TriggerItem>
                                <Portal>
                                    <Menu.Positioner>
                                        <Menu.Content>
                                            {footerSections.empresa.map((item, idx) => (
                                                <Menu.Item key={item.label + idx} value={item.label}>
                                                    {item.label}
                                                </Menu.Item>
                                            ))}
                                        </Menu.Content>
                                    </Menu.Positioner>
                                </Portal>
                            </Menu.Root>

                        </Menu.Content>
                    </Menu.Positioner>
                </Portal>
            </Menu.Root>
        </Flex>
    );
}
