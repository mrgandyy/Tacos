"use client";

import React from "react";

export function GridBackground() {
    return (
        <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none bg-brand-black">
            {/* Perspective Grid */}
            <div
                className="absolute w-[200%] h-[200%] top-[-50%] left-[-50%]"
                style={{
                    background: `
            linear-gradient(transparent 0%, var(--color-brand-black) 90%),
            linear-gradient(0deg, transparent 24%, rgba(0, 255, 255, .3) 25%, rgba(0, 255, 255, .3) 26%, transparent 27%, transparent 74%, rgba(0, 255, 255, .3) 75%, rgba(0, 255, 255, .3) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(0, 255, 255, .3) 25%, rgba(0, 255, 255, .3) 26%, transparent 27%, transparent 74%, rgba(0, 255, 255, .3) 75%, rgba(0, 255, 255, .3) 76%, transparent 77%, transparent)
          `,
                    backgroundSize: '60px 60px',
                    transform: 'perspective(500px) rotateX(60deg) translateY(0)',
                    animation: 'gridMove 20s linear infinite',
                }}
            />
            <style jsx>{`
        @keyframes gridMove {
          0% { transform: perspective(500px) rotateX(60deg) translateY(0); }
          100% { transform: perspective(500px) rotateX(60deg) translateY(60px); }
        }
      `}</style>

            {/* Scanline Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0),rgba(255,255,255,0)_50%,rgba(0,0,0,0.2)_50%,rgba(0,0,0,0.2))] bg-[length:100%_4px] pointer-events-none opacity-20" />

            {/* Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--color-brand-black)_90%)]" />
        </div>
    );
}
