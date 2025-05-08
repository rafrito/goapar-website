'use client'
import { Container, Stack, Accordion, Span, Text, Avatar, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ColorModeButton } from "./ui/color-mode";
import { Header } from "./Header";
import { PreHeader } from "./PreHeader";
import { Banner } from "./Banner";
import { Section } from "./Secton";
import { BrandMessage } from "./BrandMessage";
import { InstagramShowCase } from "./InstagramShowCase";
import { Footer } from "./Footer";
import { getProducts } from "@/lib/shopify";


export function Homepage() {

    useEffect(() => {
        const fetchProducts = async () => {
            // Assuming getProducts and Product type are imported from your Shopify API client
            // e.g., import { getProducts, Product } from '@/lib/shopify';
            try {
                const products: any[] = await getProducts(5);
                console.log("Produtos recebidos no cliente:", products);
                // For now, as getProducts is not defined, I'll use a placeholder
                console.log("Fetching products...");
                // Replace with actual API call when getProducts is available
            } catch (error) {
                console.error("Erro ao buscar produtos:", error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <Container centerContent bgColor={'bodyBg'} maxW={1920} p={0}>
            
            <PreHeader/>
            <Header/>
            <Banner/>
            <Section/>
            <BrandMessage/>
            <InstagramShowCase/>
            <Footer/>
        </Container>
    )
}