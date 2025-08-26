<template>
  <div class="p-4">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">指标列表</h1>
      <div class="flex items-center gap-2">
        <el-button type="primary" plain @click="searchDialogVisible = true"
          >根据打印机ID查询</el-button
        >
        <el-button type="primary" plain @click="getLatestMetricsData"
          >获取最新指标</el-button
        >
        <el-button type="primary" @click="getMetricsListData"
          >全部指标</el-button
        >
      </div>
    </div>
    <el-table :data="tableData" style="width: 100%" height="600">
      <el-table-column prop="terminal" label="终端" width="60" />
      <el-table-column prop="printer_type" label="打印机类型" width="100" />
      <el-table-column prop="power_status" label="电源状态" width="100">
        <template #default="scope">
          <el-tag
            :type="scope.row.power_status === 'normal' ? 'success' : 'danger'"
          >
            {{ scope.row.power_status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="network_status" label="网络状态" width="100">
        <template #default="scope">
          <el-tag
            :type="scope.row.network_status === 'normal' ? 'success' : 'danger'"
          >
            {{ scope.row.network_status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="system_status" label="系统状态" width="100">
        <template #default="scope">
          <el-tag
            :type="scope.row.system_status === 'normal' ? 'success' : 'danger'"
          >
            {{ scope.row.system_status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="paper_jam_status" label="纸张堵塞状态" width="80">
        <template #default="scope">
          <el-tag
            :type="
              scope.row.paper_jam_status === 'normal' ? 'success' : 'danger'
            "
          >
            {{ scope.row.paper_jam_status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="printer_head_status"
        label="打印头状态"
        width="100"
      >
        <template #default="scope">
          <el-tag
            :type="
              scope.row.printer_head_status === 'normal' ? 'success' : 'danger'
            "
          >
            {{ scope.row.printer_head_status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="paper_tray_status" label="纸盘状态" width="100">
        <template #default="scope">
          <el-tag
            :type="
              scope.row.paper_tray_status === 'normal' ? 'success' : 'danger'
            "
          >
            {{ scope.row.paper_tray_status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="toner_level" label="墨粉余量" width="100" />
      <el-table-column prop="paper_remaining" label="纸张余量" width="100" />
      <el-table-column prop="error_status" label="错误状态" width="100" />
      <el-table-column prop="error_code" label="错误代码" width="100" />
      <el-table-column prop="print_quality" label="打印质量" width="100" />
      <el-table-column prop="print_density" label="打印密度" width="100" />
      <el-table-column prop="print_speed" label="打印速度" width="100" />
      <el-table-column
        prop="paper_path_status"
        label="纸张路径状态"
        width="100"
      >
        <template #default="scope">
          <el-tag
            :type="
              scope.row.paper_path_status === 'normal' ? 'success' : 'danger'
            "
          >
            {{ scope.row.paper_path_status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="scanner_status" label="扫描状态" width="100">
        <template #default="scope">
          <el-tag
            :type="scope.row.scanner_status === 'normal' ? 'success' : 'danger'"
          >
            {{ scope.row.scanner_status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="temperature" label="温度" width="100" />
      <el-table-column prop="waste_toner_level" label="废墨余量" width="100" />
      <el-table-column prop="service_status" label="服务状态" width="100">
        <template #default="scope">
          <el-tag
            :type="scope.row.service_status === 'normal' ? 'success' : 'danger'"
          >
            {{ scope.row.service_status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="print_queue" label="打印队列" width="100" />
      <el-table-column prop="storage_space" label="存储空间" width="100" />
      <el-table-column prop="memory_usage" label="内存使用" width="100" />
      <el-table-column prop="cpu_usage" label="CPU使用" width="100" />
      <el-table-column label="操作" width="100" fixed="right">
        <template #default="scope">
          <el-button
            type="primary"
            size="small"
            link
            @click="handleEdit(scope.row.id)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            size="small"
            link
            @click="handleDelete(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model="page"
      :page-size="page_size"
      :total="total"
      @current-change="getMetricsListData"
    />
    <el-dialog
      v-model="searchDialogVisible"
      title="根据打印机ID查询指标"
      width="500"
    >
      <el-form :model="form" label-width="60px">
        <el-form-item label="终端">
          <el-input v-model.number="form.terminal" placeholder="请输入终端" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="searchDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSearch">确定</el-button>
      </template>
    </el-dialog>
    <el-dialog v-model="editDialogVisible" title="编辑指标" width="500">
      <el-form :model="metricForm" label-width="60px">
        <el-form-item label="终端">
          <el-input v-model.number="editId" disabled />
        </el-form-item>
        <el-form-item label="打印机类型">
          <el-input
            v-model="metricForm.printer_type"
            placeholder="请输入打印机类型"
          />
        </el-form-item>
        <el-form-item label="电源状态">
          <el-input
            v-model="metricForm.power_status"
            placeholder="请输入电源状态"
          />
        </el-form-item>
        <el-form-item label="网络状态">
          <el-input
            v-model="metricForm.network_status"
            placeholder="请输入网络状态"
          />
        </el-form-item>
        <el-form-item label="系统状态">
          <el-input
            v-model="metricForm.system_status"
            placeholder="请输入系统状态"
          />
        </el-form-item>
        <el-form-item label="纸张堵塞状态">
          <el-input
            v-model="metricForm.paper_jam_status"
            placeholder="请输入纸张堵塞状态"
          />
        </el-form-item>
        <el-form-item label="打印头状态">
          <el-input
            v-model="metricForm.printer_head_status"
            placeholder="请输入打印头状态"
          />
        </el-form-item>
        <el-form-item label="纸盘状态">
          <el-input
            v-model="metricForm.paper_tray_status"
            placeholder="请输入纸盘状态"
          />
        </el-form-item>
        <el-form-item label="墨粉余量">
          <el-input
            v-model.number="metricForm.toner_level"
            placeholder="请输入墨粉余量"
          />
        </el-form-item>
        <el-form-item label="纸张余量">
          <el-input
            v-model.number="metricForm.paper_remaining"
            placeholder="请输入纸张余量"
          />
        </el-form-item>
        <el-form-item label="错误状态">
          <el-input
            v-model="metricForm.error_status"
            placeholder="请输入错误状态"
          />
        </el-form-item>
        <el-form-item label="错误代码">
          <el-input
            v-model="metricForm.error_code"
            placeholder="请输入错误代码"
          />
        </el-form-item>
        <el-form-item label="打印质量">
          <el-input
            v-model.number="metricForm.print_quality"
            placeholder="请输入打印质量"
          />
        </el-form-item>
        <el-form-item label="打印密度">
          <el-input
            v-model.number="metricForm.print_density"
            placeholder="请输入打印密度"
          />
        </el-form-item>
        <el-form-item label="打印速度">
          <el-input
            v-model.number="metricForm.print_speed"
            placeholder="请输入打印速度"
          />
        </el-form-item>
        <el-form-item label="纸张路径状态">
          <el-input
            v-model="metricForm.paper_path_status"
            placeholder="请输入纸张路径状态"
          />
        </el-form-item>
        <el-form-item label="扫描状态">
          <el-input
            v-model="metricForm.scanner_status"
            placeholder="请输入扫描状态"
          />
        </el-form-item>
        <el-form-item label="温度">
          <el-input
            v-model.number="metricForm.temperature"
            placeholder="请输入温度"
          />
        </el-form-item>
        <el-form-item label="废墨余量">
          <el-input
            v-model.number="metricForm.waste_toner_level"
            placeholder="请输入废墨余量"
          />
        </el-form-item>
        <el-form-item label="服务状态">
          <el-input
            v-model="metricForm.service_status"
            placeholder="请输入服务状态"
          />
        </el-form-item>
        <el-form-item label="打印队列">
          <el-input
            v-model.number="metricForm.print_queue"
            placeholder="请输入打印队列"
          />
        </el-form-item>
        <el-form-item label="存储空间">
          <el-input
            v-model.number="metricForm.storage_space"
            placeholder="请输入存储空间"
          />
        </el-form-item>
        <el-form-item label="内存使用">
          <el-input
            v-model.number="metricForm.memory_usage"
            placeholder="请输入内存使用"
          />
        </el-form-item>
        <el-form-item label="CPU使用">
          <el-input
            v-model.number="metricForm.cpu_usage"
            placeholder="请输入CPU使用"
          />
        </el-form-item>
        <el-form-item label="电源状态码">
          <el-input
            v-model.number="metricForm.power_status_code"
            placeholder="请输入电源状态码"
          />
        </el-form-item>
        <el-form-item label="系统状态码">
          <el-input
            v-model.number="metricForm.system_status_code"
            placeholder="请输入系统状态码"
          />
        </el-form-item>
        <el-form-item label="纸张堵塞状态码">
          <el-input
            v-model.number="metricForm.paper_jam_status_code"
            placeholder="请输入纸张堵塞状态码"
          />
        </el-form-item>
        <el-form-item label="打印头状态码">
          <el-input
            v-model.number="metricForm.printer_head_status_code"
            placeholder="请输入打印头状态码"
          />
        </el-form-item>
        <el-form-item label="纸盘状态码">
          <el-input
            v-model.number="metricForm.paper_tray_status_code"
            placeholder="请输入纸盘状态码"
          />
        </el-form-item>
        <el-form-item label="服务状态码">
          <el-input
            v-model.number="metricForm.service_status_code"
            placeholder="请输入服务状态码"
          />
        </el-form-item>
        <el-form-item label="网络状态码">
          <el-input
            v-model.number="metricForm.network_status_code"
            placeholder="请输入网络状态码"
          />
        </el-form-item>
        <el-form-item label="错误状态码">
          <el-input
            v-model.number="metricForm.error_status_code"
            placeholder="请输入错误状态码"
          />
        </el-form-item>
        <el-form-item label="错误消息">
          <el-input
            v-model="metricForm.error_message"
            placeholder="请输入错误消息"
          />
        </el-form-item>
        <el-form-item label="上传">
          <el-input v-model="metricForm.uploaded" placeholder="请输入上传" />
        </el-form-item>
        <el-form-item label="上传时间">
          <el-input
            v-model="metricForm.uploaded_at"
            placeholder="请输入上传时间"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="editDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmEdit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
  getMetricsList,
  getLatestMetrics,
  getMetricsByTerminal,
  patchMetric, // 需要了解一下使用场景
  deleteMetric
} from "@/api/printer";
import { ElMessage } from "element-plus";

const searchDialogVisible = ref(false);
const editDialogVisible = ref(false);
const editId = ref(0);
const tableData = ref([]);
const page = ref(1);
const page_size = ref(10);
const total = ref(2); //缺少API获取总页码条数

const form = ref({
  terminal: 1
});
const metricForm = ref({
  printer_type: "",
  power_status: "",
  network_status: "",
  system_status: "",
  paper_jam_status: "",
  printer_head_status: "",
  paper_tray_status: "",
  toner_level: 0,
  paper_remaining: 0,
  error_status: "",
  error_code: "",
  print_quality: 0,
  print_density: 0,
  print_speed: 0,
  paper_path_status: "",
  scanner_status: "",
  temperature: 0,
  waste_toner_level: 0,
  service_status: "",
  print_queue: 0,
  storage_space: 0,
  memory_usage: 0,
  cpu_usage: 0,
  power_status_code: 0,
  system_status_code: 0,
  paper_jam_status_code: 0,
  printer_head_status_code: 0,
  paper_tray_status_code: 0,
  service_status_code: 0,
  network_status_code: 0,
  error_status_code: 0,
  error_message: "",
  uploaded: "",
  uploaded_at: ""
});

const getMetricsListData = () => {
  getMetricsList({
    ordering: "",
    page: page.value,
    page_size: page_size.value
  }).then(res => {
    tableData.value = res.results;
  });
};

const getLatestMetricsData = () => {
  getLatestMetrics({
    ordering: "",
    page: 1,
    page_size: 10
  }).then(res => {
    console.log("latest", res);
    tableData.value = res;
  });
};

const handleEdit = (id: number) => {
  editId.value = id;
  editDialogVisible.value = true;
};
const confirmEdit = () => {
  patchMetric(editId.value, form.value).then(res => {
    console.log(res);
    getMetricsListData();
    ElMessage.success("编辑成功");
    editDialogVisible.value = false;
  });
};

const handleDelete = (id: number) => {
  deleteMetric(id).then(res => {
    console.log(res);
    getMetricsListData();
    ElMessage.success("删除成功");
  });
};

const handleSearch = () => {
  getMetricsByTerminal(form.value.terminal, {
    ordering: "",
    page: page.value,
    page_size: page_size.value
  }).then(res => {
    console.log("terminal", res);
    tableData.value = res.results;
    searchDialogVisible.value = false;
  });
};

onMounted(() => {
  getMetricsListData();
});
</script>

<style scoped lang="scss"></style>
