import instagram from '/assets/instagram_colored.svg';
import tiktok from '/assets/tiktok_colored.svg';
import arrowUpright from '/assets/arrow-upright-rounded.svg'
import { motion } from "motion/react";

/*
 * Mapping of prop to social icon.
 * Format: [UppercaseSocial] => Imported file name
*/
const IconLookup = {
    Instagram: instagram,
    TikTok: tiktok,
}

/*
 * Mapping of prop to social link.
 * Format: [UppercaseSocial] => Social redirect link
*/
const LinkLookup = {
    Instagram: "https://www.instagram.com/nehs.robotics/",
    TikTok: "https://www.tiktok.com/@nehs.vikings.10143/",
}

const SocialCard = ({ social }) => {
    return (
        <motion.a target="_blank" rel="noopener noreferrer" href={LinkLookup[social]} whileHover={{ rotateX: 10, rotateY: 10, backgroundColor: "rgba(0,0,0,0.05)" }} transition={{ type: "spring", stiffness: 250, ease: "linear" }} className="card cursor-pointer flex flex-col items-center justify-center text-center w-fit h-90 border-2 rounded-3xl p-20 relative">
            <img src={arrowUpright} alt="Arrow pointing up and to the right" width={50} className="absolute top-2 right-2" />
            <img src={IconLookup[social]} alt={`${social} logo`} width={120} className=""/>
        </motion.a>
    )
}

export default SocialCard;