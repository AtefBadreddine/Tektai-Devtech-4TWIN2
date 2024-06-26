import { cn } from "../../../utils/cn";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: string;
    name: string;
    title: string;
    email: string;
    
    imageUrl: string; // Add imageUrl property for the image URL
    flagImageUrl: string; // New property for the flag image URL
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  return (
    <div className="">
      <div
      ref={containerRef}
      className={cn(
        "py-20 scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          start && "animate-scroll ",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            className="bg-gray-100 text-gray-800 w-[350px] max-w-full relative rounded-2xl border border-b-0 border-gray-300 px-8 py-6 md:w-[450px]"
            style={{
              background: "linear-gradient(180deg, #ffffff, #e5e5e5)",
            }}
            key={item.name}
          >
            <blockquote>
              <div className="flex items-center justify-between mb-4">
                <img
                  src={item.imageUrl}
                  className="w-28 h-28 rounded-full border-4 border-white flex-shrink-0"
                />
                <img
                  src={item.flagImageUrl}
                  className=" rounded-full w-12 h-13 flex-shrink-0"
                />
              </div>
              <p className="text-gray-700 text-lg leading-tight mb-4">
                {item.name}
              </p>
              <div className="text-gray-700 font-bold">
<a href={`https://mail.google.com/mail/u/0/?fs=1&tf=cm&to=${item.email}`} className="text-sm">{item.email}</a>
                <p className="text-sm">{item.title}</p>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div></div>
  );
};
