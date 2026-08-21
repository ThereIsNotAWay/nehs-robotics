import { useState } from "react";
import { motion } from "motion/react";
import { useAuth } from "../utils/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();
    const { signup } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [type, setType] = useState("password");
    const [label, setLabel] = useState("Show Password");
    const [error, setError] = useState("");
    const passMatch = confirmPassword.length === 0 || password === confirmPassword;

    const toggleVisibility = (input) => {
        if (type === "password") {
            setType("text");
            setLabel("Hide Password");
        } else {
            setType("password");
            setLabel("Show Password");
        }
    }

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            await signup(username, password);
            navigate("/login");
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <>
            <form onSubmit={handleSignup} className="p-10">
                <div id="register-container" className="flex flex-col m-auto justify-center mt-32 max-w-150 border-2 rounded-lg p-16 gap-2">
                    <a id="register-redirect" href="/login" className="text-(--brand-primary-red) underline">Back to Login</a>
                    <h1>Register an Account</h1>
                    <label htmlFor="username">Username (8-20 characters)</label>
                    <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required minLength={8} maxLength={20} className="border-2 rounded-lg p-2"/>
                    <label htmlFor="password">Password (12-128 characters)</label>
                    <input type={type} id="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={12} maxLength={128} className="border-2 rounded-lg p-2"/>
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input type={type} id="confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required minLength={12} maxLength={128} className={`border-2 rounded-lg p-2 ${!passMatch ? "border-(--brand-primary-red)" : ""}`} />
                    {!passMatch && (
                        <span className="text-(--brand-primary-red)">Passwords do not match.</span>
                    )}
                    <div id="pass-reveal" className="flex gap-2 items-center">
                        <input type="checkbox" onClick={toggleVisibility} />
                        <label htmlFor="checkbox">{label}</label>
                    </div>
                    {error && (
                        <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} transition={{ duration: 0.15 }} className="text-(--brand-primary-red)" role="alert">
                            {error}
                        </motion.p>
                    )}
                    <motion.button whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.95)" }} whileTap={{ scale: 0.95 }} transition={{ ease: "easeInOut" }} type="submit" id="login-btn" className="mt-4 bg-(--brand-primary-red) text-(--brand-primary-neutral) pt-2 pb-2 pl-6 pr-6 rounded-xl cursor-pointer">Register</motion.button>
                </div>
            </form>
        </>
    );
};

export default Signup;