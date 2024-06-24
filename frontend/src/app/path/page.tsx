import { DriveCompenent } from "@/components/drive"
import { $drives } from "@/lib/state"
import { useStore } from "@nanostores/react"

export default function ThisPc() {
    const drives = useStore($drives)

    return (
        <main className="p-3 flex flex-wrap gap-1">
            {drives.map((drive) => <DriveCompenent {...drive} />)}
        </main>
    )
}