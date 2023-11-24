export function TailwindIndicator() {
  if (process.env.NODE_ENV === 'production') return null

  return (
    <div className="fixed bottom-2 right-2 z-50 flex items-center justify-center rounded-full bg-red-700 p-1.5 font-mono text-xs text-white">
      <div className="block sm:hidden">xs</div>
      <div className="hidden sm:block md:hidden">sm</div>
      <div className="hidden md:block lg:hidden">md</div>
      <div className="hidden lg:block xl:hidden">lg</div>
      <div className="hidden xl:block 2xl:hidden">xl</div>
      <div className="hidden 2xl:block">2xl</div>
    </div>
  )
}
