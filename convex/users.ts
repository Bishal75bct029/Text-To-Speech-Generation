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

export const createUser = internalMutation({
  args: userSchema,
  handler: async (ctx, args) => {
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
