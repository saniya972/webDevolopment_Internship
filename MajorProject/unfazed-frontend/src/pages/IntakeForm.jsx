import { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

function IntakeForm() {
    const { therapistId } = useParams();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        age: "",
        reasonForConsultation: "",
        notes: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
              await api.post("/clients/intake", {
    ...formData,
    age: Number(formData.age),
    therapistId
});

            alert("Intake form submitted successfully!");

            setFormData({
                name: "",
                email: "",
                phone: "",
                age: "",
                reasonForConsultation: "",
                notes: ""
            });

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to submit intake form"
            );
        }
    };

    return (
        <div>
            <h1>Client Intake Form</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Full Name</label>
                    <br />
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <br />

                <div>
                    <label>Email</label>
                    <br />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <br />

                <div>
                    <label>Phone</label>
                    <br />
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>

                <br />

                <div>
                    <label>Age</label>
                    <br />
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                    />
                </div>

                <br />

                <div>
                    <label>Reason for Consultation</label>
                    <br />
                    <textarea
                        name="reasonForConsultation"
                        value={formData.reasonForConsultation}
                        onChange={handleChange}
                    />
                </div>

                <br />

                <div>
                    <label>Additional Notes</label>
                    <br />
                    <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                    />
                </div>

                <br />

                <button type="submit">
                    Submit Intake Form
                </button>
            </form>
        </div>
    );
}

export default IntakeForm;