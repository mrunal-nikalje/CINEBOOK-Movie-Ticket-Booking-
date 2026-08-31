import { useState, useEffect } from "react";
import { api } from "../api";

function Profile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    dob: "",
    contact: "",
  });

  const token = localStorage.getItem("token");

  const [tickets, setTickets] = useState([]);

  // Load profile
 useEffect(() => {
  const fetchProfileAndTickets = async () => {
    try {
      const userId = JSON.parse(atob(token.split(".")[1])).id;

      // Load user profile
      const profileRes = await api.get(`/auth/profile?id=${userId}`);

      setUser({
        ...profileRes.data,
        dob: profileRes.data.dob || "",
        contact: profileRes.data.contact || "",
      });

      // Load booking history
      const ticketsRes = await api.get("/tickets/mytickets", {
        headers: {
          token: token,
        },
      });

      setTickets(ticketsRes.data);

    } catch (err) {
      console.log(err);
    }
  };

  fetchProfileAndTickets();
}, [token]);


  const updateProfile = async () => {
    try {
      const userId = JSON.parse(atob(token.split(".")[1])).id;
      await api.put(`/auth/profile?id=${userId}`, user);
      alert("Profile updated!");
    } catch (err) {
      console.log(err);
      alert("Update failed");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-xl rounded-xl mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">User Profile</h2>

      <label className="block mb-2 font-semibold">Name</label>
      <input
        className="w-full mb-3 border rounded px-2 py-1"
        value={user.name}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
      />

      <label className="block mb-2 font-semibold">Email</label>
      <input
        className="w-full mb-3 border rounded px-2 py-1"
        value={user.email}
        disabled
      />

      <label className="block mb-2 font-semibold">Date of Birth</label>
      <input
        type="date"
        className="w-full mb-3 border rounded px-2 py-1"
        value={user.dob}
        onChange={(e) => setUser({ ...user, dob: e.target.value })}
      />

      <label className="block mb-2 font-semibold">Contact</label>
      <input
        type="text"
        className="w-full mb-3 border rounded px-2 py-1"
        value={user.contact}
        onChange={(e) => setUser({ ...user, contact: e.target.value })}
      />

            <button
        className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded mt-3"
        onClick={updateProfile}
      >
        Update Profile
      </button>

      {/* BOOKING HISTORY */}
      <div className="mt-8 border-t pt-6">

        <h2 className="text-2xl font-bold text-center mb-5">
          🎟️ Booking History
        </h2>

        {tickets.length === 0 ? (
          <p className="text-center text-gray-500">
            No bookings yet.
          </p>
        ) : (
          <div className="space-y-4">

            {tickets.map((ticket) => (
              <div
                key={ticket._id}
                className="bg-blue-50 border border-blue-200 rounded-xl p-4 shadow"
              >

                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  🎬 {ticket.movie}
                </h3>

                <p className="text-gray-700">
                  📍 <strong>Location:</strong> {ticket.location}
                </p>

                <p className="text-gray-700">
                  🎭 <strong>Theatre:</strong> {ticket.theatre}
                </p>

                <p className="text-gray-700">
                  🕐 <strong>Timing:</strong> {ticket.timing}
                </p>

                <p className="text-gray-700">
                  📅 <strong>Date:</strong> {ticket.date}
                </p>

                <p className="text-gray-700">
                  💺 <strong>Seats:</strong> {ticket.seats}
                </p>

                <div className="mt-3">
                  <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                    ✓ Payment Successful
                  </span>
                </div>

              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
}

export default Profile;
