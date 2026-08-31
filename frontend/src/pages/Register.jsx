import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/auth/register", {
        name,
        email,
        password
      });

      alert(res.data.message); // e.g., "Registered successfully"

      // After registration, go to login page
      nav("/");

    } catch (err) {
      console.log(err);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div
  className="flex justify-center items-center h-screen bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage:
      "linear-gradient(rgba(15, 23, 80, 0.55), rgba(0, 0, 0, 0.65)), url('https://wallpaperaccess.com/full/4839516.jpg')"
  }}
>
      <div className="bg-white p-8 rounded-2xl shadow-xl w-80">
        <h2 className="text-3xl font-bold text-center mb-5">CINEBOOK</h2>

        <h2 className="text-2xl font-bold text-center mb-5">Register To get started</h2>

        <form onSubmit={register}>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-2 border rounded mb-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded mb-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white w-full py-2 rounded shadow"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Already have an account?
          <Link to="/" className="text-purple-600 font-semibold ml-1">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
