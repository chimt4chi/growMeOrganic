import "./UserForm.css";
import { useState, useEffect } from "react";

type Props = {};

function App({}: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleForm = (e: any) => {
    e.preventDefault();

    if (name && email && phone) {
      localStorage.setItem("user_name", name);
      localStorage.setItem("user_email", email);
      localStorage.setItem("user_phone", phone);
      setName("");
      setEmail("");
      setPhone("");
      window.location.href = "/users";
    } else {
      alert("Please fill in all fields");
    }
  };

  const storedName = localStorage.getItem("user_name");
  const storedEmail = localStorage.getItem("user_email");
  const storedPhone = localStorage.getItem("user_phone");

  useEffect(() => {
    if (storedEmail || storedName || storedPhone) {
      window.location.href = "/users";
    }
  }, []);

  const handleName = (e: any) => {
    setName(e.target.value);
  };
  const handelEmail = (e: any) => {
    setEmail(e.target.value);
  };
  const handlePhone = (e: any) => {
    setPhone(e.target.value);
  };

  return (
    <div className="form-wrapper-div">
      <form className="form" onSubmit={handleForm}>
        <label htmlFor="name" className="text-green-500">
          Name
        </label>
        <input
          value={name}
          onChange={handleName}
          type="text"
          placeholder="name"
          id="name"
        />
        <label htmlFor="email" className="text-green-500">
          Email
        </label>
        <input
          value={email}
          onChange={handelEmail}
          type="email"
          placeholder="email"
          id="email"
        />
        <label htmlFor="phone" className="text-green-500">
          Phone
        </label>
        <input
          value={phone}
          onChange={handlePhone}
          type="number"
          placeholder="number"
          id="phone"
          style={{ overflow: "hidden" }}
        />
        <button type="submit" className="button">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default App;
