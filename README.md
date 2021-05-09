# React Grid Flow Chart

## What is Grid Flow Chart

Grid Flow Chart is a plugin which is aimed to build a highly customisable, declarative flow chart with SVG.Both [Vue version](https://github.com/TJCollin/grid-flow-chart-vue) and [React Version](https://github.com/TJCollin/grid-flow-chart-react) are provided.

## docs

[Docs](https://tjcollin.github.io/grid-flow-chart-react/docs/en/)

## example

[source code](https://github.com/TJCollin/grid-flow-chart-react/tree/main/example) of the example.

## Install

```bash
yarn add grid-flow-chart-react
```

```javascript
import { GridFlowChart } from "grid-flow-chart-react";
import "grid-flow-chart-react/dist/index.css";
```

> please make sure you have imported the grid-flow-chart-react/dist/index.css file.

# API

If you want to understand GridFlowChart thoroughly, you need to understand the common properties of its instances.

## Properties

Sometimes we want to do some extensions based on BetterScroll, we need to understand some of the properties of BetterScroll. Here are a few common properties.

### nodes

- **Type**: `FlowNode[]`.
- **Usage**: nodes of flow chart .

### lines

- **Type**: `Line[]`.
- **Usage**: lines between nodes.

### hoverLineColor

- **Type**: `string`
- **Usage**: determine the color when line hovered.

### defaultLineStroke

- **Type**: `StrokeData`
- **Usage**: default line stroke.

### colWidth

- **Type**: `number`
- **Usage**: width of the grid.

### rowHeight

- **Type**: `number`
- **Usage**: height of the grid.

### nodeWidth

- **Type**: `number`
- **Usage**: width of the node.

### nodeHeight

- **Type**: `number`
- **Usage**: height of the node.

### margin

- **Type**: `NodeMargin`
- **Usage**: top and left margin between node and grid.
- **Note**: x represents left margin, y represents top margin.

### grid

- **Type**: `Grid`
- **Usage**: grid lines.
- **Note**: row represents horizontal grid line, column represents vertical grid line. 'a' means to show all horizontal or vertical grid lines

### defaultGridStroke

- **Type**: `StrokeData`,
- **Usage**: default grid line stroke.

### rects

- **Type**: `RectArea[]`,
- **Usage**: rect area.

### defaultRectStroke

- **Type**: `StrokeData`,
- **Usage**: default rect border stroke.

### texts

- **Type**: `FlowTextType[]`,
- **Usage**: texts.

### defaultTextFont

- **Type**: `Object`,
- **Usage**: default text font.

### dis

- **Type**: `number`,
- **Usage**: distance between line break points and node.

### render

- **Type**: `(node: FlowNode) => React.ReactElement`,
- **Usage**: slot for grid.
