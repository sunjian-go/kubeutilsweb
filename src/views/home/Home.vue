<template>
  <div style="height: 650px; padding-left: 15px" class="scrollable">
    <el-row>
      <el-col :span="22">
        <div>
          <el-row>
            <div v-for="(data, i) in clus" :key="i">
              <el-col :span="6" style="padding-top: 10px">
                <el-card
                  shadow="never"
                  style="
                    margin-left: 10px;
                    height: 180px;
                    width: 355px;
                    border-radius: 15px;
                    background-color: rgb(230, 240, 247);
                  "
                >
                  <div>
                    <el-row>
                      <el-col :span="20">
                        <div v-if="data.status == 'active'">
                          集群：<span
                            @click="
                              opt_dialog = true;
                              jump(data.cluster_name);
                            "
                            style="color: rgb(29, 122, 243)"
                            class="cluster"
                            >{{ data.cluster_name }}</span
                          >
                        </div>
                        <div v-if="data.status == 'inactive' || !data.status">
                          集群：<span
                            @click="
                              opt_dialog = true;
                              jump(data.cluster_name);
                            "
                            style="color: red"
                            class="cluster"
                            >{{ data.cluster_name }}</span
                          >
                        </div>
                        <div style="padding-top: 5px">
                          <span
                            style="font-size: 12px; color: rgb(151, 151, 151)"
                            >创建时间：{{ timeTrans(data.created_at) }}</span
                          >
                        </div>
                      </el-col>
                      <el-col :span="4">
                        <el-image
                          :src="logo"
                          class="logocl"
                          @click="
                            opt_dialog = true;
                            jump(data.cluster_name);
                          "
                        ></el-image>
                      </el-col>
                    </el-row>
                  </div>
                  <el-divider />
                  <div>
                    <el-row>
                      <el-col :span="9">
                        <div style="padding-top: 5px">
                          <el-row>
                            <el-col :span="5.5">
                              <el-text style="font-size: 13px" type="info"
                                >状态：</el-text
                              >
                            </el-col>
                            <el-col :span="2">
                              <div
                                v-if="data.status == 'active'"
                                :style="{ opacity: opacity }"
                                class="online"
                              ></div>
                              <div
                                v-if="data.status == 'inactive' || !data.status"
                                class="inonline"
                              ></div>
                            </el-col>
                            <el-col :span="14">
                              <el-text
                                v-if="data.status == 'active'"
                                type="success"
                                >在线</el-text
                              >
                              <el-text
                                v-if="data.status == 'inactive' || !data.status"
                                type="danger"
                                >离线</el-text
                              >
                            </el-col>
                          </el-row>
                        </div>
                      </el-col>
                      <el-col :span="11">
                        <div>
                          <el-row>
                            <el-col :span="6"></el-col>
                            <el-col :span="12">
                              <div style="padding-top: 5px">
                                <el-text
                                  style="font-size: 13px; margin-left: 10px"
                                  type="info"
                                  >K8s版本：</el-text
                                >
                              </div>
                            </el-col>
                            <el-col :span="5">
                              <el-tag size="large" style="font-size: 13px">{{
                                data.k8s_version
                              }}</el-tag>
                            </el-col>
                          </el-row>
                        </div>
                      </el-col>
                      <el-col :span="3">
                        <svg
                          @click="msgBox(data.cluster_name)"
                          t="1705544414478"
                          class="del"
                          viewBox="0 0 1024 1024"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          p-id="4367"
                          width="200"
                          height="200"
                        >
                          <path
                            d="M872.7 278.8H151.5c-30.3 0-55-24.7-55-55v-32.7c0-22 17.9-39.9 39.9-39.9h744.4c25.7 0 46.7 21 46.7 46.7v25.9c0 30.4-24.6 55-54.8 55z m-736.3-96.3c-4.8 0-8.6 3.9-8.6 8.7v32.7c0 13.1 10.7 23.7 23.7 23.7h721.2c13.2 0 23.6-10.4 23.6-23.7V198c0-8.5-7-15.5-15.5-15.5H136.4z"
                            fill="#E86262"
                            p-id="4368"
                          ></path>
                          <path
                            d="M602.9 182.5H421.1v-17.6c0-50.1 40.8-90.8 90.9-90.8 50.1 0 90.9 40.8 90.9 90.8v17.6zM454 151.2h116c-6.2-26.3-29.9-45.9-58-45.9-28.2 0-51.8 19.6-58 45.9zM695.8 948H328.1C267.4 948 218 898.6 218 837.9V247.6h588v590.3c0 60.7-49.4 110.1-110.2 110.1zM249.3 278.8v559c0 43.5 35.4 78.9 78.9 78.9h367.7c43.5 0 78.9-35.4 78.9-78.9v-559H249.3z"
                            fill="#E86262"
                            p-id="4369"
                          ></path>
                          <path
                            d="M400.7 784.9c-8.6 0-15.6-7-15.6-15.6v-386c0-8.6 7-15.6 15.6-15.6s15.6 7 15.6 15.6v386c0 8.6-7 15.6-15.6 15.6zM512 784.9c-8.6 0-15.6-7-15.6-15.6v-386c0-8.6 7-15.6 15.6-15.6s15.6 7 15.6 15.6v386c0 8.6-7 15.6-15.6 15.6zM623.3 728.9c-8.6 0-15.6-7-15.6-15.6v-330c0-8.6 7-15.6 15.6-15.6s15.6 7 15.6 15.6v330c0 8.6-7 15.6-15.6 15.6z"
                            fill="#E86262"
                            p-id="4370"
                          ></path>
                        </svg>
                      </el-col>
                    </el-row>
                  </div>
                </el-card>
              </el-col>
            </div>
          </el-row>
        </div>
      </el-col>
      <el-col :span="2">
        <div style="margin-left:50px">
        <el-button style="margin-top: 5px" circle @click="cluster_dialog = true"
          ><el-icon><Plus /></el-icon
        ></el-button>
        <el-button circle  style="margin-top: 5px" @click="searchdrawer = true" 
          ><el-icon><Search /></el-icon
        ></el-button></div>
      </el-col>
    </el-row>
    <el-empty
      style="margin-top: 150px"
      description="请先添加集群"
      v-if="clus == ''"
    />
  </div>
  <div style="padding-top: 15px">
    <el-pagination
      :current-page="currentPage"
      :page-size="pagesize"
      :page-sizes="pageList"
      :small="true"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="cluTotal"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
  <!-- 添加集群 -->
  <el-dialog
    v-model="cluster_dialog"
    title="添加集群"
    width="40%"
    style="border-radius: 15px; margin-top: 50px"
  >
    <div>
      <span style="font-weight: bold">部署agent服务（仅需部署一个节点）</span
      ><br /><br />
      <span>在你的master节点执行以下命令：</span>
      <el-input
        ref="inputcmd1"
        v-model="inputcmd"
        style="width: 90%; margin-top: 4px"
        @input="inputcmd == inputcmdbak ? _ : (inputcmd = inputcmdbak)"
      />
      <el-button @click="copyToClipboard('inputcmd1')" style="margin-top: 4px">
        <svg
          t="1705980328555"
          style="width: 20px; height: 25px"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="7374"
          width="200"
          height="200"
        >
          <path
            d="M720 192h-544A80.096 80.096 0 0 0 96 272v608C96 924.128 131.904 960 176 960h544c44.128 0 80-35.872 80-80v-608C800 227.904 764.128 192 720 192z m16 688c0 8.8-7.2 16-16 16h-544a16 16 0 0 1-16-16v-608a16 16 0 0 1 16-16h544a16 16 0 0 1 16 16v608z"
            p-id="7375"
          ></path>
          <path
            d="M848 64h-544a32 32 0 0 0 0 64h544a16 16 0 0 1 16 16v608a32 32 0 1 0 64 0v-608C928 99.904 892.128 64 848 64z"
            p-id="7376"
          ></path>
          <path
            d="M608 360H288a32 32 0 0 0 0 64h320a32 32 0 1 0 0-64zM608 520H288a32 32 0 1 0 0 64h320a32 32 0 1 0 0-64zM480 678.656H288a32 32 0 1 0 0 64h192a32 32 0 1 0 0-64z"
            p-id="7377"
          ></path>
        </svg> </el-button
      ><br />
      <div style="margin-top: 14px; width: 90%">
        <span>修改yaml中[configMap]中data块的参数为实际参数，例如：</span>
        <div>
          <el-card shadow="never" style="margin-top: 4px">
            <span>data:</span><br />
            <span>conf.ini: |-</span><br />
            <span>[server]</span><br />
            <span>model = k8s #部署方式(分docker和k8s两种，按需修改)</span
            ><br />
            <span>server_addr = 1.1.1.1 #server端地址</span><br />
            <span>port = 8999 #server端端口</span><br /><br />
            <span>[agent]</span><br />
            <span>cluster_name = test #地市名</span><br />
            <span>agent_addr = 2.2.2.2 #实际暴露出去的地址</span><br />
            <span>port = 8081 #实际暴露出去的端口(service的端口也要同步改)</span
            ><br /><br />
          </el-card>
        </div>
      </div>
      <div style="margin-top: 14px">
        <span>最后执行以下命令：</span>
        <el-input
          ref="inputcmd2"
          v-model="inputcmd2"
          style="width: 90%; margin-top: 4px"
          @input="inputcmd2 == inputcmdbak2 ? _ : (inputcmd2 = inputcmdbak2)"
        />
        <el-button
          @click="copyToClipboard('inputcmd2')"
          style="margin-top: 4px"
        >
          <svg
            t="1705980328555"
            style="width: 20px; height: 25px"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="7374"
            width="200"
            height="200"
          >
            <path
              d="M720 192h-544A80.096 80.096 0 0 0 96 272v608C96 924.128 131.904 960 176 960h544c44.128 0 80-35.872 80-80v-608C800 227.904 764.128 192 720 192z m16 688c0 8.8-7.2 16-16 16h-544a16 16 0 0 1-16-16v-608a16 16 0 0 1 16-16h544a16 16 0 0 1 16 16v608z"
              p-id="7375"
            ></path>
            <path
              d="M848 64h-544a32 32 0 0 0 0 64h544a16 16 0 0 1 16 16v608a32 32 0 1 0 64 0v-608C928 99.904 892.128 64 848 64z"
              p-id="7376"
            ></path>
            <path
              d="M608 360H288a32 32 0 0 0 0 64h320a32 32 0 1 0 0-64zM608 520H288a32 32 0 1 0 0 64h320a32 32 0 1 0 0-64zM480 678.656H288a32 32 0 1 0 0 64h192a32 32 0 1 0 0-64z"
              p-id="7377"
            ></path>
          </svg> </el-button
        ><br />
      </div>
      <br /><span style="font-weight: bold"
        >部署抓包插件（集群中每个节点都需要部署）</span
      ><br /><br />
      <span>在每个节点执行以下命令：</span>
      <el-input
        ref="plugincmd1"
        v-model="inputcmd3"
        style="width: 90%; margin-top: 4px"
        @input="inputcmd3 == inputcmdbak3 ? _ : (inputcmd3 = inputcmdbak3)"
      />
      <el-button @click="copyToClipboard('plugincmd1')" style="margin-top: 4px">
        <svg
          t="1705980328555"
          style="width: 20px; height: 25px"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="7374"
          width="200"
          height="200"
        >
          <path
            d="M720 192h-544A80.096 80.096 0 0 0 96 272v608C96 924.128 131.904 960 176 960h544c44.128 0 80-35.872 80-80v-608C800 227.904 764.128 192 720 192z m16 688c0 8.8-7.2 16-16 16h-544a16 16 0 0 1-16-16v-608a16 16 0 0 1 16-16h544a16 16 0 0 1 16 16v608z"
            p-id="7375"
          ></path>
          <path
            d="M848 64h-544a32 32 0 0 0 0 64h544a16 16 0 0 1 16 16v608a32 32 0 1 0 64 0v-608C928 99.904 892.128 64 848 64z"
            p-id="7376"
          ></path>
          <path
            d="M608 360H288a32 32 0 0 0 0 64h320a32 32 0 1 0 0-64zM608 520H288a32 32 0 1 0 0 64h320a32 32 0 1 0 0-64zM480 678.656H288a32 32 0 1 0 0 64h192a32 32 0 1 0 0-64z"
            p-id="7377"
          ></path>
        </svg> </el-button
      ><br />
      <el-input
        ref="plugincmd2"
        v-model="inputcmd4"
        style="width: 90%; margin-top: 4px"
        @input="inputcmd4 == inputcmdbak4 ? _ : (inputcmd4 = inputcmdbak4)"
      />
      <el-button @click="copyToClipboard('plugincmd2')" style="margin-top: 4px">
        <svg
          t="1705980328555"
          style="width: 20px; height: 25px"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="7374"
          width="200"
          height="200"
        >
          <path
            d="M720 192h-544A80.096 80.096 0 0 0 96 272v608C96 924.128 131.904 960 176 960h544c44.128 0 80-35.872 80-80v-608C800 227.904 764.128 192 720 192z m16 688c0 8.8-7.2 16-16 16h-544a16 16 0 0 1-16-16v-608a16 16 0 0 1 16-16h544a16 16 0 0 1 16 16v608z"
            p-id="7375"
          ></path>
          <path
            d="M848 64h-544a32 32 0 0 0 0 64h544a16 16 0 0 1 16 16v608a32 32 0 1 0 64 0v-608C928 99.904 892.128 64 848 64z"
            p-id="7376"
          ></path>
          <path
            d="M608 360H288a32 32 0 0 0 0 64h320a32 32 0 1 0 0-64zM608 520H288a32 32 0 1 0 0 64h320a32 32 0 1 0 0-64zM480 678.656H288a32 32 0 1 0 0 64h192a32 32 0 1 0 0-64z"
            p-id="7377"
          ></path>
        </svg> </el-button
      ><br />
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cluster_dialog = false">Cancel</el-button>
        <el-button type="primary" @click="cluster_dialog = false">
          OK
        </el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 选择进入页面dialog -->
  <el-dialog
    v-model="opt_dialog"
    :show-close="false"
    title="选择进入"
    style="width: 350px; border-radius: 15px"
  >
    <div>
      <el-row :gutter="20">
        <el-col :span="5">
          <el-tag round @click="jumpWorkflow('node')" class="otag">节点</el-tag>
        </el-col>
        <el-col :span="5">
          <el-tag round @click="jumpWorkflow('pod')" class="otag">Pod</el-tag>
        </el-col>
      </el-row>
    </div>
  </el-dialog>
  <el-drawer
    size="300"
    v-model="searchdrawer"
    :with-header="false"
    style="height: 75px; width: 20px; margin-top: 80px;margin-right:10px; border-radius: 15px"
    :close="resetSearch()"
  >
    <div>
      <el-row :gutter="5">
        <el-col :span="18">
          <el-input placeholder="请输入集群名" v-model="clusterName"></el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="getAllClus();searchdrawer=false" >搜索</el-button>
        </el-col>
      </el-row>
    </div>
  </el-drawer>
</template>
<script>
import { deleteClusters, getAllClusters } from "@/api/cluster/cluster";
import { getNodesReq } from "@/api/nodes/nodes";
import Cookies from "js-cookie";
export default {
  data() {
    return {
      searchdrawer: false,
      opt_dialog: false,
      host: "",
      inputcmd: "",
      inputcmdbak: "",
      inputcmd2: "kubectl apply -f kubeagent.yaml",
      inputcmdbak2: "kubectl apply -f kubeagent.yaml",
      inputcmd3: "",
      inputcmdbak3: "",
      inputcmd4: "chmod +x kubepacket && nohup ./kubepacket&",
      inputcmdbak4: "",
      cluster_dialog: false,
      background: "",
      disabled: false,
      //导入logo图片
      logo: require("@/assets/img/logoforclu.png"),
      clus: [],
      filterName: "",
      currentPage: 1,
      pagesize: 12,
      pageList: [12, 24, 36, 48],
      cluTotal: 0,
      node: "",
      k8sVersion: "",
      getClusterData: {
        filterName: "",
        page: 0,
        limit: 0,
      },
      //呼吸灯变量
      opacity: 1,
      increasing: true,
      clusterName: "",
      clustername: "",
    };
  },
  methods: {
    resetSearch(){
      this.clusterName=""
    },
    yamlUrl() {
      this.inputcmd =
        "curl -o kubeagent.yaml http://" + this.host + "/yaml/kubeagent.yaml";
      this.inputcmdbak =
        "curl -o kubeagent.yaml http://" + this.host + "/yaml/kubeagent.yaml";
    },
    plugUrl() {
      this.inputcmd3 =
        "curl -o kubepacket http://" + this.host + "/plugin/kubepacket";
      this.inputcmdbak3 =
        "curl -o kubepacket http://" + this.host + "/plugin/kubepacket";
    },
    copyToClipboard(ref) {
      let inputElement = this.$refs[ref];
      inputElement.select(); // 选择输入框中的文本内容
      document.execCommand("copy"); // 执行复制操作
      // inputElement.setSelectionRange(0, 0);
      this.$message.success({
        message: "复制文本到剪贴板成功",
      });
    },
    //删除集群
    deleteClu(cluname) {
      deleteClusters(cluname)
        .then((res) => {
          this.$message.success({
            message: res.msg,
          });

          //如果删除的集群刚好存在cookie中，就去置空cookie
          // if(Cookies.get("cluName") == cluname){
          //   Cookies.set("cluName","")
          // }
          this.getAllClus();
        })
        .catch((res) => {
          this.$message.info({
            message: res.err,
          });
        });
    },
    //消息弹出
    msgBox(cluname) {
      this.$confirm("是否删除 " + cluname + " 集群？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //调用删除方法
          this.deleteClu(cluname);
        })
        .catch(() => {});
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
        } else if (this.opacity <= 0.4) {
          this.increasing = true;
        }
      }, 150); // Adjust the interval as needed
    },
    //集群分页
    handleSizeChange(size) {
      console.log(`每页 ${size} 条`);
      this.pagesize = size;
      this.getAllClus();
    },
    handleCurrentChange(page) {
      console.log("当前页: ", page);
      this.currentPage = page;
      this.getAllClus();
    },
    //获取节点信息
    getNodes() {
      getNodesReq(this.cluName)
        .then((res) => {
          console.log("节点信息：", res.data);
          for (var i = 0; i < res.data.total; i++) {
            if (res.data.items[i].metadata.name.includes("master")) {
              this.k8sVersion =
                res.data.items[0].status.nodeInfo.kubeletVersion;
            }
          }
        })
        .catch((res) => {
          console.log("获取节点失败：", res);
        });
    },
    jump(cluName) {
      this.clustername = cluName;
    },
    //跳转到pod页面
    jumpWorkflow(opt) {
      if (opt == "pod") {
        this.$router.push({
          path: "/pod",
          query: {
            clusterName: this.clustername, //根据cluName跳转集群
          },
        });
      } else if (opt == "node") {
        this.$router.push({
          path: "/node",
          query: {
            clusterName: this.clustername, //根据cluName跳转集群
          },
        });
      }
    },
    //转换时间戳
    timeTrans(timestamp) {
      let date = new Date(new Date(timestamp).getTime() + 8 * 3600 * 1000);
      date = date.toJSON();
      date = date.substring(0, 19).replace("T", " ");
      return date;
    },
    //获取集群
    getAllClus() {
      this.getClusterData.filterName = this.clusterName;
      this.getClusterData.page = this.currentPage;
      this.getClusterData.limit = this.pagesize;

      getAllClusters(this.getClusterData)
        .then((res) => {
          // console.log("获取所有集群：", res.data);
          this.clus = res.data;
          this.cluTotal = res.total;

          //如果是undefined说明第一次登录该网站直接点了pod页，就直接把第一个集群置为默认值显示在pod页
          if (!Cookies.get("cluName")) {
            Cookies.set("cluName", this.clus[0].cluster_name);
          }

          //如果当前cookie里面有集群名，就遍历新获取的集群队列
          let flag = 0;
          for (let i in this.clus) {
            //如果里面有相等的就说名集群没被删除
            if (this.clus[i].cluster_name == Cookies.get("cluName")) {
              flag = 1;
            }
          }
          //flag不等于1说明集群被删除了
          if (flag != 1) {
            // console.log("集群被删除");
            Cookies.set("cluName", this.clus[0].cluster_name);
          }
        })
        .catch((res) => {
          this.$message.error({
            message: "获取集群失败：" + res,
          });
          // console.error("获取集群失败：", res.err);
        });
    },
  },
  mounted() {
    this.breathe();
  },
  beforeMount() {
    //获取所有集群
    this.getAllClus();
    this.host = window.location.host;
    // console.log("当前页面地址", this.host);
    this.yamlUrl();
    this.plugUrl();
  },
};
</script>
<style>
.logocl {
  height: 55px;
  width: 55px;
}
.logocl:hover {
  cursor: pointer;
}
.cluster:hover {
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
}
/* 集群显示滚动条 */
.scrollable {
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 650px; /* 设置最大高度 */
}
.online {
  margin-top: 8.5px;
  height: 7px;
  width: 7px;
  background-color: green;
  border-radius: 50px;
}
.inonline {
  margin-top: 8.5px;
  height: 7px;
  width: 7px;
  background-color: red;
  border-radius: 50px;
}
.del {
  width: 18px;
  height: 23px;
  margin-top: 5px;
  margin-left: 35px;
}
.del:hover {
  cursor: pointer;
}
.divcl {
  background: white;
}
.otag {
  width: 60px;
  height: 30px;
  font-size: 14px;
}
.otag:hover {
  cursor: pointer;
}
</style>
