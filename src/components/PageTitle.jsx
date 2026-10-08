import { useEffect } from "react";

export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — Velune` : "Velune — Premium Earbuds";
  }, [title]);
}
