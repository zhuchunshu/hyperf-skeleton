import "./bootstrap";
import axios from "axios";
import swal from "sweetalert";

if (document.getElementById("app")) {
  const vue_header = {
    data() {
      return {
        Username: admin.username,
        Email: admin.email,
        avatar: "/logo.svg",
        menu: "加载中",
        setting_im: "/admin/setting/im",
      };
    },
    methods: {
      // 退出登陆
      logout() {
        axios
          .post("/admin/logout",{_token:csrf_token})
          .then(function (response) {
            var data = response.data;
            if (data.success === false) {
              swal({
                title: "出错啦!",
                text: data.result.msg,
                icon: "error",
              });
            } else {
              swal({
                title: "Success!",
                text: data.result.msg,
                icon: "success",
              });
              setTimeout(() => {
                location.href = data.result.url;
              }, 1000);
            }
          })
          .catch(function (error) {
            swal("请求错误,详细查看控制台");
            console.log(error);
          });
      },
    },
    mounted() {
      // 获取头像
      axios
        .post("/api/avatar", { email: admin.email,_token:csrf_token })
        .then((response) => (this.avatar = response.data.result.avatar))
        .catch(function (error) {
          swal("请求错误,头像获取失败,详细查看控制台");
          console.log(error);
        });
    },
  };
  Vue.createApp(vue_header).mount("#vue-header");
}
