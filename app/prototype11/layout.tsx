import Link from 'next/link';

export default function Prototype11Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Frame */}
      <div className="max-w-md mx-auto bg-white shadow-2xl min-h-screen">
        {children}
      </div>
    </div>
  );
}
