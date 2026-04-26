"use client";

import { useRef, useState, type RefObject } from "react";
import { useReveal } from "@/hooks/useReveal";

export function VideoSection() {
  const ref = useReveal(0.05);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <section ref={ref as RefObject<HTMLElement>} className="bg-[#080808] py-16 md:py-24 px-6 md:px-16">
      <div className="max-w-[1200px] mx-auto">
        <div className="reveal flex items-center justify-between mb-8">
          <h2 className="font-bold text-[#f8f8f8] text-2xl md:text-3xl">
            Engineer without limits
          </h2>
          <span className="label-mono text-[#f8f8f8]/40">(2:35)</span>
        </div>

        <div
          className="reveal reveal-delay-1 relative rounded-2xl overflow-hidden cursor-pointer group bg-[#111]"
          onClick={togglePlay}
        >
          <video
            ref={videoRef}
            className="w-full aspect-video object-cover"
            poster="https://images.prismic.io/icomat/aWER2AIvOtkhBcXM_ICOMAT-HOMEBACKGROUNDVIDEO2.webp?auto=format,compress"
          >
            <source src="https://icomat.b-cdn.net/about-video_tbhirk.mp4" type="video/mp4" />
          </video>

          {/* Overlay */}
          {!playing && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#080808]/40 group-hover:bg-[#080808]/30 transition-colors">
              {/* Play button */}
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-[#f8f8f8]/60 flex items-center justify-center group-hover:border-[#f8f8f8] group-hover:scale-110 transition-all">
                <svg
                  className="w-6 h-6 text-[#f8f8f8] ml-1"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          )}

          {/* Duration bar */}
          <div className="absolute bottom-4 left-6 right-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-[#f8f8f8]/20 rounded-full overflow-hidden">
              <div className="h-full w-0 bg-[#f8f8f8]/60" />
            </div>
            <span className="label-mono text-[#f8f8f8]/50 text-[10px]">2:35</span>
          </div>
        </div>
      </div>
    </section>
  );
}
