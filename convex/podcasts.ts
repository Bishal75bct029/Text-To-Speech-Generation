import { ConvexError, v } from 'convex/values';

import { mutation, query } from './_generated/server';
import { podcastSchema } from './schema';

export const createPodcast = mutation({
  args: podcastSchema,
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new ConvexError('User not authenticated');

    const user = await ctx.db
      .query('users')
      .filter((q) => q.eq(q.field('email'), identity.email))
      .collect();

    if (!user.length) throw new ConvexError('User not found');

    return await ctx.db.insert('podcasts', {
      audioStorageId: args.audioStorageId,
      user: user[0]._id,
      title: args.title,
      description: args.description,
      audioUrl: args.audioUrl,
      imageUrl: args.imageUrl,
      imageStorageId: args.imageStorageId,
      author: user[0].name,
      authorId: user[0].clerkId,
      voicePrompt: args.voicePrompt,
      imagePrompt: args.imagePrompt,
      voiceType: args.voiceType,
      views: args.views,
      authorImageUrl: user[0].imageUrl,
      audioDuration: args.audioDuration,
    });
  },
});

export const getUrl = mutation({
  args: {
    storageId: v.id('_storage'),
  },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});

export const getPodcastByVoiceType = query({
  args: {
    podcastId: v.id('podcasts'),
  },
  handler: async (ctx, args) => {
    const podcast = await ctx.db.get(args.podcastId);

    return await ctx.db
      .query('podcasts')
      .filter((q) => q.and(q.eq(q.field('voiceType'), podcast?.voiceType), q.neq(q.field('_id'), args.podcastId)))
      .collect();
  },
});

export const getAllPodcasts = query({
  handler: async (ctx) => {
    return await ctx.db.query('podcasts').order('desc').collect();
  },
});

export const getPodcastById = query({
  args: {
    podcastId: v.id('podcasts'),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.podcastId);
  },
});

export const getTrendingPodcasts = query({
  handler: async (ctx) => {
    return await ctx.db.query('podcasts').withIndex('by_views').order('desc').take(8);
  },
});

export const getPodcastByAuthorId = query({
  args: {
    authorId: v.string(),
  },
  handler: async (ctx, args) => {
    const podcasts = await ctx.db
      .query('podcasts')
      .filter((q) => q.eq(q.field('authorId'), args.authorId))
      .collect();

    const totalListeners = podcasts.reduce((sum, podcast) => sum + podcast.views, 0);

    return { podcasts: podcasts.slice(0, 5), listeners: totalListeners };
  },
});

export const getPodcastBySearch = query({
  args: {
    search: v.string(),
  },
  handler: async (ctx, args) => {
    if (args.search === '') {
      return await ctx.db.query('podcasts').order('desc').collect();
    }

    const authorSearch = ctx.db
      .query('podcasts')
      .withSearchIndex('search_author', (q) => q.search('author', args.search))
      .take(10);

    const titleSearch = ctx.db
      .query('podcasts')
      .withSearchIndex('search_title', (q) => q.search('title', args.search))
      .take(10);

    const searchDescription = ctx.db
      .query('podcasts')
      .withSearchIndex('search_description', (q) => q.search('description', args.search))
      .take(10);

    const searchResults = await Promise.all([authorSearch, titleSearch, searchDescription]);

    return [...searchResults[0], ...searchResults[1], [...searchResults[2]]].slice(0, 10);
  },
});

export const updatePodcastViews = mutation({
  args: {
    podcastId: v.id('podcasts'),
  },
  handler: async (ctx, args) => {
    const podcast = await ctx.db.get(args.podcastId);

    if (!podcast) throw new ConvexError('Podcast not found');

    return await ctx.db.patch(args.podcastId, {
      views: podcast.views + 1,
    });
  },
});

export const deletePodcast = mutation({
  args: {
    podcastId: v.id('podcasts'),
    imageStorageId: v.id('_storage'),
    audioStorageId: v.id('_storage'),
  },
  handler: async (ctx, args) => {
    const podcast = await ctx.db.get(args.podcastId);
    if (!podcast) throw new ConvexError('Podcast not found');

    return await Promise.all([
      ctx.db.delete(args.podcastId),
      ctx.storage.delete(args.imageStorageId),
      ctx.storage.delete(args.audioStorageId),
    ]);
  },
});
