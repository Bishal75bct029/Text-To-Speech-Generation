import LeftSideBar from '../../custom-components/LeftSidebar';
import RightSideBar from '../../custom-components/RightSideBar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative flex h-screen w-full gap-4">
      <div className="sticky top-0">
        <LeftSideBar />
      </div>
      <div className="ml-[15rem] min-h-screen flex-1 px-4 pt-8">{children}</div>
      <RightSideBar />
    </main>
  );
}
