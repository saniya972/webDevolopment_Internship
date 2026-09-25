import { useEffect, useState } from "react";
import api from "../api/axios";

function Subscription() {
    const [subscription, setSubscription] = useState(null);

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
            }
        };

        getSubscription();
    }, []);

    return (
        <div>
            <h1>Subscription</h1>

            {subscription ? (
                <div>
                    <p>Plan: {subscription.plan}</p>
                    <p>Status: {subscription.status}</p>
                </div>
            ) : (
                <p>No subscription found.</p>
            )}
        </div>
    );
}

export default Subscription;