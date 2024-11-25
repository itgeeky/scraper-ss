import { Node } from '@xyflow/react';
import { TaskType } from './task';


export interface AppNodeData {
  type: TaskType;
  inpust: Record<string, string>;
  [key: string]: any
}

export interface CustomNode extends Node{
  data: AppNodeData
}