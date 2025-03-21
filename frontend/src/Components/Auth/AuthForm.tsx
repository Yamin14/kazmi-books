import { FormEvent } from "react";
import { AuthFormData, AuthFormField } from "../../types/AuthFormField"
import { useBookNav } from "../../types/openPages";
import BackButton from "../Nav/BackButton";

interface Props {
    title: string;
    authFormData: AuthFormData;
    fields: AuthFormField[];
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AuthForm: React.FC<Props> = ({
    title, authFormData, fields, handleChange, handleSubmit
}) => {

    //nav
    const { OpenLoginPage, OpenSignupPage } = useBookNav();

    //return
    return (
        <div className="min-h-screen flex flex-col justify-center items-center text-center">

            <BackButton />

            <h1 className="font-bold text-3xl md:text-5xl text-center mb-8">{title} Account</h1>
            <form
                className="form my-4 mx-auto py-8 pb-4
                border-2 rounded-2xl w-md md:w-xl shadow-lg
                flex flex-col gap-4.5 justify-center items-center"
                onSubmit={handleSubmit}>

                {fields.map((field) => (
                    <div key={field.name} className="w-full grid grid-cols-2">
                        <label className="font-medium text-lg md:text-2xl">
                            {field.label}:
                        </label>
                        <input
                            className="w-44 md:w-64 py-1 px-2.5 border-2 rounded"
                            type={field.type}
                            placeholder={field.placeholder}
                            name={field.name}
                            onChange={handleChange}
                            value={authFormData[field.name]}
                            required />
                    </div>
                ))}

                <button
                    className="button"
                    type="submit">
                    {title}
                </button>

                {title == "Signup" && <a
                    className="text-white font-medium hover:text-gray-300 hover:cursor-pointer"
                    onClick={OpenLoginPage}>
                    Already a user? Login
                </a>}

                {title == "Login" && <a
                    className="text-white font-medium hover:text-gray-300 hover:cursor-pointer"
                    onClick={OpenSignupPage}>
                    New user? Signup
                </a>}
            </form>

        </div>
    )
}

export default AuthForm