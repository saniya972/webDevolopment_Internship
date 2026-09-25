import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

function ClientDetails() {
    const { id } = useParams();
    const [client, setClient] = useState(null);

    useEffect(() => {
        const getClient = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await api.get(`/clients/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setClient(response.data.client);

            } catch (error) {
                console.log(error);
            }
        };

        getClient();
    }, [id]);

    if (!client) {
        return <p>Loading client...</p>;
    }

    return (
        <div>
            <h1>Client Details</h1>

            <h2>{client.name}</h2>

            <p>Email: {client.email}</p>

                <p>Phone: {client.phone}</p>

<p>Age: {client.age}</p>

<p>
    Reason for Consultation: {client.reasonForConsultation}
</p>

<p>Notes: {client.notes}</p>
        </div>
    );
}

export default ClientDetails;