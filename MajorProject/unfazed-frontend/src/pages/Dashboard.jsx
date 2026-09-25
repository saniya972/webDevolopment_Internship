import { useEffect, useState } from "react";
import api from "../api/axios";

function Dashboard() {
    const [therapist, setTherapist] = useState(null);
    const [error, setError] = useState("");

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

    if (error) {
        return <h2>{error}</h2>;
    }

    if (!therapist) {
        return <h2>Loading...</h2>;
    }

    return (
        <div>
            <h1>Unfazed Dashboard</h1>

            <h2>Welcome, {therapist.name}</h2>

            <p>Email: {therapist.email}</p>

            <p>Bio: {therapist.bio}</p>

            <h3>Specializations</h3>
            <ul>
                {therapist.specializations.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>

            <h3>Languages</h3>
            <ul>
                {therapist.languages.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
}

export default Dashboard;