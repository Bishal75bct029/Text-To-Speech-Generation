export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <div className="flex h-screen w-full items-center justify-between">{children}</div>;
}
