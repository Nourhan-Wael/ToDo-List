import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Registration from "./components/Registration";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import TaskManagement from "./components/TaskManagement";

export default function App() {
	const [user, setUser] = useState(null);

	return (
		<div>
			<BrowserRouter>
				<Navbar user={user} setUser={setUser} />
				<Routes>
					<Route path="/" element={<Home />}></Route>
					<Route path="/registration" element={<Registration />}></Route>
					<Route path="/login" element={<Login setUser={setUser} />}></Route>
					<Route path="/todopage" element={<TaskManagement />}></Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}
