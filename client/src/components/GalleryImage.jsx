import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "../utils/AuthContext";

const GalleryImage = ({ image, onDelete }) => {
    const { user } = useAuth();
    const [open, setOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState("");
    const menuRef = useRef(null);

    // responsiveness for clicking off delete and confirm menus
    useEffect(() => {
        if (!open) {
            return;
        }

        const handleClickOff = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOff);
        return () => document.removeEventListener("mousedown", handleClickOff);
    }, [open]);

    const handleDelete = async () => {
        setDeleting(true);
        setError("");

        try {
            await onDelete(image.public_id);
        } catch (err) {
            if (err instanceof TypeError) {
                setError("We're having trouble connecting right now. Please try again.");
            } else {
                setError(err.message);
            }
            setDeleting(false);
        }
    };

    return (
        <div className="overflow-hidden relative group">
            <motion.img whileHover={{filter: "brightness(0.85)", scale: 1.02}} loading="lazy" src={image.src} alt={image.title} className="w-full aspect-square object-cover cursor-pointer"/>
            {user && (
                <div ref={menuRef} className="absolute top-2 right-2">
                    <button onClick={() => setOpen(!open)} className="opacity-0 group-hover:opacity-100 transition-opacity rounded-full cursor-pointer flex items-center gap-1 p-2 bg-(--brand-primary-black)">
                        <span className="w-1 h-1 rounded-full bg-white"></span>
                        <span className="w-1 h-1 rounded-full bg-white"></span>
                        <span className="w-1 h-1 rounded-full bg-white"></span>
                    </button>
                    <AnimatePresence>
                        {open && (
                            <motion.div initial={{opacity: 0, scale: 0.95, y: -4}} animate={{opacity: 1, scale: 1, y: 0}} exit={{opacity: 0, scale: 0.95, y: -4}} transition={{duration: 0.15}} className="absolute right-0 mt-1 bg-(--brand-primary-neutral) border rounded-lg shadow-lg z-10 overflow-hidden min-w-32">
                                <button onClick={() => {setOpen(false); setConfirmOpen(true)}} className="w-full text-left px-4 py-2 cursor-pointer text-(--brand-primary-red) hover:bg-black/5 transition-colors">Delete</button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}

            <AnimatePresence>
                {confirmOpen && (
                    <motion.div onClick={() => !deleting && setConfirmOpen(false)} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                        <motion.div onClick={(e) => e.stopPropagation()} initial={{opacity: 0, scale: 0.95}} animate={{opacity: 1, scale: 1}} exit={{opacity: 0, scale: 0.95}} className="bg-(--brand-primary-neutral) rounded-2xl p-8 w-full max-w-lg">
                            <h3 className="mb-2">Delete this image?</h3>
                            <p className="mb-4">The image "{image.title}" will be permanently removed. This action can't be undone.</p>
                            {error && <p className="text-(--brand-primary-red) mb-2">{error}</p>}
                            <div className="flex gap-2">
                                <motion.button type="button" onClick={() => setConfirmOpen(false)} disabled={deleting} initial={{backgroundColor: "rgba(0, 0, 0, 0)"}} whileHover={{backgroundColor: "rgba(0, 0, 0, 0.15)"}} transition={{duration: 0.2}} className="px-4 py-2 rounded-xl cursor-pointer border">Cancel</motion.button>
                                <motion.button type="button" onClick={handleDelete} disabled={deleting} whileHover={{backgroundColor: "rgba(24, 24, 17, 1)"}} transition={{duration: 0.2}} className={`px-4 py-2 rounded-xl cursor-pointer bg-(--brand-primary-red) text-white transition-opacity ${deleting ? "opacity-50 cursor-not-allowed" : ""}`}>Delete</motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
};

export default GalleryImage;