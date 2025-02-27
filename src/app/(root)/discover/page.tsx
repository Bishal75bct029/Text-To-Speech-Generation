'use client';

import { useQuery } from 'convex/react';
import React from 'react';

import { api } from '../../../../convex/_generated/api';
import EmptyState from '@/custom-components/EmptyState';
import LoaderSpinner from '@/custom-components/LoaderSpinner';
import PodcastCard from '@/custom-components/PodcastCard';
import Searchbar from '@/custom-components/SearchBar';

const Discover = ({ searchParams: { search } }: { searchParams: { search: string } }) => {
  const podcastsData = useQuery(api.podcasts.getPodcastBySearch, { search: search ?? '' });

  return (
    <div className="flex flex-col gap-9">
      <Searchbar />
      <div className="flex flex-col gap-9">
        <h1 className="text-20 font-bold text-white-1">
          {!search ? 'Discover Trending Podcasts' : 'Search results for '}
          {search && <span className="text-white-2">{search}</span>}
        </h1>
        {podcastsData ? (
          <>
            {podcastsData.length > 0 ? (
              <div className="podcast_grid">
                {podcastsData?.map(({ _id, title, description, imageUrl }: any) => (
                  <PodcastCard key={_id} imgUrl={imageUrl!} title={title} description={description} podcastId={_id} />
                ))}
              </div>
            ) : (
              <EmptyState title="No results found" />
            )}
          </>
        ) : (
          <LoaderSpinner />
        )}
      </div>
    </div>
  );
};

export default Discover;
