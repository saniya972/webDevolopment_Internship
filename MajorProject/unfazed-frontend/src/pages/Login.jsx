
import { useState } from "react";
import { useNavigate ,Link} from "react-router-dom";
import api from "../api/axios";
import "../App.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await api.post("/auth/login", {
                email,
                password
            });

            localStorage.setItem("token", response.data.token);

            alert("Login successful!");
            navigate("/dashboard");

        } catch (error) {
            console.log(error);
            alert(
                error.response?.data?.message ||
                error.message ||
                "Login failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-wrapper">

                {/* Left branding section */}
                <div className="login-brand">
                    <div className="brand-logo">
                        <span className="brand-icon">U</span>
                        <span>unfazed</span>
                    </div>

                    <div className="brand-content">
                        <span className="brand-label">
                            YOUR SPACE FOR WELLNESS
                        </span>

                        <h1>
                            Care that begins
                            <br />
                            with <span>connection.</span>
                        </h1>

                        <p>
                            A calmer mind starts with the right support.
                            Connect, care, and create a meaningful
                            difference in mental wellness.
                        </p>

                        <div className="brand-note">
                            <span className="note-icon">✦</span>
                            <span>
                                A safe space to listen, understand,
                                and grow together.
                            </span>
                        </div>
                    </div>

                    <div className="brand-footer">
                        © 2026 Unfazed. Made for better mental wellness.
                    </div>
                </div>

                {/* Right login section */}
                <div className="login-section">
                    <div className="login-card">

                        <div className="login-heading">
                            <div className="welcome-icon">✦</div>

                            <h2>Welcome back</h2>

                            <p>
                                Sign in to manage your therapy practice.
                            </p>
                        </div>

                        <form onSubmit={handleLogin}>
                            <div className="login-form-group">
                                <label htmlFor="email">
                                    Email address
                                </label>

                                <input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    required
                                />
                            </div>

                            <div className="login-form-group">
                                <label htmlFor="password">
                                    Password
                                </label>

                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="login-submit"
                                disabled={loading}
                            >
                                {loading ? "Signing in..." : "Sign in"}
                                {!loading && <span>→</span>}
                            </button>
                        </form>

                        <div className="login-security">
                            <span>🔒</span>
                            Your information is kept private and secure.
                        </div>
                        <div className="login-signup">
    Don't have an account?{" "}
    <Link to="/register">Sign up</Link>
</div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Login;