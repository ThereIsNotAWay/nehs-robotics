import { motion } from "motion/react";

const FilterButtons = ({ filters, currFilter, onChange, layoutId="activeFilterHighlight" }) => {
    return (
        <div className="flex justify-center items-center w-fit bg-(--brand-primary-black) rounded-4xl h-13 p-1">
            {filters.map(({label, filter}) => (
                <button key={filter} onClick={() => onChange(filter)} className="relative px-8 py-2 rounded-3xl cursor-pointer">
                    {currFilter === filter && (
                        <motion.div layoutId={layoutId} transition={{type: "spring", stiffness: 400, damping: 32}} className="absolute inset-0 bg-(--brand-primary-neutral) rounded-3xl z-10"/>
                    )}
                    <span className="relative z-10" style={{color: currFilter === filter ? "var(--brand-primary-black)" : "var(--brand-primary-neutral)"}}>{label}</span>
                </button>
            ))}
        </div>
    )
};

export default FilterButtons;