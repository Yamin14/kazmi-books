import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useBookNav } from '../../types/openPages';
import useAuth from '../../hooks/useAuth';

interface MenuItem {
    title: string;
    path?: string;
    onClick?: () => void;
}

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const Sidebar: FC<SidebarProps> = ({ isOpen, onClose }) => {
    const { OpenHomePage, OpenBooksPage } = useBookNav();
    const { user } = useAuth();

    const menuItems: MenuItem[] = [
        { title: 'Home', onClick: OpenHomePage },
        { title: 'Books', onClick: OpenBooksPage },
        { title: 'Categories', path: '/categories' },
        { title: 'About', path: '/about' },
        { title: 'Contact', path: '/contact' },
    ];

    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black opacity-30 z-40"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed top-0 right-0 h-full w-64 bg-gray-800 text-white transform transition-transform duration-300 ease-in-out z-50 ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="p-4">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-xl font-bold">Menu</h2>
                        <button
                            onClick={onClose}
                            className="text-white hover:text-gray-300"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>

                    <nav>
                        <ul className="space-y-4">
                            {menuItems.map((item, index) => (
                                <li key={index}>
                                    {item.path ? (
                                        <Link
                                            to={item.path}
                                            className="block py-2 px-4 hover:bg-gray-700 rounded transition-colors duration-200"
                                            onClick={onClose}
                                        >
                                            {item.title}
                                        </Link>
                                    ) : item.onClick ? (
                                        <button
                                            onClick={() => {
                                                item.onClick?.();
                                                onClose();
                                            }}
                                            className="w-full text-left py-2 px-4 hover:bg-gray-700 rounded transition-colors duration-200"
                                        >
                                            {item.title}
                                        </button>
                                    ) : null}
                                </li>
                            ))}
                            
                            {/* Admin Navigation */}
                            {user && user.role === "admin" && (
                                <li className="pt-4 border-t border-gray-700">
                                    <h3 className="text-sm font-semibold text-gray-400 px-4 mb-2">Admin Panel</h3>
                                    <Link
                                        to="/admin/pending-sellers"
                                        className="block py-2 px-4 hover:bg-gray-700 rounded transition-colors duration-200"
                                        onClick={onClose}
                                    >
                                        Pending Sellers
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );
};

export default Sidebar; 