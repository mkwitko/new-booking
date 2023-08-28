export function Calendar() {
  return (
    <div className="overflow-hidden rounded-b2b border border-borderColor/20">
      <header className="flex items-center bg-primary text-xs">
        <span className="px-7 text-white">set</span>
        <span className="px-7 text-white">set</span>
      </header>

      <div className="flex w-full items-center divide-x divide-borderColor/20 py-2">
        <div className="flex flex-col items-center divide-y divide-borderColor/20 px-7">
          <span className="font-semibold text-primary-500">23</span>
          <span className="text-xs text-textSecondary">seg</span>
        </div>

        <div className="flex flex-col items-center divide-y divide-borderColor/20 px-7">
          <span className="font-semibold text-primary-500">23</span>
          <span className="text-xs text-textSecondary">seg</span>
        </div>
      </div>
    </div>
  )
}
