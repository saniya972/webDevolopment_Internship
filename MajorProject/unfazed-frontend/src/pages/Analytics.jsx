
import { useEffect, useState } from "react";
import api from "../api/axios";
import UpgradePrompt from "../components/UpgradePrompt";
import "../App.css";

function Analytics() {
    const [analytics, setAnalytics] = useState(null);
    const [blocked, setBlocked] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const getAnalytics = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await api.get("/analytics", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setAnalytics(response.data);
                setBlocked(false);

            } catch (error) {
                console.log("Analytics error:", error);

                if (error.response?.status === 403) {
                    setBlocked(true);
                } else {
                    setError(
                        error.response?.data?.message ||
                        "Failed to load analytics"
                    );
                }
            }
        };

        getAnalytics();
    }, []);

    if (blocked) {
        return <UpgradePrompt />;
    }

    if (error) {
        return (
            <div className="analytics-message analytics-error">
                {error}
            </div>
        );
    }

    if (!analytics) {
        return (
            <div className="analytics-message">
                Loading analytics...
            </div>
        );
    }

    return (
        <div className="analytics-page">
            <div className="analytics-header">
                <div>
                    <h1>Analytics Dashboard</h1>
                    <p>
                        Track your practice performance and growth.
                    </p>
                </div>
            </div>

            <div className="analytics-stats">

                <div className="analytics-card">
                    <div className="analytics-icon">👥</div>
                    <p>Total Clients</p>
                    <h2>{analytics.totalClients}</h2>
                </div>

                <div className="analytics-card">
                    <div className="analytics-icon">📅</div>
                    <p>Total Bookings</p>
                    <h2>{analytics.totalBookings}</h2>
                </div>

                <div className="analytics-card">
                    <div className="analytics-icon">💚</div>
                    <p>Active Clients</p>
                    <h2>{analytics.activeClients}</h2>
                </div>

                <div className="analytics-card">
                    <div className="analytics-icon">📊</div>
                    <p>No-show Rate</p>
                    <h2>{analytics.noShowRate}%</h2>
                </div>

            </div>

            <div className="revenue-section">
                <h2>Revenue Trend</h2>
                <p className="revenue-description">
                    Review your monthly revenue.
                </p>

                {analytics.revenueTrend.length === 0 ? (
                    <div className="revenue-empty">
                        <span>💰</span>
                        <p>No revenue data available yet.</p>
                    </div>
                ) : (
                    <div className="revenue-list">
                        {analytics.revenueTrend.map((item, index) => (
                            <div
                                className="revenue-item"
                                key={index}
                            >
                                <div>
                                    <span className="revenue-month">
                                        {item._id.month}/{item._id.year}
                                    </span>
                                </div>

                                <strong>
                                    ₹{item.revenue}
                                </strong>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Analytics;