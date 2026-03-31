<!DOCTYPE html>
<meta charset="utf-8">
<title>fetch VS axios 逐行对比</title>

<!-- 两个功能完全一样的页面 -->
账号：<input id="user" value="admin"><br>
密码：<input id="pwd" type="password" value="123456"><br>
<button onclick="loginFetch()">fetch 登录</button>
<button onclick="loginAxios()">axios 登录</button>

<hr>
<button onclick="getFetch()">fetch 获取数据</button>
<button onclick="getAxios()">axios 获取数据</button>
<pre id="result"></pre>

<!-- 只 axios 需要引入 -->
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

<script>
  // 全局变量，两个版本共用
  let token = '';
  const base = 'http://127.0.0.1:3000';

  // ==========================================================================================
  // ===================================== 登录函数对比 ======================================
  // ==========================================================================================
  //                    【 fetch 版本 】                                   【 axios 版本 】
  async function loginFetch() {                async function loginAxios() {
    // 拿输入框数据                               // 拿输入框数据
    const user = document.getElementById('user').value;
    const pwd = document.getElementById('pwd').value;

    try {                                       try {
      // 发请求                                   // 发请求
      const res = await fetch(base+'/api/login', {    const res = await axios.post(base+'/api/login', {
        method: 'POST',    // 必须写方法                      不用写 method！自动是 POST
        headers: {                              不用写 headers！自动是 JSON
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({                  不用 stringify！直接传对象
          username: user,
          password: pwd
        })
      });                                       });

      // 拿数据必须多一步 .json()                    直接就是 res.data
      const data = await res.json();               const data = res.data;

      // 后续逻辑完全一样                             // 后续逻辑完全一样
      alert(data.msg);                              alert(data.msg);
      if(data.code === 200) token = data.token;     if(data.code === 200) token = data.token;
    } catch (err) {                               } catch (err) {
      console.log('失败', err);                     console.log('失败', err);
    }                                             }
  }                                             }

  // ==========================================================================================
  // =================================== 获取数据函数对比 =====================================
  // ==========================================================================================
  //                    【 fetch 版本 】                                   【 axios 版本 】
  async function getFetch() {                   async function getAxios() {
    try {                                       try {
      const res = await fetch(base+'/api/userInfo', {  const res = await axios.get(base+'/api/userInfo', {
        method: 'GET',     // 可省略但建议写                   不写 method，自动是 GET
        headers: { token: token }  // 放请求头                 headers: { token }  // 写法一样
      });                                       });

      const data = await res.json();               const data = res.data;
      // 显示结果                                   // 显示结果
      document.getElementById('result').innerText = JSON.stringify(data, null, 2);
    } catch (err) {                               } catch (err) {
      console.log('失败', err);                     console.log('失败', err);
    }                                             }
  }                                             }
</script>