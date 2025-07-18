// src/app/consultoria/page.tsx
'use client';

import { ContactUs } from "@/components/layout/botrt/Contact";
import { BotrtExamples } from "@/components/layout/botrt/Examples";
import { BotrtGrid } from "@/components/layout/botrt/Grid";
// ============================================================================
//   IMPORTS
// ============================================================================
import { Main } from "@/components/layout/botrt/Main";
import { BotrtPlans } from "@/components/layout/botrt/Plans";
import { BotrtVisual } from "@/components/layout/botrt/Visual";
import { CustomersCarousel } from "@/components/layout/Customers/CustomersCarousel";
import { FeedbacksCarousel } from "@/components/layout/Feedbacks/FeedbacksCarousel";

// ============================================================================
//   COMPONENTE PRINCIPAL: BotrtLandingPage
// ============================================================================
export default function BotrtLandingPage() {

    // --- Renderização do Componente ---
    return (
        <>
        <BotrtExamples/>
        <BotrtVisual/>
        <BotrtGrid/>
        <FeedbacksCarousel/>
        <BotrtPlans/>
        <ContactUs/>
        </>
    );
}



// Adicionar feedbacks da Marina
// Colocar mais call to actions

