
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import "../App.css";

function ClientBooking() {
    const { slug } = useParams();

    const [clientName, setClientName] = useState("");
    const [clientEmail, setClientEmail] = useState("");
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const [therapistId, setTherapistId] = useState("");
    const [therapist, setTherapist] = useState(null);
    const [availability, setAvailability] = useState([]);
    const [clientTimezone, setClientTimezone] = useState("");
    const [bookedSlots, setBookedSlots] = useState([]);

    const [loading, setLoading] = useState(true);
    const [booking, setBooking] = useState(false);
    const [error, setError] = useState("");

    // Today's date in YYYY-MM-DD format
    const today = new Date();
    const minDate =
        today.getFullYear() +
        "-" +
        String(today.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(today.getDate()).padStart(2, "0");

    // Get therapist and availability
    useEffect(() => {
        const getTherapist = async () => {
            try {
                setLoading(true);
                setError("");

                const timezone =
                    Intl.DateTimeFormat().resolvedOptions().timeZone;

                setClientTimezone(timezone);

                const response = await api.get(
                    `/auth/public/${slug}`
                );

                const therapistData = response.data.therapist;

                setTherapist(therapistData);
                setTherapistId(therapistData._id);

                const availabilityResponse = await api.get(
                    `/availability/public/${slug}`
                );

                setAvailability(
                    availabilityResponse.data.availability || []
                );
            } catch (error) {
                console.error(error);
                setError(
                    error.response?.data?.message ||
                    "Unable to load therapist details. Please try again."
                );
            } finally {
                setLoading(false);
            }
        };

        getTherapist();
    }, [slug]);

    // Get already booked slots for selected date
    useEffect(() => {
        const getBookedSlots = async () => {
            if (!date || !therapistId) {
                setBookedSlots([]);
                return;
            }

            try {
                const response = await api.get(
                    `/bookings/public?therapistId=${therapistId}&date=${date}`
                );

                setBookedSlots(response.data.bookings || []);
            } catch (error) {
                console.error(error);
                setBookedSlots([]);
            }
        };

        getBookedSlots();
    }, [date, therapistId]);

    // Check whether the selected day is available
    const isAvailableDay = (selectedDate) => {
        if (!selectedDate || availability.length === 0) {
            return false;
        }

        const [year, month, day] = selectedDate
            .split("-")
            .map(Number);

        const dateObject = new Date(
            Date.UTC(year, month - 1, day)
        );

        const selectedDay = dateObject.toLocaleDateString(
            "en-US",
            {
                weekday: "long",
                timeZone: "UTC"
            }
        );

        return availability.some(
            (item) =>
                item.day.trim().toLowerCase() ===
                selectedDay.toLowerCase()
        );
    };

    // Generate available one-hour slots
    const timeSlots = [];

    if (date && isAvailableDay(date)) {
        const [year, month, day] = date.split("-").map(Number);

        const dateObject = new Date(
            Date.UTC(year, month - 1, day)
        );

        const selectedDay = dateObject.toLocaleDateString(
            "en-US",
            {
                weekday: "long",
                timeZone: "UTC"
            }
        );

        const selectedAvailability = availability.find(
            (item) =>
                item.day.trim().toLowerCase() ===
                selectedDay.toLowerCase()
        );

        if (selectedAvailability) {
            const startParts =
                selectedAvailability.startTime.split(":").map(Number);

            const endParts =
                selectedAvailability.endTime.split(":").map(Number);

            const startMinutes =
                startParts[0] * 60 + (startParts[1] || 0);

            const endMinutes =
                endParts[0] * 60 + (endParts[1] || 0);

            for (
                let start = startMinutes;
                start + 60 <= endMinutes;
                start += 60
            ) {
                const slotStartHour = String(
                    Math.floor(start / 60)
                ).padStart(2, "0");

                const slotStartMinute = String(
                    start % 60
                ).padStart(2, "0");

                const slotEndHour = String(
                    Math.floor((start + 60) / 60)
                ).padStart(2, "0");

                const slotEndMinute = String(
                    (start + 60) % 60
                ).padStart(2, "0");

                const slotStartTime =
                    `${slotStartHour}:${slotStartMinute}`;

                const slotEndTime =
                    `${slotEndHour}:${slotEndMinute}`;

                const isBooked = bookedSlots.some(
                    (booking) =>
                        booking.status === "booked" &&
                        booking.startTime < slotEndTime &&
                        booking.endTime > slotStartTime
                );

                if (!isBooked) {
                    timeSlots.push({
                        startTime: slotStartTime,
                        endTime: slotEndTime
                    });
                }
            }
        }
    }

    // Book a session
    const handleBooking = async (e) => {
        e.preventDefault();

        if (!isAvailableDay(date)) {
            alert("Therapist is not available on this day.");
            return;
        }

        if (!startTime || !endTime) {
            alert("Please select an available time slot.");
            return;
        }

        try {
            setBooking(true);

            await api.post("/bookings/public", {
                therapistId,
                clientName,
                clientEmail,
                date,
                startTime,
                endTime,
                clientTimezone
            });

            alert("Booking created successfully!");

            setClientName("");
            setClientEmail("");
            setDate("");
            setStartTime("");
            setEndTime("");
            setBookedSlots([]);
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Booking failed. Please try again."
            );
        } finally {
            setBooking(false);
        }
    };

    if (loading) {
        return (
            <div className="booking-page">
                <div className="booking-loading">
                    <div className="booking-spinner"></div>
                    <p>Loading therapist details...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="booking-page">
                <div className="booking-error">
                    <h2>Unable to load page</h2>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="booking-page">
            <div className="booking-layout">

                {/* Left side */}
                <div className="booking-intro">
                    <div className="booking-brand">
                        <span className="booking-brand-icon">U</span>
                        <span>Unfazed</span>
                    </div>

                    <div className="booking-intro-content">
                        <span className="booking-eyebrow">
                            YOUR WELLNESS JOURNEY
                        </span>

                        <h1>
                            Take the first step toward a
                            <span> healthier you.</span>
                        </h1>

                        <p className="booking-intro-text">
                            Your mental well-being matters.
                            Schedule a session with your therapist
                            and make time for yourself.
                        </p>

                        <div className="booking-benefits">
                            <div className="booking-benefit">
                                <span className="benefit-icon">✓</span>
                                <div>
                                    <strong>Personalized care</strong>
                                    <p>Sessions focused on your needs.</p>
                                </div>
                            </div>

                            <div className="booking-benefit">
                                <span className="benefit-icon">✓</span>
                                <div>
                                    <strong>Convenient scheduling</strong>
                                    <p>Choose a time that works for you.</p>
                                </div>
                            </div>

                            <div className="booking-benefit">
                                <span className="benefit-icon">✓</span>
                                <div>
                                    <strong>A safe space</strong>
                                    <p>Take a moment for your mental health.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <p className="booking-footer-note">
                        Your journey to feeling better starts here.
                    </p>
                </div>

                {/* Right side */}
                <div className="booking-form-section">
                    <div className="booking-form-card">

                        <div className="booking-form-heading">
                            <span className="booking-form-label">
                                APPOINTMENT
                            </span>

                            <h2>Book a session</h2>

                            <p>
                                Fill in your details and select
                                an available date and time.
                            </p>
                        </div>

                        {therapist && (
                            <div className="booking-therapist">
                                <div className="therapist-avatar">
                                    {therapist.name
                                        ? therapist.name.charAt(0).toUpperCase()
                                        : "T"}
                                </div>

                                <div>
                                    <span className="therapist-label">
                                        YOUR THERAPIST
                                    </span>

                                    <h3>{therapist.name}</h3>

                                    {therapist.specializations?.length > 0 && (
                                        <p>
                                            {therapist.specializations.join(", ")}
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}

                        <div className="booking-availability">
                            <h3>
                                <span className="availability-dot"></span>
                                Weekly availability
                            </h3>

                            {availability.length === 0 ? (
                                <p className="availability-empty">
                                    No availability has been added yet.
                                    Please check back later.
                                </p>
                            ) : (
                                <div className="availability-list">
                                    {availability.map((item) => (
                                        <div
                                            className="availability-item"
                                            key={item._id}
                                        >
                                            <span>{item.day}</span>
                                            <strong>
                                                {item.startTime} – {item.endTime}
                                            </strong>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <form
                            className="client-booking-form"
                            onSubmit={handleBooking}
                        >
                            <div className="booking-section-title">
                                <span>01</span>
                                <h3>Your details</h3>
                            </div>

                            <div className="booking-field">
                                <label htmlFor="clientName">
                                    Full name
                                </label>

                                <input
                                    id="clientName"
                                    type="text"
                                    placeholder="Enter your full name"
                                    value={clientName}
                                    onChange={(e) =>
                                        setClientName(e.target.value)
                                    }
                                    required
                                />
                            </div>

                            <div className="booking-field">
                                <label htmlFor="clientEmail">
                                    Email address
                                </label>

                                <input
                                    id="clientEmail"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={clientEmail}
                                    onChange={(e) =>
                                        setClientEmail(e.target.value)
                                    }
                                    required
                                />
                            </div>

                            <div className="booking-section-title booking-date-title">
                                <span>02</span>
                                <h3>Choose your session</h3>
                            </div>

                            <div className="booking-field">
                                <label htmlFor="bookingDate">
                                    Preferred date
                                </label>

                                <input
                                    id="bookingDate"
                                    type="date"
                                    value={date}
                                    min={minDate}
                                    onChange={(e) => {
                                        setDate(e.target.value);
                                        setStartTime("");
                                        setEndTime("");
                                    }}
                                    required
                                />
                            </div>

                            {date && !isAvailableDay(date) && (
                                <div className="booking-notice">
                                    The therapist is not available on this
                                    day. Please select another date.
                                </div>
                            )}

                            {date && isAvailableDay(date) && (
                                <div className="booking-field">
                                    <label htmlFor="bookingTime">
                                        Available time slot
                                    </label>

                                    <select
                                        id="bookingTime"
                                        value={startTime}
                                        onChange={(e) => {
                                            const selectedStartTime =
                                                e.target.value;

                                            setStartTime(selectedStartTime);

                                            const selectedSlot =
                                                timeSlots.find(
                                                    (slot) =>
                                                        slot.startTime ===
                                                        selectedStartTime
                                                );

                                            setEndTime(
                                                selectedSlot
                                                    ? selectedSlot.endTime
                                                    : ""
                                            );
                                        }}
                                        required
                                    >
                                        <option value="">
                                            Select a time
                                        </option>

                                        {timeSlots.map((slot, index) => (
                                            <option
                                                key={index}
                                                value={slot.startTime}
                                            >
                                                {slot.startTime} – {slot.endTime}
                                            </option>
                                        ))}
                                    </select>

                                    {timeSlots.length === 0 && (
                                        <p className="booking-no-slots">
                                            No time slots are available
                                            for this date.
                                        </p>
                                    )}
                                </div>
                            )}

                            <div className="booking-timezone">
                                <span>◷</span>
                                <div>
                                    <strong>Your timezone</strong>
                                    <p>
                                        {clientTimezone || "Not detected"}
                                    </p>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="booking-submit-btn"
                                disabled={
                                    booking ||
                                    availability.length === 0 ||
                                    !isAvailableDay(date) ||
                                    timeSlots.length === 0
                                }
                            >
                                {booking
                                    ? "Booking your session..."
                                    : "Confirm booking →"}
                            </button>

                            <p className="booking-secure-note">
                                Please check your selected date and time
                                before confirming.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ClientBooking;