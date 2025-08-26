<template>
  <div class="p-4">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">价格配置列表</h1>
      <div class="flex items-center gap-2">
        <el-button type="primary" plain @click="searchPricingById"
          >查询价格配置</el-button
        >
        <el-button type="primary" @click="getAllPricing">全部</el-button>
      </div>
    </div>
    <el-table :data="pricingList" style="width: 100%">
      <el-table-column prop="id" label="ID" width="60" />
      <el-table-column prop="task_type" label="任务类型" width="60" />
      <el-table-column prop="name" label="价格名称" width="100" />
      <el-table-column prop="description" label="描述" width="100" />
      <el-table-column prop="base_price" label="基础价格" width="100" />
      <el-table-column prop="multiplier1" label="倍率1" width="100" />
      <el-table-column prop="multiplier2" label="倍率2" width="100" />
      <el-table-column prop="additional_fee" label="附加费用" width="100" />
      <el-table-column prop="discount_percentage" label="折扣" width="100" />
      <el-table-column
        prop="color_print_multiplier"
        label="彩印倍率"
        width="100"
      />
      <el-table-column
        prop="double_sided_multiplier"
        label="双面印倍率"
        width="100"
      />
      <el-table-column prop="photo_paper_price" label="相纸价格" width="100" />
      <el-table-column
        prop="id_photo_sheet_price"
        label="ID相纸价格"
        width="100"
      />
      <el-table-column prop="retouch_fee" label="retouch费用" width="100" />
      <el-table-column prop="is_active" label="状态" width="100">
        <template #default="scope">
          <el-tag :type="scope.row.is_active ? 'success' : 'danger'">
            {{ scope.row.is_active ? "启用" : "禁用" }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="管理">
        <template #default="scope">
          <el-button
            type="primary"
            link
            @click="activatePricingAction(scope.row.id)"
            >激活</el-button
          >
          <el-button
            type="danger"
            link
            @click="deactivatePricingAction(scope.row.id)"
            >失活</el-button
          >
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" link @click="editPricingAction(scope.row.id)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            link
            @click="deletePricingAction(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" class="mt-4 w-full" @click="createPricingAction"
      >创建</el-button
    >
    <el-dialog v-model="dialogVisible" title="查询价格配置" width="50%">
      <el-form :model="searchPricing" label-width="60px">
        <el-form-item label="ID">
          <el-input v-model="searchPricing.id" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="searchPricingAction">查询</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {
  getPricingList,
  createPricing,
  getPricingById,
  updatePricing,
  deletePricing,
  activatePricing,
  deactivatePricing,
  patchPricing
} from "@/api/operation";
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";

const pricingList = ref([]);
const newPricing = ref({
  task_type: "",
  name: ""
});

const updatePricing = ref({
  task_type: "",
  name: ""
});

const searchPricing = ref({
  id: ""
});

const dialogVisible = ref(false);

const searchPricingById = () => {
  dialogVisible.value = true;
  searchPricing.value.id = "";
};

const searchPricingAction = () => {
  getPricingById(searchPricing.value.id).then(res => {
    pricingList.value = [res];
  });
};

const createPricingAction = () => {
  createPricing(newPricing).then(res => {
    pricingList.value = [...pricingList.value, res];
    ElMessage.success("创建成功");
    getAllPricing();
  });
};

const deletePricingAction = (id: string | number) => {
  deletePricing(id).then(res => {
    pricingList.value = pricingList.value.filter(item => item.id !== id);
    ElMessage.success("删除成功");
    getAllPricing();
  });
};

const editPricingAction = (id: string | number) => {
  patchPricing(id, updatePricing.value).then(res => {
    ElMessage.success("编辑成功");
    getAllPricing();
  });
};

const activatePricingAction = (id: string | number) => {
  activatePricing(id).then(res => {
    ElMessage.success("激活成功");
    getAllPricing();
  });
};

const deactivatePricingAction = (id: string | number) => {
  deactivatePricing(id).then(res => {
    ElMessage.success("失活成功");
    getAllPricing();
  });
};

const getAllPricing = () => {
  getPricingList().then(res => {
    pricingList.value = res;
  });
};

onMounted(() => {
  getAllPricing();
});
</script>
