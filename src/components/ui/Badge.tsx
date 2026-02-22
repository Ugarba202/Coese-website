import { cn } from "@/lib/utils";

interface BadgeProps {
    children: React.ReactNode;
    variant?: "default" | "success" | "warning" | "error";
    className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
    const variants = {
        default: "text-coesa-electric border-coesa-electric/30 bg-coesa-electric/10",
        success: "text-coesa-success border-coesa-success/30 bg-coesa-success/10",
        warning: "text-coesa-warning border-coesa-warning/30 bg-coesa-warning/10",
        error: "text-coesa-error border-coesa-error/30 bg-coesa-error/10",
    };

    return (
        <span
            className={cn(
                "inline-flex items-center font-mono text-xs uppercase tracking-wider px-2.5 py-1 rounded-md border",
                variants[variant],
                className
            )}
        >
            {children}
        </span>
    );
}
