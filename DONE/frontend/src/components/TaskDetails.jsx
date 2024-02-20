import { Box, Typography } from "@mui/material"

const TaskDetails = (props) => {

    const { item } = props

    return (
        <Box sx={style}>
            <Typography><strong>Title:</strong> {item.title}</Typography>
            <Typography><strong>full description:</strong> {item.description}</Typography>

            <Typography><strong>date:</strong> {new Date(item.createdAt).toLocaleDateString()}</Typography>
        </Box>
    )
}

export default TaskDetails

const style = {
    position: 'absolute',
    height: 'fit-content',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}
