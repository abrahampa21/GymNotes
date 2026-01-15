const {app, BrowserWindow} = require("electron");
const path = require("path")

function createWindow() {
    const window = new BrowserWindow({
        width: 300,
        height: 450,
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