
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
export default function Registration() {
	const navigate = useNavigate();
	const [validationError, setValidationError] = useState("");
	const validationSchema = Yup.object({
		name: Yup.string().required("Name is required"),
		email: Yup.string()
			.email("Invalid email format")
			.required("Email is required"),
		password: Yup.string()
			.min(8, "Password must be at least 8 characters")
			.max(16, "Password cannot exceed 16 characters")
			.required("Password is required"),
		cpassword: Yup.string()
			.oneOf([Yup.ref("password"), null], "Passwords must match")
			.required("Confirm password is required"),
	});

	const handleSubmit = async (values, { setSubmitting }) => {
		try {
			const emailExists = await checkEmailAvailability(values.email);
			if (!emailExists.length) {
				axios
					.post("http://localhost:30000/users", values)
					.then((result) => {
						alert("Registered Successfully");
						navigate("/login");
					})
					.catch((err) => console.log(err));
			} else {
				setValidationError("Email already exists");
			}
		} catch (error) {
			console.error("Error registering user:", error);
		} finally {
			setSubmitting(false);
		}
	};

	const checkEmailAvailability = async (email) => {
		try {
			const response = await axios.get(
				`http://localhost:30000/users?email=${email}`
			);
			return response.data;
		} catch (error) {
			console.error("Error checking email availability:", error);
			return false; 
		}
	};

	return (
		<section className="">
			<div className="con container-fluid h-100">
				<div className="row d-flex justify-content-center align-items-center h-100 col-11">
					<div className="col-lg-12 col-xl-11">
						<div className="card text-black">
							<div className="card-body p-md-5">
								<div className="row justify-content-center">
									<div className="col-lg-6 col-md-6 order-2 order-lg-1">
										<p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
											Sign up
										</p>

										<Formik
											initialValues={{
												name: "",
												email: "",
												password: "",
												cpassword: "",
											}}
											validationSchema={validationSchema}
											onSubmit={handleSubmit}
										>
											{({ handleSubmit, isSubmitting }) => (
												<form onSubmit={handleSubmit}>
													<div className="d-flex flex-row align-items-center mb-4">
														<i className="fa fa-user fa-lg me-3 fa-fw"></i>
														<div className="form-outline flex-fill mb-0">
															<Field
																type="text"
																id="form3Example1c"
																name="name"
																className="form-control"
																placeholder="Your Name"
															/>
															<ErrorMessage
																name="name"
																component="div"
																className="text-danger"
															/>
														</div>
													</div>

													<div className="d-flex flex-row align-items-center mb-4">
														<i className="fa fa-envelope fa-lg me-3 fa-fw"></i>
														<div className="form-outline flex-fill mb-0">
															<Field
																type="email"
																id="form3Example3c"
																name="email"
																className="form-control"
																placeholder="Your Email"
															/>
															<span className="text-danger">
																{validationError}
															</span>
															<ErrorMessage
																name="email"
																component="div"
																className="text-danger"
															/>
														</div>
													</div>

													<div className="d-flex flex-row align-items-center mb-4">
														<i className="fa fa-lock fa-lg me-3 fa-fw"></i>
														<div className="form-outline flex-fill mb-0">
															<Field
																type="password"
																id="form3Example4c"
																name="password"
																className="form-control"
																placeholder="Password"
															/>
															<ErrorMessage
																name="password"
																component="div"
																className="text-danger"
															/>
														</div>
													</div>

													<div className="d-flex flex-row align-items-center mb-4">
														<i className="fa fa-key fa-lg me-3 fa-fw"></i>
														<div className="form-outline flex-fill mb-0">
															<Field
																type="password"
																id="form3Example4cd"
																name="cpassword"
																className="form-control"
																placeholder="Confirm Password"
															/>
															<ErrorMessage
																name="cpassword"
																component="div"
																className="text-danger"
															/>
														</div>
													</div>

													<div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
														<button
															type="submit"
															disabled={isSubmitting}
															className="btn btn-primary btn-lg"
														>
															Register
														</button>
													</div>
													<p className="text-center text-secondry mt-5 mb-0">
														Have already an account?
														<Link to="/login" className="fw-bold text-body">
															<u>Login here</u>
														</Link>
													</p>
												</form>
											)}
										</Formik>
									</div>
									<div className="col-lg-6 col-md-6 d-flex align-items-center order-1 order-lg-2">
										<img
											src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
											className="img-fluid"
											alt="Sample image"
										/>
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
