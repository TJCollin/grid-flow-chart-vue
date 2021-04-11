import { Marker, Path, StrokeData, Svg } from "@svgdotjs/svg.js";
import {
  FlowNode,
  Line,
  NodeMargin,
  Direction,
  FlowTextType,
  Grid,
  RectArea,
} from "./types";

/**
 * 找出节点上的连接中点
 * @param node
 * @param type
 * @param direction
 * @param colWidth
 * @param rowHeight
 * @param nodeHeight
 * @param nodeWidth
 * @param margin
 * @param arrowZoom
 * @returns
 */
export const nodeMiddle = (
  node: FlowNode,
  type: number,
  direction: Direction,
  colWidth: number,
  rowHeight: number,
  nodeHeight: number,
  nodeWidth: number,
  margin: NodeMargin,
  arrowZoom: number
): number[] => {
  let x: number, y: number;
  switch (direction) {
    case "left":
      x = node.col * colWidth;
      if (type) {
        x -= arrowZoom;
      }
      return [x + margin.x, node.row * rowHeight + nodeHeight / 2 + margin.y];
    case "top":
      y = node.row * rowHeight;
      if (type) {
        y = y - arrowZoom;
      }
      return [node.col * colWidth + nodeWidth / 2 + margin.x, y + margin.y];
    case "bottom":
      y = node.row * rowHeight + nodeHeight;
      if (type) {
        y = y + arrowZoom;
      }
      return [node.col * colWidth + nodeWidth / 2 + margin.x, y + margin.y];
    case "right":
      x = node.col * colWidth + nodeWidth;
      // type 1 代表该节点为连接线终点
      if (type) {
        x += arrowZoom;
      }
      return [x + margin.x, node.row * rowHeight + nodeHeight / 2 + margin.y];
  }
};

/**
 * 根据两个节点的所在行列分别给出两个节点上连接点位置
 * @param n1
 * @param n2
 * @returns number[]
 */
const points = (
  n1: FlowNode,
  n2: FlowNode,
  colWidth: number,
  rowHeight: number,
  nodeHeight: number,
  nodeWidth: number,
  margin: NodeMargin,
  arrowZoom: number
) => {
  if (n2.col > n1.col) {
    return [
      nodeMiddle(
        n1,
        0,
        "right",
        colWidth,
        rowHeight,
        nodeHeight,
        nodeWidth,
        margin,
        arrowZoom
      ),
      nodeMiddle(
        n2,
        1,
        "left",
        colWidth,
        rowHeight,
        nodeHeight,
        nodeWidth,
        margin,
        arrowZoom
      ),
    ];
  } else if (n2.col < n1.col) {
    return [
      nodeMiddle(
        n1,
        0,
        "left",
        colWidth,
        rowHeight,
        nodeHeight,
        nodeWidth,
        margin,
        arrowZoom
      ),
      nodeMiddle(
        n2,
        1,
        "right",
        colWidth,
        rowHeight,
        nodeHeight,
        nodeWidth,
        margin,
        arrowZoom
      ),
    ];
  } else if (n2.row > n1.row) {
    return [
      nodeMiddle(
        n1,
        0,
        "bottom",
        colWidth,
        rowHeight,
        nodeHeight,
        nodeWidth,
        margin,
        arrowZoom
      ),
      nodeMiddle(
        n2,
        1,
        "top",
        colWidth,
        rowHeight,
        nodeHeight,
        nodeWidth,
        margin,
        arrowZoom
      ),
    ];
  } else {
    return [
      nodeMiddle(
        n1,
        0,
        "top",
        colWidth,
        rowHeight,
        nodeHeight,
        nodeWidth,
        margin,
        arrowZoom
      ),
      nodeMiddle(
        n2,
        1,
        "bottom",
        colWidth,
        rowHeight,
        nodeHeight,
        nodeWidth,
        margin,
        arrowZoom
      ),
    ];
  }
};

/**
 * 找出转折点，将其转为圆弧
 * @param points
 * @returns
 */
export const drawLineWithArc = (points: number[][]): string => {
  const len = points.length;
  if (len === 2) {
    return `M${points[0].join(" ")} L${points[1].join(" ")}`;
  } else if (len > 2) {
    let res = `M${points[0].join(" ")}`;
    for (let i = 1; i < len - 1; i++) {
      const [[x1, y1], [x2, y2], [x3, y3]] = [
        points[i - 1],
        points[i],
        points[i + 1],
      ];
      // 相连两点之间必在同一直线上，abs(x-x0) + abs(y-y0) 即为两点之间的直线距离
      const offset1 = Math.abs(x2 - x1) + Math.abs(y2 - y1);
      const offset2 = Math.abs(x3 - x2) + Math.abs(y3 - y2);
      const radius =
        Math.min(offset1, offset2) * 0.5 > 15
          ? 15
          : Math.min(offset1, offset2) * 0.5;
      // 同一竖线上
      if (x2 === x1) {
        // 当前点相对前节点下侧
        if (y2 > y1) {
          res += `L${x2} ${y2 - radius}`;

          // 下节点相对当前点右侧，逆时针圆弧
          if (x3 > x2) {
            res += `A${radius} ${radius} 0 0 0 ${x2 + radius} ${y2}`;
          }
          // 左侧，顺时针圆弧
          else {
            res += `A${radius} ${radius} 0 0 1 ${x2 - radius} ${y2}`;
          }
        } else {
          // 上侧
          res += `L${x2} ${y2 + radius}`;
          // 下节点相对当前点右侧，顺时针圆弧
          if (x3 > x2) {
            res += `A${radius} ${radius} 0 0 1 ${x2 + radius} ${y2}`;
          }
          // 左侧，逆时针圆弧
          else {
            res += `A${radius} ${radius} 0 0 0 ${x2 - radius} ${y2}`;
          }
        }
      } else {
        // 同一横线上
        // 右侧
        if (x2 > x1) {
          res += `L${x2 - radius} ${y2}`;
          // 下侧，顺时针
          if (y3 > y2) {
            res += `A${radius} ${radius} 0 0 1 ${x2} ${y2 + radius}`;
          } else {
            // 下侧，逆时针
            res += `A${radius} ${radius} 0 0 0 ${x2} ${y2 - radius}`;
          }
        } else {
          // 左侧
          res += `L${x2 + radius} ${y2}`;
          // 下侧，逆时针
          if (y3 > y2) {
            res += `A${radius} ${radius} 0 0 0 ${x2} ${y2 + radius}`;
          } else {
            // 下侧，顺时针
            res += `A${radius} ${radius} 0 0 1 ${x2} ${y2 - radius}`;
          }
        }
      }
    }
    res += `L${points[len - 1].join(" ")}`;
    return res;
  }
  return "";
};

/**
 * 根据开始节点和结束节点给出中间的折线连接节点
 * @param line
 * @param nodes
 * @param dis
 * @param cols
 * @param rows
 * @param colWidth
 * @param rowHeight
 * @param nodeHeight
 * @param nodeWidth
 * @param margin
 * @param arrowZoom
 * @returns
 */
export const linePath = (
  line: Line,
  nodes: FlowNode[],
  dis: number,
  cols: unknown[][],
  rows: unknown[][],
  colWidth: number,
  rowHeight: number,
  nodeHeight: number,
  nodeWidth: number,
  margin: NodeMargin,
  arrowZoom: number
): string => {
  const sourceNode = nodes.find((item) => item.id === line.source);
  const targetNode = nodes.find((item) => item.id === line.target);

  if (sourceNode && targetNode) {
    const [[startX, startY], [endX, endY]] = points(
      sourceNode,
      targetNode,
      colWidth,
      rowHeight,
      nodeHeight,
      nodeWidth,
      margin,
      arrowZoom
    );

    // 连接点距离
    let distance = dis;
    let col = sourceNode.col;
    let row = sourceNode.row;
    let endRow = targetNode.row;
    // 位于同一列处理
    if (startX === endX) {
      const sourceIndex = cols[col].findIndex((val) => val === sourceNode.id);
      // 起点和终点在同一列且相邻
      if (
        targetNode.id === cols[col][sourceIndex + 1] ||
        targetNode.id === cols[col][sourceIndex - 1]
      ) {
        return drawLineWithArc([
          [startX, startY],
          [endX, endY],
        ]);
      }
      // 起点和终点在同一列不相邻
      // 位于第一列，则不能让连接线通过边界线
      if (col === 0) {
        col = 1;
      }
      if (endY < startY) {
        distance = -dis;
      }
      return drawLineWithArc([
        [startX, startY],
        [startX, startY + distance],
        [col * colWidth, startY + distance],
        [col * colWidth, endY - distance],
        [endX, endY - distance],
        [endX, endY],
      ]);
    }
    // 位于同一行处理
    if (startY === endY) {
      const sourceIndex = rows[row].findIndex((val) => val === sourceNode.id);
      // 位于同一行且相邻
      if (
        targetNode.id === rows[row][sourceIndex + 1] ||
        targetNode.id === rows[row][sourceIndex - 1]
      ) {
        // return [[startX, startY], [endX, endY]]
        return drawLineWithArc([
          [startX, startY],
          [endX, endY],
        ]);
      }
      // 位于同一行不相邻
      // 位于第一行处理
      if (row === 0) {
        row = 1;
      }
      if (endX < startX) {
        distance = -dis;
      }
      // return [[startX, startY], [startX + distance, startY], [startX + distance, row * rowHeight], [endX - distance, row * rowHeight], [endX - distance, endY], [endX, endY]]
      return drawLineWithArc([
        [startX, startY],
        [startX + distance, startY],
        [startX + distance, row * rowHeight],
        [endX - distance, row * rowHeight],
        [endX - distance, endY],
        [endX, endY],
      ]);
    }

    // 不在同一行也不在同一列
    if (endX < startX) {
      distance = -dis;
    }
    // 如果两者在相邻列
    if (Math.abs(targetNode.col - sourceNode.col) === 1) {
      return drawLineWithArc([
        [startX, startY],
        [startX + distance, startY],
        [startX + distance, endY],
        [endX, endY],
      ]);
    }
    // 如果不在相邻列
    if (endY < startY) {
      endRow += 1;
    }
    return drawLineWithArc([
      [startX, startY],
      [startX + distance, startY],
      [startX + distance, endRow * rowHeight],
      [endX - distance, endRow * rowHeight],
      [endX - distance, endY],
      [endX, endY],
    ]);
  }
  return "";
};

/**
 * 给出每个节点的绝对位置
 * @param item
 * @param margin
 * @param colWidth
 * @param rowHeight
 * @param nodeWidth
 * @param nodeHeight
 * @returns
 */
export const position = (
  item: FlowNode,
  margin: NodeMargin,
  colWidth: number,
  rowHeight: number,
  nodeWidth: number,
  nodeHeight: number
) => {
  return {
    left: margin.x + item.col * colWidth + "px",
    top: margin.y + item.row * rowHeight + "px",
    width: nodeWidth + "px",
    height: nodeHeight + "px",
  };
};

/**
 * 根据颜色改变连接线及箭头颜色
 * @param path
 * @param arrow
 * @param color
 */
export const changeLineColor = (path: Path, arrow: Marker, color: string) => {
  path.stroke({ color: color });
  path.marker("end", arrow);
};

/**
 * 画连接线
 * @param draw
 * @param lines
 * @param arrowSize
 * @param hoverLineColor
 * @param defaultLineStroke
 * @param nodes
 * @param dis
 * @param cols
 * @param rows
 * @param colWidth
 * @param rowHeight
 * @param nodeHeight
 * @param nodeWidth
 * @param margin
 */
export const drawLines = (
  draw: Svg,
  lines: Line[],
  arrowSize: number,
  hoverLineColor: string,
  defaultLineStroke: StrokeData,
  nodes: FlowNode[],
  dis: number,
  cols: unknown[][],
  rows: unknown[][],
  colWidth: number,
  rowHeight: number,
  nodeHeight: number,
  nodeWidth: number,
  margin: NodeMargin
) => {
  // 箭头经过连接线放大后的大小
  const arrowZoom = (arrowSize * (defaultLineStroke.width as number)) / 2;

  // 连接线的箭头
  const arrow = draw.marker(arrowSize, arrowSize, function(add) {
    add.path(`M 0 0 L ${arrowSize} ${arrowSize / 2} L 0 ${arrowSize} z`);
  });

  const hoverArrow = draw
    .marker(arrowSize, arrowSize, function(add) {
      add.path(`M 0 0 L ${arrowSize} ${arrowSize / 2} L 0 ${arrowSize} z`);
    })
    .fill(hoverLineColor);

  // 连接线
  lines.forEach((line) => {
    const stroke = {
      ...defaultLineStroke,
      color: line.color || defaultLineStroke.color,
    };
    const computedColor = stroke.color as string;
    const pathes = linePath(
      line,
      nodes,
      dis,
      cols,
      rows,
      colWidth,
      rowHeight,
      nodeHeight,
      nodeWidth,
      margin,
      arrowZoom
    );
    const path = draw
      .path(pathes)
      .fill("none")
      .stroke(stroke)
      .attr({
        "stroke-linecap": "butt",
      });
    path.marker("end", arrow.fill(computedColor));
    path.mouseover((event: MouseEvent) => {
      changeLineColor(path, hoverArrow, hoverLineColor);
      event.stopPropagation();
      path.addTo(draw);
    });
    path.mouseout((event: MouseEvent) => {
      event.stopPropagation();
      changeLineColor(path, arrow, computedColor);
    });
  });
};

/**
 * 画矩形
 * @param draw
 * @param rects
 * @param wrapperWidth
 * @param wrapperHeight
 * @param colWidth
 * @param rowHeight
 * @param defaultRectStroke
 */
export const drawRects = (
  draw: Svg,
  rects: RectArea[],
  wrapperWidth: number,
  wrapperHeight: number,
  colWidth: number,
  rowHeight: number,
  defaultRectStroke: StrokeData
) => {
  rects.forEach((rect) => {
    let startX = rect.startCol * colWidth;
    let startY = rect.startRow * rowHeight;
    let height = (rect.endRow - rect.startRow) * rowHeight;
    let width = (rect.endCol - rect.startCol) * colWidth;
    // 处理边界情况，不允许和 Svg 四周重合
    if (startX === 0) {
      startX += 1;
    }
    if (startY === 0) {
      startY += 1;
    }
    if (startX + width === wrapperWidth) {
      width -= 1;
    }
    if (startY + height === wrapperHeight) {
      height -= 1;
    }

    draw
      .rect(width, height)
      .stroke(defaultRectStroke)
      .fill("none")
      .move(startX, startY)
      .radius(10)
      .attr({ "shape-rendering": "crispEdges" });
  });
};

/**
 * 画网格线
 * @param draw
 * @param wrapperWidth
 * @param wrapperHeight
 * @param grid
 * @param colWidth
 * @param rowHeight
 * @param defaultGridStroke
 */
export const drawGrid = (
  draw: Svg,
  wrapperWidth: number,
  wrapperHeight: number,
  grid: Grid,
  colWidth: number,
  rowHeight: number,
  defaultGridStroke: StrokeData
) => {
  if (grid && grid.col) {
    if (typeof grid.col === "string") {
      for (let i = 0; i < wrapperWidth / colWidth; i++) {
        draw
          .line(i * colWidth, 0, i * colWidth, wrapperHeight)
          .stroke(defaultGridStroke)
          .attr({ "shape-rendering": "crispEdges" });
      }
    } else {
      grid.col.forEach((col) => {
        draw
          .line(col * colWidth, 0, col * colWidth, wrapperHeight)
          .stroke(defaultGridStroke)
          .attr({ "shape-rendering": "crispEdges" });
      });
    }
  }
  if (grid && grid.row) {
    if (typeof grid.row === "string") {
      for (let i = 0; i < wrapperHeight / rowHeight; i++) {
        draw
          .line(0, i * rowHeight, wrapperWidth, i * rowHeight)
          .stroke(defaultGridStroke)
          .attr({ "shape-rendering": "crispEdges" });
      }
    } else {
      grid.row.forEach((row) => {
        draw
          .line(0, row * rowHeight, wrapperWidth, row * rowHeight)
          .stroke(defaultGridStroke)
          .attr({ "shape-rendering": "crispEdges" });
      });
    }
  }
};

/**
 * 给流程图添加文字
 * @param draw
 * @param texts
 * @param defaultTextFont
 * @param defaultGridStroke
 * @param rowHeight
 * @param colWidth
 */
export const drawTexts = (
  draw: Svg,
  texts: FlowTextType[],
  defaultTextFont: object,
  defaultGridStroke: StrokeData,
  rowHeight: number,
  colWidth: number
) => {
  texts.forEach((text) => {
    const {
      rowStart = 0,
      rowEnd = 0,
      colStart = 0,
      colEnd = 0,
      rotate = false,
      rowAlign = "middle",
      colAlign = "middle",
      content,
      font = defaultTextFont,
    } = text;

    const textContent = draw
      .text(content)
      .font({ ...defaultTextFont, ...font });
    const bbox = textContent.bbox();
    const width = bbox.width;
    const height = bbox.height;
    let cx = 0;
    let cy = 0;
    const gridLineWidth = defaultGridStroke.width || 0;
    if (rowStart < rowEnd) {
      if (colAlign === "start") {
        cy = rowStart * rowHeight + height / 2 + gridLineWidth;
      } else if (colAlign === "middle") {
        cy = ((rowStart + rowEnd) * rowHeight) / 2;
      } else {
        cy = rowEnd * rowHeight - height / 2 - gridLineWidth;
      }
    } else if (rowStart === rowEnd) {
      cy = height / 2 + gridLineWidth;
    }
    if (colStart < colEnd) {
      if (rowAlign === "start") {
        cx = colStart * colWidth + width / 2 + gridLineWidth;
      } else if (rowAlign === "middle") {
        cx = ((colStart + colEnd) * colWidth) / 2;
      } else {
        cx = colEnd * colWidth - width / 2 - gridLineWidth;
      }
    } else if (colStart < colEnd) {
      cx = width / 2 + gridLineWidth;
    }
    if (rotate) {
      const xDiff = width / 2 - height / 2;
      const yDiff = height / 2 - width / 2;
      if (rowAlign === "start") {
        cx -= xDiff;
      } else if (rowAlign === "end") {
        cx += xDiff;
      }
      if (colAlign === "start") {
        cy -= yDiff;
      } else if (colAlign === "end") {
        cy += yDiff;
      }
    }
    textContent.cx(cx).cy(cy);
    if (rotate) {
      textContent.rotate(90);
    }
  });
};
