import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
// import { Provider, createClient } from 'urql'
import {ApolloProvider} from '@apollo/client';
import type { AppProps } from 'next/app'
import { create } from 'domain'
import client from '../utils/withApollo';
// const client = createClient({ url:"http://localhost:4000/graphql" });
import {RecoilRoot, useRecoilValue} from 'recoil';
import React from 'react';
import { useLocalStorage } from '../utils/hooks';
import { AppContextProvider } from '../components/AppContext';
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppContextProvider>
      <ApolloProvider client={client} >
        <Component {...pageProps} />
      </ApolloProvider>
    </AppContextProvider>
  )
}
 
export default MyApp
