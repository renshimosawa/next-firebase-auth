import type { GetServerSideProps, NextPage } from 'next'
import nookies from 'nookies'
import { useRouter } from 'next/router'
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
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx)
  const session = cookies.session || ''
  const user = await firebaseAdmin
    .auth()
    .verifySessionCookie(session, true)
    .catch(() => null)
  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: {
      email: user.email,
    },
  }
}

export default DashboardPage
