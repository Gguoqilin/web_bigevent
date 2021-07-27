// 大事件项目备用接口地址:
// http://api-breakingnwes-web.itheima.net/

$(function() {
    // 点击“去注册账号”的链接
    $('#link_reg').on('click', function() {
            $('.reg-box').show()
            $('.login-box').hide()
        })
        // 点击“去登录”的链接
    $('#link_login').on('click', function() {
        $('.reg-box').hide()
        $('.login-box').show()
    })

    // 从 layui 中获取 form 对象
    var form = layui.form
    var layer = layui.layer
        // 通过 form.verify() 函数自定义验证规则
    form.verify({
        // 自定义一个叫做 pwd 校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 校验两次密码是否一致的规则
        repwd: function(value) {
            /* 通过形参拿到的是确认密码框中的数据
            还需要拿到密码框中的数据
            进行一次等于判断
            如果失败则return一个提示消息 */
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次输入密码不一致!'
            }
        }
    })

    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) {
        // 1.阻止默认的提交行为
        e.preventDefault();
        // 2.发起Ajax 的POST请求
        var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }
        $.post('http://api-breakingnews-web.itheima.net/api/reguser', data, function(res) {
                if (res.status !== 0) {
                    // return console.log(res.message);
                    return layer.msg('res.message')
                }
                // console.log('注册成功!');
                layer.msg('注册成功,请登录!')
                    // 模拟人的点击行为
                $('#link_login').click()
            }

        )
    })

    // 监听登录表单的提交事件
    $('#form_login').submit(function(e) {
        //阻止默认提交行为
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/login',
            //快速获取表单中的数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登陆失败!')
                }
                layer.msg('登陆成功!')
                    //将登陆成功得到的 token 字符串,保存到localStorage中
                localStorage.setItem('token', res.token)
                    //跳转到后台主页
                location.href = '/index.html'
            }
        })
    })

})