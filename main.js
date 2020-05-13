const { app, BrowserWindow, dialog } = require('electron')
const { autoUpdater } = require("electron-updater")
const log = require('electron-log');

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';


function createWindow() {
    // Cria uma janela de navegação.
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })

    // e carregar o index.html do aplicativo.
    win.loadFile('index.html')
    autoUpdater.checkForUpdates();
}

app.whenReady().then(createWindow)

autoUpdater.on('update-available', info => {
    log.info('update-available');
    const dialogOpts = {
        type: 'info',
        buttons: ['Atualizar', 'Agora Não'],
        title: 'Atualização do Aplicativo',
        message: 'Atualização Disponível',
        detail: 'Uma nova versão do aplicativo birdID Desktop está disponível. É preciso reiniciar o aplicativo para aplicar as atualizações.'
    }

    dialog.showMessageBox(dialogOpts, (response) => {
        if (response === 0) autoUpdater.quitAndInstall()
    })

});