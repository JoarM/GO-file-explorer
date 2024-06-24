import React from 'react'
import {createRoot} from 'react-dom/client'
import './style.css'
import App from './app/page'
import { RouterProvider, createHashRouter } from 'react-router-dom'
import Layout from './app/layout'
import ThisPc from './app/path/page'
import { ThemeProvider } from './components/theme-provider'
import { GetDrives, GetStandardFilePaths, ReadDirectory } from "../wailsjs/go/main/App"
import { $drives } from './lib/state'
import ErrorPage from './app/error'
import FilePath from './app/path/[filePath]/page'

const container = document.getElementById('root')

const root = createRoot(container!)

const router = createHashRouter([
    {
        path: "/",
        element: <Layout />,
        loader: async () => {
            const drives = await GetDrives()
            $drives.set(drives)
            return await GetStandardFilePaths()
        },
        errorElement: <ErrorPage />,
        children: [
            {
                errorElement: <ErrorPage />,
                children: [
                    {
                        index: true,
                        element: <App />
                    },
                    {
                        path: "/path",
                        element: <ThisPc />,
                        loader: async () => {
                            const drives = await GetDrives()
                            $drives.set(drives)
                            return null
                        }
                    },
                    {
                        path: "/path/*",
                        element: <FilePath />,
                        loader: async ({ params }) => {
                            const res = await ReadDirectory(params["*"] as string)
                            if (res.Status === 200) {
                                return res.Data
                            }

                            if (res.Status === 404) {
                                throw new Response("", {
                                    status: 404,
                                    statusText: `${params["*"]} dosen't exist`,
                                })
                            }
                        }
                    }
                ]
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
