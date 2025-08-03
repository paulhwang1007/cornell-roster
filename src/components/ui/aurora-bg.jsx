"use client";
import React from "react";
import { cn } from "../../utils/cn";

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}) => {
  return (
    <main>
      <div
        className={cn(
          "transition-bg relative flex w-full min-h-screen flex-col bg-zinc-50 text-slate-950 dark:bg-zinc-900",
          className
        )}
        {...props}
      >
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            "--aurora":
              "repeating-linear-gradient(100deg,#ef4444_10%,#fda4af_15%,#fca5a5_20%,#fbcfe8_25%,#f87171_30%)",
            "--dark-gradient":
              "repeating-linear-gradient(100deg,#000_0%,#000_7%,transparent_10%,transparent_12%,#000_16%)",
            "--white-gradient":
              "repeating-linear-gradient(100deg,#fff_0%,#fff_7%,transparent_10%,transparent_12%,#fff_16%)",

            "--red-300": "#fca5a5",
            "--red-400": "#f87171",
            "--red-500": "#ef4444",
            "--rose-300": "#fda4af",
            "--pink-200": "#fbcfe8",
            "--black": "#000",
            "--white": "#fff",
            "--transparent": "transparent",
          }}
        >
          <div
            className={cn(
              `after:animate-aurora pointer-events-none absolute -inset-[10px] 
              [background-image:var(--white-gradient),var(--aurora)] 
              [background-size:300%,_200%] [background-position:50%_50%,50%_50%] 
              opacity-50 blur-[10px] invert filter will-change-transform 
              [--aurora:repeating-linear-gradient(100deg,var(--red-500)_10%,var(--rose-300)_15%,var(--red-300)_20%,var(--pink-200)_25%,var(--red-400)_30%)] 
              [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)] 
              [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)] 
              after:absolute after:inset-0 
              after:[background-image:var(--white-gradient),var(--aurora)] 
              after:[background-size:200%,_100%] 
              after:[background-attachment:fixed] 
              after:mix-blend-screen 
              after:content-[""] 
              dark:[background-image:var(--dark-gradient),var(--aurora)] 
              dark:invert-0 after:dark:[background-image:var(--dark-gradient),var(--aurora)]`,
              showRadialGradient &&
                `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`
            )}
          ></div>
        </div>
        {children}
      </div>
    </main>
  );
};
