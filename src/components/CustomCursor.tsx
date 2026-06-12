import { useEffect, useRef, useState } from "react";

type CursorMode = "default" | "link" | "button" | "project" | "drag" | "copy";

type CursorState = {
  mode: CursorMode;
  label: string;
};

const defaultState: CursorState = {
  mode: "default",
  label: "",
};

function getCursorState(value: string | null): CursorState {
  switch (value) {
    case "link":
      return { mode: "link", label: "" };
    case "button":
      return { mode: "button", label: "" };
    case "project":
      return { mode: "project", label: "VIEW" };
    case "drag":
      return { mode: "drag", label: "DRAG" };
    case "copy":
      return { mode: "copy", label: "MAIL" };
    default:
      return defaultState;
  }
}

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [cursorState, setCursorState] = useState<CursorState>(defaultState);
  const [visible, setVisible] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const ringTextRef = useRef<HTMLSpanElement>(null);
  const currentTargetRef = useRef<HTMLElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const ringRefPos = useRef({ x: 0, y: 0 });
  const frameRef = useRef(0);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const reduceMedia = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      const mobile = media.matches;
      const reduced = reduceMedia.matches;
      setReducedMotion(reduced);
      setEnabled(!mobile);
    };

    update();
    media.addEventListener("change", update);
    reduceMedia.addEventListener("change", update);

    return () => {
      media.removeEventListener("change", update);
      reduceMedia.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove("has-custom-cursor");
      document.body.classList.remove("has-custom-cursor");
      return;
    }

    if (reducedMotion) {
      document.documentElement.classList.remove("has-custom-cursor");
      document.body.classList.remove("has-custom-cursor");
      return;
    }

    document.documentElement.classList.add("has-custom-cursor");
    document.body.classList.add("has-custom-cursor");

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      document.body.classList.remove("has-custom-cursor");
    };
  }, [enabled, reducedMotion]);

  useEffect(() => {
    if (!enabled) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const syncTransforms = () => {
      const x = mouseRef.current.x;
      const y = mouseRef.current.y;

      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;

      if (reducedMotion) {
        ringRefPos.current.x = x;
        ringRefPos.current.y = y;
      } else {
        ringRefPos.current.x += (x - ringRefPos.current.x) * 0.18;
        ringRefPos.current.y += (y - ringRefPos.current.y) * 0.18;
      }

      ring.style.transform = `translate3d(${ringRefPos.current.x}px, ${ringRefPos.current.y}px, 0) translate(-50%, -50%)`;
      frameRef.current = requestAnimationFrame(syncTransforms);
    };

    frameRef.current = requestAnimationFrame(syncTransforms);

    return () => cancelAnimationFrame(frameRef.current);
  }, [enabled, reducedMotion]);

  useEffect(() => {
    if (!enabled) return;

    const setTargetCursor = (target: EventTarget | null) => {
      const element =
        target instanceof HTMLElement ? target.closest<HTMLElement>("[data-cursor]") : null;

      currentTargetRef.current?.classList.remove("is-cursor-active");
      currentTargetRef.current = element;
      currentTargetRef.current?.classList.add("is-cursor-active");

      const nextState = getCursorState(element?.dataset.cursor ?? null);
      setCursorState((prev) =>
        prev.mode === nextState.mode && prev.label === nextState.label
          ? prev
          : nextState
      );
    };

    const handlePointerMove = (event: PointerEvent) => {
      mouseRef.current = { x: event.clientX, y: event.clientY };
      if (!visible) setVisible(true);
      setTargetCursor(event.target);
    };

    const handlePointerDown = () => {
      document.documentElement.classList.add("cursor-pressed");
    };

    const handlePointerUp = () => {
      document.documentElement.classList.remove("cursor-pressed");
    };

    const handlePointerLeave = () => {
      setVisible(false);
      currentTargetRef.current?.classList.remove("is-cursor-active");
      currentTargetRef.current = null;
      setCursorState(defaultState);
    };

    const handlePointerEnter = () => {
      setVisible(true);
    };

    document.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("pointerdown", handlePointerDown, { passive: true });
    document.addEventListener("pointerup", handlePointerUp, { passive: true });
    document.addEventListener("pointerleave", handlePointerLeave);
    document.addEventListener("pointerenter", handlePointerEnter);

    return () => {
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("pointerup", handlePointerUp);
      document.removeEventListener("pointerleave", handlePointerLeave);
      document.removeEventListener("pointerenter", handlePointerEnter);
      document.documentElement.classList.remove("cursor-pressed");
      currentTargetRef.current?.classList.remove("is-cursor-active");
    };
  }, [enabled, visible]);

  useEffect(() => {
    if (!enabled || reducedMotion) return;

    const magneticTargets = Array.from(
      document.querySelectorAll<HTMLElement>(
        "[data-cursor='button'], [data-cursor='project'], [data-cursor='copy']"
      )
    );

    const cleanups = magneticTargets.map((element) => {
      const maxShift = element.dataset.cursor === "project" ? 8 : 12;

      const handleMove = (event: PointerEvent) => {
        const rect = element.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const offsetX = ((x / rect.width) * 2 - 1) * maxShift;
        const offsetY = ((y / rect.height) * 2 - 1) * maxShift;

        element.style.setProperty("--cursor-glow-x", `${x}px`);
        element.style.setProperty("--cursor-glow-y", `${y}px`);
        element.style.setProperty("--magnetic-x", `${offsetX}px`);
        element.style.setProperty("--magnetic-y", `${offsetY}px`);
      };

      const handleLeave = () => {
        element.style.setProperty("--magnetic-x", "0px");
        element.style.setProperty("--magnetic-y", "0px");
      };

      element.addEventListener("pointermove", handleMove);
      element.addEventListener("pointerleave", handleLeave);

      return () => {
        element.removeEventListener("pointermove", handleMove);
        element.removeEventListener("pointerleave", handleLeave);
      };
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [enabled, reducedMotion]);

  if (!enabled || reducedMotion) {
    return null;
  }

  const rootClasses = [
    "custom-cursor",
    `is-${cursorState.mode}`,
    visible ? "is-visible" : "",
    cursorState.label ? "has-label" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClasses} aria-hidden="true">
      <div ref={ringRef} className="custom-cursor-ring">
        <span ref={ringTextRef} className="custom-cursor-text">
          {cursorState.label}
        </span>
      </div>
      <div ref={dotRef} className="custom-cursor-dot" />
    </div>
  );
}
