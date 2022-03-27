import type { GetServerSideProps, NextPage } from 'next'
import nookies from 'nookies'
import { Router, useRouter } from 'next/router'
import { logout } from '../utils'
import { firebaseAdmin } from '../firebaseAdmin'

export type Props = {
  email: string
}

const DashboardPage: NextPage<Props> = ({ email }) => {
  const router = useRouter()
  const onLogout = async () => {
    await logout()
    router.push('/login')
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 text-center">
        <div className="card-body">
          <h1 className="text-2xl font-bold">ダッシュボード</h1>
          <h2 className="m-5">email: {email}</h2>
          <button className="btn btn-primary" onClick={onLogout}>
            Logout
          </button>
          <button className="btn btn-link" onClick={() => router.push('/')}>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  )
}

DashboardPage.getInitialProps = async ({ req, res }) => {
  const isServerSide = typeof window === 'undefined'

  // バックエンドのみで動かす
  if (isServerSide && req && res) {
    const root = 'http://localhost:2050'
    const options = { headers: { cookie: req.headers.cookie || '' } }

    const result = await fetch(`${root}/api/me`, options)
    const json = (await result.json()) as { user?: { email: string } }

    // 認証情報が無ければログイン画面へリダイレクトさせる
    if (!json.user) {
      res.writeHead(302, { Location: '/login' })
      res.end()
    }

    return { email: (json.user || {}).email || '' }
  }

  // フロントエンドのみで動かす
  if (!isServerSide) {
    const result = await fetch('/api/me') // 認証情報を取得する
    const json = (await result.json()) as { user?: { email: string } }

    // 認証情報が無ければログイン画面へリダイレクトさせる
    if (!json.user) Router.push('/login')

    return { email: (json.user || {}).email || '' }
  }

  return { email: '' }
}

export default DashboardPage
