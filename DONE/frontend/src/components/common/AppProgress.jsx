import { CircularProgress } from '@mui/material'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'

const AppProgress = (props) => {
    const progress = props.type === 'Line'
        ? (<LinearProgress />)
        : (<CircularProgress size='2rem' color="secondary" />)

    return (
        <Box sx={{ width: '100%' }}>
            {progress}
        </Box>
    )
}
export default AppProgress