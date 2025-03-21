import useAuth from "../../hooks/useAuth";
import { useBookNav } from "../../types/openPages";

const SignUpButton = () => {

    //get user if signed in
    const { user } = useAuth();

    //open pages
    const { OpenSignupPage, OpenLogoutPage } = useBookNav();

    //return
    return (
        <>
            {
                user ?
                // user logged in
                    <button
                        onClick={OpenLogoutPage}
                        className="text-gray-200 text-sm md:text-lg font-medium
          px-2 py-1 md:px-3 md:py-1.5 rounded-md
          hover:text-gray-400">
                        {user.username}
                    </button>
                    :
                    // user not logged in
                    <button
                        onClick={OpenSignupPage}
                        className="md:flex bg-blue-800 text-white text-sm md:text-xl font-medium
          px-3 py-1 md:px-4 md:py-2 rounded-lg
          hover:bg-blue-600 hover:cursor-pointer">
                        Sign Up
                    </button>
            }
        </>
    )
}

export default SignUpButton