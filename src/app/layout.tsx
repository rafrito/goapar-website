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
