import useBaseUrl from '@docusaurus/useBaseUrl';

type DemoVideoProps = {
  src: string;
  width?: number;
};

export default function DemoVideo({src, width = 320}: DemoVideoProps) {
  return (
    <video
      className="doc-demo-video"
      src={useBaseUrl(src)}
      width={width}
      autoPlay
      loop
      muted
      playsInline
      controls
      preload="metadata"
    />
  );
}
