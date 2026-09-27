
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../App.css";

function Bookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cancellingId, setCancellingId] = useState(null);

    const navigate = useNavigate();

    const getBookings = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await api.get("/bookings", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setBookings(response.data.bookings || []);

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getBookings();
    }, []);

    const handleCancel = async (bookingId) => {
        const confirmed = window.confirm(
            "Are you sure you want to cancel this booking?"
        );

        if (!confirmed) return;

        try {
            setCancellingId(bookingId);

            const token = localStorage.getItem("token");

            await api.delete(`/bookings/${bookingId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            alert("Booking cancelled successfully!");

            await getBookings();

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to cancel booking"
            );
        } finally {
            setCancellingId(null);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "Date not available";

        const date = new Date(dateString + "T00:00:00");

        if (Number.isNaN(date.getTime())) {
            return dateString;
        }

        return date.toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });
    };

    const formatTime = (time) => {
        if (!time) return "";

        const [hours, minutes] = time.split(":");
        const date = new Date();

        date.setHours(Number(hours), Number(minutes));

        return date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true
        });
    };

    const getStatusClass = (status) => {
        if (status === "booked") return "booking-status-booked";
        if (status === "cancelled") return "booking-status-cancelled";
        return "booking-status-default";
    };

    return (
        <div className="bookings-page">

            {/* Navbar */}
            <header className="dashboard-navbar">
                <div
                    className="dashboard-brand"
                    onClick={() => navigate("/dashboard")}
                    role="button"
                >
                    <span className="dashboard-brand-icon">U</span>
                    <span>unfazed</span>
                </div>

                <div className="dashboard-nav-right">
                    <button
                        className="availability-back"
                        onClick={() => navigate("/dashboard")}
                    >
                        ← Dashboard
                    </button>
                </div>
            </header>

            <main className="bookings-main">

                {/* Page heading */}
                <section className="bookings-heading">
                    <div>
                        <span className="bookings-eyebrow">
                            THERAPIST PORTAL
                        </span>

                        <h1>My Bookings</h1>

                        <p>
                            Manage your client appointments and
                            keep track of scheduled sessions.
                        </p>
                    </div>

                    <div className="bookings-heading-icon">
                        ▤
                    </div>
                </section>

                {/* Booking summary */}
                <section className="bookings-summary">

                    <div className="bookings-summary-card">
                        <div className="bookings-summary-icon">
                            ▤
                        </div>

                        <div>
                            <span>Total bookings</span>
                            <h2>{bookings.length}</h2>
                        </div>
                    </div>

                    <div className="bookings-summary-card">
                        <div className="bookings-summary-icon">
                            ✓
                        </div>

                        <div>
                            <span>Active bookings</span>
                            <h2>
                                {
                                    bookings.filter(
                                        (item) => item.status === "booked"
                                    ).length
                                }
                            </h2>
                        </div>
                    </div>

                    <div className="bookings-summary-card">
                        <div className="bookings-summary-icon">
                            ×
                        </div>

                        <div>
                            <span>Cancelled bookings</span>
                            <h2>
                                {
                                    bookings.filter(
                                        (item) => item.status === "cancelled"
                                    ).length
                                }
                            </h2>
                        </div>
                    </div>

                </section>

                {/* Booking list */}
                <section className="bookings-list-section">

                    <div className="bookings-list-heading">
                        <div>
                            <h2>Appointment schedule</h2>
                            <p>
                                All your client session details in one place.
                            </p>
                        </div>

                        <button
                            className="bookings-refresh-btn"
                            onClick={getBookings}
                            disabled={loading}
                        >
                            ↻ Refresh
                        </button>
                    </div>

                    {loading ? (
                        <div className="bookings-empty">
                            <div className="loading-spinner"></div>
                            <p>Loading your bookings...</p>
                        </div>
                    ) : bookings.length === 0 ? (
                        <div className="bookings-empty">
                            <div className="bookings-empty-icon">
                                ▤
                            </div>

                            <h3>No bookings yet</h3>

                            <p>
                                Your client appointments will appear here
                                once someone books a session.
                            </p>

                            <button
                                className="unfazed-btn"
                                onClick={() => navigate("/dashboard")}
                            >
                                Back to dashboard
                            </button>
                        </div>
                    ) : (
                        <div className="bookings-list">

                            {bookings.map((booking) => (
                                <article
                                    className="booking-card"
                                    key={booking._id}
                                >
                                    <div className="booking-card-top">

                                        <div className="booking-client">
                                            <div className="booking-avatar">
                                                {booking.clientName
                                                    ?.charAt(0)
                                                    .toUpperCase()}
                                            </div>

                                            <div>
                                                <h3>
                                                    {booking.clientName}
                                                </h3>

                                                <p>
                                                    {booking.clientEmail}
                                                </p>
                                            </div>
                                        </div>

                                        <span
                                            className={`booking-status ${getStatusClass(
                                                booking.status
                                            )}`}
                                        >
                                            <span></span>
                                            {booking.status}
                                        </span>

                                    </div>

                                    <div className="booking-card-divider"></div>

                                    <div className="booking-details">

                                        <div className="booking-detail-item">
                                            <span className="booking-detail-icon">
                                                ▦
                                            </span>

                                            <div>
                                                <small>Session date</small>
                                                <strong>
                                                    {formatDate(booking.date)}
                                                </strong>
                                            </div>
                                        </div>

                                        <div className="booking-detail-item">
                                            <span className="booking-detail-icon">
                                                ◷
                                            </span>

                                            <div>
                                                <small>Session time</small>
                                                <strong>
                                                    {formatTime(booking.startTime)}
                                                    {" - "}
                                                    {formatTime(booking.endTime)}
                                                </strong>
                                            </div>
                                        </div>

                                    </div>

                                    {booking.status === "booked" && (
                                        <div className="booking-card-actions">
                                            <button
                                                className="booking-cancel-btn"
                                                onClick={() =>
                                                    handleCancel(booking._id)
                                                }
                                                disabled={
                                                    cancellingId === booking._id
                                                }
                                            >
                                                {cancellingId === booking._id
                                                    ? "Cancelling..."
                                                    : "Cancel booking"}
                                            </button>
                                        </div>
                                    )}

                                </article>
                            ))}

                        </div>
                    )}

                </section>

            </main>

            <footer className="dashboard-footer">
                <p>
                    © 2026 Unfazed · Your space for mental wellness
                </p>
            </footer>

        </div>
    );
}

export default Bookings;