import './global.css'
import type { Metadata } from "next";
import Provider from "./providers"
import { Header } from "@/components/layout/Header";
import { Container } from "@chakra-ui/react";
import { Footer } from "@/components/layout/Footer";
import { ProfileProvider } from '@/contexts/ProfileContext';


export const metadata: Metadata = {
  title: "GoaPar Imóveis",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body>
        <Provider>
          <ProfileProvider>
            <Container centerContent p={0} minH="100vh" maxW='100vw' display="flex" flexDirection="column" pos={'relative'} overflowX="hidden">
              {/* <Image className={'rotating-bg'} src={'main/background.svg'} objectPosition={{base:'center',md:'top'}} objectFit={{ base: 'contain', md: 'cover' }} pos={'absolute'} h={{md: '120vh' }} w='100%' zIndex={-1} opacity={{base:0.8, md:0.5}}  mt={{base:32, md:''}}/> */}
              <Header />
              {children}
              <Footer />
            </Container>
          </ProfileProvider>
        </Provider>
      </body>
    </html>
  );
}
