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
  audioUrl: v.optional(v.string()),
  audioStorageId: v.optional(v.id('_storage')),
  imageUrl: v.optional(v.string()),
  imageStorageId: v.optional(v.id('_storage')),
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
    .searchIndex('search_author', { searchField: 'author' })
    .searchIndex('search_title', { searchField: 'title' })
    .searchIndex('searchDescription', { searchField: 'description' }),
  users: defineTable(userSchema),
});
