

const Signup = ({ toggleForm }: { toggleForm: () => void }) => {
  return (
    <div>
      <div>Signup</div>
      <button onClick={toggleForm}>Login</button>
    </div>
  )
}

export default Signup