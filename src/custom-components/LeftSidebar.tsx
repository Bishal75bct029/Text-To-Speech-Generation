'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';

import Link from 'next/link';

import { SignedIn, SignedOut } from '@clerk/nextjs';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navLinks = [
  {
    name: 'Home',
    link: '/',
    icon: './icons/home.svg',
  },
  {
    name: 'Discover',
    link: '/discover',
    icon: './icons/discover.svg',
  },
  {
    link: '/create-podcast',
    name: 'Create Podcast',
    icon: './icons/microphone.svg',
  },
  {
    name: 'My profile',
    link: '/my-profile',
    icon: './icons/profile.svg',
  },
];

const LeftSideBar = () => {
  const pathName = usePathname();

  return (
    <div className="fixed top-0 z-10 h-screen w-[15rem]">
      <div className="sticky left-0 top-0 flex h-screen flex-col gap-2 bg-black-1 py-8 text-white-1">
        <Image src={'./icons/auth-logo.svg'} alt="" width={128} height={30} className="mx-6 mb-12" />
        {navLinks.map(({ name, link, icon }, idx) => {
          return (
            <Link
              href={link}
              className={cn(
                'mb-1 flex w-full cursor-pointer items-center gap-4 px-6 py-2 text-white-3',
                pathName === link && 'text-white rounded-sm border-r-4 border-r-orange-1 bg-nav-focus',
              )}
              key={idx}
            >
              <Image
                src={icon}
                alt=""
                width={24}
                height={24}
                className={cn(pathName === link && 'brightness-0 invert filter')}
              />
              <span className="text-md-2">{name}</span>
            </Link>
          );
        })}
        <div className="mx-6 mt-auto">
          <SignedIn>
            <Button>Log out</Button>
          </SignedIn>
          <SignedOut>
            <Button>Login</Button>
          </SignedOut>
        </div>
      </div>
    </div>
  );
};

export default LeftSideBar;
