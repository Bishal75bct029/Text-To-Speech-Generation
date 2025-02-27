import Image from 'next/image';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      {' '}
      <div className="absolute size-full">
        <Image src="/images/bg-img.png" alt="background" fill className="size-full" />
      </div>
      {children}
    </div>
  );
}
