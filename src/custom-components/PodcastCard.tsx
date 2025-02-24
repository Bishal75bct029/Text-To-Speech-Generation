import Image from 'next/image';
import React from 'react';

const PodcastCard = () => {
  return (
    <section className="flex flex-col gap-2">
      <Image width={1} height={1} src={'/images/Podcast-Info.png'} alt="" className="size-[10.875rem] rounded-lg" />
      <span>The Egyptial</span>
      <span className="text-sm-2 text-white-4">Apple Music Dance</span>
    </section>
  );
};

export default PodcastCard;
