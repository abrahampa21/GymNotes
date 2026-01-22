const {contextBridge, ipcRenderer} = require("electron");

contextBridge.exposeInMainWorld("api", {
    saveExercises: (data) => ipcRenderer.invoke("save-exercises", data),
    loadExercises: () => ipcRenderer.invoke("load-exercises")
})