const Resource = ({ resource }) => {
    return (
        <div id="resource">
            <h3 className="leading-10">{resource.title}</h3>
            <p className="leading-8">{resource.description}</p>
            <a target="_blank" rel="noopener noreferrer" href={resource.link}>Link to Resource</a>
            <hr className="p-2 mt-2"></hr>
        </div>
    )
}

export default Resource;