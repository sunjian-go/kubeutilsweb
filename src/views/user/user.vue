<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="24">
        <el-card :body-style="{ padding: '10px' }" shadow="never">
          <div>
            <el-row>
              <el-col :span="8">
                <span style="font-weight: bold"> 用户管理</span>
              </el-col>
              <el-col :span="16"></el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card
          :body-style="{ padding: '10px' }"
          shadow="never"
          style="height: 650px; margin-top: 5px"
        >
          <el-tabs v-model="userLab" class="demo-tabs" @tab-change="getData()">
            <el-tab-pane label="用户" name="user">
              <div >
                <el-row>
                  <el-col :span="8">
                    <div style="margin-top: 5px" >
                      <el-row>
                        <el-col :span="6">
                          <span>用户列表</span>
                        </el-col>
                        <el-col :span="12">
                          <svg
                            @click="
                              adduser_dialog = true;
                              getGroups();
                            "
                            t="1708333267166"
                            class="iconn"
                            viewBox="0 0 1170 1024"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            p-id="13163"
                            width="200"
                            height="200"
                          >
                            <path
                              d="M768 548.571429c124.342857 0 219.428571-95.085714 219.428571-219.428572s-95.085714-219.428571-219.428571-219.428571-219.428571 95.085714-219.428571 219.428571 95.085714 219.428571 219.428571 219.428572zM365.714286 548.571429H256V438.857143c0-21.942857-14.628571-36.571429-36.571429-36.571429s-36.571429 14.628571-36.571428 36.571429v109.714286H73.142857c-21.942857 0-36.571429 14.628571-36.571428 36.571428s14.628571 36.571429 36.571428 36.571429h109.714286V731.428571c0 21.942857 14.628571 36.571429 36.571428 36.571429s36.571429-14.628571 36.571429-36.571429V621.714286H365.714286c21.942857 0 36.571429-14.628571 36.571428-36.571429s-14.628571-36.571429-36.571428-36.571428z m402.285714 73.142857c-204.8 0-365.714286 131.657143-365.714286 292.571428h731.428572c0-160.914286-160.914286-292.571429-365.714286-292.571428z"
                              fill="#409EFF"
                              p-id="13164"
                            ></path>
                          </svg>
                        </el-col>
                      </el-row>
                    </div>
                  </el-col>
                  <el-col :span="10"> </el-col>
                  <el-col :span="5">
                    <el-col :span="8"> </el-col>
                    <el-row :gutter="5">
                      <el-col :span="17"
                        ><el-input
                          placeholder="请输入"
                          v-model="getUsersData.filterName"
                        ></el-input
                      ></el-col>
                      <el-col :span="7"
                        ><el-button type="" @click="getUsers()"
                          >搜索</el-button
                        ></el-col
                      >
                    </el-row></el-col
                  >
                </el-row>
              </div>
              <div style="margin-top: 10px" class="userShow">
                <el-table :data="getUserList" stripe style="width: 100%">
                  <el-table-column label="用户" align="left" width="130px">
                    <template v-slot="scope">
                      <span class="deploy-body-deployname">{{
                        scope.row.username
                      }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="用户组" align="center" width="190px">
                    <template v-slot="scope">
                      <span class="deploy-body-deployname">{{
                        scope.row.groupName
                      }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="创建时间"
                    align="center"
                    width="200px"
                  >
                    <template v-slot="scope">
                      <span class="deploy-body-deployname">{{
                        timeTrans(scope.row.created_at)
                      }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="" label="操作" align="center">
                    <template v-slot="scope">
                      <div style="margin-right: 15px">
                        <el-row>
                          <el-col :span="6"> </el-col>
                          <el-col :span="4">
                            <el-button
                              text
                              type="primary"
                              @click="
                                getUser(scope.row.username);
                                showuser_dialog = true;
                              "
                              >查看</el-button
                            >
                          </el-col>
                          <el-col :span="4"
                            ><el-button
                              text
                              type="warning"
                              @click="
                                updateuser_dialog = true;
                                getUser(scope.row.username);
                                getGroups();
                              "
                              >修改</el-button
                            ></el-col
                          >
                          <el-col :span="4"
                            ><el-button
                              text
                              type="danger"
                              @click="deleteInfo('用户', scope.row.username)"
                              >删除</el-button
                            ></el-col
                          >
                        </el-row>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
            <el-tab-pane label="用户组" name="group">
              <div>
                <el-row>
                  <el-col :span="8">
                    <div style="margin-top: 5px">
                      <el-row>
                        <el-col :span="8">
                          <span>用户组列表</span>
                        </el-col>
                        <el-col :span="8">
                          <svg
                            @click="addgroup_dialog = true"
                            t="1708333267166"
                            class="iconn"
                            viewBox="0 0 1170 1024"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            p-id="13163"
                            width="200"
                            height="200"
                          >
                            <path
                              d="M768 548.571429c124.342857 0 219.428571-95.085714 219.428571-219.428572s-95.085714-219.428571-219.428571-219.428571-219.428571 95.085714-219.428571 219.428571 95.085714 219.428571 219.428571 219.428572zM365.714286 548.571429H256V438.857143c0-21.942857-14.628571-36.571429-36.571429-36.571429s-36.571429 14.628571-36.571428 36.571429v109.714286H73.142857c-21.942857 0-36.571429 14.628571-36.571428 36.571428s14.628571 36.571429 36.571428 36.571429h109.714286V731.428571c0 21.942857 14.628571 36.571429 36.571428 36.571429s36.571429-14.628571 36.571429-36.571429V621.714286H365.714286c21.942857 0 36.571429-14.628571 36.571428-36.571429s-14.628571-36.571429-36.571428-36.571428z m402.285714 73.142857c-204.8 0-365.714286 131.657143-365.714286 292.571428h731.428572c0-160.914286-160.914286-292.571429-365.714286-292.571428z"
                              fill="#409EFF"
                              p-id="13164"
                            ></path>
                          </svg>
                        </el-col>
                      </el-row>
                    </div>
                  </el-col>
                  <el-col :span="10"> </el-col>
                  <el-col :span="5">
                    <el-col :span="8"> </el-col>
                    <el-row :gutter="5">
                      <el-col :span="17"
                        ><el-input
                          placeholder="请输入"
                          v-model="getGroupsData.filterName"
                        ></el-input
                      ></el-col>
                      <el-col :span="7"
                        ><el-button type="" @click="getGroups()"
                          >搜索</el-button
                        ></el-col
                      >
                    </el-row></el-col
                  >
                </el-row>
              </div>
              <div style="margin-top: 10px" class="userShow">
                <el-table :data="getGroupList" stripe style="width: 100%">
                  <el-table-column label="用户组" align="left" width="130px">
                    <template v-slot="scope">
                      <span class="deploy-body-deployname">{{
                        scope.row.groupName
                      }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="角色" align="center" width="190px">
                    <template v-slot="scope">
                      <span class="deploy-body-deployname">{{
                        scope.row.role
                      }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="创建时间"
                    align="center"
                    width="200px"
                  >
                    <template v-slot="scope">
                      <span class="deploy-body-deployname">{{
                        timeTrans(scope.row.created_at)
                      }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="" label="操作" align="center">
                    <template v-slot="scope">
                      <div style="margin-right: 15px">
                        <el-row>
                          <el-col :span="4"> </el-col>
                          <el-col :span="4">
                            <!-- <el-button text type="primary">查看</el-button> -->
                          </el-col>
                          <el-col :span="4"
                            ><el-button
                              text
                              type="warning"
                              @click="
                                groupname = scope.row.groupName;
                                updategroup_dialog = true;
                              "
                              >修改</el-button
                            ></el-col
                          >
                          <el-col :span="4"
                            ><el-button
                              text
                              type="danger"
                              @click="deleteInfo('用户组', scope.row.groupName)"
                              >删除</el-button
                            ></el-col
                          >
                        </el-row>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card
          :body-style="{ padding: '10px' }"
          shadow="never"
          style="height:650px;margin-top:5px"
          
        >
          <div>
            <el-row>
              <el-col :span="8">
                <div style="margin-top: 5px">
                  <el-row>
                    <el-col :span="6">
                      <span>角色列表</span>
                    </el-col>
                    <el-col :span="12">
                      <svg
                        @click="addrole_dialog = true"
                        t="1708333329221"
                        class="iconn"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="16984"
                        width="200"
                        height="200"
                      >
                        <path
                          d="M777.152 611.2c17.6 0 32.832 11.2 38.592 28.032l1.664 6.592 0.512 6.208V723.2h71.232c18.176 0 33.6 11.904 38.848 28.416l1.472 6.4 0.448 6.016a40.704 40.704 0 0 1-28.032 38.592l-6.592 1.664-6.144 0.512H817.92v71.232a40.832 40.832 0 0 1-28.416 38.848l-6.4 1.472-5.952 0.448a40.704 40.704 0 0 1-38.656-28.032l-1.664-6.592-0.512-6.208v-71.168h-71.168a40.832 40.832 0 0 1-38.912-28.416l-1.472-6.4-0.448-6.016c0-17.6 11.2-32.832 28.032-38.592l6.592-1.664 6.208-0.512h71.168v-71.232c0-18.176 11.904-33.6 28.416-38.848l6.4-1.472 6.016-0.448zM474.752 107.2c59.776 0 115.968 23.36 158.08 65.728a222.4 222.4 0 0 1 65.536 158.08c0 59.712-23.296 115.968-65.472 158.208l-10.24 9.6-10.88 8.96-10.752 7.808 14.08 5.632c18.432 7.936 36.032 17.344 52.736 28.224l16.448 11.392 15.808 12.288a40.832 40.832 0 0 1-51.84 62.912 273.664 273.664 0 0 0-173.504-62.208 273.088 273.088 0 0 0-272.832 272.768 40.768 40.768 0 1 1-81.6 0c0-47.744 9.344-94.144 27.776-138.048a354.048 354.048 0 0 1 170.88-180.48l17.792-8.064 11.392-4.608-10.624-7.744-5.44-4.416-5.312-4.544-10.24-9.664A222.4 222.4 0 0 1 250.88 330.88c0-59.648 23.36-115.968 65.536-158.144a222.656 222.656 0 0 1 158.272-65.536z m204.992 5.888l2.304 0.192 6.08 1.088a223.808 223.808 0 0 1 167.168 216.512c0 46.016-9.664 84.928-29.376 117.12l-7.808 11.776-3.968 4.928 16.896 7.296c16.832 7.68 33.088 16.64 48.512 26.88l15.104 10.624 14.592 11.456a40.96 40.96 0 0 1 5.568 57.408 40.896 40.896 0 0 1-57.472 5.44 272.896 272.896 0 0 0-125.184-57.984c-21.888-3.968-36.544-24.576-33.152-42.624a41.024 41.024 0 0 1 19.2-41.216c38.592-23.424 55.488-56.896 55.488-111.104 0-64.64-43.648-121.216-106.048-137.6a40.704 40.704 0 0 1 0.64-78.976l6.592-1.152h4.864z m-204.992 62.912a155.072 155.072 0 0 0-155.008 154.88 155.008 155.008 0 0 0 309.952 0 155.136 155.136 0 0 0-154.944-154.88z"
                          fill="#91D400"
                          p-id="16985"
                        ></path>
                      </svg>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
              <el-col :span="10"> </el-col>
              <el-col :span="6">
                <el-col :span="8"> </el-col>
                <el-row :gutter="5">
                  <el-col :span="17"
                    ><el-input
                      placeholder="请输入"
                      v-model="getroleData.filterName"
                    ></el-input
                  ></el-col>
                  <el-col :span="7"
                    ><el-button type="" @click="getRoles()"
                      >搜索</el-button
                    ></el-col
                  >
                </el-row></el-col
              >
            </el-row>
          </div>
          <div style="margin-top: 10px" class="roleshow">
            <el-table
              :data="rolesdata"
              stripe
              style="width: 100%"
              v-loading="apploading"
            >
              <el-table-column label="Role" align="left" width="130px">
                <template v-slot="scope">
                  <span class="deploy-body-deployname">{{
                    scope.row.role
                  }}</span>
                </template></el-table-column
              >
              <el-table-column label="权限" align="center" width="180px">
                <template v-slot="scope">
                  <span class="deploy-body-deployname">{{
                    ellipsis(scope.row.auth)
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column label="创建时间" align="center" width="180px">
                <template v-slot="scope">
                  <span class="deploy-body-deployname">{{
                    timeTrans(scope.row.created_at)
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="" label="操作" align="center">
                <template v-slot="scope">
                  <div style="margin-right: 15px">
                    <el-row>
                      <el-col :span="6"> </el-col>
                      <el-col :span="4">
                        <el-button
                          text
                          type="primary"
                          @click="
                            showrole_dialog = true;
                            getFilterRole(scope.row.role);
                          "
                          >查看</el-button
                        >
                      </el-col>
                      <el-col :span="4"
                        ><el-button
                          text
                          type="warning"
                          @click="
                            updaterole_dialog = true;
                            getFilterRole(scope.row.role);
                          "
                          >修改</el-button
                        ></el-col
                      >
                      <el-col :span="4"
                        ><el-button
                          text
                          type="danger"
                          @click="deleteInfo('角色', scope.row.role)"
                          >删除</el-button
                        ></el-col
                      >
                    </el-row>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>
      <el-col :span="24">
        <div>
          <el-row :gutter="10">
            <el-col :span="12">
              <div style="margin-top: 15px">
                <el-pagination
                  :current-page="currentPage"
                  :page-size="pagesize"
                  :page-sizes="pageList"
                  small="true"
                  :disabled="false"
                  background="false"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="Total"
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                />
              </div>
            </el-col>
            <el-col :span="12">
              <div style="margin-top: 15px">
                <el-pagination
                  :current-page="currentPageRole"
                  :page-size="pagesizeRole"
                  :page-sizes="pageListRole"
                  small="true"
                  :disabled="false"
                  background="false"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="roleTotal"
                  @size-change="handleSizeChangeRole"
                  @current-change="handleCurrentChangeRole"
                />
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
  <!-- 添加角色dialog -->
  <el-dialog
    v-model="addrole_dialog"
    title="添加角色"
    width="450"
    :before-close="addrole_handleClose"
    style="border-radius: 15px"
  >
    <div>
      <el-tabs v-model="lab" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="角色" name="0">
          <div>
            <el-row :gutter="10">
              <el-col :span="3">
                <div style="margin-top: 5px">
                  <span>角色：</span>
                </div>
              </el-col>
              <el-col :span="12">
                <el-input
                  placeholder="请输入角色名"
                  v-model="addroleData.role"
                ></el-input>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
        <el-tab-pane label="权限分配" name="1">
          <div>
            <el-row>
              <span style="font-weight: bold">节点</span>
              <el-col :span="24">
                <el-checkbox
                  v-model="auths.node_detail"
                  label="节点详情"
                  size="large"
                />
                <el-checkbox v-model="auths.packet" label="抓包" size="large" />
              </el-col>
              <el-col :span="24">
                <el-checkbox
                  v-model="auths.icmp"
                  label="icmp测试"
                  size="large"
                />
                <el-checkbox
                  v-model="auths.port"
                  label="端口测试"
                  size="large"
                />
              </el-col>
              <span style="font-weight: bold">Pod</span>
              <el-col :span="24">
                <el-checkbox
                  v-model="auths.shell"
                  label="命令行"
                  size="large"
                />
                <el-checkbox
                  v-model="auths.download"
                  label="下载文件"
                  size="large"
                />
              </el-col>
              <el-col :span="24">
                <el-checkbox
                  v-model="auths.log"
                  label="日志查看"
                  size="large"
                />
                <el-checkbox
                  v-model="auths.upload"
                  label="上传文件"
                  size="large"
                />
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <template #footer>
      <div>
        <el-button type="info" @click="lab = '0'" v-if="lab == '1'" round
          >上一步</el-button
        >
        <el-button type="primary" @click="lab = '1'" v-if="lab == '0'" round
          >下一步</el-button
        >
        <el-button
          type="primary"
          v-if="lab == '1'"
          round
          @click="checkRoleData()"
          >确定</el-button
        >
      </div>
    </template>
  </el-dialog>
  <!-- 查看role dialog -->
  <el-dialog
    v-model="showrole_dialog"
    title="查看角色"
    width="500"
    style="border-radius: 15px"
  >
    <div>
      <el-row>
        <el-col :span="24">
          <div>
            <el-row>
              <el-col :span="4">
                <span style="font-weight: bold">角色</span>
              </el-col>
              <el-col :span="12">
                {{ getOneRoleData.role }}
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="24">
          <div style="margin-top: 10px">
            <el-row>
              <el-col :span="4">
                <span style="font-weight: bold">权限</span>
              </el-col>
              <el-col :span="12">
                <div v-for="(v, k) in getOneRoleAuthArr" :key="k">
                  <div style="margin-top: 5px">
                    <el-tag>{{ v }}</el-tag>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div></el-col
        >
      </el-row>
    </div>
    <template #footer>
      <div>
        <el-button type="primary" round @click="showrole_dialog = false"
          >确定</el-button
        >
      </div>
    </template>
  </el-dialog>
  <!-- 修改role dialog -->
  <el-dialog
    v-model="updaterole_dialog"
    title="修改角色"
    width="500"
    style="border-radius: 15px"
  >
    <div>
      <el-row>
        <el-col :span="24">
          <div>
            <el-row>
              <el-col :span="4">
                <span style="font-weight: bold">角色</span>
              </el-col>
              <el-col :span="12">
                {{ getOneRoleData.role }}
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="24">
          <div style="margin-top: 10px">
            <el-row>
              <el-col :span="4">
                <span style="font-weight: bold">权限</span>
              </el-col>
              <el-col :span="12">
                <div v-for="(v, k) in getOneRoleAuthArr" :key="k">
                  <div style="margin-top: 5px">
                    <el-tag closable @close="removeAuth(v)">{{ v }}</el-tag>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div></el-col
        >
      </el-row>
    </div>
    <template #footer>
      <div>
        <el-button
          type="primary"
          round
          @click="
            newaddrole_dialog = true;
            authdiff();
          "
          >添加权限</el-button
        >
        <el-button
          type="primary"
          round
          @click="
            updaterole_dialog = false;
            updateBeforRole();
          "
          >确定</el-button
        >
      </div>
    </template>
  </el-dialog>
  <!-- 修改role之增加权限 -->
  <el-dialog
    v-model="newaddrole_dialog"
    title="增加权限"
    width="500"
    style="border-radius: 15px"
  >
    <div>
      <div>
        <el-row>
          <span style="font-weight: bold">节点</span>
          <el-col :span="24">
            <el-checkbox
              v-model="auths.node_detail"
              label="节点详情"
              size="large"
            />
            <el-checkbox v-model="auths.packet" label="抓包" size="large" />
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="auths.icmp" label="icmp测试" size="large" />
            <el-checkbox v-model="auths.port" label="端口测试" size="large" />
          </el-col>
          <span style="font-weight: bold">Pod</span>
          <el-col :span="24">
            <el-checkbox v-model="auths.shell" label="命令行" size="large" />
            <el-checkbox
              v-model="auths.download"
              label="下载文件"
              size="large"
            />
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="auths.log" label="日志查看" size="large" />
            <el-checkbox v-model="auths.upload" label="上传文件" size="large" />
          </el-col>
        </el-row>
      </div>
    </div>
    <template #footer>
      <div>
        <!-- <el-button type="primary" round @click="showrole_dialog = false"
          >添加权限</el-button
        > -->
        <el-button
          type="primary"
          round
          @click="
            newaddrole_dialog = false;
            add_auth();
          "
          >确定</el-button
        >
      </div>
    </template>
  </el-dialog>
  <!-- 添加用户组 -->
  <el-dialog
    v-model="addgroup_dialog"
    title="添加用户组"
    width="450"
    style="border-radius: 15px"
    :show-close="false"
    :close-on-click-modal="false"
  >
    <div>
      <el-form
        label-width="80px"
        ref="addGroup"
        :rules="addgroupRules"
        :model="addGroupData"
      >
        <el-form-item label="用户组" prop="groupName">
          <el-input
            v-model="addGroupData.groupName"
            style="width: 240px"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select
            v-model="addGroupData.role"
            placeholder="请选择角色"
            style="width: 240px"
          >
            <el-option
              v-for="item in rolesdata"
              :key="item.id"
              :label="item.role"
              :value="item.role"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <div style="text-align: center">
        <el-button
          type="info"
          round
          @click="
            addgroup_dialog = false;
            resetForm('addGroup');
          "
          >取消</el-button
        >
        <el-button
          type="primary"
          round
          @click="checkAddData('group', 'addGroup')"
          >确定</el-button
        >
      </div>
    </template>
  </el-dialog>
  <!-- 更新用户组 -->
  <el-dialog
    v-model="updategroup_dialog"
    title="更新用户组"
    width="450"
    style="border-radius: 15px"
    :before-close="updategroup_handleClose"
  >
    <div>
      <el-row>
        <el-col :span="24">
          <div>
            <el-row :gutter="10">
              <el-col :span="2"></el-col>
              <el-col :span="3">
                <div style="margin-top: 5px">
                  <span>用户组</span>
                </div>
              </el-col>
              <el-col :span="17">
                <div style="margin-top: 5px">
                  <span>{{ groupname }}</span>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="24" style="margin-top: 10px">
          <div>
            <el-row :gutter="10">
              <el-col :span="2"></el-col>
              <el-col :span="3">
                <div style="margin-top: 5px">
                  <span>角色</span>
                </div>
              </el-col>
              <el-col :span="17">
                <el-select
                  v-model="updateGroupData.role"
                  placeholder="请选择角色"
                  style="width: 240px"
                >
                  <el-option
                    v-for="item in rolesdata"
                    :key="item.id"
                    :label="item.role"
                    :value="item.role"
                  />
                </el-select>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
    <template #footer>
      <div style="text-align: center">
        <el-button
          type="info"
          round
          @click="
            updategroup_dialog = false;
            updategroup_handleClose();
          "
          >取消</el-button
        >
        <el-button type="primary" round @click="checkGroupData('update')"
          >确定</el-button
        >
      </div>
    </template>
  </el-dialog>
  <!-- 查看用户 dialog -->
  <el-dialog
    v-model="showuser_dialog"
    title="查看用户"
    width="450"
    style="border-radius: 15px"
  >
    <div>
      <el-row>
        <el-col :span="24">
          <div>
            <el-row>
              <el-col :span="4">
                <span style="font-weight: bold">用户</span>
              </el-col>
              <el-col :span="12">
                {{ getOneUserData.username }}
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="24">
          <div style="margin-top: 10px">
            <el-row>
              <el-col :span="4">
                <span style="font-weight: bold">密码</span>
              </el-col>
              <el-col :span="6">
                {{ switchShow(getOneUserData.password) }}
                <!-- {{ switchShow(getOneUserData.password,getOneUserData.password.length) }} -->
              </el-col>
              <el-col :span="8"
                ><el-icon
                  style="margin-top: 3px"
                  class="show"
                  @click="plain == true ? (plain = false) : (plain = true)"
                  ><View /></el-icon
              ></el-col>
            </el-row></div
        ></el-col>
        <el-col :span="24">
          <div style="margin-top: 10px">
            <el-row>
              <el-col :span="4">
                <span style="font-weight: bold">用户组</span>
              </el-col>
              <el-col :span="12">
                {{ getOneUserData.groupName }}
              </el-col>
            </el-row>
          </div></el-col
        >
      </el-row>
    </div>
    <template #footer>
      <div>
        <el-button
          type="primary"
          round
          @click="
            showuser_dialog = false;
            plain = false;
          "
          >确定</el-button
        >
      </div>
    </template>
  </el-dialog>
  <!-- 更新用户 dialog -->
  <el-dialog
    v-model="updateuser_dialog"
    title="更新用户"
    width="450"
    style="border-radius: 15px"
    :before-close="resetUpdateUserData()"
  >
    <div>
      <el-row>
        <el-col :span="24">
          <div>
            <el-row>
              <el-col :span="2"></el-col>
              <el-col :span="3">
                <span style="font-weight: bold">用户</span>
              </el-col>
              <el-col :span="12">
                {{ getOneUserData.username }}
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="24">
          <div style="margin-top: 10px">
            <el-row :gutter="5">
              <el-col :span="2"></el-col>
              <el-col :span="3">
                <span style="font-weight: bold">密码</span>
              </el-col>
              <el-col :span="13">
                <el-input
                  style="margin-top: 1px"
                  placeholder="请输入旧密码"
                  type="password"
                  v-model="oldpassword"
                  @blur="oldpassword != '' ? checkOldPwd() : _"
                ></el-input>
                <span v-if="!oldflag" style="color: red; font-size: 12px"
                  >旧密码不符</span
                >
                <el-input
                  style="margin-top: 10px"
                  placeholder="请输入新密码"
                  type="password"
                  v-model="newpassword"
                  @blur="
                    newpassword != '' ? checkNewPwd() : _;
                    updateUserData.password != '' ? checkDoublePwd() : _;
                  "
                ></el-input>
                <span v-if="newflag" style="color: red; font-size: 12px"
                  >新密码与旧密码相同</span
                >
                <el-input
                  style="margin-top: 10px"
                  placeholder="请确认新密码"
                  type="password"
                  v-model="updateUserData.password"
                  @blur="
                    newpassword == '' || updateUserData.password == ''
                      ? _
                      : checkDoublePwd()
                  "
                ></el-input>
                <span v-if="!newflag2" style="color: red; font-size: 12px"
                  >新密码不符</span
                >
              </el-col>
              <el-col :span="4">
                <span>（可选）</span>
              </el-col>
            </el-row>
          </div></el-col
        >
        <el-col :span="24">
          <div style="margin-top: 10px">
            <el-row :gutter="5">
              <el-col :span="2"></el-col>
              <el-col :span="3">
                <span style="font-weight: bold">用户组</span>
              </el-col>
              <el-col :span="13">
                <el-select
                  v-model="updateUserData.groupName"
                  placeholder="请选择用户组"
                  style="width: 220px"
                >
                  <el-option
                    v-for="item in getGroupList"
                    :key="item.id"
                    :label="item.groupName"
                    :value="item.groupName"
                  />
                </el-select>
              </el-col>
              <el-col :span="4">
                <span>（可选）</span>
              </el-col>
            </el-row>
          </div></el-col
        >
      </el-row>
    </div>
    <template #footer>
      <div>
        <el-button
          @click="
            updateuser_dialog = false;
            resetUpdateUserData();
          "
          type="info"
          round
          >取消</el-button
        >
        <el-button type="primary" round @click="checkUpdateUserInfo()"
          >确定</el-button
        >
      </div>
    </template>
  </el-dialog>
  <!-- 添加用户 -->
  <el-dialog
    v-model="adduser_dialog"
    title="添加用户"
    width="450"
    style="border-radius: 15px"
    :show-close="false"
    :close-on-click-modal="false"
  >
    <div>
      <el-form
        label-width="80px"
        ref="addUser"
        :rules="addUserRules"
        :model="addUserData"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="addUserData.username"
            style="width: 240px"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="addUserData.password"
            type="password"
            style="width: 240px"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户组" prop="groupName">
          <el-select
            v-model="addUserData.groupName"
            placeholder="请选择用户组"
            style="width: 240px"
          >
            <el-option
              v-for="item in getGroupList"
              :key="item.id"
              :label="item.groupName"
              :value="item.groupName"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <div style="text-align: center">
        <el-button
          type="info"
          round
          @click="
            adduser_dialog = false;
            resetForm('addUser');
          "
          >取消</el-button
        >
        <el-button type="primary" round @click="checkAddData('user', 'addUser')"
          >确定</el-button
        >
      </div>
    </template>
  </el-dialog>
</template>
<script>
import {
  AddGroup,
  DeleteGroup,
  GetGroups,
  UpdateGroup,
  GetGroup
} from "@/api/group/group";
import {
  AddRole,
  DeleteRole,
  GetRole,
  GetRoles,
  UpdateRole,
} from "@/api/role/role";
import {
  DeleteUser,
  GetUser,
  GetUsers,
  UpdateUser,
  AddUser,
} from "@/api/user/user";
import CryptoJS from "crypto-js";
export default {
  data() {
    return {
      refName: "addUser",
      userLab: "user",
      auths: {
        node_detail: false,
        packet: false,
        icmp: false,
        port: false,
        shell: false,
        download: false,
        log: false,
        upload: false,
      },
      lab: "0",
      newaddrole_dialog: false,
      updaterole_dialog: false,
      showrole_dialog: false,
      addrole_dialog: false,
      apploading: true,
      currentPageRole: 1,
      pagesizeRole: 10,
      pageListRole: [10, 20, 30, 40],
      RoleTotal: 0,
      rolesdata: [],
      roleTotal: 0,
      getroleData: {
        filterName: "",
        page: 1,
        limit: 10,
      },
      getOneRoleData: {},
      getOneRoleAuthArr: [],
      addroleData: {
        role: "",
        auth: "",
      },
      newauth: "",
      updateRoleData: {
        role: "",
        auth: "",
      },
      getGroupsData: {
        filterName: "",
        page: 1,
        limit: 10,
      },
      getGroupList: [],
      getOneGroupData:{},
      addGroupData: {
        groupName: "",
        role: "",
      },
      addgroup_dialog: false,
      updategroup_dialog: false,
      updateGroupData: {
        groupName: "",
        role: "",
      },
      groupname: "",
      getUserList: [],
      getUsersData: {
        filterName: "",
        page: 1,
        limit: 10,
      },
      currentPage: 1,
      pagesize: 10,
      pageList: [10, 20, 30, 40],
      Total: 0,
      getOneUserData: {},
      showuser_dialog: false,
      //是否明文显示
      plain: false,
      updateUserData: {
        username: "",
        password: "",
        groupName: "",
      },
      updateuser_dialog: false,
      oldpassword: "",
      newpassword: "",
      oldflag: true,
      newflag: false,
      newflag2: true,
      addUserData: {
        username: "",
        password: "",
        groupName: "",
      },
      adduser_dialog: false,
      addUserRules: {
        username: [
          {
            required: true,
            message: "请填写用户名",
            trigger: "change",
          },
        ],
        password: [
          {
            required: true,
            message: "请填写密码",
            trigger: "change",
          },
        ],
        groupName: [
          {
            required: true,
            message: "请选择用户组",
            trigger: "change",
          },
        ],
      },
      addgroupRules: {
        groupName: [
          {
            required: true,
            message: "请填写用户组",
            trigger: "change",
          },
        ],
        role: [
          {
            required: true,
            message: "请选择角色",
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    //重置表单
    resetForm(formName) {
      //this.$refs可以获取到该表单对象所有组件的值
      // resetFields方法可以重置表单字段的值
      this.$refs[formName].resetFields();
    },
    //添加用户前的验证表单
    checkAddData(obj, formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (obj == "user") {
            this.addUser(formName);
          } else {
            this.addGroup(formName);
          }
        } else {
          // this.resetForm(formName)
          return false;
        }
      });
    },
    //添加用户
    addUser(formName) {
      AddUser(this.addUserData)
        .then((res) => {
          this.$message.success({
            message: res.msg,
          });
          this.getUsers();
        })
        .catch((res) => {
          this.$message.error({
            message: res.err,
          });
        })
        .finally(() => {
          this.resetForm(formName);
          this.adduser_dialog = false;
        });
    },
    resetUpdateUserData() {
      this.updateUserData = {
        username: "",
        password: "",
        groupName: "",
      };
      this.oldpassword = "";
      this.newpassword = "";
      this.oldflag = true;
      this.newflag = false;
      this.newflag2 = true;
    },
    //对比2个新密码
    checkDoublePwd() {
      if (this.newpassword == this.updateUserData.password) {
        this.newflag2 = true;
      } else {
        this.newflag2 = false;
      }
    },
    //对比新密码
    checkNewPwd() {
      if (this.newpassword == this.oldpassword) {
        this.newflag = true;
      } else {
        this.newflag = false;
      }
    },
    //对比旧密码
    checkOldPwd() {
      if (this.oldpassword == this.getOneUserData.password) {
        this.oldflag = true;
      } else {
        this.oldflag = false;
      }
    },
    checkUpdateUserInfo() {
      let flag = false;
      // console.log(this.oldflag, this.newflag, this.newflag2);
      //那就是啥也没变
      if (
        this.updateUserData.password == "" &&
        this.updateUserData.groupName == ""
      ) {
        return;
      }
      //改了密码的情况下
      if (this.updateUserData.password != "") {
        //代表密码修改合格
        if (!this.oldflag || this.newflag || !this.newflag2) {
          //标志位可以进行更新
          return;
        }
      } else {
        this.updateUserData.password = this.getOneUserData.password;
      }

      //没改用户组的情况下
      if (this.updateUserData.groupName == "") {
        this.updateUserData.groupName = this.getOneUserData.groupName;
      }
      this.updateUser();
    },
    //更新用户
    updateUser() {
      this.updateuser_dialog = false;
      this.updateUserData.username = this.getOneUserData.username;
      UpdateUser(this.updateUserData)
        .then((res) => {
          this.$message.success({
            message: res.msg,
          });
          this.getUsers();
        })
        .catch((res) => {
          this.$message.error({
            message: res.err,
          });
        })
        .finally((_) => {
          // this.updategroup_handleClose();
          this.resetUpdateUserData();
        });
    },
    //切换密文明文显示
    switchShow(text) {
      if (text) {
        // console.log("text ", text);
        // return text
        if (this.plain) {
          return text;
        } else {
          let mtext = "";
          for (let i = 0; i < text.length; i++) {
            mtext += "*";
          }
          // console.log("mtext ", mtext);
          return mtext;
        }
      }
    },
    //密文转换
    encryptedString(text) {
      // 使用 AES 加密算法对字符串进行加密
      return CryptoJS.AES.encrypt(text, "123321123").toString();
    },
    //获取单条用户信息
    getUser(user) {
      GetUser(user)
        .then((res) => {
          this.getOneUserData = res.data;
          // console.log("用户信息：", this.getOneUserData);
        })
        .catch((res) => {
          this.$message.error({
            message: res.err,
          });
        });
    },
    //删除用户
    deleteUser(user) {
      DeleteUser(user)
        .then((res) => {
          this.$message.success({
            message: res.msg,
          });
          this.getUsers();
        })
        .catch((res) => {
          this.$message.error({
            message: res.err,
          });
        });
    },
    //根据lab判断获取用户还是用户组
    getData() {
      // console.log("lab:", this.userLab);
      if (this.userLab == "user") {
        this.getUsers();
      } else {
        this.getGroups();
      }
    },
    //用户、用户组分页
    handleSizeChange(size) {
      console.log(`每页 ${size} 条`);
      this.pagesize = size;
      if (this.userLab == "user") {
        this.getUsers();
      } else {
        this.getGroups();
      }
    },
    handleCurrentChange(page) {
      this.currentPage = page;
      console.log("当前页: ", this.currentPageRole);
      if (this.userLab == "user") {
        this.getUsers();
      } else {
        this.getGroups();
      }
    },
    //获取用户列表
    getUsers() {
      this.getUsersData.page = this.currentPage;
      this.getUsersData.limit = this.pagesize;
      GetUsers(this.getUsersData)
        .then((res) => {
          this.getUserList = res.data.items;
          this.Total = res.data.total;
          // console.log("用户列表：", res.data);
        })
        .catch((res) => {
          this.$message.error({
            message: res.err,
          });
        });
    },
    //group重置数据
    updategroup_handleClose() {
      this.updategroup_dialog = false;
      this.updateGroupData = {
        groupName: "",
        role: "",
      };
    },
    //修改用户组
    updateGroup() {
      UpdateGroup(this.updateGroupData)
        .then((res) => {
          this.$message.success({
            message: res.msg,
          });
          this.getGroups();
        })
        .catch((res) => {
          this.$message.error({
            message: res.err,
          });
        })
        .finally((_) => {
          this.updategroup_handleClose();
        });
    },
    resetGroupData() {
      this.addgroup_dialog = false;
      this.addGroupData = {
        groupName: "",
        role: "",
      };
    },
    //检查添加用户组数据
    checkGroupData(opt) {
      this.updateGroupData.groupName = this.groupname;
      if (
        this.updateGroupData.groupName == "" &&
        this.updateGroupData.role == ""
      ) {
        this.$message.error({
          message: "用户组或role不得为空",
        });
        return;
      }
      if (opt == "add") {
        this.addGroup();
      } else {
        this.updateGroup();
      }

      this.resetGroupData();
    },
    //添加用户组
    addGroup(formName) {
      AddGroup(this.addGroupData)
        .then((res) => {
          this.$message.success({
            message: res.msg,
          });
          this.getGroups();
        })
        .catch((res) => {
          this.$message.error({
            message: res.err,
          });
        })
        .finally(() => {
          this.resetForm(formName);
          this.addgroup_dialog = false;
        });
    },
    addgroup_handleClose() {
      this.addgroup_dialog = false;
      this.addGroupData = {
        groupName: "",
        role: "",
      };
    },
    //删除确认信息
    deleteInfo(info, objname) {
      this.$confirm("确认删除" + info + " " + objname + " ?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          switch (info) {
            case "用户组":
              this.deleteGroup(objname);
              break;
            case "用户":
              this.deleteUser(objname);
              break;
            case "角色":
              this.deleteRole(objname);
              break;
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    deleteGroup(group) {
      DeleteGroup(group)
        .then((res) => {
          this.$message.success({
            message: res.msg,
          });
          this.getGroups();
        })
        .catch((res) => {
          this.$message.error({
            message: res.err,
          });
        });
    },
    //获取单个用户组
    getGroup(group){
      GetGroup(group)
      .then((res) => {
          this.getOneGroupData = res.data;
        })
        .catch((res) => {
          this.$message.error({
            message: res.err,
          });
        });
    },
    //获取用户组列表
    getGroups() {
      this.getGroupsData.page = this.currentPage;
      this.getGroupsData.limit = this.pagesize;
      GetGroups(this.getGroupsData)
        .then((res) => {
          this.getGroupList = res.data.items;
          // console.log("用户组为:", this.getGroupList);
          this.Total = res.data.total;
        })
        .catch((res) => {
          this.$message.error({
            message: res.err,
          });
        });
    },
    updateRole() {
      UpdateRole(this.updateRoleData)
        .then((res) => {
          this.$message.success({
            message: res.msg,
          });
          this.getRoles();
          this.resetAuth();
        })
        .catch((res) => {
          this.$message.error({
            message: res.err,
          });
        });
    },
    //没有新增权限的更新比对
    updateBeforRole(role) {
      this.updateRoleData.auth = "";
      let flag = 0;
      let sourcearr = this.getOneRoleData.auth.split(",");
      if (sourcearr.length == this.getOneRoleAuthArr.length) {
        for (let i in sourcearr) {
          for (let j in this.getOneRoleAuthArr) {
            if (sourcearr[i] == this.getOneRoleAuthArr[j]) {
              flag++;
            }
          }
        }
        if (flag == sourcearr.length) {
          //代表没变,不更新
          // console.log("没变,不更新");
          return;
        } else {
          //变了,更新
          for (let j in this.getOneRoleAuthArr) {
            this.updateRoleData.auth += this.getOneRoleAuthArr[j] + ",";
          }
          this.updateRoleData.auth = this.updateRoleData.auth.slice(0, -1);
          // console.log("最新权限为:", this.updateRoleData.auth);
        }
      } else {
        for (let j in this.getOneRoleAuthArr) {
          this.updateRoleData.auth += this.getOneRoleAuthArr[j] + ",";
        }
        this.updateRoleData.auth = this.updateRoleData.auth.slice(0, -1);
        // console.log("最新权限为:", this.updateRoleData.auth);
      }
      this.updateRoleData.role = this.getOneRoleData.role;
      // console.log("需要更新角色信息: ", this.updateRoleData);
      this.updateRole();
    },
    resetAuth() {
      this.auths = {
        node_detail: false,
        packet: false,
        icmp: false,
        port: false,
        shell: false,
        download: false,
        log: false,
        upload: false,
      };
    },
    //开始新增权限
    add_auth() {
      this.getOneRoleAuthArr = [];
      for (let k in this.auths) {
        if (this.auths[k]) {
          this.getOneRoleAuthArr.push(k);
        }
      }
      this.resetAuth();
    },
    //权限比对
    authdiff() {
      this.resetAuth();
      for (let k in this.auths) {
        // console.log("map", k);
        for (let i in this.getOneRoleAuthArr) {
          // console.log("arr: ", this.getOneRoleAuthArr[i]);
          if (k == this.getOneRoleAuthArr[i]) {
            this.auths[k] = true;
          }
        }
      }
    },
    //移除权限
    removeAuth(auth) {
      for (let k in this.getOneRoleAuthArr) {
        if (auth == this.getOneRoleAuthArr[k]) {
          this.getOneRoleAuthArr.splice(k, 1);
          // console.log("修改后的权限组:", this.getOneRoleAuthArr);
        }
      }
      this.authdiff();
    },
    deleteRole(role) {
      DeleteRole(role)
        .then((res) => {
          this.$message.success({
            message: res.msg,
          });
          this.getRoles();
        })
        .catch((res) => {
          this.$message.error({
            message: res.err,
          });
        });
    },
    //labels显示长度限制
    ellipsis(text) {
      // 判断lables的长度是否大于15，为true则0-20位正常显示，之后的显示...，为false则直接返回值
      return text.length > 15 ? text.substring(0, 20) + "..." : text;
    },
    //获取单条role
    getFilterRole(role) {
      GetRole(role)
        .then((res) => {
          // console.log("获取到:", res);
          this.getOneRoleData = res.data;
          this.getOneRoleAuthArr = this.getOneRoleData.auth.split(",");
        })
        .catch((res) => {
          //   console.log("报错为:", res.err);
          this.$message.error({
            message: res.err,
          });
        });
    },
    //添加角色关闭时的处理方法
    addrole_handleClose() {
      this.addrole_dialog = false;
      this.resetAuth();
      this.addroleData = {
        role: "",
        auth: "",
      };
      this.lab = "0";
    },
    //权限组组装数据
    authopt() {
      this.addroleData.auth = "";
      for (let k in this.auths) {
        // console.log("key: ", k, " value: ", this.auths[k]);
        if (this.auths[k]) {
          this.addroleData.auth += k + ",";
        }
      }
      this.addroleData.auth = this.addroleData.auth.slice(0, -1);
      // console.log("权限组：", this.addroleData.auth);
    },
    checkRoleData() {
      this.authopt();
      if (this.addroleData.role == "" || this.addroleData.auth == "") {
        this.$message.error({
          message: "role或权限分配不得为空",
        });
        return;
      }
      this.addRole();
    },
    addRole() {
      AddRole(this.addroleData)
        .then((res) => {
          this.$message.success({
            message: res.msg,
          });
        })
        .catch((res) => {
          this.$message.error({
            message: res.err,
          });
        })
        .finally(() => {
          this.addrole_handleClose();
          this.getRoles();
        });
    },
    //role分页
    handleSizeChangeRole(size) {
      // console.log(`每页 ${size} 条`);
      this.pagesizeRole = size;
      //   this.getPodList();
      this.getRoles(this.getroleData);
    },
    handleCurrentChangeRole(page) {
      this.currentPageRole = page;
      // console.log("当前页: ", this.currentPageRole);
      //   this.getPodList();
      this.getRoles(this.getroleData);
    },
    //转换时间戳
    timeTrans(timestamp) {
      let date = new Date(new Date(timestamp).getTime() + 8 * 3600 * 1000);
      date = date.toJSON();
      date = date.substring(0, 19).replace("T", " ");
      return date;
    },
    getRoles() {
      this.getroleData.page = this.currentPageRole;
      this.getroleData.limit = this.pagesizeRole;
      GetRoles(this.getroleData)
        .then((res) => {
          console.log("role列表：", res);
          this.rolesdata = res.data.items;
          this.roleTotal = res.data.total;
          console.log("role:", this.rolesdata[0].role);
        })
        .catch((res) => {
          console.log("报错：", res.err);
        })
        .finally(() => {
          this.apploading = false;
        });
    },
  },
  beforeMount() {
    this.getRoles();
    // this.getGroups();
    this.getUsers();
  },
};
</script>
<style>
.iconn {
  width: 19px;
  height: 22px;
  margin-top: 1px;
}
.iconn:hover {
  cursor: pointer;
  opacity: 0.7;
}
.iconn:active {
  opacity: 1;
}
.roleshow {
  height: 600px;
  overflow: auto; /* 自动开启滚动条 */
  max-height: 650px; /* 设置最大高度 */
  margin-top: 5px;
}
.show:hover {
  cursor: pointer;
  opacity: 0.7;
}
.show:active {
  opacity: 1;
}
.userShow{
  height: 550px;
  overflow: auto; /* 自动开启滚动条 */
  max-height: 630px; /* 设置最大高度 */
  margin-top: 5px;
}
</style>
