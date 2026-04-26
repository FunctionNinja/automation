

import { useEffect, useState } from "react"
import Login from "../components/Login"
import Signup from "../components/Signup"

import { Box } from "@mui/material"

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true)

    useEffect(() => {
        setIsLogin(true)
    }, [])

    return (
        <Box
            component="section"
            sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {isLogin ? <Login toggleForm={() => setIsLogin(!isLogin)} /> : <Signup toggleForm={() => setIsLogin(!isLogin)} />}
        </Box>
    )
}

export default Auth