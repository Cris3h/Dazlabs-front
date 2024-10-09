import { motion } from "framer-motion";

export const AnimatedTitle = () => {
  return (
    <motion.h1 
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1  }}
      className="text-4xl font-bold"
    >
      Welcome to Uncle Rauls - La mejor tienda de maiame
    </motion.h1>
  );
};