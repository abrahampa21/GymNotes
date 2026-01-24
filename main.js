const {app, BrowserWindow, ipcMain, Menu} = require("electron");
const path = require("path");
const Store = require("electron-store");

//Initialize electron store
const store = new Store();

//To run electron-reload
if(!app.isPackaged){
    require("electron-reload")(__dirname);
}

//Function to create the window and its properties
function createWindow() {
    const window = new BrowserWindow({
        width: 850,
        height: 650,
        resizable: false,
        maximizable: false,
        fullscreenable: false,
        transparent: false,
        webPreferences: {
             contextIsolation: true,
             preload: path.join(__dirname, "preload.js")
        },
        icon: path.join(__dirname, "src/icon.png")
    });

    Menu.setApplicationMenu(null);
    window.loadFile("index.html");
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
    if(process.platform !== "darwin") app.quit();
})

//Store and charging data

ipcMain.handle("save-exercises", (event, exercises) => {
    store.set("exercises",exercises);
})

ipcMain.handle("load-exercises", () => {
    return store.get("exercises", [])
})