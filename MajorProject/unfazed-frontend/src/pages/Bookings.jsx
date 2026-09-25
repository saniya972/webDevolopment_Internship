import { useEffect, useState } from "react";
import api from "../api/axios";

function Bookings() {
    const [bookings, setBookings] = useState([]);

    const getBookings = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await api.get("/bookings", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setBookings(response.data.bookings);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getBookings();
    }, []);

    return (
        <div>
            <h1>Bookings</h1>

            {bookings.length === 0 ? (
                <p>No bookings found.</p>
            ) : (
                bookings.map((booking) => (
                    <div key={booking._id}>
                        <h3>{booking.clientName}</h3>

                        <p>
                            Email: {booking.clientEmail}
                        </p>

                        <p>
                            Date: {booking.date}
                        </p>

                        <p>
                            Time: {booking.startTime} - {booking.endTime}
                        </p>

                            <p>
    Status: {booking.status}
</p>

{booking.status === "booked" && (
    <button
        onClick={async () => {
            try {
                const token = localStorage.getItem("token");

                await api.delete(
                    `/bookings/${booking._id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                alert("Booking cancelled successfully!");

                getBookings();

            } catch (error) {
                alert(
                    error.response?.data?.message ||
                    "Failed to cancel booking"
                );
            }
        }}
    >
        Cancel Booking
    </button>
)}

<hr />

                        <hr />
                    </div>
                ))
            )}
        </div>
    );
}

export default Bookings;