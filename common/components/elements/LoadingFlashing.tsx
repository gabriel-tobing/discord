const LoadingFlashing = () => {
  return (
    <div className="relative flex items-center gap-x-1">
      <div className="z-1 w-2 h-2 rounded-full scale-0 animate-grow-dot"></div>
      <div className="w-2 h-2 rounded-full scale-0 animate-grow-dot animation-delay-300"></div>
      <div className="w-2 h-2 rounded-full scale-0 animate-grow-dot animation-delay-600"></div>
    </div>
  );
};

export default LoadingFlashing;
