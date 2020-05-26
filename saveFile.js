define(function (require) {
    var utils = require('util');
    return function (url, params, fileName) {
        var xhr = new XMLHttpRequest();
        xhr.open('get', url, true);
        xhr.responseType = 'arraybuffer';
        xhr.onload = function () {
            if (this.status === 200) {
                var filename = '';
                if (fileName !== undefined) {
                    filename = fileName;
                } else {
                    var disposition = xhr.getResponseHeader('Content-Disposition');
                    if (disposition && disposition.indexOf('attachment') !== -1) {
                        var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                        var matches = filenameRegex.exec(disposition);
                        if (matches != null && matches[1]) filename = decodeURIComponent(matches[1].replace(/['"]/g, ''));
                    }
                }
                
                var type = xhr.getResponseHeader('Content-Type');

                var blob;
                if (typeof File === 'function') {
                    try {
                        blob = new File([this.response], filename, {
                            type: type
                        });
                    } catch (e) {
                        /* Edge */ }
                }
                if (typeof blob === 'undefined') {
                    blob = new Blob([this.response], {
                        type: type
                    });
                }

                if (typeof window.navigator.msSaveBlob !== 'undefined') {
                    // IE workaround for "HTML7007: One or more blob URLs were revoked by closing the blob for which they were created. These URLs will no longer resolve as the data backing the URL has been freed."
                    window.navigator.msSaveBlob(blob, filename);
                } else {
                    var URL = window.URL || window.webkitURL;
                    var downloadUrl = URL.createObjectURL(blob);

                    if (filename) {
                        // use HTML5 a[download] attribute to specify filename
                        var a = document.createElement('a');
                        // safari doesn't support this yet
                        if (typeof a.download === 'undefined') {
                            window.location = downloadUrl;
                        } else {
                            a.href = downloadUrl;
                            a.download = filename;
                            document.body.appendChild(a);
                            a.click();
                        }
                    } else {
                        window.location = downloadUrl;
                    }

                    setTimeout(function () {
                        URL.revokeObjectURL(downloadUrl);
                    }, 100); // cleanup
                }
            } else {
                var decodeStr = new TextDecoder('utf-8').decode(new Uint8Array(this.response));
                try {
                    decodeStr = JSON.parse(decodeStr);
                    if (decodeStr.message !== undefined) {
                        utils.dialog.alert(decodeStr.message);
                    } else {
                        utils.dialog.alert('系统异常，请稍后再试');
                    }
                } catch (e) {
                    utils.dialog.alert('系统异常，请稍后再试');
                }
            }
        };
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send($.param(params));
    };
});
