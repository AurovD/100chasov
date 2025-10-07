import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { Popup } from "../components/UI/Popup"
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
} from '@tanstack/react-query'
import { useEffect } from "react"
import {useUserStore} from "../store/user";

const queryClient = new QueryClient()

function InnerApp({ Component, pageProps }: AppProps) {
    const meRequest = useUserStore((state) => state.me);
  const mutation = useMutation({
    mutationFn: () => {
      return meRequest();
    },
    onSuccess: (data) => {
      console.log("User loaded:", data);
    },
    onError: () => {
      console.log("Error fetching user");
    },
  });

  useEffect(() => {
    mutation.mutate()
  }, [])

  return (
      <>
        <Component {...pageProps} />
        <Popup />
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
