
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../App.css";

function Dashboard() {
    const [therapist, setTherapist] = useState(null);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const getProfile = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await api.get("/auth/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setTherapist(response.data.therapist);

            } catch (error) {
                setError("Failed to load profile");
            }
        };

        getProfile();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    if (error) {
        return (
            <div className="dashboard-message">
                <div className="dashboard-message-card">
                    <h2>Unable to load profile</h2>
                    <p>{error}</p>
                    <button
                        className="unfazed-btn"
                        onClick={() => window.location.reload()}
                    >
                        Try again
                    </button>
                </div>
            </div>
        );
    }

    if (!therapist) {
        return (
            <div className="dashboard-message">
                <div className="dashboard-loading">
                    <div className="loading-spinner"></div>
                    <p>Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-page">

            {/* Top navigation */}
            <header className="dashboard-navbar">
                <div className="dashboard-brand">
                    <span className="dashboard-brand-icon">U</span>
                    <span>unfazed</span>
                </div>

                <div className="dashboard-nav-right">
                    <span className="dashboard-role">
                        Therapist Portal
                    </span>

                    <button
                        className="dashboard-logout"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </header>

            <main className="dashboard-main">

                {/* Welcome banner */}
                <section className="dashboard-welcome">
                    <div>
                        <span className="dashboard-eyebrow">
                            THERAPIST DASHBOARD
                        </span>

                        <h1>
                            Welcome back, {therapist.name}!
                        </h1>

                        <p>
                            Here's your professional profile and
                            practice overview.
                        </p>
                    </div>

                    <div className="dashboard-welcome-icon">
                        ✦
                    </div>
                </section>

                {/* Profile information */}
                <section className="dashboard-profile-card">

                    <div className="dashboard-profile-header">
                        <div className="dashboard-avatar">
                            {therapist.name?.charAt(0).toUpperCase()}
                        </div>

                        <div className="dashboard-profile-title">
                            <span className="dashboard-status">
                                <span></span>
                                Therapist account
                            </span>

                            <h2>{therapist.name}</h2>
                            <p>{therapist.email}</p>
                        </div>
                    </div>

                    <div className="dashboard-divider"></div>

                    <div className="dashboard-info-section">
                        <h3>About me</h3>

                        <p className="dashboard-bio">
                            {therapist.bio ||
                                "Add a professional bio to introduce yourself to clients."}
                        </p>
                    </div>

                </section>

                {/* Specializations */}
                <section className="dashboard-info-card">
                    <div className="dashboard-section-heading">
                        <div className="dashboard-section-icon">
                            ✧
                        </div>

                        <div>
                            <h2>Specializations</h2>
                            <p>
                                Areas you support your clients with
                            </p>
                        </div>
                    </div>

                    <div className="dashboard-tags">
                        {therapist.specializations?.length > 0 ? (
                            therapist.specializations.map((item, index) => (
                                <span
                                    className="dashboard-tag"
                                    key={index}
                                >
                                    {item}
                                </span>
                            ))
                        ) : (
                            <p>No specializations added yet.</p>
                        )}
                    </div>
                </section>

                {/* Languages */}
                <section className="dashboard-info-card">
                    <div className="dashboard-section-heading">
                        <div className="dashboard-section-icon">
                            文
                        </div>

                        <div>
                            <h2>Languages</h2>
                            <p>
                                Languages you communicate in
                            </p>
                        </div>
                    </div>

                    <div className="dashboard-tags">
                        {therapist.languages?.length > 0 ? (
                            therapist.languages.map((item, index) => (
                                <span
                                    className="dashboard-language-tag"
                                    key={index}
                                >
                                    {item}
                                </span>
                            ))
                        ) : (
                            <p>No languages added yet.</p>
                        )}
                    </div>
                </section>

                {/* Quick navigation */}
                <section className="dashboard-quick-links">
                    <h2>Manage your practice</h2>

                    <div className="dashboard-quick-grid">

                        <button
                            className="dashboard-quick-card"
                            onClick={() => navigate("/availability")}
                        >
                            <span className="quick-card-icon">◷</span>
                            <span>
                                <strong>Availability</strong>
                                <small>Manage your session timings</small>
                            </span>
                            <span className="quick-arrow">→</span>
                        </button>

                        <button
                            className="dashboard-quick-card"
                            onClick={() => navigate("/bookings")}
                        >
                            <span className="quick-card-icon">▤</span>
                            <span>
                                <strong>My Bookings</strong>
                                <small>View your client appointments</small>
                            </span>
                            <span className="quick-arrow">→</span>
                        </button>

                    </div>
                </section>

            </main>

            <footer className="dashboard-footer">
                <p>© 2026 Unfazed · Your space for mental wellness</p>
            </footer>

        </div>
    );
}

export default Dashboard;