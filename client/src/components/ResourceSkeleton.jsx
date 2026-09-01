const ResourceSkeleton = () => {
    return (
        <div id="resource">
            <div className="skeleton-shimmer h-4 w-2/3 rounded-md mb-2"></div>
            <div className="skeleton-shimmer h-4 w-full rounded-md mb-2"></div>
            <div className="skeleton-shimmer h-4 w-5/6 rounded-md mb-2"></div>
            <div className="skeleton-shimmer h-4 w-1/2 rounded-md mb-2"></div>
            <div className="skeleton-shimmer h-4 w-32 rounded-md"></div>
            <hr className="p-2 mt-2"></hr>
        </div>
    );
};

export default ResourceSkeleton;