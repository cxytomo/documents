#find pid by port
lsof -i :9099 // 9099port

#list existing node services
ps aux | grep node

#kill service by pid
kill -9 pid
