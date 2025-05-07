import { Button, ButtonProps as ChakraButtonProps } from "@chakra-ui/react";

interface CustomButtonProps extends ChakraButtonProps {
    text?: string,
    isDark?: boolean,
    bgColorHover?: string,
    colorHover?: string
}

export function CustomButton({ text = 'Shop Now', bgColor = 'buttonBg', color = 'buttonColor', bgColorHover = 'buttonBgHover', colorHover = 'buttonColorHover', ...restProps }: CustomButtonProps) {

    if (restProps.isDark) {
        bgColor = 'buttonDarkBg'
        color = 'buttonDarkColor'
        bgColorHover = 'buttonDarkBgHover'
        colorHover = 'buttonDarkColorHover'
    }

    return (
        <Button {...restProps} size={'sm'} maxW={116} bgColor={bgColor} color={color} rounded={'l1'} _hover={{ bgColor: bgColorHover, color: colorHover, transition: '300ms' }}>
            {text}
        </Button>
    )
}