import Sponsors from "../components/Sponsors";
import ChallengeCards from "../components/ChallengeCards";
import { motion } from "motion/react";

const Home = () => {
    return (
        <div className="max-w-480 mx-auto xl:pt-12 pt-28">
            <div id="landing" className="flex items-center justify-center h-dvh max-h-360">
                <div id="main-hook" className="flex w-full flex-col items-center justify-center rounded-xl p-4 gap-8 xl:flex-row xl:gap-0">
                    <div className="flex flex-col justify-center items-center xl:items-start">
                        <div id="text-landing-layout" className="flex w-full xl:w-100 flex-col gap-1 px-8 text-center xl:text-left h-full">
                            <h5 className="text-(--brand-primary-red) leading-8 text-nowrap">FRC Team 10143 • Vikings Robotics</h5>
                            <h1 className="leading-13">Empowering tomorrow's innovators.</h1>
                        </div>
                        <div className="flex w-full px-4 sm:px-10 items-center justify-center xl:justify-start pt-6">
                            <motion.a id="latest-news" target="_blank" rel="noopener noreferrer" href={"https://www.instagram.com/p/DR8tZeIjVF7/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="} whileHover={{ rotateX: 10, rotateY: 10, backgroundColor: "rgba(115, 6, 10, 0.95)" }} transition={{ type: "spring", stiffness: 250, ease: "linear" }} className="card w-full max-w-75 xl:w-70 xl:h-65 md:h-fit relative bg-(--brand-primary-red) p-4 sm:p-6 flex flex-col">
                                <h5 className="text-(--brand-primary-neutral)">Latest News</h5>
                                <img className="absolute top-2 right-2 invert" width={35} src="/assets/arrow-upright-rounded.svg"/>
                                <p className="text-(--brand-primary-neutral)/80">Paul's Run senior-to-senior outreach!</p>
                                <img src="/assets/senioroutreach.jpg" className="mt-4 xl:h-25 xl:object-cover rounded-lg border hidden xl:flex"/>
                            </motion.a>
                        </div>
                    </div>
                    <div className="xl:pr-6 pr-0 w-full xl:w-[65%]">
                        <div id="landing-images" className="flex overflow-hidden rounded-2xl border-2 h-auto md:h-120">
                            <img className="aspect-9/16 min-w-0 flex-1 object-cover" src="/assets/landingPhoto1.jpg" alt="Vikings Robotics students at an event." />
                            <img className="aspect-9/16 min-w-0 flex-1 object-cover" src="/assets/landingPhoto2.jpg" alt="Vikings Robotics students working together." />
                            <img className="aspect-9/16 min-w-0 flex-1 object-cover object-[66%]" src="/assets/landingPhoto3.jpg" alt="Vikings Robotics team members." />
                        </div>
                    </div>
                </div>
            </div>
            <hr className="xl:max-w-480 border"></hr>
            <div id="sponsors-container" className="flex xl:flex-row flex-col w-full h-full items-center justify-center xl:p-6 p-10 xl:gap-20 gap-8">
                <h5 className="flex items-center justify-center xl:w-auto w-full h-full xl:border-r-2 xl:border-b-0 border-b-2 p-8">Currently backed by:</h5>
                <Sponsors sponsor="DoDSTEM" />
                <Sponsors sponsor="SPARC" />
                <Sponsors sponsor="JohnsonAndJohnson" />
            </div>
            <hr className="max-w-480 border"></hr>
            <div id="competition-display" className="p-8 flex flex-col pt-16 items-center">
                <h1 className="text-center leading-13 xl:leading-20">Three competitions, each an opportunity to grow.</h1>
                <p className="text-center leading-7 pt-4 xl:p-0 max-w-180">Our students compete in three different challenges: the FIRST Robotics Challenge (FRC), the FIRST Tech Challenge (FTC), and the Seaglide Challenge. Learn more below!</p>
            </div>
            <div id="challenge-cards" className="flex xl:flex-row flex-col items-center justify-center xl:gap-12 gap-8 p-8 w-full">
                <ChallengeCards challenge="FRC"/>
                <ChallengeCards challenge="SeaGlide"/>
                <ChallengeCards challenge="FTC"/>
            </div>
            <div id="showcase-header" className="flex flex-col p-8">
                <h1 className="text-center xl:leading-20 leading-13">Let your curiosities set sail.</h1>
                <p className="text-center leading-7 xl:p-0 p-4">Our team welcomes a diverse set of people and skills. <br></br> Our workshop is the perfect place to learn and grow, regardless of your experience.</p>
            </div>
            <div id="gallery-container" className="flex justify-center w-full pt-8">
                <div id="scattered-gallery" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 w-full max-w-380">
                    <img className="aspect-[23.63/15.5] w-full object-cover" src="/assets/cta1.jpg" alt="Vikings taking a selfie at a competition."/>
                    <img className="aspect-[23.63/15.5] w-full object-cover" src="/assets/cta2.jpg" alt="Vikings working on the FRC robot pointing at the camera."/>
                    <img className="aspect-[23.63/15.5] w-full object-cover" src="/assets/cta3.jpg" alt="Vikings gathering with their medals and trophy."/>
                    <img className="aspect-[23.63/15.5] w-full object-cover" src="/assets/cta4.jpg" alt="Vikings working on the robot from afar."/>
                    <img className="aspect-[23.63/15.5] w-full object-cover object-[50%_30%]" src="/assets/cta5.jpg" alt="Collectible card created by another team for the Vikings robot."/>
                    <img className="aspect-[23.63/15.5] w-full object-cover" src="/assets/cta6.jpg" alt="Vikings posing with their thumbs up at a competition."/>
                    <div id="gallery-redirect" className="aspect-[23.63/15.5] bg-(--brand-primary-red) w-full flex items-center justify-center">
                        <a id="gallery-link" className="w-full h-full text-center items-center flex justify-center text-(--brand-primary-neutral) p-8" href="/gallery">See More in our Gallery</a>
                    </div>
                    <img className="aspect-[23.63/15.5] w-full object-cover" src="/assets/cta7.jpg" alt="."/>
                </div>
            </div>
            <div id="call-to-action" className="flex flex-col p-16 items-center xl:gap-2 gap-6">
                <h1 className="text-center leading-13 xl:leading-20">Ready to join the Vikings?</h1>
                <motion.a whileTap={{ scale: 0.95 }} href="https://forms.gle/RuNvWXXtucnL5UcZ9" target="_blank" rel="noopener noreferrer" className="cta-btn pl-8 pr-8 pt-2 pb-2">Interest Form</motion.a>
            </div>
        </div>
    );
};

export default Home;