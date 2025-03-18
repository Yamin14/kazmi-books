import { useState } from "react"
import AuthForm from "../../Components/Auth/AuthForm"
import { AuthFormData, AuthFormField } from "../../types/AuthFormField"
import api from "../../api"
import { useBookNav } from "../../types/openPages"
import Swal from "sweetalert2"

const SignupPage = () => {

    //nav
    const { OpenBooksPage } = useBookNav();

    //title
    const title = "Signup"

    //fields
    const fields: AuthFormField[] = [
        { label: "Email", name: "email", type: "email", placeholder: "Enter email" },
        { label: "Username", name: "username", type: "text", placeholder: "Enter username" },
        { label: "Password", name: "password", type: "password", placeholder: "Enter password" }
    ]

    //auth form data
    const [authFormData, setAuthFormData] = useState<AuthFormData>({
        email: '', username: '', password: ''
    });

    //handle change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAuthFormData({ ...authFormData, [e.target.name]: e.target.value })
    }

    //handle submit
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        api.post("/auth/signup", authFormData)
            .then(() => {
                OpenBooksPage();
                Swal.fire({
                    title: "New User Created!",
                    text: `The user with username ${authFormData.username} has been saved successfully`,
                    icon: "success"
                });
            })
            .catch(err => console.log(err));
    }

    //return
    return (
        <AuthForm
            title={title}
            fields={fields}
            authFormData={authFormData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
        />
    )
}

export default SignupPage