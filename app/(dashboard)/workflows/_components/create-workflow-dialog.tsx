'use client';

import { useCallback, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import {
  createWorkflowSchema,
  createWorkflowSchemaType,
} from '@/schema/workflow';
import { Layers2Icon, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomDialogHeader from '@/components/custom-dialog-header';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useMutation } from '@tanstack/react-query';
import { CreateWorkflow } from '@/actions/workflows/createWorkflow';
import { toast } from 'sonner';

type CreateWorkflowDialogProps = {
  triggerText?: string;
};
function CreateWorkflowDialog  ({ triggerText }: CreateWorkflowDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<createWorkflowSchemaType>({
    resolver: zodResolver(createWorkflowSchema),
    defaultValues: {},
  });

  const { mutate, isPending } = useMutation({
    mutationFn: CreateWorkflow,
    onSuccess: () => {
      setIsOpen(false);
      toast.success('Workflow created successfully', { id: 'create-workflow' });
    },
    onError: (error) => {
      toast.error(error.message, { id: 'create-workflow' });
    },
  });

  const onSubmit = useCallback((data: createWorkflowSchemaType) => {
    toast.loading('Creating workflow...', { id: 'create-workflow' });
    mutate(data);
  }, [ mutate ]);

  return (
    <Dialog open={isOpen} onOpenChange={open => {
      if (!open) form.reset();
      setIsOpen(open);
    }}>
      <DialogTrigger asChild>
        <Button>{triggerText ?? 'Create workflow'}</Button>
      </DialogTrigger>
      <DialogContent className='px-0'>
        <CustomDialogHeader
          icon={Layers2Icon}
          title='Create workflow'
          subtitle='Start building your workflow'
        />
        <div className='p-6'>
          <Form {...form}>
            <form action='' className='space-y-8 w-full' onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      htmlFor='name'
                      className='flex gap-1 items-center'
                    >
                      Name
                      <p className='text-xs text-primary'>(required)</p>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>The name of the workflow</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      htmlFor='description'
                      className='flex gap-1 items-center'
                    >
                      Description
                      <p className='text-xs text-primary'>(optional)</p>
                    </FormLabel>
                    <FormControl>
                      <Textarea className='resize-none' {...field} />
                    </FormControl>
                    <FormDescription>
                      Provide a brief description of what the workflow does{' '}
                      <br /> (max 100 characters)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type='submit' className='w-full' disabled={isPending}>
                {isPending ? <Loader2 className='animete-spin'/> : 'Proceed'}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkflowDialog;
