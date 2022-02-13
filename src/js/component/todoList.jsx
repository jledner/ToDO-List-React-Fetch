import React, { useEffect, useState } from "react";

export const TodoList = () => {
	const [inputValue, setInputValue] = useState("");
	const [list, setList] = useState([]);
	const url = "https://assets.breatheco.de/apis/fake/todos/user/jledner";

	useEffect(() => {
		return getFetch();
	}, []);

	function getFetch(params) {
		fetch(url)
			.then((response) => {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response.json();
			})
			.then((responseAsJson) => {
				// console.log(responseAsJson); --> instead of console.log, here we need to take the back end data and store it locally in the list array:
				setList(responseAsJson);
			})
			.catch((error) => {
				console.log("Looks like there was a problem: \n", error);
			});
	}

	function putFetch(taskArray) {
		fetch(url, {
			method: "PUT", // or 'POST'
			body: JSON.stringify(taskArray), // data can be a `string` or  an {object} which comes from somewhere further above in our application
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				// Read the response as json.
				return response.json();
			})
			.then((responseAsJson) => {
				// Do stuff with the JSONified response
				console.log(responseAsJson);
			})
			.catch((error) => {
				console.log("Looks like there was a problem: \n", error);
			});
	}

	let addTask = (e) => {
		if (e.keyCode == 13) {
			console.log(inputValue);
			setList([...list, { label: inputValue, done: false }]);
			putFetch([...list, { label: inputValue, done: false }]);
			setInputValue("");
			// let numberStore = [0, 1, 2];
			// let newNumber = 12;
			// numberStore = [...numberStore, newNumber];
		}
	};

	let deleteTask = (index) => {
		console.log(index);
		let newList = list.filter((eachtask, i) => index != i);
		setList(newList);
		console.log("this is the list: ", list); // you wanna separate string from object/array by comma so they don't get automatically concatenated in which case you will only see [Object object] instead of the contents of the actualy object
		console.log("this is newList: ", newList);
		putFetch(newList); //remember 'list' is not updated yet in the state due to its delayed behavior, you have to use 'newList'
	};

	let editTask = (index) => {
		// let newArray = list.map((item, i) => {
		// 	if (index == i) {
		// 		// console.log(item);
		// 		// let newTask = prompt("Enter new task");
		// 		// return { label: newTask, done: false };
		// 		// --> Here you don't want to change the task name because that is the same as erasing it and entering a new one;
		// 		// Instead you want to mark it done by just changing the value in 'done'
		// 	}
		// });
		// setList(newArray);
		// putFetch(newArray);
	};

	return (
		<div className="notepad">
			<input
				className="input py-2 full-width"
				className="list-group-item"
				placeholder="New item"
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
				onKeyDown={(e) => addTask(e)}></input>

			<ul className="list-group py-2">
				{list.map((task, index) => {
					console.log(task);
					console.log(list);
					return (
						<li className="list-group-item" key={index}>
							<span
							//You couldn't have this in the 'li' tag because it was conflicting with the onClick of the <i> tag below which is also within the li; different oncClick event have to be inside different tags that are not nested within each other:
							// onClick={() => editTask(index)} //--> I commented this out until you fix your editTask so it does not crash
							>
								{task.label}
							</span>
							<i
								className="fa fa-trash pull-right"
								onClick={() => deleteTask(index)} //we don't need to pass 'e' here but 'index' to identify the task you need deleted from the 'list' array
							></i>
						</li>
					);
				})}

				<span>
					<em className="list-group-item">
						{list.length} items left
					</em>
				</span>
			</ul>
		</div>
	);
};
//add todo
//delete todo
//edit todo

// [
// 	{
// 		label: "sample task",
// 		done: false,
// 	},
// 	{
// 		label: "walk the dog",
// 		done: false,
// 	},
// ];
