package main

import (
	"context"
	"os"

	"golang.org/x/sys/windows"
)

// App struct
type App struct {
	ctx context.Context
}

type DiskInfo struct {
	Name               string
	FreeBytesAvialable uint64
	Bytes              uint64
	FreeBytes          uint64
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) GetDrives() (drives []DiskInfo) {
	for _, drive := range "ABCDEFGHIJKLMNOPQRSTUVWXYZ" {
		file, err := os.Open(string(drive) + ":\\")
		if err == nil {
			diskInfo := DiskInfo{
				Name: string(drive) + ":",
			}
			err := windows.GetDiskFreeSpaceEx(windows.StringToUTF16Ptr(diskInfo.Name), &diskInfo.FreeBytesAvialable, &diskInfo.Bytes, &diskInfo.FreeBytes)
			if err != nil {
				continue
			}
			drives = append(drives, diskInfo)

			file.Close()
		}
	}
	return
}
