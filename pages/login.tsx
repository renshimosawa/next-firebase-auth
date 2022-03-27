import type { FormEvent } from 'react'
import { NextPage } from 'next'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { login } from '../utils'

const LoginPage: NextPage = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    await login(email, password)
    router.push('./dashboard')
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <div className="card-body" onSubmit={onSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="text"
              placeholder="email"
              className="input input-bordered"
              id="email"
              value={email}
              onInput={(e) => setEmail(e.currentTarget.value)}
            ></input>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              placeholder="password"
              className="input input-bordered"
              id="password"
              type="password"
              value={password}
              onInput={(e) => setPassword(e.currentTarget.value)}
            ></input>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary" type="submit">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
