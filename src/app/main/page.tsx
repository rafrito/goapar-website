// src/app/gestao/page.tsx
'use client';

import { About } from "@/components/About";
import { Hero } from "@/components/Hero";
import { ContactUs} from "@/components/Contact";
import { pageData } from "@/data/gestao";
import { Services } from "@/components//Services";
import { Partners } from "@/components/Partners";

import {
    Flex,
} from "@chakra-ui/react";

export default function Main() {

    return (
        <Flex direction="column" w="100%">
            <Hero pageData={pageData} />
            <About />
            <Services />
            <Partners />
            <ContactUs />
        </Flex>
    );
}
