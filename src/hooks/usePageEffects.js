import { useReveal } from "./useReveal";
import { useScrollBar } from "./useScrollBar";

export function usePageEffects() {
  useReveal();
  useScrollBar();
}
