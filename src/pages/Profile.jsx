import { useContext, useState } from "react";
import { UserContext } from "../context/userContext.jsx";
import { FaUserCircle, FaSignOutAlt, FaEdit } from "react-icons/fa";

export default function Profile() {
  const { user, setUser } = useContext(UserContext);

  // Local state for edit mode
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user?.name || "");
  const [editedEmail, setEditedEmail] = useState(user?.email || "");

  if (!user) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">You are not logged in.</h1>
        <p className="text-gray-400">
          Please <a href="/login" className="text-blue-400">login here</a>.
        </p>
      </div>
    );
  }

  const handleSave = () => {
    setUser({ name: editedName, email: editedEmail });
    setIsEditing(false);
  };

  const handleLogout = () => {
    setUser(null); // Clears from context + localStorage (handled in UserProvider)
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Your Profile</h1>

      <div className="bg-gray-800 rounded-xl p-6 shadow-lg max-w-md">
        <div className="flex items-center gap-4 mb-4">
          <FaUserCircle className="text-5xl text-blue-400" />
          <div>
            {!isEditing ? (
              <>
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-gray-400 text-sm">{user.email}</p>
              </>
            ) : (
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="p-2 rounded bg-gray-700 text-white"
                  placeholder="Enter name"
                />
                <input
                  type="email"
                  value={editedEmail}
                  onChange={(e) => setEditedEmail(e.target.value)}
                  className="p-2 rounded bg-gray-700 text-white"
                  placeholder="Enter email"
                />
              </div>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-400"
            >
              <FaEdit /> Edit
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="bg-green-500 px-4 py-2 rounded-lg hover:bg-green-400"
            >
              Save
            </button>
          )}

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 px-4 py-2 rounded-lg hover:bg-red-500"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>
    </div>
  );
}
