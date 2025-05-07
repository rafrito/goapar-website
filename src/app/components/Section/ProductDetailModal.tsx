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
  // Outros componentes Chakra que você pode precisar para estilizar
} from '@chakra-ui/react';
import React from 'react'; // Importe React
import { CustomText } from '../ui/CustomText';
import { CustomButton } from '../ui/CustomButton';
import { CartDrawer } from './CarDrawer';
import { useCartDrawer } from '../ui/cart-drawer-provider';


interface StaticProductDialogProps {
  isOpen: boolean;
  onClose: () => void;
  product: Products; // Produto a ser exibido
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

  // Dados fictícios para as opções de cores e tamanhos (apenas para layout)
  const mockColors = [{ hex: '#000000', name: 'Preto' }, { hex: '#FFFFFF', name: 'Branco' }, { hex: '#FF5F5E', name: 'Vermelho' }];
  const mockSizes = [{ name: 'P', available: true }, { name: 'M', available: true }, { name: 'G', available: false }];

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
                      src={product.image}
                      alt={product.description}
                      objectFit="cover"
                    />
                  </AspectRatio>
                </Flex>

                {/* Coluna de Informações e Opções */}
                <VStack flex={1} gap={8} align="flex-start">
                  <Flex flexDir={'column'} gap={2}>
                    <CustomText text={product.name || "Descrição do produto aqui..."} fontSize="lg" fontWeight="semibold" />
                    <CustomText text={`R$ ${product.price}` || "Descrição do produto aqui..."} fontSize="lg" fontWeight="semibold" />
                  </Flex>

                  {/* Seção de Cores (Estática) */}
                  <Flex flexDir="column" gap={2} w="100%">

                    <CustomText text="Product color:" fontWeight="semibold" fontSize={'sm'} />
                    <CustomText text="Color:" fontWeight="semibold" fontSize={'sm'} />

                    <HStack gap={6}>
                      {mockColors.map((color) => (
                        <Circle
                          key={color.hex}
                          size="24px"
                          bg={color.hex}
                          border="1px solid"
                          borderColor={color.hex === '#FFFFFF' ? 'gray.300' : 'transparent'}
                          title={color.name}
                          _hover={{ cursor: 'pointer', boxShadow: 'md', border: '2px solid', borderColor: 'black' }}
                        />
                      ))}
                    </HStack>
                  </Flex>

                  {/* Seção de Tamanhos (Estática) */}
                  <Flex flexDir="column" gap={2} w="100%">
                    <Flex justifyContent={'space-between'}>
                      <CustomText text="Product size:" fontWeight="semibold" fontSize={'sm'} />
                      <CustomText cursor='zoom-in' text="Size Chart:" fontWeight="semibold" fontSize={'sm'} opacity={0.6} textDecor={'underline'} />
                    </Flex>
                    <HStack gap={2}>
                      {mockSizes.map((size) => (
                        <Button
                          key={size.name}
                          size="sm"
                          variant={size.available ? "outline" : "ghost"}
                          disabled={!size.available}
                          colorScheme={size.available ? "gray" : undefined}
                        >
                          {size.name}
                        </Button>
                      ))}
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
