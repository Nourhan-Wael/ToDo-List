import React from "react";
import home from "../assets/consumer-behavior-models.webp";
import { Link } from "react-router-dom";

export default function Home() {
	return (
		<div>
			<section className="home container-fluid vh-100 justify-content-center d-flex">
				<div className="row d-flex justify-content-center align-items-center h-100 col-11">
					<div className="col-lg-6 col-md-12 d-flex flex-column justify-content-center align-items-center">
						<h1 className="text-center fw-bold mb-5 mx-1 mx-md-4 mt-4">
							Organize your work and life, finally.
						</h1>
						<p className="text-center text-secondry mb-5 mx-1 mx-md-4 mt-4">
							Simplify life for both you and your team. The world’s #1 task
							manager and to-do list app.
						</p>
						<Link to="/registration" type="button" className="btn-home btn btn-lg px-5">
							Start
						</Link>
					</div>
					<div className="col-lg-6 col-md-12">
						<img className="img-fluid" src={home} alt="People with checklist" />
					</div>
				</div>
			</section>
		</div>
	);
}
