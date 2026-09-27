
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../App.css";

function Availability() {
    const [day, setDay] = useState("Monday");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [availability, setAvailability] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const navigate = useNavigate();

    const days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
    ];

    // GET availability
    const getAvailability = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await api.get("/availability", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setAvailability(response.data.availability || []);

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAvailability();
    }, []);

    // ADD availability
    const handleAddAvailability = async (e) => {
        e.preventDefault();

        if (!startTime || !endTime) {
            alert("Please select start and end time");
            return;
        }

        if (startTime >= endTime) {
            alert("End time must be after start time");
            return;
        }

        try {
            setSaving(true);

            const token = localStorage.getItem("token");

            await api.post(
                "/availability",
                {
                    day,
                    startTime,
                    endTime
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Availability added successfully!");

            setStartTime("");
            setEndTime("");

            await getAvailability();

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to add availability"
            );
        } finally {
            setSaving(false);
        }
    };

    // DELETE availability
    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this availability?"
        );

        if (!confirmed) return;

        try {
            const token = localStorage.getItem("token");

            await api.delete(`/availability/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            alert("Availability deleted successfully!");

            await getAvailability();

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to delete availability"
            );
        }
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

    const getDayCount = (selectedDay) => {
        return availability.filter(
            (item) => item.day === selectedDay
        ).length;
    };

    return (
        <div className="availability-page">

            {/* Navbar */}
            <header className="dashboard-navbar">
                <div
                    className="dashboard-brand availability-brand"
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

            <main className="availability-main">

                {/* Page heading */}
                <section className="availability-heading">
                    <div>
                        <span className="availability-eyebrow">
                            THERAPIST PORTAL
                        </span>

                        <h1>Manage your availability</h1>

                        <p>
                            Set your weekly schedule so clients can
                            book sessions at convenient times.
                        </p>
                    </div>

                    <div className="availability-heading-icon">
                        ◷
                    </div>
                </section>

                {/* Summary cards */}
                <section className="availability-summary">

                    <div className="availability-summary-card">
                        <div className="availability-summary-icon">
                            ◷
                        </div>

                        <div>
                            <span>Total time slots</span>
                            <h2>{availability.length}</h2>
                        </div>
                    </div>

                    <div className="availability-summary-card">
                        <div className="availability-summary-icon">
                            ▦
                        </div>

                        <div>
                            <span>Available days</span>
                            <h2>
                                {
                                    new Set(
                                        availability.map(
                                            (item) => item.day
                                        )
                                    ).size
                                }
                            </h2>
                        </div>
                    </div>

                </section>

                {/* Add availability form */}
                <section className="availability-form-card">

                    <div className="availability-section-heading">
                        <div className="availability-section-icon">
                            +
                        </div>

                        <div>
                            <h2>Add availability</h2>
                            <p>
                                Choose a day and your preferred session
                                timings.
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleAddAvailability}>

                        <div className="availability-form-grid">

                            <div className="availability-field">
                                <label htmlFor="availability-day">
                                    Day of the week
                                </label>

                                <select
                                    id="availability-day"
                                    value={day}
                                    onChange={(e) =>
                                        setDay(e.target.value)
                                    }
                                >
                                    {days.map((item) => (
                                        <option
                                            key={item}
                                            value={item}
                                        >
                                            {item}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="availability-field">
                                <label htmlFor="start-time">
                                    Start time
                                </label>

                                <input
                                    id="start-time"
                                    type="time"
                                    value={startTime}
                                    onChange={(e) =>
                                        setStartTime(e.target.value)
                                    }
                                    required
                                />
                            </div>

                            <div className="availability-field">
                                <label htmlFor="end-time">
                                    End time
                                </label>

                                <input
                                    id="end-time"
                                    type="time"
                                    value={endTime}
                                    onChange={(e) =>
                                        setEndTime(e.target.value)
                                    }
                                    required
                                />
                            </div>

                        </div>

                        <div className="availability-form-footer">
                            <p>
                                <span>ⓘ</span>
                                Make sure your end time is after
                                your start time.
                            </p>

                            <button
                                type="submit"
                                className="availability-add-btn"
                                disabled={saving}
                            >
                                {saving ? "Adding..." : "+ Add time slot"}
                            </button>
                        </div>

                    </form>
                </section>

                {/* Weekly schedule */}
                <section className="availability-schedule">

                    <div className="availability-schedule-heading">
                        <div>
                            <h2>Your weekly schedule</h2>
                            <p>
                                View and manage your available sessions.
                            </p>
                        </div>

                        <span className="availability-count">
                            {availability.length} slots
                        </span>
                    </div>

                    {loading ? (
                        <div className="availability-empty">
                            <div className="loading-spinner"></div>
                            <p>Loading your schedule...</p>
                        </div>
                    ) : availability.length === 0 ? (
                        <div className="availability-empty">
                            <div className="availability-empty-icon">
                                ◷
                            </div>

                            <h3>No availability added yet</h3>

                            <p>
                                Add your first time slot using the
                                form above.
                            </p>
                        </div>
                    ) : (
                        <div className="availability-week-grid">

                            {days.map((selectedDay) => {
                                const daySlots = availability.filter(
                                    (item) => item.day === selectedDay
                                );

                                return (
                                    <div
                                        className={`availability-day-card ${
                                            daySlots.length > 0
                                                ? "has-slots"
                                                : ""
                                        }`}
                                        key={selectedDay}
                                    >
                                        <div className="availability-day-header">
                                            <h3>{selectedDay}</h3>

                                            <span>
                                                {getDayCount(selectedDay)}
                                            </span>
                                        </div>

                                        {daySlots.length > 0 ? (
                                            <div className="availability-slot-list">
                                                {daySlots.map((item) => (
                                                    <div
                                                        className="availability-slot"
                                                        key={item._id}
                                                    >
                                                        <div className="availability-slot-time">
                                                            <span className="slot-dot"></span>

                                                            <div>
                                                                <strong>
                                                                    {formatTime(item.startTime)}
                                                                </strong>

                                                                <small>
                                                                    to {formatTime(item.endTime)}
                                                                </small>
                                                            </div>
                                                        </div>

                                                        <button
                                                            className="availability-delete-btn"
                                                            onClick={() =>
                                                                handleDelete(item._id)
                                                            }
                                                            title="Delete availability"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="availability-no-slots">
                                                No slots added
                                            </p>
                                        )}
                                    </div>
                                );
                            })}

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

export default Availability;