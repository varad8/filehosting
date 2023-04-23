import React, { useState } from "react";
import { storage, firestore } from "../../../firebase";
import "firebase/firestore";
const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Saved Data to Firebase
    if (email != null || message != null || name != null) {
      addDataToFirestore();
    } else {
      setError("Enter all fields");
    }
  };

  async function addDataToFirestore() {
    try {
      const data = { name: name, email: email, message: message };
      const docRef = await firestore.collection("contactform").add(data);
      console.log("Data added to Firestore with ID:", docRef.id);
      setError(
        "Data Sended to Contact Support with Reference No :- " + docRef.id
      );
    } catch (error) {
      console.error("Error adding data to Firestore:", error);
      setError("Error adding data to Firestore:", error);
    }
  }

  return (
    <div className="flex flex-col md:flex-row bg-gradient">
      <div className="md:w-1/2 ">
        <h2 className="text-white text-4xl font-bold p-8">Contact Support</h2>
      </div>
      <div className="md:w-1/2 p-8">
        {/* Contact form code here */}{" "}
        <div className="bg-base-100 text-base-content rounded-lg shadow-md p-8 max-w-xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-base-content font-semibold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="border border-gray-400 rounded-lg p-2 w-full"
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-base-content font-semibold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="border border-gray-400 rounded-lg p-2 w-full"
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-base-content font-semibold mb-2"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                className="border border-gray-400 rounded-lg p-2 w-full"
                id="message"
                name="message"
                rows="4"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>
            <button
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600"
              type="submit"
            >
              Send
            </button>
          </form>

          {error && (
            <p className="text-green-500 font-semibold mb-4">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
