import logo from '/src/assets/logo.png';

const Footer = () => {
    return (
        <>
            <footer>
                <div id="socials" className="flex flex-col w-full h-full justify-center pl-20">
                    <h5 className="leading-8">Connect With Us</h5>
                    <div className="flex flex-row items-center">
                        <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/nehs.robotics?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="><img className="w-6 h-auto" src="/src/assets/instagram.svg" alt="Instagram logo."/></a>
                        <a target="_blank" rel="noopener noreferrer" href="https://www.tiktok.com/@nehs.vikings.10143?is_from_webapp=1&sender_device=pc"><img className="w-8 h-auto" src="/src/assets/tiktok.svg" alt="Tiktok logo."/></a>
                    </div>
                </div>
                <div id="find-more" className="flex flex-col w-full h-full justify-center pl-20">
                    <h5 className="leading-8">Find More</h5>
                    <div id="redirects" className="flex gap-4">
                        <a id="footer-links" href="/about">About</a>
                        <a id="footer-links" href="/gallery">Gallery</a>
                        <a id="footer-links" href="/resources">Resources</a>
                    </div>
                </div>
                <div className="logo-container flex flex-row gap-3 items-center justify-center p-3.5 w-full h-full">
                    <img src={logo} alt="Vikings Robotics Logo" className="w-15"/>
                    <h5>Vikings Robotics</h5>
                </div>
            </footer>
        </>
    )
}

export default Footer;