import React, {useState, useEffect} from "react";

//create your first component
const ToDoList = () => {

    const [task, setTask] = useState("");

    const [tasks, setTasks] = useState([]);

	const url = "https://playground.4geeks.com/todo";

	//Fetch all users
	const getAllUsers = async () => {
		await fetch(url + "/users")
		.then(
			(allUsers) => {
				return allUsers.json()
			}
		)
		.then(
			(data) => {
				//If the user "Ricardoleidenz" does not exist create it, else, notify that user already exists
				if(!data.users.some(user => user.name == "Ricardoleidenz")){
					createUser()
				}
				else{
					console.log("User already exists")
				}
			}
		)
	}

	//Fetch all ToDo's
	const getAllToDos = async () => {
		await fetch(url + "/users/Ricardoleidenz")
		.then(
			(allUsers) => {
				return allUsers.json()
			}
		)
		.then(
			(data) => {
				setTasks(data.todos)
			}
		)
	}
	const createUser = async () => {
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
		await fetch(url + "/users/Ricardoleidenz", options)
		.then(
			(response) => {
				return response.json()
			}
		)
		.then(
			(data) =>{
				console.log("User created:",data)
			}
		)
	}

	//Add a task to the Server
	const addTask = async (newtask) =>{
		if(newtask != ""){
			let options = {
				method: "POST",
				headers: {"content-type":"application/json"},
				body: JSON.stringify(
					{
						"label": newtask,
						"is_done": false
					}
				)
			}
			let response = await fetch(url+"/todos/Ricardoleidenz", options)
			if (response.ok){
				let data = await response.json()
				console.log("Added ToDo:",data)
				setTask("")
				getAllToDos()

			}
			else{
				console.log("Error adding task")
			}
		}
		else{
			console.log("Task is empty")
		}
    }

	//Calls deleteItem on every element of tasks
    const deleteAllToDos = async () => {
		 {tasks.forEach((taskInList)=>deleteItem(taskInList.id))}
    }

	//Delete element per provided ID
    const deleteItem = async (taskID) => {
		let options = {
			method: "DELETE"
		}
		try{
			console.log("Deleted ToDo:",taskID)
			await fetch(url+"/todos/"+taskID, options)
			.then(() => getAllToDos())
		}
		catch(error){
			console.log("Error deleting task:",error)
		}
    }

	useEffect(() =>{
		getAllUsers()
		getAllToDos()
	},[])

    return (
        <div className="col-5">
            <ul className="list-group">
				{/* ADD TASK INPUT SECTION*/}
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
				{/* TASK LIST SECTION */}
                {tasks.map((taskInList,index)=>{
                        return (
                            <li className="list-group-item row" key={index}>
                                <div className="container-fluid">
                                    <h5 className="float-start">{taskInList.label}</h5>
                                    <button onClick={() => deleteItem(taskInList.id)} className="highlightX float-end">X</button>
                                </div>
                            </li>
                        );
                    }
                )}
				{/* TASK COUNTER SECTION */}
                <li className="list-group-item p-auto row">
                    <p className="float-start">{tasks.length == 0 ? "No tasks, add a task": `${tasks.length} Items left`}</p>
                </li>
            </ul>
			{/* DELETE ALL TASKS BUTTON */}
            <button onClick={() => {deleteAllToDos()}} type="button" className="m-3 btn btn-primary">Delete All ToDo's</button>
        </div>
    );
};

export default ToDoList;