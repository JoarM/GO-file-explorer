import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { formatBytes } from "@/lib/utils"
import { Search } from "lucide-react"
import { useLoaderData } from "react-router"

export default function FilePath() {
    const entries = useLoaderData() as any[]

    return (
        <ScrollArea className="h-full px-4">
            <div className="flex *:border-r h-8 items-center sticky top-0 bg-background">
                <div className="flex items-center w-96 px-2 h-full">
                    <span className="text-muted-foreground text-sm">Name</span>
                    <div className="ml-auto relative">
                        <input 
                        type="text"
                        className="bg-muted/50 h-6 w-56 rounded-sm text-foreground pl-2 pr-6 text-sm"
                        />
                        <Search 
                        size={16}
                        className="size-4 absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
                        />
                    </div>
                </div>
                <div className="flex items-center w-56 px-2 h-full">
                    <span className="text-muted-foreground text-sm">Last edited</span>
                </div>
                <div className="flex items-center w-32 px-2 h-full">
                    <span className="text-muted-foreground text-sm">Size</span>
                </div>
            </div>
            <ul>
                {entries.map(({ Name, ModTime, Size, IsDir }) => {
                    return (
                        <li className="flex h-8 items-center">
                            <div className="flex items-center w-96 px-2 h-full">
                                <p className="text-sm">{Name}</p>
                            </div>
                            <div className="flex items-center w-56 px-2 h-full">
                                <p className="text-sm">{new Date(ModTime).toLocaleString("en-GB")}</p>
                            </div>
                            <div className="flex items-center w-32 px-2 h-full">
                                {!IsDir && <p className="text-sm text-right ml-auto">{formatBytes(Size)}</p>}
                            </div>
                        </li>
                    )
                })}
            </ul>
        </ScrollArea>
    )
}