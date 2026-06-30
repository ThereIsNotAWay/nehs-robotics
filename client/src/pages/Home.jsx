import Header from "/src/components/Header";
import Footer from "/src/components/Footer";
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
                <img className="w-56.25 h-auto" src="/src/assets/Full_Color_DoDSTEM_Logo.png" alt="DoDStem Logo"/>
                <img className="w-23 h-auto" src="/src/assets/sparcboosterslogo.png" alt="SPARC Boosters Logo"/>
                <img className="w-56.25 h-auto" src="/src/assets/JNJ_Logo_SingleLine_Red_RGB.svg" alt="Johnson & Johnson Logo"/>
            </div>
            <div id="competition-display" className="p-8 flex flex-col">
                <h1 className="text-center leading-20">Three competitions, each an opportunity to grow.</h1>
                <p className="text-center leading-7">Our students compete in three different challenges: <br></br> FIRST Robotics Challenge (FRC), FIRST Tech Challenge (FTC), and Seaglide. <br></br> Learn more below!</p>
            </div>
            <div id="challenge-cards" className="flex items-center justify-center gap-16 p-8 w-full">
                <motion.div whileHover={{ scale: 1.05, transition: { duration: 0.2 } }} transition={{ duration: 0.2 }} className="card flex flex-col w-100 h-175 items-center justify-center text-center p-8 gap-4 shadow-2xl">
                    <img src="/src/assets/2024-2025-FRC-Robot.png" alt="2024-2025 Season FRC Robot"/>
                    <h3 className="leading-8">FIRST Robotics Competition</h3>
                    <p className="w-70 leading-7 pb-2">Held annually for high schoolers across the globe. Students are expected to complete their robot’s production in six-weeks, kicking off in early January.</p>
                    <motion.a whileTap={{ scale: 0.95 }} target="_blank" rel="noopener noreferrer" href="https://www.firstinspires.org/programs/frc/" className="bg-(--brand-primary-red) text-(--brand-primary-neutral) pl-12 pr-12 pt-2 pb-2 rounded-xl ring-(--brand-primary-red) hover:bg-(--brand-primary-neutral) hover:ring-2 hover:ring-(--brand-primary-black) hover:text-(--brand-primary-black)">Read More</motion.a>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05, transition: { duration: 0.2 } }} transition={{ duration: 0.2 }} className="card flex flex-col w-100 h-175 items-center justify-center text-center p-8 gap-4 shadow-2xl">
                    <img src="/src/assets/2023-2024-Seaglide-Drone.png" alt="2024-2025 Season FRC Robot"/>
                    <h3 className="leading-8">SeaGlide Challenge</h3>
                    <p className="w-70 leading-7 pb-2">Research and design an autonomous underwater vehicle (AUV). Present and compile findings into a paper. Participate in a code debugging challenge.</p>
                    <motion.a whileTap={{ scale: 0.95 }} target="_blank" rel="noopener noreferrer" href="https://seaglide.org/" className="bg-(--brand-primary-red) text-(--brand-primary-neutral) pl-12 pr-12 pt-2 pb-2 rounded-xl ring-(--brand-primary-red) hover:bg-(--brand-primary-neutral) hover:ring-2 hover:ring-(--brand-primary-black) hover:text-(--brand-primary-black)">Read More</motion.a>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05, transition: { duration: 0.2 } }} transition={{ duration: 0.2 }} className="card flex flex-col w-100 h-175 items-center justify-center text-center p-8 gap-4 shadow-2xl">
                    <img src="/src/assets/2023-2024-FTC-Robot.png" alt="2024-2025 Season FRC Robot"/>
                    <h3 className="leading-8">FIRST Tech Challenge</h3>
                    <p className="w-60 leading-7 pb-2">Held annually for students in grades 7-12. Kicks off in September and robots are generally less complex than those seen in FRC.</p>
                    <motion.a whileTap={{ scale: 0.95 }} target="_blank" rel="noopener noreferrer" href="https://www.firstinspires.org/programs/ftc/" className="bg-(--brand-primary-red) text-(--brand-primary-neutral) pl-12 pr-12 pt-2 pb-2 rounded-xl ring-(--brand-primary-red) hover:bg-(--brand-primary-neutral) hover:ring-2 hover:ring-(--brand-primary-black) hover:text-(--brand-primary-black)">Read More</motion.a>
                </motion.div>
            </div>
            <div id="showcase-header" className="flex flex-col p-8">
                <h1 className="text-center leading-20">Let your curiosities set sail.</h1>
                <p className="text-center leading-7">Our team welcomes a diverse set of people and skills. <br></br> Our workshop is the perfect place to learn and grow, regardless of your experience.</p>
            </div>
            <div id="gallery-container" className="flex justify-center w-full pt-8">
                <div id="scattered-gallery">
                    <img src="/src/assets/cta1.jpg" alt="Vikings taking a selfie at a competition."/>
                    <div></div>
                    <img src="/src/assets/cta3.jpg" alt="Vikings gathering with their medals and trophy."/>
                    <div></div>
                    <div></div>
                    <img src="/src/assets/cta2.jpg" alt="Vikings posing with their thumbs up at a competition."/>
                    <div id="gallery-redirect" className="bg-(--brand-primary-red) w-full h-full flex items-center justify-center">
                        <a id="gallery-link" className="w-full h-full text-center items-center flex justify-center text-(--brand-primary-neutral)" href="/gallery">See More in our Gallery</a>
                    </div>
                    <img src="/src/assets/cta4.jpg" alt="Vikings working from afar."/>
                </div>
            </div>
            <div id="call-to-action" className="flex flex-col p-20 items-center gap-2">
                <h1 className="text-center leading-20">Ready to join the Vikings?</h1>
                <motion.a whileTap={{ scale: 0.95 }} href="https://forms.gle/RuNvWXXtucnL5UcZ9" target="_blank" rel="noopener noreferrer" className="cta-btn pl-8 pr-8 pt-2 pb-2">Interest Form</motion.a>
            </div>
            <Footer></Footer>
        </>
    )
}

export default Home;