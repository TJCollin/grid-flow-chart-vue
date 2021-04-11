<template>
  <div class="flow-wrapper">
    <button @click="btnClk">ss</button>
    <div class="flow-demo">
      <FlowChart
        :nodes="nodes"
        :lines="lines"
        :grid="grid"
        :margin="margin"
        :rowHeight="90"
        :colWidth="180"
        :texts="texts"
        :dis="15"
        :nodeHeight="50"
        hoverLineColor="red"
        :rects="rects"
        :defaultLineStroke="lineStroke"
      >
        <template v-slot:node="slotScope">
          <div class="my-card">
            <div>
              {{ slotScope.node.text }}
            </div>
          </div>
        </template>
      </FlowChart>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import FlowChart from "./components";

export default defineComponent({
  name: "App",
  components: {
    FlowChart,
  },
  setup() {
    const nodes = reactive([
      {
        id: 1,
        col: 0,
        row: 0,
        text: "流程一",
      },

      {
        id: 2,
        col: 0,
        row: 1,
        text: "流程二",
      },
      {
        id: 3,
        col: 1,
        row: 0,
        text: "流程三",
      },
      {
        id: 4,
        col: 1,
        row: 1,
        text: "流程四",
      },
      {
        id: 5,
        col: 1,
        row: 2,
        text: "流程五",
      },
      {
        id: 6,
        col: 2,
        row: 0,
        text: "流程六",
      },
      {
        id: 7,
        col: 2,
        row: 1,
        text: "流程七",
      },
      {
        id: 8,
        col: 2,
        row: 2,
        text: "流程八",
      },

      {
        id: 13,
        col: 3,
        row: 0,
        text: "流程九",
      },
      {
        id: 14,
        col: 3,
        row: 1,
        text: "流程十",
      },
      {
        id: 15,
        col: 3,
        row: 2,
        text: "流程十一",
      },
      {
        id: 16,
        col: 3,
        row: 3,
        text: "流程十二",
      },
      {
        id: 17,
        col: 3,
        row: 4,
        text: "流程十三",
      },
      {
        id: 18,
        col: 4,
        row: 0,
        text: "流程十四",
      },
      {
        id: 19,
        col: 4,
        row: 1,
        text: "流程十五",
      },
      {
        id: 20,
        col: 4,
        row: 2,
        text: "流程十六",
      },
      {
        id: 21,
        col: 5,
        row: 0,
        text: "流程十七",
      },
      {
        id: 22,
        col: 5,
        row: 1,
        text: "流程十八",
      },
      {
        id: 23,
        col: 5,
        row: 2,
        text: "流程十九",
      },
      {
        id: 24,
        col: 5,
        row: 3,
        text: "流程二十",
      },
      {
        id: 25,
        col: 6,
        row: 0,
        text: "流程二十一",
      },
      {
        id: 26,
        col: 6,
        row: 1,
        text: "流程二十二",
      },
    ]);
    const lines = reactive([
      {
        source: 2,
        target: 3,
      },
      {
        source: 3,
        target: 4,
      },
      {
        source: 4,
        target: 5,
      },
      {
        source: 5,
        target: 6,
      },
      {
        source: 6,
        target: 7,
      },
      {
        source: 7,
        target: 8,
      },
      {
        source: 8,
        target: 13,
      },
      {
        source: 13,
        target: 14,
      },
      {
        source: 14,
        target: 15,
      },
      {
        source: 15,
        target: 16,
      },
      {
        source: 16,
        target: 18,
      },
      {
        source: 17,
        target: 18,
      },
      {
        source: 8,
        target: 15,
      },
      {
        source: 18,
        target: 19,
      },
      {
        source: 19,
        target: 20,
      },
      {
        source: 20,
        target: 21,
      },
      {
        source: 21,
        target: 22,
      },
      {
        source: 21,
        target: 23,
      },
      {
        source: 21,
        target: 24,
      },
      {
        source: 21,
        target: 25,
      },
      {
        source: 24,
        target: 25,
      },
      {
        source: 22,
        target: 25,
      },
      {
        source: 23,
        target: 25,
      },
      {
        source: 25,
        target: 26,
      },
    ]);

    const grid = reactive({
      row: [1],
      col: [1, 2, 3, 4, 5, 7],
    });
    const btnClk = () => {
      grid.row = [1, 2];
      // console.log("clk");
      // console.log(lines);
      // lines.push({
      //   source: 1,
      //   target: 3,
      // });
    };
    const margin = {
      x: 20,
      y: 30,
    };
    const texts = [
      {
        colStart: 0,
        colEnd: 1,
        content: "阶段一",
      },
      {
        colStart: 1,
        colEnd: 2,
        content: "阶段二",
      },
      {
        colStart: 2,
        colEnd: 3,
        content: "阶段三",
      },
      {
        colStart: 3,
        colEnd: 4,
        content: "阶段四",
      },
      {
        colStart: 4,
        colEnd: 5,
        content: "阶段五",
      },
      {
        colStart: 5,
        colEnd: 7,
        content: "阶段六",
      },
    ];
    const rects = [
      {
        startCol: 0,
        endCol: 0.95,
        startRow: 0,
        endRow: 2,
      },
      {
        startCol: 1,
        endCol: 1.95,
        startRow: 0,
        endRow: 3,
      },
    ];
    const lineStroke = {
      width: 2,
      color: "#1976D2",
    };

    return {
      btnClk,
      nodes,
      lines,
      grid,
      margin,
      texts,
      rects,
      lineStroke,
    };
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.my-card {
  border: 1px solid #000;
  border-radius: 5px;
}
.ellipsis {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-wrap: break-word;
}
.flow-wrapper {
  flex: 1;
  overflow: auto;
}
.flow-demo {
  width: 1200px;
  height: 450px;
  position: relative;
  padding: 10px 5px;
  .my-card {
    width: 100%;
    box-sizing: border-box;
    height: 100%;
    text-align: center;
    &:hover {
      box-shadow: 0 1px 8px rgba(0, 0, 0, 0.2), 0 3px 4px rgba(0, 0, 0, 0.14),
        0 3px 3px -2px rgba(0, 0, 0, 0.12);
    }
  }
}
</style>
