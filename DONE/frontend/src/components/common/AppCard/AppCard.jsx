import {
    Card,
    CardHeader,
    CardContent,
    Typography,
    CardActions,
    IconButton
} from '@mui/material'
import React from 'react'
import { Favorite as FavoriteIcon } from '@mui/icons-material'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore'
import { Tooltip } from '@mui/material'
import CompareArrowsIcon from '@mui/icons-material/CompareArrows'
import './style.css'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import DoneIcon from '@mui/icons-material/Done'
const AppCard = (props) => {
    const { item } = props

    return (
        <Card
            sx={{ maxWidth: 345, bgcolor: props.bground ? props.bground : 'white' }}
        >
            <CardHeader
                style={{ cursor: 'pointer' }}
                onClick={props.openTaskDetails ? () => props.openTaskDetails(item._id) : null}
                title={item.title}
                subheader={new Date(item.createdAt).toLocaleDateString()}
            />

            <CardContent sx={{ height: '79px' }}>
                <Typography className='short-description'>
                    {item.description}
                </Typography>
            </CardContent>

            <CardActions disableSpacing sx={{ width: '100%' }}>
                <IconButton aria-label="add to favorites">
                    {props.isDone &&
                        <Tooltip placement='top' title='restore task'>
                            <SettingsBackupRestoreIcon onClick={() => props.handleRestoreTask(item._id)} />
                        </Tooltip>
                    }
                </IconButton>

                {props.isDone && <IconButton aria-label="share">
                    <Tooltip placement='top' title='👏'><DoneAllIcon /></Tooltip>
                </IconButton>}

                {props.item.public && props.isDashboard && <IconButton aria-label="share">
                    <Tooltip placement='top' title='pull task'><CompareArrowsIcon onClick={props.pullTask} /></Tooltip>
                </IconButton>}

                {props.item.public && props.isDashboard && props.isSysAdmin &&
                    <React.Fragment>
                        <IconButton aria-label="pull">
                            <Tooltip placement='top' title='pull task'><EditIcon onClick={() => props.editTask(item._id)} /></Tooltip>
                        </IconButton>
                        <IconButton aria-label="delete">
                            <Tooltip placement='top' title='delete task'><DeleteIcon onClick={() => props.deleteItem(item._id)} /></Tooltip>
                        </IconButton>
                    </React.Fragment>
                }

                {!props.isDashboard && !props.isDone &&
                    <React.Fragment>
                        <IconButton aria-label="share">
                            <Tooltip placement='top' title='pull task'><EditIcon onClick={() => props.editTask(item._id)} /></Tooltip>
                        </IconButton>
                        <IconButton aria-label="share">
                            <Tooltip placement='top' title='delete task'><DeleteIcon onClick={() => props.deleteItem(item._id)} /></Tooltip>
                        </IconButton>
                        <IconButton aria-label="share">
                            <Tooltip placement='top' title='task completed'>< DoneIcon onClick={() => props.handleCompleteTask(item._id)} /></Tooltip>
                        </IconButton>
                    </React.Fragment>
                }
            </CardActions>

        </Card>
    )
}

export default AppCard