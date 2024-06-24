import React from 'react'
import {createRoot} from 'react-dom/client'
import './style.css'
import App from './app/page'
import { RouterProvider, createHashRouter } from 'react-router-dom'
import Layout from './app/layout'
import ThisPc from './app/This-PC/page'
import { ThemeProvider } from './components/theme-provider'
import { GetDrives } from "../wailsjs/go/main/App"
import { $drives } from './lib/state'

const container = document.getElementById('root')

const root = createRoot(container!)

const router = createHashRouter([
    {
        path: "/",
        element: <Layout />,
        loader: async () => {
            const drives = await GetDrives()
            $drives.set(drives)
            return null
        },
        children: [
            {
                path: "",
                element: <App />
            },
            {
                path: "/This-PC",
                element: <ThisPc />,
                loader: async () => {
                    const drives = await GetDrives()
                    $drives.set(drives)
                    return null
                }
            }
        ]
    },
])

root.render(
    <React.StrictMode>
        <ThemeProvider defaultTheme="system" storageKey='vite-ui-theme'>
            <RouterProvider router={router} />
        </ThemeProvider>
    </React.StrictMode>
)
