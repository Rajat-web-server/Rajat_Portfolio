// One 192px tile with a dashed line on its left and top edge.
// Tiled across the screen, it forms the dashed grid.
const CELL = 192;

const tile = `<svg xmlns='http://www.w3.org/2000/svg' width='${CELL}' height='${CELL}'>
<g stroke='rgba(255,255,255,0.14)' stroke-width='1' stroke-dasharray='4 4' fill='none'>
<line x1='0.5' y1='0' x2='0.5' y2='${CELL}'/>
<line x1='0' y1='0.5' x2='${CELL}' y2='0.5'/>
</g></svg>`;

export function DarkBackground() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 bg-[#08090b]"
      style={{
        backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(tile)}")`,
        backgroundSize: `${CELL}px ${CELL}px`,
        backgroundPosition: "center top",
      }}
    />
  );
}