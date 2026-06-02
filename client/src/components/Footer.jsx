import logo from '/src/assets/logo.png';

const Footer = () => {
    return (
        <>
            <footer>
                <div id="socials" className="flex flex-col w-full h-full justify-center pl-20">
                    <h5>Connect With Us</h5>
                    <div className="flex flex-row">
                        <img className="w-8 h-auto" src="/src/assets/instagram.svg" alt="Instagram logo."/>
                        <img className="w-10 h-auto" src="/src/assets/tiktok.svg" alt="Tiktok logo."/>
                    </div>
                </div>
                <div id="find-more" className="flex flex-col pb-2 w-full h-full justify-center pl-20">
                    <h5>Find More</h5>
                    <div id="redirects" className="flex gap-4">
                        <a href="/about">About</a>
                        <a href="/gallery">Gallery</a>
                        <a href="/resources">Resources</a>
                    </div>
                </div>
                <div id="footer-logo" className="logo-container flex flex-row gap-3 items-center justify-center p-3.5 w-full h-full">
                    <img src={logo} alt="Vikings Robotics Logo" className="w-15"/>
                    <h3 className="pl-2">Vikings Robotics</h3>
                </div>
            </footer>
        </>
    )
}

export default Footer;