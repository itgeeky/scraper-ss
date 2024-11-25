'use client';
import Link from 'next/link';
import React from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { WorkflowStatus } from '@/types/workflow';
import { Workflow } from '@prisma/client';
import {
  FileTextIcon,
  MoreVertical,
  PlayIcon,
  ShuffleIcon,
  TrashIcon,
} from 'lucide-react';
import { useConfirm } from '@/hooks/use-confirm';
import { useMutation } from '@tanstack/react-query';
import { DeleteWorkflow } from '@/actions/workflows/deleteWorkflow';
import { toast } from 'sonner';

type Props = {
  workflow: Workflow;
};
const statusColors = {
  [WorkflowStatus.DRAFT]: 'bg-yellow-400 text-yellow-600',
  [WorkflowStatus.PUBLISH]: 'bg-primary',
};
function WorkflowCard({ workflow }: Props) {
  const isDraft = workflow.status === WorkflowStatus.DRAFT;

  return (
    <Card className='border border-separate shadow-sm rounded-lg overflow-hidden hover:shadow-md dark:shadow-primary/30'>
      <CardContent className='p-4 flex items-center justify-between h-[100px]'>
        <div className='flex items-center justify-end space-x-3'>
          <div
            className={cn(
              'w-10 h-10 rounded-full flex items-center justify-center',
              statusColors[workflow.status as WorkflowStatus]
            )}
          >
            {isDraft ? (
              <FileTextIcon className='h-5 w-5' />
            ) : (
              <PlayIcon className='h-5 w-5 text-white' />
            )}
          </div>
          <div>
            <h3 className='text-base font-bold text-muted-foreground flex  items-end'>
              <Link
                href={`/workflow/editor/${workflow.id}`}
                className='flex items-center hover:underline'
              >
                {workflow.name}
              </Link>
              {isDraft && (
                <span className='text-xs ml-2 bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full'>
                  Draft
                </span>
              )}
            </h3>
          </div>
        </div>
        <div className='flex items-center space-x-2'>
          <Link
            href={`/workflow/editor/${workflow.id}`}
            className={cn(
              buttonVariants({
                variant: 'outline',
                size: 'sm',
              }),
              'flex items-center gap-2'
            )}
          >
            <ShuffleIcon size={16} /> Edit
          </Link>
          <WorkflowActions workflowId={workflow.id} />
        </div>
      </CardContent>
    </Card>
  );
}

const WorkflowActions = ({ workflowId }: { workflowId: string }) => {
  const [ConfirmationDialog, confirm] = useConfirm({
    title: 'Are you sure you want to delete this workflow?',
    description: 'This action cannot be undone.',
  });

  const deleteMutation = useMutation({
    mutationFn: DeleteWorkflow,
    onSuccess: () => {
      toast.dismiss(workflowId);
      toast.success('Workflow deleted successfully');
    },
    onError: (error) => {
      toast.dismiss(workflowId);
      toast.error(error.message);
    },
  });

  const onDelete = async () => {
    const ok = await confirm();
    if (!ok) return;
    toast.loading('Deleting workflow...', { id: workflowId });
    deleteMutation.mutate(workflowId);
  };
  return (
    <>
      <ConfirmationDialog />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' size='sm'>
            <MoreVertical size={18} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>View</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className='text-destructive flex items-center gap-2'
            onClick={onDelete}
          >
            <TrashIcon size={16} /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default WorkflowCard;
