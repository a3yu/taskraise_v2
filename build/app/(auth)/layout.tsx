export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative h-screen">
      <div className="absolute top-0 right-0 left-0 bottom-0 bg-gradient-to-bl from-sky-400 from-15% via-violet-300 via-55% to-amber-400 -z-20"></div>
      <div className="h-full">{children}</div>
    </div>
  );
}
