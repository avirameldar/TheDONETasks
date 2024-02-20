import { DELETE, GET, PATCH, POST, PUT } from './api-req'

const API = 'task'

export const getAllAvailableSystemTasks = async () => {
    try {
        const response = await GET(API)

        return response
    } catch (error) {
        console.log(error)
        throw new Error('Unable to fetch system tasks')
    }
}


export const getUserTasks = async (id) => {
    try {
        const response = await GET(`${API}/tasks/${id}`)

        return response
    } catch (error) {
        throw new Error(`Unable to fetch user tasks with given id ${id}`)
    }
}

export const pullTaskFromDashboard = async (task_id, user_id) => {
    try {
        const response = await PATCH(`${API}/pull/${task_id}/${user_id}`)

        return response
    } catch (error) {
        throw new Error(`Unable to fetch user tasks with given id ${task_id}`)
    }
}

export const deleteTask = async (id) => {
    try {
        const response = await DELETE(`${API}/${id}`)

        return response
    } catch (error) {
        throw new Error(`Failed to delete task with given id ${id}`)
    }
}


export const getTaskById = async (task_id) => {
    try {
        const response = await GET(`${API}/findById/${task_id}`)

        return response
    } catch (error) {
        throw new Error(`Failed to get task by given id ${task_id}`)
    }
}




export const completeTask = async (_id, user_id) => {
    try {
        const response = await PATCH(`${API}/complete/${_id}/${user_id}`)

        return response
    } catch (error) {
        throw new Error(`Failed to insert new task`)
    }
}

export const restoreTask = async (_id) => {
    try {
        const response = await PATCH(`${API}/restore/${_id}`)

        return response
    } catch (error) {
        throw new Error(`Failed to restore task`)
    }
}

export const createUserTask = async (task) => {
    try {
        const response = await POST(API, task)

        return response
    } catch (error) {
        throw new Error(`Failed to insert new task`)
    }
}



export const createSysTask = async (task) => {
    try {
        const response = await POST(`${API}/sys`, task)

        return response
    } catch (error) {
        throw new Error(`Failed to insert new task`)
    }
}



export const editTask = async (task_id, updatedTask) => {
    try {
        const response = await PUT(`${API}/${task_id}`, updatedTask)

        return response
    } catch (error) {
        throw new Error(`Unable to edit task with gien id ${task_id}`)
    }
}



export const changeLikeStatus = async (task_id) => {
    try {
        const response = await PATCH(`${API}/${task_id}`)

        return response
    } catch (error) {
        throw new Error(`Unable to update task with gien id ${task_id}`)
    }
}
