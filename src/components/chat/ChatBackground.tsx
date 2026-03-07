import { motion } from "framer-motion";

const ChatBackground = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    {/* Animated gradient orbs */}
    <motion.div
      className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]"
      style={{ background: "hsl(var(--primary))" }}
      animate={{
        x: ["-10%", "15%", "-5%"],
        y: ["-10%", "20%", "-10%"],
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute right-0 bottom-0 w-[500px] h-[500px] rounded-full opacity-15 blur-[100px]"
      style={{ background: "hsl(var(--accent))" }}
      animate={{
        x: ["10%", "-15%", "10%"],
        y: ["10%", "-20%", "10%"],
      }}
      transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute left-1/2 top-1/2 w-[400px] h-[400px] rounded-full opacity-10 blur-[80px]"
      style={{ background: "hsl(217, 72%, 60%)" }}
      animate={{
        scale: [1, 1.3, 1],
        rotate: [0, 180, 360],
      }}
      transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
    />
    {/* Subtle grid overlay */}
    <div
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
        backgroundSize: "40px 40px",
      }}
    />
  </div>
);

export default ChatBackground;
