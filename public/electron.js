const electron = require('electron');
const app = electron.app;
const Menu = electron.Menu;
const ipcMain = electron.ipcMain;
const BrowserWindow = electron.BrowserWindow;
const isDev = require('electron-is-dev');

const path = require('path');

let mainWindow

const createWindow = () => {
    mainWindow = new BrowserWindow({ width: 800, height: 600, title: 'Todo App' })
    // mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.on('close', () => mainWindow = null);
    setMenu();
}

const setMenu = () => {
    const template = [{
        label: "Edit",
        submenu: [
          { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
          { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
          { type: "separator" },
          { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
          { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
          { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
          { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
        ]},
        {
        label: "Dev",
        submenu: [
          { label: "Reload", accelerator: "CmdOrCtrl+R", click:()=>{ mainWindow.reload() } },
          { type: "separator" },
          { label: "Open", accelerator: "CmdOrCtrl+I", click:()=>{ mainWindow.openDevTools(); } },
          { label: "Close", accelerator: "CmdOrCtrl+Shift+I", click:()=>{ mainWindow.closeDevTools(); }}
        ]
      }];
      Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if(mainWindow === null) {
        createWindow();
    }
})

ipcMain.on('asynchronous-message', (event, arg) => {
    console.log('main')
    console.log(arg)
    mainWindow.webContents.send('send', arg)
});