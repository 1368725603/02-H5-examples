var sheetJson = {
    uploadXls: function (dom, callback, errorback) { // 上传本地excel方法
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
    },
    readWorkbookFromLocalFile: function (file, callback) { // 将excel的binary数据解析成JSON
        var reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = function (e) {
            var data = e.target.result;
            var workbook = XLSX.read(data, {type: 'binary'});
            // var json = JSON.stringify(XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]));
            var json = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
            if (callback) callback(json);
        };
    },
    downloadExl: function (data, name) { // js数据下载excel方法
        const wopts = {bookType: 'xlsx', bookSST: false, type: 'binary'}; // 定义导出的格式
        // const wopts = { bookType: 'csv', bookSST: false, type: 'binary' };//csv格式
        // const wopts = { bookType: 'ods', bookSST: false, type: 'binary' };//ods格式
        // const wopts = { bookType: 'xlsb', bookSST: false, type: 'binary' };//xlsb格式
        // const wopts = { bookType: 'fods', bookSST: false, type: 'binary' };//fods格式
        // const wopts = { bookType: 'biff2', bookSST: false, type: 'binary' };//xls格式
        var wb = {SheetNames: ['Sheet1'], Sheets: {}, Props: {}};
        wb.Sheets['Sheet1'] = XLSX.utils.json_to_sheet(data); // 通过json_to_sheet转成单页(Sheet)数据
        this.saveAs(new Blob([this.s2ab(XLSX.write(wb, wopts))], {type: "application/octet-stream"}), name + '.' + (wopts.bookType == "biff2" ? "xls" : wopts.bookType));
    },
    downloadExl_dom: function (dom, name) { // table标签下载excel方法
        const wopts = {bookType: 'xlsx', bookSST: false, type: 'binary'}; // 定义导出的格式
        // const wopts = { bookType: 'csv', bookSST: false, type: 'binary' };//csv格式
        // const wopts = { bookType: 'ods', bookSST: false, type: 'binary' };//ods格式
        // const wopts = { bookType: 'xlsb', bookSST: false, type: 'binary' };//xlsb格式
        // const wopts = { bookType: 'fods', bookSST: false, type: 'binary' };//fods格式
        // const wopts = { bookType: 'biff2', bookSST: false, type: 'binary' };//xls格式
        var wb = {SheetNames: ['Sheet1'], Sheets: {}, Props: {}};
        wb.Sheets['Sheet1'] = XLSX.utils.table_to_sheet(dom); // 通过table_to_sheet转成单页(Sheet)数据
        this.saveAs(new Blob([this.s2ab(XLSX.write(wb, wopts))], {type: "application/octet-stream"}), name + '.' + (wopts.bookType == "biff2" ? "xls" : wopts.bookType));
    },
    downloadExl_aoa: function (data, name) {
		const wopts = {bookType: 'xlsx', bookSST: false, type: 'binary'}; // 定义导出的格式
	    var wb = {SheetNames: ['Sheet1'], Sheets: {}, Props: {}};
        wb.Sheets['Sheet1'] = XLSX.utils.aoa_to_sheet(data); // 通过aoa_to_sheet转成单页(Sheet)数据
        // const wopts = { bookType: 'csv', bookSST: false, type: 'binary' };//csv格式
        // const wopts = { bookType: 'ods', bookSST: false, type: 'binary' };//ods格式
        // const wopts = { bookType: 'xlsb', bookSST: false, type: 'binary' };//xlsb格式
        // const wopts = { bookType: 'fods', bookSST: false, type: 'binary' };//fods格式
        // const wopts = { bookType: 'biff2', bookSST: false, type: 'binary' };//xls格式
	    wb.Sheets['Sheet1']['!merges'] = [
		    // 设置(0, 0)-(0, 2)、(0, 3)-(1, 3)单元格合并
		    {s: {r: 0, c: 0}, e: {r: 0, c: 2}},
		    {s: {r: 0, c: 3}, e: {r: 1, c: 3}},
		];
	    sheetJson.saveAs(new Blob([sheetJson.s2ab(XLSX.write(wb, wopts))], {type: "application/octet-stream"}), name + '.' + (wopts.bookType == "biff2" ? "xls" : wopts.bookType));
	},
    s2ab: function (s) {
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
    },
    saveAs: function (obj, fileName) { // 实现下载
        var hrefDom = document.createElement("a");
        hrefDom.download = fileName || '下载.xls';
        console.log('obj: ', obj);
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
    },
    toSheet: function (params) { // 将json数据转成sheet数据
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
    },
    toJson: function (params) { // 将sheet数据转成json数据
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
    },
};