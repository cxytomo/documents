/*cxytomo 2019-05-10*/

##字符串的一些方法
按照自己的记忆方式整理的字符串方法，可能不科学，但是便于自己记忆

###增(个人比较常用的是“+”)
####concat
```
str.concat(string2[, string3, ..., stringN])
```

###删
slice
收尾去空格 trim trimStart trimEnd

###改
转换 toUpperCase toLowerCase
大小写转换，
字符类型转换


###查
更具字符串查位置indexOf，lastIndexOf,search(支持正则),charAt,charCodeAt
根据位置查字符串
是否包含某字符串 include,match


###其他
####截断
slice(0, n) ---> 默认不包含n , slice(n)，第二个参数缺省默认到末尾
