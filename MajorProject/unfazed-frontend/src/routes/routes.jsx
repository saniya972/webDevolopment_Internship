import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import EditProfile from "../pages/EditProfile";
import Availability from "../pages/Availability";
import Bookings from "../pages/Bookings";
import ClientBooking from "../pages/ClientBooking";
import Calendar from "../pages/Calendar";
import Clients from "../pages/Clients";
import ClientDetails from "../pages/ClientDetails";
import IntakeForm from "../pages/IntakeForm";
import Packages from "../pages/Packages";
import ClientPackages from "../pages/ClientPackages";
import Notes from "../pages/Notes";
import Chat from "../pages/Chat";
import Analytics from "../pages/Analytics";
import Subscription from "../pages/Subscription";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                <Route
    path="/"
    element={<Dashboard />}
/>

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
    path="/edit-profile"
    element={<EditProfile />}
/>
<Route
    path="/availability"
    element={<Availability />}
/>
<Route
    path="/bookings"
    element={<Bookings />}
/>
<Route
    path="/book-session/:slug"
    element={<ClientBooking />}
/>
<Route path="/calendar" element={<Calendar />} />

<Route path="/clients" element={<Clients />} />

<Route path="/clients/:id" element={<ClientDetails />} />

<Route path="/intake/:therapistId" element={<IntakeForm />} />

<Route path="/packages" element={<Packages />} />

<Route
    path="/client-packages/:therapistId"
    element={<ClientPackages />}
/>

<Route path="/notes" element={<Notes />} />

<Route path="/chat" element={<Chat />} />

<Route path="/analytics" element={<Analytics />} />

<Route path="/subscription" element={<Subscription />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;