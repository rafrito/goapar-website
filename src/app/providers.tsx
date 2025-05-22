"use client"

import system from "@/theme"
import { ChakraProvider } from "@chakra-ui/react"
import { ColorModeProvider } from "../components/ui/color-mode"
import { ThemeProvider } from "../contexts/theme-provider"


export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider>
        <ThemeProvider attribute="class" disableTransitionOnChange>
              {props.children}
        </ThemeProvider>
      </ColorModeProvider>
    </ChakraProvider>
  )
}