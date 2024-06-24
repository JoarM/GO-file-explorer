import { Drive } from "@/lib/state";
import { HardDrive } from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "./ui/progress";
import { formatBytes } from "@/lib/utils";

export function DriveCompenent({ 
    Name,
    FreeBytesAvialable,
    Bytes,
    FreeBytes
}: Drive) {
    return (
        <Link to={`/path/${Name}\\`} className="rounded-sm inline-flex p-2 hover:bg-muted transition-colors items-center w-64">
            <HardDrive 
            size={32}
            className="size-8 mr-2"
            />
            <div className="w-full">
                <h6 className="text-sm font-medium">{Name}</h6>
                <Progress value={100 - (FreeBytes / Bytes) * 100} className="border rounded-none" />
                <p className="text-xs">{formatBytes(FreeBytes)} available of {formatBytes(Bytes)}</p>
            </div>
        </Link>
    )
}