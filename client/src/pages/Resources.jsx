import { useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { useResources } from "../utils/useResources";
import { motion } from "motion/react";
import FilterButtons from "../components/FilterButtons";
import Resource from "../components/Resource";
import ResourceSkeleton from "../components/ResourceSkeleton";
import NewResourceModal from "../components/NewResourceModal";

const Resources = () => {
    const { user } = useAuth();
    const { currFilter, setFilter, resources, loading, error, createResource, deleteResource, editResource } = useResources();
    const [isModalOpen, setModalOpen] = useState(false);

    const FILTERS = [
        {label: "All", filter: "all"},
        {label: "Archive", filter: "archive"},
        {label: "Competitions", filter: "competitions"},
        {label: "Guides", filter: "guides"},
    ];

    const renderResources = () => {
        if (loading) {
            return Array.from({length: 3}).map((_, i) => (
                <ResourceSkeleton key={i} />
            ));
        }

        if (error) {
            return <p className="text-center xl:px-0 px-8">{error}</p>;
        }

        if (resources.length === 0) {
            return <p>No resources were found.</p>;
        }

        return resources.map(r => (
            <Resource key={r.id} resource={r} onDelete={deleteResource} onEdit={editResource}></Resource>
        ));
    }

    return (
        <>
            <div className="flex justify-center items-center m-auto">
                <div id="resources-header" className="flex flex-col p-2 pt-40 w-fit text-center">
                    <h1 className="text-center leading-20">Viking Resources</h1>
                    <p className="text-center leading-7">Find details on competitions, beginner guides, and archived works.</p>
                </div>
            </div>
            <div id="filter-search-container" className="flex justify-center items-center max-w-full py-10 px-2">
                <FilterButtons filters={FILTERS} currFilter={currFilter} onChange={setFilter} />
                {user && (
                    <motion.button onClick={() => setModalOpen(true)} whileHover={{backgroundColor: "rgba(24, 24, 17, 1)"}} whileTap={{scale: 0.95}} transition={{duration: 0.2}} className="bg-(--brand-primary-red) text-(--brand-primary-neutral) pt-2 pb-2 pl-6 pr-6 rounded-3xl cursor-pointer">
                        + Create New
                    </motion.button>
                )}
                {/*
                <div className="search-bar-container flex items-center">
                    <form action="/search.html" method="GET" className="search-bar flex justify-center items-center p-1 rounded-3xl gap-1">
                        <input type="text" placeholder="Enter a search term" name="query" className="w-100 h-8 rounded-3xl p-4"/>
                        <button type="submit" className="cursor-pointer bg-(--brand-primary-red) rounded-3xl w-19 h-10 flex justify-center items-center"><img src="/assets/search.svg" alt="search icon"/></button>
                    </form>
                </div>
                */}
            </div>
            <div id="resources-container" className="flex justify-center items-center">
                <div id="resources" className="xl:px-24 px-8 pt-4 pb-16 w-full">
                    {renderResources()}
                </div>
            </div>
            <NewResourceModal isOpen={isModalOpen} close={() => setModalOpen(false)} create={createResource}/>
        </>
    )
}

export default Resources;