import { ScrollArea } from "@/components/ui/scroll-area"
import { formatBytes } from "@/lib/utils"
import { Search, X } from "lucide-react"
import { useState } from "react"
import { useLoaderData } from "react-router"
import { useDebounce } from "use-debounce"

export default function FilePath() {
    const entries = useLoaderData() as any[]
    const [search, setSearch] = useState("")
    const [searchValue] = useDebounce(search, 250)
    
    return (
        <ScrollArea className="h-full px-4 overflow-x-auto">
            <div className="flex *:border-r h-8 items-center sticky top-0 bg-background">
                <div className="flex items-center w-96 px-2 h-full">
                    <span className="text-muted-foreground text-sm">Name</span>
                    <div className="ml-auto relative">
                        <input 
                        type="text"
                        className="bg-muted/50 h-6 w-56 rounded-sm text-foreground pl-2 pr-6 text-sm"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        />
                        {search === "" ? (
                            <Search 
                            size={16}
                            className="size-4 absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
                            />
                        ): (
                            <button 
                            className="absolute inline-flex items-center justify-center size-5 rounded right-1 top-1/2 -translate-y-1/2 hover:bg-background transition-colors"
                            onClick={() => setSearch("")}
                            >
                                <X 
                                size={16}
                                className="size-4"
                                />
                            </button>
                        )}
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
                {entries.filter((val) => val.Name.toLowerCase().includes(searchValue.toLowerCase()))
                .map(({ Name, ModTime, Size, IsDir }) => {
                    return (
                        <li className="flex h-8 items-center hover:bg-secondary/50 transition-colors w-fit">
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