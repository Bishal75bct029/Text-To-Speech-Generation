import { SignUp } from '@clerk/nextjs';

const ApplicationSignUp = () => {
  return (
    <div className="flex-center glassmorphism-auth h-screen w-full">
      <SignUp />
    </div>
  );
};

export default ApplicationSignUp;
