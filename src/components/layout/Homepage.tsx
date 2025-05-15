'use client'
import { Container } from "@chakra-ui/react";
import { Header } from "./Header";
import { PreHeader } from "./PreHeader";
import { Banner } from "./Banner";
import { BrandMessage } from "./BrandMessage";
import { InstagramShowCase } from "./InstagramShowCase";
import { Footer } from "./Footer";
import { Section } from "./Section";


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