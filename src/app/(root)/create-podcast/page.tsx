'use client';
import Image from 'next/image';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import SelectComponent from '@/custom-components/Select';

const CreatePodcast = () => {
  const [btnVariant, setBtnVariant] = useState<'custom' | 'ai'>('ai');

  return (
    <section className="pb-6 text-white-1">
      <div className="mb-8 text-lg-2">Create a Podcast</div>
      <div className="flex w-full flex-col gap-8">
        <Input label="Podcast Title" placeholder="Enter Title" />
        <SelectComponent
          placeholder="Select category"
          options={[{ label: 'Name', value: 'Bishal' }]}
          label="Category"
        />
        <Textarea label="Description" placeholder="Write a short description about the podcast " rows={5} />
        <div className="my-3 w-full border-t-2 border-t-black-5"></div>
        <Textarea label="AI prompt to generate podcast" rows={4} placeholder="Provide text to  AI  to generate audio" />
        <div className="flex w-auto gap-2 rounded-md bg-black-1 px-3 py-2">
          <Button onClick={() => setBtnVariant('ai')} variant={btnVariant === 'ai' ? 'selected' : 'info'}>
            AI Prompt to generate thumbnail
          </Button>
          <Button onClick={() => setBtnVariant('custom')} variant={btnVariant === 'custom' ? 'selected' : 'info'}>
            Upload custom image
          </Button>
        </div>
        <div className="flex h-[10.875rem] w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-black-6 px-6 py-4">
          <Image src={'./icons/upload-image.svg'} width={40} height={40} alt="" />
          <div className="flex flex-col items-center gap-1">
            <span className="text-sm-2 text-orange-1">Click to Upload</span>
            <span className="text-sm-2 text-gray-1">SVG,PNG,JPG or GIF(max 1080*1080)</span>
          </div>
        </div>
        <Button>Submit & publish podcast </Button>
      </div>
    </section>
  );
};

export default CreatePodcast;
