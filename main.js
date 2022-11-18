const { app, BrowserWindow, dialog } = require('electron');
const { autoUpdater } = require('electron-updater');
const log = require('electron-log');
const path = require('path');

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';

let win, icon;

if (process.platform === 'darwin') {
  app.dock.setIcon(path.join(__dirname, 'icon.png')); 
  
  setTimeout(() => {
    app.dock.bounce();
  }, 500);

} else {
  icon = path.join(__dirname, "build", "icon.png");
}

function createWindow() {

  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
    icon: icon
  });

  win.loadFile('index.html');

  autoUpdater.checkForUpdates();

  win.webContents.on("did-finish-load", () => {
    const { title, version } = require('./package.json');
    win.setTitle(`${title} ...:::... ${version} -- ELECTRON UPDATE`);
  });

  // Show menu Electron.
  win.setMenuBarVisibility(true);

}

app.whenReady().then(createWindow);

autoUpdater.on('update-available', (info) => {
  log.info('update-available');
  const dialogOpts = {
    type: 'info',
    buttons: ['Update', 'Not now'],
    title: 'Application Update',
    message: 'Update Available',
    detail:'A new version of the Desktop application is available. You need to restart the application to apply the updates.',
  };

  dialog.showMessageBox(dialogOpts, (response) => {
    if (response === 0) {
      autoUpdater.quitAndInstall();
    }    
  });

});
