package main

import (
	"context"
	"io/fs"
	"os"
	"path"
	"path/filepath"
	"time"

	"github.com/lithammer/fuzzysearch/fuzzy"
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

type QuickPaths struct {
	Desktop   string
	Downloads string
	Documents string
	Pictures  string
	Music     string
	Movies    string
}

type DirResponse struct {
	Status uint32
	Data   []DirEntry
	Error  error
}

type DirEntry struct {
	Name    string
	IsDir   bool
	ModTime time.Time
	Size    int64
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

func (a *App) GetStandardFilePaths() QuickPaths {
	desktopPath, err := windows.KnownFolderPath(windows.FOLDERID_Desktop, 0)
	if err != nil {
		panic("An error occured")
	}
	downloadsPath, err := windows.KnownFolderPath(windows.FOLDERID_Downloads, 0)
	if err != nil {
		panic("An error occured")
	}
	documentsPath, err := windows.KnownFolderPath(windows.FOLDERID_Documents, 0)
	if err != nil {
		panic("An error occured")
	}
	picturesPath, err := windows.KnownFolderPath(windows.FOLDERID_Pictures, 0)
	if err != nil {
		panic("An error occured")
	}
	musicPath, err := windows.KnownFolderPath(windows.FOLDERID_Music, 0)
	if err != nil {
		panic("An error occured")
	}
	moviesPath, err := windows.KnownFolderPath(windows.FOLDERID_Videos, 0)
	if err != nil {
		panic("An error occured")
	}

	return QuickPaths{
		Desktop:   desktopPath,
		Downloads: downloadsPath,
		Documents: documentsPath,
		Pictures:  picturesPath,
		Music:     musicPath,
		Movies:    moviesPath,
	}
}

func (a *App) ReadDirectory(dirPath string) DirResponse {
	entries, err := os.ReadDir(path.Clean(dirPath))
	if err != nil {
		if os.IsNotExist(err) {
			return DirResponse{
				Status: 404,
				Data:   []DirEntry{},
				Error:  err,
			}
		}
		return DirResponse{
			Status: 500,
			Data:   []DirEntry{},
			Error:  err,
		}
	}

	var processedEntries []DirEntry

	for i := range entries {
		info, err := entries[i].Info()
		if err != nil {
			continue
		}
		processedEntries = append(processedEntries, DirEntry{
			Name:    info.Name(),
			IsDir:   info.IsDir(),
			ModTime: info.ModTime(),
			Size:    info.Size(),
		})
	}

	return DirResponse{
		Status: 200,
		Data:   processedEntries,
		Error:  nil,
	}
}

func (a *App) SearchDirectory(dirPath string, searchString string) {
	filepath.WalkDir(dirPath, func(path string, d fs.DirEntry, err error) error {
		if fuzzy.Match(searchString, d.Name()) && path != dirPath {

		}
		return nil
	})
}
