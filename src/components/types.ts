import { FillData, StrokeData } from "@svgdotjs/svg.js";

export interface FlowNode {
  id: string | number;
  col: number;
  row: number;
  [prop: string]: any;
}
export interface LineSymbol {
  title?: string;
}
export interface Line {
  source: number | string;
  target: number | string;
  symbols?: LineSymbol[];
  color?: string;
}
export interface NodeMargin {
  x: number;
  y: number;
}

// 'a' means all
export type LineType = "a" | Array<number>;
export interface Grid {
  row?: LineType;
  col?: LineType;
}

export interface RectArea {
  startCol: number;
  startRow: number;
  endCol: number;
  endRow: number;
  stroke?: StrokeData;
  fill?: FillData;
}

export type alignType = "start" | "middle" | "end";

export interface FlowTextType {
  rowStart?: number;
  rowEnd?: number;
  colStart?: number;
  colEnd?: number;
  rotate?: boolean;
  rowAlign?: alignType;
  colAlign?: alignType;
  content: string;
  font?: Record<string, any>;
}

export type Direction = "top" | "left" | "bottom" | "right";
