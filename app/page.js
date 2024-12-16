import MarqueeButton from "@/components/MarqueeButton/MarqueeButton";

export default function Home() {
  return (
    <div className="h-screen w-screen flex gap-3 justify-center items-center">
      <MarqueeButton />
      <MarqueeButton direction={"right"} />
    </div>
  );
}
