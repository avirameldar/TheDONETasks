import React from "react"
import "./taskList.css"
import AppCard from "../../../components/common/AppCard/AppCard"
import AppModal from "../../../components/common/AppModal/AppModal"
import { Box } from '@mui/material'
import { pullTaskFromDashboard } from '../../../api/task'
import TaskDetails from "../../../components/TaskDetails"

const SysTasksContainer = (props) => {
  const [openModal, setOpenModal] = React.useState(false)
  const [openTask, setOpenTask] = React.useState(undefined)

  const { sysTasks } = props

  const closeModal = () => {
    setOpenModal(false)
  }

  const openTaskDetails = (_id) => {
    setOpenTask(true)

    const selectedTask = sysTasks.find(t => t._id === _id)

    setOpenTask(selectedTask)
  }

  const closeTaskDetails = () => {
    setOpenTask(false)
  }

  const handlePullTask = async (_id) => {
    try {
      const res = await pullTaskFromDashboard(_id, props.user._id)

      if (res) {
        setOpenModal(true)

        setTimeout(() => {
          setOpenModal(false)
        }, 1500)
      }
    } catch (error) {
      throw Error('Unable to update your list')
    }
  }

  const taskConfirmation = (
    <Box sx={style}>
      Task added successfuly to your to-do's list. good luck!
    </Box>
  )
  if (!sysTasks?.length) {


    return (
      <div
        className="no-taskBg
        shadow-sm rounded-3 text-center text-dark p-3"
      >
        <p className="no-tasks-text">
         There are no challenges yet 
        </p>
      </div>
    )
  }


  return (
    <React.Fragment>
      <div className='tasks-container'>
        <h1>System daily challenges</h1>

        <div>{sysTasks?.map(t => (
          <AppCard
            deleteItem={props.handleDeleteTask}
            isDashboard
            openTaskDetails={openTaskDetails}
            isSysAdmin={props.user.isSysAdmin}
            editTask={props.editTask}
            item={t}
            pullTask={() => handlePullTask(t._id)} />
        ))}
        </div>
      </div>

      <AppModal open={openModal} close={closeModal} children={taskConfirmation} />

      <AppModal open={Boolean(openTask)} close={closeTaskDetails} children={<TaskDetails item={openTask} />} />

    </React.Fragment>
  )
}

export default SysTasksContainer

const style = {
  position: 'absolute',
  minHeight: '250px',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}