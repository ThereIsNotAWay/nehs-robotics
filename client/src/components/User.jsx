import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

const User = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    return (
        <>
            <div id="current-user-container" className="max-w-480 w-full m-auto justify-between flex flex-col sm:flex-row gap-4 p-6 bg-(--brand-primary-black) text-(--brand-primary-neutral) items-center">
                {user ? (
                    <>
                        <p className="min-w-0">Hello, {user.name}!</p>
                        <button id="sign-btn" className="text-(--brand-primary-red) cursor-pointer px-4 sm:px-8 py-2" onClick={handleLogout}>Sign Out</button>
                    </>
                ) : (
                    <>
                        <p>Not currently signed in.</p>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                            <a href="/login" id="login-btn" className="text-(--brand-primary-red) cursor-pointer px-4 sm:px-8 py-2">Login</a>
                            <a href="/signup" id="sign-btn" className="text-(--brand-primary-red) cursor-pointer px-4 sm:px-8 py-2">Register</a>
                        </div>
                    </>
                )}
            </div>
        </>
    )
};

export default User;
