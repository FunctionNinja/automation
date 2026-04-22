

const Login = ({ toggleForm }: { toggleForm: () => void }) => {
  return (
    <div>
      <div>Login</div>
      <button onClick={toggleForm}>Sign up</button>
    </div>
  )
}

export default Login