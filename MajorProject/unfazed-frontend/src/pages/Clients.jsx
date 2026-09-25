
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Clients() {
    const [clients, setClients] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [message, setMessage] = useState("");

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        age: "",
        reasonForConsultation: "",
        notes: ""
    });

    const navigate = useNavigate();

    const getClients = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await api.get("/clients", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setClients(response.data.clients);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getClients();
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            const token = localStorage.getItem("token");

            await api.post("/clients", {
                ...form,
                age: form.age ? Number(form.age) : null
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setMessage("Client added successfully!");

            setForm({
                name: "",
                email: "",
                phone: "",
                age: "",
                reasonForConsultation: "",
                notes: ""
            });

            setShowForm(false);
            getClients();

        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Failed to add client"
            );
        }
    };

    return (
        <div>
            <h1>Clients</h1>

            <button onClick={() => setShowForm(!showForm)}>
                {showForm ? "Cancel" : "Add Client"}
            </button>

            {message && <p>{message}</p>}

            {showForm && (
                <form onSubmit={handleSubmit}>
                    <h2>Add New Client</h2>

                    <input
                        name="name"
                        placeholder="Client Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                    <br /><br />

                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                    <br /><br />

                    <input
                        name="phone"
                        placeholder="Phone"
                        value={form.phone}
                        onChange={handleChange}
                    />
                    <br /><br />

                    <input
                        name="age"
                        type="number"
                        placeholder="Age"
                        value={form.age}
                        onChange={handleChange}
                    />
                    <br /><br />

                    <textarea
                        name="reasonForConsultation"
                        placeholder="Reason for consultation"
                        value={form.reasonForConsultation}
                        onChange={handleChange}
                    />
                    <br /><br />

                    <textarea
                        name="notes"
                        placeholder="Notes"
                        value={form.notes}
                        onChange={handleChange}
                    />
                    <br /><br />

                    <button type="submit">
                        Save Client
                    </button>
                </form>
            )}

            <hr />

            {clients.length === 0 ? (
                <p>No clients found.</p>
            ) : (
                clients.map((client) => (
                    <div key={client._id}>
                        <h3
                            onClick={() =>
                                navigate(`/clients/${client._id}`)
                            }
                            style={{ cursor: "pointer" }}
                        >
                            {client.name}
                        </h3>

                        <p>Email: {client.email}</p>
                        <p>Phone: {client.phone}</p>
                        <p>Notes: {client.notes}</p>

                        <hr />
                    </div>
                ))
            )}
        </div>
    );
}

export default Clients;