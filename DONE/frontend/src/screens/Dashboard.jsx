import React from 'react'
import './style.css'
import { Box, Divider } from '@mui/material'
import { DarkModeContext } from "../providers/DarkModeProvider"
import { createSysTask, deleteTask, editTask, getAllAvailableSystemTasks } from '../api/task'
import SysTasksContainer from '../Tasks/components/taskList/SysTasksContainer'
import NavBar from '../layout/header/navBar/NavBar'
import AppProgress from '../components/common/AppProgress'
import AddIcon from '@mui/icons-material/Add'
import { getAllUsers } from '../api/user'
import AppModal from '../components/common/AppModal/AppModal'
import TaskForm from '../components/TaskForm'
import { getUser as getStoredUser } from '../api/user'
import AppSearch from '../components/common/AppSearch'

const Dashboard = () => {
  const [crrUser, setCrrUser] = React.useState(undefined)
  const [openSysForm, setOpenSysForm] = React.useState(false)
  const [sysTasks, setSysTasks] = React.useState([])
  const [sysUsers, setSysUsers] = React.useState([])
  const [taskToUpdate, setTaskToUpdate] = React.useState()
  const [searching, setSearching] = React.useState({ action: false, title: '' })
  const [filteredTasks, setFilteredTasks] = React.useState([])


  React.useEffect(() => {

    fetchSysTasks()

    fetchSysUsers()
  }, [])

  React.useEffect(() => {
    if (sysUsers.length && !crrUser) {

      const user = getStoredUser()

      console.log({ user })
      const foundedUser = sysUsers.find(u => u.email === user.email)

      setCrrUser(foundedUser)
    }

  }, [sysUsers])

  const handleEditTask = (_id) => {
    const foundedTask = sysTasks.find(t => t._id === _id)

    if (foundedTask) {
      setTaskToUpdate(foundedTask)

      openModal()
    }

  }
  const handleSearch = (e) => {
    setSearching({ action: true, title: '' })
    const filtered = sysTasks.filter(t => t.title.toLowerCase().startsWith(e.target.value.toLowerCase()))

    if (filtered?.length) {
      setFilteredTasks(filtered)
    }

    else {
      setSearching({ action: true, title: 'Nof found any task with the given template' })


      setFilteredTasks([])
    }

  }

  const openModal = () => {
    setOpenSysForm(true)
  }
  const closeModal = () => {
    setTaskToUpdate(undefined)
    setOpenSysForm(false)
  }

  const handleDeleteTask = async (_id) => {
    try {
      const res = await deleteTask(_id)
      if (res) {
        const updatedList = sysTasks.filter(t => t._id.toString() !== res.toString())

        setSysTasks(updatedList)
      }
    } catch (error) {

    }
  }

  const handleSaveTask = async (task) => {
    closeModal()
    task.user_id = crrUser._id

    try {
      let res
      if (taskToUpdate) {
        res = await editTask(task._id, task)

        setTaskToUpdate(undefined)

        const index = sysTasks.findIndex(item => item._id === task._id)


        if (index !== -1) {
          const newItems = [...sysTasks]
          newItems[index] = res
          setSysTasks(newItems)
        }
      }

      else {
        res = await createSysTask(task)
        if (res) {
          setSysTasks(prev => [res, ...prev])
        }
      }


    } catch (error) {
      throw Error('Unable to update list')
    }
  }

  const fetchSysUsers = async () => {
    const users = await getAllUsers()

    setSysUsers(users)
  }

  const fetchSysTasks = async () => {
    const tasks = await getAllAvailableSystemTasks()

    setSysTasks(tasks)

  }

  const { darkMode } = React.useContext(DarkModeContext);

  if (crrUser === null || !crrUser) return (<AppProgress />)

  return (
    <>
      <NavBar users={sysUsers} />

      <div className='search-bar'>
        <AppSearch handleSearch={handleSearch} />
        <p>{searching.title}</p>
      </div>
      <Box>
        <div
          className={` mainPage ${darkMode ? "dark-mode" : ""
            } navbar-expand-lg`}
        >
          {Boolean(crrUser) && crrUser.isSysAdmin && <div className='add-task'>
            <AddIcon onClick={openModal} />
          </div>}

          <Divider variant="middle" sx={{ borderBottomWidth: 2 }} />

          <div className="myContainer">
            {!!sysTasks?.length
              && !!filteredTasks.length
              ? <SysTasksContainer sysTasks={filteredTasks} user={crrUser} editTask={handleEditTask} handleDeleteTask={handleDeleteTask} />
              : <SysTasksContainer sysTasks={sysTasks} user={crrUser} editTask={handleEditTask} handleDeleteTask={handleDeleteTask} />

            }



          </div>

        </div>
      </Box>

      <AppModal
        children={<TaskForm task={taskToUpdate} user={crrUser} saveTask={handleSaveTask} />}
        close={closeModal}
        open={openSysForm} />
    </>

  )
}

export default Dashboard