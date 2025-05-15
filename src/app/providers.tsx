"use client"

import system from "@/theme"
import { ChakraProvider } from "@chakra-ui/react"
import { ColorModeProvider } from "../components/ui/color-mode"
import { CartDrawerProvider } from "../contexts/cart-drawer-provider"
import { ThemeProvider } from "../contexts/theme-provider"
import { CartProvider } from "@/contexts/cart-provider"


export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider>
        <ThemeProvider attribute="class" disableTransitionOnChange>
          <CartDrawerProvider>
            <CartProvider>
              {props.children}
            </CartProvider>
          </CartDrawerProvider>
        </ThemeProvider>
      </ColorModeProvider>
    </ChakraProvider>
  )
}