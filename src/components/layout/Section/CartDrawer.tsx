// src/components/CartDrawer.tsx (ou onde preferir)
'use client'; // Drawers são interativos

import {
    Button,
    CloseButton,
    Drawer, // Importa o Drawer
    Portal,
    Flex,
    Text,
    VStack,
    Box,
    Image,
    HStack, // Para controlar o estado aberto/fechado programaticamente (opcional)
} from '@chakra-ui/react';
import { useCartDrawer } from '../../../contexts/cart-drawer-provider';
import { useCart } from '@/contexts/cart-provider';
import { CartLine } from '@/types';
import { CustomButton } from '@/components/ui/CustomButton';
import CustomSpinner from '@/components/ui/CustomSpinner';

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
    // cartItems = [], // Valor padrão: carrinho vazio
    // subtotal = 0,
    // onRemoveItem,
    // onUpdateQuantity,
    // onCheckout,
}: CartDrawerProps) {
    // Hook para controlar a visibilidade do Drawer

    const { open: openCart, onClose: onCloseCart } = useCartDrawer(); // Pega do contexto!

    // Hook para acessar os dados e funções do carrinho global
    const {
        cart,
        isLoading, // Estado de carregamento do carrinho (ex: ao atualizar)
        error,     // Erros do carrinho
        removeItem,
        updateItemQuantity,
        initiateCheckout,
    } = useCart();

    const handleCheckout = async () => {
        const checkoutUrl = await initiateCheckout();
        if (checkoutUrl) {
            // Redireciona para a URL de checkout do Shopify
            window.location.href = checkoutUrl;
        } else {
            // Adicionar um toast de erro aqui se desejar
            console.error("Não foi possível obter a URL de checkout.");
            // toaster.create({ title: "Erro ao iniciar o checkout. Tente novamente." });
        }
    };

    const cartLines = cart?.lines?.nodes || [];
    const subtotalAmount = parseFloat(cart?.cost?.subtotalAmount?.amount || '0').toFixed(2);
    const currencyCode = cart?.cost?.subtotalAmount?.currencyCode || 'BRL'; // Ou seu currencyCode padrão


    return (
        // Drawer.Root controla o estado geral
        <Drawer.Root placement="end"
            size={'sm'}
            open={openCart}
            onOpenChange={(openState) => {
                if (!openState.open) { // Se o novo estado for fechado
                    onCloseCart(); // Chama a função onClose do contexto
                }
            }}> {/* Abre pela direita */}
            <Portal>
                <Drawer.Backdrop />
                <Drawer.Positioner>
                    <Drawer.Content>
                        <Drawer.Header borderBottomWidth="1px">
                            <Drawer.Title>Sua Sacola</Drawer.Title> {/* Alterado de "Seu Carrinho" */}
                        </Drawer.Header>

                        <Drawer.CloseTrigger asChild position="absolute" top="3" right="4">
                            <CloseButton size="sm" />
                        </Drawer.CloseTrigger>

                        <Drawer.Body>
                            {isLoading && ( // Loading inicial ou ao recarregar carrinho vazio
                                <Flex align="center" justify="center" h="100%">
                                    <CustomSpinner />
                                </Flex>
                            )}
                            {!isLoading && error && ( // Mostra erro se houver
                                <Flex align="center" justify="center" h="100%" direction="column" gap={3}>
                                    <Text color="red.500">Erro ao carregar o carrinho.</Text>
                                    <Text fontSize="sm" color="gray.500">{error}</Text>
                                </Flex>
                            )}

                            {!isLoading && !error && cartLines.length === 0 && (
                                <Flex align="center" justify="center" h="100%">
                                    <Text color="gray.500">Sua sacola está vazia.</Text>
                                </Flex>
                            )}

                            {!isLoading && !error && cartLines.length > 0 && (
                                <VStack gap={5} align="stretch"> {/* Aumentei o gap um pouco */}
                                    {cartLines.map((line: CartLine) => (
                                        <Flex key={line.id} align="center" gap={4} borderBottomWidth="1px" borderColor="gray.100" pb={4}>
                                            {line.merchandise.image?.url && (
                                                <Box boxSize="70px" bg="gray.50" borderRadius="md" flexShrink={0}> {/* Aumentei um pouco a imagem */}
                                                    <Image
                                                        src={line.merchandise.image.url}
                                                        alt={line.merchandise.image.altText || line.merchandise.product.title}
                                                        objectFit="cover"
                                                        borderRadius="md"
                                                        boxSize="100%"
                                                    />
                                                </Box>
                                            )}
                                            <VStack align="flex-start" gap={1} flex={1}>
                                                <Text fontWeight="medium" fontSize="sm">
                                                    {line.merchandise.product.title}
                                                </Text>
                                                {/* Exibe o nome da variante (Cor/Tamanho) se for diferente do título do produto */}
                                                {line.merchandise.title !== 'Default Title' && line.merchandise.title !== line.merchandise.product.title && (
                                                    <Text fontSize="xs" color="gray.600">
                                                        {line.merchandise.title}
                                                    </Text>
                                                )}
                                                <HStack>
                                                    <Button
                                                        size="xs"
                                                        onClick={() => updateItemQuantity(line.id, line.quantity - 1)}
                                                        disabled={line.quantity <= 1 || isLoading} // Desabilita se a quantidade for 1 ou se estiver carregando
                                                        variant="outline"
                                                    >
                                                        -
                                                    </Button>
                                                    <Text fontSize="sm" w="20px" textAlign="center">{line.quantity}</Text>
                                                    <Button
                                                        size="xs"
                                                        onClick={() => updateItemQuantity(line.id, line.quantity + 1)}
                                                        disabled={isLoading} // Desabilita se estiver carregando
                                                        variant="outline"
                                                    >
                                                        +
                                                    </Button>
                                                </HStack>
                                            </VStack>
                                            <VStack align="flex-end" gap={1} textAlign="right">
                                                <Text fontWeight="semibold" fontSize="sm" color="blue.600"> {/* Destaquei o preço */}
                                                    {currencyCode} {parseFloat(line.cost.totalAmount.amount).toFixed(2)}
                                                </Text>
                                                <CustomButton
                                                    text='Remover'
                                                    size="xs"
                                                    colorScheme="red"
                                                    onClick={() => removeItem(line.id)}
                                                    disabled={isLoading}
                                                />
                                            </VStack>
                                        </Flex>
                                    ))}
                                </VStack>
                            )}
                        </Drawer.Body>

                        {cartLines.length > 0 && (
                            <Drawer.Footer borderTopWidth="1px">
                                <VStack gap={4} width="full">
                                    <Flex justify="space-between" width="full">
                                        <Text fontWeight="medium">Subtotal:</Text>
                                        <Text fontWeight="bold" fontSize="lg"> {/* Aumentei o subtotal */}
                                            {currencyCode} {subtotalAmount}
                                        </Text>
                                    </Flex>
                                    <Button
                                        colorScheme="blue"
                                        width="full"
                                        size="lg" // Botão maior
                                        onClick={handleCheckout}
                                        loading={isLoading} // Mostra loading no botão de checkout também
                                    >
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
