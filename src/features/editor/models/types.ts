import { FabricObject } from 'fabric';

export type FabricObjectWithName = FabricObject & { name?: string };