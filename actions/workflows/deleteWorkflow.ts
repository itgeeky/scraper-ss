'use server';

import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function DeleteWorkflow(id: string) {
  const { userId } = auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  const result = await prisma.workflow.delete({
    where: {
      id: id,
      userId: userId,
    },
  });

  if (!result) {
    throw new Error('Failed to delete workflow');
  }

  revalidatePath('/workflows');
}
