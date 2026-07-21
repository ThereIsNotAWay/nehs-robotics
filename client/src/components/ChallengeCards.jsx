import frcrobot from "/assets/2024-2025-FRC-Robot.png";
import seaglide from "/assets/2023-2024-SeaGlide-Drone.png";
import ftcrobot from "/assets/2023-2024-FTC-Robot.png";
import { motion } from "motion/react";

/*
 * Mapping of challenge to corresponding photo of robot.
 * Format: [UppercaseChallenge] => Imported photo of robot
*/
const ChallengeLookup = {
    FRC: frcrobot,
    SeaGlide: seaglide,
    FTC: ftcrobot,
};

/*
 * Mapping of challenge to corresponding challenge header.
 * Format: [UppercaseChallenge] => Header string
*/
const ChallengeHeaders = {
    FRC: "FIRST Robotics Competition",
    SeaGlide: "SeaGlide Challenge",
    FTC: "FIRST Tech Challenge",
};

/*
 * Mapping of challenge to corresponding challenge description.
 * Format: [UppercaseChallenge] => Description string
*/
const ChallengeDescriptions = {
    FRC: "Held annually for high schoolers across the globe. Students are expected to complete their robot’s production in six-weeks, kicking off in early January.",
    SeaGlide: "Research and design an autonomous underwater vehicle (AUV). Present and compile findings into a paper. Participate in a code debugging challenge.",
    FTC: "Held annually for students in grades 7-12. Kicks off in September and robots are generally less complex than those seen in FRC.",
};

/*
 * Mapping of challenge to corresponding challenge link.
 * Format: [UppercaseChallenge] => Redirect link
*/
const ChallengeLinks = {
    FRC: "https://www.firstinspires.org/programs/frc/",
    SeaGlide: "https://seaglide.org/",
    FTC: "https://www.firstinspires.org/programs/ftc/",
}

const ChallengeCards = ({ challenge }) => {
    return (
        <motion.div whileHover={{ scale: 1.05, transition: { duration: 0.2 } }} className="card flex flex-col w-100 h-175 items-center justify-center text-center p-8 gap-4">
            <img src={ChallengeLookup[challenge]} alt={`Example ${challenge} Robot`}/>
            <h3 className="leading-8">{ChallengeHeaders[challenge]}</h3>
            <p className="w-70 leading-7 pb-2">{ChallengeDescriptions[challenge]}</p>
            <motion.a whileTap={{ scale: 0.95 }} target="_blank" rel="noopener noreferrer" href={ChallengeLinks[challenge]} className="bg-(--brand-primary-red) text-(--brand-primary-neutral) pl-12 pr-12 pt-2 pb-2 rounded-xl ring-(--brand-primary-red) hover:bg-(--brand-primary-neutral) hover:ring-2 hover:ring-(--brand-primary-black) hover:text-(--brand-primary-black)">Read More</motion.a>
        </motion.div>
    )
};

export default ChallengeCards;