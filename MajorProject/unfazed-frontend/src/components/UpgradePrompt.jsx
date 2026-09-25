
import { useNavigate } from "react-router-dom";

function UpgradePrompt() {
    const navigate = useNavigate();

    return (
        <div>
            <h3>🔒 Upgrade Required</h3>

            <p>
                This feature is available on a higher plan.
            </p>

            <button onClick={() => navigate("/subscription")}>
                Upgrade Subscription
            </button>
        </div>
    );
}

export default UpgradePrompt;