import Link from "next/link";
import type { ComponentProps } from "react";

export const mdxComponents = {
  a: ({ href = "", ...props }: ComponentProps<"a">) => {
    const external = href.startsWith("http");
    return external ? (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props} />
    ) : (
      <Link href={href} {...props} />
    );
  },
  pre: (props: ComponentProps<"pre">) => (
    <pre
      className="overflow-x-auto rounded-xl border border-foreground/10 !bg-foreground/5 !text-foreground"
      {...props}
    />
  ),
};