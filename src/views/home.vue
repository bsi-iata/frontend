<script lang="ts" setup>
import { reactive, computed, onMounted, ref } from "vue";
import { Search, Plus } from "@element-plus/icons-vue";
import { VxeTable } from "vxe-table";
import Copy from "../assets/copy.svg";
import { useRouter } from 'vue-router'


const router = useRouter()
const formState = reactive({
  keywords: "1",
  type: "1",
});

const vxeGridProps = computed(() => {
  return {
    // border: 'inner  ',
    data: [{}, {},{}, {},{}, {},{}, {},{}, {},{}, {},{}, {}],
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
        fixed: "NO",
        slots: { default: "NO" },
      },
      {
        title: "Flight",
        fixed: "Flight",
        slots: { default: "Flight" },
      },
      {
        title: "Destination",
        fixed: "Destination",
        slots: { default: "Destination" },
      },
      {
        title: "Package",
        fixed: "Package",
        slots: { default: "Package" },
      },
      {
        title: "Goods",
        fixed: "Goods",
        slots: { default: "Goods" },
      },
      {
        title: "",
        fixed: "actions",
        slots: { default: "actions" },
      },
    ],
  };
});

const height = ref(500)

onMounted(() => {
    height.value = window.innerHeight - 196
})

function onNewOrder() {
    router.push('/detail')
}
</script>

<template>
  <div class="bsi-home">
    <div class="p-4 mb-3 bg-#fff">
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <el-input
            v-model="formState.keywords"
            style="width: 400px"
            placeholder="Please input"
            class="input-with-select"
          >
            <template #prepend>
              <el-select
                v-model="formState.type"
                placeholder="Select"
                style="width: 115px"
              >
                <el-option label="Keywords" value="1" />
                <el-option label="Order No" value="2" />
                <el-option label="Reference No" value="3" />
              </el-select>
            </template>
          </el-input>
          <div class="flex ml-4 items-center">
            <div class="p-2">Received On</div>
            <el-date-picker
              v-model="formState.date"
              type="daterange"
              range-separator="To"
              start-placeholder="Start date"
              end-placeholder="End date"
            />
          </div>
          <div class="ml-4">
            <el-button type="primary" :icon="Search">Search</el-button>
          </div>
        </div>
        <div>
          <el-button type="primary" :icon="Plus" link @click="onNewOrder">New Order</el-button>
        </div>
      </div>
    </div>

    <div class="p-3 bg-#fff">
      <vxe-grid v-bind="vxeGridProps" show-overflow :height="height">
        <template #NO>
          <div class="flex items-center">
            <el-tag color="#409eff">Ord.no</el-tag>
            <div class="flex items-center bsi-no-tag ml-1">
              181
              <img :src="Copy" style="width: 16px; height: 16px" />
            </div>
          </div>
          <div class="flex items-center">
            <el-tag color="#e6a23c">Ref.no</el-tag>
            <div class="flex items-center bsi-no-tag ml-1">
              181
              <img :src="Copy" style="width: 16px; height: 16px" />
            </div>
          </div>
        </template>
        <template #Flight>
          <div>SZX - LAX</div>
          <div>ETD/ETA: 24/4/5 - 24/4/6</div>
        </template>
        <template #Destination>
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
        </template>
      </vxe-grid>
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
