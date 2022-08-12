import Vue from "vue";
import SvgIcon from "@/components/SvgIcon";
Vue.component("svg-icon", SvgIcon);

/**
 * './svg' 代表要查找的文件路径
 * false 代表是否查找子目录
 * /\.svg$/ 代表要匹配文件的正则
 *
 */
const svg = require.context("./svg", false, /\.svg$/);
const requireAll = (requireContext) =>
  requireContext.keys().map(requireContext);
requireAll(svg);