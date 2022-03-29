import { login, logout } from '../framework/firebase/auth'

type BaseButtonProps = {
  text: string
  onclick(): void
  className?: string
}
const BaseButton: React.FC<BaseButtonProps> = (props, className) => (
  <button className="btn btn-active btn-primary" onClick={props.onclick}>
    {props.text}
  </button>
)

const LoginButton = () => <BaseButton onclick={() => login()} text="Googleでログイン" />

const LogoutButton = () => (
  <BaseButton className="btn btn-active" onclick={() => logout()} text="LOGOUT" />
)

export { BaseButton, LoginButton, LogoutButton }
