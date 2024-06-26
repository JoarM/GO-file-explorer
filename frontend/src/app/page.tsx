import { DriveCompenent } from "@/components/drive"
import { $drives } from "@/lib/state"
import { cn } from "@/lib/utils"
import { useStore } from "@nanostores/react"
import { ChevronRight, Disc3, Download, FileText, Image, Monitor, PlaySquareIcon } from "lucide-react"
import { useState } from "react"
import { Link, useLoaderData } from "react-router-dom"

export default function ThisPc() {
    const drives = useStore($drives)
    const { Desktop, Downloads, Documents, Pictures, Music, Movies } = useLoaderData() as any
    const [drivesShown, setDrivesShown] = useState(true)
    const [quickAccessShown, setQuickAccessShown] = useState(true)

    return (
        <main className="p-3">
            <section>
                <span className="flex items-center">
                    <button 
                    className={cn("size-5 inline-flex items-center justify-center hover:bg-secondary mr-2 transition-colors rounded", quickAccessShown && "rotate-90")}
                    onClick={() => setQuickAccessShown(!quickAccessShown)}
                    >
                        <ChevronRight 
                        size={20}
                        className="size-5"
                        />
                    </button>
                    <h2>Quick access</h2>
                </span>
                {quickAccessShown && (
                    <div className="mt-2 flex flex-wrap gap-1">
                        <Link to={`/${Desktop}`} className="rounded-sm inline-flex p-2 hover:bg-muted transition-colors items-center w-64">
                            <Monitor
                            size={32}
                            className="size-8 mr-2"
                            />
                            <div className="w-full">
                                <h6 className="text-sm font-medium">Desktop</h6>
                                <p className="text-xs text-muted-foreground">{Desktop}</p>
                            </div>
                        </Link>
                        <Link to={`/${Desktop}`} className="rounded-sm inline-flex p-2 hover:bg-muted transition-colors items-center w-64">
                            <Download
                            size={32}
                            className="size-8 mr-2"
                            />
                            <div className="w-full">
                                <h6 className="text-sm font-medium">Downloads</h6>
                                <p className="text-xs text-muted-foreground">{Downloads}</p>
                            </div>
                        </Link>
                        <Link to={`/${Desktop}`} className="rounded-sm inline-flex p-2 hover:bg-muted transition-colors items-center w-64">
                            <FileText
                            size={32}
                            className="size-8 mr-2"
                            />
                            <div className="w-full">
                                <h6 className="text-sm font-medium">Documents</h6>
                                <p className="text-xs text-muted-foreground">{Documents}</p>
                            </div>
                        </Link>
                        <Link to={`/${Pictures}`} className="rounded-sm inline-flex p-2 hover:bg-muted transition-colors items-center w-64">
                            <Image
                            size={32}
                            className="size-8 mr-2"
                            />
                            <div className="w-full">
                                <h6 className="text-sm font-medium">Pictures</h6>
                                <p className="text-xs text-muted-foreground">{Pictures}</p>
                            </div>
                        </Link>
                        <Link to={`/${Music}`} className="rounded-sm inline-flex p-2 hover:bg-muted transition-colors items-center w-64">
                            <Disc3
                            size={32}
                            className="size-8 mr-2"
                            />
                            <div className="w-full">
                                <h6 className="text-sm font-medium">Music</h6>
                                <p className="text-xs text-muted-foreground">{Music}</p>
                            </div>
                        </Link>
                        <Link to={`/${Movies}`} className="rounded-sm inline-flex p-2 hover:bg-muted transition-colors items-center w-64">
                            <PlaySquareIcon
                            size={32}
                            className="size-8 mr-2"
                            />
                            <div className="w-full">
                                <h6 className="text-sm font-medium">Videos</h6>
                                <p className="text-xs text-muted-foreground">{Movies}</p>
                            </div>
                        </Link>
                    </div>
                )}
            </section>

            <section className="mt-4">
                <span className="flex items-center">
                    <button 
                    className={cn("size-5 inline-flex items-center justify-center hover:bg-secondary mr-2 transition-colors rounded", drivesShown && "rotate-90")}
                    onClick={() => setDrivesShown(!drivesShown)}
                    >
                        <ChevronRight 
                        size={20}
                        className="size-5"
                        />
                    </button>
                    <h2>Drives</h2>
                </span>
                {drivesShown && (
                    <div className="mt-2 flex flex-wrap gap-1">
                        {drives.map((drive) => <DriveCompenent {...drive} />)}
                    </div>
                )}
            </section>
        </main>
    )
}