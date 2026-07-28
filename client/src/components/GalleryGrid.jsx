import { motion } from "motion/react";
import { useState, useEffect } from "react";

const GalleryGrid = () => {
    const [currFilter, setFilter] = useState("all");
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            let url = currFilter;

            if (currFilter === "all") {
                url = '/api/gallery';
            } else {
                url = `/api/gallery?category=${currFilter}`;
            }

            const res = await fetch(url);

            if (!res.ok) {
                throw new Error(`${res.status}`);
            }

            const data = await res.json();
            setImages(data);
        }
        fetchImages();
    }, [currFilter]);

    const renderImages = () => {
        if (images.length === 0) {
            return <p className="pb-24">No images were found.</p>;
        }

        return images.map((i, index) => (
            <div key={index} className="mb-4 break-inside-avoid overflow-hidden">
                <motion.img whileHover={{ filter: "brightness(0.75)", scale: 1.05 }} loading="lazy" src={i.src} className="w-200 aspect-square object-cover cursor-pointer"/>
            </div>
        ));
    }

    return (
        <div id="masonry-container" className="p-20">
            <div className="columns-1 sm:columns-2 lg:columns-3 py-10 md:py-20 gap-4">
                {renderImages()}
            </div>
        </div>
    )
}

export default GalleryGrid;