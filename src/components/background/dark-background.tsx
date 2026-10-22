export function DarkBackground() {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -left-32 top-0 size-[32rem] rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="absolute -right-32 bottom-0 size-[32rem] rounded-full bg-violet-500/20 blur-3xl" />
    </div>
  );
}