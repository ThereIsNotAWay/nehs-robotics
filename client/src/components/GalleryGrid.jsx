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
            return <p className="pb-24">No images were found (placeholder).</p>;
        }

        return images.map((i, index) => (
            <div key={index} className="mb-4 break-inside-avoid overflow-hidden">
                <motion.img whileHover={{ filter: "brightness(0.75)", scale: 1.05 }} loading="lazy" src={i.src} className="w-200 aspect-square object-cover cursor-pointer"/>
            </div>
        ));
    }

    return (
        <>
            <div id="filter-search-container" className="flex justify-center pt-45">
                <div id="filters-container" className="flex justify-center items-center bg-(--brand-primary-black) rounded-3xl h-13">
                    <button onClick={() => setFilter("all")}>All</button>
                    <button onClick={() => setFilter("FTC")}>FTC</button>
                    <button onClick={() => setFilter("FRC")}>FRC</button>
                    <button onClick={() => setFilter("SeaGlide")}>SeaGlide</button>
                </div>
            </div>
            <div id="gallery-container" className="p-10">
                <div className="columns-1 sm:columns-2 lg:columns-3 py-5 gap-4">
                    {renderImages()}
                </div>
            </div>
        </>
    )
}

export default GalleryGrid;