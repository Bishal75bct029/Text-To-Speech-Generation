import { SignIn } from '@clerk/nextjs';

const ApplicationSignIn = () => {
  return (
    <div className="flex-center glassmorphism-auth h-screen w-full">
      <SignIn />
    </div>
  );
};

export default ApplicationSignIn;
