import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

function ClientBooking() {
    const [clientName, setClientName] = useState("");
    const [clientEmail, setClientEmail] = useState("");
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const { slug } = useParams();

    const [therapistId, setTherapistId] = useState("");
    const [availability, setAvailability] = useState([]);
    const [clientTimezone, setClientTimezone] = useState("");
    const [bookedSlots, setBookedSlots] = useState([]);

    // Get therapist and availability
    useEffect(() => {
        const getTherapist = async () => {
            try {
                const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

setClientTimezone(timezone);
                // Get therapist using slug
                const response = await api.get(
                    `/auth/public/${slug}`
                );

                const therapist = response.data.therapist;

                // Save therapist ID
                setTherapistId(therapist._id);

                // Get therapist availability
                const availabilityResponse = await api.get(
                    `/availability/public/${slug}`
                );

                const availableSlots =
                    availabilityResponse.data.availability;

                setAvailability(availableSlots);

                console.log("AVAILABILITY:", availableSlots);

            } catch (error) {
                console.log(error);
            }
        };

        getTherapist();
    }, [slug]);
        

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

            setBookedSlots(response.data.bookings);
            console.log("BOOKED SLOTS:", response.data.bookings);
            console.log("BOOKING DETAILS:", JSON.stringify(response.data.bookings, null, 2));
        } catch (error) {
            console.log(error);
        }
    };

    getBookedSlots();
}, [date, therapistId]);
    // Check whether selected date is available
    const isAvailableDay = (selectedDate) => {
        if (!selectedDate || availability.length === 0) {
            return true;
        }

        const dateObject = new Date(
            selectedDate + "T00:00:00"
        );

        const day = dateObject.toLocaleDateString(
            "en-US",
            {
                weekday: "long"
            }
        );

        return availability.some(
            (item) => item.day === day
        );
    };

    // Book session
    const handleBooking = async (e) => {
        e.preventDefault();
        if (!isAvailableDay(date)) {
    alert("Therapist is not available on this day");
    return;
}

        try {
            await api.post("/bookings/public", {
    therapistId: therapistId,
    clientName,
    clientEmail,
    date,
    startTime,
    endTime,
    clientTimezone: clientTimezone
});

            alert("Booking created successfully!");

            setClientName("");
            setClientEmail("");
            setDate("");

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Booking failed"
            );
        }
    };
     

      const timeSlots = [];

if (date) {
    // Get weekday from selected date
    const [year, month, day] = date.split("-").map(Number);

    const dateObject = new Date(Date.UTC(year, month - 1, day));

    const selectedDay = dateObject.toLocaleDateString("en-US", {
        weekday: "long",
        timeZone: "UTC"
    });

    console.log("SELECTED DAY:", selectedDay);
    console.log("AVAILABILITY:", availability);

    const selectedAvailability = availability.find(
        (item) => item.day.trim().toLowerCase() === selectedDay.toLowerCase()
    );

    console.log("MATCHED AVAILABILITY:", selectedAvailability);

    if (selectedAvailability) {
        let start = parseInt(
            selectedAvailability.startTime.split(":")[0]
        );

        const end = parseInt(
            selectedAvailability.endTime.split(":")[0]
        );

        console.log("START HOUR:", start);
console.log("END HOUR:", end);

        while (start < end) {
            const startHour = String(start).padStart(2, "0");
            const endHour = String(start + 1).padStart(2, "0");

            const slotStartTime = `${startHour}:00`;
            const slotEndTime = `${endHour}:00`;

            const isBooked = bookedSlots.some((booking) => {
                return (
                    booking.status === "booked" &&
                    booking.startTime < slotEndTime &&
                    booking.endTime > slotStartTime
                );
            });

            if (!isBooked) {
                timeSlots.push({
                    startTime: slotStartTime,
                    endTime: slotEndTime
                });
            }

            start++;
        }
    }
}

console.log("GENERATED TIME SLOTS:", timeSlots);
    return (
        <div>
            <h1>Book a Session</h1>

            <h2>Available Times</h2>

            {availability.length === 0 ? (
                <p>No availability found.</p>
            ) : (
                availability.map((item) => (
                    <div key={item._id}>
                        <p>
                            <strong>{item.day}</strong>
                            {" : "}
                            {item.startTime} - {item.endTime}
                        </p>
                    </div>
                ))
            )}
             
             <p>
    Your timezone: {clientTimezone}
</p>

            <form onSubmit={handleBooking}>

                {/* Client Name */}
                <input
                    type="text"
                    placeholder="Your Name"
                    value={clientName}
                    onChange={(e) =>
                        setClientName(e.target.value)
                    }
                    required
                />

                <br /><br />

                {/* Client Email */}
                <input
                    type="email"
                    placeholder="Your Email"
                    value={clientEmail}
                    onChange={(e) =>
                        setClientEmail(e.target.value)
                    }
                    required
                />

                <br /><br />

                {/* Date */}
                <label>Date:</label>

                 <input
    type="date"
    value={date}
    min="2026-09-25"
    onChange={(e) => setDate(e.target.value)}
    required
/>
                <br /><br />

                    {/* Available Time Slot */}
<label>Available Time Slot:</label>

<select
    value={startTime}
    onChange={(e) => {
        const selectedStartTime = e.target.value;
        setStartTime(selectedStartTime);

        const selectedSlot = timeSlots.find(
            (slot) => slot.startTime === selectedStartTime
        );

        if (selectedSlot) {
            setEndTime(selectedSlot.endTime);
        }
    }}
    required
>
    <option value="">Select a time</option>

    {timeSlots.map((slot, index) => (
        <option
            key={index}
            value={slot.startTime}
        >
            {slot.startTime} - {slot.endTime}
        </option>
    ))}
</select>
                <br /><br />

                <button type="submit">
                    Book Session
                </button>

            </form>
        </div>
    );
}

export default ClientBooking;