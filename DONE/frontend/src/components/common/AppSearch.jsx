import * as React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

export default function AppSearch(props) {
    return (
        <Box
            sx={{
                width: 500,
                maxWidth: '100%',
            }}
        >
            <TextField
                fullWidth
                label="look-up"
                id="fullWidth"
                onChange={(e) => props.handleSearch(e)} />
        </Box>
    )
}