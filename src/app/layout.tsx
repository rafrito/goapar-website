import './global.css'
import type { Metadata } from "next";
import Provider from "./providers"
import { Header } from "@/components/layout/Header";
import { Container, Flex, Image } from "@chakra-ui/react";
import { Footer } from "@/components/layout/Footer";
import { BottomFooter } from "@/components/layout/BottomFooter";


// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Frontend base",
  description: "Frontend base hoje, amanhã e sempre",
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
          <Container centerContent maxW="container.xl" p={0} minH="100vh" display="flex" flexDirection="column" pos={'relative'} overflowX="hidden" >
            <Image className={'rotating-bg'} src={'main/background.svg'} objectPosition={{base:'center',md:'top'}} objectFit={{ base: 'cover', md: 'cover' }} pos={'absolute'} h={{ base: '100vh', md: '120vh' }} w='100%' zIndex={-1} opacity={0.5} />
            <Header />
            {children}
            <Footer />
            <BottomFooter />
          </Container>
        </Provider>
      </body>
    </html>
  );
}
