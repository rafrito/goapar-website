'use client'
import { Container, Stack, Accordion, Span, Text, Avatar, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { ColorModeButton } from "./ui/color-mode";
import { Header } from "./Header";
import { PreHeader } from "./PreHeader";
import { Banner } from "./Banner";
import { Section } from "./Secton";
import { BrandMessage } from "./BrandMessage";
import { InstagramShowCase } from "./InstagramShowCase";
import { Footer } from "./Footer";


export function Homepage() {

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