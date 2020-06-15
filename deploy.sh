# /usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 初始化Git
git init

# 连接远程仓库
git remote add origin https://github.com/bayniidt/vue_press.git

# 添加
git add .

# 暂存
git commit -m 'deploy'


# 解决dist文件夹打包后git失缺重新push报错
# git pull origin master --allow-unrelated-histories



# 推送
git push -u origin master

cd -