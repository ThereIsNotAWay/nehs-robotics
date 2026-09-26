import { useState, useEffect, useCallback } from "react";
import { useAuth } from "./AuthContext";

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = import.meta.env.VITE_CLOUDINARY_API_KEY;

export const useGallery = (filter = "all") => {
    const { getCSRFToken } = useAuth();
    const [currFilter, setFilter] = useState(filter);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [refetchIndex, setRefetchIndex] = useState(0);

    const refetch = useCallback(() => {
        setRefetchIndex(i => i + 1);
    }, []);

    useEffect(() => {
        const controller = new AbortController();
        let loadingTimeout;

        const fetchImages = async () => {
            loadingTimeout = setTimeout(() => setLoading(true), 300);
            setError("");

            let url = "";
            if (currFilter === "all") {
                url = '/api/gallery/';
            } else {
                url = `/api/gallery/?category=${currFilter}`;
            }

            try {
                const res = await fetch(url, {signal: controller.signal});
                const data = await res.json();

                if (!res.ok || !data.success) {
                    throw new Error(data.message || "Something went wrong.");
                }

                setImages(data.gallery);
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

        fetchImages();
        return () => {
            controller.abort(); 
            clearTimeout(loadingTimeout);
        }
    }, [currFilter, refetchIndex]);

    const openUploadWidget = useCallback(() => {
        return new Promise((resolve, reject) => {
            const uploaded = [];

            const widget = window.cloudinary.createUploadWidget(
                {
                    cloudName: CLOUD_NAME,
                    apiKey: CLOUDINARY_API_KEY,
                    multiple: true,
                    folder: "gallery",
                    uploadSignature: async (callback, paramsToSign) => {
                        const csrf_token = await getCSRFToken();
                        const res = await fetch("/api/gallery/sign-image", {
                            method: "POST",
                            headers: {"Content-Type": "application/json", "X-CSRFToken": csrf_token},
                            credentials: "include",
                            body: JSON.stringify(paramsToSign),
                        });
                        const data = await res.json();
                        callback(data.signature);
                    },
                },
                (error, result) => {
                    if (error) {
                        reject(new Error("Upload failed. Please try again."));
                        return;
                    }

                    if (result.event === "success") {
                        uploaded.push(result.info);
                    }

                    if (result.event === "queues-end") {
                        resolve(uploaded);
                    }

                    if (result.event === "close") {
                        // widget closed, resolve with whatever succeeded so far
                        resolve(uploaded);
                    }
                }
            );

            widget.open();
        });
    }, [getCSRFToken]);

    const saveImage = useCallback(async (cloudinaryInfo, form) => {
        const csrf_token = await getCSRFToken();

        const res = await fetch("/api/gallery/images/add", {
            method: "POST",
            headers: {"Content-Type": "application/json", "X-CSRFToken": csrf_token},
            credentials: "include",
            body: JSON.stringify({
                public_id: cloudinaryInfo.public_id,
                category: form.category,
                title: form.title,
                description: form.description,
                src: cloudinaryInfo.secure_url,
            }),
        });

        const data = await res.json();
        if (!res.ok || !data.success) {
            throw new Error(data.message || "Failed to save image.");
        }

        if (currFilter === "all" || form.category === currFilter) {
            setImages(prev => [data.item, ...prev]);
        }

        return data;
    }, [getCSRFToken, currFilter]);

    const deleteImage = useCallback(async (publicId) => {
        const csrf_token = await getCSRFToken();

        const res = await fetch(`/api/gallery/images/del/${publicId}`, {
            method: "DELETE",
            headers: { "X-CSRFToken": csrf_token },
            credentials: "include",
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
            throw new Error(data.message || "Failed to delete image. Please try again later.");
        }

        setImages(prev => prev.filter(img => img.public_id !== publicId));
        return data;
    }, [getCSRFToken]);

    return { currFilter, setFilter, images, loading, error, refetch, openUploadWidget, saveImage, deleteImage };
};