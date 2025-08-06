// src/contexts/ProfileContext.tsx
'use client';

import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

// --- Tipagem para os dados do perfil ---
interface UserProfile {
    email: string;
    isAwerClient: boolean;
}

// --- Tipagem para o valor do Contexto ---
interface ProfileContextType {
    profile: UserProfile | null;
    isLoading: boolean;
}

// Cria o Contexto com um valor padrão
const ProfileContext = createContext<ProfileContextType>({
    profile: null,
    isLoading: true,
});

// Hook customizado para usar o contexto facilmente
export const useProfile = () => useContext(ProfileContext);

// --- Componente Provedor ---
// A função dele é buscar os dados do perfil e fornecê-los para toda a aplicação.
export const ProfileProvider = ({ children }: { children: ReactNode }) => {
    const { isAuthenticated, getAccessTokenSilently, isLoading: isAuthLoading } = useAuth0();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getUserProfile = async () => {
            if (isAuthenticated) {
                try {
                    const token = await getAccessTokenSilently();
                    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

                    const response = await fetch(`${apiBaseUrl}/api/profile`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setProfile(data);
                    } else {
                        setProfile(null);
                    }
                } catch (error) {
                    console.error("Erro ao buscar perfil do utilizador:", error);
                    setProfile(null);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setIsLoading(false);
            }
        };

        // Só busca o perfil quando a autenticação do Auth0 terminar de carregar
        if (!isAuthLoading) {
            getUserProfile();
        }
    }, [isAuthenticated, isAuthLoading, getAccessTokenSilently]);

    return (
        <ProfileContext.Provider value={{ profile, isLoading }}>
            {children}
        </ProfileContext.Provider>
    );
};
