import React from 'react'
import moment from 'moment'
import { range } from '../utils/range'
import { logout } from '../api/user'
import Paths from '../utils/Paths'

const SessionTimeout = () => {
    const [events, setEvents] = React.useState(['click', 'mousemove', 'keydown'])
    const [second, setSecond] = React.useState(0)
    const [isOpen, setIsOpen] = React.useState(false)

    const text = (<div>"In order to protect your privacy our system will logged you out automatically in seconds"</div>)


    let timeStamp
    let warningInactiveInterval = React.useRef()
    let startTimerInterval = React.useRef()

    let timeChecker = () => {
        startTimerInterval.current = setTimeout(() => {
            const storedTimeStamp = sessionStorage.getItem('lastTimeStamp')

            warningInactive(storedTimeStamp)
        }, 10000)
    }

    let warningInactive = (timeString) => {
        clearTimeout(startTimerInterval.current)
        warningInactiveInterval.current = setInterval(() => {

            const popTime = 10
            const logoutTime = 30
            const diff = moment.duration(moment().diff(moment(timeString)))
            const minPast = diff.minutes()
            const leftSecond = 14_400 /*4 hours minutes in seconds */ - diff.seconds()

            if (range(0, popTime).indexOf(leftSecond) !== -1) {
                setSecond(leftSecond)

                setIsOpen(true)
            }

            if (minPast == logoutTime) {
                clearInterval(warningInactiveInterval.current)

                hanldingSignOut()
            }

        }, 1000)
    }

    const hanldingSignOut = () => {
        logout()

    }

    let resetTimer = React.useCallback(() => {
        clearTimeout(startTimerInterval.current)
        clearInterval(warningInactiveInterval.current)

        timeStamp = moment()
        sessionStorage.setItem('lastTimeStamp', timeStamp)
        timeChecker()
        setIsOpen(false)
    }, [])

    React.useEffect(() => {
        events.forEach((event) => {
            window.addEventListener(event, resetTimer)
        })

        timeChecker()

        return () => {
            clearTimeout(startTimerInterval.current)
        }
    }, [resetTimer, events, timeChecker])

    if (!isOpen) {
        return null
    }

    return (
        <></>
    )
}

export default SessionTimeout