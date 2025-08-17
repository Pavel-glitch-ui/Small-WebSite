export function ProfileSkeleton(){
    return(
        <main>
  <section
    className="flex flex-col md:flex-row items-center justify-center
      bg-white rounded-2xl shadow-md
      p-6 sm:p-8 md:p-10 lg:p-12 mx-auto max-w-xl
      space-y-4 md:space-y-0 md:space-x-8"
  >
    
    <div
      className="w-28 h-28 md:w-36 md:h-36
        rounded-full overflow-hidden
        ring-4 ring-indigo-300 shadow-sm
        flex-shrink-0
        bg-gray-200 animate-pulse"
    />

    <div className="flex flex-col justify-center text-center md:text-left w-full">
      <div className="h-6 bg-gray-200 rounded w-2/3 mb-3 animate-pulse"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2 animate-pulse"></div>
      <div className="space-y-2 mt-4">
        <div className="h-3 bg-gray-200 rounded animate-pulse w-full"></div>
        <div className="h-3 bg-gray-200 rounded animate-pulse w-5/6"></div>
        <div className="h-3 bg-gray-200 rounded animate-pulse w-4/6"></div>
      </div>
    </div>
  </section>
</main>

    )
}