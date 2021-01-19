1.下载jquery
npm install jquery --save

2.vue.config.js中webpack配置configureWebpack添加jquery插件
```
const webpack = require("webpack");
module.exports = {
    configureWebpack: {
        //支持jquery
        plugins: [
            new webpack.ProvidePlugin({
                $:"jquery",
                jQuery:"jquery",
                "windows.jQuery":"jquery"
            })
        ]
    },
};
```

3.在eslint配置文件.eslintrc.js中配置
"env": {
  "jquery": true //全局引入jquery
}
