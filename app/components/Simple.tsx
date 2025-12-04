"use client"
import { motion } from 'framer-motion'
const Simple = () => {
    return (
        <motion.div initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeIn" }} className='flex min-h-screen flex-col items-center justify-center'>
            <h1>Mahad Usman</h1>
            <p>A passionate Fullstack developer and AI Engineer</p>
        </motion.div>
    )
}

export default Simple