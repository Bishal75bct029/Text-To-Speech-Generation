import { ConvexError, v } from 'convex/values';

import { internalMutation, query } from './_generated/server';
import { userSchema } from './schema';

export const fetchUserById = query({
  args: { clerkId: v.string() },
  handler: async (ctx, { clerkId }) => {
    const user = await ctx.db
      .query('users')
      .filter((q) => q.eq(q.field('clerkId'), clerkId))
      .unique();

    if (!user) throw new ConvexError('User not found.');

    return user;
  },
});

export const getTopUserByPodcastCount = query({
  args: {},
  handler: async (ctx) => {
    const user = await ctx.db.query('users').collect();

    const userData = await Promise.all(
      user.map(async (u) => {
        const podcasts = await ctx.db
          .query('podcasts')
          .filter((q) => q.eq(q.field('authorId'), u.clerkId))
          .collect();

        const sortedPodcasts = podcasts.sort((a, b) => b.views - a.views);

        return {
          ...u,
          totalPodcasts: podcasts.length,
          podcast: sortedPodcasts.map(({ title, _id }) => ({
            podcastTitle: title,
            podcastId: _id,
          })),
        };
      }),
    );

    return userData.sort((a, b) => b.totalPodcasts - a.totalPodcasts);
  },
});

export const createUser = internalMutation({
  args: userSchema,
  handler: async (ctx, args) => {
    console.log('here it is called and error');
    await ctx.db.insert('users', args);
  },
});

export const updateUser = internalMutation({
  args: {
    clerkId: v.string(),
    imageUrl: v.string(),
    email: v.string(),
  },
  async handler(ctx, { clerkId, imageUrl, email }) {
    const user = await ctx.db
      .query('users')
      .filter((q) => q.eq(q.field('clerkId'), clerkId))
      .unique();

    if (!user) throw new ConvexError('User not found.');

    await ctx.db.patch(user._id, { imageUrl, email });

    const podcast = await ctx.db
      .query('podcasts')
      .filter((q) => q.eq(q.field('authorId'), clerkId))
      .collect();

    await Promise.all(
      podcast.map(async (p) => {
        await ctx.db.patch(p._id, {
          authorImageUrl: imageUrl,
        });
      }),
    );
  },
});

export const deleteUser = internalMutation({
  args: { clerkId: v.string() },
  async handler(ctx, { clerkId }) {
    const user = await ctx.db
      .query('users')
      .filter((q) => q.eq(q.field('clerkId'), clerkId))
      .unique();

    if (!user) throw new ConvexError('User not found.');

    await ctx.db.delete(user._id);
  },
});
