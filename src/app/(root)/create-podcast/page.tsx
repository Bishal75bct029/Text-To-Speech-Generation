'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { toast } from 'sonner';

import { useMutation } from 'convex/react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

import { useFormContext } from 'react-hook-form';

import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';
import { Button } from '@/components/ui/button';
import { FormField, FormItem, FormMessage, FormProvider } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import GeneratePodcast from '@/custom-components/GeneratePodcast';
import GenerateThumbnail from '@/custom-components/GenerateThumbnail';
import SelectComponent from '@/custom-components/Select';

const schema = z.object({
  title: z.string().min(1).max(20),
  description: z.string().min(1).max(50),
});

const CreatePodcastForm = () => {
  const router = useRouter();
  const [imagePrompt, setImagePrompt] = useState('');
  const [imageStorageId, setImageStorageId] = useState<Id<'_storage'> | null>(null);
  const [imageUrl, setImageUrl] = useState('');

  const [audioUrl, setAudioUrl] = useState('');
  const [audioStorageId, setAudioStorageId] = useState<Id<'_storage'> | null>(null);
  const [audioDuration, setAudioDuration] = useState(0);

  const [voiceType, setVoiceType] = useState<string>();
  const [voicePrompt, setVoicePrompt] = useState('');

  const createPodcast = useMutation(api.podcasts.createPodcast);
  const [isFormSubmitting, setIsFormSubmitting] = useState(true);

  const { handleSubmit } = useFormContext<z.infer<typeof schema>>();

  async function onSubmit({ title, description }: z.infer<typeof schema>) {
    try {
      setIsFormSubmitting(true);
      if (!audioUrl || !imageUrl || !voiceType) {
        toast.info('Please generate audio and image');
        setIsFormSubmitting(false);
        throw new Error('Please generate audio and image');
      }

      const podcast = await createPodcast({
        title,
        description,
        audioUrl,
        imageUrl,
        voiceType,
        imagePrompt,
        voicePrompt,
        views: 0,
        audioDuration,
        audioStorageId: audioStorageId!,
        imageStorageId: imageStorageId!,
        //@ts-ignore
        user: '',
      });

      console.log(podcast);

      toast.success('Podcast created');
      setIsFormSubmitting(false);
      router.push('/');
    } catch (error) {
      console.log(error);
      toast.error('Error');
      setIsFormSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="pb-6 text-white-1">
      <div className="mb-8 text-lg-2">Create a Podcast</div>
      <div className="flex w-full flex-col gap-8">
        <FormField
          name="podcastTitle"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2.5">
              <Input label="Podcast Title" placeholder="Enter Title" disabled={isFormSubmitting} {...field} />
            </FormItem>
          )}
        />
        <SelectComponent
          placeholder="Select category"
          options={[{ label: 'Name', value: 'Bishal' }]}
          label="Category"
          disabled={isFormSubmitting}
          onValueChange={() => setVoiceType('alt-1')}
        />
        <FormField
          name="podcastDescription"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2.5">
              <Textarea disabled={isFormSubmitting} placeholder="Write a short podcast description" {...field} />
              <FormMessage className="text-white-1" />
            </FormItem>
          )}
        />
        <div className="my-3 w-full border-t-2 border-t-black-5"></div>
        <GeneratePodcast
          setAudioStorageId={setAudioStorageId}
          setAudio={setAudioUrl}
          voiceType={voiceType!}
          audio={audioUrl}
          voicePrompt={voicePrompt}
          setVoicePrompt={setVoicePrompt}
          setAudioDuration={setAudioDuration}
        />
        <GenerateThumbnail
          setImage={setImageUrl}
          setImageStorageId={setImageStorageId}
          image={imageUrl}
          imagePrompt={imagePrompt}
          setImagePrompt={setImagePrompt}
        />
        <Button disabled={isFormSubmitting}>{isFormSubmitting ? 'Publishing...' : 'Publish'} </Button>
      </div>
    </form>
  );
};

const CreatePodcast = () => {
  return (
    <FormProvider resolver={zodResolver(schema)}>
      <CreatePodcastForm />
    </FormProvider>
  );
};
export default CreatePodcast;
