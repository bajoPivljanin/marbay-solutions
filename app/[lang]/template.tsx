"use client";

import { motion } from "motion/react";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="w-full min-w-0 overflow-x-clip"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
    >
      {children}
    </motion.div>
  );
}
