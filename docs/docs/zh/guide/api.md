# API

Grid Flow Charts 相关属性。

### nodes

- **Type**: `FlowNode[]`.
- **Usage**: 节点。

### lines

- **Type**: `Line[]`.
- **Usage**: 连接线。

### hoverLineColor

- **Type**: `string`
- **Usage**: 连接线悬浮颜色。

### defaultLineStroke

- **Type**: `StrokeData`
- **Usage**: 连接线默认样式。

### colWidth

- **Type**: `number`
- **Usage**: 列宽。

### rowHeight

- **Type**: `number`
- **Usage**: 行高。

### nodeWidth

- **Type**: `number`
- **Usage**: 节点宽度。

### nodeHeight

- **Type**: `number`
- **Usage**: 节点高度。

### margin

- **Type**: `NodeMargin`
- **Usage**: 节点距离网格线左方(x)和上方(y)的距离

### grid

- **Type**: `Grid`
- **Usage**: 网格线。
- **Note**: row 代表横向网格线, column 代表纵向网格线。 'a' 代表所有网格线。

### defaultGridStroke

- **Type**: `StrokeData`,
- **Usage**: 网格线默认样式。

### rects

- **Type**: `RectArea[]`,
- **Usage**: 矩形框。

### defaultRectStroke

- **Type**: `StrokeData`,
- **Usage**: 矩形框默认样式。

### texts

- **Type**: `FlowTextType[]`,
- **Usage**: 文字。

### defaultTextFont

- **Type**: `Object`,
- **Usage**: 默认文字样式。

### dis

- **Type**: `number`,
- **Usage**: 转折点离节点的距离。

### render

- **Type**: `(node: FlowNode) => React.ReactElement`,
- **Usage**: render 插槽。
