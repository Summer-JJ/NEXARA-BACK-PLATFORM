<template>
  <div class="p-4">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">订单列表</h1>
      <div class="flex items-center gap-2">
        <el-button type="primary" plain @click="dialogVisible = true"
          >查询订单</el-button
        >
        <el-button type="primary" @click="getAllOrders">全部订单</el-button>
      </div>
    </div>
    <el-table :data="orderList" style="width: 100%">
      <el-table-column prop="id" label="ID" width="100" />
      <el-table-column label="任务类型" width="100">
        <template #default="scope">
          {{
            Array.from(
              new Set(
                scope.row.tasks?.map(
                  (task: any) => task.task_type.split("_")[0]
                )
              )
            ).join(", ")
          }}
        </template>
      </el-table-column>
      <el-table-column prop="terminal" label="终端" width="100" />
      <el-table-column prop="total_amount" label="金额" width="100" />
      <el-table-column prop="total_pages" label="页数" width="100" />
      <el-table-column prop="payment" label="支付单号" width="100" />
      <el-table-column prop="status" label="状态" width="120">
        <template #default="scope">
          <el-tag
            :type="scope.row.status === 'completed' ? 'success' : 'danger'"
          >
            {{ scope.row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="created_at" label="创建时间">
        <template #default="scope">
          {{ formatTime(scope.row.created_at) }}
        </template>
      </el-table-column>
      <el-table-column label="订单管理">
        <template #default="scope">
          <el-button
            type="primary"
            link
            @click="cleanupOrderFileAction(scope.row.id)"
            >清理文件</el-button
          >
          <el-button
            type="danger"
            link
            @click="markOrderFailedAction(scope.row.id)"
            >标记失败</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="dialogVisible" title="查询订单" width="50%">
      <el-form :model="form" label-width="120px">
        <el-form-item label="订单号">
          <el-input v-model="form.order_id" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSearch">查询</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
  getOperationOrders,
  getOperationOrderById,
  cleanupOrderFile,
  markOrderFailed
} from "@/api/operation";
import { formatTime } from "@/utils/format";
import { ElMessage } from "element-plus";

const orderList = ref([]);
const dialogVisible = ref(false);
const form = ref({
  order_id: ""
});

const handleSearch = () => {
  getOperationOrderById(form.value.order_id).then(res => {
    orderList.value = [res];
    dialogVisible.value = false;
  });
};

const getAllOrders = () => {
  getOperationOrders().then(res => {
    orderList.value = res.slice(0, 100);
  });
};

const cleanupOrderFileAction = (id: string | number) => {
  cleanupOrderFile(id)
    .then(res => {
      ElMessage.success("清理文件成功");
      getAllOrders();
    })
    .catch(err => {
      ElMessage.error(err.response?.data?.error);
    });
};

const markOrderFailedAction = (id: string | number) => {
  markOrderFailed(id)
    .then(res => {
      ElMessage.success("标记失败成功");
      getAllOrders();
    })
    .catch(err => {
      ElMessage.error(err.response?.data?.error);
    });
};

onMounted(() => {
  getAllOrders();
});
</script>
