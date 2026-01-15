const {app, BrowserWindow} = require("electron");
const path = require("path");

//To run electron-reload
if(!app.isPackaged){
    require("electron-reload")(__dirname);
}

//Function to create the window and its properties
function createWindow() {
    const window = new BrowserWindow({
        width: 800,
        height: 650,
        resizable: false,
        maximizable: false,
        fullscreenable: false,
        frame: false,
        transparent: false,
        webPreferences: {
             contextIsolation: true
        },
        icon: path.join(__dirname, "src/icon.png")
    });

    window.loadFile("index.html");
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
    if(process.platform !== "darwin") app.quit();
})