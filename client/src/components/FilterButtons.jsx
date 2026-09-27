import { motion } from "motion/react";

const FilterButtons = ({ filters, currFilter, onChange, layoutId="activeFilterHighlight" }) => {
    return (
        <div className="flex justify-center items-center w-fit bg-(--brand-primary-black) rounded-4xl h-13 p-1 max-w-full">
            {filters.map(({label, filter}) => (
                <button key={filter} onClick={() => onChange(filter)} className="relative xl:px-8 md:px-8 py-2 px-3 rounded-full cursor-pointer xl:w-full md:w-full w-fit">
                    {currFilter === filter && (
                        <motion.div layoutId={layoutId} transition={{type: "spring", stiffness: 400, damping: 32}} className="absolute inset-0 bg-(--brand-primary-neutral) rounded-4xl w-full z-10"/>
                    )}
                    <span className="relative z-10" style={{color: currFilter === filter ? "var(--brand-primary-black)" : "var(--brand-primary-neutral)"}}>{label}</span>
                </button>
            ))}
        </div>
    )
};

export default FilterButtons;