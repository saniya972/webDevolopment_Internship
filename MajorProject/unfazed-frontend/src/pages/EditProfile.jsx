import { useState } from "react";
import api from "../api/axios";

function EditProfile() {
    const [name, setName] = useState("Dr Sharma");
    const [bio, setBio] = useState("");
    const [specializations, setSpecializations] = useState("");
    const [languages, setLanguages] = useState("");

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            await api.put(
                "/auth/profile",
                {
                    name,
                    bio,
                    specializations: specializations
                        .split(",")
                        .map(item => item.trim()),

                    languages: languages
                        .split(",")
                        .map(item => item.trim())
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Profile updated successfully!");

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Profile update failed"
            );
        }
    };

    return (
        <div>
            <h1>Edit Profile</h1>

            <form onSubmit={handleUpdate}>

                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <br /><br />

                <textarea
                    placeholder="Bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                />

                <br /><br />

                <input
                    type="text"
                    placeholder="Specializations (comma separated)"
                    value={specializations}
                    onChange={(e) => setSpecializations(e.target.value)}
                />

                <br /><br />

                <input
                    type="text"
                    placeholder="Languages (comma separated)"
                    value={languages}
                    onChange={(e) => setLanguages(e.target.value)}
                />

                <br /><br />

                <button type="submit">
                    Update Profile
                </button>

            </form>
        </div>
    );
}

export default EditProfile;