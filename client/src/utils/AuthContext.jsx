import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

/**
 * Fetch a fresh CSRF token provided by SeaSurf that is tied to the current session.
 * Used to validate requests (ex. POST, GET).
 * @returns a CSRF token.
 */
const getCSRFToken = async () => {
    const res = await fetch("/api/auth/csrf-token", {credentials: "include"});
    const {csrf_token} = await res.json();
    return csrf_token;
}

/**
 * React provider component supplying auth state and actions to any nested component.
 * @param {{children: React.ReactNode}} param0 child components that can access the context.
 * @returns {JSX.Element} the AuthProvider wrapper component.
 */
export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    const fetchCurrUser = async () => {
        try {
            const res = await fetch("/api/auth/me", {credentials: "include"});
            const data = await res.json();

            if (data.authenticated) {
                setUser(data.user);
            } else {
                setUser(null);
            }
        } catch (err) {
            // Assume that the user isn't logged in
            setUser(null);
        }
    }

    // Refresh to check if there is a valid user/session-cookie whenever the AuthProvider loads
    useEffect(() => {
        fetchCurrUser();
    }, []);

    /**
     * Attempts to login a user given a username and password.
     * @param {*} name the provided username.
     * @param {*} password the provided password.
     * @returns a data object containing the response's status and associated message.
     */
    const login = async (name, password) => {
        const csrf_token = await getCSRFToken();

        // Send a POST request to the API's login route to try logging in the user
        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json", "X-CSRFToken": csrf_token },
            credentials: "include",
            body: JSON.stringify({ name, password })
        });

        const data = await res.json();

        // See API route for error handling messages, default message provided in case of unexpected error in response.
        if (!res.ok || !data.success) {
            throw new Error(data.message || "Something went wrong. Please try again.");
        }

        // Let fetchCurrUser handle updating setUser since API does not expose the user
        await fetchCurrUser();
        return data;
    }

    /**
     * Attempts to sign-up/register a new user given a username and password.
     * @param {*} name the provided username.
     * @param {*} password the provided password.
     * @returns a data object containing the response's status and associated message.
     */
    const signup = async (name, password) => {
        const csrf_token = await getCSRFToken();

        // Send a POST request to the API's signup route to try registering a new user
        const res = await fetch("/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json", "X-CSRFToken": csrf_token },
            credentials: "include",
            body: JSON.stringify({ name, password })
        });

        const data = await res.json();

        // See API route for error handling messages, default message provided in case of unexpected error in response.
        if (!res.ok || !data.success) {
            throw new Error(data.message || "Something went wrong. Please try again.");
        }

        // Nothing else required, return a reference to the data object for status code & message.
        return data;
    };

    /**
     * Attempts to logout a user. Sets the user to null regardless of state.
     */
    const logout = async () => {
        try {
            const csrf_token = await getCSRFToken();
            await fetch("/api/auth/logout", {
                method: "POST",
                headers: { "X-CSRFToken": csrf_token },
                credentials: "include"
            });
        } finally {
            // No need to check the response status. Assume we either succeeded or there was no need to logout (user wasn't logged in).
            setUser(null);
        }
    }

    // Add reset password & maybe email connections to accounts.

    return (
        <AuthContext.Provider value={{user, login, signup, logout, fetchCurrUser, getCSRFToken}}>
            {children}
        </AuthContext.Provider>
    );
};

/**
 * React hook that provides authentication context supplied by AuthProvider.
 * @returns the auth context object (contains: user, login, etc.)
 */
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === null) {
        throw new Error("useAuth must be used in an AuthProvider");
    }
    return context;
}

export default AuthProvider;