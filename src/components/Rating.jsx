import { IconStar } from "./Icons";

export default function Rating({ value = 0, count, className = "" }) {
  const width = `${Math.max(0, Math.min(5, value)) / 5 * 100}%`;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative h-4 w-20 shrink-0" aria-hidden="true">
        <div className="absolute inset-0 flex text-sand">
          {Array.from({ length: 5 }).map((_, index) => (
            <IconStar key={index} />
          ))}
        </div>
        <div className="absolute inset-y-0 left-0 overflow-hidden text-copper" style={{ width }}>
          <div className="flex w-20">
            {Array.from({ length: 5 }).map((_, index) => (
              <IconStar key={index} />
            ))}
          </div>
        </div>
      </div>
      <span className="text-sm text-mist">
        <span className="sr-only">Rated {value.toFixed(1)} out of 5.</span>
        <span aria-hidden="true">{value.toFixed(1)}</span>
        {typeof count === "number" ? <span aria-hidden="true"> · {count.toLocaleString()} reviews</span> : null}
      </span>
    </div>
  );
}

export function StarPicker({ value, onChange }) {
  return (
    <div className="flex gap-1" role="radiogroup" aria-label="Rating">
      {Array.from({ length: 5 }).map((_, index) => {
        const score = index + 1;
        const active = score <= value;
        return (
          <button
            key={score}
            type="button"
            role="radio"
            aria-checked={value === score}
            aria-label={`${score} star${score > 1 ? "s" : ""}`}
            onClick={() => onChange(score)}
            className={`rounded-full p-1 transition ${active ? "text-copper" : "text-sand hover:text-copper/70"}`}
          >
            <IconStar className="h-5 w-5" />
          </button>
        );
      })}
    </div>
  );
}
