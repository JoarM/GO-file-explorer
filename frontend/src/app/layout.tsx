import { Button } from "@/components/ui/button"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Separator } from "@/components/ui/separator"
import { $drives } from "@/lib/state"
import { useStore } from "@nanostores/react"
import { ArrowLeft, ArrowRight, ChevronRight, Computer, Disc3, Download, HardDrive, House, Images, Monitor, PlaySquare, RotateCw } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Link, Outlet, useNavigate } from "react-router-dom"

export default function Layout() {
    const drives = useStore($drives)
    const [pcExpanded, setPcExpanded] = useState(false)
    const navigate = useNavigate()

    return (
        <>
            <nav className="p-1.5 border-b flex gap-1">
                <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                    <ArrowLeft
                    size={16}
                    className="size-4"
                    />
                    <span className="sr-only">Navigate back</span>
                </Button>
                <Button variant="ghost" size="icon" onClick={() => navigate(+1)}>
                    <ArrowRight
                    size={16}
                    className="size-4"
                    />
                    <span className="sr-only">Navigate forward</span>
                </Button>
                <Button variant="ghost" size="icon" onClick={() => navigate(0)}>
                    <RotateCw
                    size={16}
                    className="size-4"
                    />
                    <span className="sr-only">Refresh page</span>
                </Button>
            </nav>
            <div className="h-[calc(100vh-53px)]">
                <ResizablePanelGroup
                direction="horizontal"
                >
                    <ResizablePanel defaultSize={20} className=" overflow-y-scroll">
                        <nav className="p-1">
                            <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                                <Link to="/">
                                    <House 
                                    size={16} 
                                    className="size-4 mr-2 flex-shrink-0" 
                                    />
                                    Start
                                </Link>
                            </Button>
                            <Button variant="ghost" size="sm" className="w-full justify-start">
                                <Images 
                                size={16} 
                                className="size-4 mr-2 flex-shrink-0" 
                                />
                                Gallery
                            </Button>
                            <Separator orientation="horizontal" className="my-3" />
                            <Button variant="ghost" size="sm" className="w-full justify-start">
                                <Monitor
                                size={16} 
                                className="size-4 mr-2 flex-shrink-0" 
                                />
                                Desktop
                            </Button>
                            <Button variant="ghost" size="sm" className="w-full justify-start">
                                <Download
                                size={16} 
                                className="size-4 mr-2 flex-shrink-0" 
                                />
                                Downloads
                            </Button>
                            <Button variant="ghost" size="sm" className="w-full justify-start">
                                <Images 
                                size={16} 
                                className="size-4 mr-2 flex-shrink-0" 
                                />
                                Pictures
                            </Button>
                            <Button variant="ghost" size="sm" className="w-full justify-start">
                                <Disc3 
                                size={16} 
                                className="size-4 mr-2 flex-shrink-0" 
                                />
                                Music
                            </Button>
                            <Button variant="ghost" size="sm" className="w-full justify-start">
                                <PlaySquare 
                                size={16} 
                                className="size-4 mr-2 flex-shrink-0" 
                                />
                                Movies
                            </Button>
                            <Separator orientation="horizontal" className="my-3" />
                            <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                                <span>
                                    <button onClick={() => setPcExpanded(!pcExpanded)}>
                                        <ChevronRight 
                                        size={16}
                                        className={cn("size-4 mr-1 flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors", pcExpanded && "rotate-90")}
                                        />
                                        <span className="sr-only">Expand</span>
                                    </button>
                                    <Link to="This-PC" className="inline-flex">
                                        <Computer 
                                        size={16}
                                        className="size-4 mr-2 flex-shrink-0"
                                        />
                                        This computer
                                    </Link>
                                </span>
                            </Button>
                            {pcExpanded && (
                                <>
                                    {drives.map(drive => {
                                        return (
                                            <Button variant="ghost" size="sm" className="w-full justify-start pl-8">
                                                <HardDrive
                                                size={16}
                                                className="size-4 mr-2 flex-shrink-0"
                                                />
                                                {drive.Name}
                                            </Button>
                                        )
                                    })}
                                </>
                            )}
                        </nav>
                    </ResizablePanel>
                    <ResizableHandle />
                    <ResizablePanel>
                        <Outlet />
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>
        </>
    )
}