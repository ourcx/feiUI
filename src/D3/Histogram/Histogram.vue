<template>
  <div class="fei-Histogram">
  </div>
</template>


<script setup lang="ts">
import { select } from "d3-selection";
import { scaleLinear, type NumberValue } from "d3-scale";
import { axisBottom, axisLeft } from "d3-axis";
import { line } from "d3-shape";
import { min as d3Min, max as d3Max } from "d3-array";
import { ref, onMounted, watch, nextTick } from "vue";
import "d3-transition";



</script>
