'use client';

import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react';
import React, { createContext, useContext, ReactNode } from 'react';

const CartDrawerContext = createContext<UseDisclosureReturn | null>(null);

export function CartDrawerProvider({ children }: { children: ReactNode }) {
    const disclosureProps = useDisclosure();
    return (
        <CartDrawerContext.Provider value={disclosureProps}>
            {children}
        </CartDrawerContext.Provider>
    );
}


export function useCartDrawer() {
    const context = useContext(CartDrawerContext);
    if (!context) {
        throw new Error('useCartDrawer must be used within a CartDrawerProvider');
    }
    return context;
}