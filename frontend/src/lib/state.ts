import { atom } from "nanostores";

export type Drive = {
    Name: string;
    FreeBytesAvialable: number;
    Bytes: number;
    FreeBytes: number;
}

export const $drives = atom<Drive[]>([])