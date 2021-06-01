
@REM @REM 生成静态文件
@REM npm run build

@REM 进入生成的文件夹
cd docs/.vuepress/dist


@REM 初始化Git
git init

@REM 连接远程仓库
git remote add origin https://github.com/bayniidt/grow-pro.git

git add .

git commit -m 'deploy'

git push origin master

# cd -