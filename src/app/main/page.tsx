// src/app/gestao/page.tsx
'use client';

import { About } from "@/components/About";
import { ContactUs } from "@/components/layout/botrt/Contact";
import { Hero } from "@/components/Hero";
import { BusinessProcess } from "@/components/Business";
import { Contact } from "@/components/Contact";
import { pageData } from "@/data/gestao";
import { Services } from "@/components//Services";
// --- Framework e UI Libs ---
import {
    Flex,
} from "@chakra-ui/react";

// ============================================================================
//   COMPONENTE PRINCIPAL: GestaoPage
// ============================================================================
export default function Main() {

    return (
        <Flex direction="column" w="100%">
            {/* --- Seção Hero --- */}
            <Hero pageData={pageData} />
            <About />
            {/* <BusinessProcess /> */}
            <Services />
            <Contact />
            <ContactUs />
        </Flex>
    );
}
