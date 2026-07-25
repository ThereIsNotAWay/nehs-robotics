import dodstem from "/assets/Full_Color_DoDSTEM_Logo.png";
import sparc from "/assets/sparcboosterslogo.png";
import jandj from "/assets/JNJ_Logo_SingleLine_Red_RGB.svg";

/*
 * Mapping of sponsor to sponsor logo.
 * Format: [UpperCaseSponsor] => Imported file name of logo
*/
const SponsorLookup = {
    DoDSTEM: dodstem,
    SPARC: sparc,
    JohnsonAndJohnson: jandj,
};

const Sponsors = ({ sponsor }) => {
    return (
        <img className="w-56.25 h-auto" id={sponsor} src={SponsorLookup[sponsor]} alt={`${sponsor} logo`}/>
    )
}

export default Sponsors;