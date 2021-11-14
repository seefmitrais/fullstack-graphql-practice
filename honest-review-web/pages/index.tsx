import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Layout } from '../components/pages/Layout'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <Layout>

    
      <Head>
        <title>Honest Review - Movie/Series</title>
        <meta name="description" content="Honest Review of Movies and Series made by anyone on the internet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={"bg-gray-600"}>
        
      </main>

      <footer >
        
      </footer>
    </Layout>
  )
}

export default Home
