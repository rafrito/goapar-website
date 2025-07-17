// Salve como src/theme.ts ou src/app/theme.ts

import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"



const config = defineConfig({
    theme: {
        tokens: {
            colors: {
                fullBlack: { value: "#000000" },
                black: { value: "#000000" }, // Preto padrão Chakra (quase preto)
                white: { value: "#FFFFFF" },
                ghostWhite: { value: "#F0EFF4" }, // Branco fantasma (quase branco)
                cadetBlue: { value: "#54b9c9" }, // Azul cadete (azul claro)
                gunMetal:{value:'#292f36'},
                shotGunMetal:{value:'#141414'},
                roseWood: { value: "#570A0A" }, // Madeira de rosa (vermelho escuro)
                brand: { // Sua cor de destaque
                    // ... (sua escala de cores brand)
                    50: { value: "#FFF5F5" },
                    100: { value: "#FFD6D6" },
                    200: { value: "#FFB7B7" },
                    300: { value: "#FF9998" },
                    400: { value: "#FF7A79" },
                    500: { value: "#FF5F5E" },
                    600: { value: "#E55554" },
                    700: { value: "#CC4B4A" },
                    800: { value: "#B24140" },
                    900: { value: "#993736" },
                },
                boTrtLandingPage: {
                    black: { value: "#000000" },
                    darkBlue: { value: "#0d2558" },
                    blue: { value: "#133c96" },
                    lightBlue: { value: "#204CAD" },
                    shadow: { value: "rgba(0, 120, 215, 0.3)" },
                    boxShadow: { value: "#3e67c0ff" },
                    border: { value: "#3e67c0ff" }
                },
                boTrtDarkBlue: {
                    50: { value: "#e3e6ea" },
                    100: { value: "#b9c1cf" },
                    200: { value: "#8f9bb4" },
                    300: { value: "#657699" },
                    400: { value: "#3b507e" },
                    500: { value: "#0b132c" }, // base
                    600: { value: "#091024" },
                    700: { value: "#070d1c" },
                    800: { value: "#050a14" },
                    900: { value: "#03070c" }
                },
                boTrtRed: {
                    50: { value: "#ffeaea" },
                    100: { value: "#ffc7c7" },
                    200: { value: "#ffa3a3" },
                    300: { value: "#ff8080" },
                    400: { value: "#f45e5d" }, // base
                    500: { value: "#d94e4d" },
                    600: { value: "#be3e3d" },
                    700: { value: "#a32e2d" },
                    800: { value: "#881e1d" },
                    900: { value: "#6d0e0d" }
                },
                boTrtLightRed: {
                    50: { value: "#fff6f6" },
                    100: { value: "#ffe2e1" },
                    200: { value: "#ffcfcf" },
                    300: { value: "#ffbcbc" },
                    400: { value: "#ffa2a1" }, // base
                    500: { value: "#e08f8e" },
                    600: { value: "#c17c7b" },
                    700: { value: "#a26968" },
                    800: { value: "#835655" },
                    900: { value: "#644342" }
                },
                boTrtCharcoal: {
                    50: { value: "#e6e6e7" },
                    100: { value: "#c1c2c3" },
                    200: { value: "#9c9d9f" },
                    300: { value: "#77787b" },
                    400: { value: "#525357" },
                    500: { value: "#151721" }, // base
                    600: { value: "#12141c" },
                    700: { value: "#0f1117" },
                    800: { value: "#0c0e12" },
                    900: { value: "#090b0d" }
                },
                boTrtGhostWhite: {
                    50: { value: "#ffffff" },
                    100: { value: "#fafafd" },
                    200: { value: "#f5f6fa" },
                    300: { value: "#f2f3f7" },
                    400: { value: "#f0eff5" }, // base
                    500: { value: "#d8d7dd" },
                    600: { value: "#c0bec5" },
                    700: { value: "#a8a6ad" },
                    800: { value: "#908e95" },
                    900: { value: "#78767d" }
                },
                // Cores padrão 'gray', 'blue', etc., vêm do defaultConfig
            },
            // fonts: { heading: { value: ... }, body: { value: ... } },
        },
        // --- Tokens Semânticos (para Light/Dark Mode) ---
        semanticTokens: {
            colors: {
                // Cor de fundo principal da página/body
                bodyBg: {
                    // Valor literal 'white' para base
                    // String de referência '{colors.path.to.token}' para _dark
                    value: { base: "black", _dark: "black" }
                },
                preHeaderBg: {
                    value: { base: "white", _dark: "white" }
                },
                invertedColor: {
                    value: { base: "black", _dark: "black" }
                },
                spinnerColor: {
                    value: { base: "white", _dark: "white" }
                },
                blackToShotGunMetal: {
                    value: { base: "linear(to-r, black, {colors.shotGunMetal})", _dark: "linear(to-r, black, {colors.shotGunMetal})" }
                },
                // Cor principal do texto no corpo
                textPrimary: {
                    value: { base: "{colors.whiteAlpha.900}", _dark: "{colors.whiteAlpha.900}" }
                },
                // Cor de texto secundária/mais clara
                textSecondary: {
                    value: { base: "{colors.gray.400}", _dark: "{colors.gray.400}" }
                },
                // Cor de fundo do cabeçalho (Exemplo)
                headerBg: {
                    // Pode usar um literal ou referenciar outro token
                    value: { base: "black", _dark: "black" }
                },
                // Cor do texto no cabeçalho (Exemplo)
                headerText: {
                    // Pode referenciar outro token semântico ou um base
                    value: { base: "{colors.textPrimary}", _dark: "{colors.textPrimary}" } // Ex: Reusa textPrimary
                    // Ou direto: value: { base: "{colors.gray.800}", _dark: "{colors.whiteAlpha.900}" }
                },
                // Cor de destaque (sua cor #FF5F5E)
                accent: {
                    value: { base: "{colors.brand.400}", _dark: "{colors.brand.400}" }
                },
                // Cor para bordas discretas
                borderSubtle: {
                    value: { base: "{colors.whiteAlpha.300}", _dark: "{colors.whiteAlpha.300}" }
                },
                // Cor de fundo para elementos como cards
                cardBg: {
                    value: { base: "{colors.gray.700}", _dark: "{colors.gray.700}" }
                },
                buttonBg: {
                    value: { base: "{colors.brand.500}", _dark: "{colors.brand.500}" }
                },
                buttonBgHover: {
                    value: { base: "{colors.cadetBlue}", _dark: "{colors.cadetBlue}" }
                },
                buttonDarkBgHover: {
                    value: { base: "black", _dark: "black" }
                },
                buttonColor: {
                    value: { base: "white", _dark: "white" }
                },
                buttonDarkColor: {
                    value: { base: "black", _dark: "black" }
                },
                buttonColorHover: {
                    value: { base: "black", _dark: "black" }
                },
                buttonDarkColorHover: {
                    value: { base: "white", _dark: "white" }
                },
                brandBg: {
                    value: { base: "#040404", _dark: "#040404" }
                },
                borderColor: {
                    value: { base: "#FFFFFF22", _dark: "#FFFFFF22" }
                },
                headerColor: {
                    value: { base: "#9E9E9E", _dark: "#9E9E9E" }
                },
                mainColor: {
                    value: { base: "white", _dark: "white" }
                },
                mainSubColor: {
                    value: { base: "#9E9E9E", _dark: "#9E9E9E" }
                },
                showCaseBg:{
                    value: { base: "{colors.gray.900}", _dark: "{colors.gray.900}" }
                },
                showCaseBorder:{
                    value: { base: "#13141588", _dark: "#13141588" }
                },
                footerBg: {
                    value: { base: "#18181C", _dark: "#18181C" }
                },
                footerColor: {
                    value: { base: "#9E9E9E", _dark: "#9E9E9E" }
                },
                footerHeaderColor: {
                    value: { base: "white", _dark: "white" }
                },
                bottomFooterBg: {
                    value: { base: "black", _dark: "black" }
                },
                bottomFooterColor: {
                    value: { base: "#9E9E9E", _dark: "#9E9E9E" }
                },
                bottomFooterHeaderColor: {
                    value: { base: "white", _dark: "white" }
                },
                bottomFooterIconBg: {
                    value: { base: "{colors.gray.900}", _dark: "{colors.gray.900}" }
                },
                bottomFooterIconBgHover: {
                    value: { base: "{colors.gray.700}", _dark: "{colors.gray.700}" }
                },
                brandGradient: {
                    value: { base: '#FF5251', _dark: "#FF5251" }
                }
                // ... adicione outros tokens semânticos ...
            }
        },

    },
    globalCss: {
        "html, body": {
            margin: '0',
            padding: '0',
            bgColor: '{colors.bodyBg}',
            zIndex:-2
        },
    },
})

// // 2. Definições do Tema Customizado
// const customTheme = {
//     theme: {
//         // --- Tokens Base ---
//         globalCss: {
//             "html, body": {
//                 margin: 550,
//                 padding: 550,
//             },
//         },
//         tokens: {
//             colors: {
//                 black: { value: "#1A202C" }, // Preto padrão Chakra (quase preto)
//                 white: { value: "#FFFFFF" },
//                 brand: { // Sua cor de destaque
//                     // ... (sua escala de cores brand)
//                     50: { value: "#FFF5F5" },
//                     100: { value: "#FFD6D6" },
//                     200: { value: "#FFB7B7" },
//                     300: { value: "#FF9998" },
//                     400: { value: "#FF7A79" },
//                     500: { value: "#FF5F5E" },
//                     600: { value: "#E55554" },
//                     700: { value: "#CC4B4A" },
//                     800: { value: "#B24140" },
//                     900: { value: "#993736" },
//                 }
//                 // Cores padrão 'gray', 'blue', etc., vêm do defaultConfig
//             },
//             // fonts: { heading: { value: ... }, body: { value: ... } },
//         },
//         // --- Tokens Semânticos (para Light/Dark Mode) ---
//         semanticTokens: {
//             colors: {
//                 // **CORES PARA O BODY**
//                 bodyBg: { // Cor de fundo do corpo da página
//                     default: { value: "white" },      // Branco no modo claro
//                     _dark: { value: "gray.800" }    // Cinza escuro no modo escuro
//                 },
//                 textBody: { // Cor principal do texto no corpo
//                     default: { value: "gray.800" },   // Quase preto no modo claro
//                     _dark: { value: "whiteAlpha.900" } // Quase branco no modo escuro
//                 },

//                 // **CORES PARA O HEADER** (Exemplo - ajuste conforme seu design)
//                 headerBg: { // Cor de fundo do cabeçalho
//                     // Exemplo: Fundo branco/cinza igual ao body, mas pode ser diferente
//                     default: { value: "white" },
//                     _dark: { value: "gray.800" }
//                     // Ou poderia ser uma cor sólida diferente:
//                     // default: { value: "gray.100" },
//                     // _dark: { value: "gray.700" }
//                 },
//                 headerText: { // Cor do texto no cabeçalho
//                     // Geralmente igual ao texto principal, mas pode variar
//                     default: { value: "gray.800" },
//                     _dark: { value: "whiteAlpha.900" }
//                 },

//                 // Tokens já definidos (mantidos)
//                 textSecondary: {
//                     default: { value: "gray.600" },
//                     _dark: { value: "gray.400" }
//                 },
//                 accent: { // Sua cor de destaque
//                     default: { value: "brand.500" },
//                     _dark: { value: "brand.400" }
//                 },
//                 borderSubtle: {
//                     default: { value: "gray.200" },
//                     _dark: { value: "whiteAlpha.300" }
//                 },
//                 cardBg: { // Exemplo para fundo de cards
//                     default: { value: "gray.50" },
//                     _dark: { value: "gray.700" }
//                 }
//                 // ... adicione outros tokens semânticos conforme precisar ...
//             }
//         }
//     },

// }

// 3. Cria o Sistema de Tema
// Passamos a config como primeiro argumento e as customizações como segundo
const system = createSystem(defaultConfig, config)

export default system // Exporta o sistema criado