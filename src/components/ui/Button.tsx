import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "../../utils/cn";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "outline";
  fullWidth?: boolean;
}

export const Button = ({
  children,
  onClick,
  disabled = false,
  loading = false,
  className,
  type = "button",
  variant = "primary",
  fullWidth = false,
}: ButtonProps) => {
  const baseStyles =
    "flex items-center justify-center space-x-2 transition-all duration-300";

  const variants = {
    primary:
      "bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg px-6 py-3 transition-all duration-300",
    secondary:
      "bg-gradient-to-r from-secondary-500 to-secondary-600 text-white rounded-lg px-6 py-3 transition-all duration-300",
    outline:
      "border border-primary-500 text-primary-600 hover:bg-primary-50 rounded-lg px-6 py-3 transition-all duration-300",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      disabled={disabled || loading}
      type={type}
      className={cn(
        baseStyles,
        variants[variant],
        fullWidth && "w-full",
        disabled && "opacity-70 cursor-not-allowed",
        className
      )}
    >
      {loading ? (
        <>
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          <span>Processing...</span>
        </>
      ) : (
        children
      )}
    </motion.button>
  );
};
