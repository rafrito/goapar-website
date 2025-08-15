import { CasesProps } from "@/data/cases";

interface GestaoPageData {
    hero: {
        title: string;
        subtitle: string;
        ctaButton: string;
        imgSrc: string;
    };
    services: CasesProps[]
}

export type {GestaoPageData}