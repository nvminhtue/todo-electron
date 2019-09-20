import React from 'react';
import { remote } from 'electron';

export default() => {
    let newWindow;
    const handleNewWindow = () => {
        !newWindow && (newWindow = new remote.BrowserWindow({ width: 400, height: 400, title: 'New Todo'}));
        newWindow.on('close', () => newWindow = null);
        newWindow.loadURL('http://localhost:3000/add')
        newWindow.show()
    }
    return (
        <div>
            <button onClick={handleNewWindow}>New Window</button>
        </div>
    );
}