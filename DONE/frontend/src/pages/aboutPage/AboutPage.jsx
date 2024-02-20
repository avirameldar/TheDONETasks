import { Container, Grid } from "@mui/material"
import React, { useContext } from "react"
import Header from "../../layout/header/Header"
import "./aboutPage.css"
import { DarkModeContext } from "../../providers/DarkModeProvider"
import { useNavigate } from "react-router-dom"
import Paths from '../../utils/Paths'
import { IconButton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const AboutPage = () => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext)

  const navigate = useNavigate();

  const returnBack = () => {
    navigate(Paths.HOME)
  }
  return (
    <React.Fragment>
      <IconButton aria-label="pull" className='return-arrow'>
        <ArrowBackIcon onClick={returnBack} />
      </IconButton>
      <div className="task-management-app">
        <h1 className="title">Task Dispatch and Management Application</h1>
        <p className="description">
          Our task dispatch and management application revolutionizes the way teams collaborate and handle assignments. Designed with simplicity and efficiency in mind, this platform empowers managers to seamlessly dispatch tasks while providing users with the flexibility to pull challenges into their workspace.
        </p>
        <div className="key-features">
          <h2>Key Features:</h2>
          <ul>
            <li>Task Dispatching: As a manager, you have the authority to create and assign tasks effortlessly. With just a few clicks, you can define the task, set deadlines, allocate resources, and assign them to specific team members.</li>
            <li>User-Friendly Interface: The interface is intuitively designed for easy navigation. Managers can quickly access the dashboard to oversee task progress, while users can conveniently pull tasks into their workspace with a single click.</li>
            <li>Task Management: Users have full control over their tasks. They can edit, update, or delete tasks as needed, ensuring accuracy and relevance throughout the project lifecycle. Additionally, users can categorize tasks, set priorities, and attach relevant files for better organization.</li>
            <li>Real-Time Collaboration: Foster collaboration among team members with real-time updates and notifications. Stay informed about task modifications, comments, and progress, enabling seamless communication and coordination within the team.</li>
            <li>Customization Options: Tailor the application to suit your team's unique workflow and preferences. Customize task templates, define user roles and permissions, and configure notification settings to streamline operations and maximize productivity.</li>
            <li>Accessibility: Our application is accessible across various devices and platforms, allowing users to manage tasks anytime, anywhere. Whether in the office, on the go, or working remotely, teams can stay connected and productive.</li>
            <li>Security Measures: Protect sensitive data and ensure confidentiality with robust security measures. Our application employs encryption protocols, access controls, and regular audits to safeguard your information and maintain compliance with industry standards.</li>
          </ul>
        </div>
        <p className="overall">
          Overall, our task dispatch and management application revolutionizes how teams collaborate and manage assignments. From task creation to completion, it provides a seamless and efficient workflow, empowering teams to achieve their goals effectively. Experience the difference today and elevate your team's productivity to new heights.
        </p>
      </div>

    </React.Fragment>
  )
}

export default AboutPage
