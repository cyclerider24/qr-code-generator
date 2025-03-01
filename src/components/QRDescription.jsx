import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const QRDescription = () => {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.2 }); // Trigger when 20% visible

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [inView, controls]);

  return (
    <div ref={ref} className="text-center p-6 space-y-6 max-w-2xl mx-auto">
      {/* Engaging Animated Introduction */}
      <motion.p
        className="text-xl font-bold text-gray-800 dark:text-white"
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: -20 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.8 }}
      >
        🎉 Create Stunning QR Codes Instantly! 🎉
      </motion.p>

      {/* Feature-Focused Description */}
      <motion.p
        className="text-gray-600 dark:text-gray-300"
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        Customize your QR codes with unique colors, patterns, and logos. No sign-up required—just generate, download, and share!
      </motion.p>

      {/* How It Works Section */}
      <motion.div
        className="bg-gray-100 dark:bg-gray-800 p-4 rounded-2xl shadow-md space-y-2"
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, scale: 0.9 },
          visible: { opacity: 1, scale: 1 },
        }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <h2 className="text-lg font-bold text-blue-800 dark:text-sky-400">
          📌 How It Works:
        </h2>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 text-sm space-y-1">
          <li>🖊 Enter the text, link, or data for your QR code.</li>
          <li>🎨 Customize colors, dot patterns, and add logos.</li>
          <li>🔍 Preview your QR code before downloading.</li>
          <li>📥 Download in PNG, JPG, or SVG format.</li>
          <li>✨ Share your custom QR code anywhere!</li>
        </ul>
      </motion.div>

      {/* Call to Action */}
      <motion.p
        className="text-xl font-bold text-blue-800 dark:text-sky-400"
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 10 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        🚀 Start Generating Your Custom QR Code Now!
      </motion.p>
    </div>
  );
};

export default QRDescription;
