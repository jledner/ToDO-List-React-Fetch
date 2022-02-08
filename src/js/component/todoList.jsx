import React, { useEffect, useState } from "react";

export const TodoList = () => {
	const [inputValue, setInputValue] = useState("");
	const [list, setList] = useState([]);

	let onChange = (e) => {
		if (e.keyCode !== 13) {
			setInputValue(e.target.value);
		}
	};

	let addTask = (e) => {
		if (e.keyCode == 13) {
			console.log(inputValue);
			setList([...list, inputValue]);
			e.target.value = "";
			// let numberStore = [0, 1, 2];
			// let newNumber = 12;
			// numberStore = [...numberStore, newNumber];
		}
	};

	// function handleRemove(item, id) {
	// 	const newList = list.filter((item) => item.id !== id);

	// 	setList(newList);

	// 	console.log(newList);
	// 	console.log(list);
	// }

	return (
		<div className="notepad">
			<input
				className="input py-2 full-width"
				className="list-group-item"
				placeholder="New item"
				// value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
				onKeyDown={(e) => addTask(e)}></input>

			<ul className="list-group py-2">
				{list.map((task, index) => {
					return (
						<li className="list-group-item" key={index}>
							<span>
								{task}
								<i
									className="fa fa-trash pull-right"
									onClick={(e) =>
										setList(
											list.filter((eachtask) => {
												console.log(
													eachtask !=
														e.target.previousSibling
															.data
												);
												return (
													eachtask !=
													e.target.previousSibling
														.data
												);
											})
										)
									}></i>
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
