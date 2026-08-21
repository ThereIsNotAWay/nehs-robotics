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
            <div id="current-user-container" className="flex gap-2 p-8">
                {user ? (
                    <>
                        <p>Hello, {user.name}!</p>
                        <button className="underline text-(--brand-primary-red) cursor-pointer" onClick={handleLogout}>Sign Out</button>
                    </>
                ) : (
                    <>
                        <p>Not currently signed in.</p>
                        <a href="/login" className="underline text-(--brand-primary-red) cursor-pointer">Login</a>
                        <a href="/signup" className="underline text-(--brand-primary-red) cursor-pointer">Register</a>
                    </>
                )}
            </div>
        </>
    )
};

export default User;