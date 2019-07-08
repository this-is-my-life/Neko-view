const electron = require('electron')
const app = electron.app
let mainWindow

app.on('ready', () => {
  if (!mainWindow) createMainWindow()
})

app.on('activate', () => {
  if (!mainWindow) createMainWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

function createMainWindow () {
  mainWindow = new electron.BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    },
    autoHideMenuBar: true
  }).on('close', () => {
    mainWindow = null
  })
  mainWindow.loadFile('./src/index.html')
}
