import axios from 'axios'
import { getItem } from '../services/localStorageService'
import base_url from './base_url'

export async function POST(url, body) {
    const config = getRequestConfiguration()
    return await (
        await axios.post(`${base_url}${url}`, body, config)
    ).data
}

export async function PUT(url, body) {
    const config = getRequestConfiguration()
    return await (
        await axios.put(`${base_url}${url}`, body, config)
    ).data
}

export async function GET(url) {
    const config = getRequestConfiguration()
    return await (
        await axios.get(`${base_url}${url}`, config)
    ).data
}

export async function PATCH(url, body) {
    const config = getRequestConfiguration()
    return await (
        await axios.patch(`${base_url}${url}`, body, config)
    ).data
}

export async function DELETE(url) {
    const config = getRequestConfiguration()
    return await (
        await axios.delete(`${base_url}${url}`, config)
    ).data
}

const getRequestConfiguration = () => {
    const tokenAccess = localStorage.getItem('token')
    const token = tokenAccess ? tokenAccess : null
    const { token: cancelToken } = axios.CancelToken.source()
    const headers = token ? { Authorization: `Bearer ${tokenAccess}`, 'x-auth-token': token } : { Authorization: null, 'x-auth-token': null }

    return {
        headers,
        cancelToken
    }
}