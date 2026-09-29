
import { useNavigate } from "react-router-dom";

function UpgradePrompt() {
    const navigate = useNavigate();

    return (
        <div className="upgrade-page">
            <div className="upgrade-card">

                <div className="upgrade-icon">
                    🔒
                </div>

                <span className="upgrade-tag">
                    PREMIUM FEATURE
                </span>

                <h2>Upgrade Required</h2>

                <p>
                    This feature is available on a higher
                    plan. Upgrade your subscription to
                    unlock analytics and explore your
                    practice insights.
                </p>

                <button
                    className="upgrade-button"
                    onClick={() => navigate("/subscription")}
                >
                    Upgrade Subscription
                    <span>→</span>
                </button>

                <div className="upgrade-footer">
                    Unlock more features with Unfazed
                </div>

            </div>
        </div>
    );
}

export default UpgradePrompt;