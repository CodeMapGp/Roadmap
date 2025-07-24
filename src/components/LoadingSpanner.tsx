
const LoadingSpanner = () => {
    return (
    <div className="animate-spin inline-block w-6 h-6 border-4 border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500" role="status" aria-label="loading">
    <span className="sr-only">Loading...</span>
    </div>
    )
}
export default LoadingSpanner