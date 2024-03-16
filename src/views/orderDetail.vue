<script lang="ts" setup>
import { reactive, computed, ref, unref } from "vue";
import { VxeGrid } from "vxe-table";
import { Delete } from "@element-plus/icons-vue";
import { UploadFilled } from "@element-plus/icons-vue";

const formState = reactive({
  Airline: "",
  FlightNO: "",
  Departure: "",
  Weight: "",
  Volumn: "",
  Quantity: "",
  GoodsDesc: "",
  Remark: "",

  //   Receiver
  Receiver: "",
  TEL: "",
  Mail: "",
  Country: "",
  State: "",
  City: "",
  ZIP: "",
  Address: "",
});

const tableRef = ref(null);

const dialog = reactive({
  visiable: false,
});

const Airline = [
  {
    label: "SZX",
    label: "SZX",
  },
];

const vxeGridProps = computed(() => {
  return {
    data: [],
    maxHeight: 400,
    editConfig: { trigger: "click", mode: "row" },
    columns: [
      {
        title: "Commodity",
        field: "Commodity",
        slots: { edit: "Commodity" },
        editRender: { autofocus: ".vxe-input--inner" },
      },
      {
        title: "PCS",
        field: "PCS",
        slots: { edit: "PCS" },
        editRender: {},
      },
      {
        title: "Price",
        field: "Price",
        slots: { edit: "Price" },
        editRender: {},
      },
      {
        title: "Amount",
        field: "Amount",
        slots: { edit: "Amount" },
        editRender: {},
      },
      {
        title: "Usage",
        field: "Usage",
        slots: { edit: "Usage" },
        editRender: {},
      },
      {
        title: "Materia",
        field: "Materia",
        slots: { edit: "Materia" },
        editRender: {},
      },
      {
        title: "Orginal",
        field: "Orginal",
        slots: { edit: "Orginal" },
        editRender: {},
      },
      {
        title: "Photo",
        field: "Photo",
        slots: { edit: "photo-edit", default: "photo" },
      },
      {
        title: "",
        field: "action",
        width: 60,
        slots: { default: "action" },
      },
    ],
  };
});

async function onAddClick() {
  const { row } = await unref(tableRef).insertAt({
    Commodity: "",
  }, -1);
  console.log(row, "onAddClick");
  await unref(tableRef).setEditRow(row);
}

function onImportClick() {
  dialog.visiable = true;
}
</script>

<template>
  <div
    class="overflow-auto  h-full box-border"
    style=""    
  >
    <div class="bg-#fff p-4 mb-3">
      <div class="mb-4">
        <div class="pl-2 mb-2" style="border-left: 4px solid #409eff">
          Package
        </div>
        <el-form :model="formState" label-width="100" label-position="right">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="Airline">
                <el-select v-model="formState.Airline">
                  <el-option
                    v-for="item in Airline"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="Flight NO">
                <el-input
                  v-model="formState.FlightNO"
                  placeholder="Please input"
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="Departure">
                <el-row class="w-full">
                  <el-col :span="16">
                    <el-date-picker
                      v-model="formState.time"
                      format="DD/MM/YYYY HH:mm:ss"
                      type="datetime"
                      placeholder="Select date and time"
                      class="w-full!"
                    />
                  </el-col>
                  <el-col :span="8">
                    <el-select v-model="formState.Departure" class="w-full!">
                    </el-select>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="Weight(KG)">
                <el-input v-model="formState.Weight" placeholder="Please input">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="Volumn(CBM)">
                <el-input v-model="formState.Volumn" placeholder="Please input">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="Quantity(CTN)">
                <el-input v-model="formState.Volumn" placeholder="Please input">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="Goods Desc.">
                <el-input v-model="formState.Volumn" placeholder="Please input">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="Remark">
                <el-input v-model="formState.Volumn" placeholder="Please input">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div>
        <div class="pl-2 mb-2" style="border-left: 4px solid #409eff">
          Receiver
        </div>
        <el-form :model="formState" label-width="100" label-position="right">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="Receiver">
                <el-input
                  v-model="formState.Receiver"
                  placeholder="Please input"
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="TEL">
                <el-input v-model="formState.TEL" placeholder="Please input">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="Mail">
                <el-input v-model="formState.Mail"> </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="Country">
                <el-select v-model="formState.Country"> </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="State">
                <el-select v-model="formState.State"> </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="City">
                <el-select v-model="formState.City"> </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="ZIP">
                <el-select v-model="formState.ZIP"> </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="Address">
                <el-input v-model="formState.Address"> </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <div class="bg-#fff p-4 mb-3">
      <div class="pl-2 mb-2 flex" style="border-left: 4px solid #409eff">
        <div>Package</div>
        <div class="ml-4">
          <el-button type="primary" @click="onAddClick">Add</el-button>
          <el-button class="ml-1" type="primary" @click="onImportClick">
            Import
          </el-button>
        </div>
      </div>
      <VxeGrid ref="tableRef" v-bind="vxeGridProps">
        <template #Commodity="{ row }">
          <vxe-input v-model="row.Commodity" type="text"></vxe-input>
        </template>
        <template #PCS="{ row }">
          <vxe-input v-model="row.PCS" type="text"></vxe-input>
        </template>
        <template #Price="{ row }">
          <vxe-input v-model="row.Price" type="text"></vxe-input>
        </template>
        <template #Amount="{ row }">
          <vxe-input v-model="row.Amount" type="text"></vxe-input>
        </template>
        <template #Usage="{ row }">
          <vxe-input v-model="row.Usage" type="text"></vxe-input>
        </template>
        <template #Materia="{ row }">
          <vxe-input v-model="row.Materia" type="text"></vxe-input>
        </template>
        <template #Orginal="{ row }">
          <vxe-input v-model="row.Orginal" type="text"></vxe-input>
        </template>
        <template #photo-edit="{ row }">
          <vxe-input v-model="row.Photo" type="text"></vxe-input>
        </template>
        <template #photo>
          <el-button link>上传</el-button>
        </template>
        <template #action="{ row }">
          <el-icon class="cursor-pointer"><Delete /></el-icon>
        </template>
      </VxeGrid>
    </div>

    <div class="w-full h-56px flex justify-center items-center z-100">
      <el-button type="primary">提交</el-button>
    </div>

    <el-dialog
      v-model="dialog.visiable"
      title="Upload goods sheets"
      width="500"
      :before-close="handleClose"
    >
      <el-upload
        class="upload-demo"
        drag
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        multiple
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
          Drop file here or <em>click to upload</em>
        </div>
      </el-upload>
      <template #footer>
        <div class="flex justify-between items-center">
          <el-button link>Example</el-button>
          <div>
            <el-button @click="dialog.visiable = false">Cancel</el-button>
            <el-button type="primary" @click="dialog.visiable = false">
              Ok
            </el-button>
          </div>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
