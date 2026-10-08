const phrases = [
  "Velune",
  "Tuned by ear",
  "Up to 42 dB",
  "36-hour charge",
  "Free shipping over $150",
  "Three tip sizes",
  "Copenhagen bench",
  "Two-year care",
];

export default function Marquee() {
  const loop = [...phrases, ...phrases];

  return (
    <div className="overflow-hidden border-y border-ink/10 bg-foam py-3.5">
      <div className="marquee-track items-center gap-8 pr-8">
        {loop.map((phrase, index) => (
          <span key={`${phrase}-${index}`} className="flex items-center gap-8 text-[11px] font-medium uppercase tracking-[0.22em] text-ink/70">
            {phrase}
            <span className="h-1 w-1 rounded-full bg-copper" aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  );
}
