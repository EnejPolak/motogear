export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      <div className="ml-4 text-lg text-gray-600">Loading 3D Model...</div>
    </div>
  );
}
