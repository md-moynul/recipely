"use client";

import { useEffect, useRef } from "react";
import { Button } from "@heroui/react";
import Link from "next/link";

export default function HeroSection() {
    // Create a reference to the video element
    const videoRef = useRef(null);

    // Set the playback speed to 0.75x once the component mounts
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.25;
        }
    }, []);

    return (
        <header className="relative flex h-screen w-full items-center justify-center overflow-hidden">
            {/* Background video */}
            <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                className="absolute top-0 left-0 z-10 h-full w-full object-cover pointer-events-none"
            >
                <source src="/cooking.mp4" type="video/mp4" />
            </video>

            {/* Dark overlay for readability */}
            <div className="absolute top-0 left-0 z-20 h-full w-full bg-black/40" />

            {/* Content */}
            <div className="relative z-30 px-6 text-center text-white">
                <h1 className="mx-auto max-w-3xl text-4xl font-semibold leading-tight md:text-[60px]">
                    Every recipe worth keeping, in one place.
                </h1>
                <p className="mx-auto mt-5 max-w-xl text-lg text-white/80 md:text-xl">
                    Save what you cook, discover what others love, and build a kitchen
                    notebook that actually gets used.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <Link
                        href="/recipes"

                    >
                        <Button
                            size="lg"
                            className=" bg-[#E85D3D]  font-medium text-white  hover:bg-[#D14E30]"
                        >

                            Browse Recipes
                        </Button>
                    </Link>
                    <Link
                        href="/auth/register"

                    >
                        <Button
                            size="lg"
                            className="bg-white/10 text-white font-medium hover:border hover:border-[#F4EDE4]"
                        >
                            Join Recipely
                        </Button>

                    </Link>
                </div>
            </div>
        </header>
    );
}