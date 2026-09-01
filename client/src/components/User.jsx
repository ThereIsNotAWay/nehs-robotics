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
            <div id="current-user-container" className="flex gap-4 p-8 bg-(--brand-primary-black) text-(--brand-primary-neutral) items-center">
                {user ? (
                    <>
                        <p>Hello, {user.name}!</p>
                        <button id="sign-btn" className="text-(--brand-primary-red) cursor-pointer pl-8 pr-8 pt-2 pb-2" onClick={handleLogout}>Sign Out</button>
                    </>
                ) : (
                    <>
                        <p>Not currently signed in.</p>
                        <a href="/login" id="login-btn" className="text-(--brand-primary-red) cursor-pointer pl-8 pr-8 pt-2 pb-2">Login</a>
                        <a href="/signup" id="sign-btn" className="text-(--brand-primary-red) cursor-pointer pl-8 pr-8 pt-2 pb-2">Register</a>
                    </>
                )}
            </div>
        </>
    )
};

export default User;