import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "../utils/AuthContext";

const Resource = ({ resource, onDelete , onEdit }) => {
    const { user } = useAuth();
    const [open, setOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState({category: resource.category, title: resource.title, description: resource.description, link: resource.link});
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState("");
    const menuRef = useRef(null);

    useEffect(() => {
        if (editOpen) {
            setForm({category: resource.category, title: resource.title, description: resource.description, link: resource.link});
        }
    }, [editOpen, resource]);

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    useEffect(() => {
        if (!open) {
            return;
        }

        const handleClickOff = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOff);
        return () => document.removeEventListener("mousedown", handleClickOff);
    }, [open]);

    const handleDelete = async () => {
        setDeleting(true);
        setError("");

        try {
            await onDelete(resource.id);
        } catch (err) {
            if (err instanceof TypeError) {
                setError("We're having trouble connecting right now. Please try again.");
            } else {
                setError(err.message);
            }
            setDeleting(false);
        }
    };

    const handleEdit = async () => {
        setEditing(true);
        setError("");

        try {
            await onEdit(resource.id, form);
            setEditOpen(false);
        } catch (err) {
            if (err instanceof TypeError) {
                setError("We're having trouble connecting right now. Please try again.");
            } else {
                setError(err.message);
            }
        } finally {
            setEditing(false);
        }
    };

    return (
        <>
            <motion.div id="resource" className="relative p-4 rounded-lg group" initial={{backgroundColor: "rgba(0, 0, 0, 0)"}} whileHover={{backgroundColor: "rgba(0, 0, 0, 0.10)"}} onMouseLeave={() => setOpen(false)}>
                {user && (
                    <div className="absolute top-1/2 -translate-y-1/2 right-8 w-fit h-fit">
                        <button onClick={() => setOpen(!open)} className="opacity-0 group-hover:opacity-100 transition-opacity rounded-full cursor-pointer text-4xl! leading-none! flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full bg-current"></span>
                            <span className="w-1 h-1 rounded-full bg-current"></span>
                            <span className="w-1 h-1 rounded-full bg-current"></span>
                        </button>
                        <AnimatePresence>
                            {open && (
                                <motion.div initial={{opacity: 0, scale: 0.95, y: -4}} animate={{opacity: 1, scale: 1, y: 0}} exit={{opacity: 0, scale: 0.95, y: -4}} transition={{duration: 0.15}} className="absolute right-0 mt-1 bg-(--brand-primary-neutral) border rounded-lg shadow-lg z-10 overflow-hidden min-w-32">
                                    <button onClick={() => {setOpen(false); setEditOpen(true)}} className="w-full text-left px-4 py-2 cursor-pointer hover:bg-black/5 transition-colors">Edit</button>
                                    <button onClick={() => {setOpen(false); setConfirmOpen(true)}} className="w-full text-left px-4 py-2 cursor-pointer text-(--brand-primary-red) hover:bg-black/5 transition-colors">Delete</button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )}
                <h3 className="leading-10">{resource.title}</h3>
                <p className="leading-8">{resource.description}</p>
                <a target="_blank" rel="noopener noreferrer" href={resource.link}>Link to Resource</a>
            </motion.div>
            <hr className="p-2 mt-2"></hr>
            <AnimatePresence>
                {confirmOpen && (
                    <motion.div onClick={() => !deleting && setConfirmOpen(false)} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                        <motion.div onClick={(e) => e.stopPropagation()} initial={{opacity: 0, scale: 0.95}} animate={{opacity: 1, scale: 1}} exit={{opacity: 0, scale: 0.95}} className="bg-(--brand-primary-neutral) rounded-2xl p-8 w-full max-w-lg">
                            <h3 className="mb-2">Delete this resource?</h3>
                            <p className="mb-4">The resource "{resource.title}" will be permanently removed. This action can't be undone.</p>
                            {error && <p className="text-(--brand-primary-red) mb-2">{error}</p>}
                            <div className="flex gap-2">
                                <motion.button type="button" onClick={() => setConfirmOpen(false)} disabled={deleting} initial={{backgroundColor: "rgba(0, 0, 0, 0)"}} whileHover={{backgroundColor: "rgba(0, 0, 0, 0.15)"}} transition={{duration: 0.2}} className="px-4 py-2 rounded-xl cursor-pointer border">Cancel</motion.button>
                                <motion.button type="button" onClick={handleDelete} disabled={deleting} whileHover={{backgroundColor: "rgba(24, 24, 17, 1)"}} transition={{duration: 0.2}} className={`px-4 py-2 rounded-xl cursor-pointer bg-(--brand-primary-red) text-white transition-opacity ${deleting ? "opacity-50 cursor-not-allowed" : ""}`}>Delete</motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {editOpen && (
                    <motion.div onClick={() => !editing && setEditOpen(false)} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                        <motion.div onClick={(e) => e.stopPropagation()} initial={{opacity: 0, scale: 0.95}} animate={{opacity: 1, scale: 1}} exit={{opacity: 0, scale: 0.95}} className="bg-(--brand-primary-neutral) rounded-2xl p-8 w-full max-w-lg flex flex-col gap-3">
                            <h3 className="mb-2">Editing "{resource.title}"</h3>
                            <select name="category" value={form.category} onChange={handleChange} required className="border rounded-lg p-2 bg-(--brand-primary-neutral)">
                                <option value="" disabled>Select a category</option>
                                <option value="all">General</option>
                                <option value="archive">Archive</option>
                                <option value="competitions">Competitions</option>
                                <option value="guides">Guides</option>
                            </select>
                            <input name="title" value={form.title} onChange={handleChange} required className="border rounded-lg p-2"/>
                            <textarea name="description" value={form.description} onChange={handleChange} required className="border rounded-lg p-2" rows={3}/>
                            <input name="link" type="url" value={form.link} onChange={handleChange} required className="border rounded-lg p-2"/>
                            <div className="flex gap-2 mt-4">
                                <motion.button type="button" onClick={() => setEditOpen(false)} disabled={editing} initial={{backgroundColor: "rgba(0, 0, 0, 0)"}} whileHover={{backgroundColor: "rgba(0, 0, 0, 0.15)"}} transition={{duration: 0.2}} className="px-4 py-2 rounded-xl cursor-pointer border">Cancel</motion.button>
                                <motion.button type="button" onClick={handleEdit} disabled={editing} whileHover={{backgroundColor: "rgba(24, 24, 17, 1)"}} transition={{duration: 0.2}} className={`px-4 py-2 rounded-xl cursor-pointer bg-(--brand-primary-red) text-white transition-opacity ${editing ? "opacity-50 cursor-not-allowed" : ""}`}>Save Changes</motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
};

export default Resource;