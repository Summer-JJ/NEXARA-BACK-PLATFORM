<template>
  <div>
    <div class="mb-4">
      <h1 class="text-2xl font-bold">反馈</h1>
    </div>
    <el-table :data="feedbackList" style="width: 100%">
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="message" label="内容" />
      <el-table-column prop="created_at" label="创建时间">
        <template #default="scope">
          {{ formatTime(scope.row.created_at) }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getFeedbackList } from "@/api/operation";
import { formatTime } from "@/utils/format";

const feedbackList = ref([]);

onMounted(() => {
  getFeedbackList().then(res => {
    feedbackList.value = res;
  });
});
</script>
