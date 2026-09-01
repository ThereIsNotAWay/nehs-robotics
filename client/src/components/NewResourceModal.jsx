import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const NewResourceModal = ({isOpen, close, create}) => {
    const [form, setForm] = useState({category: "", title: "", description: "", link: ""});
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError("");

        try {
            await create(form);
            setForm({category: "", title: "", description: "", link: ""});
            close();
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

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div onClick={close} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                    <motion.div onClick={(e) => e.stopPropagation()} initial={{opacity: 0, scale: 0.95}} animate={{opacity: 1, scale: 1}} exit={{opacity: 0, scale: 0.95}} className="bg-(--brand-primary-neutral) rounded-2xl p-8 w-full max-w-xl">
                        <h2 className="text-xl mb-4">Add a Resource</h2>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                            <select name="category" value={form.category} onChange={handleChange} required className="border rounded-lg p-2 bg-(--brand-primary-neutral)">
                                <option value="" disabled>Select a category</option>
                                <option value="all">General</option>
                                <option value="archive">Archive</option>
                                <option value="competitions">Competitions</option>
                                <option value="guides">Guides</option>
                            </select>
                            <input name="title" value={form.title} onChange={handleChange} placeholder="Title of resource" required className="border rounded-lg p-2"/>
                            <textarea name="description" value={form.description} onChange={handleChange} placeholder="Brief description of resource" required className="border rounded-lg p-2" rows={3}/>
                            <input name="link" type="url" value={form.link} onChange={handleChange} placeholder="Link to resource" required className="border rounded-lg p-2"/>
                            {error && <p className="text-(--brand-primary-red) text-sm">{error}</p>}
                            <div className="flex justify-end gap-2 mt-2">
                                <motion.button type="button" onClick={close} disabled={submitting} initial={{backgroundColor: "rgba(0, 0, 0, 0)"}} whileHover={{backgroundColor: "rgba(0, 0, 0, 0.15)"}} transition={{duration: 0.2}} className="px-4 py-2 rounded-xl cursor-pointer border">Cancel</motion.button>
                                <motion.button onClick={handleSubmit} type="submit" disabled={submitting} whileHover={{backgroundColor: "rgba(24, 24, 17, 1)"}} transition={{duration: 0.2}} className={`px-4 py-2 rounded-xl cursor-pointer transition-opacity ${submitting ? "bg-(--brand-primary-red) text-(--brand-primary-neutral) opacity-50 cursor-not-allowed" : "bg-(--brand-primary-red) text-(--brand-primary-neutral)"}`}>Submit</motion.button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default NewResourceModal;