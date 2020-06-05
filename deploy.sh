#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

git init
git add .
git commit -m 'deploy'

cd -

# 解决dist文件夹打包后git失缺重新push报错
git pull origin master --allow-unrelated-histories

# 连接远程仓库
git remote add origin https://github.com/bayniidt/vue_press.git

# 推送到远程仓库
git push -u origin master