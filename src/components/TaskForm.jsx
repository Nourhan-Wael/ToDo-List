import axios from "axios";
import React, { useState } from "react";

function TaskForm({ onAddTask }) {
	const [task, setTask] = useState({
		name: "",
		description: "",
		priority: "medium",
		dueDate: "",
		status: "pending",
		userId: localStorage.getItem("userId"),
	});

	const [errors, setErrors] = useState({});

	const handleChange = (e) => {
		setTask({ ...task, [e.target.name]: e.target.value });
		setErrors({}); 
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const newErrors = {};
		if (!task.name) newErrors.name = "Task name is required";
		if (!task.dueDate) newErrors.dueDate = "Due date is required";
		if (!task.priority) newErrors.priority = "Priority is required"; 
		if (Object.keys(newErrors).length === 0) {
			try {
				const response = await axios.post("http://localhost:30000/tasks", task);
				onAddTask(response.data);
				setTask({
					name: "",
					description: "",
					priority: "medium",
					dueDate: "",
					status: "pending",
					userId: localStorage.getItem("userId"),
				});
			} catch (error) {
				console.error("Error creating task:", error);
				setErrors({
					...errors,
					general: "An error occurred while creating the task.",
				});
			}
		}
	};

	return (
		<div className="d-flex  justify-content-center">
			<form
				className="card col-md-8 col-lg-4 my-4 p-lg-4 p-2 d-flex algin-item-center"
				onSubmit={handleSubmit}
			>
				<label className=" mx-5" htmlFor="name">
					Task Name:
				</label>
				<input
					className="col-9 mx-5"
					type="text"
					id="name"
					name="name"
					value={task.name}
					onChange={handleChange}
					required
				/>
				{errors.name && <span className="error">{errors.name}</span>}

				<label className=" mx-5" htmlFor="name">
					Task Description:
				</label>
				<textarea
					className="col-9 mx-5"
					type="text"
					id="description"
					name="description"
					value={task.description}
					onChange={handleChange}
				/>

				<label className=" mx-5" htmlFor="priority">
					Priority:
				</label>
				<select
					className="col-9 mx-5"
					id="priority"
					name="priority"
					value={task.priority}
					onChange={handleChange}
				>
					<option value="low">Low</option>
					<option value="medium">Medium</option>
					<option value="high">High</option>
				</select>
				{errors.priority && <span className="error">{errors.priority}</span>}

				<label className=" mx-5" htmlFor="dueDate">
					Due Date:
				</label>
				<input
					className="col-9 mx-5"
					type="date"
					id="dueDate"
					name="dueDate"
					value={task.dueDate}
					onChange={handleChange}
					required
				/>
				{errors.dueDate && <span className="error">{errors.dueDate}</span>}

				<button className="col-9 mt-4 mx-5 btn btn-home" type="submit">
					Add Task
				</button>
			</form>
		</div>
	);
}

export default TaskForm;
