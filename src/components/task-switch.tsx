"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function LayoutAnimation() {
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => setIsOn(!isOn);

  return (
    <div
      className={`w-10 h-5 rounded-2xl transition-all duration-300 flex ${
        isOn ? "justify-end bg-amber-400" : "justify-start bg-gray-400"
      }`}
      onClick={toggleSwitch}
    >
      <motion.div
        className="w-5 h-5 bg-white rounded-2xl"
        layout
        transition={{
          type: "spring",
          visualDuration: 0.2,
          bounce: 0.2,
        }}
      />
    </div>
  );
}
