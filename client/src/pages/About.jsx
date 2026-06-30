import Header from "../components/Header";
import Footer from "../components/Footer";
import { motion } from "motion/react";

const About = () => {
    return (
        <>
            <Header />
                <div id="resources-header" className="flex flex-col p-16 pt-40">
                    <h6 className="leading-50">STUDENT DRIVEN</h6>
                    <h6 className="leading-50 text-(--brand-primary-red)">BUILDING</h6>
                </div>
                <div id="stat-highlight" className="flex flex-row text-center gap-10 p-10">
                    <h3 className="w-full leading-10"><span className="text-(--brand-primary-red)">20+</span><br></br>Members</h3>
                    <h3 className="w-full leading-10"><span className="text-(--brand-primary-red)">3</span><br></br>Competitions</h3>
                    <h3 className="w-full leading-10"><span className="text-(--brand-primary-red)">4</span><br></br>Awards</h3>
                </div>
                <div id="mission-statement" className="flex flex-col bg-(--brand-primary-red) pt-36 pb-36 pl-32 pr-32 relative">
                    <div id="mission-text" className="text-(--brand-primary-neutral) w-120">
                        <h1 className="pb-2">Our Mission</h1>
                        <p>Robotics at Northeast High School aims to continue creating opportunities for students to design, collaborate, compete, and more. <br></br> <br></br> We strive to foster transferable skills in our students pertaining to the field of engineering and robotics, while bolstering soft skills in teamwork and leadership.</p>
                    </div>
                    <img src="/src/assets/seaglidestill.png" alt="Vikings in the workshop." className="absolute right-0 top-1/2 -translate-y-1/2"/>
                </div>
                <div id="address-info" className="p-15 pl-30 pr-30 flex flex-row gap-35 items-center justify-center">
                    <div id="address-text">
                        <h1 className="leading-13 pb-4">Based in Northeast <br></br> High School</h1>
                        <p>1601 Cottman Ave <br></br> Philadelphia, PA 19111 <br></br> <br></br> Meet us in the SPARC Wing!</p>
                    </div>
                    <iframe width="500" height="500" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3053.8840935419366!2d-75.07372712362339!3d40.05568747149999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c6b6a519e2d9e1%3A0x45a937f56cb96d67!2sNortheast%20High%20School!5e0!3m2!1sen!2sus!4v1781818951224!5m2!1sen!2sus" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
                </div>
                <div id="about-sparc" className="text-center pt-20 pb-20 pl-60 pr-60 flex flex-col items-center justify-center">
                    <div id="about-text" className="pb-6 w-220">
                        <h1 className="pb-4">The Space Research Center (SPARC)</h1>
                        <p>Originally called the Project Space Research Capsule, SPARC was a government and NASA recognized program where students designed and built a three-man space capsule to simulate and test astronaut abilities to handle space environments. <br></br> <br></br> In present day, the SPARC wing in Northeast High School is used for after-school activities encompassing fields of medicine, computer science, engineering, flight, and robotics. Project SPARC Boosters is an organization that sponsors robotics and many of the other after-school programs.</p>
                    </div>
                    <motion.a whileTap={{ scale: 0.95 }} target="_blank" rel="noopener noreferrer" href="https://www.nehssparcboosters.org/" className="pt-2 pb-2 pl-8 pr-8 rounded-xl text-(--brand-primary-neutral) bg-(--brand-primary-red) ring-(--brand-primary-red) hover:bg-(--brand-primary-neutral) hover:ring-2 hover:ring-(--brand-primary-black) hover:text-(--brand-primary-black)">See Their Page</motion.a>
                </div>
            <Footer></Footer>
        </>
    )
}

export default About;