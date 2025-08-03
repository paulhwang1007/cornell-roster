"use client";

import { motion } from "motion/react";
import { AuroraBackground } from "../components/ui/aurora-bg";

export function AuroraBackgroundSubjects({ children }) {
  return (
    <AuroraBackground className="w-full">
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 1.25,
          ease: "easeInOut",
        }}
        className="w-full px-4 py-10 z-10"
      >
        {children}
      </motion.div>
    </AuroraBackground>
  );
}
