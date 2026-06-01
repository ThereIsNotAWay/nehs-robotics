import Header from "/src/components/Header";

const Home = () => {
    return (
        <>
            <Header className="fixed top-0"></Header>
            <div id="landing">
                <div id="hero-text">
                    <h1 className="w-150 leading-12">Empowering tomorrow's innovators.</h1>
                    <p className="w-100 leading-7 pt-4">Based in Philadelphia's Northeast High School and home to the Vikings.</p>
                </div>
            </div>
        </>
    )
}

export default Home;