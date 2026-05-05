import { Box } from "@mui/material"
import notFoundImage from "../assets/404.jpg"
import { NavLink } from "react-router"

const NotFound = () => {
    return (

        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
            }}
        >
            <Box
                component="img"
                src={notFoundImage}
                alt="404"
                sx={{
                    width: '100%',
                    maxWidth: 400,
                    height: 'auto',
                    borderRadius: 2,
                }}
            />

            <NavLink to="/dashboard" style={{ marginTop: '20px', textDecoration: 'none', color: 'inherit' }}>Go Home</NavLink>
        </Box>

    )
}

export default NotFound