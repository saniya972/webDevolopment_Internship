import { useEffect, useState } from "react";
import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import api from "../api/axios";

const locales = {
    "en-US": enUS
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
});

function Calendar() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
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

        getBookings();
    }, []);

    const events = bookings.map((booking) => ({
        title: booking.clientName,
        start: new Date(`${booking.date}T${booking.startTime}`),
        end: new Date(`${booking.date}T${booking.endTime}`)
    }));

    return (
        <div>
            <h1>Calendar</h1>

            <div style={{ height: "600px" }}>
                <BigCalendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    views={["month", "week", "day"]}
                    defaultView="month"
                />
            </div>
        </div>
    );
}

export default Calendar;