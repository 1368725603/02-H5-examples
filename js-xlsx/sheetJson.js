// 上传excel方法
function uploadXls(dom, callback, errorback) {
    var file = document.createElement("input");
    file.type = 'file';
    // file.multiple = "multiple";  // 批量
    file.style.display = 'none';
    document.body.appendChild(file);
    file.onchange = function (e) {
        var files = e.target.files;
        // var files = file.files;
        if (files.length == 0) {
            // errorback && errorback("没有上传文件");
            return;
        }
        var f = files[0];
        if (!/\.xlsx$/g.test(f.name) && !/\.xls$/g.test(f.name)) {
            errorback && errorback('仅支持读取xlsx和xls格式！');
            return;
        }
        callback & callback(f);
    };
    dom.onclick = function () {
        file.click();
    }
}

// 将excel的binary数据解析成JSON
function readWorkbookFromLocalFile(file, callback) {
    var reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = function (e) {
        var data = e.target.result;
        var workbook = XLSX.read(data, {type: 'binary'});
        // var json = JSON.stringify(XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]));
        var json = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
        if (callback) callback(json);
    };
}

// 下载excel方法
function downloadExl(data, name) {
    const wopts = {bookType: 'xlsx', bookSST: false, type: 'binary'}; // 定义导出的格式
    // const wopts = { bookType: 'csv', bookSST: false, type: 'binary' };//ods格式
    // const wopts = { bookType: 'ods', bookSST: false, type: 'binary' };//ods格式
    // const wopts = { bookType: 'xlsb', bookSST: false, type: 'binary' };//xlsb格式
    // const wopts = { bookType: 'fods', bookSST: false, type: 'binary' };//fods格式
    // const wopts = { bookType: 'biff2', bookSST: false, type: 'binary' };//xls格式
    var wb = {SheetNames: ['Sheet1'], Sheets: {}, Props: {}};
    wb.Sheets['Sheet1'] = XLSX.utils.json_to_sheet(data); // 通过json_to_sheet转成单页(Sheet)数据
    saveAs(new Blob([s2ab(XLSX.write(wb, wopts))], {type: "application/octet-stream"}), name + '.' + (wopts.bookType == "biff2" ? "xls" : wopts.bookType));
}

function s2ab(s) {
    if (typeof ArrayBuffer !== 'undefined') {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i != s.length; ++ i) {
        		view[i] = s.charCodeAt(i) & 0xFF;
        }
        return buf;
    } else {
        var buf = new Array(s.length);
        for (var i = 0; i != s.length; ++ i) {
        		buf[i] = s.charCodeAt(i) & 0xFF;
        }
        return buf;
    }
}

// 实现下载
function saveAs(obj, fileName) {
    var hrefDom = document.createElement("a");
    hrefDom.download = fileName || '下载.xls';
    hrefDom.href = URL.createObjectURL(obj);
    hrefDom.style.display = "none";
    document.body.appendChild(hrefDom);
    hrefDom.click();
    document.body.removeChild(hrefDom);
    var set = setTimeout(function () { // 延时释放
        URL.revokeObjectURL(obj); // 用URL.revokeObjectURL()来释放这个object URL
        clearTimeout(set);  // 释放内存
        set = null;
    }, 100);
}

// 将json数据转成sheet数据
function toSheet(params) {
    if (!params) return [];
    var sheetName = params.sheetName;
    var datas = params.datas;
    var _datas = [];
    for (var i = 0; i < datas.length; i ++) {
        var data = datas[i];
        var _data = {}
        for (var key in sheetName) {
            _data[sheetName[key]] = data[key];
        }
        _datas.push(_data);
    }
    return _datas;
}

// 将sheet数据转成json数据
function toJson(params) {
    if (!params) return [];
    var sheetName = params.sheetName;
    var datas = params.datas;
    var _datas = [];
    for (var i = 0; i < datas.length; i ++) {
        var data = datas[i];
        var _data = {}
        for (var key in sheetName) {
            _data[key] = data[sheetName[key]]
        }
        _datas.push(_data);
    }
    return _datas;
}

var sheetJson = {
    uploadXls: uploadXls,
    readWorkbookFromLocalFile: readWorkbookFromLocalFile,
    downloadExl: downloadExl,
    toSheet: toSheet,
    toJson: toJson
};