

import { useEffect, useState } from "react"
import Login from "../components/Login"
import Signup from "../components/Signup"

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true)

    useEffect(() => {
        setIsLogin(true)
    }, [])

    return isLogin ? <Login toggleForm={() => setIsLogin(!isLogin)} /> : <Signup toggleForm={() => setIsLogin(!isLogin)} />
}

export default Auth