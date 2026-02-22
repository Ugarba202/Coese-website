"use client";

import { cn } from "@/lib/utils";
import { motion, type HTMLMotionProps } from "framer-motion";

interface CardProps extends HTMLMotionProps<"div"> {
    hover?: boolean;
    glass?: boolean;
    className?: string;
    children: React.ReactNode;
}

export function Card({
    hover = true,
    glass = false,
    className,
    children,
    ...props
}: CardProps) {
    return (
        <motion.div
            whileHover={hover ? { y: -6 } : undefined}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className={cn(
                "rounded-[18px] overflow-hidden",
                glass
                    ? "glass"
                    : "bg-gradient-to-br from-[#0D2547] to-coesa-navy border border-white/[0.08]",
                "shadow-card",
                hover && "hover:shadow-glow cursor-pointer",
                className
            )}
            {...props}
        >
            {children}
        </motion.div>
    );
}
