<script lang="ts" setup>
import { reactive, computed, ref, unref, onMounted } from "vue";
import { VxeGrid } from "vxe-table";
import { Delete } from "@element-plus/icons-vue";
import { UploadFilled } from "@element-plus/icons-vue";
import request, { baseUrl } from "../util/http";
import { useRoute, useRouter } from "vue-router";
import { dayjs, ElMessage, ElMessageBox } from "element-plus";
import { airline, contry, state, city, port, flight } from "./config";
import 危险 from "../assets/危险.svg";
import { AxiosResponse } from "axios";
// import { saveAs } from "file-saver";

const formState = reactive({
  code: "",
  airline: "",
  flight: "",
  departure: "",
  arrival: "",
  weight: undefined,
  volumn: undefined,
  quantity: undefined,
  goodsDesc: "",
  remark: "",
  departureAddress: "",
  arrivalAddress: "",

  //   Receiver
  name: "",
  phone: "",
  email: "",
  contry: "",
  state: "",
  city: "",
  zip: "",
  address: "",
});

const formRule = {
  airline: [
    {
      required: true,
      message: "Please select",
    },
  ],
  flight: [
    {
      required: true,
      message: "Please select",
    },
  ],
  weight: [
    {
      required: true,
      message: "Please input",
    },
  ],
  volumn: [
    {
      required: true,
      message: "Please input",
    },
  ],
};

const rules = {
  address: [
    {
      required: true,
      message: "Please input",
    },
    {
      asyncValidator: async (
        _: any,
        value: any,
        callback: (arg0: AxiosResponse<any, any>) => void
      ) => {
        console.log(value, "value");
        if (value) {
          const res: any = await request({
            url: `/Address/check_address`,
            method: "POST",
            data: {
              address: value,
            },
          });
          console.log(res, res.result.indexOf("Suspected"));
          if (res.result.indexOf("Suspected") !== -1) {
            callback(res.result);
          } else {
            callback();
          }
        }
      },
      trigger: "blur",
    },
  ],
};

const goods = ref([]);

const tableRef = ref();
const formRef = ref();
const uploadRef = ref();
const divRef = ref();
const route = useRoute();
const router = useRouter();

const aiResults = ref([]);
const fileList = ref([]);
const fileModelList = ref([]);

const format = "DD/MM/YYYY hh:mm A";

const loading = reactive({
  pageLoading: false,
  modelLoading: false,
});

const dialog = reactive({
  visiable: false,
  fileVisiable: false,
  file: "",
});

const vxeGridProps = computed((): any => {
  return {
    data: unref(goods),
    maxHeight: 400,
    editConfig: { trigger: "click", mode: "row" },
    editRules: {
      commodity: [
        {
          required: true,
          message: "Please input",
        },
      ],
      // pcs: [
      //   {
      //     required: true,
      //     message: "Please input",
      //   },
      // ],
      // price: [
      //   {
      //     required: true,
      //     message: "Please input",
      //   },
      // ],
      // amount: [
      //   {
      //     required: true,
      //     message: "Please input",
      //   },
      // ],
      // usage: [
      //   {
      //     required: true,
      //     message: "Please input",
      //   },
      // ],
      materia: [
        {
          required: true,
          message: "Please input",
        },
      ],
      photo: [
        {
          required: true,
          message: "Please upload",
        },
      ],
    },
    columns: [
      {
        title: "Commodity",
        field: "commodity",
        slots: { edit: "Commodity" },
        editRender: { autofocus: ".vxe-input--inner" },
      },
      {
        title: "PCS",
        field: "pcs",
        slots: { edit: "PCS" },
        editRender: {},
      },
      {
        title: "Price",
        field: "price",
        slots: { edit: "Price" },
        editRender: {},
      },
      {
        title: "Amount",
        field: "amount",
        slots: { edit: "Amount" },
        editRender: {},
      },
      {
        title: "Usage",
        field: "usage",
        slots: { edit: "Usage" },
        editRender: {},
      },
      {
        title: "Materia",
        field: "materia",
        slots: { edit: "Materia" },
        editRender: {},
      },
      {
        title: "Orginal",
        field: "orginal",
        slots: { edit: "Orginal" },
        editRender: {},
      },
      {
        title: "Photo",
        field: "photo",
        width: 80,
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
  if (unref(tableRef)) {
    const msg = await unref(tableRef).validate(true);
    console.log(msg, "msg");
    if (!msg) {
      const { row } = await unref(tableRef)?.insertAt(
        {
          commodity: "",
        },
        -1
      );
      console.log(row, "onAddClick");
      await unref(tableRef)?.setEditRow(row);
    }
  }
}

function onImportClick() {
  dialog.visiable = true;
}

function queryDetail(code: string) {
  console.log(code, "code");
  loading.pageLoading = true;
  request({
    url: `/Order/${code}`,
    method: "GET",
  })
    .then((res: any) => {
      loading.pageLoading = false;
      const [item] = res.packages;
      formState.code = res.code;
      formState.airline = res.airline;
      formState.flight = res.flight;
      formState.departure = dayjs(res.departure).format(format);
      formState.weight = item.weight;
      formState.arrival = dayjs(res.arrival).format(format);
      formState.remark = item.remark;
      formState.goodsDesc = item.goodsDesc;
      formState.quantity = item.quantity;
      formState.volumn = item.volumn;
      formState.departureAddress = res.departureAddress;
      formState.arrivalAddress = res.arrivalAddress;
      formState.name = item.contact.name;
      formState.phone = item.contact.phone;
      formState.email = item.contact.email;
      formState.contry = item.contact.contry;
      formState.state = item.contact.state;
      formState.city = item.contact.city;
      formState.zip = item.contact.zip;
      formState.address = item.contact.address;
      goods.value = item.goods;
    })
    .catch(() => {
      loading.pageLoading = false;
    });
}

onMounted(() => {
  // console.log(route, "route");
  const { query } = route;
  if (query && query.code) {
    queryDetail(query.code as string);
  }
});

function onTableDetele(row: any) {
  ElMessageBox.alert("Are you sure to delete it", "Reminder", {
    showCancelButton: true,
  }).then(() => {
    unref(tableRef)?.remove(row);
    goods.value = unref(goods).filter(
      (item: any) => item._X_ROW_KEY !== row._X_ROW_KEY
    );
  });
}

// function onUploadClick() {}

function onUploadSuccess(row: any, arg: any) {
  row.photo = arg.msg || "-";
  fileList.value = [];
}

function handleClose() {
  dialog.visiable = false;
}

async function onSubmitClick() {
  await unref(formRef).validate();
  const msg = await unref(tableRef).validate(true);

  const { insertRecords } = await unref(tableRef).getRecordset();
  if (!msg) {
    const body = {
      code: formState.code,
      package: {
        airline: formState.airline,
        flight: formState.flight,
        departureAddress: formState.departureAddress,
        arrivalAddress: formState.arrivalAddress,
        departure: formState.arrival
          ? dayjs(formState.departure, format).format("YYYY-MM-DD HH:mm:ss")
          : undefined,
        arrival: formState.arrival
          ? dayjs(formState.arrival, format).format("YYYY-MM-DD HH:mm:ss")
          : undefined,
        weight: formState.weight,
        volumn: formState.volumn,
        quantity: formState.quantity,
        remark: formState.remark,
        goodsDesc: formState.goodsDesc,
      },
      contact: {
        name: formState.name,
        phone: formState.phone,
        email: formState.email,
        contry: formState.contry,
        state: formState.state,
        city: formState.city,
        zip: formState.zip,
        address: formState.address,
      },
      goods: [...unref(goods), ...insertRecords].map((item) => {
        return {
          action: item.action ?? undefined,
          amount: item.amount ?? undefined,
          commodity: item.commodity ?? undefined,
          materia: item.materia ?? undefined,
          orginal: item.orginal ?? undefined,
          pcs: item.pcs ?? undefined,
          photo: item.photo ?? undefined,
          price: item.price ?? undefined,
          usage: item.usage ?? undefined,
        };
      }),
    };
    loading.pageLoading = true;
    request({
      url: "/Order",
      method: "POST",
      data: body,
    })
      .then((res: any) => {
        loading.pageLoading = false;
        if (res.code === "200") {
          ElMessage.success("success");
          router.push("/");
        }
      })
      .catch((error) => {
        console.log(error, "error");
        loading.pageLoading = false;
      });
  }
}

function downloadByData(
  data: BlobPart,
  filename: string,
  mime?: string,
  bom?: BlobPart
) {
  const blobData = typeof bom !== "undefined" ? [bom, data] : [data];
  const blob = new Blob(blobData, {
    type: mime || "application/octet-stream",
  });

  const blobURL = window.URL.createObjectURL(blob);
  const tempLink = document.createElement("a");
  tempLink.style.display = "none";
  tempLink.href = blobURL;
  tempLink.setAttribute("download", filename);
  if (typeof tempLink.download === "undefined") {
    tempLink.setAttribute("target", "_blank");
  }
  document.body.appendChild(tempLink);
  tempLink.click();
  document.body.removeChild(tempLink);
  window.URL.revokeObjectURL(blobURL);
}

// onExampleClick
function onExampleClick() {
  request({
    url: "/GetExampleFile",
    method: "get",
    responseType: "blob",
  }).then((res: any) => {
    console.log(res, "res");
    downloadByData(res, "example.xlsx");
  });
}

function onBeforeUpload(arg: any) {
  console.log(arg, "arg");
}

function onBeforeDialogUpload(arg: any) {
  console.log(arg, "arg");
  loading.modelLoading = true;
}

function onUploadDialogSuccess(data: any) {
  goods.value = [];
  goods.value = data.data.goods;
  aiResults.value = [];
  aiResults.value = data.data.aiResults;
  handleClose();
  loading.modelLoading = false;
  fileModelList.value = [];
  console.log(unref(divRef), "unref(divRef)");
  setTimeout(() => {
    unref(divRef).scrollTop = 400;
  }, 100);
}
</script>

<template>
  <div ref="divRef" class="overflow-auto h-full box-border">
    <div class="bg-#fff p-4 mb-3">
      <div class="mb-4">
        <div class="pl-2 mb-2" style="border-left: 4px solid #409eff">
          Package
        </div>
        <el-form
          ref="formRef"
          :model="formState"
          :rules="formRule"
          label-width="100"
          label-position="right"
        >
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="Airline" prop="airline">
                <el-select v-model="formState.airline" filterable>
                  <el-option
                    v-for="item in airline"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="Flight NO" prop="flight">
                <el-select v-model="formState.flight" filterable>
                  <el-option
                    v-for="item in flight"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="Departure" prop="departure">
                <el-row class="w-full">
                  <el-col :span="16">
                    <el-date-picker
                      v-model="formState.departure"
                      :format="format"
                      :value-format="format"
                      type="datetime"
                      placeholder="Select date and time"
                      class="w-full!"
                    />
                  </el-col>
                  <el-col :span="8">
                    <!-- port -->
                    <!-- <el-select
                      v-model="formState.departureAddress"
                      class="w-full!"
                    >
                    </el-select> -->

                    <el-select v-model="formState.departureAddress" filterable>
                      <el-option
                        v-for="item in port"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="Weight(KG)" prop="weight">
                <el-input-number
                  class="w-full!"
                  style="text-align: left"
                  :controls="false"
                  v-model="formState.weight"
                  placeholder="Please input"
                >
                </el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="Volumn(CBM)" prop="volumn">
                <el-input-number
                  class="w-full!"
                  :controls="false"
                  v-model="formState.volumn"
                  placeholder="Please input"
                >
                </el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="Arrival" prop="arrival">
                <el-row class="w-full">
                  <el-col :span="16">
                    <el-date-picker
                      v-model="formState.arrival"
                      :format="format"
                      :value-format="format"
                      type="datetime"
                      placeholder="Select date and time"
                      class="w-full!"
                    />
                  </el-col>
                  <el-col :span="8">
                    <!-- <el-select
                      v-model="formState.arrivalAddress"
                      class="w-full!"
                    >
                    </el-select> -->
                    <el-select v-model="formState.arrivalAddress" filterable>
                      <el-option
                        v-for="item in port"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="Quantity(CTN)" prop="quantity">
                <el-input-number
                  v-model="formState.quantity"
                  class="w-full!"
                  :controls="false"
                  placeholder="Please input"
                >
                </el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="Goods Desc." prop="goodsDesc">
                <el-input
                  v-model="formState.goodsDesc"
                  placeholder="Please input"
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="Remark" prop="remark">
                <el-input v-model="formState.remark" placeholder="Please input">
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
        <el-form
          :model="formState"
          :rules="rules"
          status-icon
          label-width="100"
          label-position="right"
        >
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="Receiver" prop="name">
                <el-input v-model="formState.name" placeholder="Please input">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="TEL" prop="phone">
                <el-input v-model="formState.phone" placeholder="Please input">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="Mail" prop="email">
                <el-input v-model="formState.email"> </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="Country" prop="contry">
                <!-- <el-select v-model="formState.contry"> </el-select> -->
                <el-select v-model="formState.contry" filterable>
                  <el-option
                    v-for="item in contry"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="State" prop="state">
                <!-- <el-select v-model="formState.state"> </el-select> -->
                <el-select v-model="formState.state" filterable>
                  <el-option
                    v-for="item in state"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="City" prop="city">
                <!-- <el-select v-model="formState.city"> </el-select> -->
                <!-- <el-select v-model="formState.city">
                  <el-option
                    v-for="item in city"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select> -->
                <el-input v-model="formState.city" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="ZIP" prop="zip">
                <el-input v-model="formState.zip"> </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item
                label="Address"
                prop="address"
                validate-status="success"
              >
                <el-input v-model="formState.address"> </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <div class="bg-#fff p-4 mb-3">
      <div
        class="pl-2 mb-2 flex items-center"
        style="border-left: 4px solid #409eff"
      >
        <div>Goods</div>
        <div class="ml-4">
          <el-button type="primary" @click="onAddClick">Add</el-button>
          <el-button class="ml-1" type="primary" @click="onImportClick">
            Import
          </el-button>
        </div>
      </div>
      <VxeGrid ref="tableRef" keep-source v-bind="vxeGridProps">
        <template #Commodity="{ row }">
          <vxe-input v-model="row.commodity" type="text"></vxe-input>
        </template>
        <template #PCS="{ row }">
          <vxe-input v-model="row.pcs" type="text"></vxe-input>
        </template>
        <template #Price="{ row }">
          <vxe-input v-model="row.price" type="text"></vxe-input>
        </template>
        <template #Amount="{ row }">
          <vxe-input v-model="row.amount" type="text"></vxe-input>
        </template>
        <template #Usage="{ row }">
          <vxe-input v-model="row.usage" type="text"></vxe-input>
        </template>
        <template #Materia="{ row }">
          <vxe-input v-model="row.materia" type="text"></vxe-input>
        </template>
        <template #Orginal="{ row }">
          <vxe-input v-model="row.orginal" type="text"></vxe-input>
        </template>
        <template #photo-edit="{ row }">
          <vxe-input v-model="row.photo" type="text"></vxe-input>
        </template>
        <template #photo="{ row }">
          <el-upload
            ref="uploadRef"
            v-if="!row.photo"
            class="upload-demo"
            :action="`${baseUrl}/Upload`"
            v-model:file-list="fileList"
            :show-file-list="false"
            accept=".png,.jpg"
            :limit="1"
            :before-upload="onBeforeUpload"
            :on-success="(arg: any) => onUploadSuccess(row, arg)"
          >
            <el-button type="primary" link>Upload</el-button>
          </el-upload>
          <!-- <img
            v-else
            style="width: 24px; height: 24px"
            :src="row.photo"
            alt="row.photo"
            @click="onPrewClick(photo)"
          /> -->

          <el-image
            v-else
            class="cursor-pointer"
            :preview-src-list="[row.photo]"
            style="width: 24px; height: 24px"
            :src="row.photo"
            alt="error"
          />
        </template>
        <template #action="{ row }">
          <el-icon class="cursor-pointer" @click="onTableDetele(row)">
            <Delete />
          </el-icon>
        </template>
      </VxeGrid>
    </div>

    <div class="bg-#fff p-4 mb-3" v-if="aiResults.length">
      <div class="pl-2 mb-2" style="border-left: 4px solid #409eff">
        Reminder
      </div>
      <div class="flex">
        <div>
          <img :src="危险" alt="" />
        </div>
        <div class="ml-2">
          <div>
            <div
              v-for="(item, index) in aiResults.slice(0, aiResults.length - 1)"
              :key="index"
              class="mb-1.5"
            >
              <div v-html="item"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full h-56px flex justify-center items-center z-100">
      <el-button type="primary" @click="onSubmitClick"> Submit </el-button>
    </div>

    <el-dialog
      v-model="dialog.visiable"
      title="Upload goods sheets"
      width="500"
      :before-close="handleClose"
    >
      <div>
        <el-upload
          class="upload-demo"
          drag
          :action="`${baseUrl}/Import`"
          v-model:file-list="fileModelList"
          :show-file-list="false"
          :limit="1"
          name="form"
          accept=".xlsx,.xls"
          :before-upload="onBeforeDialogUpload"
          :on-success="onUploadDialogSuccess"
        >
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">
            Drop file here or <em>click to upload</em>
          </div>
        </el-upload>
      </div>
      <template #footer>
        <div class="flex justify-between items-center">
          <el-button type="primary" link @click="onExampleClick">
            Example
          </el-button>
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

<style lang="scss">
.el-input-number {
  .el-input__inner {
    text-align: left;
  }
}

.el-input__validateIcon {
  color: #67c23a;
}
</style>
