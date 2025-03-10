import { httpRouter } from 'convex/server';

import type { WebhookEvent } from '@clerk/nextjs/server';
import { Webhook } from 'svix';

import { internal } from './_generated/api';
import { httpAction } from './_generated/server';

const handleClerkWebhook = httpAction(async (ctx, request) => {
  console.log('here i am');
  const event = await validateRequest(request);
  if (!event) {
    return new Response('Invalid request', { status: 400 });
  }
  switch (event.type) {
    case 'user.created':
      console.log('here i am and where are you man');
      await ctx.runMutation(internal.users.createUser, {
        clerkId: event.data.id,
        name: event.data.first_name!,
        email: event.data.email_addresses[0].email_address,
        imageUrl: event.data.image_url,
      });
      break;

    case 'user.updated':
      await ctx.runMutation(internal.users.updateUser, {
        clerkId: event.data.id,
        imageUrl: event.data.image_url,
        email: event.data.email_addresses[0].email_address,
      });
      break;

    case 'user.deleted':
      await ctx.runMutation(internal.users.deleteUser, {
        clerkId: event.data.id as string,
      });
      break;
  }
  return new Response(null, {
    status: 200,
  });
});

const http = httpRouter();

http.route({
  path: '/clerk',
  method: 'POST',
  handler: handleClerkWebhook,
});

const validateRequest = async (req: Request): Promise<WebhookEvent | undefined> => {
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET!;
  if (!webhookSecret) {
    console.log('error is here');
    throw new Error('CLERK_WEBHOOK_SECRET is not defined');
  }
  const payloadString = await req.text();
  const headerPayload = req.headers;
  const svixHeaders = {
    'svix-id': headerPayload.get('svix-id')!,
    'svix-timestamp': headerPayload.get('svix-timestamp')!,
    'svix-signature': headerPayload.get('svix-signature')!,
  };
  const wh = new Webhook(webhookSecret);
  const event = wh.verify(payloadString, svixHeaders);

  return event as unknown as WebhookEvent;
};

export default http;
