import React from 'react'
import { motion } from "framer-motion"

function QcCheck() {
  return (
    <div>
          <div style={{
        fontSize: "2rem",
        textAlign: 'center', paddingTop: '100px', fontWeight: "700", color: "gray"
      }}>
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2 }}
        >
          Evaluation in Progress!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2 }}
        >
         QC Check Going on...!
        </motion.p>
      </div>
    </div>
  )
}

export default QcCheck