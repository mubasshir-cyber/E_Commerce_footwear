import "@google/model-viewer";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": any;
    }
  }
}

interface Props {
  model: string;
  iosModel?: string;
}

export default function Product3D({ model, iosModel }: Props) {
  return (
    <model-viewer
      src={model}
      ios-src={iosModel}
      ar
      ar-modes="scene-viewer quick-look webxr"
      camera-controls
      auto-rotate
      shadow-intensity="1"
      exposure="1"
      style={{
        width: "100%",
        height: "550px",
        background: "#faf8f5",
      }}
    />
  );
}
