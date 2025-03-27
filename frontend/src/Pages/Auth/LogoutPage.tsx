import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const LogoutPage = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    setIsLoggingOut(true);
    logout();
  };

  const handleCancel = () => {
    navigate("/books");
  };

  if (isLoggingOut) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">Logging out...</h1>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-800 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="form my-4 mx-auto py-8 pb-4
                border-2 rounded-2xl w-md md:w-xl shadow-lg
                flex flex-col gap-4.5 justify-center items-center">
        
        <h1 className="font-bold text-3xl md:text-5xl text-center mb-4">Logout Confirmation</h1>
        <p className="text-white text-xl mb-4">
          Are you sure you want to logout, <span className="font-semibold">{user?.username}</span>?
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleLogout}
            className="cursor-pointer bg-blue-800 text-lg text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            Logout
          </button>
          <button
            onClick={handleCancel}
            className="cursor-pointer bg-gray-100 text-lg text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogoutPage;