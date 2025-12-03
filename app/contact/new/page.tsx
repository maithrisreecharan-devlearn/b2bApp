"use client";

import React from "react";
import Image from 'next/image';
import { useState } from "react";



export default function Page() {

	 const [formData, setFormData] = useState({
		fname: '',
		lname: '',
		email: '',
		company: '',
		message: ''
	 });	

	 const [reqBody, setReqBody] = useState({
		accessToken: "",
		instanceUrl: "",
		inputFormData : {"FirstName": "", "LastName": "", "Email": "", "Company": "", "Description": ""}
	});

	// submission UI state
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const [submissionError, setSubmissionError] = useState<string | null>(null);

		// convertKeys function to convert form field names to Salesforce Lead field names
	const convertKeys  = (inputObject: { [k: string]: string }) => {
    
      const mappedObject = {

		
    // Map 'fname' to 'FirstName'
    FirstName: inputObject.fname, 
    
    // Map 'lname' to 'LastName'
    LastName: inputObject.lname, 
    
    // Map 'email' to 'Email'
    Email: inputObject.email, 
	// Map 'company' to 'Company'
	Company: inputObject.company,
    
    // Map 'message' to 'Description'
    Description: inputObject.message 
  }
  return mappedObject;
  };   

	// update formData and keep reqBody.inputFormData in sync with the latest values
	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData(prev => {
			const next = { ...prev, [name]: value };
			// also update the request body with the latest form values
			setReqBody(prevReq => ({ ...prevReq, inputFormData: convertKeys(next) }));
			console.log("Updated reqBody.inputFormData:", reqBody.inputFormData);
			return next;
		});
	};

	

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); // prevent page reload

		setIsSubmitting(true);
		setSubmissionError(null);

		const res = await fetch("/api/getToken", { method: "POST" });
		const data = await res.json();

	


		if (data.access_token) {
				console.log("Received access token:", data.access_token);

			// Build the request body synchronously using the new token (don't rely on setState being immediate)
			const newReqBody = {
				...reqBody,
				accessToken: data.access_token,
				// also capture instance_url if provided by token endpoint
				instanceUrl: data.instance_url || data.instanceUrl || reqBody.instanceUrl,
			};

					// update React state for later UI uses
					setReqBody(newReqBody);
					console.log("Using request body for insertLead:", newReqBody);

					// send the newReqBody directly so the insert route receives the token and payload
					const insertLeadRes = await fetch("/api/insertLead", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(newReqBody),
					});

					let insertResultText = null;
					try {
						insertResultText = await insertLeadRes.text();
						console.log("Insert Lead response status:", insertLeadRes.status, insertResultText);

						if (insertLeadRes.ok) {
							// success: show confirmation and hide the form
							setSubmitted(true);
						} else {
							// surface server error to user
							setSubmissionError(`Error ${insertLeadRes.status}: ${insertResultText}`);
						}

					} catch (err) {
						console.error("Error reading insertLead response:", err);
						setSubmissionError(String(err));
					} finally {
						setIsSubmitting(false);
					}


    } else {
      console.error("Failed to get access token, please check the API credentials or contact Administrator.");
    }
  }

	return (
		<main className="pt-48" style={{maxWidth: 700, margin: '1rem auto', paddingTop: '20px'}}>
			<Image
                        src="/logo.png"
                        alt="TechBoat Logo"
                        width="1000"
                        height="1000"
                        className="h-10 w-auto"
                      />
            <h1>Please submit your information and inquiry: </h1>

			{/* attach submit handler to the form */}

			{submissionError && (
				<div className="bg-red-100 text-red-800 p-3 rounded mb-4">{submissionError}</div>
			)}

			{submitted ? (
				<div className="bg-white p-8 rounded-xl shadow-2xl border-t-4 border-blue-500 max-w-lg mx-auto transform transition-all hover:scale-[1.02]">
					<div className="flex items-center justify-center mb-4">
						<svg className="w-10 h-10 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
						<h2 className="text-3xl font-extrabold text-gray-900">Request Confirmed!</h2>
					</div>
					<p className="text-lg text-gray-700 mb-4">
						We have successfully received your information and are already reviewing your inquiry.
					</p>
					<p className="text-md text-gray-500">
						Please expect a personal follow-up from one of our team members
					</p>
				</div>
			) : (
				<form onSubmit={handleSubmit} action="#" method="post" style={{display: 'grid', gap: '1rem'}}>
				<div style={{display: 'grid', gap: 6}}>
					<label htmlFor="fname">First Name</label>
					<input
						id="fname"
						name="fname"
						type="text"
						value={formData.fname}
						onChange={handleChange}
						required
						style={{padding: '8px 10px', border: '1px solid #ccc', borderRadius: 4}}
					/>
				</div>
				<div style={{display: 'grid', gap: 6}}>
					<label htmlFor="lname">Last Name</label>
					<input
						id="lname"
						name="lname"
						type="text"
						value={formData.lname}
						onChange={handleChange}
						required
						style={{padding: '8px 10px', border: '1px solid #ccc', borderRadius: 4}}
					/>
				</div>

				<div style={{display: 'grid', gap: 6}}>
					<label htmlFor="email">Email</label>
					<input
						id="email"
						name="email"
						type="email"
						value={formData.email}
						onChange={handleChange}
						required
						style={{padding: '8px 10px', border: '1px solid #ccc', borderRadius: 4}}
					/>
				</div>

				<div style={{display: 'grid', gap: 6}}>
					<label htmlFor="company">Company</label>
					<input
						id="company"
						name="company"
						type="text"
						value={formData.company}
						onChange={handleChange}
						required
						style={{padding: '8px 10px', border: '1px solid #ccc', borderRadius: 4}}
					/>
				</div>

				<div style={{display: 'grid', gap: 6}}>
					<label htmlFor="message">Message</label>
					<textarea
						id="message"
						name="message"
						value={formData.message}
						onChange={handleChange}
						rows={6}
						required
						style={{padding: '8px 10px', border: '1px solid #ccc', borderRadius: 4}}
					/>
				</div>

				<div>
					{/* simple submit button; form handles submission */}
					<button type="submit" className="submitButton" disabled={isSubmitting}>
						{isSubmitting ? 'Submitting…' : 'Submit'}
					</button>
				</div>
				</form>
			)}
		</main>
	)
}
