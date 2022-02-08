import React, { useEffect, useState } from "react";
import { TodoList } from "./todoList.jsx";

let array = [];

//create your first component
const Home = () => {
	return (
		<div className="container">
			<h1 className="header pt-5 d-flex justify-content-center">Todos</h1>
			<TodoList />
		</div>
	);
};

export default Home;

// 1) Input field
// 2) UL
// 3) need state
// 4) need inputs saves in an array
