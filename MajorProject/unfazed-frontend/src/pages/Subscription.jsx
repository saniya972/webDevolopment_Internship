import { useEffect, useState } from "react";
import api from "../api/axios";
import "../App.css";

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
            period: "forever",
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
            period: "Preview",
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
            period: "Preview",
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
        return (
            <div className="subscription-loading">
                <div className="subscription-spinner"></div>
                <p>Loading subscription...</p>
            </div>
        );
    }

    return (
        <div className="subscription-page">
            <div className="subscription-header">
                <span className="subscription-tag">
                    UNFAZED FOR THERAPISTS
                </span>

                <h1>Subscription Plans</h1>

                <p>
                    Choose a plan that fits your therapy practice
                    and manage your practice with confidence.
                </p>
            </div>

            {subscription && (
                <div className="current-subscription">
                    <div className="current-plan-icon">✓</div>

                    <div className="current-plan-details">
                        <span className="current-plan-label">
                            YOUR CURRENT SUBSCRIPTION
                        </span>

                        <h3>
                            {subscription.plan} Plan
                        </h3>

                        <p>
                            Your subscription is currently{" "}
                            <strong>{subscription.status}</strong>.
                        </p>
                    </div>

                    <span className="current-plan-badge">
                        Active Plan
                    </span>
                </div>
            )}

            <div className="subscription-plans">
                {plans.map((plan) => {
                    const isCurrent =
                        subscription?.plan === plan.name.toLowerCase();

                    return (
                        <div
                            key={plan.name}
                            className={`plan-card ${
                                plan.name === "Pro" ? "pro-plan" : ""
                            } ${
                                isCurrent ? "current-plan-card" : ""
                            }`}
                        >
                            {plan.name === "Pro" && (
                                <div className="popular-label">
                                    PREMIUM PLAN
                                </div>
                            )}

                            <div className="plan-card-header">
                                <h2>{plan.name}</h2>
                                <p>{plan.description}</p>
                            </div>

                            <div className="plan-price">
                                <h3>{plan.price}</h3>
                                <span>{plan.period}</span>
                            </div>

                            <div className="plan-divider"></div>

                            <h4 className="features-heading">
                                What's included
                            </h4>

                            <ul className="plan-features">
                                {plan.features.map((feature) => (
                                    <li key={feature}>
                                        <span className="feature-check">
                                            ✓
                                        </span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <div className="plan-button-container">
                                {isCurrent ? (
                                    <button
                                        className="plan-button current-button"
                                        disabled
                                    >
                                        Current Plan
                                    </button>
                                ) : plan.name === "Free" ? (
                                    <button
                                        className="plan-button free-button"
                                        disabled
                                    >
                                        Free Plan
                                    </button>
                                ) : (
                                    <button
                                        className={`plan-button ${
                                            plan.name === "Pro"
                                                ? "pro-button"
                                                : "basic-button"
                                        }`}
                                        onClick={() =>
                                            setSelectedPlan(plan.name)
                                        }
                                    >
                                        Preview {plan.name}
                                        <span> → </span>
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {selectedPlan && (
                <div className="preview-overlay">
                    <div className="preview-modal">
                        <button
                            className="preview-close"
                            onClick={() => setSelectedPlan(null)}
                            aria-label="Close preview"
                        >
                            ×
                        </button>

                        <div className="preview-icon">✦</div>

                        <span className="subscription-tag">
                            PLAN PREVIEW
                        </span>

                        <h2>{selectedPlan} Plan Demo</h2>

                        <p>
                            This is a subscription upgrade demo.
                            No payment has been made and your current
                            subscription has not changed.
                        </p>

                        <div className="preview-notice">
                            Real payment integration can be added
                            when a payment gateway account is available.
                        </div>

                        <button
                            className="plan-button basic-button"
                            onClick={() => setSelectedPlan(null)}
                        >
                            Close Preview
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Subscription;