import { app, session } from 'electron'
import { useMainDefaultIpc } from './services/ipc-main'
import InitWindow from './services/window-manager'

function onAppReady() {
  const { defaultIpc } = useMainDefaultIpc()

  new InitWindow().initWindow()
}

app.whenReady().then(onAppReady)
// 由于9.x版本问题,需要加入该配置关闭跨域问题
app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors')

app.on('window-all-closed', () => {
  // 所有平台均为所有窗口关闭就退出软件
  app.quit()
})

app.on('browser-window-created', () => {
  console.log('window-created')
})

if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.removeAsDefaultProtocolClient('electron-vue-template')
    console.log('由于框架特殊性开发环境下无法使用')
  }
} else {
  app.setAsDefaultProtocolClient('electron-vue-template')
}