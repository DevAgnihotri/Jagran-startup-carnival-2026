export default function PixelDivider() {
  return (
    <div className="w-full border-t border-[#2A2A2A]">
      <div className="flex w-full h-[10px] sm:h-[12px]">
        <div className="flex-1 bg-[#FFD600]" />
        <div className="flex-1 bg-[#1E1E1E]" />
        <div className="flex-1 bg-[#FFB800]" />
        <div className="flex-1 bg-[#1E1E1E]" />
        <div className="flex-1 bg-[#FFD600]" />
      </div>
    </div>
  );
}
