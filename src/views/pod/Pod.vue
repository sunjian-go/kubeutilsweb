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
                  <el-col :span="14">
                    <div>
                      <span>命名空间：</span>
                      <!-- filterable: 可以输入 -->
                      <el-select
                        v-model="namespaceValue"
                        placeholder="请选择"
                        :filterable="true"
                      >
                        <el-option
                          v-for="(scope, i) in namespaceList"
                          :key="i"
                          :label="scope.metadata.name"
                          :value="scope.metadata.name"
                        />
                      </el-select>
                    </div>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="9"></el-col>
              <el-col :span="3">
                <div style="padding-left: 30%">
                  <el-row>
                    <el-col :span="3">
                      <el-badge :value="indexArr.length" class="item">
                        <svg
                          @click="jindustatus = true"
                          t="1703559806178"
                          class="icon"
                          viewBox="0 0 1024 1024"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          p-id="39018"
                          width="200"
                          height="200"
                        >
                          <path
                            d="M512 260.266667l42.666667 262.4c0 21.333333-19.2 36.266667-42.666667 36.266666s-42.666667-17.066667-42.666667-36.266666"
                            fill="#4C64FE"
                            p-id="39019"
                          ></path>
                          <path
                            d="M488.533333 85.333333C264.533333 98.133333 85.333333 285.866667 85.333333 509.866667c0 155.733333 81.066667 290.133333 204.8 364.8 23.466667 14.933333 51.2-2.133333 51.2-29.866667V832c0-14.933333-6.4-29.866667-19.2-38.4-34.133333-23.466667-64-51.2-87.466666-85.333333 23.466667-8.533333 36.266667-34.133333 27.733333-57.6-8.533333-25.6-34.133333-38.4-59.733333-32l-12.8 6.4c-14.933333-40.533333-21.333333-85.333333-19.2-132.266667 2.133333-32 8.533333-64 19.2-91.733333 10.666667 8.533333 27.733333 10.666667 42.666666 6.4 25.6-8.533333 38.4-34.133333 32-59.733334-4.266667-14.933333-17.066667-25.6-29.866666-29.866666 53.333333-76.8 136.533333-130.133333 232.533333-142.933334 0 4.266667 0 8.533333 2.133333 12.8 8.533333 25.6 34.133333 38.4 59.733334 32 19.2-6.4 32-23.466667 34.133333-44.8 98.133333 12.8 183.466667 70.4 236.8 149.333334-14.933333 12.8-23.466667 32-17.066667 51.2 8.533333 23.466667 32 38.4 57.6 32 10.666667 32 17.066667 68.266667 17.066667 104.533333 0 40.533333-6.4 76.8-19.2 113.066667-10.666667-6.4-25.6-10.666667-40.533333-6.4-25.6 8.533333-38.4 34.133333-32 59.733333 4.266667 14.933333 14.933333 23.466667 27.733333 29.866667-23.466667 34.133333-55.466667 64-89.6 87.466666-12.8 8.533333-19.2 21.333333-19.2 36.266667v12.8c0 27.733333 29.866667 44.8 55.466667 29.866667 121.6-74.666667 200.533333-209.066667 200.533333-362.666667C938.666667 268.8 733.866667 72.533333 488.533333 85.333333z"
                            fill="#4C64FE"
                            opacity=".6"
                            p-id="39020"
                          ></path>
                          <path
                            d="M661.333333 142.933333c0-19.2-12.8-36.266667-29.866666-40.533333-44.8-12.8-93.866667-19.2-142.933334-17.066667C264.533333 98.133333 85.333333 285.866667 85.333333 509.866667c0 155.733333 81.066667 290.133333 204.8 364.8 23.466667 14.933333 51.2-2.133333 51.2-29.866667V832c0-14.933333-6.4-29.866667-19.2-38.4-34.133333-23.466667-64-51.2-87.466666-85.333333-34.133333-40.533333-44.8-83.2-44.8-83.2-14.933333-40.533333-21.333333-85.333333-19.2-132.266667 2.133333-32 8.533333-64 19.2-91.733333 0 0 8.533333-40.533333 44.8-83.2 53.333333-76.8 136.533333-130.133333 232.533333-142.933334 0 0 49.066667-10.666667 96 0 14.933333 2.133333 29.866667 4.266667 44.8 8.533334 27.733333 8.533333 53.333333-10.666667 53.333333-40.533334z"
                            fill="#4C64FE"
                            p-id="39021"
                          ></path>
                        </svg>
                      </el-badge>
                    </el-col>
                    <el-col :span="5"></el-col>
                    <el-col :span="15">
                      <el-button type="" @click="refulshButton()">
                        <el-icon><RefreshLeft /></el-icon>
                        <span>刷新</span>
                      </el-button>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </div>
      </el-col>
      <!-- 数据表格 -->
      <el-col :span="24">
        <div>
          <el-card
            class="dataCard"
            shadow="never"
            :body-style="{ padding: '10px' }"
            style="height: 100%"
          >
            <div>
              <!-- row-key 用来定义行数据的key，结合expand-row-keys使用，往expandKeys中增加key来展开行 ,getRowKeys方法里面自带一个参数代表当前行对象-->
              <!-- expand-row-keys 展开的行的key数组,只有在 expand-row-keys 中的行才会被默认展开 -->
              <!-- expand-change 展开触发时，调用这个方法;该方法自动传入两个参数，分别是当前行对象，和当前展开行的数组 ，属于原生功能-->
              <el-table
                :data="podList"
                style="width: 100%"
                v-loading="apploading"
                :row-key="getRowKeys"
                :expand-row-keys="expandKeys"
                @expand-change="expandChange"
              >
                <el-table-column width="20" />
                <el-table-column label="Pod" align="left">
                  <template v-slot="scope">
                    <span
                      style="color: rgb(62, 165, 233)"
                      class="deploy-body-deployname"
                      >{{ scope.row.metadata.name }}</span
                    >
                  </template>
                </el-table-column>
                <el-table-column label="节点" align="center">
                  <template v-slot="scope">
                    <el-tag>{{ scope.row.spec.nodeName }}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column label="状态" align="center">
                  <template v-slot="scope">
                    <el-tag
                      type="success"
                      v-if="scope.row.status.phase == 'Running'"
                      >{{ scope.row.status.phase }}</el-tag
                    >
                    <el-tag
                      type="warning"
                      v-else-if="scope.row.status.phase == 'Pending'"
                      >{{ scope.row.status.phase }}</el-tag
                    >
                    <el-tag
                      type="delete"
                      v-else-if="
                        scope.row.status.phase != 'Pending' || 'Running'
                      "
                      >{{ scope.row.status.phase }}</el-tag
                    >
                  </template>
                </el-table-column>
                <el-table-column label="重启数" align="center">
                  <template v-slot="scope">
                    <span>{{ getPodRestartNum(scope.row) }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="创建时间" align="center">
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
                              termal_dialog = true;
                              initSocket(scope.row);
                            "
                            >执行命令行
                            <svg
                              t="1703493260359"
                              class="podicon"
                              viewBox="0 0 1024 1024"
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              p-id="11412"
                              width="200"
                              height="200"
                            >
                              <path
                                d="M917.504 835.584H106.496V188.416h810.496l0.512 647.168zM186.88 755.2h650.752v-486.4H186.88v486.4z"
                                fill="#2B85FB"
                                p-id="11413"
                              ></path>
                              <path
                                d="M343.04 648.704l-56.32-56.32 88.064-88.064L286.72 415.744l56.32-56.832 144.896 144.896L343.04 648.704z m163.84-63.488h230.4v79.872H506.88v-79.872z"
                                fill="#2B85FB"
                                p-id="11414"
                              ></path>
                            </svg>
                          </el-dropdown-item>
                          <el-dropdown-item
                            @click="
                              log_dialog = true;
                              initGetLogSocket(scope.row);
                            "
                            >查看日志
                            <svg
                              style="margin-left: 14px"
                              t="1703493427442"
                              class="podicon"
                              viewBox="0 0 1024 1024"
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              p-id="12409"
                              width="200"
                              height="200"
                            >
                              <path
                                d="M282.92608 309.46304h433.152c34.304 0 61.952 27.648 61.952 61.952v402.432c0 34.304-27.648 61.952-61.952 61.952h-433.152c-34.304 0-61.952-27.648-61.952-61.952v-402.432c0-34.304 28.16-61.952 61.952-61.952z"
                                fill="#CAE4FF"
                                p-id="12410"
                              ></path>
                              <path
                                d="M320.30208 305.87904c19.456 0 35.328-15.872 35.328-35.328v-140.8c0-19.456-15.872-35.328-35.328-35.328-19.456 0-35.328 15.872-35.328 35.328v140.8c0 19.456 15.872 35.328 35.328 35.328z m176.128 0c19.456 0 35.328-15.872 35.328-35.328v-140.8c0-19.456-15.872-35.328-35.328-35.328-19.456 0-35.328 15.872-35.328 35.328v140.8c0.512 19.456 15.872 35.328 35.328 35.328z m-105.472-143.872h35.328v70.656h-35.328v-70.656z m176.128 0h35.328v70.656h-35.328v-70.656z m352.256 674.304v-572.416c0-58.368-47.104-105.984-105.472-105.984h-70.656v70.656h70.656c19.456 0 35.328 15.872 35.328 35.328v572.416c0 19.456-15.872 35.328-35.328 35.328h-634.368c-19.456 0-35.328-15.872-35.328-35.328h-0.512l0.512-572.416c0-19.456 15.872-35.328 35.328-35.328h70.656v-70.144h-70.656c-58.368 0-105.472 47.104-105.472 105.472v572.416c0 58.368 47.104 105.472 105.472 105.984h633.856c56.32 0 102.4-44.032 105.472-100.352 0-0.512 0.512-0.512 0.512-1.024v-4.608z m-246.784-530.432c19.456 0 35.328-15.872 35.328-35.328v-140.8c0-19.456-15.872-35.328-35.328-35.328-19.456 0-35.328 15.872-35.328 35.328v140.8c0.512 19.456 15.872 35.328 35.328 35.328z m-388.096 141.312h422.912c19.456 0 35.328-15.872 35.328-35.328 0-19.456-15.872-35.328-35.328-35.328h-422.912c-19.456 0-35.328 15.872-35.328 35.328 0 19.456 15.872 35.328 35.328 35.328z m422.912 103.424h-422.912c-19.456 0-35.328 15.872-35.328 35.328s15.872 35.328 35.328 35.328h422.912c19.456 0 35.328-15.872 35.328-35.328s-15.872-35.328-35.328-35.328z m0 180.736h-422.912c-19.456 0-35.328 15.872-35.328 35.328 0 19.456 15.872 35.328 35.328 35.328h422.912c19.456-1.024 34.304-17.408 33.28-36.864-0.512-18.432-14.848-32.768-33.28-33.792z"
                                fill="#0972E7"
                                p-id="12411"
                              ></path>
                            </svg>
                          </el-dropdown-item>
                          <el-dropdown-item
                            :disabled="disabled_upload"
                            @click="
                              dialogVisible = true;
                              disabled_upload = true;
                              getcontainers(scope.row);
                            "
                            >上传文件
                            <svg
                              style="margin-left: 14px"
                              t="1703494419258"
                              class="podicon"
                              viewBox="0 0 1024 1024"
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              p-id="27886"
                              width="200"
                              height="200"
                            >
                              <path
                                d="M896 576c-17.7 0-32 14.3-32 32v137.8c0 22.9-9 44.5-25.3 60.8s-38 25.4-60.9 25.4H246.2c-22.9 0-44.5-9-60.8-25.3-16.4-16.4-25.4-38-25.4-60.9V608c0-17.7-14.3-32-32-32s-32 14.3-32 32v137.8C96 828.6 163.4 896 246.2 896h531.7c82.8 0 150.2-67.4 150.2-150.2V608c-0.1-17.7-14.4-32-32.1-32z"
                                fill="#1875F0"
                                p-id="27887"
                              ></path>
                              <path
                                d="M422.6 294.6l57.4-57.4v402.7c0 17.6 14.4 32 32 32s32-14.4 32-32V237.2l57.4 57.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-6.2 6.2-9.4 14.4-9.4 22.6 0 8.2 3.1 16.4 9.4 22.6 12.5 12.6 32.7 12.6 45.2 0.1z"
                                fill="#1875F0"
                                p-id="27888"
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
                        ><el-button type="" @click="getPodList()"
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
            :total="podTotal"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-col>
    </el-row>
  </div>

  <!-- 上传文件dialog -->
  <el-dialog
    v-model="dialogVisible"
    title="上传文件到容器内"
    width="30%"
    :before-close="dia_close"
    :close-on-click-modal="false"
    style="border-radius: 15px"
  >
    <div>
      <el-row :gutter="10">
        <el-col :span="12"> <span> 选择容器 </span></el-col>
        <el-col :span="12"> 选择文件 </el-col>
        <el-col :span="12">
          <el-card shadow="never">
            <div style="padding-top: 5px">
              <span>容器名</span>
              <div>
                <el-select
                  v-model="podinfo.containerName"
                  placeholder="请选择容器"
                  @blur="getContainerpath('/')"
                >
                  <el-option
                    v-for="(v, i) in containerList"
                    :key="i"
                    :label="v"
                    :value="v"
                  />
                </el-select>
              </div>
            </div>
            <div style="margin-top: 35px">
              <span>路径</span>
              <div>
                <el-select v-model="podinfo.path" placeholder="请选择路径">
                  <el-option
                    v-for="(v, i) in paths"
                    :key="i"
                    :label="v"
                    :value="v"
                  />
                </el-select>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <div>
            <el-upload
              ref="uploadRef"
              v-model:file-list="uploadFiles"
              drag
              :action="uploadUri"
              multiple
              :auto-upload="false"
              :on-success="uploadSuccess"
              :on-error="uploadError"
              :on-progress="uploadProgress"
            >
              <el-icon class="el-icon--upload"><upload-filled /></el-icon>
              <div class="el-upload__text">
                在此删除文件或 <em>点击上传</em>
              </div>
              <template #tip>
                <div v-for="i in uploadFiles" :key="i">
                  <span>{{ uploadFiles[i] }}</span>
                </div>
              </template>
            </el-upload>
          </div>
        </el-col>
      </el-row>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button
          style="border-radius: 15px"
          @click="
            dialogVisible = false;
            resetData();
            disabled_upload = false;
          "
          >取消</el-button
        >
        <el-button
          type="primary"
          @click="handleSubmit"
          style="border-radius: 15px"
        >
          上传文件
        </el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 进度条dialog -->
  <el-dialog
    v-model="jindustatus"
    title="上传进度"
    width="25%"
    style="margin-left: 73%; border-radius: 15px"
    :before-close="handleCloseProgress"
  >
    <div v-for="(file, i) in filesArr" :key="i">
      <div v-if="filesArr[i] != ''">
        <el-row>
          <el-col :span="22">
            <span>文件：{{ file }}</span>
            <el-progress :percentage="uoloadFileProgress[i]" color="#409eff" />
          </el-col>
          <el-col :span="2">
            <div style="padding-top: 8px">
              <svg
                @click="cancelUpload(file)"
                style="width: 18px; height: 18px"
                t="1703659247887"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="39988"
                width="200"
                height="200"
              >
                <path
                  d="M385.3 340.3c-11.5 0-23.1 4.4-31.8 13.1-17.5 17.5-17.5 46.1 0 63.6L607 670.5c8.8 8.8 20.3 13.1 31.8 13.1s23.1-4.4 31.8-13.1c17.5-17.5 17.5-46.1 0-63.6L417.1 353.4c-8.8-8.7-20.3-13.1-31.8-13.1z"
                  fill="#91B1D5"
                  p-id="39989"
                ></path>
                <path
                  d="M638.7 340.3c-11.5 0-23.1 4.4-31.8 13.1L353.4 606.9c-17.5 17.5-17.5 46.1 0 63.6 8.8 8.8 20.3 13.1 31.8 13.1s23.1-4.4 31.8-13.1L670.5 417c17.5-17.5 17.5-46.1 0-63.6-8.7-8.7-20.2-13.1-31.8-13.1z"
                  fill="#91B1D5"
                  p-id="39990"
                ></path>
                <path
                  d="M512 136.3c50.7 0 99.9 9.9 146.2 29.5 44.7 18.9 84.9 46 119.5 80.6 34.5 34.5 61.6 74.7 80.6 119.5 19.6 46.3 29.5 95.5 29.5 146.2s-9.9 99.9-29.5 146.2c-18.9 44.7-46 84.9-80.6 119.5-34.5 34.5-74.7 61.6-119.5 80.6-46.3 19.6-95.5 29.5-146.2 29.5s-99.9-9.9-146.2-29.5c-44.7-18.9-84.9-46-119.4-80.6-34.5-34.5-61.6-74.7-80.6-119.5-19.6-46.3-29.5-95.5-29.5-146.2s9.9-99.9 29.5-146.2c18.9-44.7 46-84.9 80.6-119.5 34.5-34.5 74.7-61.6 119.4-80.6 46.3-19.6 95.5-29.5 146.2-29.5m0-70C265.9 66.3 66.3 265.9 66.3 512S265.9 957.7 512 957.7 957.7 758.1 957.7 512 758.1 66.3 512 66.3z"
                  fill="#91B1D5"
                  p-id="39991"
                ></path>
              </svg>
            </div>
          </el-col>
        </el-row>
        <!-- <el-button ">取消上传</el-button> -->
        <el-divider />
      </div>
    </div>
    <template #footer>
      <div style="text-align: center">
        <span
          @click="
            history_dialog = true;
            jindustatus = false;
            GetUploadHistory();
          "
          style="cursor: pointer; color: rgb(63, 111, 245); font-size: 13px"
        >
          <!-- <el-button @click="jindustatus = false">Cancel</el-button>
        <el-button type="primary" @click="jindustatus = false">
          Confirm
        </el-button> -->
          查看更多
        </span>
      </div>
    </template>
  </el-dialog>
  <!-- 命令行dialog -->
  <el-dialog
    v-model="termal_dialog"
    title="Terminal"
    width="80%"
    style="
      height: 800px;
      border-radius: 15px;
      margin-left: 15%;
      margin-top: 50px;
    "
    :before-close="terminalClose"
    :close-on-click-modal="false"
    :draggable="true"
  >
    <div>
      <div id="xterm" style="height: 630px"></div>
      <span class="breathing-text" :style="{ opacity: opacity }">{{
        download_info
      }}</span>
    </div>
    <template #footer>
      <div style="text-align: center; margin-top: -20px">
        <el-row :gutter="10">
          <el-col :span="12" style="text-align: right">
            <el-button
              @click="
                termal_dialog = false;
                closeSocket();
              "
              style="border-radius: 10px"
              type="warning"
              >关闭</el-button
            >
          </el-col>
          <el-col :span="12" style="text-align: left; padding-top: 7px">
            <svg
              @click="download_dialog = true"
              style="margin-left: 14px"
              t="1703494375498"
              class="podicon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="26900"
              width="200"
              height="200"
            >
              <path
                d="M896 576c-17.7 0-32 14.3-32 32v137.8c0 22.9-9 44.5-25.3 60.8s-38 25.4-60.9 25.4H246.2c-22.9 0-44.5-9-60.8-25.3-16.4-16.4-25.4-38-25.4-60.9V608c0-17.7-14.3-32-32-32s-32 14.3-32 32v137.8C96 828.6 163.4 896 246.2 896h531.7c82.8 0 150.2-67.4 150.2-150.2V608c-0.1-17.7-14.4-32-32.1-32z"
                fill="#1875F0"
                p-id="26901"
              ></path>
              <path
                d="M489.4 662.6c12.5 12.5 32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L544 562.7V160c0-17.6-14.4-32-32-32s-32 14.4-32 32v402.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3 0-6.2 6.2-9.4 14.4-9.4 22.6s3.1 16.4 9.4 22.6l112.1 112.1z"
                fill="#1875F0"
                p-id="26902"
              ></path>
            </svg>
          </el-col>
        </el-row>

        <!-- <el-button @click="download_dialog = true"> 下载文件 </el-button> -->
      </div>
    </template>
  </el-dialog>
  <!-- 日志dialog -->
  <el-dialog
    v-model="log_dialog"
    title="Log"
    width="80%"
    style="
      height: 800px;
      border-radius: 15px;
      margin-left: 15%;
      margin-top: 50px;
    "
    :close-on-click-modal="false"
    :draggable="true"
  >
    <div>
      <div id="logger" style="height: 630px"></div>
    </div>
    <template #footer>
      <div style="text-align: center">
        <el-button
          @click="
            log_dialog = false;
            logCloseSocket();
          "
          style="border-radius: 10px"
          type="warning"
          >关闭</el-button
        >
      </div>
    </template>
  </el-dialog>
  <!-- 上传记录 -->
  <el-dialog
    v-model="history_dialog"
    title="上传历史记录"
    width="80%"
    style="
      height: 820px;
      border-radius: 15px;
      margin-left: 15%;
      margin-top: 50px;
    "
    
    :close-on-click-modal="false"
    :draggable="true"
  >
    <div>
      <el-row>
        <el-col :span="24" style="height: 630px">
          <div style="width: 100%; margin-bottom: 5px">
            <el-row :gutter="5">
              <el-col :span="16"></el-col>
              <el-col :span="7">
                <div style="text-align: right">
                  <el-input
                    v-model="fileName"
                    placeholder="请输入文件名"
                    style="width: 200px"
                  ></el-input>
                </div>
              </el-col>
              <el-col :span="1">
                <svg
                  @click="GetUploadHistory()"
                  t="1705564250143"
                  style="
                    height: 22px;
                    width: 22px;
                    margin-top: 5px;
                    margin-left: 10px;
                  "
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="6351"
                  width="200"
                  height="200"
                >
                  <path
                    d="M990.980258 969.944422l-185.094554-185.094554c83.911344-83.23135 135.990938-198.518449 135.990938-325.781454C941.876642 205.950391 735.934251 0 482.824228 0 229.698205 0 23.747814 205.950391 23.747814 459.076413c0 253.142022 205.950391 459.060414 459.076414 459.060414 103.079195 0 198.334451-34.167733 275.037851-91.759283l188.342529 188.342528c6.183952 6.183952 14.279888 9.271928 22.383825 9.271928s16.199873-3.087976 22.391825-9.271928a31.655753 31.655753 0 0 0 0-44.77565zM87.06732 459.076413c0-218.222295 177.534613-395.748908 395.756908-395.748908 218.206295 0 395.732908 177.526613 395.732908 395.748908 0 218.198295-177.526613 395.740908-395.732908 395.740909-218.222295 0-395.756908-177.542613-395.756908-395.740909z"
                    fill="#838384"
                    p-id="6352"
                  ></path>
                </svg>
              </el-col>
            </el-row>
          </div>
          <el-card
            shadow="never"
            :body-style="{ padding: '10px' }"
            class="uploadCard"
            style="height: 570px"
          >
            <div>
              <el-table
                :data="uploadHistory"
                style="width: 100%"
                v-loading="apploading"
              >
                <el-table-column width="20" />
                <!-- <el-table-column label="集群" align="left">
                  <template v-slot="scope">
                    <span>{{ scope.row.cluster_name }}</span>
                  </template>
                </el-table-column> -->
                <el-table-column label="Pod" align="left">
                  <template v-slot="scope">
                    <span>{{ scope.row.podName }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="Namespace" align="left">
                  <template v-slot="scope">
                    <span>{{ scope.row.namespace }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="路径" align="left">
                  <template v-slot="scope">
                    <span>{{ scope.row.path }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="文件名" align="left" width="300px">
                  <template v-slot="scope">
                    <span>{{ scope.row.file }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="状态" align="left">
                  <template v-slot="scope">
                    <span>{{ scope.row.status }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="时间" align="left" width="300px">
                  <template v-slot="scope">
                    <span>{{ timeTrans(scope.row.updated_at) }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-card>
        </el-col>
        <el-col :span="24">
          <div style="padding-top: 15px">
            <el-pagination
              :current-page="currentPageu"
              :page-size="pagesizeu"
              :page-sizes="pageList"
              :small="small"
              :disabled="disabled"
              :background="background"
              layout="total, sizes, prev, pager, next, jumper"
              :total="uploadTotal"
              @size-change="handleSizeChangeu"
              @current-change="handleCurrentChangeu"
            />
          </div>
        </el-col>
        <el-col :span="24">
          <div style="text-align: center">
            <el-button
              @click="resetUp()"
              style="border-radius: 10px"
              type="warning"
              >关闭</el-button
            >
          </div>
        </el-col>
      </el-row>
    </div>
  </el-dialog>
  <!-- 下载文件 -->
  <el-dialog
    v-model="download_dialog"
    title="下载文件"
    width="25%"
    style="
      height: 240px;
      border-radius: 15px;
      margin-left: 42%;
      margin-top: 350px;
    "
    :before-close="downloadClose"
    :close-on-click-modal="false"
    :draggable="true"
  >
    <div>
      <div>
        <el-input
          placeholder="请输入文件完整路径,例如：/tmp/a.txt"
          v-model="file_path"
          @input="file_path != '' ? (fileEmpty = false) : _"
          @blur="file_path == '' ? (fileEmpty = true) : _"
        >
        </el-input>
        <span style="color: rgb(109, 110, 109); font-size: 12px"
          >注意：如果下载的文件过大(>500M+)，则响应时间会变长，请耐心等待。。。</span
        ><br />
        <span v-if="fileEmpty" style="color: red; font-size: 12px"
          >文件路径不能为空</span
        >
      </div>
    </div>
    <template #footer>
      <div style="text-align: center">
        <el-button
          @click="
            download_dialog = false;
            fileEmpty = false;
          "
          style="border-radius: 10px"
          type="warning"
          >关闭</el-button
        >
        <el-button
          @click="file_path == '' ? (fileEmpty = true) : downloadFile()"
          type="primary"
          style="border-radius: 10px"
          >立即下载</el-button
        >
      </div>
    </template>
  </el-dialog>
</template>
<script>
import common from "../common/Config";
//引入Xtem终端依赖
// 引入css和js是为了该组件的外观展示
import { getNamespacesReq } from "@/api/namespace/namespace";
import {
downloadFile,
getContainerPath,
getContainersReq,
getPodsReq,
getUploadHistory
} from "@/api/pod/pod";
import "xterm/css/xterm.css";
import "xterm/lib/xterm.js";
//引入Xtem终端依赖
import { getAllClusters } from "@/api/cluster/cluster";
import Cookies from "js-cookie";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";

export default {
  data() {
    return {
      uploadHistory: [],
      opacity: 1,
      download_info: "",
      fileEmpty: false,
      file_path: "",
      download_dialog: false,
      history_dialog: false,
      log_dialog: false,
      termal_dialog: false,
      disabled_upload: false,
      totalBytes: 0,
      filesArr: [],
      //   uoloadFileProgress: "",
      jindustatus: false,
      paths: [],
      containerList: [],
      podinfo: {
        podName: "",
        namespace: "",
        containerName: "",
        path: "",
        clusterName: "",
      },
      uploadFiles: [],
      uploadUri: "",
      uploadUribak:  "http://"+Cookies.get("host")+":"+Cookies.get("port")+"/api/upload",
      dialogVisible: false,
      apploading: true,
      namespaceValue: "",
      namespaceList: [],
      getNamespaceData: {
        // url: common.k8sNamespaceList,
      },
      //搜索
      searchValue: "",
      //获取pod列表
      podList: [],
      getPodListData: {
        // url: common.K8sGetPodList,
        params: {
          filter_name: "",
          namespace: "",
          limit: 0,
          page: 0,
        },
      },
      //pod分页
      currentPage: 1,
      pagesize: 10,
      small: true,
      pageList: [10, 20, 30, 40],
      podTotal: 0,
      disabled: false,
      background: true,
      //上传记录分页
      currentPageu: 1,
      pagesizeu: 10,
      uploadTotal: 0,

      //yaml编辑器
      yamlDialog: false,
      contentYaml: "",
      cmOptions: common.cmOptions,
      k8sTerminalWs: "ws://"+Cookies.get("host")+":"+Cookies.get("port")+"/api/ws",
      //获取pod详情
      getPodDetailData: {
        // url: common.K8sGetPodDetail,
        params: {
          name: "",
          namespace: "",
        },
      },
      //更新pod
      updatePodData: {
        // url: common.K8sUpdatePod,
        params: {
          namespace: "",
          context: "",
        },
      },
      //删除pod
      deletePodData: {
        // url: common.K8sDeletePod,
        params: {
          name: "",
          namespace: "",
        },
      },
      //展开框
      //expand扩展
      activeName: "container",
      expandKeys: [],
      //打开状态码
      expandStatus: false,
      //获取container列表
      containerList: [],
      getContainersData: {
        // url: common.K8sGetContainers,
        params: {
          name: "",
          namespace: "",
        },
      },
      //获取container日志
      containerName: "",
      containerValue: "",
      containerLog: "",
      bashType: "bash",
      bashTypes: ["bash", "sh"],
      getContainerLogData: {
        // url: common.K8sGetContainerLog,
        params: {
          container: "",
          podname: "",
          namespace: "",
        },
      },
      timer: 0,
      //webshell终端
      term: null,
      //term插件
      fitAddon: null,
      //日志显示终端
      logTerm: null,
      //websocket连接
      socket: null,
      //日志websocket连接
      logSocket: null,
      fileFlag: 1,
      uploadedBytes: 0,
      uploadedTotalBytes: 0,
      indexArr: [],
      successIndexArr: [],
      beforBytes: 0,
      newBytes: 0,
      uoloadFileProgress: [],
      logfitAddon: null,
      treeLabel: "",
      getUploadHistoryData: {
        clusterName: "",
        filterName: "",
        page: 1,
        limit: 10,
      },
      //集群名
      cluName: "",
      clus: [],
      getClusterData: {
        filterName: "",
        page: 10000,
        limit: 10000,
      },
      fileName: "",
    };
  },
  methods: {
    resetUp() {
      this.history_dialog = false;
      this.fileName = "";
      this.currentPageu = 1;
      this.pagesizeu = 10;
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
    //获取文件上传记录
    GetUploadHistory() {
      console.log("filterName: ", this.fileName);
      this.getUploadHistoryData.filterName = this.fileName;
      this.getUploadHistoryData.clusterName = this.cluName;
      this.getUploadHistoryData.page = this.currentPageu;
      this.getUploadHistoryData.limit = this.pagesizeu;
      getUploadHistory(this.getUploadHistoryData)
        .then((res) => {
          console.log("获取到：", res.data);
          this.uploadHistory = res.data;
          this.uploadTotal = res.total;
        })
        .catch((res) => {
          console.log("获取失败：", res.err);
        });
    },
    //呼吸灯特效方法
    breathe() {
      setInterval(() => {
        if (this.increasing) {
          this.opacity += 0.1;
        } else {
          this.opacity -= 0.1;
        }

        if (this.opacity >= 1) {
          this.increasing = false;
        } else if (this.opacity <= 0.2) {
          this.increasing = true;
        }
      }, 100); // Adjust the interval as needed
    },
    downloadClose() {
      this.download_dialog = false;
      this.fileEmpty = false;
      this.file_path = "";
    },
    downloadFile() {
      this.download_dialog = false;
      console.log("开始下载：", this.file_path);
      this.$message.success({
        message: "开始下载，请稍后。。。",
      });
      this.podinfo.path = this.file_path;
      this.podinfo.clusterName = this.cluName;
      // this.file_path = "";
      console.log("podinfo", this.podinfo);
      let filename = this.podinfo.path.split("/").pop();
      if (filename.includes(".")) {
        filename = filename.split(".")[0];
      }

      this.download_info = "文件下载中。。。";
      // 发起下载文件请求
      downloadFile(this.podinfo, this.cluName)
        .then((response) => {
          // 创建下载链接
          const url = window.URL.createObjectURL(
            new Blob([response], { type: "application/octet-stream" })
          );
          const link = document.createElement("a");
          link.href = url;
          link.download = filename + ".tar";

          document.body.appendChild(link);

          // 模拟点击下载链接
          link.click();

          // 清理资源
          window.URL.revokeObjectURL(url);
          document.body.removeChild(link);
          this.download_info = "";
        })
        .catch(() => {
          this.download_info = "";
          console.error(
            "下载文件失败：由于文件不存在或是其他原因导致，请稍后重试"
          );
          this.$message.error({
            // message: "下载失败，请检查是否文件过大或资源不足导致",
            message: "下载文件失败：由于文件不存在或是其他原因导致，请稍后重试",
          });
        });
      // this.fileEmpty=false
      this.downloadClose();
    },
    terminalClose() {
      this.termal_dialog = false;
      this.closeSocket();
    },
    dia_close() {
      //恢复上传
      this.disabled_upload = false;
      this.dialogVisible = false;
      this.resetData();
    },
    //关闭进度显示方法
    handleCloseProgress() {
      //   this.resetData();
      this.jindustatus = false;
    },
    //初始化数据
    resetData() {
      console.log("开始清除。。。");
      this.treeData = [];
      // this.uploadUri = "";
      
      this.uploadFiles = [];
      this.paths = [];
      this.podinfo = {
        podName: "",
        namespace: "",
        containerName: "",
      };
      this.filesArr = [];
      this.fileFlag = 1;
      this.uoloadFileProgress = [];
      this.successIndexArr = [];
      this.indexArr = [];
    },
    // 计算文件上传进度(是每个文件的进度都是0-100%)
    uploadProgress(event, file, fileList) {
      if (this.fileFlag == 1) {
        //赋值给文件数组
        fileList.forEach((file) => {
          console.log(`上传文件名：${file.name}`);
          this.filesArr.push(file.name);
        });
        console.log("文件为：", this.filesArr);
        this.fileFlag = 0;
      }
      // 找到当前触发上传进度的文件
      const currentFile = fileList.find((item) => item.uid === file.uid);
      if (currentFile) {
        //获取当前文件的索引
        const currentIndex = fileList.indexOf(file);
        //根据文件索引将进度变量加入进度变量数组，用来存储每个文件的上传进度
        this.uoloadFileProgress[parseInt(currentIndex)] = Math.round(
          (event.loaded / event.total) * 100
        );

        //如果当前文件的进度值为100了，说明上传完毕，但服务器可能还没接收完毕，就先置为99
        if (this.uoloadFileProgress[parseInt(currentIndex)] == 100) {
          this.uoloadFileProgress[parseInt(currentIndex)] = 99;
        }
      }
    },
    //获取容器所有路径
    getContainerpath(path) {
      this.podinfo.path = path;
      console.log("qqqqqqqqqqqqqqqqqqqqq", this.podinfo);
      this.paths = [];
      getContainerPath(this.podinfo, this.cluName)
        .then((res) => {
          console.log("获取路径为：", res.data.data);
          let arr = res.data.data.split("\n");
          let arr2 = [];
          for (let i in arr) {
            //将arr[i]也就是每一行以一个或多个空格分隔返回一个新数组
            arr2 = arr[i].split(/\s+/);
            //判断每一行的第一段是否以d为开头，如果是则说明是目录
            if (path == "/") {
              if (arr2[0].startsWith("d")) {
                console.log("目录为：", arr2[8]);
                this.paths.push("/" + arr2[8]);
              }
            } else {
              this.paths.push(arr2[8]);
            }
          }
        })
        .catch((res) => {
          console.log("获取路径报错：", res.err);
          this.$message.error({
            message: "因权限问题，该容器禁止访问内部路径！",
          });
        });
    },
    getcontainers(row) {
      this.podinfo.podName = row.metadata.name;
      this.podinfo.namespace = row.metadata.namespace;
      const pod = {
        name: row.metadata.name,
        namespace: row.metadata.namespace,
      };
      getContainersReq(pod, this.cluName)
        .then((res) => {
          // console.log("获取到。。。。",res.data.data)
          this.containerList = res.data.data;
          console.log("获取到容器组：", this.containerList);
        })
        .catch((res) => {
          this.$message.error({
            message: res.err,
          });
        });
    },
    //上传失败调用方法
    uploadError(response) {
      this.$message.error({
        message: "文件上传失败!",
      });
      console.error("文件上传失败：", response);
      this.resetData();
    },
    //移除文件
    removeFile(file) {
      //遍历文件名数组，如果传进来的文件名匹配到相同的，就去移除该文件名
      for (let i in this.filesArr) {
        if (file.name == this.filesArr[i]) {
          this.filesArr[i] = "";
        }
      }
    },
    //上传成功
    uploadSuccess(response, file, fileList) {
      //获取当前传输文件的索引，用于下面存储
      const currentIndex = fileList.findIndex((item) => item.uid === file.uid);
      //文件上传成功后，将当前文件的进度值设为100
      this.uoloadFileProgress[parseInt(currentIndex)] = 100;
      //5毫秒之后在文件名数组中去除该文件，实现页面传输完就不显示的效果
      setTimeout(() => {
        this.removeFile(file);
      }, 500);

      console.log("准备检查索引数组：", this.indexArr);

      //将该文件的索引以值的方式存入成功索引数组中
      this.successIndexArr.push(currentIndex);
      //判断成功索引数组如果和索引数组的长度一直，说明文件传输完毕
      if (this.successIndexArr.length == this.indexArr.length) {
        console.log("传输完毕：");
        // console.log("文件索引：", currentIndex, " 文件个数：", fileList.length);
        //恢复上传功能
        this.disabled_upload = false;
        //5毫秒后重置相关数据
        setTimeout(() => {
          this.resetData();
        }, 500);
      }
      console.log("文件上传成功", file.name, response.msg);
    },
    //取消上传
    cancelUpload(cancelFile) {
      //如果this.indexArr长度为0，说明所有的都取消了，就直接重置数据、恢复上传功能即可
      if (this.indexArr.length == 0) {
        this.resetData();
        this.disabled_upload = false;
      }
      //如果没有取消完，则遍历实际上传文件数组，将每一个文件的名字跟取消名字对比
      this.uploadFiles.forEach((file, index) => {
        //如果要取消的文件名与该数组某个文件莫名相同
        if (cancelFile == file.name) {
          console.log("取消文件为：", file.name);
          //则取消该文件的上传
          this.$refs.uploadRef.abort(file);

          //将被取消文件的索引拿出来，从索引数组中移除
          //遍历索引数组，将每一个值与当前文件的索引比对，如果某个值与他相等，就移除该值，那么索引数组内就只剩没有被取消的文件的索引
          for (let j in this.indexArr) {
            if (index == this.indexArr[j]) {
              this.indexArr.splice(j, 1);
            }
          }
          console.log("此时索引数组为：", this.indexArr);

          console.log("此时：", this.uploadFiles);
          //去文件名数组中移除该文件名
          this.removeFile(file);
        }
      });
    },
    //组装上传uri
    submitUri() {
      this.uploadUri =
        this.uploadUribak +
        "?podName=" +
        this.podinfo.podName +
        "&namespace=" +
        this.podinfo.namespace +
        "&containerName=" +
        this.podinfo.containerName +
        "&path=" +
        this.podinfo.path +
        "&clusterName=" +
        this.cluName;
    },
    //实际上传文件方法
    handleSubmit() {
      this.submitUri();
      console.log("url=", this.uploadUri);
      // 在这里编写提交动作的代码
      console.log("提交文件:", this.uploadFiles.length);
      console.log("文件个数：", this.uploadFiles.length);
      // 根据条件执行表单提交
      if (this.uploadFiles.length > 0 && this.uploadFiles.length <= 5) {
        //首先获取实际文件数组中的所有文件的索引存入索引数组
        console.log("满足条件开始上传");
        for (let i in this.uploadFiles) {
          this.indexArr.push(i);
        }

        //提交表单上传文件组
        this.$refs.uploadRef.submit();
      } else {
        this.$message.info({
          message: "文件数量不能超过5个或小于1个",
        });
        //恢复上传功能
        this.disabled_upload = false;
        this.resetData();
      }
      this.dialogVisible = false;
    },
    //换行函数
    lines(str) {
      let lines = str.split("\n");
      return lines.join("<br>");
    },
    //初始化webshell终端
    initTrem() {
      //初始化xterm实例
      this.term = new Terminal({
        rendererType: "canvas", //渲染类型
        rows: 30, //行数
        cols: 110,
        convertEol: false, //启用时，光标将设置为下一行的开头
        scrollback: 1000, //终端中的回滚量
        disableStdin: false, //是否应禁用输入
        cursorStyle: "underline", //光标样式
        cursorBlink: true, //光标闪烁
        theme: {
          foreground: "#FFFFFF", //字体颜色
          background: "#48494D", //背景色
          cursor: "help", //设置光标
        },
      });
      //console.log("打印term: ", this.term);
      //绑定dom(也就是绑定div)
      this.term.open(document.getElementById("xterm"));
      //调整适应父元素大小
      this.fitAddon = new FitAddon();
      // this.term.loadAddon(this.fitAddon);  //此加载插件方式会导致后面dispose的时候报错
      this.fitAddon.activate(this.term); //用activate加载方式就可以正常卸载插件和dispose
      this.fitAddon.fit();
      //获取终端的焦点
      this.term.focus();

      //定义发送策略
      //this只作用于本方法，如果在子方法里用，必须重新声明一下
      let _this = this;
      //onData方法用于定义输入的动作
      // 这里key值是输入的值，数据格式就是后端定义的 {"operation":"stdin","data":"ls"}
      this.term.onData(function (key) {
        //准备发送输入的内容
        let msgOrder = {
          operation: "stdin",
          data: key,
        };
        //发送数据到后端
        _this.socket.send(JSON.stringify(msgOrder));
      });
      //发送resize数据
      let msgOrder2 = {
        operation: "resize",
        cols: this.term.cols,
        rows: this.term.rows,
      };
      this.socket.send(JSON.stringify(msgOrder2));
    },
    //初始化终端用的websocket
    initSocket(row) {
      this.podinfo.podName = row.metadata.name;
      this.podinfo.namespace = row.metadata.namespace;
      this.podinfo.containerName = row.spec.containers[0].name;

      //定义websocket连接地址
      let terminalWsUrl =
        this.k8sTerminalWs +
        "?pod_name=" +
        this.podinfo.podName +
        "&container_name=" +
        this.podinfo.containerName +
        "&namespace=" +
        this.podinfo.namespace +
        "&bashType=" +
        "/bin/" +
        this.bashType +
        "&clusterName=" +
        this.cluName;
      console.log("WebSocket连接为：", terminalWsUrl);
      //实例化
      this.socket = new WebSocket(terminalWsUrl);

      //关闭连接时的方法
      this.socketOnClose();
      //建立连接时的方法
      this.socketOnOpen();
      //接收消息的方法
      this.socketOnMessage();
      //报错时的方法
      this.socketOnError();
    },
    //关闭连接时的方法
    socketOnClose() {
      this.socket.onclose = () => {
        //关闭连接后打印在终端里
        // this.term.write("终端websocket连接已关闭");
        console.log("终端websocket连接已关闭");
      };
    },
    //建立连接时的方法
    socketOnOpen() {
      console.log("打印socket：", this.socket);
      this.socket.onopen = () => {
        //建立连接成功后，初始化虚拟终端
        this.initTrem();
      };
      console.log("打印term", this.term);
    },
    //接收消息的方法
    socketOnMessage() {
      this.socket.onmessage = (msg) => {
        //接收到消息后将字符串转为对象，输出data内容
        let content = JSON.parse(msg.data);
        console.log("ws消息：", msg.data);
        //this.term.write(content.data);
        this.term.write(content.data);
      };
    },
    //报错时的方法
    socketOnError() {
      this.socket.onerror = () => {
        console.log("socket连接失败...");
      };
    },
    //关闭socket连接
    closeSocket() {
      this.resetData();
      if (this.socket == null) {
        return;
      }
      // this.term.write("连接关闭中...");
      //关闭socket链接
      this.socket.close();

      // 卸载插件
      if (this.fitAddon) {
        if (this.term._initialized) {
          // 确保插件已加载
          this.term.unloadAddon(this.fitAddon); // 卸载插件
        }
        this.fitAddon.dispose(); // 销毁插件实例
      }
      // 销毁终端实例
      if (this.term) {
        this.term.dispose(); // 销毁终端实例
      }
    },

    //初始化日志显示终端
    initLogTrem() {
      //初始化xterm实例
      this.logTerm = new Terminal({
        rendererType: "canvas", //渲染类型
        rows: 30, //行数
        cols: 110,
        fontSize: 14,
        convertEol: true, //启用时，光标将设置为下一行的开头,如果为false,打印日志的格式会变乱
        scrollback: 1000, //终端中的回滚量，直接决定了日志往上划的长度，设置越大，查看的历史日志越多
        disableStdin: true, //是否应禁用输入
        cursorStyle: "underline", //光标样式
        cursorBlink: false, //光标闪烁
        theme: {
          foreground: "#FFFFFF", //字体颜色
          background: "#48494D", //背景色
          cursor: "help", //设置光标
        },
      });
      //console.log("打印term: ", this.term);
      //绑定dom(也就是绑定div)
      this.logTerm.open(document.getElementById("logger"));
      //调整适应父元素大小
      this.logfitAddon = new FitAddon();
      // this.logTerm.loadAddon(fitAddon);
      this.logfitAddon.activate(this.logTerm); //用activate加载方式就可以正常卸载插件和dispose
      this.logfitAddon.fit();
      //获取终端的焦点
      this.logTerm.focus();
    },
    //初始化获取日志socket
    initGetLogSocket(row) {
      console.log("准备：", row);
      let getlogWsUrl =
        this.k8sTerminalWs +
        "?container_name=" +
        row.spec.containers[0].name +
        "&pod_name=" +
        row.metadata.name +
        "&namespace=" +
        row.metadata.namespace +
        "&bashType=" +
        "log" +
        "&clusterName=" +
        this.cluName;
      console.log("WebSocket连接为：", getlogWsUrl);
      //实例化
      this.logSocket = new WebSocket(getlogWsUrl);

      //回调函数
      //关闭连接时的方法
      this.logSocketOnClose();
      //建立连接时的方法
      this.logSocketOnOpen();
      //接收消息的方法
      this.logSocketOnMessage();
      //报错时的方法
      this.logSocketOnError();
    },
    //关闭连接时调用的方法
    logSocketOnClose() {
      this.logSocket.onclose = () => {
        console.log("日志websocket连接已关闭");
      };
    },
    //log建立连接时调用的方法
    logSocketOnOpen() {
      this.logSocket.onopen = () => {
        //建立连接成功后，初始化日志显示虚拟终端
        this.initLogTrem();
        console.log("打印socket连接成功");
      };
    },
    //log接收消息调用的方法
    logSocketOnMessage() {
      this.logSocket.onmessage = (msg) => {
        //接收到消息后将字符串转为对象，输出data内容
        let content = JSON.parse(msg.data);
        this.containerLog = content.data;
        //let newlog = this.lines(this.containerLog);
        console.log("ws获取到：", this.containerLog);
        this.logTerm.write(this.containerLog);
      };
    },
    //log报错时调用的方法
    logSocketOnError() {
      this.logSocket.onerror = () => {
        console.log("socket连接失败...");
      };
    },
    //log关闭socket连接
    logCloseSocket() {
      if (this.logSocket == null) {
        return;
      }
      this.logSocket.close();
      console.log("日志websocket关闭中...");
      // 卸载插件
      if (this.logfitAddon) {
        if (this.logTerm._initialized) {
          // 确保插件已加载
          this.logTerm.unloadAddon(this.logfitAddon); // 卸载插件
        }
        this.logfitAddon.dispose(); // 销毁插件实例
      }
      // 销毁终端实例
      if (this.logTerm) {
        this.logTerm.dispose(); // 销毁终端实例
      }
    },

    //测试
    gettest(pod) {
      console.log("打印 ", pod, this.containerName);
    },
    //操作类提示框：重启、删除..
    handleConfirm(name, play, playFunc) {
      this.$confirm("确认继续" + play + "Pod [" + name + "] 操作吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          playFunc(name);
          this.$message({
            type: "success",
            message: name + "已" + play,
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消" + play,
          });
        });
    },
    //获取namespace
    getPodNamespace() {
      console.log("准备获取namespace:", this.cluName);
      this.namespaceList = "";
      getNamespacesReq(this.cluName)
        .then((res) => {
          this.namespaceList = res.data.namespaces;
          console.log("获取namespace成功：", this.namespaceList);
        })
        .catch((error) => {
          console.log("获取namespace失败：", error);
          this.cluName = "";
          this.namespaceValue = "";
        });
    },
    //获取pod列表
    getPodList() {
      this.apploading = true;
      this.getPodListData.params.filter_name = this.searchValue;
      this.getPodListData.params.namespace = this.namespaceValue;
      this.getPodListData.params.page = this.currentPage;
      console.log("当前页字：", this.getPodListData.params.page);
      this.getPodListData.params.limit = this.pagesize;
      getPodsReq(this.getPodListData.params, this.cluName)
        .then((res) => {
          console.log("获取pod列表为: ", res.data);
          this.podList = res.data.items;
          this.podTotal = res.data.total;
        })
        .catch((res) => {
          console.log("获取pod失败：", res.err);
          this.podTotal = 0;
          // this.podList = "";
        })
        .finally(() => {
          this.apploading = false;
        });
    },
    //刷新按钮
    refulshButton() {
      this.namespaceValue = "";
      this.searchValue = "";
    },
    //转换时间戳
    timeTrans(timestamp) {
      let date = new Date(new Date(timestamp).getTime() + 8 * 3600 * 1000);
      date = date.toJSON();
      date = date.substring(0, 19).replace("T", " ");
      return date;
    },
    //labels显示长度限制
    ellipsis(labels) {
      // 判断lables的长度是否大于15，为true则0-20位正常显示，之后的显示...，为false则直接返回值
      return labels.length > 15 ? labels.substring(0, 20) + "..." : labels;
    },
    //pod分页
    handleSizeChange(size) {
      console.log(`每页 ${size} 条`);
      this.pagesize = size;
      this.getPodList();
    },
    handleCurrentChange(page) {
      this.currentPage = page;
      console.log("当前页: ", this.currentPage);
      this.getPodList();
    },
    //上传记录分页
    handleSizeChangeu(size) {
      console.log(`每页 ${size} 条`);
      this.pagesizeu = size;
      this.GetUploadHistory();
    },
    handleCurrentChangeu(page) {
      console.log("当前页: ", page);
      this.currentPageu = page;
      this.GetUploadHistory();
    },
    //计算重启次数（所有容器重启次数总和）
    getPodRestartNum(podRestarts) {
      let num = 0;
      let i = 0;
      let restarts = podRestarts.status.containerStatuses;
      for (i in restarts) {
        num = num + restarts[i].restartCount;
      }
      //console.log("pod重启次数为：", num);
      return num;
    },
    //yaml
    onChange(yaml) {
      this.contentYaml = yaml;
      console.log("修改后的为：", this.contentYaml);
    },

    //展开和关闭
    getRowKeys(rows) {
      return rows.metadata.name;
    },
    //展开框触发方法
    // 当点击展开的时候，会自动传一个数组进来，里面存放的是当前展开行的name,判断该数组是否为空即可知道展开框是打开还是关闭的状态，根据此特性可以拓展功能
    expandChange(row, expandedRows) {
      //this.connectWebSocket();
      this.containerLog = "";
      this.containerValue = "";
      this.containerName = "";
      this.activeName = "container"; //每次切换的时候都显示container
      //初始化变量
      //清空expandKeys，代表关闭所有展开的行
      this.expandKeys = [];

      //判断是展开还是关闭
      // expandedRows是用来判断展开与否的数组，里面只存一个变量，就是当前展开的当前行的name，自动加进去的
      if (expandedRows.length > 0) {
        //如果当前是展开状态，就去标记状态码是打开状态，用于点击pod名字的时候使用
        this.expandStatus = true;
        //真正的展开这一行
        this.expandKeys.push(row.metadata.name); //将当前行的name添加到真正的展开数组里
        //展开之后取获取容器列表
        this.getContainers(row.metadata.name);
      } else {
        //关闭展开框的时候去关闭所有websokcet连接
        console.log("关闭socket");
        this.closeSocket();
        this.logCloseSocket();
        //如果当前是关闭状态，就去标记状态码是关闭状态
        this.expandStatus = false;
      }
    },
  },
  watch: {
    cluName: {
      handler() {
        console.log("当前集群：", this.cluName);
        //判断是否在pod页面切换集群了
        if (this.cluName != Cookies.get("cluName")) {
          //如果切换集群了则将namespace置空，并更新cookie
          this.namespaceValue = "";
          Cookies.set("cluName", this.cluName);
        }
        //重新获取namespace和pod列表
        this.getPodNamespace();
        this.getPodList();
      },
    },
    //监听namespace的值,若发生变化，则执行handler方法中的内容
    namespaceValue: {
      handler() {
        //将namespace的值存入本地，用于刷新页面或者path切换后依旧能获取得之前设置的namespace值
        localStorage.setItem("namespace", this.namespaceValue);
        // 页面刷新或切换的时候，把页数重新置为1并且重新获取deployment列表
        this.currentPage = 1;
        this.getPodList();
      },
    },
  },
  mounted() {
    // 设置终端字符编码为 UTF-8
    process.env.LANG = "en_US.UTF-8";
    this.breathe();
  },
  beforeMount() {
    console.log("当前namespace:", localStorage.getItem("namespace"));
    //获取集群名
    this.cluName = this.$route.query.clusterName;
    if (!this.cluName) {
      this.cluName = Cookies.get("cluName");
    }

    console.log("old: ",Cookies.get("oldCluName")," new:",this.cluName )
    if (this.cluName != Cookies.get("oldCluName")) {
      localStorage.setItem("namespace","")
      //存储旧集群
      Cookies.set("oldCluName", this.cluName);
    }

    console.log("pod页集群名：", this.cluName);

    //加载页面时先获取localStorage中的namespace值，若获取不到则默认default，放在下拉框第一位显示
    if (
      localStorage.getItem("namespace") != "undefined" &&
      localStorage.getItem("namespace") != null
    ) {
      this.namespaceValue = localStorage.getItem("namespace");
    }
    this.getPodNamespace();

    //获取pod列表
    if (this.namespaceValue == "") {
      this.getPodList();
    }
    //获取所有集群
    this.getAllClus();
  },
  beforeUnmount() {
    if (this.socket != null) {
      console.log("开始关闭websocket");
      this.socket.close();
    }
  },
};
</script>
<style>
.podicon {
  width: 20px;
  height: 20px;
  padding-left: 10px;
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
.deploy-body-deployname:hover {
  color: rgb(84, 138, 238);
  cursor: pointer;
  font-weight: bold;
  font-size: 15px;
}
.log-card {
  background-color: rgb(83, 79, 82);
  color: rgb(3, 184, 3);
  padding: 5px;
}
.pod-body-shell-card {
  border-radius: 1px;
  height: 600px;
  overflow: auto;
  background-color: rgb(12, 12, 12);
}
.time {
  font-size: 13px;
  color: rgb(145, 143, 143);
}

.breathing-text {
  font-size: 13px;
  color: rgb(28, 215, 248);
  margin-left: 92%;
  font-weight: bold;
}

/* 历史记录显示滚动条 */
.scrollable {
  overflow: auto; /* 自动开启滚动条 */
  max-height: 630px; /* 设置最大高度 */
}
.uploadCard {
  overflow: auto; /* 自动开启滚动条 */
  max-height: 570px; /* 设置最大高度 */
}
.dataCard {
  height: 650px;
  overflow: auto; /* 自动开启滚动条 */
  max-height: 650px; /* 设置最大高度 */
}
</style>
