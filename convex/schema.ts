import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export const userSchema = {
  clerkId: v.string(),
  name: v.string(),
  email: v.string(),
  imageUrl: v.string(),
};

export const podcastSchema = {
  user: v.id('users'),
  title: v.string(),
  description: v.string(),
  audioUrl: v.string(),
  audioStorageId: v.id('_storage'),
  imageUrl: v.string(),
  imageStorageId: v.id('_storage'),
  author: v.string(),
  authorId: v.string(),
  authorImageUrl: v.string(),
  voicePrompt: v.string(),
  imagePrompt: v.string(),
  voiceType: v.string(),
  audioDuration: v.number(),
  views: v.number(),
};

export default defineSchema({
  podcasts: defineTable(podcastSchema)
    .index('by_views', ['views'])
    .index('by_authorId', ['authorId'])
    .searchIndex('search_author', { searchField: 'author' })
    .searchIndex('search_title', { searchField: 'title' })
    .searchIndex('search_description', { searchField: 'description' }),
  users: defineTable(userSchema),
});
