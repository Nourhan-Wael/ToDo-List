
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login({ setUser }) {
	const navigate = useNavigate();

	const initialValues = {
		email: "",
		password: "",
	};

	const validationSchema = Yup.object().shape({
		email: Yup.string()
			.email("Invalid email format")
			.required("Email is required"),
		password: Yup.string()
			.min(8, "Password must be at least 8 characters")
			.required("Password is required"),
	});

	const onSubmit = async (values) => {
		try {
			const response = await axios.get("http://localhost:30000/users", values);
			const user = response.data.find((user) => user.email === values.email);
			if (user && user.password === values.password) {
				setUser({ name: user.name, email: user.email }); // Update user state
				alert("Login Successful!");
				localStorage.setItem("userId", user.id); // Save user ID to localStorage
				navigate("/todopage");
			} else {
				throw new Error("Invalid email or password");
			}
		} catch (error) {
			console.error(error);
			alert("Login failed! Please check your email and password.");
		}
	};

	return (
		<section className="">
			<div className="con container-fluid h-100">
				<div className="row d-flex justify-content-center align-items-center h-100 col-lg-4 col-md-12">
					<div className="col-12 ">
						<div className="card text-black col-12">
							<div className="card-body p-md-5">
								<div className="row justify-content-center">
									<div className="col-12">
										<p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
											Login
										</p>
										<Formik
											initialValues={initialValues}
											validationSchema={validationSchema}
											onSubmit={onSubmit}
										>
											{({ isSubmitting, errors, touched }) => (
												<Form className="mx-1mx-md-4">
													<div className="form-group">
														<label htmlFor="email">Your Email</label>
														<Field
															type="email"
															id="email"
															name="email"
															className="form-control"
														/>
														<ErrorMessage
															name="email"
															component="div"
															className="text-danger"
														/>
													</div>

													<div className="form-group">
														<label htmlFor="password">Password</label>
														<Field
															type="password"
															id="password"
															name="password"
															className="form-control"
														/>
														<ErrorMessage
															name="password"
															component="div"
															className="text-danger"
														/>
													</div>

													<div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
														<button
															type="submit"
															className="btn btn-primary btn-lg my-3"
															disabled={isSubmitting}
														>
															{isSubmitting ? "Logging in..." : "LOGIN"}
														</button>
													</div>

													<p className="text-center text-secondry mt-5 mb-0 ">
														Don't have an account?
														<Link
															to="/registration"
															className="fw-bold text-body"
														>
															<u>Sign up</u>
														</Link>
													</p>
												</Form>
											)}
										</Formik>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
