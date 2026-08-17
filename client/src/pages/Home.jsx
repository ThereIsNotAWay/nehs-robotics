import Sponsors from "../components/Sponsors";
import ChallengeCards from "../components/ChallengeCards";
import { motion } from "motion/react";

const Home = () => {
    return (
        <div className="max-w-480 mx-auto">
            <div id="landing" className="flex pt-28 items-center justify-center pb-8">
                <div id="main-hook" className="flex rounded-xl p-8 gap-8">
                    <div id="text-landing-layout" className="p-8 gap-1 flex flex-col h-full">
                        <h5 className="text-(--brand-primary-red) leading-10">FRC Team 10143 Vikings Robotics</h5>
                        <h1 className="leading-16">Empowering tomorrow's innovators.</h1>
                        <motion.a id="latest-news" target="_blank" rel="noopener noreferrer" href={"https://www.instagram.com/p/DR8tZeIjVF7/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="} whileHover={{ rotateX: 10, rotateY: 10, backgroundColor: "rgba(115, 6, 10, 0.95)" }} transition={{ type: "spring", stiffness: 250, ease: "linear" }} className="card relative bg-(--brand-primary-red) p-6 flex flex-col justify-between mt-6">
                            <h5 className="text-(--brand-primary-neutral)">Latest News</h5>
                            <img className="absolute top-2 right-2 invert" width={35} src="/assets/arrow-upright-rounded.svg"/>
                            <p className="text-(--brand-primary-neutral)/80">Paul's Run senior-to-senior outreach!</p>
                            <img src="/assets/senioroutreach.jpg" className="mt-4 rounded-lg border"/>
                        </motion.a>
                    </div>
                    <div id="landing-images" className="max-w-275 max-h-173 flex rounded-2xl border-2">
                        <img className="max-w-90 aspect-9/16 object-cover rounded-l-xl" src="/assets/landingPhoto1.jpg" />
                        <img className="max-w-90 aspect-9/16 object-cover" src="/assets/landingPhoto2.jpg" />
                        <img className="max-w-90 aspect-9/16 object-cover object-[66%] rounded-r-xl" src="/assets/landingPhoto3.jpg" />
                    </div>
                </div>
            </div>
            <hr className="max-w-480 border"></hr>
            <div id="sponsors-container" className="flex w-full h-full items-stretch justify-center p-10 gap-20">
                <h5 className="flex items-center border-r-2 pr-16">Currently backed by:</h5>
                <Sponsors sponsor="DoDSTEM" />
                <Sponsors sponsor="SPARC" />
                <Sponsors sponsor="JohnsonAndJohnson" />
            </div>
            <hr className="max-w-480 border"></hr>
            <div id="competition-display" className="p-8 flex flex-col pt-10">
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
                    <img src="/assets/cta2.jpg" alt="Vikings working on the FRC robot pointing at the camera."/>
                    <img src="/assets/cta3.jpg" alt="Vikings gathering with their medals and trophy."/>
                    <img src="/assets/cta4.jpg" alt="Vikings working on the robot from afar."/>
                    <img className="object-[50%_30%]" src="/assets/cta5.jpg" alt="Collectible card created by another team for the Vikings robot."/>
                    <img src="/assets/cta6.jpg" alt="Vikings posing with their thumbs up at a competition."/>
                    <div id="gallery-redirect" className="bg-(--brand-primary-red) w-full h-full flex items-center justify-center">
                        <a id="gallery-link" className="w-full h-full text-center items-center flex justify-center text-(--brand-primary-neutral)" href="/gallery">See More in our Gallery</a>
                    </div>
                    <img src="/assets/cta7.jpg" alt="."/>
                </div>
            </div>
            <div id="call-to-action" className="flex flex-col p-20 items-center gap-2">
                <h1 className="text-center leading-20">Ready to join the Vikings?</h1>
                <motion.a whileTap={{ scale: 0.95 }} href="https://forms.gle/RuNvWXXtucnL5UcZ9" target="_blank" rel="noopener noreferrer" className="cta-btn pl-8 pr-8 pt-2 pb-2">Interest Form</motion.a>
            </div>
        </div>
    );
};

export default Home;