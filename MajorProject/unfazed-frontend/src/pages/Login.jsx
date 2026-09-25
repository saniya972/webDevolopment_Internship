import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/auth/login", {
                email,
                password
            });

            localStorage.setItem("token", response.data.token);

            alert("Login successful!");

            navigate("/");

        } catch (error) {
    console.log(error);
    console.log(error.response);

    alert(
        error.response?.data?.message ||
        error.message ||
        "Login failed"
    );
}
    };

    return (
        <div>
            <h1>Unfazed Login</h1>

            <form onSubmit={handleLogin}>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <br /><br />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <br /><br />

                <button type="submit">
                    Login
                </button>

            </form>
        </div>
    );
}

export default Login;