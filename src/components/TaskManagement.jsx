import React, { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import axios from "axios";

function TaskManagement() {
	const [tasks, setTasks] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const userId = localStorage.getItem("userId");

	useEffect(() => {
		const fetchTasks = async () => {
			try {
				setLoading(true);
				const response = await axios.get(
					`http://localhost:30000/tasks?userId=${userId}`
				);
				setTasks(response.data);
			} catch (error) {
				setError(error);
				console.error("Error fetching tasks:", error);
			} finally {
				setLoading(false);
			}
		};

		if (userId) {
			fetchTasks();
		}
	}, [userId]);

	// Function to add a new task
	const handleAddTask = (newTask) => {
		setTasks([...tasks, newTask]);
	};

	const [editingTaskId, setEditingTaskId] = useState(null);

	const handleEditClick = (taskId) => {
		setEditingTaskId(taskId);
	};

	const handleSaveEdit = async (updatedTask) => {
		try {
			const response = await axios.put(
				`http://localhost:30000/tasks/${updatedTask.id}`,
				updatedTask
			);
			const updatedTasks = tasks.map((task) =>
				task.id === updatedTask.id ? response.data : task
			);
			setTasks(updatedTasks);
			setEditingTaskId(null);
		} catch (error) {
			console.error("Error updating task:", error);
		}
	};

	// Function to delete a task
	const handleDeleteTask = async (taskId) => {
		try {
			await axios.delete(`http://localhost:30000/tasks/${taskId}`); // Replace with your API endpoint
			setTasks(tasks.filter((task) => task.id !== taskId));
		} catch (error) {
			console.error("Error deleting task:", error);
		}
	};

	// Function to mark a task as completed or pending
	const handleToggleComplete = (taskId) => {
		const updatedTasks = tasks.map((task) =>
			task.id === taskId ? { ...task, completed: !task.completed } : task
		);
		setTasks(updatedTasks);
	};

	return (
		<div className="home">
			
			<TaskForm onAddTask={handleAddTask} />

			<TaskList
				tasks={tasks}
				loading={loading}
				error={error}
				editingTaskId={editingTaskId}
				setEditingTaskId={setEditingTaskId}
				onEditTask={handleEditClick}
				onSaveEditTask={handleSaveEdit}
				onDeleteTask={handleDeleteTask}
				onToggleComplete={handleToggleComplete}
			/>
		</div>
	);
}

export default TaskManagement;
