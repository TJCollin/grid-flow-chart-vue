/*
 * @Author: collin
 * @Date: 2021-01-15 19:10:05
 * @Gitee: https://gitee.com/CollinZhang
 * @LastEditors: collin
 * @LastEditTime: 2021-01-17 16:17:02
 */
import { reactive } from "vue";
import { mount } from "@vue/test-utils";
// import { Grid } from "../../src/components/FlowChart";
import FlowChart from "@/components/FlowChart.vue";

const nodes = [
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
];
const lines = reactive([
  {
    source: 1,
    target: 2,
  },
]);
const rowHeight = 90;
const colWidth = 180;
const nodeHeight = 50;
const grid: any = reactive({
  row: [],
  col: [],
});
const rects: any = reactive([]);

describe("FlowChart.vue", () => {
  const wrapper = mount(FlowChart, {
    props: {
      nodes,
      lines,
      rowHeight,
      colWidth,
      nodeHeight,
      grid,
      rects,
    },
  });
  it("renders nodes & lines when passed", () => {
    const nodeArr = wrapper.findAll(".flow-node");
    const marker = wrapper.findAll("marker");
    const pathArr = wrapper.findAll("path");
    expect(nodeArr.length).toBe(2);
    expect(marker.length).toBe(2);
    expect(pathArr.length).toBe(3);
  });
  it("render grid when passed", async () => {
    grid.row.push(1);
    grid.col.push(1);
    await wrapper.setProps({});
    const lineArr = wrapper.findAll("line");
    expect(lineArr.length).toBe(2);
  });
  it("render rects when passed", async () => {
    rects.push({
      startCol: 0,
      endCol: 0.95,
      startRow: 0,
      endRow: 2,
    });
    await wrapper.setProps({});
    const rectArr = wrapper.findAll("rect");
    expect(rectArr.length).toBe(1);
  });
});
