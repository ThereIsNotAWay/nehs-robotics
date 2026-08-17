import { useState, useEffect } from "react";
import { motion } from "motion/react";

const Login = () => {
    const [password, setPassword] = useState("");
    const [type, setType] = useState("password");
    const [label, setLabel] = useState("Show Password");

    const toggleVisibility = (input) => {
        if (type === "password") {
            setType("text");
            setLabel("Hide Password");
        } else {
            setType("password");
            setLabel("Show Password");
        }
    }

    return (
        <>
            <form action="" method="POST" className="p-10">
                <div id="login-container" className="flex flex-col m-auto justify-center mt-32 max-w-150 border-2 rounded-lg p-16 gap-2">
                    <h1>Welcome, Viking</h1>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" required minLength={8} maxLength={20} className="border-2 rounded-lg p-2"/>
                    <label htmlFor="password">Password</label>
                    <input type={type} id="password" required minLength={12} maxLength={128} className="border-2 rounded-lg p-2"/>
                    <div id="pass-reveal" className="flex gap-2 items-center">
                        <input type="checkbox" onClick={toggleVisibility} />
                        <label htmlFor="checkbox">{label}</label>
                    </div>
                    <motion.button whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.95)" }} whileTap={{ scale: 0.95 }} transition={{ ease: "easeInOut" }} type="submit" id="login-btn" className="mt-4 bg-(--brand-primary-red) text-(--brand-primary-neutral) pt-2 pb-2 pl-6 pr-6 rounded-xl cursor-pointer">Login</motion.button>
                    <a id="register-redirect" href="/signup" className="mt-4 text-(--brand-primary-red) underline">Need an account? Register here.</a>
                </div>
            </form>
        </>
    )
}

export default Login;