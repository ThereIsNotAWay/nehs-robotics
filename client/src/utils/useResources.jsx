import { useState, useEffect, useCallback } from "react";
import { useAuth } from "./AuthContext";

export const useResources = (filter = "all") => {
    const { getCSRFToken } = useAuth();
    const [currFilter, setFilter] = useState(filter);
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [refetchIndex, setRefetchIndex] = useState(0);

    const refetch = useCallback(() => {
        setRefetchIndex(i => i + 1);
    }, []);

    useEffect(() => {
        const controller = new AbortController();
        let loadingTimeout;

        const fetchResources = async () => {
            loadingTimeout = setTimeout(() => setLoading(true), 300);
            setError("");

            let url = "";
            if (currFilter === "all") {
                url = '/api/resources/';
            } else {
                url = `/api/resources/?category=${currFilter}`;
            }

            try {
                const res = await fetch(url, {signal: controller.signal});
                const data = await res.json();

                if (!res.ok || !data.success) {
                    throw new Error(data.message || "Something went wrong.");
                }

                setResources(data.resources);
            } catch (err) {
                if (err.name === "AbortError") {
                    return;
                }

                if (err instanceof TypeError) {
                    setError("We're having trouble connecting right now. Please try again in a moment.");
                } else {
                    setError(err.message);
                }
            } finally {
                clearTimeout(loadingTimeout);
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        };

        fetchResources();
        return () => controller.abort();
    }, [currFilter, refetchIndex]);

    const createResource = useCallback(async (form) => {
        const csrf_token = await getCSRFToken();
        
        const res = await fetch("/api/resources/add", {
            method: "POST",
            headers: { "Content-Type": "application/json", "X-CSRFToken": csrf_token },
            credentials: "include",
            body: JSON.stringify(form)
        });
        
        const data = await res.json();

        if (!res.ok || !data.success) {
            throw new Error(data.message || "Failed to add resource. Please try again later.");
        }

        // render locally if the resource matches the current filter setting
        if (currFilter === "all" || data.resource.category.toLowerCase().includes(currFilter)) {
            setResources(prev => [data.resource, ...prev]);
        }

        return data;
    }, [getCSRFToken, currFilter]);

    const deleteResource = useCallback(async (id) => {
        const csrf_token = await getCSRFToken();

        const res = await fetch(`/api/resources/${id}`, {
            method: "DELETE",
            headers: { "X-CSRFToken": csrf_token },
            credentials: "include",
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
            throw new Error(data.message || "Failed to delete resource.");
        }

        setResources(prev => prev.filter(r => r.id !== id));
        return data;
    }, [getCSRFToken]);

    const editResource = useCallback(async (id, form) => {
        const csrf_token = await getCSRFToken();

        const res = await fetch(`/api/resources/${id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json", "X-CSRFToken": csrf_token},
            credentials: "include",
            body: JSON.stringify(form)
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
            throw new Error(data.message || "Failed to update resource.");
        }
        const match = currFilter === "all" || data.resource.category.toLowerCase().includes(currFilter);

        setResources(prev => {
            if (!match) {
                // edited resource no longer belongs under this filter — remove it
                return prev.filter(r => r.id !== id);
            }
            return prev.map(r => (r.id === id ? data.resource : r));
        });

        return data;
    }, [getCSRFToken, currFilter]);

    return { currFilter, setFilter, resources, loading, error, refetch, createResource, deleteResource, editResource };
};