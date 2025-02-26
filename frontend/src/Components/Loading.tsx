
const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen space-y-2">
      <div className="w-12 h-12 border-4 border-white
        border-t-transparent rounded-full animate-spin"></div>
      <p className="m-2 text-white font-sans text-3xl font-semibold animate-pulse">
        Loading Kazmi Books...</p>
    </div>
  )
}

export default Loading