import { CustomNode } from '@/types/nodes';
import { TaskType } from '@/types/task';

export function createFlowNode(
  nodeType: TaskType,
  position?: { x: number; y: number }
): CustomNode {
  return {
    id: crypto.randomUUID(),
    data: {
      type: nodeType,
      inputs: {},
    },
    position: position ?? { x: 0, y: 0 },
  };
}
