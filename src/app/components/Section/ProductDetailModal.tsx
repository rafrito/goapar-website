// src/components/ProductDetailModal.tsx (ou onde preferir)

import {
  Dialog,
  Portal,
  CloseButton,
  Image,
  Button,
  Flex,
  VStack,
  HStack, // Se for usar para algo como botões lado a lado no footer
  AspectRatio,
  Circle,
  Text,
  // Outros componentes Chakra que você pode precisar para estilizar
} from '@chakra-ui/react';
import React, { useMemo, useState } from 'react'; // Importe React
import { CustomText } from '../ui/CustomText';
import { CustomButton } from '../ui/CustomButton';
import { CartDrawer } from './CarDrawer';
import { useCartDrawer } from '../ui/cart-drawer-provider';
import { ColorOption, ProductVariant, ShopifyProduct } from '@/types';
import { COLOR_NAME_TO_HEX_MAP, SIZE_NAME_MAP } from '@/utils/productUtils';
import { useCart } from '../ui/cart-provider';


interface StaticProductDialogProps {
  isOpen: boolean;
  onClose: () => void;
  product: ShopifyProduct; // Produto a ser exibido
}

export function ProductDetailModal({
  isOpen,
  onClose,
  product,
}: StaticProductDialogProps) {
  if (!product) {
    return null; // Não renderiza nada se não houver produto
  }
  const { open: openCart, onOpen: onOpenCart, onClose: onCloseCart, onToggle } = useCartDrawer(); // Pega do contexto!
  const { addItem, isLoading: isCartLoading } = useCart(); // <<<<---- USANDO O CONTEXTO DO CARRINHO


  const [selectedColor, setSelectedColor] = useState<ColorOption | null>(null);
  const [selectedSize, setSelectedSize] = useState<{ name: string; displayName: string; available: boolean } | null>(null); // Usando displayName
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(undefined);
  const [quantity, setQuantity] = useState(1); // Estado para quantidade


  const availableColors = useMemo(() => {
    if (!product || !product.variants || !product.variants.nodes) {
      return []; // Retorna vazio se não houver produto ou variantes
    }

    const colorValues = new Set<string>(); // Usar um Set para garantir valores únicos de NOMES de cor

    product.variants.nodes.forEach(variantNode => {
      const colorOption = variantNode.selectedOptions.find(
        option => option.name.trim().toUpperCase() === 'COR' // Case-insensitive
      );
      if (colorOption && colorOption.value) {
        colorValues.add(colorOption.value); // Adiciona o NOME da cor ao Set
      }
    });

    return Array.from(colorValues).map(colorName => {
      const normalizedColorName = colorName.trim().toUpperCase();
      return {
        name: colorName, // Nome original para exibição, se desejar
        hex: COLOR_NAME_TO_HEX_MAP[normalizedColorName] || '#CCCCCC', // Fallback para cinza
      };
    });
  }, [product]); // Recalcula apenas se o 'product' mudar


  const availableSizes = useMemo(() => {
    if (!product || !product.variants || !product.variants.nodes) {
      return [];
    }
    const sizeValues = new Set<string>();
    product.variants.nodes.forEach(variantNode => {
      const sizeOption = variantNode.selectedOptions.find(
        option => option.name.trim().toUpperCase() === 'TAMANHO'
      );
      if (sizeOption && sizeOption.value) {
        sizeValues.add(sizeOption.value);
      }
    });
    // Para tamanhos, geralmente o nome é suficiente.
    // Se precisar de mais dados por tamanho, crie uma interface SizeOption
    return Array.from(sizeValues).map(sizeName => ({ name: SIZE_NAME_MAP[sizeName], available: true /* Lógica de disponibilidade real aqui */ }));
  }, [product]);





  
  return (
    <Dialog.Root size={'xl'} open={isOpen} onOpenChange={(openState) => !openState.open && onClose()} modal={true}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content w={'100%'} borderRadius="md"> {/* Adicionei borderRadius */}

            <Dialog.CloseTrigger asChild position="absolute" top="2" right="2">
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>

            <Dialog.Body p={0} borderRadius={8}>
              <Flex direction={{ base: 'column', md: 'row' }} gap={16} p={12}>
                {/* Coluna da Imagem */}
                <Flex flex={1} justifyContent="center" alignItems="center" >
                  <AspectRatio ratio={1} w="100%">
                    <Image
                      src={product.featuredImage?.url}
                      alt={product.title}
                      objectFit="cover"
                    />
                  </AspectRatio>
                </Flex>

                {/* Coluna de Informações e Opções */}
                <VStack flex={1} gap={8} align="flex-start">
                  <Flex flexDir={'column'} gap={2}>
                    <CustomText text={product.title || "Título do produto aqui..."} fontSize="lg" fontWeight="semibold" />
                    <CustomText text={`R$ ${product.priceRange.minVariantPrice.amount}` || "Descrição do produto aqui..."} fontSize="lg" fontWeight="semibold" />
                  </Flex>

                  {/* Seção de Cores (Estática) */}
                  <Flex flexDir="column" gap={2} w="100%">
                    <HStack gap={6}>
                      {availableColors.length > 0 && (
                        <Flex flexDir="column" gap={2} w="100%">
                          <CustomText text="Cor:" fontWeight="semibold" fontSize={'sm'} />
                          {/* Se quiser mostrar o nome da cor selecionada (você precisará de um estado para isso) */}
                          {/* <CustomText text={`Selecionada: ${selectedColor?.name || 'Nenhuma'}`} fontSize={'xs'} /> */}
                          <HStack gap={3}> {/* Aumentei um pouco o gap para as bolinhas */}
                            {availableColors.map((color) => (
                              <Circle
                                key={color.name} // Usar o nome da cor ou um ID único se tiver
                                size="28px" // Um pouco maior para melhor clique
                                bg={color.hex}
                                border="2px solid" // Borda um pouco mais grossa para o estado selecionado
                                // Lógica para destacar a cor selecionada (você precisará de um estado 'selectedColor')
                                borderColor={selectedColor?.name === color.name ? 'blue.500' : (color.hex === '#FFFFFF' || color.hex === '#FEFEFE' ? 'gray.300' : 'transparent')}
                                title={color.name} // Mostra o nome da cor no hover
                                cursor="pointer"
                                onClick={() => setSelectedColor(color)} // Você precisará de um estado 'selectedColor' e 'setSelectedColor'
                                _hover={{
                                  borderColor: 'gray.400',
                                  transform: 'scale(1.1)'
                                }}
                                transition="all 0.2s ease-in-out"
                              />
                            ))}
                          </HStack>
                        </Flex>
                      )}
                    </HStack>
                  </Flex>

                  {/* Seção de Tamanhos (Estática) */}
                  <Flex flexDir="column" gap={2} w="100%">
                    <Flex justifyContent={'space-between'}>
                      <CustomText text="Product size:" fontWeight="semibold" fontSize={'sm'} />
                      <CustomText cursor='zoom-in' text="Size Chart:" fontWeight="semibold" fontSize={'sm'} opacity={0.6} textDecor={'underline'} />
                    </Flex>
                    <HStack gap={2}>
                      {availableSizes.length > 0 && (
                        <Flex flexDir="column" gap={2} w="100%">
                          <Flex justifyContent={'space-between'}>
                            <CustomText text="Tamanho:" fontWeight="semibold" fontSize={'sm'} />
                            {/* <CustomText cursor='pointer' text="Size Chart" fontWeight="semibold" fontSize={'sm'} opacity={0.6} textDecor={'underline'} /> */}
                          </Flex>
                          <HStack gap={2} wrap="wrap"> {/* Adicionado wrap para tamanhos */}
                            {availableSizes.map((size) => {
                              // Lógica para verificar se a combinação cor+tamanho está disponível
                              const variantForThisCombination = product.variants.nodes.find(variant =>
                                (variant.selectedOptions.find(opt => opt.name.toUpperCase() === 'COR')?.value === selectedColor?.name || !selectedColor) &&
                                variant.selectedOptions.find(opt => opt.name.toUpperCase() === 'TAMANHO')?.value === size.name
                              );
                              const isActuallyAvailable = variantForThisCombination ? variantForThisCombination.availableForSale : false;

                              return (
                                <Button
                                  key={size.name}
                                  size="sm"
                                  variant={selectedSize?.name === size.name ? "solid" : "outline"} // Destaca o selecionado
                                  colorScheme={selectedSize?.name === size.name ? "blue" : (isActuallyAvailable ? "gray" : "gray")}
                                  // onClick={() => setSelectedSize(size)} // Você precisará de um estado 'selectedSize' e 'setSelectedSize'
                                >
                                  {size.name}
                                </Button>
                              );
                            })}
                          </HStack>
                        </Flex>
                      )}
                    </HStack>
                  </Flex>
                  <Flex w='100%' flexDir={'column'} gap={4}>
                    <CustomButton text='Add to Bag' isDark={true} w='100%' border='1px solid' borderColor={'borderColor'} onClick={() => onOpenCart()} />
                    <CustomText cursor='zoom-in' text="View full details:" fontWeight="semibold" fontSize={'sm'} opacity={0.6} textDecor={'underline'} />
                  </Flex>
                </VStack>
              </Flex>
            </Dialog.Body>

            <Dialog.Footer>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
