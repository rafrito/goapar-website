// src/app/gestao/page.tsx
'use client';

import { useRef } from "react";

import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components//Services";
import { Partners } from "@/components/Partners";
import { ContactUs } from "@/components/Contact";
import { Map } from "@/components/Map";
import { Footer } from "@/components/Footer";
import { pageData } from "@/data/gestao";

import {
    Button,
    Flex,
} from "@chakra-ui/react";

const scrollToComponent = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
};

export default function Main() {
    const partnersRef = useRef<HTMLDivElement | null>(null);

    return (
        <Flex direction="column" w="100%">
            <Header />
            <Hero pageData={pageData} />
            <Button onClick={() => scrollToComponent(partnersRef)}>Scroll to Partners</Button>
            <About />
            <Services />
            <Partners ref={partnersRef} title="Parceiros"/>
            <ContactUs />
            <Map />
            <Footer />
        </Flex>
    );
}
