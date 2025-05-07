// src/components/CartDrawer.tsx (ou onde preferir)
'use client'; // Drawers são interativos

import {
    Button,
    CloseButton,
    Drawer, // Importa o Drawer
    Portal,
    Flex,
    Heading,
    Text,
    VStack,
    Box,
    IconButton, // Para o botão de abrir o drawer
    useDisclosure,
    Image, // Para controlar o estado aberto/fechado programaticamente (opcional)
} from '@chakra-ui/react';
import { PiShoppingCart } from 'react-icons/pi';
import { useCartDrawer } from '../ui/cart-drawer-provider';

// Interface para os itens do carrinho (você precisará definir isso com base nos dados do Shopify)
interface CartItem {
    id: string;
    variantId?: string; // ID da variante específica
    name: string;
    quantity: number;
    price: number;
    imageUrl?: string;
    // Adicione outras propriedades como tamanho, cor, etc.
}

interface CartDrawerProps {
    // Você passará os dados do carrinho e as funções de manipulação como props
    cartItems?: CartItem[]; // Array de itens no carrinho (exemplo)
    subtotal?: number; // Exemplo
    onRemoveItem?: (itemId: string) => void; // Função para remover item
    onUpdateQuantity?: (itemId: string, newQuantity: number) => void; // Função para atualizar quantidade
    onCheckout?: () => void; // Função para ir para o checkout
}

export function CartDrawer({
    cartItems = [], // Valor padrão: carrinho vazio
    subtotal = 0,
    onRemoveItem,
    onUpdateQuantity,
    onCheckout,
}: CartDrawerProps) {
    const { open: openCart, onOpen: onOpenCart, onClose:onCloseCart, onToggle } = useCartDrawer(); // Pega do contexto!

    return (
        // Drawer.Root controla o estado geral
        <Drawer.Root placement="end"
            open={openCart}
            onOpenChange={(openState) => {
                if (!openState.open) { // Se o novo estado for fechado
                    onCloseCart(); // Chama a função onClose do contexto
                }
            }}> {/* Abre pela direita */}
            <Portal> {/* Renderiza no final do body */}
                <Drawer.Backdrop /> {/* Overlay escuro */}
                <Drawer.Positioner>
                    <Drawer.Content> {/* Conteúdo do Drawer */}
                        <Drawer.Header borderBottomWidth="1px">
                            <Drawer.Title>Seu Carrinho</Drawer.Title>
                        </Drawer.Header>

                        <Drawer.CloseTrigger asChild position="absolute" top="3" right="4">
                            <CloseButton size="sm" />
                        </Drawer.CloseTrigger>

                        <Drawer.Body>
                            {cartItems.length === 0 ? (
                                <Flex align="center" justify="center" h="100%">
                                    <Text color="gray.500">Seu carrinho está vazio.</Text>
                                </Flex>
                            ) : (
                                <VStack gap={4} align="stretch">
                                    {cartItems.map((item) => (
                                        <Flex key={item.id} align="center" gap={4}>
                                            {/* Imagem (opcional) */}
                                            {item.imageUrl && (
                                                <Box boxSize="60px" bg="gray.100" borderRadius="md">
                                                    <Image src={item.imageUrl} alt={item.name} objectFit="cover" borderRadius="md" />
                                                </Box>
                                            )}
                                            {/* Detalhes do Item */}
                                            <VStack align="flex-start" gap={1} flex={1}>
                                                <Text fontWeight="medium" fontSize="sm">{item.name}</Text>
                                                {/* Adicione variantes aqui se necessário (cor, tamanho) */}
                                                <Text fontSize="xs" color="gray.500">
                                                    Qtd: {item.quantity}
                                                </Text>
                                                {/* Controle de Quantidade (simplificado) */}
                                                {/* <HStack>
                           <Button size="xs" onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} isDisabled={item.quantity <= 1}>-</Button>
                           <Text>{item.quantity}</Text>
                           <Button size="xs" onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</Button>
                        </HStack> */}
                                            </VStack>
                                            {/* Preço e Remover */}
                                            <VStack align="flex-end" gap={1}>
                                                <Text fontWeight="medium" fontSize="sm">
                                                    R$ {(item.price * item.quantity).toFixed(2)}
                                                </Text>
                                                {onRemoveItem && (
                                                    <Button
                                                        size="xs"
                                                        variant="ghost"
                                                        colorScheme="red"
                                                        onClick={() => onRemoveItem(item.id)}
                                                    >
                                                        Remover
                                                    </Button>
                                                )}
                                            </VStack>
                                        </Flex>
                                    ))}
                                </VStack>
                            )}
                        </Drawer.Body>

                        {cartItems.length > 0 && ( // Mostra o footer apenas se houver itens
                            <Drawer.Footer borderTopWidth="1px">
                                <VStack gap={4} width="full">
                                    <Flex justify="space-between" width="full">
                                        <Text fontWeight="medium">Subtotal:</Text>
                                        <Text fontWeight="bold">R$ {subtotal.toFixed(2)}</Text>
                                    </Flex>
                                    <Button colorScheme="blue" width="full" onClick={onCheckout}>
                                        Finalizar Compra
                                    </Button>
                                </VStack>
                            </Drawer.Footer>
                        )}
                    </Drawer.Content>
                </Drawer.Positioner>
            </Portal>
        </Drawer.Root>
    );
}
