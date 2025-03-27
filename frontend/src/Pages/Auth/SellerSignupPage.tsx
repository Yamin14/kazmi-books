import Swal from "sweetalert2";
import api from "../../api";
import { useBookNav } from "../../types/openPages";
import AuthForm from "../../Components/Auth/AuthForm";
import { AuthFormData, AuthFormField } from "../../types/AuthFormField";
import { useState } from "react";

const SellerSignupPage = () => {
  //nav
  const { OpenBooksPage } = useBookNav();

  //title
  const title = "Signup as a Seller"

  //fields
  const fields: AuthFormField[] = [
      { label: "Email", name: "email", type: "email", placeholder: "Enter email" },
      { label: "Username", name: "username", type: "text", placeholder: "Enter username" },
      { label: "Password", name: "password", type: "password", placeholder: "Enter password" },
      { label: "Store Name", name: "storeName", type: "text", placeholder: "Enter store name" },
      { label: "Store Location", name: "storeLocation", type: "text", placeholder: "Enter store location" }
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
      api.post("/auth/signup", {...authFormData, role: "seller"})
          .then(() => {
              OpenBooksPage();
              Swal.fire({
                  title: "New Seller Created!",
                  text: `The seller with username ${authFormData.username} has been saved successfully`,
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

export default SellerSignupPage