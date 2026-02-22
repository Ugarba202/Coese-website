"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "danger" | "ghost" | "icon";
    size?: "sm" | "md" | "lg";
    href?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
        const baseStyles =
            "inline-flex items-center justify-center font-body font-semibold transition-all duration-200 active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none";

        const variants = {
            primary:
                "bg-gradient-to-r from-coesa-sky to-coesa-electric text-white rounded-full shadow-btn hover:brightness-110",
            secondary:
                "bg-transparent border border-coesa-sky text-coesa-sky rounded-full hover:bg-coesa-sky/10",
            danger:
                "bg-coesa-error text-white rounded-full hover:brightness-110",
            ghost:
                "bg-transparent text-coesa-muted rounded-lg hover:text-white hover:bg-white/5",
            icon:
                "w-10 h-10 rounded-full glass text-coesa-electric hover:shadow-glow",
        };

        const sizes = {
            sm: variant === "icon" ? "" : "px-4 py-2 text-sm",
            md: variant === "icon" ? "" : "px-6 py-2.5 text-sm",
            lg: variant === "icon" ? "w-12 h-12" : "px-8 py-3 text-base",
        };

        return (
            <button
                ref={ref}
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                {...props}
            >
                {children}
            </button>
        );
    }
);

Button.displayName = "Button";
