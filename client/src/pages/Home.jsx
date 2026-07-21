import Header from "/src/components/Header";
import Footer from "/src/components/Footer";
import Sponsors from "../components/Sponsors";
import ChallengeCards from "../components/ChallengeCards";
import { motion } from "motion/react";

const Home = () => {
    return (
        <>
            <Header />
            <div id="landing">
                <div id="hero-text">
                    <h1 className="w-150 leading-12">Empowering tomorrow's innovators.</h1>
                    <p className="w-100 leading-7 pt-4">Based in Philadelphia's Northeast High School and home to the Vikings.</p>
                </div>
            </div>
            <div id="sponsors" className="flex w-full items-center justify-center gap-20 p-5">
                <Sponsors sponsor="DoDSTEM" />
                <Sponsors sponsor="SPARC" />
                <Sponsors sponsor="JohnsonAndJohnson" />
            </div>
            <div id="competition-display" className="p-8 flex flex-col">
                <h1 className="text-center leading-20">Three competitions, each an opportunity to grow.</h1>
                <p className="text-center leading-7">Our students compete in three different challenges: <br></br> FIRST Robotics Challenge (FRC), FIRST Tech Challenge (FTC), and Seaglide. <br></br> Learn more below!</p>
            </div>
            <div id="challenge-cards" className="flex items-center justify-center gap-16 p-8 w-full">
                <ChallengeCards challenge="FRC"/>
                <ChallengeCards challenge="SeaGlide"/>
                <ChallengeCards challenge="FTC"/>
            </div>
            <div id="showcase-header" className="flex flex-col p-8">
                <h1 className="text-center leading-20">Let your curiosities set sail.</h1>
                <p className="text-center leading-7">Our team welcomes a diverse set of people and skills. <br></br> Our workshop is the perfect place to learn and grow, regardless of your experience.</p>
            </div>
            <div id="gallery-container" className="flex justify-center w-full pt-8">
                <div id="scattered-gallery">
                    <img src="/assets/cta1.jpg" alt="Vikings taking a selfie at a competition."/>
                    <div></div>
                    <img src="/assets/cta3.jpg" alt="Vikings gathering with their medals and trophy."/>
                    <div></div>
                    <div></div>
                    <img src="/assets/cta2.jpg" alt="Vikings posing with their thumbs up at a competition."/>
                    <div id="gallery-redirect" className="bg-(--brand-primary-red) w-full h-full flex items-center justify-center">
                        <a id="gallery-link" className="w-full h-full text-center items-center flex justify-center text-(--brand-primary-neutral)" href="/gallery">See More in our Gallery</a>
                    </div>
                    <img src="/assets/cta4.jpg" alt="Vikings working from afar."/>
                </div>
            </div>
            <div id="call-to-action" className="flex flex-col p-20 items-center gap-2">
                <h1 className="text-center leading-20">Ready to join the Vikings?</h1>
                <motion.a whileTap={{ scale: 0.95 }} href="https://forms.gle/RuNvWXXtucnL5UcZ9" target="_blank" rel="noopener noreferrer" className="cta-btn pl-8 pr-8 pt-2 pb-2">Interest Form</motion.a>
            </div>
            <Footer />
        </>
    )
}

export default Home;