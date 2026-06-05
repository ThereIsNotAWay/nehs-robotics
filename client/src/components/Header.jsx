import logo from '/src/assets/logo.png';

const Header = () => {
    return (
        <>
            <header className="p-4 top-0 fixed z-10 w-full">
                <nav id="navbar" className="flex items-center w-full p-1 pl-8 pr-8 bg-(--brand-primary-neutral)">
                    <a href="/" className="logo-container flex flex-row gap-3 items-center p-3.5">
                        <img src={logo} alt="Vikings Robotics Logo" className="w-15"/>
                        <h3 className="text-(--brand-primary-black)">Vikings Robotics</h3>
                    </a>
                    <ul className="flex gap-10 items-center ml-auto p-3.5">
                        <li><a href="/resources">Resources</a></li>
                        <li><a href="/gallery">Gallery</a></li>
                        <li><a href="/about">About</a></li>
                        <button className="bg-(--brand-primary-red) text-(--brand-primary-neutral) pt-2 pb-2 pl-6 pr-6 rounded-xl">Join Us!</button>
                    </ul>
                </nav>
            </header>
        </>
    )
}

export default Header;