import { motion, useScroll } from "framer-motion"



const PageScrollProgressBar = () => {
    const { scrollYProgress } = useScroll();
    return (
        <>
            <div className="w-full h-1 bg-slate-100 fixed top-0 left-0 right-0">
                <motion.div
                    className="h-[2px] bg-teal-500 fixed top-0 left-0 right-0 origin-[0%] z-50"
                    style={{ scaleX: scrollYProgress }}
                />
            </div>
        </>
    )
}

export default PageScrollProgressBar
