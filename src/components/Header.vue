<script lang="ts" setup>
import { Bell, Avatar } from "@element-plus/icons-vue";
</script>

<template>
  <div class="bsi-header">
    <div class="flex justify-between items-center h-full px-4">
      <div class="text-24px">IATA One Record Hackathon</div>
      <div>
        <el-space :size="20">
          <el-icon size="18"><Bell /></el-icon>
          <div class="flex items-center">
            <el-icon size="18"><Avatar /></el-icon>
            <span class="ml-2 test-24px">BSI</span>
          </div>
        </el-space>
      </div>
    </div>
  </div>
</template>

<style>
.bsi-header {
  min-width: 100%;
  height: 64px;
  box-shadow: 2px 0 10px #eee;
}
</style>
