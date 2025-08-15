import { Flex, useBreakpointValue } from "@chakra-ui/react";


export function Mapa() {
    const height = useBreakpointValue({ base: 254, sm: 254, md: 254, lg: 492, xl: 492 })

    return (
        <Flex w='100%'>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4295.838013828789!2d-48.55214110000001!3d-27.589685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95273818ef44cf45%3A0x820c90460fe96ac6!2sAv.%20Prof.%20Othon%20Gama%20D&#39;E%C3%A7a%2C%20677%20-%20Centro%2C%20Florian%C3%B3polis%20-%20SC%2C%2088015-240!5e1!3m2!1spt-BR!2sbr!4v1742245910170!5m2!1spt-BR!2sbr" width="100%" height={height} style={{ opacity: 0.5, filter: 'grayscale(100%)' }} />
        </Flex>
    )
}