
import { useEffect, useState } from "react";
import api from "../api/axios";

function Subscription() {
    const [subscription, setSubscription] = useState(null);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getSubscription = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await api.get("/subscriptions", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setSubscription(response.data.subscription);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        getSubscription();
    }, []);

    const plans = [
        {
            name: "Free",
            price: "₹0",
            description: "For therapists getting started",
            features: [
                "Therapist profile",
                "Availability management",
                "Client management (up to 5)",
                "Appointment bookings"
            ]
        },
        {
            name: "Basic",
            price: "Demo",
            description: "For growing therapy practices",
            features: [
                "Everything in Free",
                "Up to 25 active clients",
                "Basic analytics",
                "Session notes",
                "Packages"
            ]
        },
        {
            name: "Pro",
            price: "Demo",
            description: "For established therapy practices",
            features: [
                "Everything in Basic",
                "Up to 100 active clients",
                "Advanced analytics",
                "Client messaging"
            ]
        }
    ];

    if (loading) {
        return <p>Loading subscription...</p>;
    }

    return (
        <div style={{ padding: "24px" }}>
            <h1>Subscription Plans</h1>

            <p>
                Choose a plan for your therapy practice.
            </p>

            {subscription && (
                <div
                    style={{
                        padding: "15px",
                        marginBottom: "25px",
                        background: "#e8f5e9",
                        borderRadius: "8px"
                    }}
                >
                    <h3>Current Subscription</h3>

                    <p>
                        Plan: <strong>{subscription.plan}</strong>
                    </p>

                    <p>
                        Status: <strong>{subscription.status}</strong>
                    </p>
                </div>
            )}

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit, minmax(230px, 1fr))",
                    gap: "20px"
                }}
            >
                {plans.map((plan) => {
                    const isCurrent =
                        subscription?.plan === plan.name.toLowerCase();

                    return (
                        <div
                            key={plan.name}
                            style={{
                                border: "1px solid #ddd",
                                borderRadius: "12px",
                                padding: "22px",
                                background: "#fff",
                                boxShadow: "0 2px 8px #00000010"
                            }}
                        >
                            <h2>{plan.name}</h2>

                            <h3>{plan.price}</h3>

                            <p>{plan.description}</p>

                            <hr />

                            <ul style={{ paddingLeft: "20px" }}>
                                {plan.features.map((feature) => (
                                    <li
                                        key={feature}
                                        style={{ marginBottom: "10px" }}
                                    >
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            {isCurrent ? (
                                <button disabled>
                                    Current Plan
                                </button>
                            ) : plan.name === "Free" ? (
                                <button disabled>
                                    Free Plan
                                </button>
                            ) : (
                                <button
                                    onClick={() =>
                                        setSelectedPlan(plan.name)
                                    }
                                >
                                    Preview {plan.name}
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>

            {selectedPlan && (
                <div
                    style={{
                        marginTop: "25px",
                        padding: "20px",
                        border: "1px solid #ddd",
                        borderRadius: "10px",
                        background: "#f5f5f5"
                    }}
                >
                    <h3>{selectedPlan} Plan Demo</h3>

                    <p>
                        This is a subscription upgrade demo.
                        No payment has been made and your current
                        subscription has not changed.
                    </p>

                    <p>
                        Real payment integration can be added
                        when a payment gateway account is available.
                    </p>

                    <button
                        onClick={() => setSelectedPlan(null)}
                    >
                        Close Preview
                    </button>
                </div>
            )}
        </div>
    );
}

export default Subscription;