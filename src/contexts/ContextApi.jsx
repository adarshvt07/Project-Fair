import React, { useState } from 'react'
import { createContext } from 'react'
export const addResponseContext = createContext()
export const editResponseContext = createContext()

const ContextApi = ({ children }) => {
    const [addProjectResponse, setAddProjectResponse] = useState("")
    const [editProjectResponse, setEditProjectResponse] = useState("")
    return (
        <editResponseContext.Provider value={{ editProjectResponse, setEditProjectResponse }}>
            <addResponseContext.Provider value={{ addProjectResponse, setAddProjectResponse }}>
                {children}
            </addResponseContext.Provider>
        </editResponseContext.Provider>
    )
}

export default ContextApi
