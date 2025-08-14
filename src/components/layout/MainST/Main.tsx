'use client'
import { Flex } from "@chakra-ui/react";
import { TitleST } from "./Title";


export function MainST() {

    return (
        <Flex flexDir={'column'} alignItems={{ base: 'start', md: 'center' }} justifyContent={'center'} w='100%' pt={{ base: 2, md: 8 }} pb={16}>
            <Flex w='100%' justifyContent={'space-between'} alignItems={{ base: 'start', md: 'center' }} py={{ base: 2, md: 32 }} flexDir={{ base: 'column-reverse', md: 'row' }}>
                <TitleST />
            </Flex>
            
        </Flex>
    )
}