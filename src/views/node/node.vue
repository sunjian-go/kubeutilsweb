<template>
  <div>
    <el-row>
      <!-- 头部1 -->
      <el-col :span="24">
        <div>
          <el-card
            class="row-col-card"
            shadow="never"
            :body-style="{ padding: '10px' }"
          >
            <el-row>
              <el-col :span="12">
                <el-row :gutter="10">
                  <el-col :span="10">
                    <div>
                      <span>集群：</span>
                      <el-select
                        v-model="cluName"
                        placeholder="请选择"
                        :filterable="true"
                      >
                        <el-option
                          v-for="(scope, i) in clus"
                          :key="i"
                          :label="scope.cluster_name"
                          :value="scope.cluster_name"
                        />
                      </el-select>
                    </div>
                  </el-col>
                  <el-col :span="14"> </el-col>
                </el-row>
              </el-col>
              <el-col :span="9"></el-col>
              <el-col :span="3">
                <div style="padding-left: 30%">
                  <el-row>
                    <el-col :span="3"> </el-col>
                    <el-col :span="5"></el-col>
                    <el-col :span="15">
                      <!-- <el-button type="" @click="refulshButton()">
                        <el-icon><RefreshLeft /></el-icon>
                        <span>刷新</span>
                      </el-button> -->
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </div>
      </el-col>
      <el-col :span="24">
        <div>
          <el-card
            class="dataCard"
            shadow="never"
            :body-style="{ padding: '10px' }"
          >
            <div>
              <el-table
                :data="nodeList"
                style="width: 100%"
                v-loading="apploading"
              >
                <el-table-column width="20" />
                <el-table-column label="node" align="left">
                  <template v-slot="scope">
                    <span
                      style="color: rgb(62, 165, 233)"
                      class="deploy-body-deployname"
                      >{{ scope.row.metadata.name }}</span
                    >
                  </template>
                </el-table-column>
                <el-table-column label="IP" align="center">
                  <template v-slot="scope">
                    <span>{{ scope.row.status.addresses[0].address }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="状态" align="center">
                  <template v-slot="scope">
                    <el-tag
                      type="success"
                      v-if="scope.row.status.conditions[4].status == 'True'"
                      >Ready</el-tag
                    >

                    <el-tag
                      type="warning"
                      v-else-if="
                        scope.row.status.conditions[4].status != 'True'
                      "
                      >NotReady</el-tag
                    >
                  </template>
                </el-table-column>
                <el-table-column label="规格" align="center">
                  <template v-slot="scope">
                    <el-tag
                      >{{ scope.row.status.capacity.cpu }}核{{
                        jsmem(scope.row.status.capacity.memory)
                      }}G</el-tag
                    >
                  </template>
                </el-table-column>
                <el-table-column label="POD-CIDR" align="center">
                  <template v-slot="scope">
                    <el-tag type="info">{{ scope.row.spec.podCIDR }}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column label="版本" align="center">
                  <template v-slot="scope">
                    <span>{{ scope.row.status.nodeInfo.kubeletVersion }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="创建时间" align="center" width="200">
                  <template v-slot="scope">
                    <span class="time">{{
                      timeTrans(scope.row.metadata.creationTimestamp)
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                  <template v-slot="scope">
                    <el-dropdown trigger="click">
                      <svg
                        t="1703492302263"
                        class="icon"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="6796"
                        width="200"
                        height="200"
                      >
                        <path
                          d="M917.333333 298.666667H362.666667c-10.666667 0-21.333333-8.533333-21.333334-21.333334v-42.666666c0-10.666667 8.533333-21.333333 21.333334-21.333334h554.666666c10.666667 0 21.333333 8.533333 21.333334 21.333334v42.666666c0 12.8-8.533333 21.333333-21.333334 21.333334zM917.333333 554.666667H362.666667c-10.666667 0-21.333333-8.533333-21.333334-21.333334v-42.666666c0-10.666667 8.533333-21.333333 21.333334-21.333334h554.666666c10.666667 0 21.333333 8.533333 21.333334 21.333334v42.666666c0 12.8-8.533333 21.333333-21.333334 21.333334zM917.333333 810.666667H362.666667c-10.666667 0-21.333333-8.533333-21.333334-21.333334v-42.666666c0-10.666667 8.533333-21.333333 21.333334-21.333334h554.666666c10.666667 0 21.333333 8.533333 21.333334 21.333334v42.666666c0 12.8-8.533333 21.333333-21.333334 21.333334zM213.333333 426.666667H128c-23.466667 0-42.666667 19.2-42.666667 42.666666v85.333334c0 23.466667 19.2 42.666667 42.666667 42.666666h85.333333c23.466667 0 42.666667-19.2 42.666667-42.666666v-85.333334c0-23.466667-19.2-42.666667-42.666667-42.666666z m0 128H128v-85.333334h85.333333v85.333334zM213.333333 682.666667H128c-23.466667 0-42.666667 19.2-42.666667 42.666666v85.333334c0 23.466667 19.2 42.666667 42.666667 42.666666h85.333333c23.466667 0 42.666667-19.2 42.666667-42.666666v-85.333334c0-23.466667-19.2-42.666667-42.666667-42.666666z m0 128H128v-85.333334h85.333333v85.333334zM157.866667 334.933333l-66.133334-55.466666c-4.266667-4.266667-4.266667-10.666667-2.133333-14.933334l17.066667-17.066666c4.266667-4.266667 10.666667-4.266667 14.933333-2.133334l42.666667 36.266667 98.133333-104.533333c4.266667-4.266667 10.666667-4.266667 14.933333 0l14.933334 14.933333c4.266667 4.266667 4.266667 10.666667 0 14.933333l-119.466667 128c-2.133333 4.266667-8.533333 4.266667-14.933333 0z"
                          fill="#297AFF"
                          p-id="6797"
                        ></path>
                      </svg>
                      <template #dropdown>
                        <el-dropdown-menu>
                          <el-dropdown-item
                            @click="
                              nodeinfo_dialog = true;
                              getNodeDetail(scope.row.metadata.name);
                            "
                            >节点详情
                            <svg
                              t="1706583062498"
                              class="nodeicon"
                              viewBox="0 0 1024 1024"
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              p-id="2310"
                              width="200"
                              height="200"
                            >
                              <path
                                d="M1024 512C1024 229.230209 794.769796 0 512 0 229.230204 0 0 229.230209 0 512 0 794.769791 229.230204 1024 512 1024 794.769796 1024 1024 794.769791 1024 512ZM70.62069 512C70.62069 268.232939 268.232934 70.62069 512 70.62069 755.767066 70.62069 953.37931 268.232939 953.37931 512 953.37931 755.767061 755.767066 953.37931 512 953.37931 268.232934 953.37931 70.62069 755.767061 70.62069 512ZM512 317.793103C541.252043 317.793103 564.965517 294.079633 564.965517 264.827586 564.965517 235.57554 541.252043 211.862069 512 211.862069 482.747957 211.862069 459.034483 235.57554 459.034483 264.827586 459.034483 294.079633 482.747957 317.793103 512 317.793103ZM476.689655 794.482759C476.689655 813.984124 492.498644 829.793103 512 829.793103 531.501356 829.793103 547.310345 813.984124 547.310345 794.482759L547.310345 406.068966C547.310345 386.567601 531.501356 370.758621 512 370.758621 492.498644 370.758621 476.689655 386.567601 476.689655 406.068966L476.689655 794.482759Z"
                                fill="#389BFF"
                                p-id="2311"
                              ></path>
                            </svg>
                          </el-dropdown-item>
                          <el-dropdown-item
                            @click="
                              packet_dialog = true;
                              getInterfaces(
                                scope.row.status.addresses[0].address
                              );
                            "
                            >抓包操作
                            <svg
                              style="height: 19px; width: 19px"
                              t="1706583756769"
                              class="nodeicon"
                              viewBox="0 0 1024 1024"
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              p-id="21438"
                              width="200"
                              height="200"
                            >
                              <path
                                d="M896 768H128c-70.4 0-128-57.6-128-128V128C0 57.6 57.6 0 128 0h768c70.4 0 128 57.6 128 128v512c0 70.4-57.6 128-128 128zM128 128v512h768V128H128z"
                                fill="#229AEE"
                                p-id="21439"
                              ></path>
                              <path
                                d="M384 1017.6c-38.4 0-64-25.6-64-51.2v-268.8c0-32 25.6-57.6 64-57.6s64 25.6 64 51.2V960c0 38.4-25.6 57.6-64 57.6zM640 1017.6c-38.4 0-64-25.6-64-51.2v-268.8c0-32 25.6-51.2 64-51.2s64 25.6 64 51.2v268.8c0 32-25.6 51.2-64 51.2zM256 480c-12.8 0-19.2-6.4-25.6-12.8-12.8-19.2-6.4-38.4 6.4-44.8l185.6-121.6c19.2-12.8 38.4-12.8 51.2 0l160 108.8 108.8-134.4c12.8-12.8 32-19.2 44.8-6.4 12.8 12.8 12.8 32 6.4 44.8l-121.6 147.2c-12.8 19.2-44.8 25.6-64 12.8L448 358.4 275.2 473.6c-6.4 6.4-12.8 6.4-19.2 6.4z"
                                fill="#229AEE"
                                p-id="21440"
                              ></path>
                              <path
                                d="M256 512c-38.4 0-64-25.6-64-64s25.6-64 64-64 64 25.6 64 64-25.6 64-64 64z m0-96V448v-32zM448 384c-38.4 0-64-25.6-64-64s25.6-64 64-64 64 25.6 64 64-25.6 64-64 64z m0-96V320v-32zM640 512c-38.4 0-64-25.6-64-64s25.6-64 64-64 64 25.6 64 64-25.6 64-64 64z m0-96V448v-32zM768 352c-38.4 0-64-25.6-64-64s25.6-64 64-64 64 25.6 64 64-25.6 64-64 64zM768 256v32V256zM896 1024H128c-38.4 0-64-25.6-64-64s25.6-64 64-64h768c38.4 0 64 25.6 64 64s-25.6 64-64 64z"
                                fill="#229AEE"
                                p-id="21441"
                              ></path>
                            </svg>
                          </el-dropdown-item>
                          <el-dropdown-item
                            @click="
                              icmp_dialog = true;
                              getHost(scope.row.status.addresses[0].address);
                            "
                            >ping测试
                            <svg
                              style="margin-left: -2px"
                              t="1706583324611"
                              class="nodeicon"
                              viewBox="0 0 1024 1024"
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              p-id="12276"
                              width="200"
                              height="200"
                            >
                              <path
                                d="M512 96c229.76 0 416 186.24 416 416S741.76 928 512 928 96 741.76 96 512 282.24 96 512 96z m-32 448l-127.317333 0.021333c0.896 20.48 2.624 40.405333 5.12 59.669334l1.984 14.293333 2.474666 15.253333c19.754667 112.896 65.728 197.738667 117.76 222.997334L480 544z m191.317333 0.021333L544 544v312.234667c50.858667-24.725333 95.936-106.368 116.373333-215.509334l1.365334-7.488 2.474666-15.232a701.013333 701.013333 0 0 0 7.104-73.984z m-382.698666 0H161.429333c11.648 129.066667 92.992 238.08 206.101334 289.066667-22.122667-34.282667-40.362667-76.416-53.76-124.032l-3.029334-11.093333-3.52-14.165334-3.242666-14.464a744.490667 744.490667 0 0 1-15.36-125.312z m573.952 0H735.36a752.661333 752.661333 0 0 1-12.672 112.128l-2.688 13.184-3.242667 14.464-3.52 14.186667c-13.653333 52.138667-32.96 98.197333-56.789333 135.104 113.109333-50.986667 194.453333-160 206.08-289.066667zM367.530667 190.890667l-2.858667 1.301333C253.013333 243.733333 172.970667 352 161.429333 480h127.189334c1.536-39.04 5.866667-76.693333 12.672-112.149333l2.688-13.184 3.242666-14.464 3.52-14.186667c13.653333-52.138667 32.96-98.197333 56.789334-135.104zM480 167.765333c-50.709333 24.618667-95.68 105.898667-116.202667 214.592l-1.536 8.405334-2.474666 15.232a701.034667 701.034667 0 0 0-7.104 74.005333H480V167.765333z m176.469333 23.146667l2.56 4.053333c20.906667 33.429333 38.229333 73.984 51.093334 119.552l3.136 11.52 3.52 14.165334 3.242666 14.464c8.362667 39.253333 13.632 81.408 15.36 125.333333h127.189334c-11.626667-129.088-92.970667-238.101333-206.101334-289.066667zM544 167.765333L544 480h127.317333a707.136 707.136 0 0 0-5.333333-61.376l-1.770667-12.629333-2.474666-15.232c-19.754667-112.874667-65.706667-197.717333-117.717334-222.997334z"
                                fill="#1677FF"
                                p-id="12277"
                              ></path>
                            </svg>
                          </el-dropdown-item>
                          <el-dropdown-item
                            @click="
                              port_dialog = true;
                              getHost(scope.row.status.addresses[0].address);
                            "
                            >端口测试
                            <svg
                              t="1706583518088"
                              class="nodeicon"
                              viewBox="0 0 1064 1024"
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              p-id="13249"
                              width="200"
                              height="200"
                            >
                              <path
                                d="M830.073018 300.993939v-74.472727h-99.29697v-99.29697h-397.187878v99.29697h-99.29697v74.472727h-99.29697v595.756994h794.375758V300.993939h-99.29697z m49.648485 546.133334h-695.078788v-496.484849h99.29697v-74.472727h99.29697v-99.29697h297.890909v99.29697h99.296969v74.472727h99.29697v496.484849z m-570.957576-372.363637h49.648485v297.890909h-49.648485v-297.890909z m124.121212 0h49.648485v297.890909h-49.648485v-297.890909z m148.945455 0h49.648485v297.890909h-49.648485v-297.890909z m148.945454 0h49.648485v297.890909h-49.648485v-297.890909z"
                                fill="#0088FC"
                                p-id="13250"
                              ></path>
                            </svg>
                          </el-dropdown-item>
                        </el-dropdown-menu>
                      </template>
                    </el-dropdown>
                  </template>
                </el-table-column>
                <el-table-column>
                  <template #header>
                    <el-row :gutter="2">
                      <el-col :span="16"
                        ><el-input
                          placeholder="请输入"
                          v-model="searchValue"
                        ></el-input
                      ></el-col>
                      <el-col :span="2"
                        ><el-button type="" @click="getNodes()"
                          >搜索</el-button
                        ></el-col
                      >
                    </el-row>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-card>
        </div>
        <div style="margin-top: 15px">
          <!-- 分页 -->
          <!-- current-page：当前页，跟后端page一致 -->
          <!-- page-size：单页大小，跟后端limit一致 -->
          <!-- :small：一个布尔值，用于控制分页组件的大小，如果设为true，则显示为小号组件。 -->
          <!-- :disabled：一个布尔值，用于禁用分页组件，如果设为true，则分页组件为禁用状态，用户无法进行翻页操作。 -->
          <!-- :background：一个布尔值，用于控制分页组件的背景颜色，如果设为true，则分页组件的背景为灰色。   -->
          <!-- layout：分页的布局，带有什么功能 -->
          <!-- :total：指定总共有多少条数据，用于计算总共有多少页。 -->
          <!-- size-change：单页大小改变后触发 -->
          <!-- current-change：页数改变后触发 -->
          <el-pagination
            :current-page="currentPage"
            :page-size="pagesize"
            :page-sizes="pageList"
            :small="small"
            :disabled="disabled"
            :background="background"
            layout="total, sizes, prev, pager, next, jumper"
            :total="nodeTotal"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-col>
    </el-row>
  </div>
  <!-- 节点详情dialog -->
  <el-dialog
    v-model="nodeinfo_dialog"
    title="节点详情"
    width="70%"
    style="height: 90%; border-radius: 15px; margin-left: 15%; margin-top: 40px"
    :before-close="nodeClose"
    :close-on-click-modal="false"
    :draggable="true"
  >
    <div>
      <el-card
        shadow="never"
        class="nodeInfoCard"
        :body-style="{ padding: '5px' }"
      >
        <div>
          <el-row>
            <el-col :span="24">
              <div class="el-head-div">
                <el-row>
                  <el-col :span="24">
                    <el-card
                      ><span style="font-size: 20px; font-weight: bold"
                        >主机名：{{ nodeName }}</span
                      ></el-card
                    >
                  </el-col>
                  <el-col :span="24" style="padding-top: 5px">
                    <el-row :gutter="12">
                      <el-col :span="8">
                        <el-card shadow="always" class="card-child-card">
                          <span class="head-card-span">IP地址：</span
                          ><span class="head-card-span2">{{ node.ip }}</span>
                        </el-card>
                      </el-col>
                      <el-col :span="8">
                        <el-card shadow="always" class="card-child-card">
                          <span class="head-card-span">Docker版本：</span
                          ><span class="head-card-span2">{{
                            node.docker_v
                          }}</span>
                        </el-card>
                      </el-col>
                      <el-col :span="8">
                        <el-card shadow="always" class="card-child-card">
                          <span class="head-card-span">创建时间：</span
                          ><span class="head-card-span2">{{
                            node.create_time
                          }}</span>
                        </el-card>
                      </el-col>
                    </el-row>
                    <el-row :gutter="12" style="padding-top: 7px">
                      <el-col :span="8">
                        <el-card shadow="always" class="card-child-card">
                          <span class="head-card-span">Kubelet版本：</span
                          ><span class="head-card-span2">{{
                            node.kubelet_v
                          }}</span>
                        </el-card>
                      </el-col>
                      <el-col :span="8">
                        <el-card shadow="always" class="card-child-card">
                          <span class="head-card-span">Kube-Proxy版本：</span
                          ><span class="head-card-span2">{{
                            node.kubeProxy_v
                          }}</span>
                        </el-card>
                      </el-col>
                      <el-col :span="8">
                        <el-card shadow="always" class="card-child-card">
                          <span class="head-card-span">操作系统：</span
                          ><span class="head-card-span2"
                            >{{ node.OS }}: {{ node.kernel_v }}</span
                          >
                        </el-card>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </div>
            </el-col>
            <el-col :span="24">
              <div class="el-mian-div">
                <el-row>
                  <!-- 系统信息 -->
                  <el-col :span="24">
                    <el-card shadow="never">
                      <el-collapse v-model="activeNames" @change="handleChange">
                        <el-collapse-item name="1">
                          <template #title>
                            <span style="font-size: 16px">系统信息</span>
                          </template>
                          <p class="head-card-span">操作系统和kubenetes信息</p>
                          <el-row :gutter="0">
                            <el-col :span="12">
                              <span style="font-weight: bold">键</span>
                              <el-divider style="margin-top: 10px" />
                              <div v-for="(v, k) in OS_key" :key="k">
                                <!--value:key-->
                                <div style="margin-bottom: 10px">
                                  <span>{{ v }}</span>
                                </div>
                              </div>
                            </el-col>
                            <el-col :span="12">
                              <span style="font-weight: bold">值</span>
                              <el-divider style="margin-top: 10px" />
                              <div v-for="(v, k) in OS_value" :key="k">
                                <!--value:key-->
                                <div style="margin-bottom: 10px">
                                  <span>{{ ellipsis(v) }}</span>
                                </div>
                              </div>
                            </el-col>
                          </el-row>
                        </el-collapse-item>
                      </el-collapse>
                    </el-card>
                  </el-col>
                  <!-- 标签 -->
                  <el-col :span="24" style="transform: translateY(10px)">
                    <el-card shadow="never">
                      <el-collapse v-model="activeNames" @change="handleChange">
                        <el-collapse-item name="2">
                          <template #title>
                            <span style="font-size: 16px">标签</span>
                          </template>
                          <p class="head-card-span">
                            键/值 可以被用在主机调度规则里和一些其他的高级设置中
                          </p>
                          <el-row :gutter="0">
                            <el-col :span="12">
                              <span style="font-weight: bold">键</span>
                              <el-divider style="margin-top: 10px" />
                              <div v-for="(v, k) in labels_key" :key="k">
                                <!--value:key-->
                                <div style="margin-bottom: 10px">
                                  <span>{{ v }}</span>
                                </div>
                              </div>
                            </el-col>
                            <el-col :span="12">
                              <span style="font-weight: bold">值</span>
                              <el-divider style="margin-top: 10px" />
                              <div v-for="(v, k) in labels_val" :key="k">
                                <!--value:key-->
                                <div style="margin-bottom: 10px">
                                  <span>{{ ellipsis(v) }}</span>
                                </div>
                              </div>
                            </el-col>
                          </el-row>
                        </el-collapse-item>
                      </el-collapse>
                    </el-card>
                  </el-col>
                  <!-- 注释 -->
                  <el-col :span="24" style="transform: translateY(20px)">
                    <el-card shadow="never">
                      <el-collapse v-model="activeNames" @change="handleChange">
                        <el-collapse-item name="3">
                          <template #title>
                            <span style="font-size: 16px">注释</span>
                          </template>
                          <p class="head-card-span">Key/value 元数据</p>
                          <el-row :gutter="0">
                            <el-col :span="12">
                              <span style="font-weight: bold">键</span>
                              <el-divider style="margin-top: 10px" />
                              <div v-for="(v, k) in annotations_key" :key="k">
                                <!--value:key-->
                                <div style="margin-bottom: 10px">
                                  <span>{{ v }}</span>
                                </div>
                              </div>
                            </el-col>
                            <el-col :span="12">
                              <span style="font-weight: bold">值</span>
                              <el-divider style="margin-top: 10px" />
                              <div v-for="(v, k) in annotations_val" :key="k">
                                <!--value:key-->
                                <div style="margin-bottom: 10px">
                                  <span>{{ ellipsis(v) }}</span>
                                </div>
                              </div>
                            </el-col>
                          </el-row>
                        </el-collapse-item>
                      </el-collapse>
                    </el-card>
                  </el-col>
                  <!-- Taints -->
                  <el-col :span="24" style="transform: translateY(30px)">
                    <el-card shadow="never">
                      <el-collapse v-model="activeNames" @change="handleChange">
                        <el-collapse-item name="4">
                          <template #title>
                            <span style="font-size: 16px">Taints</span>
                          </template>
                          <p class="head-card-span">
                            通过向节点添加taints和tolerations，确保工作负载只在适当的节点上运行
                          </p>
                          <el-row :gutter="0">
                            <el-col :span="12">
                              <span style="font-weight: bold">键</span>
                              <el-divider style="margin-top: 10px" />
                              <div v-for="(v, k) in taints_keys" :key="k">
                                <!--value:key-->
                                <div style="margin-bottom: 10px">
                                  <span>{{ v }}</span>
                                </div>
                              </div>
                            </el-col>
                            <el-col :span="12">
                              <span style="font-weight: bold">值</span>
                              <el-divider style="margin-top: 10px" />
                              <div v-for="(v, k) in taints_vals" :key="k">
                                <!--value:key-->
                                <div style="margin-bottom: 10px">
                                  <span>{{ ellipsis(v) }}</span>
                                </div>
                              </div>
                            </el-col>
                          </el-row>
                        </el-collapse-item>
                      </el-collapse>
                    </el-card>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </div>

    <div style="text-align: center">
      <el-button
        @click="
          nodeinfo_dialog = false;
          resetNodeInfo();
        "
        style="margin-top: 20px"
        type="info"
        round
        >关闭</el-button
      >
    </div>
  </el-dialog>
  <!-- 抓包dialog -->
  <el-dialog
    v-model="packet_dialog"
    title="抓取数据包"
    width="40%"
    style="
      height: 290px;
      border-radius: 15px;
      margin-left: 32%;
      margin-top: 200px;
    "
    :before-close="packetClose"
    :close-on-click-modal="false"
    :draggable="true"
  >
    <div>
      <el-card shadow="never" style="height: 80%">
        <div>
          <el-row :gutter="10">
            <el-col :span="7">
              <div>
                <el-row>
                  <el-col :span="6">
                    <div style="margin-top: 5px">
                      <span>网卡：</span>
                    </div>
                  </el-col>
                  <el-col :span="18">
                    <el-select
                      v-model="packetData.netName"
                      placeholder="请选择"
                      :filterable="true"
                    >
                      <el-option
                        v-for="(net, i) in nets"
                        :key="i"
                        :label="net.Name"
                        :value="net.Name"
                      />
                    </el-select>
                  </el-col>
                </el-row>
              </div>
            </el-col>
            <el-col :span="7">
              <div>
                <el-row>
                  <el-col :span="8">
                    <div style="margin-top: 5px">
                      <span>远端IP：</span>
                    </div>
                  </el-col>
                  <el-col :span="16">
                    <el-input
                      v-model="packetData.ip"
                      placeholder="请输入ip地址"
                    ></el-input>
                  </el-col>
                </el-row>
              </div>
            </el-col>
            <el-col :span="10">
              <div>
                <el-row>
                  <el-col :span="10">
                    <div style="margin-top: 5px">
                      <span>端口/端口范围：</span>
                    </div>
                  </el-col>
                  <el-col :span="14">
                    <el-input
                      v-model="packetData.port"
                      placeholder="请输入端口/端口范围"
                    ></el-input>
                    <span style="font-size: 11px; color: rgb(163, 163, 163)"
                      >端口范围示例：30000-40000</span
                    >
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
        </div>
        <div style="text-align: right; margin-top: 25px">
          <el-button
            type="primary"
            text
            style="border-radius: 13px"
            size="small"
            :disabled="start_butdisable"
            @click="
              over_butdisable = false;
              start_butdisable = true;
              checkPacketData();
            "
            >开始抓包</el-button
          >
          <el-button
            text
            style="border-radius: 13px"
            type="info"
            size="small"
            :disabled="over_butdisable"
            @click="
              start_butdisable = false;
              over_butdisable = true;
              stoppacket();
            "
            >结束抓包</el-button
          >
        </div>
      </el-card>
    </div>

    <div style="text-align: center">
      <el-button
        @click="
          packet_dialog = false;
          resetPackData();
        "
        style="margin-top: 20px"
        type="info"
        round
        >关闭</el-button
      >
    </div>
  </el-dialog>
  <!-- ping测试dialog -->
  <el-dialog
    v-model="icmp_dialog"
    title="icmp连通性测试"
    width="40%"
    style="
      height: 280px;
      border-radius: 15px;
      margin-left: 32%;
      margin-top: 200px;
    "
    :before-close="icmpClose"
    :close-on-click-modal="false"
    :draggable="true"
  >
    <div style="height: 170px">
      <el-row :gutter="10">
        <el-col :span="12">
          <el-card shadow="never" style="height: 90%">
            <div style="margin-top: -10px">
              <el-row>
                <el-col :span="19">
                  <div>
                    <el-row :gutter="5">
                      <el-col :span="10">
                        <div style="margin-top: 5px">
                          <span>远端IP：</span>
                        </div>
                      </el-col>
                      <el-col :span="14">
                        <el-input
                          v-model="icmpData.ip"
                          placeholder="请输入IP地址"
                        ></el-input>
                      </el-col>
                    </el-row>
                  </div>
                </el-col>
                <el-col :span="19">
                  <div style="margin-top: 5px">
                    <el-row :gutter="5">
                      <el-col :span="10">
                        <div style="margin-top: 5px">
                          <span>数据包：</span>
                        </div>
                      </el-col>
                      <el-col :span="14">
                        <el-input
                          v-model="icmpData.count"
                          placeholder="请输入数据包个数"
                        ></el-input>
                      </el-col>
                    </el-row>
                  </div>
                </el-col>
                <el-col :span="19">
                  <div style="margin-top: 5px">
                    <el-row :gutter="5">
                      <el-col :span="10">
                        <div style="margin-top: 5px">
                          <span>超时时间(s)：</span>
                        </div>
                      </el-col>
                      <el-col :span="14">
                        <el-input
                          v-model="icmpData.timeOut"
                          placeholder="请输入超时时间"
                        ></el-input>
                      </el-col>
                    </el-row>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card shadow="never" style="height: 90%">
            <div style="margin-top: -5px">
              <el-row :gutter="5">
                <el-col :span="12">
                  <div>
                    <el-row :gutter="5">
                      <el-col :span="24">
                        <div>
                          <el-row>
                            <el-col :span="12">
                              <div>
                                <span>发送：</span>
                              </div>
                            </el-col>
                            <el-col :span="12">
                              <el-text type="success">{{
                                icmpdata.sent
                              }}</el-text>
                            </el-col>
                          </el-row>
                        </div>
                      </el-col>
                      <el-col :span="24">
                        <div style="margin-top: 15px">
                          <el-row>
                            <el-col :span="12">
                              <div>
                                <span>接收：</span>
                              </div>
                            </el-col>
                            <el-col :span="12">
                              <el-text type="primary">{{
                                icmpdata.recv
                              }}</el-text>
                            </el-col>
                          </el-row>
                        </div>
                      </el-col>
                      <el-col :span="24">
                        <div style="margin-top: 15px">
                          <el-row>
                            <el-col :span="12">
                              <div>
                                <span>丢包：</span>
                              </div>
                            </el-col>
                            <el-col :span="12">
                              <el-text type="danger">{{
                                icmpdata.loss
                              }}</el-text>
                            </el-col>
                          </el-row>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div>
                    <el-row :gutter="5">
                      <el-col :span="24">
                        <div>
                          <el-row>
                            <el-col :span="12">
                              <div>
                                <span>最大延迟：</span>
                              </div>
                            </el-col>
                            <el-col :span="12">
                              <el-text type="primary">{{
                                toFixedFunc(icmpdata.max)
                              }}</el-text>
                            </el-col>
                          </el-row>
                        </div>
                      </el-col>
                      <el-col :span="24">
                        <div style="margin-top: 15px">
                          <el-row>
                            <el-col :span="12">
                              <div>
                                <span>最小延迟：</span>
                              </div>
                            </el-col>
                            <el-col :span="12">
                              <el-text type="success">{{
                                toFixedFunc(icmpdata.min)
                              }}</el-text>
                            </el-col>
                          </el-row>
                        </div>
                      </el-col>
                      <el-col :span="24">
                        <div style="margin-top: 15px">
                          <el-row>
                            <el-col :span="12">
                              <div>
                                <span>平均延迟：</span>
                              </div>
                            </el-col>
                            <el-col :span="12">
                              <el-text type="warning">{{
                                toFixedFunc(icmpdata.avg)
                              }}</el-text>
                            </el-col>
                          </el-row>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div style="text-align: center; margin-top: -35px">
      <el-button
        @click="
          icmp_dialog = false;
          resetIcmpData();
        "
        style="margin-top: 10px"
        type="info"
        round
        >关闭</el-button
      >
      <el-button
        @click="icmpCheckData()"
        style="margin-top: 10px"
        type="primary"
        round
        >开始</el-button
      >
    </div>
  </el-dialog>
  <!-- 端口测试dialog -->
  <el-dialog
    v-model="port_dialog"
    title="端口连通性测试"
    width="40%"
    style="
      height: 230px;
      border-radius: 15px;
      margin-left: 32%;
      margin-top: 200px;
    "
    :before-close="portClose"
    :close-on-click-modal="false"
    :draggable="true"
  >
    <div>
      <el-card shadow="never" style="height: 80%">
        <div>
          <el-row :gutter="10">
            <el-col :span="8">
              <div>
                <el-row>
                  <el-col :span="7">
                    <div style="margin-top: 5px">
                      <span>远端IP：</span>
                    </div>
                  </el-col>
                  <el-col :span="17">
                    <el-input
                      v-model="portData.ip"
                      placeholder="请输入远端IP"
                    ></el-input>
                  </el-col>
                </el-row>
              </div>
            </el-col>
            <el-col :span="11">
              <div>
                <el-row>
                  <el-col :span="2"></el-col>
                  <el-col :span="12">
                    <div style="margin-top: 5px">
                      <span>端口(目前仅支持TCP)：</span>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <el-input
                      v-model="portData.tcpPort"
                      placeholder="请输入端口"
                    ></el-input>
                  </el-col>
                </el-row>
              </div>
            </el-col>
            <el-col :span="5">
              <div>
                <el-row>
                  <el-col :span="5"></el-col>
                  <el-col :span="8">
                    <div style="margin-top: 5px">
                      <span>状态：</span>
                    </div>
                  </el-col>
                  <el-col :span="5">
                    <div
                      v-if="portStatus == 1"
                      style="
                        border-radius: 50%;
                        background-color: rgb(13, 175, 13);
                        height: 15px;
                        width: 15px;
                        margin-top: 7px;
                      "
                    ></div>
                    <div
                      v-if="portStatus == 2"
                      style="
                        border-radius: 50%;
                        background-color: red;
                        height: 15px;
                        width: 15px;
                        margin-top: 7px;
                      "
                    ></div>
                    <div
                      v-if="portStatus == 0"
                      style="
                        border-radius: 50%;
                        background-color: rgb(99, 98, 98);
                        height: 15px;
                        width: 15px;
                        margin-top: 7px;
                      "
                    ></div>
                  </el-col>
                  <el-col :span="5"></el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </div>

    <div style="text-align: center">
      <el-button
        @click="
          port_dialog = false;
          resetPortData();
        "
        style="margin-top: 20px"
        type="info"
        round
        >关闭</el-button
      >
      <el-button
        @click="portCheckData()"
        style="margin-top: 20px"
        type="primary"
        round
        >开始</el-button
      >
    </div>
  </el-dialog>
</template>
<script>
import { getAllClusters } from "@/api/cluster/cluster";
import {
  getInterface,
  icmpFunc,
  startPacket,
  stopPacket,
  portFunc,
} from "@/api/interface/interface";
import { getNodesReq, getNodeDetailsReq } from "@/api/nodes/nodes";
import Cookies from "js-cookie";
export default {
  data() {
    return {
      nodeinfo_dialog: false,
      portStatus: 0,
      port_dialog: false,
      icmp_dialog: false,
      start: true,
      over_butdisable: true,
      start_butdisable: false,
      packet_dialog: false,
      searchValue: "",
      namespaceList: "",
      namespaceValue: "",
      clus: "",
      cluName: "",
      indexArr: "",
      getClusterData: {
        filterName: "",
        page: 10000,
        limit: 10000,
      },
      getNodeData: {
        filterName: "",
        page: "",
        limit: "",
      },
      currentPage: 1,
      pagesize: 10,
      small: true,
      pageList: [10, 20, 30, 40],
      nodeTotal: 0,
      disabled: false,
      nodeList: [],
      apploading: false,
      expandKeys: [],
      packetData: {
        netName: "any", //默认值
        ip: "",
        port: "",
      },
      nets: [],
      host: "",
      icmpData: {
        ip: "",
        timeOut: "",
        count: "",
      },
      icmpdata: {
        max: "0.00",
        min: "0.00",
        avg: "0.00",
        sent: 0,
        recv: 0,
        loss: 0,
      },
      portData: {
        ip: "",
        tcpPort: "",
      },
      node: {
        arch: "",
        docker_v: "",
        kernel_v: "",
        kubelet_v: "",
        kubeProxy_v: "",
        OS: "",
        OS_type: "",
        create_time: "",
        ip: "",
      },
      OS_info: {},
      OS_key: [
        "系统架构",
        "Docker 版本",
        "内核版本",
        "Kubelet 版本",
        "Kube 代理版本",
        "操作系统映像",
        "系统类型",
      ],
      OS_value: [],
      //标签
      labels: {},
      labels_key: [],
      labels_val: [],
      //注释
      annotations: {},
      annotations_key: [],
      annotations_val: [],
      //污点
      taints: [],
      taints_keys: [],
      taints_vals: [],
      activeNames: ["1"],
      nodeName: "",
    };
  },
  methods: {
    //控制字符串长度
    ellipsis(str) {
      // 判断lables的长度是否大于15，为true则0-20位正常显示，之后的显示...，为false则直接返回值
      return str.length > 90 ? str.substring(0, 90) + "..." : str;
    },
    resetNodeInfo() {
      this.node = {
        arch: "",
        docker_v: "",
        kernel_v: "",
        kubelet_v: "",
        kubeProxy_v: "",
        OS: "",
        OS_type: "",
        create_time: "",
        ip: "",
      };
      this.OS_info = {};
      this.OS_value = [];
      //标签
      this.labels = {};
      this.labels_key = [];
      this.labels_val = [];
      //注释
      this.annotations = {};
      this.annotations_key = [];
      this.annotations_val = [];
      //污点
      this.taints = [];
      this.taints_keys = [];
      this.taints_vals = [];
      this.activeNames = ["1"];
      this.nodeName = "";
    },
    addtaints() {
      let i = 0;
      for (i in this.taints) {
        console.log("xxx", this.taints[i]);
        this.objsadd(this.taints[i], this.taints_keys, this.taints_vals);
      }
      // console.log("keysL: ", this.taints_keys);
      // console.log("keysL: ", this.taints_vals);
    },
    osinfoadd() {
      let i = 0;
      for (let v in this.node) {
        if (i == 7) {
          //console.log("os_value数组复制完成：", this.OS_value);
          return;
        }
        this.OS_value.push(this.node[v]);
        //console.log("第", i, "次赋值：", this.node[v]);
        i = i + 1;
      }
    },
    //组装key，val数组
    objsadd(obj, keys, vals) {
      for (let key in obj) {
        // console.log("key: ", key);
        // console.log("val: ", this.labels[key]);
        keys.push(key);
        if (obj[key] == "") {
          vals.push("-");
        } else {
          vals.push(obj[key]);
        }
      }
    },
    nodeClose() {
      this.nodeinfo_dialog = false;
      this.resetNodeInfo();
    },
    //node详情
    getNodeDetail(nodeName) {
      this.nodeName = nodeName;
      // return
      getNodeDetailsReq(this.cluName, this.nodeName)
        .then((res) => {
          console.log("node详情为：", res.data);
          this.node.ip = res.data.status.addresses[0].address;
          this.node.create_time = this.timeTrans(
            res.data.metadata.creationTimestamp
          );
          this.node.kubelet_v = res.data.status.nodeInfo.kubeletVersion;
          this.node.kubeProxy_v = res.data.status.nodeInfo.kubeProxyVersion;
          this.node.OS = res.data.status.nodeInfo.osImage;
          this.node.kernel_v =
            res.data.status.nodeInfo.kernelVersion.split("-")[0];
          this.node.docker_v =
            res.data.status.nodeInfo.containerRuntimeVersion.replace(
              "docker://",
              ""
            );
          this.node.arch = res.data.status.nodeInfo.architecture;
          this.node.OS_type = res.data.status.nodeInfo.operatingSystem;
          this.osinfoadd();
          this.labels = res.data.metadata.labels;
          console.log("获取标签：", this.labels);
          this.objsadd(this.labels, this.labels_key, this.labels_val);
          this.annotations = res.data.metadata.annotations;
          this.objsadd(
            this.annotations,
            this.annotations_key,
            this.annotations_val
          );
          for (let i in res.data.spec.taints) {
            this.taints.push(res.data.spec.taints[i]);
            //console.log("污点数组：", this.taints[0].effect);
          }
          this.addtaints();
        })
        .catch((res) => {
          console.log("报错为：", res.err);
        });
    },
    portClose() {
      this.port_dialog = false;
      this.resetPortData();
    },
    resetPortData() {
      this.portData = {
        ip: "",
        tcpPort: "",
      };
      this.portStatus = 0;
    },
    //端口连通性数据检测
    portCheckData() {
      if (this.portData.ip != "" && this.portData.tcpPort != "") {
        this.portfunc();
      } else {
        this.$message.error({
          message: "缺少必要参数，请补充所缺参数",
        });
      }
    },
    //端口连通性测试
    portfunc() {
      // this.$message.success({
      //   message: "开始port连通性测试",
      // });
      portFunc(this.cluName, this.host, this.portData)
        .then((res) => {
          console.log("端口测试成功：", res);
          this.portStatus = 1;
        })
        .catch((res) => {
          // console.log("端口测试失败：", res);
          if (!res.err.includes("TCP 连接失败:")) {
            this.$message.error({
              message: res.err,
            });
          }
          this.portStatus = 2;
        });
    },
    //保留小数点后两位
    toFixedFunc(str) {
      console.log("str:", str);
      let newnum;
      //取出小数段
      const nummatch = str.match(/(\d+(\.\d+)?)/);
      if (nummatch && nummatch.length > 0) {
        console.log("延迟数字段：", nummatch[0]);
        newnum = parseFloat(nummatch[0]).toFixed(2);
      }
      //取出单位段(u)
      const umatch = str.match(/(µ)/u);
      if (umatch && umatch.length > 0) {
        newnum = newnum + umatch[0];
      }
      //取出单位段(ms/s)
      const optmatch = str.match(/[a-zA-Z]+$/);
      if (optmatch && optmatch.length > 0) {
        console.log("单位：", optmatch[0]);
        newnum = newnum + optmatch[0]; //有单位的情况下才加上单位
      }
      return newnum;
    },
    icmpClose() {
      this.icmp_dialog = false;
      this.resetIcmpData();
    },
    //重置icmp相关数据
    resetIcmpData() {
      this.icmpData.ip = "";
      this.icmpData.timeOut = "";
      this.icmpData.count = "";
      this.host = "";
      this.icmpdata = {
        max: "0.00",
        min: "0.00",
        avg: "0.00",
        sent: 0,
        recv: 0,
        loss: 0,
      };
    },
    //获取地址
    getHost(ip) {
      this.host = ip;
      this.host = this.host + ":8888";
    },
    //icmp数据检查
    icmpCheckData() {
      if (
        this.icmpData.ip != "" &&
        this.icmpData.count != "" &&
        this.icmpData.timeOut != ""
      ) {
        this.icmpFunc();
      } else {
        this.$message.error({
          message: "缺少必要参数，请补充所缺参数",
        });
      }
    },
    //icmp测试
    icmpFunc() {
      this.$message.success({
        message: "开始ICMP连通性测试",
      });
      icmpFunc(this.cluName, this.host, this.icmpData)
        .then((res) => {
          console.log("ping获取到:", res.data);
          this.icmpdata = res.data;
          this.$message.success({
            message: "ICMP连通性测试完成",
          });
        })
        .catch((res) => {
          console.log("ping失败:", res);
          this.$message.error({
            message: res.err,
          });
        });
    },
    //检查抓包数据
    checkPacketData() {
      if (this.packetData.ip != "" || this.packetData.port != "") {
        this.startpacket();
      } else {
        this.$message.error({
          message: "请至少指定ip或port任意一个参数",
        });
        this.start_butdisable = false;
        this.over_butdisable = true;
      }
    },
    //启动抓包
    startpacket() {
      startPacket(this.cluName, this.host, this.packetData)
        .then((res) => {
          this.$message.success({
            message: res.msg,
          });
        })
        .catch((res) => {
          this.$message.error({
            message: res["err"],
          });
        });
    },
    //停止抓包
    stoppacket() {
      this.$message.success({
        message: "开始下载pcap数据包。。。",
      });
      stopPacket(this.cluName, this.host)
        .then((response) => {
          // console.log("停止成功：", response);
          // 创建下载链接
          const url = window.URL.createObjectURL(
            new Blob([response], { type: "application/vnd.tcpdump.pcap" })
          );
          const link = document.createElement("a");
          link.href = url;
          link.download =
            this.cluName + "-" + this.host.split(":")[0] + ".pcap";
          document.body.appendChild(link);

          // 模拟点击下载链接
          link.click();

          // 清理资源
          window.URL.revokeObjectURL(url);
          document.body.removeChild(link);
          // this.download_info = "";
        })
        .catch((_) => {
          this.$message.error({
            // message: "下载失败，请检查是否文件过大或资源不足导致",
            message: "下载pcap文件失败",
          });
        });
    },
    //获取所有网卡
    getInterfaces(ip) {
      this.host = ip + ":8888";
      getInterface(this.cluName, this.host)
        .then((res) => {
          console.log("网卡列表为：", res.data);
          this.nets = res.data;
        })
        .catch((res) => {
          this.$message.error({
            message: res.err,
          });
        });
    },
    resetPackData() {
      this.packetData.netName = "any";
      this.packetData.ip = "";
      this.packetData.port = "";
      this.over_butdisable = true;
      this.start_butdisable = false;
      this.host = "";
    },
    packetClose() {
      this.packet_dialog = false;
      this.resetPackData();
    },
    //抓包
    packetFunc() {
      this.$message.success({
        message: "开始抓包",
      });
    },
    //node分页
    handleSizeChange(size) {
      console.log(`每页 ${size} 条`);
      this.pagesize = size;
      this.getNodes();
    },
    handleCurrentChange(page) {
      this.currentPage = page;
      console.log("当前页: ", this.currentPage);
      this.getNodes();
    },
    //换算内存信息
    jsmem(memnum) {
      let mem = memnum.replace("Ki", "");
      //console.log("整理好的内存为：", mem);
      return Math.round(mem / 1024 / 1024);
    },
    //转换时间戳
    timeTrans(timestamp) {
      let date = new Date(new Date(timestamp).getTime() + 8 * 3600 * 1000);
      date = date.toJSON();
      date = date.substring(0, 19).replace("T", " ");
      return date;
    },
    //获取所有集群
    getAllClus() {
      this.getClusterData.filterName = "";
      this.getClusterData.page = 1;
      this.getClusterData.limit = 10000;
      getAllClusters(this.getClusterData)
        .then((res) => {
          console.log("获取所有集群：", res.data);
          this.clus = res.data;
          // localStorage.setItem("cluName",this.clus[0].cluster_name)
        })
        .catch((res) => {
          console.error("获取集群失败：", res.err);
        });
    },
    //获取所有node
    getNodes() {
      this.apploading = true;
      this.getNodeData.filterName = this.searchValue;
      this.getNodeData.limit = this.pagesize;
      this.getNodeData.page = this.currentPage;
      getNodesReq(
        this.cluName,
        this.getNodeData.filterName,
        this.getNodeData.limit,
        this.getNodeData.page
      )
        .then((res) => {
          console.log("获取到node：", res.data.items);
          this.nodeList = res.data.items;
          this.nodeTotal = res.data.total;
        })
        .catch((res) => {
          console.error("报错为：", res);
          this.$message.error({
            message:res.err
          })
        })
        .finally((_) => {
          this.apploading = false;
        });
    },
  },
  watch: {
    cluName: {
      handler() {
        console.log("当前集群：", this.cluName);
        //判断是否在pod页面切换集群了
        if (this.cluName != Cookies.get("cluName")) {
          //如果切换集群了则将namespace置空，并更新cookie
          Cookies.set("cluName", this.cluName);
        }

        this.getNodes();
      },
    },
  },
  beforeMount() {
    //获取集群名
    this.cluName = this.$route.query.clusterName;
    if (!this.cluName) {
      this.cluName = Cookies.get("cluName");
    }

    console.log("old: ", Cookies.get("oldCluName"), " new:", this.cluName);
    if (this.cluName != Cookies.get("oldCluName")) {
      localStorage.setItem("namespace", "");
      //存储旧集群
      Cookies.set("oldCluName", this.cluName);
    }

    console.log("node页集群名：", this.cluName);
    this.getAllClus();
    this.getNodes();
  },
};
</script>
<style scoped>
.dataCard {
  height: 650px;
  overflow: auto; /* 自动开启滚动条 */
  max-height: 650px; /* 设置最大高度 */
}
.icon {
  width: 25px;
  height: 25px;
  padding-top: 7px;
  cursor: pointer;
}
.nodeicon {
  width: 20px;
  height: 20px;
  padding-left: 15px;
}
.icon {
  width: 25px;
  height: 25px;
  padding-top: 7px;
  cursor: pointer;
}
.icon:hover {
  opacity: 0.7;
}
.icon:active {
  opacity: 1;
}
.row-col-card {
  margin-bottom: 5px;
  height: 10%;
}

.head-card-span {
  font-size: 12px;
  color: rgb(145, 143, 143);
}
.head-card-span2 {
  font-size: 13px;
}
.el-collapse-item__header {
  justify-content: flex-start;
}
.card-div {
  width: 1600px;
  height: 50px;
  background: #78c9cf;
  border: 1px solid #8bd1d6;
  margin-left: auto;
  margin-right: auto;
}
.heard-card {
  display: flex;
  justify-content: center;
}
.card-div-div {
  width: 530px;
  background-color: #8bd1d6;
  text-align: center;
}
.card-div-right-boder {
  border-right: 2px solid #78c9cf;
}
.card-child-card {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.carddiv {
  /* width: 530px; */
  width: 800vh;
  background-color: #78c9cf;
  height: 70px;
  border: 1px solid #8bd1d6;
}
.el-container {
  margin-left: auto;
  margin-right: auto;
  height: 100vh;
  width: 100%;
}
.el-mian-div {
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  /* height: 100vh; */
  width: 99%;
}
.el-head-div {
  margin-left: auto;
  margin-right: auto;
  width: 99%;
}
.nodeInfoCard {
  height: 700px;
  overflow: auto; /* 自动开启滚动条 */
  max-height: 700; /* 设置最大高度 */
}
</style>
