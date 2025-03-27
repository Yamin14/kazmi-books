import { useQuery } from "@tanstack/react-query";
import api from "../../api";
import Loading from "../../Components/Loading";
import { User } from "../../types/User";
import { useNavigate } from "react-router-dom";
import BackButton from "../../Components/Nav/BackButton";

const PendingSellers = () => {

    const nav = useNavigate();

    //get all pending sellers
    const { data, isLoading } = useQuery({
        queryKey: ["pending-sellers"],
        queryFn: async () => {
            const response = await api.get("/admin/pending-sellers");
            return response.data;
        },
    });

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="p-4">
            <BackButton />
            <h1 className="text-center text-xl md:text-3xl font-bold m-4">Pending Seller Approvals</h1>
            <div className="m-4 mt-5 md:mt-10 grid gap-4">
                {data?.pendingSellers.map((seller: User) => (
                    <div key={seller._id} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow">
                        {/* seller details */}
                        <div>
                            <h2 className="text-xl text-black font-semibold">{seller.username}</h2>
                            <p className="text-black">{seller.email}</p>
                            <p className="text-sm text-gray-500">
                                Registered: {new Date(seller.createdAt || "").toLocaleDateString()}
                            </p>
                        </div>

                        {/* view details button */}
                        <button 
                            onClick={() => nav(`/admin/pending-sellers/${seller._id}`)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:cursor-pointer hover:bg-blue-600">
                            View Details
                        </button>

                        {/* approve button */}
                        <button 
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:cursor-pointer hover:bg-blue-600">
                            Approve
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PendingSellers;