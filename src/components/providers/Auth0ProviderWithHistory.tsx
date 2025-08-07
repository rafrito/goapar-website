// src/components/providers/Auth0ProviderWithHistory.tsx
'use client';

import { AppState, Auth0Provider } from '@auth0/auth0-react';
import { useRouter } from 'next/navigation';

export const Auth0ProviderWithHistory = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN;
  const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID;
  const audience = process.env.NEXT_PUBLIC_AUTH0_AUDIENCE;

  if (!domain || !clientId) {
    return null; // Ou uma mensagem de erro
  }

  // A MUDANÇA: O nosso "recepcionista" agora está mais inteligente.
  const onRedirectCallback = (appState?: AppState) => {
    // Verifica se existe uma "anotação" na passagem (o appState)
    if (appState?.action === 'subscribe' && appState?.priceId) {
      // Se sim, constrói uma URL especial com a instrução para a página de planos
      const targetUrl = `${appState.returnTo || '/'}?action=subscribe&priceId=${appState.priceId}`;
      console.log(`[Auth0 Callback] Ação de assinatura detectada. Redirecionando para: ${targetUrl}`);
      router.push(targetUrl);
    } else {
      // Se não, faz o de sempre: volta para a página de onde saiu ou para a home
      console.log(`[Auth0 Callback] Nenhuma ação específica. Redirecionando para: ${appState?.returnTo || window.location.pathname}`);
      router.push(appState?.returnTo || window.location.pathname);
    }
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: typeof window !== 'undefined' ? window.location.origin : undefined,
        audience: 'https://auth.awer.co'
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};