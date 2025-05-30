import { CustomText } from "@/components/ui/CustomText";
import { MotionButton } from "@/components/ui/MotionButton";
import { Flex } from "@chakra-ui/react";


export function Title() {
    return (
        <Flex flexDir={'column'} gap={8} py={40} alignItems={'center'} justifyContent={'center'}
        bgImage={'url(main/blur.png)'} bgPos={'top'} bgSize={'contain'} bgRepeat={'no-repeat'}
        >
            <Flex flexDir={'column'} gap={{ base: 4, md: 8 }} textAlign={'center'} alignItems={'center'} justifyContent={'center'} >
                <CustomText
                    as={'h1'}
                    maxW={{ base: "breakpoint-sm", md: "breakpoint-md" }}
                    text={'Soluções que Geram Resultados Reais'}
                    fontWeight={'semibold'}
                    fontSize={{ base: 40, md: 64 }}
                    lineHeight={1.1}
                />
                <CustomText
                    as={'h2'}
                    maxW={{ base: "breakpoint-sm", md: "breakpoint-sm" }}
                    px={{ base: 8, md: 2 }}
                    text={'Descubra como nossa consultoria e tecnologia podem otimizar seus processos e impulsionar o crescimento do seu negócio.'}
                    lineHeight={1.4}
                    fontSize={{ base: 16, md: 18 }}
                    color='mainSubColor'
                />
            </Flex>
            <Flex>
                <MotionButton text="Conheça nosso trabalho"/>
            </Flex>
        </Flex>
    )
}