import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import PodcastCard from '@/custom-components/PodcastCard';

const Discover = () => {
  return (
    <div className="flex flex-col gap-12 text-white-1">
      <Input placeholder="Type here to search" startIcon="./icons/search.svg" />
      <div className="flex items-center justify-between">
        <span className="text-lg-1 text-white-1">Discover Community Podcasts</span>
        <Button>Apply Filter</Button>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <PodcastCard />
        <PodcastCard />
        <PodcastCard />
        <PodcastCard />
        <PodcastCard />
        <PodcastCard />
        <PodcastCard />
        <PodcastCard />
      </div>
    </div>
  );
};

export default Discover;
