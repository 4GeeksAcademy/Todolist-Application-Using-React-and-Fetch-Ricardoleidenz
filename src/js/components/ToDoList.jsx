import React, {useState, useEffect} from "react";

//create your first component
const ToDoList = () => {
    const [task, setTask] = useState("");

    const [tasks, setTasks] = useState([]);

    const addTask = (newtask) =>{
        if(newtask != ""){
            setTasks([...tasks, {value:newtask, delete:false}]);
            //Restart task when submitted
            setTask("");
        }
    }
    //Shows the X on list element
    const showDelete = (taskToDelete) => {
        tasks[taskToDelete].delete = true;
    }
    //Hides the X on list element
    const hideDelete = (taskToDelete) => {
        tasks[taskToDelete].delete = false;
    }
    //Deletes item from the list
    const deleteItem = (taskToDelete) => {
        const updatedItems = tasks.filter((item, index) => index !== taskToDelete);
        setTasks(updatedItems);
    }
    //Update the list so the X shows when hovered over
    useEffect(() => {
        setTasks([...tasks]);
    },);

    return (
        <div className="col-5">
            <ul className="list-group">
                <li className="list-group-item row p-auto">
                    <input 
                        className="float-start col-7" 
                        type="text" 
                        placeholder="What needs to be done?" 
                        onChange={e => setTask(e.target.value)} 
                        onKeyDown={e => {
                                if (e.key == "Enter"){
                                    addTask(task);
                                }
                            }
                        } 
                        value={task} 
                    />
                    <button onClick={() => {addTask(task)}} type="button" className="float-end btn btn-primary col-4">Add</button>
                </li>
                {tasks.map((taskInList,index)=>{
                        return (
                            <li className="list-group-item row" key={index} onMouseEnter={() => showDelete(index)} onMouseLeave={() => hideDelete(index)}>
                                <div className="container-fluid">
                                    <p className="float-start">{taskInList.value}</p>
                                    <p onClick={() => deleteItem(index)} className="float-end text-danger">{tasks[index].delete == true ? "X" : ""}</p>
                                </div>
                            </li>
                        );
                    }
                )}
                <li className="list-group-item p-auto row">
                        <p className="float-start">{tasks.length == 0 ? "No tasks, add a task": `${tasks.length} Items left`}</p>
                </li>
            </ul>
        </div>
    );
};

export default ToDoList;