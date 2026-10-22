"use client";

import { useEffect, type RefObject } from "react";

type Options = {
  speed?: number; // easing factor, higher = snappier
  stopDistance?: number; // px, the dog waits inside this radius
  sleepAfter?: number; // ms of no pointer activity before sleeping
  offsetX?: number;
  offsetY?: number;
};

export function usePointerFollow(
  ref: RefObject<HTMLElement | null>,
  {
    speed = 0.08,
    stopDistance = 56,
    sleepAfter = 5000,
    offsetX = 0,
    offsetY = 0,
  }: Options = {}
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { ...target };
    let hasMoved = false;
    let lastActivity = performance.now();
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      lastActivity = performance.now();
      if (!hasMoved) {
        hasMoved = true;
        el.dataset.ready = "true";
      }
    };

    const tick = () => {
      const dx = target.x - pos.x;
      const dy = target.y - pos.y;
      const dist = Math.hypot(dx, dy);
      const moving = hasMoved && dist > stopDistance;

      if (moving) {
        // clamp so it never crawls or teleports
        const travel = Math.min(Math.max(dist * speed, 1.5), 10);
        pos.x += (dx / dist) * travel;
        pos.y += (dy / dist) * travel;
        if (Math.abs(dx) > 2) el.dataset.facing = dx > 0 ? "right" : "left";
      }

      const next = moving
        ? "walk"
        : performance.now() - lastActivity > sleepAfter
          ? "sleep"
          : "sit";
      if (el.dataset.state !== next) el.dataset.state = next;

      el.style.transform = `translate3d(${pos.x + offsetX}px, ${pos.y + offsetY}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [ref, speed, stopDistance, sleepAfter, offsetX, offsetY]);
}