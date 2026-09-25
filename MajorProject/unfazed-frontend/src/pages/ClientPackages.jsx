import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

function ClientPackages() {
    const { therapistId } = useParams();

    const [packages, setPackages] = useState([]);
    const [invoiceId, setInvoiceId] = useState(null);

    const getPackages = async () => {
        try {
            const response = await api.get(
                `/packages/public/${therapistId}`
            );

            setPackages(response.data.packages);
        } catch (error) {
            console.log(error);
        }
    };



    const buyPackage = async (pkg) => {
    const clientName = prompt("Enter your name:");
    const clientEmail = prompt("Enter your email:");

    if (!clientName || !clientEmail) {
        alert("Name and email are required");
        return;
    }

    try {
        const response = await api.post("/payments/test-payment", {
            packageId: pkg._id,
            clientName,
            clientEmail
        });

        console.log(response.data);

        setInvoiceId(response.data.paymentId);

        alert("Payment and package purchase successful!");

          //window.location.href =
    //`http://localhost:5000/api/packages/payment/invoice/${response.data.paymentId}`;
     

    //alert("Payment successful! Invoice can be viewed from the invoice button.");


    } catch (error) {
        console.log(error);
        alert("Failed to create payment order");
    }
};

    useEffect(() => {
        getPackages();
    }, []);

    return (
        <div>
            <h1>Therapy Packages</h1>

            {packages.length === 0 ? (
                <p>No packages available.</p>
            ) : (
                packages.map((pkg) => (
                    <div key={pkg._id}>
                        <h2>{pkg.name}</h2>

                        <p>{pkg.description}</p>

                        <p>
                            Sessions: {pkg.sessions}
                        </p>

                        <p>
                            Price: ₹{pkg.price}
                        </p>

                        <p>
                            Validity: {pkg.validityDays} days
                        </p>

                              <button onClick={() => buyPackage(pkg)}>
    Buy Package
</button>

                            {invoiceId && (
    <button
        onClick={() =>
            window.open(
                `http://localhost:5000/api/packages/payment/invoice/${invoiceId}`,
                "_blank"
            )
        }
    >
        View Invoice
    </button>
)}

                        <hr />
                    </div>
                ))
            )}
        </div>
    );
}

export default ClientPackages;