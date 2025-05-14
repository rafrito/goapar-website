'use client'
import { Container } from "@chakra-ui/react";
import { MainProductsList } from "./Section/MainProductsList";
import { PreHeader } from "./PreHeader";
import { Header } from "./Header";


export function ProductsPage() {

    return (
        <Container centerContent bgColor={'bodyBg'} maxW={1920} p={0}>
            <PreHeader />
            <Header />
            <MainProductsList start={0} end={25} />
        </Container>
    )
}