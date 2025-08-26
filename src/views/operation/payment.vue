<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">支付列表</h1>
      <div class="flex items-center gap-2">
        <el-button type="primary" @click="searchDialogVisible = true">查询支付</el-button>
        <el-button type="primary" @click="getPaymentListData">支付全列表</el-button>
      </div>
    </div>
    <el-table :data="paymentList" style="width: 100%">
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="terminal" label="终端" width="80" />
      <el-table-column prop="amount" label="金额" width="80" />
      <el-table-column prop="payment_method" label="支付方式" width="100" />
      <el-table-column prop="reference_id" label="支付单号" width="200" />
      <el-table-column prop="status" label="状态" width="150">
        <template #default="scope">
          <el-tag :type="scope.row.status === 'SUCCESS' ? 'success' : 'danger'">
            {{ scope.row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="created_at" label="创建时间">
        <template #default="scope">
          {{ formatTime(scope.row.created_at) }}
        </template> 
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="danger" size="small" @click="refundAction(scope.row.id)">退款</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="searchDialogVisible" title="查询支付">
      <el-form :model="form" label-width="120px">
        <el-form-item label="支付单号">
          <el-input v-model="form.payment_id" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="searchDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSearch">查询</el-button>
      </template>
    </el-dialog>
    <el-dialog v-model="refundDialogVisible" title="退款">
      <el-form :model="refundForm" label-width="120px">
        <el-form-item label="退款原因">
          <el-input v-model="refundForm.reason" />
        </el-form-item>
        <el-form-item label="情况描述">
          <el-input v-model="refundForm.description" type="textarea" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="refundDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleRefund">退款</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getPaymentList, getPaymentById, refundPayment } from "@/api/operation";
import { formatTime } from "@/utils/format";
import { ElMessage } from "element-plus";

// 退款有问题

const paymentList = ref([]);
const searchDialogVisible = ref(false);
const form = ref({
  payment_id: ""
});
const refundDialogVisible = ref(false);
const refundForm = ref({
  reason: "",
  description: ""
});
const refundId = ref(0);

const getPaymentListData = () => {
  getPaymentList().then(res => {
    paymentList.value = res;
  });
};

const handleSearch = () => {
  getPaymentById(form.value.payment_id).then(res => {
    paymentList.value = [res];
    searchDialogVisible.value = false;
  });
};
const handleRefund = () => {
  refundPayment(refundId.value, {
    reason: refundForm.value.reason,
    description: refundForm.value.description
  }).then(res => {
    console.log(res);
    ElMessage.success("退款成功");
  });
};
const refundAction = (id: number) => {
  refundId.value = id;
  refundDialogVisible.value = true;
};

onMounted(() => {
  getPaymentListData();
});
</script>