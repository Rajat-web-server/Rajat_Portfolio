"use client";

import { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

type Props = {
  words: string[];
  typeSpeed?: number; // ms per character typed
  deleteSpeed?: number; // ms per character deleted
  holdFor?: number; // ms to pause on a finished word
  className?: string;
};

export function TypingText({
  words,
  typeSpeed = 75,
  deleteSpeed = 40,
  holdFor = 1600,
  className,
}: Props) {
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduceMotion || words.length === 0) return;

    const word = words[index];
    let delay = deleting ? deleteSpeed : typeSpeed;
    let next: () => void;

    if (!deleting && text === word) {
      delay = holdFor; // finished typing: pause, then start deleting
      next = () => setDeleting(true);
    } else if (deleting && text === "") {
      delay = 350; // empty: short beat, then the next word
      next = () => {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      };
    } else {
      next = () =>
        setText(word.slice(0, text.length + (deleting ? -1 : 1)));
    }

    const id = setTimeout(next, delay);
    return () => clearTimeout(id);
  }, [text, deleting, index, words, reduceMotion, typeSpeed, deleteSpeed, holdFor]);

  // Reduced motion: no animation, just show everything
  if (reduceMotion) {
    return <span className={className}>{words.join(" · ")}</span>;
  }

  return (
    <span className={cn("inline-flex min-h-[1.5em] items-center", className)}>
      {/* screen readers and crawlers get the full list once, not letter by letter */}
      <span className="sr-only">{words.join(", ")}</span>
      <span aria-hidden>
        {text}
        <span className="ml-1 inline-block h-[1.1em] w-[2px] translate-y-[0.15em] animate-pulse bg-current" />
      </span>
    </span>
  );
}