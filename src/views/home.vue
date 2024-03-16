<script lang="ts" setup>
import { reactive, computed, onMounted, ref, unref } from "vue";
import { Search } from "@element-plus/icons-vue";
import { VxeGrid } from "vxe-table";
import Copy from "../assets/copy.svg";
import { useRouter } from "vue-router";
import request from "../util/http";
import { copyText } from "../util/copy";

const router = useRouter();
const formState = reactive({
  Code: "",
  Status: 0,
  Reference: "",
});

const tableData = ref([]);

const vxeGridProps = computed(() => {
  return {
    // border: 'inner  ',
    data: unref(tableData),
    rowConfig: {
      height: 80,
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
        slots: { default: "NO" },
      },
      {
        title: "Flight",
        field: "Flight",
        slots: { default: "Flight" },
      },
      {
        title: "Destination",
        field: "destination",
        // slots: { default: "Destination" },
      },
      {
        title: "Package",
        field: "package",
        // slots: { default: "Package" },
      },
      {
        title: "Goods",
        field: "goods",
        // slots: { default: "Goods" },
      },
      {
        title: "",
        fixed: "right",
        field: "actions",
        width: 100,
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
  }).then((res: any) => {
    console.log(res);
    tableData.value = res.items;
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

function onDeteleOrder(row) {

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
                <el-option label="Reference No" :value="2" />
              </el-select>
            </template>
          </el-input>
          <div class="flex ml-4 items-center">
            <div class="p-2">Received On</div>
            <el-date-picker
              v-model="formState.Reference"
              type="daterange"
              range-separator="To"
              start-placeholder="Start date"
              end-placeholder="End date"
            />
          </div>
          <div class="ml-4">
            <el-button type="primary" :icon="Search" @click="onSearch">
              Search
            </el-button>
          </div>
        </div>
        <div>
          <el-button type="primary" link @click="onNewOrder">
            New Air Order
          </el-button>
        </div>
      </div>
    </div>

    <div class="p-3 bg-#fff">
      <VxeGrid v-bind="vxeGridProps" show-overflow :height="height">
        <template #NO="{ row }">
          <div class="flex items-center">
            <el-tag color="#409eff">Ord.no</el-tag>
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
        <template #Flight="{ row }">
          <div>{{ row.airline }} - {{ row.flight }}</div>
          <!-- <div>ETD/ETA: 24/4/5 - 24/4/6</div> -->
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
