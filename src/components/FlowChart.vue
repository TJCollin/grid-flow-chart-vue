<template>
  <div class="wrapper" ref="wrapper">
    <div
      class="flow-node"
      v-for="node in nodes"
      :style="
        position(node, margin, colWidth, rowHeight, nodeWidth, nodeHeight)
      "
      :key="node.id"
    >
      <slot name="node" :node="node"> </slot>
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  PropType,
  watchEffect,
  toRefs,
} from "vue";
import {
  FlowNode,
  Line,
  NodeMargin,
  Grid,
  RectArea,
  FlowTextType,
} from "./types";
import { drawLines, drawRects, drawGrid, drawTexts, position } from "./utils";

import { StrokeData, SVG } from "@svgdotjs/svg.js";
const cols: any[][] = [];
const rows: any[][] = [];

export default defineComponent({
  name: "FlowChart",
  props: {
    nodes: {
      type: Array as PropType<FlowNode[]>,
      required: true,
    },
    lines: {
      type: Array as PropType<Line[]>,
      required: true,
    },
    hoverLineColor: {
      required: false,
      type: String,
      default: "#000",
    },
    defaultLineStroke: {
      required: false,
      type: Object as PropType<StrokeData>,
      default: () => {
        return { width: 1, color: "#000" };
      },
    },
    colWidth: {
      type: Number,
      required: false,
      default: 150,
    },
    rowHeight: {
      type: Number,
      required: false,
      default: 100,
    },
    nodeWidth: {
      type: Number,
      required: false,
      default: 120,
    },
    nodeHeight: {
      type: Number,
      required: false,
      default: 80,
    },
    margin: {
      type: Object as PropType<NodeMargin>,
      required: false,
      default: () => {
        return { x: 0, y: 0 };
      },
    },
    grid: {
      type: Object as PropType<Grid>,
      required: false,
    },
    defaultGridStroke: {
      required: false,
      type: Object as PropType<StrokeData>,
      default: () => {
        return { dasharray: "5,5", width: 1, color: "#999" };
      },
    },
    rects: {
      type: Array as PropType<Array<RectArea>>,
      required: false,
    },
    defaultRectStroke: {
      required: false,
      type: Object as PropType<StrokeData>,
      default: () => {
        return { width: 1, color: "#000", dasharray: "5,5" };
      },
    },
    texts: {
      type: Array as PropType<Array<FlowTextType>>,
      required: false,
    },
    defaultTextFont: {
      required: false,
      type: Object,
      default: () => {
        return { color: "#000" };
      },
    },
    dis: {
      type: Number,
      required: false,
      default: 10,
    },
  },

  setup(props) {
    const {
      nodes,
      lines,
      defaultLineStroke,
      colWidth,
      rowHeight,
      nodeWidth,
      nodeHeight,
      margin,
      grid,
      rects,
      defaultRectStroke,
      texts,
      defaultTextFont,
      dis,
      hoverLineColor,
      defaultGridStroke,
    } = toRefs(props);

    const arrowSize = 5;

    // 收集每一行节点数，节点按列排序
    const tempNodes = [...nodes.value];
    tempNodes.sort((a, b) => a.col - b.col);
    tempNodes.forEach(({ id, row }) => {
      if (typeof rows[row] === "undefined") {
        rows[row] = [];
      }
      rows[row].push(id);
    });

    // 收集每一列的节点数，节点间按行排列
    tempNodes.sort((a, b) => a.col - b.col);
    tempNodes.forEach(({ id, col }) => {
      if (typeof cols[col] === "undefined") {
        cols[col] = [];
      }
      cols[col].push(id);
    });

    const wrapper = ref<HTMLElement | null>(null);

    onMounted(() => {
      const typedWrapper = wrapper.value as HTMLElement;
      const wrapperWidth = typedWrapper.offsetWidth;
      const wrapperHeight = typedWrapper.offsetHeight;

      const draw = SVG()
        .addTo(typedWrapper)
        .size("100%", "100%");

      watchEffect(() => {
        draw.clear();

        // 画矩形
        if (rects?.value && rects.value.length > 0) {
          drawRects(
            draw,
            rects.value || [],
            wrapperWidth,
            wrapperHeight,
            colWidth.value,
            rowHeight.value,
            defaultRectStroke.value
          );
        }

        // 画网格线
        if (grid?.value) {
          drawGrid(
            draw,
            wrapperWidth,
            wrapperHeight,
            grid.value,
            colWidth.value,
            rowHeight.value,
            defaultGridStroke.value
          );
        }

        // 画文字
        if (texts?.value) {
          drawTexts(
            draw,
            texts.value || [],
            defaultTextFont,
            defaultGridStroke.value,
            rowHeight.value,
            colWidth.value
          );
        }

        // 画连线
        drawLines(
          draw,
          lines.value,
          arrowSize,
          hoverLineColor.value,
          defaultLineStroke.value,
          nodes.value,
          dis.value,
          cols,
          rows,
          colWidth.value,
          rowHeight.value,
          nodeHeight.value,
          nodeWidth.value,
          margin.value
        );
      });
    });

    return { position, wrapper };
  },
});
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  box-sizing: border-box;
}

.flow-node {
  position: absolute;
  // z-index: 100;
  left: 0;
  top: 0;
}
</style>
