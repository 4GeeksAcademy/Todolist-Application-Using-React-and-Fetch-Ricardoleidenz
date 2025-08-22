import React, {useState, useEffect} from "react";

//create your first component
const ToDoList = () => {

    const [task, setTask] = useState("");

    const [tasks, setTasks] = useState([]);

	const url = "https://playground.4geeks.com/todo";

	const createUser = () => {
		let options = {
			method: "POST",
			headers: {"content-type":"application/json"},
			body: JSON.stringify(
				{
					"name": "Ricardoleidenz",
					"id": 0
				}
			)
		}
		fetch(url + "/users/Ricardoleidenz", options)
		.then(
			(r) => {
				console.log("r:",r)
				return r.json()
			}
		)
		.then(
			(d) =>{
				console.log("Create user data:",d)
			}
		)
	}
	const addToDo = () => {
		let options = {
			method: "POST",
			headers: {"content-type":"application/json"},
			body: JSON.stringify(
				{
					"label": task,
					"is_done": false
				}
			)
		}
		fetch(url+"/todos/Ricardoleidenz", options)
		.then(
			(re) => {
				console.log("r:",re)
				return re.json()
			}
		)
		.then(
			(da) =>{
				console.log("Create user data:",da)
			}
		)
	}
	
    const addTask = (newtask) =>{
        addToDo()
        if(newtask != ""){
            setTasks([...tasks, newtask]);
            //Restart task when submitted
            setTask("");
        }
    }

    const deleteItem = (taskToDelete) => {
        const updatedItems = tasks.filter((item, index) => index !== taskToDelete);
        setTasks(updatedItems);
    }

	useEffect(() =>{
		fetch(url + "/users")
		.then(
			(resp) => {
				console.log("resp:",resp)
				return resp.json()
			}
		)
		.then(
			(data) =>{
				console.log("data:",data)
			}
		)
		createUser()
	},[])

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
                            <li className="list-group-item row" key={index}>
                                <div className="container-fluid">
                                    <h5 className="float-start">{taskInList}</h5>
                                    <button onClick={() => deleteItem(index)} className="highlightX float-end">X</button>
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