import React from 'react'
import { motion } from "framer-motion"

function BlockedUser() {
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
          There is No
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2 }}
        >
          Blocked User right Now...
        </motion.p>
      </div>
   
   </>
  )
}

export default BlockedUser