import { useState, useEffect } from "react";

import Header from "/src/components/Header";
import Footer from "/src/components/Footer";
import Resource from "/src/components/Resource";

const Resources = () => {
    const [currFilter, setFilter] = useState("all");
    const [resources, setResources] = useState([]);

    useEffect(() => {
        const fetchResources = async () => {
            let url = currFilter;

            if (currFilter === "all") {
                url = '/api/resources';
            } else {
                url = `/api/resources?category=${currFilter}`;
            }

            const res = await fetch(url);

            if (!res.ok) {
                throw new Error(`Error: ${res.status}`);
            }

            const data = await res.json();
            setResources(data);
        }
        fetchResources();
    }, [currFilter]);

    const renderResources = () => {
        if (resources.length === 0) {
            return <p className="pb-24">No resources were found.</p>;
        }

        return resources.map(r => (
            <Resource key={r.id} resource={r}></Resource>
        ));
    }

    return (
        <>
            <Header />
            <div id="resources-header" className="flex flex-col p-8 pt-40">
                <h1 className="text-center leading-20">Viking Resources</h1>
                <p className="text-center leading-7">Find details on competitions, beginner guides, and archived works.</p>
            </div>
            <div id="filter-search-container" className="p-8 flex gap-100 justify-center">
                <div id="filters-container" className="flex justify-center items-center bg-(--brand-primary-black) rounded-3xl">
                    <button onClick={() => setFilter("all")}>All</button>
                    <button onClick={() => setFilter("archive")}>Archive</button>
                    <button onClick={() => setFilter("competitions")}>Competitions</button>
                    <button onClick={() => setFilter("guides")}>Guides</button>
                </div>
                <div className="search-bar-container flex items-center">
                    <form action="/search.html" method="GET" className="search-bar flex justify-center items-center p-1 rounded-3xl gap-1">
                        <input type="text" placeholder="Enter a search term" name="query" className="w-100 h-8 rounded-3xl p-4"/>
                        <button type="submit" className="cursor-pointer bg-(--brand-primary-red) rounded-3xl w-19 h-10 flex justify-center items-center"><img src="/assets/search.svg" alt="search icon"/></button>
                    </form>
                </div>
            </div>
            <div id="resources" className="p-20">
                {renderResources()}
            </div>
            <Footer />
        </>
    )
}

export default Resources;