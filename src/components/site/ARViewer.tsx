import { useEffect, useRef, useState } from "react";
import { Box, Maximize2, X, Loader2 } from "lucide-react";
import "@google/model-viewer";

// model-viewer is loaded globally via <script> in __root.tsx

// interface ModelViewerAttrs extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
//   src?: string;
//   "ios-src"?: string;
//   alt?: string;
//   ar?: boolean | "";
//   "ar-modes"?: string;
//   "ar-scale"?: string;
//   "ar-placement"?: string;
//   "camera-controls"?: boolean | "";
//   "touch-action"?: string;
//   "shadow-intensity"?: string;
//   "shadow-softness"?: string;
//   "environment-image"?: string;
//   "skybox-image"?: string;
//   exposure?: string;
//   "tone-mapping"?: string;
//   "auto-rotate"?: boolean | "";
//   "auto-rotate-delay"?: string;
//   "rotation-per-second"?: string;
//   "camera-orbit"?: string;
//   "min-camera-orbit"?: string;
//   "max-camera-orbit"?: string;
//   "field-of-view"?: string;
//   "interaction-prompt"?: string;
//   poster?: string;
//   loading?: "auto" | "lazy" | "eager";
//   reveal?: "auto" | "interaction";
//   scale?: string;
//   style?: CSSProperties;
//   ref?: React.Ref<HTMLElement>;
// }

export interface ARButtonProps {
  glbUrl?: string;
  usdzUrl?: string;
  productName: string;
  poster?: string;
  modelScale?: string;
  onEvent?: (name: string, meta?: Record<string, unknown>) => void;
}

function track(name: string, meta?: Record<string, unknown>) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    if (typeof w.gtag === "function") w.gtag("event", name, meta ?? {});
    if (typeof w.dataLayer?.push === "function") w.dataLayer.push({ event: name, ...meta });
  } catch { /* noop */ }
}

export function ARButton({ glbUrl, usdzUrl, productName, poster, modelScale, onEvent }: ARButtonProps) {
  const [open, setOpen] = useState(false);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    if (!glbUrl && !usdzUrl) setSupported(false);
  }, [glbUrl, usdzUrl]);

  if (!supported) return null;

  const handle = () => {
    track("ar_button_clicked", { product: productName });
    onEvent?.("ar_button_clicked", { product: productName });
    setOpen(true);
  };

  return (
    <>
      <button
        onClick={handle}
        aria-label={`View ${productName} in 3D and AR`}
        className="group inline-flex items-center justify-center gap-2.5 px-6 py-4 border border-foreground hover:bg-foreground hover:text-background transition-all duration-400 text-[11px] tracking-[0.22em] uppercase font-medium w-full sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <Box className="h-4 w-4" strokeWidth={1.6} />
        View in 3D / AR
      </button>

      {open && (
        <ARModal
          glbUrl={glbUrl}
          usdzUrl={usdzUrl}
          productName={productName}
          poster={poster}
          modelScale={modelScale}
          onClose={() => setOpen(false)}
          onEvent={onEvent}
        />
      )}
    </>
  );
}

function ARModal({ glbUrl, usdzUrl, productName, poster, modelScale, onClose, onEvent }: ARButtonProps & { onClose: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const startedAt = useRef(Date.now());

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const t = startedAt.current;
    return () => {
      document.body.style.overflow = "";
      const seconds = Math.round((Date.now() - t) / 1000);
      track("ar_viewer_closed", { product: productName, seconds });
      onEvent?.("ar_viewer_closed", { product: productName, seconds });
    };
  }, [productName, onEvent]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onLoad = () => { setLoaded(true); track("ar_model_loaded", { product: productName }); };
    const onErr = () => { setError("We couldn't load the 3D model. Please try again."); track("ar_model_error", { product: productName }); };
    const onArStatus = (e: Event) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const status = (e as any).detail?.status;
      if (status === "session-started") track("ar_session_started", { product: productName });
      if (status === "failed") track("ar_session_failed", { product: productName });
    };
    el.addEventListener("load", onLoad);
    el.addEventListener("error", onErr);
    el.addEventListener("ar-status", onArStatus as EventListener);
    return () => {
      el.removeEventListener("load", onLoad);
      el.removeEventListener("error", onErr);
      el.removeEventListener("ar-status", onArStatus as EventListener);
    };
  }, [productName]);

  const launchAr = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const el = ref.current as any;
    if (el?.activateAR) {
      track("ar_launch_requested", { product: productName });
      try { el.activateAR(); } catch { /* noop */ }
    }
  };

  return (
    <div className="fixed inset-0 z-[90] bg-background flex flex-col" role="dialog" aria-label={`3D viewer for ${productName}`}>
      <header className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div className="min-w-0">
          <p className="eyebrow">3D · AR Experience</p>
          <h2 className="font-serif text-lg md:text-xl truncate mt-1">{productName}</h2>
        </div>
        <button onClick={onClose} aria-label="Close 3D viewer" className="p-2 hover:bg-surface rounded-full">
          <X className="h-5 w-5" />
        </button>
      </header>

      <div className="relative flex-1 bg-surface">
        {!loaded && !error && (
          <div className="absolute inset-0 grid place-items-center">
            <div className="text-center">
              <Loader2 className="h-7 w-7 animate-spin mx-auto text-muted-foreground" strokeWidth={1.5} />
              <p className="mt-4 text-[11px] tracking-[0.22em] uppercase text-muted-foreground">Loading model…</p>
            </div>
          </div>
        )}
        {error && (
          <div className="absolute inset-0 grid place-items-center px-6">
            <div className="text-center max-w-sm">
              <p className="font-serif text-2xl">3D unavailable</p>
              <p className="mt-2 text-sm text-muted-foreground">{error}</p>
              <button onClick={onClose} className="btn-ghost-luxe mt-6">Back to product</button>
            </div>
          </div>
        )}
        
        <model-viewer
          ref={ref}
          src={glbUrl}
          ios-src={usdzUrl}
          alt={`Interactive 3D model of ${productName}`}
          ar
          ar-modes="webxr scene-viewer quick-look"
          ar-scale="fixed"
          ar-placement="floor"
          camera-controls
          touch-action="pan-y"
          shadow-intensity="1.6"
          shadow-softness="1"
          environment-image="https://modelviewer.dev/shared-assets/environments/moon_1k.hdr"
          exposure="1.15"
          tone-mapping="aces"
          auto-rotate
          auto-rotate-delay="1500"
          rotation-per-second="24deg"
          camera-orbit="35deg 78deg 1.6m"
          min-camera-orbit="auto auto 0.6m"
          max-camera-orbit="auto auto 3m"
          field-of-view="28deg"
          interaction-prompt="auto"
          poster={poster}
          loading="eager"
          reveal="auto"
          scale={modelScale}
          style={{ width: "100%", height: "100%", background: "linear-gradient(180deg, #f7f4ef 0%, #ece6dc 100%)" }}
        />
      </div>

      <footer className="border-t border-border px-6 py-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">Drag to rotate · pinch to zoom · open on phone for camera AR</p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const url = typeof window !== "undefined" ? window.location.href : "";
              navigator.clipboard?.writeText(url);
              track("ar_link_copied", { product: productName });
            }}
            className="btn-ghost-luxe inline-flex"
            aria-label="Copy link to open on phone"
          >
            Copy phone link
          </button>
          <button
            onClick={launchAr}
            className="btn-luxe inline-flex"
            aria-label="View in your space using augmented reality"
          >
            <Maximize2 className="h-4 w-4" /> View in Your Space
          </button>
        </div>
      </footer>
    </div>
  );
}
