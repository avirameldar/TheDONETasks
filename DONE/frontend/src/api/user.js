import { DELETE, GET, PATCH, POST, PUT } from './api-req'

const TOKEN_KEY = "token"
const API = 'user'

export async function register(user) {
    try {
        const response = await POST(API, user)
        console.log({ token: response })

        localStorage.setItem(TOKEN_KEY, response)
        return response
    } catch (error) {
        throw Error('Failed to register')
    }
}



export const decoder = (token) => {
    const decodedToken = JSON.parse(atob(token.split(".")[1]))
    return {
        id: decodedToken._id,
        premiumUser: decodedToken.premiumUser,
        isSysAdmin: decodedToken.isSysAdmin,
        email: decodedToken.email
    }
}





export async function login(credentials) {
    try {
        const response = await POST(`${API}/login`, credentials)

        localStorage.setItem('token', response)

        return response
    } catch (error) {
        throw Error('Failed to login')
    }
}


export async function getAllUsers() {
    try {
        const response = await GET(API)

        return response
    } catch (error) {
        throw Error('Failed to fetch system users')
    }
}

export function subscribeUser() {
    const token = getJWT()
    return POST("/users/subscribe", null, {
        headers: {
            "x-auth-token": token,
        },
    })
}

export function logout() {
    localStorage.removeItem(TOKEN_KEY)
}

export function getJWT() {
    return localStorage.getItem(TOKEN_KEY)
}

export function getUser() {
    try {
        const token = getJWT()

        return decoder(token)
    } catch {
        return null
    }
}