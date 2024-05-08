import { ipcMain, dialog, BrowserWindow, app } from 'electron'
import { getPreloadFile, winURL } from '../config/static-path'
import { updater } from './hot-updater'
import { WindowID } from '../config/consts'
import DownloadFile from './download-file'
import Update from './check-update'
import config from '@config/index'

export const useMainDefaultIpc = () => {
  const defaultIpc = () => {
    const allUpdater = new Update()

    const cacheWindow: Record<string, BrowserWindow> = {}
    const cacheData = {}
    
    ipcMain.handle('IsUseSysTitle', async () => {
      return config.IsUseSysTitle
    })

    ipcMain.handle('app-close', () => {
      app.quit()
    })

    ipcMain.handle('check-update', (event) => {
      allUpdater.checkUpdate(BrowserWindow.fromWebContents(event.sender))
    })

    ipcMain.handle('confirm-update', () => {
      allUpdater.quitAndInstall()
    })

    ipcMain.handle('open-messagebox', async (event, arg) => {
      const res = await dialog.showMessageBox(BrowserWindow.fromWebContents(event.sender), {
        type: arg.type || 'info',
        title: arg.title || '',
        buttons: arg.buttons || [],
        message: arg.message || '',
        noLink: arg.noLink || true
      })

      return res
    })

    ipcMain.handle('open-errorbox', (event, arg) => {
      dialog.showErrorBox(
        arg.title,
        arg.message
      )
    })

    ipcMain.handle('start-server', async () => {
      dialog.showErrorBox(
        'error',
        'API is obsolete'
      )
    })

    ipcMain.handle('stop-server', async (event, arg) => {
      dialog.showErrorBox(
        'error',
        'API is obsolete'
      )
    })

    ipcMain.handle('hot-update', (event, arg) => {
      updater(BrowserWindow.fromWebContents(event.sender))
    })

    ipcMain.handle('start-download', (event, msg) => {
      new DownloadFile(BrowserWindow.fromWebContents(event.sender), msg.downloadUrl).start()
    })

    ipcMain.handle('open-win', (event, arg: {
      url: string
      IsPay?: boolean
      PayUrl?: string
      sendData?: any
      width?: number
      height?: number
      minWidth?: number
      transparent?: boolean
      backgroundColor?: string
      alwaysOnTop?: boolean
      id: string
    }) => {
      if (cacheWindow[arg.id]) {
        setTimeout(() => {
          cacheWindow[arg.id].show()
        }, 500)
      } else {
        const ChildWin = new BrowserWindow({
          titleBarStyle: config.IsUseSysTitle ? 'default' : 'hidden',
          height: arg.height || 595,
          useContentSize: true,
          width: arg.width || 1140,
          autoHideMenuBar: true,
          minWidth: arg.minWidth,
          frame: config.IsUseSysTitle,
          show: false,
          alwaysOnTop: arg.alwaysOnTop,
          transparent: arg.transparent,
          webPreferences: {
            sandbox: false,
            webSecurity: false,
            // 如果是开发模式可以使用devTools
            devTools: process.env.NODE_ENV === 'development',
            // 在macos中启用橡皮动画
            scrollBounce: process.platform === 'darwin',
            preload: getPreloadFile('preload')
          }
        })
  
        // 开发模式下自动开启devTools
        if (process.env.NODE_ENV === 'development') {
          ChildWin.webContents.openDevTools({ mode: 'undocked', activate: true })
        }
  
        ChildWin.loadURL(winURL + `#${arg.url}`)
  
        ChildWin.once('ready-to-show', () => {
          ChildWin.show()
          if (arg.IsPay) {
            // 检查支付时候自动关闭小窗口
            const testUrl = setInterval(() => {
              const Url = ChildWin.webContents.getURL()
              if (Url.includes(arg.PayUrl)) {
                ChildWin.close()
              }
            }, 1200)
            ChildWin.on('close', () => {
              clearInterval(testUrl)
            })
          }
        })
  
        // 渲染进程显示时触发
        ChildWin.once("show", () => {
          console.log('show')
        })
  
        ChildWin.webContents.on('dom-ready', () => {
          console.log('dom-ready')
          ipcMain.once('window-init', (event, data) => {
            switch (data.id) {
              case 'lyrics-window':
                ChildWin.webContents.send('init-word', arg.sendData)
            }
          })
          // event.sender.send('send-data', arg.sendData)
        })
  
        cacheWindow[arg.id] = ChildWin
      }
    })

    ipcMain.handle('close-win', (event, arg) => {
      const { id } = arg

      const ChildWin = cacheWindow[id]

      ChildWin.hide()
    })

    ipcMain.on('music-change-status', (event, arg) => {
      cacheWindow[WindowID.lyricsWindow].webContents.send('music-change-status', arg)
    })
  }

  return {
    defaultIpc
  }
}