import React from 'react'
import { motion } from "framer-motion"

function Plan() {
  return (
   <>
   
   <div style={{
        fontSize: "2rem",
        textAlign: 'center', paddingTop: '100px', fontWeight: "700", color: "gray"
      }}>
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2 }}
        >
          Coming Soon!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2 }}
        >
          Exciting things are on the way. Stay tuned!
        </motion.p>
      </div>
   
   </>
  )
}

export default Plan