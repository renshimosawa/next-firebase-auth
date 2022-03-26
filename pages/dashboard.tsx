import type { GetServerSideProps, NextPage } from 'next'
import nookies from 'nookies'
import { useRouter } from 'next/router'
import { logout } from '../utils'
import { firebaseAdmin } from '../firebaseAdmin'

export type Props = {
  email: string
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
const DashboardPage: NextPage<Props> = ({ email }) => {
  const router = useRouter()
  const onLogout = async () => {
    await logout()
    router.push('/login')
  }

  return (
    <div>
      <h1>ダッシュボード</h1>
      <h2>email: {email}</h2>
      <button onClick={onLogout}>Logout</button>
    </div>
  )
}

export default DashboardPage
