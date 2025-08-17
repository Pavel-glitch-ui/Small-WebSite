import { motion } from "framer-motion";
export default function InfinityPageSkeleton(){
    return (
        <>
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
    className="
      flex flex-col sm:flex-row
      items-start sm:items-center
      gap-4
      p-6
      bg-gray-100
      rounded-lg
      shadow-md hover:shadow-lg
      transition-shadow
      animate-pulse
    "
    key="skeleton"
  >
    {/* avatar */}
    <div className="w-12 h-12 bg-gray-300 rounded-full flex-shrink-0" />

    {/* text part */}
    <div className="flex-1 space-y-4">
      {/* user and date */}
      <div className="flex items-center space-x-2 text-sm text-gray-500">
        <div className="h-3 bg-gray-300 rounded w-24" />   {/* “By Username” */}
        <div className="h-3 bg-gray-300 rounded w-2" />    {/* . */}
        <div className="h-3 bg-gray-300 rounded w-16" />   {/* date */}
      </div>

      {/* h2 */}
      <div className="h-6 bg-gray-300 rounded w-1/2" />

      {/* content */}
      <div className="space-y-2">
        <div className="h-3 bg-gray-300 rounded w-full" />
        <div className="h-3 bg-gray-300 rounded w-5/6" />
        <div className="h-3 bg-gray-300 rounded w-2/3" />
      </div>
    </div>
  </motion.div>
        </>
    )
}