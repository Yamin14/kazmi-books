import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router";
import api from "../../api";
import Loading from "../../Components/Loading";
import BackButton from "../../Components/Nav/BackButton";

const PendingSellerDetails = () => {
    const { id } = useParams();

    // fetch seller details
    const { data, isLoading } = useQuery({
        queryKey: ["seller", id],
        queryFn: async () => {
            const response = await api.get(`/admin/pending-sellers/${id}`);
            return response.data;
        },
    });

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="p-4 text-black">
            <BackButton />
            <div className="max-w-2xl mx-auto mt-8">
                <h1 className="text-center text-2xl md:text-4xl text-white font-bold mb-6">Seller Details</h1>
                
                {data?.pendingSeller && (
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <div className="space-y-4">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-800">Basic Information</h2>
                                <div className="mt-2 space-y-2">
                                    <p><span className="font-medium">Username:</span> {data.pendingSeller.username}</p>
                                    <p><span className="font-medium">Email:</span> {data.pendingSeller.email}</p>
                                    <p><span className="font-medium">Role:</span> {data.pendingSeller.role}</p>
                                    <p><span className="font-medium">Registration Date:</span> {new Date(data.pendingSeller.createdAt || "").toLocaleDateString()}</p>
                                </div>
                            </div>

                            <div className="pt-4 border-t">
                                <h2 className="text-xl font-semibold text-gray-800">Store Information</h2>
                                <div className="mt-2 space-y-2">
                                    <p><span className="font-medium">Store Name:</span> {data.pendingSeller.storeName}</p>
                                    <p><span className="font-medium">Store Location:</span> {data.pendingSeller.storeLocation}</p>
                                </div>
                            </div>

                            <div className="pt-6 flex gap-4">
                                <button
                                    className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors"
                                >
                                    Approve Seller
                                </button>
                                <button
                                    className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition-colors"
                                >
                                    Reject Seller
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PendingSellerDetails;