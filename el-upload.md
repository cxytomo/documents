1. get fileList via refs
this.$refs.uploadAdd.uploadFiles

2. usage of formData
const formData = new FormData()
formData.append('file', this.$refs.uploadAdd.uploadFiles[0])
const params = deepClone(this.form)
for (const key in params) {
  formData.append(key, params[key])
}

3. print formData
for (var pair of formData.entries()) {
  console.log(pair[0] + ', ' + pair[1])
}
