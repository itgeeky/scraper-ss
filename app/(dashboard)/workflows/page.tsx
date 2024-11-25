import { getUserWorkflows } from '@/actions/workflows/getUserWorkflows';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import UserWorkflowsSkeleton from '@/components/user-workflows-skeleton';
import { AlertCircle, InboxIcon } from 'lucide-react';
import React, { Suspense } from 'react';
import CreateWorkflowDialog from './_components/create-workflow-dialog';
import WorkflowCard from './_components/workflow-card';

const WorkflowsPage = () => {
  return (
    <div className='flex-1 flex flex-col h-full'>
      <div className='flex justify-between'>
        <div className='flex flex-col'>
          <h1 className='text-3xl font-bold'>Workflows</h1>
          <p className='text-muted-foreground'>
            Create, manage and monitor your workflows
          </p>
        </div>
        <CreateWorkflowDialog />
      </div>
      <div className='h-full py-6'>
        <Suspense fallback={<UserWorkflowsSkeleton />}>
          <UserWorkflows />
        </Suspense>
      </div>
    </div>
  );
};

async function UserWorkflows() {
  const workflows = await getUserWorkflows();
  if (!workflows) {
    <Alert variant='destructive'>
      <AlertCircle className='w-4 h-4' />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Something went wrong, try again later.
      </AlertDescription>
    </Alert>;
  }
  if (workflows.length === 0) {
    return (
      <div className='flex flex-col gap-4 h-full items-center justify-center'>
        <div className='rounded-full bg-accent w-20 h-20 flex items-center justify-center'>
          <InboxIcon size={40} className='stroke-primary' />
        </div>
        <div className='flex flex-col gap-1 text-center'>
          <p className='font-bold'>No workflows created.</p>
          <p className='text-muted-foreground text-sm'>
            Create your first workflow to get started.
          </p>
        </div>
        <CreateWorkflowDialog triggerText='Create your first workflow' />
      </div>
    );
  }
  return <div className='grid grid-cols-1 gap-3'>{
    workflows.map((workflow,index) => (
      <WorkflowCard key={workflow.id} workflow={workflow} />
    ))
  }</div>;
}

export default WorkflowsPage;
