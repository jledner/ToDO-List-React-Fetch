import React, { useEffect, useState } from "react";

export const TodoList = () => {
	const [inputValue, setInputValue] = useState("");
	const [list, setList] = useState([]);
	const url = "https://assets.breatheco.de/apis/fake/todos/user/jledner";
	useEffect(() => getFetch(), []);

	function getFetch(params) {
		fetch(url)
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
			e.target.value = "";
			putFetch([...list, { label: inputValue, done: false }]);
			// let numberStore = [0, 1, 2];
			// let newNumber = 12;
			// numberStore = [...numberStore, newNumber];
		}
	};
	let deleteTask = (index) => {
		// let newList = list.filter((eachtask) => {
		// 	console.log(eachtask != e.target.previousSibling.data);
		// 	return eachtask != e.target.previousSibling.data;
		// });

		setList(list.filter((item, i) => index != i));
		console.log("this is the list" + list);
		putFetch(list);
	};
	// use get and useeffect

	return (
		<div className="notepad">
			<input
				className="input py-2 full-width"
				className="list-group-item"
				placeholder="New item"
				onChange={(e) => setInputValue(e.target.value)}
				onKeyDown={(e) => addTask(e)}></input>

			<ul className="list-group py-2">
				{list.map((task, index) => {
					return (
						<li className="list-group-item" key={index}>
							<span>
								{task.label}
								<i
									className="fa fa-trash pull-right"
									onClick={() => deleteTask(index)}></i>
							</span>
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
