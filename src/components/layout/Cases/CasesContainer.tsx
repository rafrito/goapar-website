import { Flex } from "@chakra-ui/react";
import { Cases } from "./Cases";
import { cases } from "@/data/cases";


export function CasesContainer() {

    return (
        <Flex flexDir={'column'} gap={{ base: 8, md: 64 }} py={{ base: 12, md: 32 }}>
            {cases.map((c, index) => {
                return (<Cases key={c.product + index} c={c} />)
            })}
        </Flex>
    )
}