/**
 * 引入js
 * @param strArray
 */
function importUtilJs() {

    /**
     * 一次性引入多个
     * @param strArray 要引入的js路径数组
     */
    this.importMore = function (strArray) {
        for (var i = 0; i < strArray.length; i++) {
            createUtilScript(strArray[i]);
        }
    }

    /**
     * 一次引如单个
     * @param str 要引入的js的路径
     */
    this.importOne = function (str) {
        createUtilScript(str);
    }

    /**
     * 默认加载一些工具js文件
     */
    this.defaultImport = function () {
        var data = [
            "result.js",
            "/pojo/CountResult.js",
            "/pojo/DevoteResult.js"
        ];
        this.importMore(data);
    }
}

/**
 * 创建script
 * @param jsName
 */
function createUtilScript(jsName) {
    var oHead = document.getElementsByTagName('HEAD').item(0);
    var oScript = document.createElement("script");
    oScript.type = "text/javascript";
    oScript.src = getUrl() + "/js/" + jsName;
    oHead.appendChild(oScript);
}

/**
 * 获取当前项目的地址和项目名
 * @returns {string}
 */
function getUrl() {
    //获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
    var curWwwPath = window.document.location.href;
    //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
    var pathName = window.document.location.pathname;
    var pos = curWwwPath.indexOf(pathName);
    //获取主机地址，如： http://localhost:8083
    var localhostPaht = curWwwPath.substring(0, pos);
    //获取带"/"的项目名，如：/uimcardprj
    var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
    return (localhostPaht + projectName);
}