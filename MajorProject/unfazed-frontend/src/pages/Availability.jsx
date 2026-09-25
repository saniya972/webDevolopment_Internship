import { useEffect, useState } from "react";
import api from "../api/axios";

function Availability() {
    const [day, setDay] = useState("Monday");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [availability, setAvailability] = useState([]);

    // GET availability
    const getAvailability = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await api.get("/availability", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setAvailability(response.data.availability);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAvailability();
    }, []);

    // ADD availability
    const handleAddAvailability = async (e) => {
        e.preventDefault();

        try {
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

            getAvailability();

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to add availability"
            );
        }
    };

    // DELETE availability
    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem("token");

            await api.delete(`/availability/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            alert("Availability deleted successfully!");

            getAvailability();

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to delete availability"
            );
        }
    };

    return (
        <div>
            <h1>Availability</h1>

            <form onSubmit={handleAddAvailability}>

                <label>Day:</label>
                <select
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                >
                    <option>Monday</option>
                    <option>Tuesday</option>
                    <option>Wednesday</option>
                    <option>Thursday</option>
                    <option>Friday</option>
                    <option>Saturday</option>
                    <option>Sunday</option>
                </select>

                <br /><br />

                <label>Start Time:</label>
                <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    required
                />

                <br /><br />

                <label>End Time:</label>
                <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    required
                />

                <br /><br />

                <button type="submit">
                    Add Availability
                </button>

            </form>

            <hr />

            <h2>Your Availability</h2>

            {availability.length === 0 ? (
                <p>No availability added.</p>
            ) : (
                <ul>
                    {availability.map((item) => (
                        <li key={item._id}>
                            {item.day} — {item.startTime} to {item.endTime}

                            {" "}

                            <button
                                onClick={() => handleDelete(item._id)}
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Availability;