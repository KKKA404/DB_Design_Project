# IDE

- vscode
  - ctrl+`（escape键下面的键）打开终端
  - 插件
    - vetur
    - prettier
    - auto close tag
    - autoprefixer
- webstorm

# git

几个常用的命令

```bash
git add <filename>
git add .
git add -A

git commit -am 'commit message'

git checkout <branchname>
git checkout <commithash>
git checkout <new_branch_name> -b

git push
git push <remotename> <branchname>
# e.g. git push origin fbc # push to the fbc branch in origin

git rm <filename>

git log --all --graph # history

git status # check status

git pull # use it every time you push or start coding

git merge <branchname> # merge
```

**不要使用**

```bash
git push --force
git push -f
```

可以用GitHub Desktop（当然，本质仍是命令行）

# eleme

最好的使用方法：直接从源码ctrl cv

# 参考代码

- https://github.com/PanJiaChen/vue-admin-template
  vue admin的精简版
  运行方法

  ```bash
  git clone https://github.com/PanJiaChen/vue-admin-template.git
  cd vue-admin-template
  npm install # recommend to use vpn due to network
  npm run dev
  ```

- https://github.com/liutengjian66/COVID
  ```bash
  npm install # recommend to use vpn due to network
  npm run serve
  ```
  
  



# other

多用google少用百度

中文查不到查英文