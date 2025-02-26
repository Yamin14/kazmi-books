import { useNavigate } from "react-router"


const BackButton = () => {

    const nav = useNavigate();

    //back function
    const handleBack = () => {
        nav("/books");
    }

    //return
    return (
        <button
            className="button back-button"
            onClick={handleBack}>
            Back
        </button>
    )
}

export default BackButton