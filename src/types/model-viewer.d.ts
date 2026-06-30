import React from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        src?: string;
        alt?: string;
        poster?: string;

        "ios-src"?: string;

        ar?: boolean;
        "ar-modes"?: string;
        "ar-scale"?: string;
        "ar-placement"?: string;

        "camera-controls"?: boolean;

        "touch-action"?: string;

        "shadow-intensity"?: string;
        "shadow-softness"?: string;

        exposure?: string;

        "tone-mapping"?: string;

        "environment-image"?: string;

        "skybox-image"?: string;

        "auto-rotate"?: boolean;

        "auto-rotate-delay"?: string;

        "rotation-per-second"?: string;

        "camera-orbit"?: string;

        "min-camera-orbit"?: string;

        "max-camera-orbit"?: string;

        "field-of-view"?: string;

        "interaction-prompt"?: string;

        loading?: "auto" | "lazy" | "eager";

        reveal?: "auto" | "interaction";

        scale?: string;

        style?: React.CSSProperties;
      };
    }
  }
}

export {};