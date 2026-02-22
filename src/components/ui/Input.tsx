import React, { InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className = '', label, error, icon, ...props }, ref) => {
        return (
            <div className="w-full space-y-2">
                {label && (
                    <label className="block text-sm font-medium text-white/90">
                        {label}
                    </label>
                )}
                <div className="relative">
                    {icon && (
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-coesa-muted">
                            {icon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        className={`
              w-full bg-coesa-midnight/50 border rounded-xl py-2.5 px-4 text-white placeholder:text-white/30 
              focus:outline-none focus:ring-2 transition-all duration-200
              ${icon ? 'pl-10' : ''}
              ${error
                                ? 'border-coesa-error/50 focus:border-coesa-error focus:ring-coesa-error/20'
                                : 'border-white/10 focus:border-coesa-electric focus:ring-coesa-electric/20'}
              ${className}
            `}
                        {...props}
                    />
                </div>
                {error && (
                    <p className="text-sm text-coesa-error mt-1">{error}</p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';
