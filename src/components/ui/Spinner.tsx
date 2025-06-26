const Spinner = ({ className }: { className?: string }) => (
  <div className={`animate-spin h-5 w-5 border-2 border-t-transparent border-orange-400 rounded-full ${className}`} />
);

export default Spinner;
