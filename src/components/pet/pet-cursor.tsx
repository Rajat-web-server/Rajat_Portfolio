"use client";

import { useRef } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { usePointerFollow } from "./use-pointer-follow";
import { cn } from "@/lib/utils";

// Palette. Change these to recolor the dog.
const C = {
  body: "#c9873f",
  far: "#a5692c",
  dark: "#6b3f1d",
  light: "#f3dcb8",
  ink: "#1b1b1b",
};

// [x, y, width, height, color] on a 20 x 14 pixel grid
type Rect = [number, number, number, number, string];

const walkBody: Rect[] = [
  [3, 5, 10, 5, C.body], // torso
  [4, 9, 8, 1, C.light], // belly
  [12, 2, 6, 5, C.body], // head
  [17, 4, 3, 3, C.light], // snout
  [19, 4, 1, 1, C.ink], // nose
  [15, 3, 1, 1, C.ink], // eye
  [12, 2, 2, 4, C.dark], // ear
];
const walkTail: Rect[] = [
  [2, 3, 1, 3, C.body],
  [1, 2, 1, 2, C.body],
];
const legsA: Rect[] = [
  [3, 10, 2, 4, C.body],
  [11, 10, 2, 4, C.body],
  [5, 10, 2, 2, C.far],
  [9, 10, 2, 2, C.far],
];
const legsB: Rect[] = [
  [5, 10, 2, 4, C.body],
  [9, 10, 2, 4, C.body],
  [3, 10, 2, 2, C.far],
  [11, 10, 2, 2, C.far],
];

const sitBody: Rect[] = [
  [3, 8, 6, 5, C.body], // haunch
  [7, 6, 5, 7, C.body], // chest
  [9, 1, 6, 5, C.body], // head
  [14, 3, 3, 3, C.light], // snout
  [16, 3, 1, 1, C.ink], // nose
  [12, 2, 1, 1, C.ink], // eye
  [9, 1, 2, 4, C.dark], // ear
  [10, 10, 2, 3, C.body], // front leg
  [10, 13, 3, 1, C.light], // front paw
  [4, 12, 5, 2, C.far], // hind paw
];
const sitTail: Rect[] = [[0, 11, 3, 2, C.body]];

const sleepBody: Rect[] = [
  [3, 7, 11, 5, C.body], // body
  [13, 7, 5, 5, C.body], // head
  [17, 9, 3, 2, C.light], // snout
  [19, 9, 1, 1, C.ink], // nose
  [15, 9, 2, 1, C.ink], // closed eye
  [13, 6, 2, 4, C.dark], // ear
  [14, 12, 5, 2, C.far], // front paws
  [3, 12, 5, 2, C.far], // hind paws
];
const sleepTail: Rect[] = [[0, 10, 3, 2, C.body]];

function Pixels({ rects }: { rects: Rect[] }) {
  return (
    <>
      {rects.map(([x, y, w, h, fill], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} fill={fill} />
      ))}
    </>
  );
}

const poseVisibility = {
  walk: "group-data-[state=walk]:block",
  sit: "group-data-[state=sit]:block",
  sleep: "group-data-[state=sleep]:block",
} as const;

function Pose({
  state,
  children,
}: {
  state: keyof typeof poseVisibility;
  children: React.ReactNode;
}) {
  return (
    <svg
      width={30}
      height={15}
      viewBox="0 0 20 14"
      className={cn(
        "pet-pose hidden h-[32px] w-[60px] max-w-none",
        poseVisibility[state],
      )}
    >
      {children}
    </svg>
  );
}
function Dog() {
  const ref = useRef<HTMLDivElement>(null);
  usePointerFollow(ref, { offsetX: -40, offsetY: -48 });

  return (
    <div
      ref={ref}
      aria-hidden
      data-ready="false"
      data-facing="right"
      data-state="sit"
      className="pet group pointer-events-none fixed left-0 top-0 z-[60] opacity-0 transition-opacity duration-500 data-[ready=true]:opacity-100"
    >
      <div className="group-data-[facing=left]:-scale-x-100">
        <Pose state="walk">
          <g className="pet-bob">
            <g className="pet-tail-wag">
              <Pixels rects={walkTail} />
            </g>
            <Pixels rects={walkBody} />
            <g className="pet-legs-a">
              <Pixels rects={legsA} />
            </g>
            <g className="pet-legs-b">
              <Pixels rects={legsB} />
            </g>
          </g>
        </Pose>

        <Pose state="sit">
          <g className="pet-tail-wag">
            <Pixels rects={sitTail} />
          </g>
          <Pixels rects={sitBody} />
        </Pose>

        <Pose state="sleep">
          <Pixels rects={sleepTail} />
          <Pixels rects={sleepBody} />
        </Pose>
      </div>

      <div className="pet-zzz">
        <span>z</span>
        <span>z</span>
        <span>Z</span>
      </div>
    </div>
  );
}

export function PetCursor() {
  const hasFinePointer = useMediaQuery("(pointer: fine)");
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  console.log({ hasFinePointer, reduceMotion });

  return <Dog />;
}
