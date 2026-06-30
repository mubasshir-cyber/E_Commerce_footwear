import "@google/model-viewer";

interface Props {
  model: string;
  iosModel?: string;
}

export default function Product3D({
  model,
  iosModel,
}: Props) {
  return (
    <model-viewer
      src={model}
      ios-src={iosModel}
      ar
      ar-modes="scene-viewer quick-look webxr"
      camera-controls
      auto-rotate
      auto-rotate-delay="0"
      rotation-per-second="20deg"
      shadow-intensity="1"
      exposure="1"
      environment-image="neutral"
      interaction-prompt="auto"
      style={{
        width: "100%",
        height: "650px",
        background: "#faf8f5",
        borderRadius: "12px",
      }}
    />
  );
}