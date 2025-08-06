// src/app/gestao/page.tsx
'use client';

import { ContactUs } from "@/components/layout/botrt/Contact";
import { CustomersCarousel } from "@/components/layout/Customers/CustomersCarousel";
import { Hero } from "@/components/layout/gestao/Hero";
import { Services } from "@/components/layout/gestao/Services";
import { pageData } from "@/data/gestao";
// --- Framework e UI Libs ---
import {
    Flex,
} from "@chakra-ui/react";

// ============================================================================
//   COMPONENTE PRINCIPAL: GestaoPage
// ============================================================================
export default function GestaoPage() {

    return (
        <Flex direction="column" w="100%">
            {/* --- Seção Hero --- */}
            <Hero pageData={pageData} />
            <Flex py={8} my={4} >
                <CustomersCarousel logoHeight={24} />
            </Flex>
            <Services pageData={pageData} />
            <ContactUs />
        </Flex>
    );
}
