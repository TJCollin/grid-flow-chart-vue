/*
 * @Author: collin
 * @Date: 2021-01-30 21:05:21
 * @Gitee: https://gitee.com/CollinZhang
 * @LastEditors: collin
 * @LastEditTime: 2021-01-30 23:16:27
 */
import FlowChart from "./FlowChart.vue";

(FlowChart as any).install = (Vue: any) => {
  Vue.component(FlowChart.name, FlowChart);
};

export default FlowChart;
