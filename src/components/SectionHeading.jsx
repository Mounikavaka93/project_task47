export default function SectionHeading({ eyebrow, title, text, action }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-6">
      <div className="max-w-xl">
        {eyebrow ? (
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-copper">{eyebrow}</p>
        ) : null}
        <h2 className="mt-2 font-serif text-4xl tracking-tight text-balance text-ink md:text-5xl">{title}</h2>
        {text ? <p className="mt-3 text-sm leading-relaxed text-mist md:text-base">{text}</p> : null}
      </div>
      {action ? <div className="shrink-0 pb-1">{action}</div> : null}
    </div>
  );
}
