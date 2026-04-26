import { Box } from "@mui/material"

const ShadowBox = ({ children, width, height, sx }: { children: React.ReactNode; width?: number; height?: number; sx?: any }) => {
    return (
        <Box
            sx={{
                boxShadow: 3,
                padding: 3,
                borderRadius: 5,
                width: width || "auto",
                height: height || "auto",
                ...sx
            }}
        >
            {children}
        </Box>
    )
}

export default ShadowBox