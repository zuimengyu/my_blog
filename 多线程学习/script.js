
        // 代码复制功能
        function copyCode(btn) {
            // 获取当前按钮对应的代码块
            const pre = btn.nextElementSibling;
            const code = pre.textContent;

            // 创建临时文本框复制内容
            const textarea = document.createElement('textarea');
            textarea.value = code;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);

            // 按钮状态提示
            btn.textContent = '已复制';
            btn.classList.add('copied');
            setTimeout(() => {
                btn.textContent = '复制代码';
                btn.classList.remove('copied');
            }, 1500);
        }

        // 移动端目录折叠/展开（可选增强）
        window.addEventListener('resize', function() {
            const sidebar = document.querySelector('.sidebar');
            const mainContent = document.querySelector('.main-content');
            if (window.innerWidth <= 992) {
                sidebar.style.display = 'block';
            } else {
                sidebar.style.display = 'block';
            }
        });
    