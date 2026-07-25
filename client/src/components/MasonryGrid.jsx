const images = Object.keys(import.meta.glob("/public/gallery/*.{jpg,jpeg,png,webp}")).map((path) => path.replace("/public", ""));

const MasonryGrid = () => {
    return (
        <div id="masonry-container" className="p-20">
            <div className="columns-1 sm:columns-2 lg:columns-3 py-10 md:py-20 gap-4">
                {images.map((src, index) => (
                    <div key={index} className="mb-4 break-inside-avoid">
                        <img loading="lazy" src={src} className="w-full object-cover"/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MasonryGrid;