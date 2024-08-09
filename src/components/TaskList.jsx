import React, { useState} from "react";
import ReactPaginate from "react-paginate";

function TaskList({
	tasks,
	loading,
	error,
	onEditTask,
	onDeleteTask,
	onToggleComplete,
	onSaveEditTask,
	editingTaskId,
	setEditingTaskId,
}) {
	const [filter, setFilter] = useState("all");
	const handleFilterChange = (value) => {
		setFilter(value);
	};

	const filteredTasks = tasks.filter((task) => {
		if (filter === "all") return true;
		if (filter === "completed") return task.completed;
		if (filter === "pending") return !task.completed;
		if (filter === "overdue") return new Date(task.dueDate) < new Date();
		return false;
	});

	const [sortBy, setSortBy] = useState("priority");

	const handleSortChange = (value) => {
		setSortBy(value);
	};

	const sortedTasks = filteredTasks.sort((a, b) => {
		if (sortBy === "priority") {
			const priorityMap = {
				low: 0,
				medium: 1,
				high: 2,
			};
			return priorityMap[b.priority] - priorityMap[a.priority];
		} else if (sortBy === "dueDate") {
			return new Date(a.dueDate) - new Date(b.dueDate);
		}
		return 0;
	});

	const [pageNumber, setPageNumber] = useState(0);

	const itemPerPage = 4;
	const pagesVisited = pageNumber * itemPerPage;

	const pageCount = Math.ceil(tasks.length / itemPerPage);
	const changePage = ({ selected }) => {
		setPageNumber(selected);
	};

	return (
		<div className="mt-3">
			<div className="d-flex justify-content-around">
				<div>
					<label htmlFor="filter">Filter by: </label>
					<select
						className="mx-2"
						onChange={(e) => handleFilterChange(e.target.value)}
						name="filter"
						id="filter"
					>
						<option value="all">All</option>
						<option value="completed">Completed</option>
						<option value="pending">Pending</option>  
						<option value="overdue">Overdue</option>
					</select>
				</div>

				<div>
					<label htmlFor="sort">Sort by:</label>
					<select
						className="mx-2"
						onChange={(e) => handleSortChange(e.target.value)}
						name="sort"
						id="sort"
					>
						<option value="priority">Priority</option>
						<option value="dueDate">Due Date</option>
					</select>
				</div>
			</div>

			<div className="p-5">
				{loading ? (
					<div className="loading-indicator">Loading tasks...</div>
				) : error ? (
					<div className="error-message">Error loading tasks: {error}</div>
				) : filteredTasks.length === 0 ? (
					<div className="empty-state">No tasks found.</div>
				) : (
					<div className="taskList">
						{sortedTasks
							.slice(pagesVisited, pagesVisited + itemPerPage)
							.map((task) => (
								<div
									key={task.id}
									className={`task-card task ${
										task.completed ? "completed" : ""
									}`}
								>
									{/* Edit form field */}
									{editingTaskId === task.id ? (
										<form
											className="col-12 my-1 p-2"
											onSubmit={(e) => {
												e.preventDefault();
												onSaveEditTask(task);
											}}
										>
											<div className="my-2">
												<label htmlFor="name">Task Name:</label>
												<input
													type="text"
													name="name"
													defaultValue={task.name}
													onChange={(e) => {
														task.name = e.target.value;
													}}
												/>
											</div>
											<div className="my-2">
												<label htmlFor="description">Task Description:</label>
												<textarea
													type="text"
													name="description"
													defaultValue={task.description}
													onChange={(e) => {
														task.description = e.target.value;
													}}
												/>
											</div>
											<div className="my-2">
												<label htmlFor="priority">Priority:</label>
												<select
													name="priority"
													defaultValue={task.priority}
													onChange={(e) => {
														task.priority = e.target.value;
													}}
												>
													<option value="low">Low</option>
													<option value="medium">Medium</option>
													<option value="high">High</option>
												</select>
											</div>

											<div className="my-2">
												<label htmlFor="dueDate">Due Date:</label>
												<input
													type="date"
													name="dueDate"
													defaultValue={task.dueDate}
													onChange={(e) => {
														task.dueDate = e.target.value;
													}}
												/>
											</div>
											<button className="m-2 btn btn-success" type="submit">
												Save
											</button>
											<button
												className="m-2 btn btn-danger"
												type="button"
												onClick={() => setEditingTaskId(null)}
											>
												Cancel
											</button>
										</form>
									) : (
										<>
											<div className="task-header">
												<button
													className={`button-complete task-button ${
														task.completed ? "completedCheck" : ""
													}`}
													onClick={() => onToggleComplete(task.id)}
												>
													<i className="fa fa-check-circle-o"></i>
												</button>
												<h3>{task.name}</h3>
												<p className="mt-4">{task.description}</p>
											</div>
											<hr />
											<div className="mt-4">
												<p>Priority: {task.priority}</p>
												<p>Due Date: {task.dueDate}</p>
											</div>
											<div className="task-footer">
												<button
													className="button-edit task-button"
													onClick={() => onEditTask(task.id)}
												>
													<i className="fa fa-edit"></i>
												</button>
												<button
													className="button-delete task-button"
													onClick={() => onDeleteTask(task.id)}
												>
													<i className="fa fa-trash"></i>
												</button>
											</div>
										</>
									)}
								</div>
							))}
					</div>
				)}
			</div>

			{tasks.length > itemPerPage + 1 && (
				<div className="pagination col-12 d-flex justify-content-center">
					<ReactPaginate
						previousLabel={"<"}
						nextLabel={">"}
						pageCount={pageCount}
						onPageChange={changePage}
						containerClassName={"paginationContainer"}
						previousLinkClassName={"preBtn"}
						nextClassName={"nextBtn"}
						activeClassName={"activePagination"}
					/>
				</div>
			)}
		</div>
	);
}

export default TaskList;
