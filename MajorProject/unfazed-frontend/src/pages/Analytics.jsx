import { useEffect, useState } from "react";
import api from "../api/axios";
import UpgradePrompt from "../components/UpgradePrompt";

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
        return <p>{error}</p>;
    }

    if (!analytics) {
        return <p>Loading analytics...</p>;
    }

    return (
        <div>
            <h1>Analytics Dashboard</h1>

            <h3>Total Clients: {analytics.totalClients}</h3>

            <h3>Total Bookings: {analytics.totalBookings}</h3>

            <h3>Active Clients: {analytics.activeClients}</h3>

            <h3>
                No-show Rate: {analytics.noShowRate}%
            </h3>

            <h2>Revenue Trend</h2>

            {analytics.revenueTrend.length === 0 ? (
                <p>No revenue data available yet.</p>
            ) : (
                analytics.revenueTrend.map((item, index) => (
                    <p key={index}>
                        {item._id.month}/{item._id.year} :
                        ₹{item.revenue}
                    </p>
                ))
            )}
        </div>
    );
}

export default Analytics;