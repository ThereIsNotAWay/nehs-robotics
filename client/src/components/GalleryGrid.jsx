import { useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { useGallery } from "../utils/useGallery";
import FilterButtons from "./FilterButtons";
import GalleryImage from "./GalleryImage";
import MetadataModal from "./MetadataModal";
import GallerySkeleton from "./GallerySkeleton";

/**
 * Generates a default title for images based on its position in the array and the current timestamp.
 * @param {*} sequenceNumber current index in the sequence of images.
 * @returns a string to be used as an image's title.
 */
const buildDefaultTitle = (sequenceNumber) => {
    const now = new Date();
    const seq = String(sequenceNumber).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    return `Image-${seq}-${month}-${day}-${hours}${minutes}`;
};

const GalleryGrid = () => {
    const { user } = useAuth();
    const { currFilter, setFilter, images, loading, error, openUploadWidget, saveImage, deleteImage } = useGallery();
    const [modalOpen, setModalOpen] = useState(false);
    const [uploadQueue, setUploadQueue] = useState([]);
    const [total, setTotal] = useState(0);

    const FILTERS = [
        {label: "All", filter: "all"},
        {label: "FTC", filter: "FTC"},
        {label: "FRC", filter: "FRC"},
        {label: "SeaGlide", filter: "SeaGlide"}
    ];

    const handleUpload = async () => {
        try {
            const results = await openUploadWidget();
            if (results.length > 0) {
                setUploadQueue(results);
                setModalOpen(true);
                setTotal(results.length);
            }
        } catch (err) {
            console.error("Upload widget error:", err);
        }
    };

    const handleAdvance = () => {
        setUploadQueue(prev => prev.slice(1));
    }

    const handleSkip = async (skipForm, cloudinaryInfo) => {
        try {
            await saveImage(cloudinaryInfo, skipForm);
        } catch (err) {
            console.error("Failed to save skipped image:", err);
        } finally {
            handleAdvance();
        }
    };

    const handleSkipAll = async () => {
        const remainingUploads = [...uploadQueue];
        const start = total - remainingUploads.length + 1;

        setModalOpen(false);
        setUploadQueue([]);
        setTotal(0);

        for (let i = 0; i < remainingUploads.length; i++) {
            try {
                await saveImage(remainingUploads[i], {
                    category: "all",
                    title: buildDefaultTitle(start + i),
                    description: "No description provided."
                });
            } catch (err) {
                console.error("Failed to save skipped image:", err);
            }
        }
    }

    const handleClose = async () => {
        const abandoned = [...uploadQueue];
        setModalOpen(false);
        setUploadQueue([]);
        setTotal(0);

        for (const cloudinaryInfo of abandoned) {
            try {
                await deleteImage(cloudinaryInfo.public_id);
            } catch (err) {
                console.error("Failed to clean up abandoned upload:", err);
            }
        }
    };

    const renderImages = () => {
        if (loading) {
            return Array.from({ length: 6 }).map((_, i) => (
                <GallerySkeleton key={i} />
            ));
        }

        if (error) {
            return <p>{error}</p>;
        }

        if (images.length === 0) {
            return <p>No images were found.</p>;
        }

        return images.map((img) => (
            <GalleryImage key={img.id} image={img} onDelete={deleteImage} />
        ));
    };

    return (
        <>
            <div id="filter-search-container" className="flex justify-center items-center gap-4 pt-45">
                <FilterButtons filters={FILTERS} currFilter={currFilter} onChange={setFilter} />
                {user && (
                    <button onClick={handleUpload} className="bg-(--brand-primary-red) text-white h-13 px-6 rounded-3xl cursor-pointer flex gap-1 items-center">Upload<img src="/assets/cloud_upload_white.svg" alt="upload icon" className="w-5 h-5"/></button>
                )}
            </div>
            <div id="gallery-container" className="p-10 w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                    {renderImages()}
                </div>
            </div>
            <MetadataModal isOpen={modalOpen && uploadQueue.length > 0} close={handleClose} cloudinaryInfo={uploadQueue[0]} save={saveImage} onSave={handleAdvance} onSkip={handleSkip} onSkipAll={handleSkipAll} remaining={uploadQueue.length} total={total} />
        </>
    )
}

export default GalleryGrid;