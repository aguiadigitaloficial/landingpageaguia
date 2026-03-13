import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { damping: 25, stiffness: 200 });
  const springY = useSpring(cursorY, { damping: 25, stiffness: 200 });

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    if (window.innerWidth < 768) return;

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], input, textarea, select, [data-clickable]")) {
        setIsHovering(true);
      }
    };
    const handleOut = () => setIsHovering(false);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, [cursorX, cursorY]);

  if (isMobile) return null;

  return (
    <>
      <style>{`* { cursor: none !important; }`}</style>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000]"
        style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}
      >
        <div className="w-2 h-2 rounded-full bg-primary" />
      </motion.div>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000] rounded-full border border-primary"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          width: isHovering ? 60 : 40,
          height: isHovering ? 60 : 40,
          opacity: isHovering ? 0.6 : 0.4,
          transition: "width 0.2s, height 0.2s, opacity 0.2s",
        }}
      />
    </>
  );
};

export default CustomCursor;
