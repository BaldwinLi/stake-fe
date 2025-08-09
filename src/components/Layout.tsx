import { ReactNode } from "react";
import Header from "./Header";
import { motion } from "framer-motion";
import { FiGithub, FiTwitter } from "react-icons/fi";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50" />{" "}
        {/* 改为白色渐变 */}
        <div className="absolute inset-0 tech-grid" /> {/* 保留网格背景 */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-500/5 via-transparent to-transparent" />{" "}
        {/* 降低透明度 */}
      </div>

      {/* Content */}
      <div className="relative flex flex-col flex-grow">
        <Header />
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 relative"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        </motion.main>

        {/* Footer */}
        <footer className="relative bg-white/70 backdrop-blur-xl border-t border-gray-100 mt-auto py-6 sm:py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-gray-500 text-sm sm:text-base">
                {/* © {new Date().getFullYear()} MN Stake. All rights reserved. */}
              </div>
              <div className="flex items-center space-x-5 sm:space-x-6">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary-500 transition-colors duration-200"
                >
                  <FiTwitter className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary-500 transition-colors duration-200"
                >
                  <FiGithub className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-primary-500 transition-colors duration-200"
                >
                  <span className="text-sm sm:text-base">Help Center</span>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
