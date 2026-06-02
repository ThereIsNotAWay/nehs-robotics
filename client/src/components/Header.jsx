import logo from '/src/assets/logo.png';

const Header = () => {
    return (
        <>
            <header className="p-4 top-0 fixed z-10 w-full">
                <nav id="navbar" className="flex items-center w-full p-1 pl-8 pr-8 bg-(--brand-primary-neutral)">
                    <div className="logo-container flex flex-row gap-3 items-center p-3.5">
                        <img src={logo} alt="Vikings Robotics Logo" className="w-15"/>
                        <h3>Vikings Robotics</h3>
                    </div>
                    <ul className="flex gap-10 items-center ml-auto p-3.5">
                        <li><h4>Resources</h4></li>
                        <li><h4>Gallery</h4></li>
                        <li><h4>About</h4></li>
                        <button className="bg-(--brand-primary-red) text-(--brand-primary-neutral) pt-2 pb-2 pl-6 pr-6 rounded-xl">Join Us!</button>
                    </ul>
                </nav>
            </header>
        </>
    )
}

export default Header;