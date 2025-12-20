const LoadingSpinner = ({ message = "Processing..." }: { message?: string }) => {
  return (
    <div className="fixed inset-0 bg-foreground/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-card rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-4 animate-scale-in">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-muted"></div>
          <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin-slow"></div>
        </div>
        <p className="text-foreground font-medium">{message}</p>
        <p className="text-sm text-muted-foreground">Please wait...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
