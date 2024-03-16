<script lang="ts" setup>
import { reactive, computed, onMounted, ref, unref } from "vue";
import { Search } from "@element-plus/icons-vue";
import { VxeGrid } from "vxe-table";
import Copy from "../assets/copy.svg";
import { useRouter } from "vue-router";
import request from "../util/http";
import { copyText } from "../util/copy";
import { ElMessage, ElMessageBox, dayjs } from "element-plus";

const router = useRouter();
const formState = reactive({
  Code: "",
  Status: 0,
  Reference: "",
});
const loading = ref(false);

const tableData = ref([]);

const vxeGridProps = computed((): any => {
  return {
    // border: 'inner  ',
    data: unref(tableData),
    // rowConfig: {
    //   height: 80,
    // },
    // loading: unref(loading),
    scrollX: {
      enabled: true,
    },
    columns: [
      {
        type: "checkbox",
        width: 60,
        fixed: "left",
      },
      {
        title: "NO",
        field: "NO",
        width: 160,
        slots: { default: "NO" },
      },
      {
        title: "Airline",
        field: "airline",
        minWidth: 100,
        // slots: { default: "Flight" },
      },
      {
        title: "Flight NO",
        field: "flight",
        width: 100,
        // slots: { default: "Flight" },
      },
      {
        title: "Departure at",
        field: "departure",
        width: 150,
        slots: { default: "departure-at" },
      },
      {
        title: "Departure",
        field: "departureAddress",
        width: 100,
      },
      {
        title: "Arrival at",
        field: "arrival",
        slots: { default: "arrival-at" },
        width: 150,
      },
      {
        title: "Arrival",
        field: "arrivalAddress",
        width: 100,
      },
      {
        title: "Weight(KG)",
        field: "package.weight",
        width: 100,
      },
      {
        title: "Volumn(cbm)",
        field: "package.volumn",
        width: 120,
      },
      {
        title: "Country",
        field: "destination.contry",
        width: 100,
      },
      {
        title: "",
        fixed: "right",
        field: "actions",
        width: 120,
        slots: { default: "actions" },
      },
    ],
  };
});

const height = ref(500);

onMounted(() => {
  height.value = window.innerHeight - 196;
  onSearch();
});

function onSearch() {
  loading.value = true;
  request({
    url: `/Order`,
    method: "get",
    params: {
      PageIndex: 1,
      PageSize: 200,
      Status: formState.Status,
      Code: formState.Code,
      Reference: formState.Reference,
    },
  })
    .then((res: any) => {
      console.log(res, "res");
      loading.value = false;
      tableData.value = res.items;
    })
    .catch((error) => {
      console.log(error, "error");
      loading.value = false;
    });
}

function onNewOrder(item?: any) {
  if (item) {
    router.push("/detail?code=" + item.no);
  } else {
    router.push("/detail");
  }
}

function onCopyClick(no: string) {
  copyText(no);
}

function onDeteleOrder(row: any) {
  ElMessageBox.alert("Are you sure to delete it", "Reminder", {
    // if you want to disable its autofocus
    // autofocus: false,
    // confirmButtonText: "OK",
    showCancelButton: true,
  }).then(() => {
    request({
      url: `/Order/${row.no}`,
      method: "POST",
    }).then((res: any) => {
      if (res.code === "200") {
        ElMessage.success("Detele success");
        onSearch();
      }
    });
  });
}
</script>

<template>
  <div class="bsi-home">
    <div class="p-4 mb-3 bg-#fff">
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <el-input
            v-model="formState.Code"
            style="width: 400px"
            placeholder="Please input"
            class="input-with-select"
          >
            <template #prepend>
              <el-select
                v-model="formState.Status"
                placeholder="Select"
                style="width: 115px"
              >
                <el-option label="Keywords" :value="0" />
                <el-option label="Order No" :value="1" />
                <!-- <el-option label="Reference No" :value="2" /> -->
              </el-select>
            </template>
          </el-input>
          <div class="flex ml-4 items-center">
            <div class="p-2">Departure</div>
            <el-date-picker
              v-model="formState.Reference"
              type="daterange"
              format="DD/MM/YYYY"
              value-format="YYYY-MM-DD"
              range-separator="To"
              start-placeholder="Start date"
              end-placeholder="End date"
            />
          </div>
          <div class="ml-4">
            <el-button
              :icon="Search"
              @click="onSearch"
            >
              Search
            </el-button>
          </div>
        </div>
        <div>
          <el-button type="primary" @click="onNewOrder()">
            New Order
          </el-button>
        </div>
      </div>
    </div>

    <div class="p-3 bg-#fff">
      <VxeGrid v-bind="vxeGridProps" show-overflow :height="height">
        <template #NO="{ row }">
          <div class="flex items-center">
            <!-- <el-tag color="#409eff">Ord.no</el-tag> -->
            <div class="flex items-center bsi-no-tag ml-1">
              {{ row.no }}
              <img
                :src="Copy"
                style="width: 16px; height: 16px"
                @click="onCopyClick(row.no)"
              />
            </div>
          </div>
          <!-- <div class="flex items-center">
            <el-tag color="#e6a23c">Ref.no</el-tag>
            <div class="flex items-center bsi-no-tag ml-1">
              {{ row.no }}
              <img :src="Copy" style="width: 16px; height: 16px" @click="onCopyClick(row.no)" />
            </div>
          </div> -->
        </template>
        <template #arrival-at="{ row }">
          <div>{{ dayjs(row.arrival).format("DD/MM/YYYY hh:mm A") }}</div>
        </template>
        <template #departure-at="{ row }">
          <div>{{ dayjs(row.departure).format("DD/MM/YYYY hh:mm A") }}</div>
        </template>
        <!-- <template #Destination>
          <div>Germany</div>
          <div>FBA: ONT8 (92551)</div>
        </template>
        <template #Package>
          <div>Charge W: 346KG</div>
          <div class="color-$el-color-info">32 CTN</div>
          <div class="flex color-$el-color-info">
            <span>334KG</span>
            <span class="ml-5">1.321CBM</span>
          </div>
        </template>
        <template #Goods>
          <div>Merlin Lighter</div>
          <div>Val：3000 USD</div>
          <div class="color-red">Battery</div>
        </template> -->
        <template #actions="{ row }">
          <el-button type="primary" link @click="onNewOrder(row)">
            View
          </el-button>
          <el-button type="primary" link @click="onDeteleOrder(row)">
            Detele
          </el-button>
        </template>
      </VxeGrid>
    </div>
  </div>
</template>

<style lang="scss">
.bsi-home {
  min-height: 100%;
  .el-tag.el-tag--primary {
    color: #fff;
  }

  .bsi-no-tag {
    img {
      display: none;
    }
    &:hover {
      img {
        display: inline-block;
      }
    }
  }
}
</style>
