<template>
  <div class="p-4">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">打印机列表</h1>
      <div class="flex items-center gap-2">
        <el-button type="primary" plain @click="paperDialogVisible = true"
          >增加纸张</el-button>
        <el-button type="primary" plain @click="AddAction"
          >添加打印机</el-button>
        <el-button type="primary" @click="searchDialogVisible = true">查询订单</el-button>
        <el-button type="primary" @click="getPrinterListData">全部打印机</el-button>
      </div>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="model" label="类型" />
      <el-table-column prop="is_active" label="状态">
        <template #default="scope">
          <el-tag :type="scope.row.is_online ? 'success' : 'danger'">
            {{ scope.row.is_online ? "在线" : "离线" }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="location" label="位置" />
      <el-table-column prop="paper_count" label="纸张余量">
        <template #default="scope">
          {{ scope.row.latest_snapshot.paper_remaining }}
        </template>
      </el-table-column>
      <el-table-column prop="updated_at" label="更新时间">
        <template #default="scope">
          {{ formatTime(scope.row.updated_at) }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row)">
            编辑
          </el-button>
          <el-button
            type="danger"
            size="small"
            @click="handleDelete(scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
      <!-- <el-table-column label="详情">
        <template #default="scope">
          <el-button type="primary" size="small" plain @click="handleDetail(scope.row)">
            详情
          </el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <el-dialog
      v-model="dialogVisible"
      :title="isEdit ? '编辑打印机' : '添加打印机'"
    >
      <el-form :model="form">
        <el-form-item label="名称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="类型">
          <el-input v-model="form.model" />
        </el-form-item>
        <el-form-item label="位置">
          <el-input v-model="form.location" />
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="form.is_active" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="ConfirmAction">确定</el-button>
      </template>
    </el-dialog>
    <el-dialog v-model="paperDialogVisible" title="增加纸张">
      <el-form :model="paperForm">
        <el-form-item label="终端" label-width="40px">
          <el-input type="number" v-model="paperForm.terminal" />
        </el-form-item>
        <el-form-item label="数量" label-width="40px">
          <el-input type="number" v-model="paperForm.added_count" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="paperDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="AddPaper">确定</el-button>
      </template>
    </el-dialog>
    <el-dialog v-model="searchDialogVisible" title="查询订单">
      <el-form :model="searchForm">
        <el-form-item label="终端" label-width="40px">
          <el-input type="number" v-model="searchForm.terminal" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="searchDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSearch">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {
  getPrinterList,
  addPrinter,
  updatePrinter,
  deletePrinter,
  getPrinterById,
  addPaper
} from "@/api/printer";
import { onMounted } from "vue";
import { ref } from "vue";
import { formatTime } from "@/utils/format";
import { v4 as uuidv4 } from "uuid";
import { ElMessage } from "element-plus";

const tableData = ref([]);
const dialogVisible = ref(false);
const paperDialogVisible = ref(false);
const searchDialogVisible = ref(false);
const isEdit = ref(false);
const form = ref({
  code: "",
  name: "",
  model: "",
  location: "",
  is_active: true
});
const paperForm = ref({
  terminal: 0,
  added_count: 0
});
const searchForm = ref({
  terminal: ""
});
const getPrinterListData = () => {
  getPrinterList().then(res => {
    tableData.value = res;
  });
};

const AddAction = () => {
  isEdit.value = false;
  dialogVisible.value = true;
};

const ConfirmAction = () => {
  if (isEdit.value) {
    handleUpdate();
  } else {
    handleAdd();
  }
};

const handleAdd = () => {
  if (!form.value.name || !form.value.model || !form.value.location) {
    return;
  }
  addPrinter({
    code: uuidv4(),
    name: form.value.name,
    model: form.value.model,
    location: form.value.location,
    is_active: form.value.is_active
  }).then(() => {
    dialogVisible.value = false;
    getPrinterListData();
    ElMessage.success("添加成功");
    form.value = {
      code: "",
      name: "",
      model: "",
      location: "",
      is_active: true
    };
  });
};

const handleUpdate = async () => {
  await updatePrinter(form.value.code, {
    name: form.value.name,
    model: form.value.model,
    location: form.value.location,
    is_active: form.value.is_active
  });
  getPrinterListData();
  dialogVisible.value = false;
  isEdit.value = false;
  ElMessage.success("更新成功");
  form.value = {
    code: "",
    name: "",
    model: "",
    location: "",
    is_active: true
  };
};

const handleEdit = (row: any) => {
  form.value = {
    code: row.id,
    name: row.name,
    model: row.model,
    location: row.location,
    is_active: row.is_active
  };
  dialogVisible.value = true;
  isEdit.value = true;
};

const handleDelete = (row: any) => {
  deletePrinter(row.id).then(() => {
    getPrinterListData();
    ElMessage.success("删除成功");
  });
};

const AddPaper = () => {
  addPaper({
    terminal: paperForm.value.terminal,
    added_count: paperForm.value.added_count
  }).then(() => {
    ElMessage.success("增加纸张成功");
    paperDialogVisible.value = false;
    paperForm.value = {
      terminal: 0,
      added_count: 0
    };
  });
};

const handleSearch = () => {
  getPrinterById(searchForm.value.terminal).then(res => {
    tableData.value = [res];
    searchDialogVisible.value = false;
  });
};

onMounted(() => {
  getPrinterListData();
});
</script>

<style scoped lang="scss">
:deep(.el-dialog) {
  width: 378px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 26px;
  border-radius: 16px;
  .el-dialog__header {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    color: #333;
    padding-right: 0;
  }
  .el-dialog__body {
    width: 100%;
  }
  .el-form-item {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .el-form-item__label {
    font-weight: 600;
    color: #333;
  }
  .el-dialog__footer {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .el-button {
      width: 48%;
      height: 40px;
      border-radius: 20px;
    }
  }
}
</style>
