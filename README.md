<div align="center">
  <br />
      <img src="https://github.com/Bishal75bct029/Text-To-Speech-Generation/blob/master/public/image.png" alt="Project Banner">
  <br />

  <div>
    <img src="https://img.shields.io/badge/-Typescript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="typescript" />
    <img src="https://img.shields.io/badge/-Next_._JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000" alt="nextdotjs" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
    <img src="https://img.shields.io/badge/-OpenAI-black?style=for-the-badge&logoColor=white&logo=openai&color=412991" alt="openai" />
  </div>

  <h3 align="center">AI Text to Speech Generate</h3>

</div>

## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)
5. 🕸️ [Snippets (Code to Copy)](#snippets)
6. 🔗 [Assets](#links)
7. 🚀 [More](#more)

## <a name="introduction">🤖 Introduction</a>

An innovative AI-powered SaaS platform that allows users to generate, explore, and listen to podcasts effortlessly. It features multi-voice AI text-to-speech conversion, automatic podcast thumbnail creation, and smooth audio playback, making podcast creation and discovery more intuitive and engaging.

## <a name="tech-stack">⚙️ Tech Stack</a>

- Next.js
- TypeScript
- Convex
- OpenAI
- Clerk
- ShadCN
- Tailwind CSS

## <a name="features">🔋 Features</a>

👉 **Robust Authentication**: Secure and reliable user login and registration system.

👉 **Modern Home Page**: Showcases trending podcasts with a sticky podcast player for continuous listening.

👉 **Discover Podcasts Page**: Dedicated page for users to explore new and popular podcasts.

👉 **Fully Functional Search**: Allows users to find podcasts easily using various search criteria.

👉 **Create Podcast Page**: Enables podcast creation with text-to-audio conversion, AI image generation, and previews.

👉 **Multi Voice AI Functionality**: Supports multiple AI-generated voices for dynamic podcast creation.

👉 **Profile Page**: View all created podcasts with options to delete them.

👉 **Podcast Details Page**: Displays detailed information about each podcast, including creator details, number of listeners, and transcript.

👉 **Podcast Player**: Features backward/forward controls, as well as mute/unmute functionality for a seamless listening experience.

👉 **Responsive Design**: Fully functional and visually appealing across all devices and screen sizes.

and many more, including code architecture and reusability

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [pnpm](https://www.npmjs.com/) (Node Package Manager alternative)

**Cloning the Repository**

```bash
git clone https://github.com/Bishal75bct029/Text-To-Speech-Generation
cd text-speech
```

**Installation**

Install the project dependencies using pnpm:

```bash
pnpm install
```

**Set Up Environment Variables**

Create a new file named `.env` in the root of your project and add the following content:

```env
CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL='/sign-in'
NEXT_PUBLIC_CLERK_SIGN_UP_URL='/sign-up'
```

Replace the placeholder values with your actual Convex & Clerk credentials. You can obtain these credentials by signing up on the [Convex](https://www.convex.dev/) and [Clerk](https://clerk.com/) websites.

**Running the Project**

```bash
pnpm dev
 OR
make start
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.
