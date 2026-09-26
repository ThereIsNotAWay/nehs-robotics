import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const CATEGORIES = ["FRC", "FTC", "SeaGlide"];

const buildDefaultTitle = (sequenceNumber) => {
    const now = new Date();
    const seq = String(sequenceNumber).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    return `Image-${seq}-${month}-${day}-${hours}${minutes}`;
};

const MetadataModal = ({ isOpen, close, cloudinaryInfo, save, onSave, onSkip, onSkipAll, remaining, total }) => {
    const [form, setForm] = useState({ category: "", title: "", description: "" });
    const [skipAll, setSkipAll] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    const currentIndex = total - remaining + 1;

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const resetForm = () => {
        setForm({ category: "", title: "", description: "" });
        setSkipAll(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError("");

        try {
            await save(cloudinaryInfo, form);
            resetForm();
            onSave();
        } catch (err) {
            if (err instanceof TypeError) {
                setError("We're having trouble connecting right now. Please try again.");
            } else {
                setError(err.message);
            }
        } finally {
            setSubmitting(false);
        }
    };

    const handleSkip = () => {
        setError("");

        const skipTemplate = {
            category: "all",
            title: buildDefaultTitle(currentIndex),
            description: "Description not provided.",
        };

        if (skipAll) {
            onSkipAll(skipTemplate, cloudinaryInfo);
        } else {
            onSkip(skipTemplate, cloudinaryInfo);
        }

        resetForm();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div onClick={close} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                    <motion.div onClick={(e) => e.stopPropagation()} initial={{opacity: 0, scale: 0.95}} animate={{opacity: 1, scale: 1}} exit={{opacity: 0, scale: 0.95}} className="bg-(--brand-primary-neutral) rounded-2xl p-8 w-full max-w-xl relative">
                        <button type="button" onClick={close} disabled={submitting} className="absolute top-6 right-6 w-9 h-9 rounded-full bg-(--brand-primary-black) text-(--brand-primary-neutral) flex items-center justify-center cursor-pointer">X</button>
                        <h2 className="text-2xl">Add Some Details</h2>
                        <p className="text-sm mb-6">({currentIndex}/{total} Remaining)</p>
                        {cloudinaryInfo?.secure_url && (
                            <div className="w-full h-56 aspect-video rounded-xl overflow-hidden mb-6">
                                <img src={cloudinaryInfo.secure_url} alt="Uploaded preview" className="w-full h-full object-cover"/>
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                            <div>
                                <p className="mb-2">Competition</p>
                                <div className="flex gap-6">
                                    {CATEGORIES.map((value) => (
                                        <label key={value} className="flex items-center gap-2 cursor-pointer">
                                            <input type="radio" name="category" value={value} checked={form.category === value} onChange={handleChange} required className="w-4 h-4 accent-(--brand-primary-red) cursor-pointer"/>
                                            {value}
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label htmlFor="title" className="block mb-2">Title</label>
                                <input id="title" name="title" value={form.title} onChange={handleChange} placeholder="Title of Image" required className="w-full border rounded-full p-3 px-4"/>
                            </div>
                            <div>
                                <label htmlFor="description" className="block mb-2">Brief Description</label>
                                <textarea id="description" name="description" value={form.description} onChange={handleChange} placeholder="Brief description (optional)" className="w-full border rounded-2xl p-3 px-4" rows={3}/>
                            </div>
                            {error && <p className="text-(--brand-primary-red) text-sm">{error}</p>}
                            {remaining > 1 && (
                                <label className="flex items-center gap-2 cursor-pointer text-sm">
                                    <input type="checkbox" checked={skipAll} onChange={(e) => setSkipAll(e.target.checked)} className="w-4 h-4 accent-(--brand-primary-red) cursor-pointer"/>
                                    Skip adding details for all remaining images?
                                </label>
                            )}
                            <div className="flex justify-end gap-3 mt-2">
                                <button type="button" onClick={handleSkip} disabled={submitting} className="px-6 py-2 rounded-xl cursor-pointer border">
                                    Skip
                                </button>
                                <motion.button type="submit" disabled={submitting} whileHover={{backgroundColor: "rgba(24, 24, 17, 1)"}} transition={{duration: 0.2}} className={`px-6 py-2 rounded-xl cursor-pointer transition-opacity ${submitting ? "bg-(--brand-primary-red) text-(--brand-primary-neutral) opacity-50 cursor-not-allowed" : "bg-(--brand-primary-red) text-(--brand-primary-neutral)"}`}>
                                    {submitting ? "Saving..." : "Continue"}
                                </motion.button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default MetadataModal;