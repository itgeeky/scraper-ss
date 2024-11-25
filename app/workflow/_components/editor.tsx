'use client'
import React from 'react';
import { Workflow } from '@prisma/client';
import { ReactFlowProvider } from '@xyflow/react';
import FlowEditor from '@/app/workflow/_components/flow-editor';

type EditorProps = {
  workflow: Workflow;
};

function Editor({ workflow }: EditorProps) {
  return (
    <ReactFlowProvider>
      <div className='flex flex-col h-full overflow-hidden'>
        <section className='flex h-full overflow-auto'>
          <FlowEditor workflow={workflow} />
        </section>
      </div>
    </ReactFlowProvider>
  );
}

export default Editor;
