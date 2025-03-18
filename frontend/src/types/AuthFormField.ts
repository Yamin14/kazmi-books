export interface AuthFormField {
    label: string;
    name: string;
    type: "text" | "email" | "password";
    placeholder: string;
}

export interface AuthFormData {
    [key: string]: string;
}