import React, {useState, useEffect} from "react";
import ToDoList from "./ToDoList";

//create your first component
const Home = () => {

	useEffect(() =>{
		fetch("https://playground.4geeks.com/todo/users")
		.then(
			(resp) => {
				console.log("resp:",resp)
				return resp.json()
			}
		)
		.then(
			(data) =>{
				console.log("data:",data)
				return data.json()
			}
		)
	},[])
	
	return (
		<div className="row justify-content-center">
			<div className="col-5 border rounded text-center bg-dark text-white m-5">
				<div className="row m-4">
					<h1>TO DO LIST</h1>
				</div>
				<div className="row justify-content-center mb-5">
					<ToDoList/>
				</div>
			</div>
		</div>
	);
};

export default Home;