// src/components/ProductDetailModal.tsx (ou onde preferir)

import { Dialog, Portal, CloseButton, Image, Button, Flex, VStack, HStack, AspectRatio, Circle } from '@chakra-ui/react';
import { Toaster, toaster } from "@/components/ui/toaster"

import React, { useEffect, useMemo, useState } from 'react'; // Importe React
import { CustomText } from '../../ui/CustomText';
import { CustomButton } from '../../ui/CustomButton';
import { useCartDrawer } from '../../../contexts/cart-drawer-provider';
import { ColorOption, ProductVariant, ShopifyProduct } from '@/types';
import { COLOR_NAME_TO_HEX_MAP, SIZE_NAME_MAP } from '@/utils/productUtils';
import { useCart } from '@/contexts/cart-provider';


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
  const { onOpen: onOpenCart } = useCartDrawer(); // Pega do contexto!

  const { addItem, isLoading: isCartLoading } = useCart();


  const [selectedColor, setSelectedColor] = useState<ColorOption | null>(null);
  const [selectedSize, setSelectedSize] = useState<{ name: string; available: boolean } | null>(null); // Usando displayName
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
    return Array.from(sizeValues).map(sizeName => ({ name: sizeName, available: true /* Lógica de disponibilidade real aqui */ }));
  }, [product]);



  // Função para adicionar ao carrinho
  const handleAddToCart = async () => {
    if (!product) {
      console.error("Produto não definido, não é possível adicionar ao carrinho.");
      toaster.create({ title: "Produto não definido, não é possível adicionar ao carrinho." });
      // Adicione um toast de erro aqui se desejar
      return;
    }

    const productHasColorOptions = availableColors.length > 0;
    const productHasSizeOptions = availableSizes.length > 0;

    // 1. Validar se as opções necessárias foram selecionadas (se o produto tiver variantes)
    if (productHasColorOptions && !selectedColor) {
      // Idealmente, use um toast do Chakra UI aqui para feedback ao usuário
      toaster.create({ title: 'Por favor, selecione uma cor.' }); // Substitua por toast
      return;
    }
    if (productHasSizeOptions && !selectedSize) {
      toaster.create({ title: 'Por favor, selecione um tamanho.' }); // Substitua por toast
      return;
    }

    // 2. Determinar qual variantId usar
    let variantIdToAdd: string | undefined = undefined;

    if (product.variants && product.variants.nodes && product.variants.nodes.length > 0) {
      // Se o produto TEM variantes, precisamos da selectedVariant
      if (!selectedVariant) {
        toaster.create({ title: 'Por favor, selecione uma combinação válida de opções.' }); // Substitua por toast
        return;
      }
      if (!selectedVariant.availableForSale) {
        toaster.create({ title: 'Esta combinação está fora de estoque.' }); // Substitua por toast
        return;
      }
      variantIdToAdd = selectedVariant.id;
    } else if (product.variants?.nodes?.[0]?.id) {

      // Se o produto NÃO tem opções selecionáveis (mas a API sempre retorna um array de variantes,
      // mesmo para produtos simples), usamos o ID da primeira (e única) variante.
      variantIdToAdd = product.variants.nodes[0].id;
      if (!product.variants.nodes[0].availableForSale) {
        toaster.create({ title: 'Produto fora de estoque.' }); // Substitua por toast
        return;
      }
    } else {
      // Caso de segurança: não deveria acontecer se os dados do produto estiverem corretos
      console.error("Não foi possível determinar a variante para adicionar ao carrinho.");
      toaster.create({ title: 'Erro ao selecionar o produto. Tente novamente.' }); // Substitua por toast
      return;
    }

    if (!variantIdToAdd) {
      console.error("ID da variante não encontrado para adicionar ao carrinho.");
      toaster.create({ title: 'Erro ao processar o produto. Tente novamente.' }); // Substitua por toast
      return;
    }

    console.log(`Tentando adicionar ao carrinho: Variante ID: ${variantIdToAdd}, Quantidade: ${quantity}`);

    try {
      // 3. Chamar a função addItem do seu CartContext
      //    A função addItem no seu CartProvider fará a chamada à API do Shopify
      //    e depois atualizará o estado global do carrinho.
      await addItem(variantIdToAdd, quantity);

      // 4. Feedback para o usuário (ex: toast de sucesso)
      console.log(`${product.title} (Qtd: ${quantity}) adicionado ao carrinho!`);
      toaster.create({ title: `${product.title} adicionado à sacola!` }); // Substitua por toast

      // 5. Opcional: Abrir o drawer do carrinho
      onOpenCart(); // Função do useCartDrawer que você já tem

      // 6. Fechar o modal do produto
      onClose(); // Função vinda das props para fechar este modal

    } catch (error) {
      console.error("Erro ao chamar addItem do CartContext:", error);
      // Feedback de erro para o usuário (ex: toast de erro)
      toaster.create({ title: 'Houve um erro ao adicionar o produto à sacola. Tente novamente.' }); // Substitua por toast
    }
  };
  



  // Efeito para resetar seleções e quantidade quando o produto muda ou modal abre/fecha
  useEffect(() => {
    if (isOpen && product) {
      // Tenta pré-selecionar a primeira cor e tamanho, se existirem e houver variantes
      const firstColor = availableColors.length > 0 ? availableColors[0] : null;
      const firstSize = availableSizes.length > 0 ? availableSizes[0] : null;

      setSelectedColor(firstColor);
      setSelectedSize(firstSize);
      setQuantity(1);
      // selectedVariant será atualizado pelo próximo useEffect
    } else if (!isOpen) {
      // Limpa ao fechar
      setSelectedColor(null);
      setSelectedSize(null);
      setSelectedVariant(undefined);
      setQuantity(1);
    }
  }, [product, isOpen, availableColors, availableSizes]);



  
  // **** useEffect para encontrar a variante correspondente ****
  useEffect(() => {
    if (product && product.variants && product.variants.nodes && (selectedColor || selectedSize || (availableColors.length === 0 && availableSizes.length === 0))) {
      // Se não há opções de cor nem tamanho (produto simples), pega a primeira variante
      if (availableColors.length === 0 && availableSizes.length === 0 && product.variants.nodes.length > 0) {
        setSelectedVariant(product.variants.nodes[0]);
        return;
      }

      // Procura a variante que corresponde às opções selecionadas
      const variant = product.variants.nodes.find(vNode => {
        const colorMatch = !selectedColor || vNode.selectedOptions.some(
          opt => opt.name.trim().toUpperCase() === 'COR' && opt.value === selectedColor.name
        );
        const sizeMatch = !selectedSize || vNode.selectedOptions.some(
          opt => opt.name.trim().toUpperCase() === 'TAMANHO' && opt.value === selectedSize.name
        );

        // Considera se o produto realmente TEM essas opções
        const productHasColorOption = availableColors.length > 0;
        const productHasSizeOption = availableSizes.length > 0;

        if (productHasColorOption && productHasSizeOption) {
          return colorMatch && sizeMatch;
        } else if (productHasColorOption) {
          return colorMatch;
        } else if (productHasSizeOption) {
          return sizeMatch;
        }
        return false; // Nenhuma opção para parear, mas isso não deveria acontecer se variants.nodes existe
      });
      setSelectedVariant(variant);
    } else if (product && product.variants && product.variants.nodes && product.variants.nodes.length === 1 && availableColors.length === 0 && availableSizes.length === 0) {
      // Caso especial: produto simples com apenas uma variante e sem opções de escolha
      setSelectedVariant(product.variants.nodes[0]);
    } else {
      setSelectedVariant(undefined); // Nenhuma variante encontrada ou produto não tem variantes
    }
  }, [selectedColor, selectedSize, product, availableColors, availableSizes]); // Dependências



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
                                  onClick={() => setSelectedSize(size)} // Você precisará de um estado 'selectedSize' e 'setSelectedSize'
                                >
                                  {SIZE_NAME_MAP[size.name]}
                                </Button>
                              );
                            })}
                          </HStack>
                        </Flex>
                      )}
                    </HStack>
                  </Flex>
                  <Flex w='100%' flexDir={'column'} gap={4}>
                    <CustomButton
                      text='Add to Bag'
                      isDark={true} // Ou o estilo que você quer
                      w='100%'
                      size="lg" // Botão maior para destaque
                      // border='1px solid' // Removi, CustomButton deve lidar com seu próprio estilo
                      // borderColor={'borderColor'}
                      onClick={handleAddToCart} // <<<<---- CONECTA A FUNÇÃO AQUI
                      loading={isCartLoading} // Usa o isLoading do useCart
                      disabled={
                        // Desabilita se:
                        // 1. O produto tem opções e uma variante válida não foi selecionada
                        ((availableColors.length > 0 || availableSizes.length > 0) && !selectedVariant) ||
                        // 2. A variante selecionada (ou a única variante) não está disponível para venda
                        (selectedVariant && !selectedVariant.availableForSale) ||
                        // 3. É um produto simples (sem opções) mas sua única variante não está disponível
                        (!availableColors.length && !availableSizes.length && product.variants?.nodes?.[0] && !product.variants.nodes[0].availableForSale)
                      } />
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
      <Toaster />
    </Dialog.Root>
  );
}
