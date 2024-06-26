import { Button } from "@/components/ui/button"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Separator } from "@/components/ui/separator"
import { $drives } from "@/lib/state"
import { useStore } from "@nanostores/react"
import { ArrowLeft, ArrowRight, ChevronRight, Computer, Disc3, Download, FileText, HardDrive, House, Images, Monitor, PlaySquare, RotateCw, Search } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Form, Link, Outlet, useLoaderData, useLocation, useNavigate } from "react-router-dom"
import { Input } from "@/components/ui/input"

export default function Layout() {
    const drives = useStore($drives)
    const [pcExpanded, setPcExpanded] = useState(false)
    const navigate = useNavigate()
    const { Desktop, Downloads, Documents, Pictures, Music, Movies } = useLoaderData() as any
    const location = useLocation()

    return (
        <>
            <nav className="p-1.5 border-b flex">
                <Button className="flex-shrink-0 mr-1" variant="ghost" size="icon" onClick={() => navigate(-1)}>
                    <ArrowLeft
                    size={16}
                    className="size-4"
                    />
                    <span className="sr-only">Navigate back</span>
                </Button>
                <Button className="flex-shrink-0 mr-1" variant="ghost" size="icon" onClick={() => navigate(+1)}>
                    <ArrowRight
                    size={16}
                    className="size-4"
                    />
                    <span className="sr-only">Navigate forward</span>
                </Button>
                <Button className="flex-shrink-0 mr-1.5" variant="ghost" size="icon" onClick={() => navigate(0)}>
                    <RotateCw
                    size={16}
                    className="size-4"
                    />
                    <span className="sr-only">Refresh page</span>
                </Button>
                <span className="bg-muted/50 w-full h-9 border rounded-lg mr-1.5">
                    {location.pathname}
                </span>
                <Form method="GET" action="">
                    <span className="relative h-fit">
                        <Input 
                        className="w-60 pr-7 bg-muted/50"
                        />
                        <Search 
                        size={16}
                        className="size-4 absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
                        />
                    </span>
                </Form>
            </nav>
            <div className="h-[calc(100vh-53px)]">
                <ResizablePanelGroup
                direction="horizontal"
                autoSaveId="persistance"
                >
                    <ResizablePanel defaultSize={20} className=" overflow-y-scroll">
                        <nav className="p-1">
                            <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                                <Link to={`/${Desktop}`}>
                                    <Monitor
                                    size={16} 
                                    className="size-4 mr-2 flex-shrink-0" 
                                    />
                                    Desktop
                                </Link>
                            </Button>
                            <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                                <Link to={`/${Downloads}`}>
                                    <Download
                                    size={16} 
                                    className="size-4 mr-2 flex-shrink-0" 
                                    />
                                    Downloads
                                </Link>
                            </Button>
                            <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                                <Link to={`/${Documents}`}>
                                    <FileText
                                    size={16} 
                                    className="size-4 mr-2 flex-shrink-0" 
                                    />
                                    Documents
                                </Link>
                            </Button>
                            <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                                <Link to={`/${Pictures}`}>
                                    <Images 
                                    size={16} 
                                    className="size-4 mr-2 flex-shrink-0" 
                                    />
                                    Pictures
                                </Link> 
                            </Button>
                            <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                                <Link to={`/${Music}`}>
                                    <Disc3 
                                    size={16} 
                                    className="size-4 mr-2 flex-shrink-0" 
                                    />
                                    Music
                                </Link>
                            </Button>
                            <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                                <Link to={`/${Movies}`}>
                                    <PlaySquare 
                                    size={16} 
                                    className="size-4 mr-2 flex-shrink-0" 
                                    />
                                    Videos
                                </Link>
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
                                    <Link to="/" className="inline-flex">
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
                                            <Button variant="ghost" size="sm" className="w-full justify-start pl-8" asChild>
                                                <Link to={`/${drive.Name}\\`}>
                                                    <HardDrive
                                                    size={16}
                                                    className="size-4 mr-2 flex-shrink-0"
                                                    />
                                                    {drive.Name}
                                                </Link>
                                            </Button>
                                        )
                                    })}
                                </>
                            )}
                        </nav>
                    </ResizablePanel>
                    <ResizableHandle />
                    <ResizablePanel style={{
                        overflow: "auto"
                    }}>
                        <Outlet />
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>
        </>
    )
}