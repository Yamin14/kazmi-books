import { useState } from 'react';
import AuthForm from '../../Components/Auth/AuthForm'
import { AuthFormData, AuthFormField } from '../../types/AuthFormField';
import { useBookNav } from '../../types/openPages';
import api from '../../api';
import Swal from 'sweetalert2';

const LoginPage = () => {

  //nav
  const { OpenBooksPage } = useBookNav();

  //title
  const title = "Login"

  //fields
  const fields: AuthFormField[] = [
    { label: "Email", name: "email", type: "email", placeholder: "Enter email" },
    { label: "Password", name: "password", type: "password", placeholder: "Enter password" }
  ]

  //auth form data
  const [authFormData, setAuthFormData] = useState<AuthFormData>({
    email: '', password: ''
  });

  //handle change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthFormData({ ...authFormData, [e.target.name]: e.target.value })
  }

  //handle submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    api.post("/auth/login", authFormData)
      .then((res) => {
        if (res.status === 201) {
          OpenBooksPage();
          Swal.fire({
            title: "Logged In!",
            icon: "success"
          });
        }
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

export default LoginPage