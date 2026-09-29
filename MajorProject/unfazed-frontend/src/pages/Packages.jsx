
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
        <div className="packages-page">
            <div className="packages-header">
                <span className="packages-tag">
                    UNFAZED FOR THERAPISTS
                </span>

                <h1>Therapy Packages</h1>

                <p>
                    Create and manage therapy packages for your clients.
                </p>
            </div>

            <div className="packages-content">
                <section className="package-form-card">
                    <div className="package-section-heading">
                        <div>
                            <h2>Create Package</h2>
                            <p>
                                Set up sessions, pricing and validity.
                            </p>
                        </div>

                        <div className="package-heading-icon">
                            +
                        </div>
                    </div>

                    <form
                        className="package-form"
                        onSubmit={handleSubmit}
                    >
                        <div className="package-form-group">
                            <label>Package Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="e.g. Stress Management"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="package-form-group">
                            <label>Description</label>
                            <textarea
                                name="description"
                                placeholder="Describe what this package includes..."
                                value={formData.description}
                                onChange={handleChange}
                                rows="4"
                            />
                        </div>

                        <div className="package-form-row">
                            <div className="package-form-group">
                                <label>Number of Sessions</label>
                                <input
                                    type="number"
                                    name="sessions"
                                    min="1"
                                    placeholder="e.g. 5"
                                    value={formData.sessions}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="package-form-group">
                                <label>Price (₹)</label>
                                <input
                                    type="number"
                                    name="price"
                                    min="0"
                                    placeholder="e.g. 2500"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="package-form-group">
                            <label>Validity (Days)</label>
                            <input
                                type="number"
                                name="validityDays"
                                min="1"
                                value={formData.validityDays}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="package-submit-button"
                        >
                            Create Package
                            <span> → </span>
                        </button>
                    </form>
                </section>

                <section className="my-packages-section">
                    <div className="package-section-heading">
                        <div>
                            <h2>My Packages</h2>
                            <p>
                                Your therapy packages in one place.
                            </p>
                        </div>

                        <span className="package-count">
                            {packages.length}{" "}
                            {packages.length === 1 ? "Package" : "Packages"}
                        </span>
                    </div>

                    {packages.length === 0 ? (
                        <div className="packages-empty">
                            <div className="packages-empty-icon">
                                📦
                            </div>

                            <h3>No packages found</h3>

                            <p>
                                Create your first therapy package
                                using the form.
                            </p>
                        </div>
                    ) : (
                        <div className="packages-list">
                            {packages.map((pkg) => (
                                <div
                                    className="package-item-card"
                                    key={pkg._id}
                                >
                                    <div className="package-item-top">
                                        <div className="package-item-icon">
                                            ✦
                                        </div>

                                        <span className="package-item-badge">
                                            Therapy Package
                                        </span>
                                    </div>

                                    <h3>{pkg.name}</h3>

                                    <p className="package-item-description">
                                        {pkg.description ||
                                            "No description provided."}
                                    </p>

                                    <div className="package-item-details">
                                        <div>
                                            <span>Sessions</span>
                                            <strong>{pkg.sessions}</strong>
                                        </div>

                                        <div>
                                            <span>Validity</span>
                                            <strong>
                                                {pkg.validityDays} days
                                            </strong>
                                        </div>
                                    </div>

                                    <div className="package-item-price">
                                        <span>Package Price</span>
                                        <strong>₹{pkg.price}</strong>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}

export default Packages;