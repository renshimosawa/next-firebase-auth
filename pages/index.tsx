import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h2 className="text-6xl mb-20">Welcome!</h2>
        <button className="btn mb-10" onClick={() => router.push('/login')}>
          Login
        </button>
        <button className="btn btn-outline" onClick={() => router.push('/dashboard')}>
          Dashboard
        </button>
      </main>
    </div>
  )
}
