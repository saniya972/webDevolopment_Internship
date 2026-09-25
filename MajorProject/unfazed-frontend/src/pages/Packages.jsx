import { useEffect, useState } from "react";
import api from "../api/axios";

function Packages() {
    const [packages, setPackages] = useState([]);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        sessions: "",
        price: "",
        validityDays: 30
    });

    const getPackages = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await api.get("/packages", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setPackages(response.data.packages);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getPackages();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            await api.post(
                "/packages",
                {
                    ...formData,
                    sessions: Number(formData.sessions),
                    price: Number(formData.price),
                    validityDays: Number(formData.validityDays)
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Package created successfully!");

            setFormData({
                name: "",
                description: "",
                sessions: "",
                price: "",
                validityDays: 30
            });

            getPackages();

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to create package"
            );
        }
    };

    return (
        <div>
            <h1>Therapy Packages</h1>

            <h2>Create Package</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Package Name</label>
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
                    <label>Description</label>
                    <br />
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>

                <br />

                <div>
                    <label>Number of Sessions</label>
                    <br />
                    <input
                        type="number"
                        name="sessions"
                        value={formData.sessions}
                        onChange={handleChange}
                        required
                    />
                </div>

                <br />

                <div>
                    <label>Price</label>
                    <br />
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </div>

                <br />

                <div>
                    <label>Validity (Days)</label>
                    <br />
                    <input
                        type="number"
                        name="validityDays"
                        value={formData.validityDays}
                        onChange={handleChange}
                        required
                    />
                </div>

                <br />

                <button type="submit">
                    Create Package
                </button>
            </form>

            <hr />

            <h2>My Packages</h2>

            {packages.length === 0 ? (
                <p>No packages found.</p>
            ) : (
                packages.map((pkg) => (
                    <div key={pkg._id}>
                        <h3>{pkg.name}</h3>
                        <p>{pkg.description}</p>
                        <p>Sessions: {pkg.sessions}</p>
                        <p>Price: ₹{pkg.price}</p>
                        <p>Validity: {pkg.validityDays} days</p>
                        <hr />
                    </div>
                ))
            )}
        </div>
    );
}

export default Packages;