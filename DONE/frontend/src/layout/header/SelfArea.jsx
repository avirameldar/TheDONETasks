import React from 'react'
import { Box, Button, Typography, IconButton, Divider } from '@mui/material'
import { completeTask, getUserTasks, restoreTask } from '../../api/task'
import AppCard from '../../components/common/AppCard/AppCard'
import './style.css'
import AppModal from '../../components/common/AppModal/AppModal'
import TaskForm from '../../components/TaskForm'
import { createUserTask, editTask, deleteTask } from '../../api/task'
import TaskDetails from '../../components/TaskDetails'
import { logout } from '../../api/user'
import { useNavigate } from 'react-router-dom'
import Paths from '../../utils/Paths'
import TableTasks from '../../components/TableDisplay'
import WidgetsIcon from '@mui/icons-material/Widgets'

const SelfArea = (props) => {
    const [userTasks, setUsersTasks] = React.useState([])
    const [openForm, setOpenForm] = React.useState(false)
    const [openTask, setOpenTask] = React.useState(undefined)
    const [taskToUpdate, setTaskToUpdate] = React.useState()
    const [displayStatus, setDisplayStatus] = React.useState(false)

    const navigate = useNavigate()

    React.useEffect(() => {
        fetchUserTasks()
    }, [])

    const signOut = () => {
        setTimeout(() => {
            logout()

            navigate(Paths.LOGIN)
        }, 1500)
    }
    const fetchUserTasks = async () => {
        const tasks = await getUserTasks(props.user._id)

        setUsersTasks(tasks)
    }

    const handleEdit = async (_id) => {

        const foundedTask = userTasks.find(t => t._id === _id)

        if (foundedTask) {
            setTaskToUpdate(foundedTask)

            openInsertionForm()
        }
    }

    const handleSaveTask = async (task) => {
        closeModal()

        task.user_id = props.user._id

        try {
            let res
            if (taskToUpdate) {
                res = await editTask(task._id, task)

                setTaskToUpdate(undefined)

                const index = userTasks.findIndex(item => item._id === task._id)


                if (index !== -1) {
                    const newItems = [...userTasks]
                    newItems[index] = res
                    setUsersTasks(newItems)
                }
            }
            else {

                res = await createUserTask(task)

                if (res) {
                    setUsersTasks(prev => [res, ...prev])
                }

            }

        } catch (error) {
            throw Error('Unable to update list')
        }
    }


    const handleDeleteTask = async (_id) => {
        try {
            const res = await deleteTask(_id)

            if (res) {
                const updatedList = userTasks.filter(t => t._id.toString() !== res.toString())

                setUsersTasks(updatedList)
            }
        } catch (error) {
            throw Error(`Unable to delete task with given id (${_id})`)
        }
    }

    const handleCompleteTask = async (_id) => {
        try {
            const res = await completeTask(_id, props.user._id)

            if (res) {

                const index = userTasks.findIndex(item => item._id === _id)

                if (index !== -1) {
                    const newItems = [...userTasks]
                    newItems[index] = res
                    setUsersTasks(newItems)
                }

            }
        } catch (error) {
            throw Error(`Unable to complete task with given id (${_id})`)
        }
    }

    const openTaskDetails = (_id) => {
        setOpenTask(true)

        const selectedTask = userTasks.find(t => t._id === _id)

        setOpenTask(selectedTask)
    }

    const closeTaskDetails = () => { setOpenTask(false) }

    const openInsertionForm = () => { setOpenForm(true) }

    const closeModal = () => {
        setTaskToUpdate(undefined)
        setOpenForm(false)
    }

    const toggleDisplay = () => {
        setDisplayStatus(prev => !prev)
    }

    const handleRestoreTask = async (_id) => {
        try {
            const res = await restoreTask(_id)

            if (res) {

                const index = userTasks.findIndex(item => item._id === _id)

                if (index !== -1) {
                    const newItems = [...userTasks]
                    newItems[index] = res
                    setUsersTasks(newItems)
                }

            }
        } catch (error) {
            throw Error('Unable to restore task')
        }
    }

    return (
        <React.Fragment>
            <Button onClick={signOut} variant='contained' color='error' width={'250px'}>Sign-out</Button>

            <IconButton onClick={toggleDisplay} >
                <WidgetsIcon />
            </IconButton>

            <Box role="presentation" className='self'>
                {!displayStatus ?
                    <React.Fragment>
                        <Typography className='tasks-header' component='div'>
                            <Typography>Active tasks</Typography>
                            <Button onClick={openInsertionForm}>Add Task</Button>
                        </Typography>


                        <div className='task-container'>
                            {!!userTasks.length ? userTasks.filter(t => !t.done).map(t => (
                                <AppCard
                                    item={t}
                                    isDone={false}
                                    openTaskDetails={openTaskDetails}
                                    editTask={handleEdit}
                                    deleteItem={handleDeleteTask}
                                    handleCompleteTask={handleCompleteTask} />
                            )) : <p>There's no such active tasks</p>}
                        </div>

                        <Typography sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '22px' }}>Inactive tasks</Typography>


                        <div className='task-container'>
                            {!!userTasks.length ? userTasks.filter(t => t.done).map(t => (
                                <AppCard item={t} bground='lightgrey' isDone editTask={handleEdit} handleRestoreTask={handleRestoreTask} />
                            )) : <p>There's no such completed tasks</p>}
                        </div>
                    </React.Fragment>

                    : <React.Fragment><Divider orientation='horizontal' /><TableTasks tableData={userTasks} /></React.Fragment>
                }
            </Box>

            <AppModal
                popupModal={true}
                open={openForm}
                close={closeModal}
                children={<TaskForm task={taskToUpdate} user={props.user} saveTask={handleSaveTask} isDashboard={false} />}
            />

            <AppModal open={Boolean(openTask)} close={closeTaskDetails} children={<TaskDetails item={openTask} />} />
        </React.Fragment>
    )
}

export default SelfArea