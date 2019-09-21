import React, {useState} from 'react';
import { remote, ipcRenderer } from 'electron';
import styled, {css} from 'styled-components';

const TodoContainer = styled.section`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const AddButton = styled.button`
    position: relative;
    margin-top: 100px;
    width: 500px;
    height: 50px;
    background: transparent;
    border: 1px purple solid;
    border-radius: 4px;
    color: purple;
`;

const TodoList = styled.ul`
    position: relative;
    width: 500px;
    height: auto;
    ${props => props.hasTodo && css`
        border: 1px purple solid;
        border-radius: 4px;
    `}
`;

const TodoElement = styled.li`
    color: purple;
    font-size: 14px;
`;

export default(props) => {
    const { todoList } = props;
    const [updatedList, setUpdatedList] = useState(todoList);
    // useEffect(() => {
    //     debugger
    // }, [todoList])
    ipcRenderer.on('send', (event, recievedList) => {
        console.log('renderer')
        console.log(recievedList) // prints "pong"
        setUpdatedList(recievedList);
    })

    let newWindow;
    const handleNewWindow = () => {
        !newWindow && (newWindow = new remote.BrowserWindow({ width: 400, height: 400, title: 'New Todo'}));
        newWindow.on('close', () => newWindow = null);
        newWindow.loadURL('http://localhost:3000/add')
        newWindow.show()
        newWindow.openDevTools();
    }

    return (
        <TodoContainer>
            <AddButton onClick={handleNewWindow}>Add New Todo</AddButton>
            <TodoList hasTodo={updatedList.length !== 0}>
                {
                    updatedList.map(todo => (
                        <TodoElement>{todo}</TodoElement>
                    ))
                }
            </TodoList>
        </TodoContainer>
    );
}