import React from "react";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";

export default function Navbar({ user, setUser }) {
	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary">
			<div className="container-fluid ">
				<a className="navbar-brand col-3" href="#">
					<img src={logo} alt="Logo" />
				</a>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarTogglerDemo02"
					aria-controls="navbarTogglerDemo02"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarTogglerDemo02">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0 col-lg-7 justify-content-evenly">
						<li className="nav-item">
							<Link
								to="/"
								className="nav-link active "
								aria-current="page"
								href="#"
							>
								Home
							</Link>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="#">
								About
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="#">
								Contact us
							</a>
						</li>
					</ul>
					<div className="justify-content-end col-lg-3">
						{user ? (
							<div className="d-flex flex-column align-items-center">
								<p className="me-2 mb-0  col-lg-6 ">
									<div className="d-flex">
										Welcome,
										<span className="username mx-1 fw-bold">{user.name}</span>
									</div>
								</p>
								<Link
									to="/" 
									replace
									className="btn btn-sm btn-outline-secondary col-lg-6 col-md-2"
									type="button"
									onClick={() => {
										setUser(null)
										localStorage.clear()
									}} // Clear user data on logout
								>
									Logout
								</Link>
							</div>
						) : (
							<form className="container-fluid">
								<Link
									to="/registration"
									className="btn btn-outline-primary me-2 col-lg-6 col-md-2"
									type="button"
								>
									Sign up
								</Link>
								<Link
									to="/login"
									className="btn btn-sm btn-outline-secondary col-lg-5  col-md-2"
									type="button"
								>
									Login
								</Link>
							</form>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
}
