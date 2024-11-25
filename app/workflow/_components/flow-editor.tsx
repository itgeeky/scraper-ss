
import React from 'react';
import { Workflow } from '@prisma/client';
import { Background, BackgroundVariant, Controls, ReactFlow, useEdgesState, useNodesState } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { createFlowNode } from '@/lib/workflow/create-flow-node';
import { TaskType } from '@/types/task';

type Props = {
  workflow: Workflow;
};

function FlowEditor({ workflow }: Props) {
  const [nodes, setNodes, onNodesChange] = useNodesState([
    createFlowNode(TaskType.LAUNCH_BROWSER)
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  return (
    <main className='h-full w-full'>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onNodesChange={onNodesChange}
      >
        <Controls position='top-left'/>
        <Background variant={BackgroundVariant.Dots} gap={12}/>
      </ReactFlow>
    </main>
  );
}

export default FlowEditor;
