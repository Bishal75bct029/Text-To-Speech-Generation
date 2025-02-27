import { useAction, useMutation } from 'convex/react';
import { Loader } from 'lucide-react';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { toast } from 'sonner';

import { v4 as uuidv4 } from 'uuid';

import { useUploadFiles } from '@xixixao/uploadstuff/react';

import { api } from '../../convex/_generated/api';
import { GenerateThumbnailProps } from '@/@types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const GenerateThumbnail = ({
  setImage,
  setImageStorageId,
  image,
  imagePrompt,
  setImagePrompt,
}: GenerateThumbnailProps) => {
  const [isAiThumbnail, setIsAiThumbnail] = useState(false);

  const [isImageLoading, setIsImageLoading] = useState(false);

  const imageRef = useRef<HTMLInputElement>(null);

  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const { startUpload } = useUploadFiles(generateUploadUrl);
  const getImageUrl = useMutation(api.podcasts.getUrl);
  const handleGenerateThumbnail = useAction(api.openai.generateThumbnailAction);

  const handleImage = async (blob: Blob, fileName: string) => {
    setIsImageLoading(true);
    setImage('');

    try {
      const file = new File([blob], fileName, { type: 'image/png' });

      const uploaded = await startUpload([file]);
      const storageId = (uploaded[0].response as any).storageId;

      setImageStorageId(storageId);

      const imageUrl = await getImageUrl({ storageId });
      setImage(imageUrl!);
      setIsImageLoading(false);

      toast.success('Thumbnail generated successfully');
    } catch (error) {
      console.log(error);
      toast.error('Error generating thumbnail first');
    }
  };

  const generateImage = async () => {
    try {
      const response = await handleGenerateThumbnail({ prompt: imagePrompt });
      const blob = new Blob([response], { type: 'image/png' });
      handleImage(blob, `thumbnail-${uuidv4()}`);
    } catch (error) {
      console.log(String(error));
      toast.error('Openai billing limit has been reached');
    }
  };
  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    try {
      const files = e.target.files;
      if (!files) return;
      const file = files[0];
      const blob = await file.arrayBuffer().then((ab) => new Blob([ab]));

      handleImage(blob, file.name);
    } catch (error) {
      console.log(error);
      toast.error('Error uploading image');
    }
  };

  return (
    <>
      <div className="generate_thumbnail">
        <Button type="button" onClick={() => setIsAiThumbnail(true)} variant={isAiThumbnail ? 'selected' : 'info'}>
          Use AI to generate thumbnail
        </Button>
        <Button type="button" onClick={() => setIsAiThumbnail(false)} variant={!isAiThumbnail ? 'selected' : 'info'}>
          Upload custom image
        </Button>
      </div>
      {isAiThumbnail ? (
        <div className="flex flex-col gap-5">
          <div className="mt-5 flex flex-col gap-2.5">
            <Textarea
              placeholder="Provide text to generate thumbnail"
              rows={5}
              value={imagePrompt}
              onChange={(e) => setImagePrompt(e.target.value)}
            />
          </div>
          <div className="w-full max-w-[200px]">
            <Button type="submit" onClick={generateImage}>
              {isImageLoading ? (
                <>
                  Generating
                  <Loader size={20} className="ml-2 animate-spin" />
                </>
              ) : (
                'Generate'
              )}
            </Button>
          </div>
        </div>
      ) : (
        <div className="image_div" onClick={() => imageRef?.current?.click()}>
          <Input type="file" className="hidden" ref={imageRef} onChange={(e) => uploadImage(e)} />
          {!isImageLoading ? (
            <Image src="/icons/upload-image.svg" width={40} height={40} alt="upload" />
          ) : (
            <div className="text-16 flex-center font-medium text-white-1">
              Uploading
              <Loader size={20} className="ml-2 animate-spin" />
            </div>
          )}
          <div className="flex flex-col items-center gap-1">
            <h2 className="text-12 font-bold text-orange-1">Click to upload</h2>
            <p className="text-12 font-normal text-gray-1">SVG, PNG, JPG, or GIF (max. 1080x1080px)</p>
          </div>
        </div>
      )}
      {image && (
        <div className="flex-center w-full">
          <Image src={image} width={200} height={200} className="mt-5" alt="thumbnail" />
        </div>
      )}
    </>
  );
};

export default GenerateThumbnail;
