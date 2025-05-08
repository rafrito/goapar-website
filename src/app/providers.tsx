"use client"

import system from "@/theme"
import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { ColorModeProvider } from "./components/ui/color-mode"
import { CartDrawerProvider } from "./components/ui/cart-drawer-provider"
import { ThemeProvider } from "./components/ui/theme-provider"


export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider>
        <ThemeProvider attribute="class" disableTransitionOnChange>
          <CartDrawerProvider>
          {props.children}
          </CartDrawerProvider>
        </ThemeProvider>
      </ColorModeProvider>
    </ChakraProvider>
  )
}