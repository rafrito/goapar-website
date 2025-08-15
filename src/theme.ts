// Salve como src/theme.ts ou src/app/theme.ts

import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"



const config = defineConfig({
    theme: {
        tokens: {
            colors: {
                whatsappColor: { value: "#25D366" }, // Cor do WhatsApp
                whatsappDarkColor: { value: "#128C7E" }, // Cor do Whats
                instagramColor: { value: "#E1306C" }, // Cor do Instagram
                linkedinColor: { value: "#0077B5" }, // Cor do LinkedIn
                fullBlack: { value: "#000000" },
                black: { value: "#000000" }, // Preto padrão Chakra (quase preto)
                gray: { value: "#808080" }, // Cinza padrão
                white: { value: "#FFFFFF" },
                ghostWhite: { value: "#F0EFF4" }, // Branco fantasma (quase branco)
                cadetBlue: { value: "#54b9c9" }, // Azul cadete (azul claro)
                gunMetal: { value: '#292f36' },
                shotGunMetal: { value: '#141414' },
                roseWood: { value: "#570A0A" }, // Madeira de rosa (vermelho escuro)
                brand: { // Sua cor de destaque em tons de azul
                    50: { value: "#F0F9FF" }, // Azul quase branco
                    100: { value: "#E0F2FE" }, // Azul bem claro
                    200: { value: "#BAE6FD" }, // Azul claro
                    300: { value: "#7DD3FC" }, // Azul pastel
                    400: { value: "#38BDF8" }, // Azul intermediário
                    500: { value: "#0EA5E9" }, // Azul vibrante (cor principal)
                    600: { value: "#0284C7" }, // Azul forte
                    700: { value: "#0369A1" }, // Azul escuro
                    800: { value: "#075985" }, // Azul bem escuro
                    900: { value: "#0C4A6E" }, // Azul profundo
                },
                dark : {
                    300: { value: "#A6A6A6" }, // Cinza mais escuro
                    400: { value: "#8C8C8C" }, // Cinza ainda mais escuro
                    500: { value: "#737373" }, // Cinza quase preto
                    600: { value: "#595959" }, // Cinza muito escuro
                    700: { value: "#404040" }, // Cinza ultra escuro
                    800: { value: "#262626" }, // Cinza quase preto
                    900: { value: "#0D0D0D" }, // Preto
                },
                light: {
                    50: { value: "#FFFFFF" }, // Branco
                    100: { value: "#F0F0F0" }, // Cinza claro
                    200: { value: "#D9D9D9" }, // Cinza médio
                    300: { value: "#BFBFBF" }, // Cinza escuro
                },
                orange: {
                    50: { value: "#FFF3E0" }, // Laranja claro
                    100: { value: "#FFE0B2" }, // Laranja médio
                    200: { value: "#FFCC80" }, // Laranja escuro
                    300: { value: "#FFB74D" }, // Laranja mais escuro
                    400: { value: "#FFA726" }, // Laranja vibrante
                    500: { value: "#FF9800" }, // Laranja forte
                    600: { value: "#FB8C00" }, // Laranja intenso
                    700: { value: "#F57C00" }, // Laranja profundo
                    800: { value: "#EF6C00" }, // Laranja muito profundo
                    900: { value: "#E65100" }, // Laranja quase preto
                },
                grayBlue: {
                    50: { value: "#E0F2FE" }, // Azul claro
                    100: { value: "#B2EBF2" }, // Azul médio
                    200: { value: "#80DEEA" }, // Azul escuro
                    300: { value: "#4DD0E1" }, // Azul mais escuro
                    400: { value: "#26C6DA" }, // Azul vibrante
                    500: { value: "#00BCD4" }, // Azul forte
                    600: { value: "#00ACC1" }, // Azul intenso
                    700: { value: "#0097A7" }, // Azul profundo
                    800: { value: "#00838F" }, // Azul muito profundo
                    900: { value: "#006064" }, // Azul quase preto
                }
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
            zIndex: -2
        },
    },
})

const system = createSystem(defaultConfig, config)

export default system // Exporta o sistema criado