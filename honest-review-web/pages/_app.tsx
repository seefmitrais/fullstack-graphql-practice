import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import { Provider, createClient } from 'urql'
import type { AppProps } from 'next/app'
import { create } from 'domain'

const client = createClient({ url:"http://localhost:4000/graphql" });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <Component {...pageProps} />
    </Provider>
  )
}
 
export default MyApp
