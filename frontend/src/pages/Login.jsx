import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/auth/login", {
        email,
        password
      });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        nav("/home");
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.log(err);
      alert("Login failed. Please check your credentials and try again.");
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
        <h2 className="text-2xl font-bold text-center mb-5">Login</h2>

        <form onSubmit={login}>
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
            Login
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Don't have an account?
          <Link to="/register" className="text-purple-600 font-semibold ml-1">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
