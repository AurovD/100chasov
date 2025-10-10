import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { Popup } from "../components/UI/Popup"
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { useUserStore } from "../store/user";
import { UserResponse } from '../types/user';
import {useEffect} from "react";

const queryClient = new QueryClient()


export const AuthProvider: React.FC = ( ) => {
    const meRequest = useUserStore((state) => state.me);


    const { data: user, error, isLoading, isFetching } = useQuery<UserResponse, unknown>({
        queryKey: ['me'],
        queryFn: meRequest,
        staleTime: 1000 * 60 * 5, // 5 минут
        refetchOnWindowFocus: true, // обновляет, если пользователь вернулся в окно
        refetchOnReconnect: true,
    })

    useEffect(() => {
        if (user) {
            console.log("User loaded:", user)
        }
        if (error) {
            // console.log("Error fetching user", error)
        }
    }, [user, error])

    return <></>;
};

function InnerApp({ Component, pageProps }: AppProps) {

    return (
        <>
            <Component {...pageProps} />
            <Popup />
            <AuthProvider/>
        </>
    )
}

function MyApp(props: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <InnerApp {...props} />
        </QueryClientProvider>
    )
}

export default MyApp
