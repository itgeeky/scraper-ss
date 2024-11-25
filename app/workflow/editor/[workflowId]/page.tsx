
import { waitFor } from '@/lib/helper/waitFor';
import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import React from 'react';
import Editor from '@/app/workflow/_components/editor';

// Create the async Server Component
async function WorkflowEditor({
  params,
}: {
  params: { workflowId: string };
}) {
  const { workflowId } = params;
  const { userId } = auth();

  if (!userId) {
    return <div>unauth</div>;
  }

  
  const workflow = await prisma.workflow.findUnique({
    where: {
      id: workflowId,
      userId,
    },
  });

  if (!workflow) {
    return <div>not found</div>;
  }

  return <Editor workflow={workflow}/>
}

// Export the Server Component directly without default
export default WorkflowEditor;