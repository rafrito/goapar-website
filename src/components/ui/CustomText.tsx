import { Text, TextProps as ChakraTextProps } from "@chakra-ui/react";
import { JSX } from "react";

interface CustomTextProps extends ChakraTextProps {
    text?: string | JSX.Element,
}

export function CustomText({ text = 'Shop Now', fontSize = 'sm', color = 'TextColor', fontWeight='normal', ...restProps }: CustomTextProps) {

    return (
        <Text {...restProps} fontSize={fontSize} color={color} fontWeight={fontWeight}>
            {text}
        </Text>
    )
}