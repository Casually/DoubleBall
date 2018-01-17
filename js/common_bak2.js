getById = function (e) {
    return document.getElementById(e);
}

getByClass = function (e) {
    return document.getElementsByClassName(e);
}

getByName = function (e) {
    return document.getElementsByName(e);
}

var shifou_wanquan_shuru = false;//定义是否完全输入计算

//定义大小，单双，龙虎，混合计算按钮
var da_xiao = false;
var dan_shuang = false;
var long_hu = false;
var hunhe_jisuan = false;
var input_num_index = -1;//定义当前输入数据位子
var qishu = 0;//定义期数显示

var yuanbeijingse = "";
var cunchusuoyou = new Array();//存储所有
var cunchudage = new Array();//存储单个

var niuzhuangweizhi = 4;//定义扭转节点

/**
 * 定义清除开关，是否进行数据清除
 */
var clear_daxiao = true;
var clear_danshuang = true;
var clear_longhu = true;
var clear_hunhejisuan = true;

var input_num_name_array = getByName("view-input-num");

document.addEventListener("click", function (e) {

})

/**
 * 按钮点击事件监听
 */
document.addEventListener("mousedown", function (e) {
    var click_element = e.toElement;

    switch (click_element.getAttribute("name")) {
        case "input_num":
            if (daxiao_queren || danshuang_queren || longhu_quren || hunhejisuan_quren) {
                return
            }
            if (input_num_index < input_num_name_array.length - 1) {
                input_num_index++;
            } else {
                return;
            }
            input_num_name_array[input_num_index].innerHTML = click_element.innerHTML;
            click_element.style.backgroundColor = "red";
            input_num_name_array[input_num_index].style.backgroundColor = "green";
            break;
        case "count_type":
            switch (click_element.innerHTML) {
                case "大小":
                    if (da_xiao) {
                        da_xiao = false;
                        click_element.style.backgroundColor = yuanbeijingse
                    } else {
                        da_xiao = true;
                        click_element.style.backgroundColor = "#ffd32f"
                    }
                    break;
                case "单双":
                    if (dan_shuang) {
                        dan_shuang = false;
                        click_element.style.backgroundColor = yuanbeijingse
                    } else {
                        dan_shuang = true;
                        click_element.style.backgroundColor = "#ffd32f"
                    }
                    break;
                case "龙虎":
                    if (long_hu) {
                        long_hu = false;
                        click_element.style.backgroundColor = yuanbeijingse
                    } else {
                        long_hu = true;
                        click_element.style.backgroundColor = "#ffd32f"
                    }
                    break;
                default :
                    if (hunhe_jisuan) {
                        hunhe_jisuan = false;
                        click_element.style.backgroundColor = yuanbeijingse
                    } else {
                        hunhe_jisuan = true;
                        click_element.style.backgroundColor = "#ffd32f"
                    }
                    break;
            }
            break;
        case "view-input-num":
            console.log(e.toElement.getAttribute("data"))
            if ((da_xiao && daxiao_queren) || (dan_shuang && danshuang_queren) || (long_hu && longhu_quren) || (hunhe_jisuan && hunhejisuan_quren)) {
                return;
            }
            if (!is_null(e.toElement.innerHTML)) {
                for (var i = 0; i < input_num_name_array.length; i++) {
                    input_num_name_array[i].style.backgroundColor = yuanbeijingse;
                }
                input_num_index = parseInt(e.toElement.getAttribute("data")) - 1;
                e.toElement.style.backgroundColor = "#2fdd89";
            }
            break;
    }
})

document.addEventListener("mouseup", function (e) {
    var click_element = e.toElement;
    if (click_element.getAttribute("name") === "input_num") {
        click_element.style.backgroundColor = yuanbeijingse;
        input_num_name_array[input_num_index].style.backgroundColor = yuanbeijingse;
    }
})

var enter_key = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
document.addEventListener("keydown", function (ev) {
    console.log(ev.key)
    if (daxiao_queren || danshuang_queren || longhu_quren || hunhejisuan_quren) {
        return
    }
    if (getById("daxiao_beilv") == document.activeElement
        || getById("danshuang_beilv") == document.activeElement
        || getById("longhu_beilv") == document.activeElement
        || getById("hunhejisuan_beilv") == document.activeElement) {
        console.log("倍率获得焦点");
        return;
    }
    for (var i = 0; i < enter_key.length; i++) {
        if (ev.key == enter_key[i]) {
            if (input_num_index < input_num_name_array.length - 1) {
                input_num_index++;
            } else {
                return;
            }
            input_num_name_array[input_num_index].innerHTML = ev.key;
            getByName("input_num")[ev.key].style.backgroundColor = "red";
            input_num_name_array[input_num_index].style.backgroundColor = "green";
            break;
        }
    }
    if (ev.key === "Enter") {
        input_num_enter();
    }
})

document.addEventListener("keyup", function (ev) {
    for (var i = 0; i < enter_key.length; i++) {
        if (ev.key == enter_key[i]) {
            getByName("input_num")[ev.key].style.backgroundColor = yuanbeijingse;
            input_num_name_array[input_num_index].style.backgroundColor = yuanbeijingse;
            break;
        }
    }
})

/**
 * 小键盘事件
 */
//获取所有的显示
var daxiao_da_view_array = getByName("da_xiao_da");
var daxiao_xiao_view_array = getByName("da_xiao_xiao");
var danshuang_dan_view_array = getByName("dan_shuang_dan");
var danshuang_shuang_view_array = getByName("dan_shuang_shuang");
var longhu_long_view_array = getByName("long_hu_long");
var longhu_hu_view_array = getByName("long_hu_hu");

/**
 * 定义当前投注盈亏次数
 * @type {number}
 */
var daxiao_touzhu_ying_size = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var daxiao_touzhu_kui_size = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var danshaung_touzhu_ying_size = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var danshuang_touzhu_kui_size = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var longhu_touzhu_ying_size = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var longhu_touzhu_kui_size = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

/**
 * 定义当前投注计算第几组
 * @type {number}
 */
var dangqian_daxiao_zu = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var dangqian_danshuang_zu = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var dangqian_longhu_zu = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

/**
 * 定义累计连续赢多少次进行重置
 * @type {number}
 */
var chongzhi_daxiao_changdu = 20;
/**
 * 定义计算开关，防止重复计算
 * @type {boolean}
 */
var daxiao_queren = false;
var danshuang_queren = false;
var longhu_quren = false;
var hunhejisuan_quren = false;

function input_num_enter() {//确认事件

    var shurugeshu = -1;
    for (var i = 0; i < input_num_name_array.length; i++) {
        if (!is_null(input_num_name_array[i].innerHTML))
            shurugeshu++;
    }

    input_num_index = shurugeshu;

    if (shifou_wanquan_shuru && input_num_index < 9) {
        return;
    }
    if (!shifou_wanquan_shuru && input_num_index < 0) {
        return
    }

    if (da_xiao) {
        if (daxiao_queren) {
            clear_daxiao = true;
        } else {
            clear_daxiao = false;
        }
    } else {
        clear_daxiao = true;
    }

    if (dan_shuang) {
        if (danshuang_queren) {
            clear_danshuang = true;
        } else {
            clear_daxiao = false;
        }
    } else {
        clear_danshuang = true;
    }

    if (long_hu) {
        if (longhu_quren) {
            clear_longhu = true;
        } else {
            clear_longhu = false;
        }
    } else {
        clear_longhu = true;
    }
    if (hunhe_jisuan) {
        if (hunhejisuan_quren) {
            clear_hunhejisuan = true;
        } else {
            clear_hunhejisuan = false;
        }
    } else {
        clear_hunhejisuan = true;
    }

    //clear_view_div();

    if (da_xiao && !daxiao_queren) {
        console.log("调用大小计算公式");
        daxiao_queren = true;
        clear_daxiao_fun();
        zhanshi_touzhu_daxiao();
    }

    if (dan_shuang && !danshuang_queren) {
        console.log("调用单双计算公式");
        danshuang_queren = true;
        clear_danshuang_fun();
        zhanshi_touzhu_danshuang();
    }

    if (long_hu && !longhu_quren) {
        console.log("调用龙虎计算公式");
        longhu_quren = true;
        clear_longhu_fun()
        zhanshi_touzhu_longhu();
    }

    if (hunhe_jisuan && !hunhejisuan_quren) {
        console.log("调用混合计算公式");
        hunhejisuan_quren = true;
        clear_view_div();
        count_hunhejisuan();
        tiaozhengbeilv();
    }
}

/**
 * 混合投注计算
 */
function count_hunhejisuan() {
    var hunhejisuan_beilv = getById("hunhejisuan_beilv").value;
    if (hunhejisuan_beilv == "") {
        alert("混合计算倍率不能为空");
        hunhejisuan_quren = false;
        return;
    }
    var beilv = getById("hunhejisuan_beilv").value;
    zhanshi_touzhu_daxiao(beilv);
    zhanshi_touzhu_danshuang(beilv);
    zhanshi_touzhu_longhu(beilv);
    getById("hunhejisuan_jieyu").value = parseInt(getById("daxiao_jieyu").value)
        + parseInt(getById("danshuang_jieyu").value)
        + parseInt(getById("longhu_jieyu").value)

}

/**
 * 定义存储投注结果
 */
var touzhu_daxiao_jieguo_zong = new Array();
var touzhu_daxiao_jieguo_zong_size = 0;
var touzhu_daxiao_jieguo_ji = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];//大小（0大，1小）
var touzhu_daxiao_jine = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];//金额
var touzhu_danshuang_jieguo_zong_size = 0;
var touzhu_danshuang_jieguo_zong = new Array();
var touzhu_danshuang_jieguo_ji = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];//单双（0单，1双）
var touzhu_danshuang_jine = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];//金额
var touzhu_longhu_jieguo_zong = new Array();
var touzhu_longhu_jieguo_zong_size = 0;
var touzhu_longhu_jieguo_ji = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];//龙虎（0龙，1虎）
var touzhu_longhu_jine = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];//金额

//==================================================计算大小开始======================
/**
 * 投注计算（大小）
 * @param tzlx_dqz 投注类型当前组（数组）
 * @param beilv 投注倍率
 * @param tzlx_jg 投注类型结果记录（数组）
 * @param tzlx_zs 投注类型展示（数组）
 * @returns {*}
 *
 * 展示投注结果
 * 记录投注结果
 * 计算投注倍率
 */
/**
 * 投注全为大
 */
var dangqian_daxiao_zu_da = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var daxiao_touzhu_da_kui_size = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var daxiao_touzhu_da_ying_size = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var daxiao_touzhu_da_jine = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

function touzhu_jisuan_jieguo_da(beilv) {
    beilv = is_null(beilv) ? getById("daxiao_beilv").value : beilv;
    for (var i = 0; i < dangqian_daxiao_zu.length; i++) {
        dangqian_daxiao_zu_da[i]++;
    }

    for (var j = 0; j < input_num_index + 1; j++) {
        var gongsi = 0;
        if (daxiao_touzhu_da_kui_size[j] == 4 || daxiao_touzhu_da_kui_size[j] == 8
            || daxiao_touzhu_da_kui_size[j] == 14 || daxiao_touzhu_da_kui_size[j] == 18) {
            dangqian_daxiao_zu_da[j] = 0;
        }

        if (dox(input_num_name_array[j].innerHTML) || touzhu_daxiao_jieguo_ji[j] == 2) {//结果为大（赢）
            gongsi = gain_rule(dangqian_daxiao_zu_da[j], daxiao_touzhu_da_kui_size[j], false);
            daxiao_touzhu_da_ying_size[j]++;
        } else {//结果也为小（亏）
            if (dangqian_daxiao_zu_da[j] == niuzhuangweizhi && daxiao_touzhu_da_kui_size[j] < 4) {
                dangqian_daxiao_zu_da[j] = 0;
                gongsi = gain_rule(dangqian_daxiao_zu_da[j], daxiao_touzhu_da_kui_size[j], true);
            } else {
                dangqian_daxiao_zu_da[j] = parseInt(dangqian_daxiao_zu_da[j])
                    - huitui_jisuan(parseInt(dangqian_daxiao_zu_da[j]), daxiao_touzhu_da_kui_size[j]);
                gongsi = gain_rule(dangqian_daxiao_zu_da[j], daxiao_touzhu_da_kui_size[j], false);
            }
            daxiao_touzhu_da_ying_size[j] = 0;
            daxiao_touzhu_da_kui_size[j]++;
        }
        daxiao_touzhu_da_jine[j] = beilv * gongsi;
    }
}

/**
 * 投注全为小
 */
var dangqian_daxiao_zu_xiao = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var daxiao_touzhu_xiao_kui_size = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var daxiao_touzhu_xiao_ying_size = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var daxiao_touzhu_xiao_jine = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

function touzhu_jisuan_jieguo_xiao(beilv) {
    beilv = is_null(beilv) ? getById("daxiao_beilv").value : beilv;
    for (var i = 0; i < dangqian_daxiao_zu_xiao.length; i++) {
        dangqian_daxiao_zu_xiao[i]++;
    }

    for (var j = 0; j < input_num_index + 1; j++) {
        var gongsi = 0;
        if (daxiao_touzhu_xiao_kui_size[j] == 4 || daxiao_touzhu_xiao_kui_size[j] == 8
            || daxiao_touzhu_xiao_kui_size[j] == 14 || daxiao_touzhu_xiao_kui_size[j] == 18) {
            dangqian_daxiao_zu_xiao[j] = 0;
        }

        if (!dox(input_num_name_array[j].innerHTML) || touzhu_daxiao_jieguo_ji[j] == 2) {//结果也为小（赢）
            gongsi = gain_rule(dangqian_daxiao_zu_xiao[j], daxiao_touzhu_xiao_kui_size[j], false);
            daxiao_touzhu_xiao_ying_size[j]++;
        } else {//结果为大（亏）
            if (dangqian_daxiao_zu_xiao[j] == niuzhuangweizhi && daxiao_touzhu_xiao_kui_size[j] < 4) {
                dangqian_daxiao_zu_xiao[j] = 0;
                gongsi = gain_rule(dangqian_daxiao_zu_xiao[j], daxiao_touzhu_xiao_kui_size[j], true);
            } else {
                dangqian_daxiao_zu_xiao[j] = parseInt(dangqian_daxiao_zu_xiao[j])
                    - huitui_jisuan(parseInt(dangqian_daxiao_zu_xiao[j]), daxiao_touzhu_xiao_kui_size[j]);
                gongsi = gain_rule(dangqian_daxiao_zu_xiao[j], daxiao_touzhu_xiao_kui_size[j], false);
            }
            daxiao_touzhu_xiao_ying_size[j] = 0;
            daxiao_touzhu_xiao_kui_size[j]++;
        }
        daxiao_touzhu_xiao_jine[j] = beilv * gongsi;
    }
}


/**
 * 展示投注金额
 */
function zhanshi_touzhu_daxiao(beilv) {
    beilv = is_null(beilv) ? getById("daxiao_beilv").value : beilv;
    if (beilv == "") {
        alert("大小倍率不能为空");
        daxiao_queren = false;
        return;
    }
    jisuan_yingkui_daxiao();
    if (qishu == 0) {
        for (var j = 0; j < input_num_index + 1; j++) {
            if (input_num_name_array[j].innerHTML < 6) {
                daxiao_xiao_view_array[j].innerHTML = beilv;
                touzhu_daxiao_jieguo_ji[j] = 1;
            } else {
                daxiao_da_view_array[j].innerHTML = beilv;
                touzhu_daxiao_jieguo_ji[j] = 0;
            }
            touzhu_daxiao_jine[j] = beilv;
        }
        touzhu_daxiao_jieguo_zong[touzhu_daxiao_jieguo_zong_size] = touzhu_daxiao_jieguo_ji;
        touzhu_daxiao_jieguo_zong_size++;
    } else {
        touzhu_jisuan_jieguo_da(beilv);
        touzhu_jisuan_jieguo_xiao(beilv);
        for (var i = 0; i < input_num_index + 1; i++) {
            if (daxiao_touzhu_da_jine[i] === daxiao_touzhu_xiao_jine[i]) {
                daxiao_da_view_array[i].innerHTML = 0;
                daxiao_xiao_view_array[i].innerHTML = 0;
                touzhu_daxiao_jieguo_ji[i] = 2;
            } else if (daxiao_touzhu_da_jine[i] > daxiao_touzhu_xiao_jine[i]) {
                touzhu_daxiao_jine[i] = daxiao_touzhu_da_jine[i] - daxiao_touzhu_xiao_jine[i];
                touzhu_daxiao_jieguo_ji[i] = 0;
                daxiao_da_view_array[i].innerHTML = touzhu_daxiao_jine[i];
            } else {
                touzhu_daxiao_jine[i] = daxiao_touzhu_xiao_jine[i] - daxiao_touzhu_da_jine[i];
                touzhu_daxiao_jieguo_ji[i] = 1;
                daxiao_xiao_view_array[i].innerHTML = touzhu_daxiao_jine[i];
            }
        }
    }

}

/**
 * 计算亏盈并展示
 */
function jisuan_yingkui_daxiao() {
    for (var j = 0; j < input_num_index + 1; j++) {
        if (touzhu_daxiao_jieguo_ji[j] == 2) {
            console.log("盈")
            getById("daxiao_jieyu").value = parseInt(getById("daxiao_jieyu").value) + 0;
        } else if ((!dox(input_num_name_array[j].innerHTML) && touzhu_daxiao_jieguo_ji[j] == 1)
            || (dox(input_num_name_array[j].innerHTML) && touzhu_daxiao_jieguo_ji[j] == 0)) {//同为小或者同为大（盈）
            console.log("盈")
            getById("daxiao_jieyu").value = parseInt(getById("daxiao_jieyu").value) + parseInt(touzhu_daxiao_jine[j]);
        } else {//一大一小（亏）
            console.log("亏")
            getById("daxiao_jieyu").value = parseInt(getById("daxiao_jieyu").value) - parseInt(touzhu_daxiao_jine[j]);
        }
    }
}

//==================================================计算大小结束======================

//==================================================计算单双开始======================
/**
 * 投注计算（单双）
 * @returns {*}
 *
 * 展示投注结果
 * 记录投注结果
 * 计算投注倍率
 */
/**
 * 投注全为单
 */
var dangqian_danshuang_zu_dan = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var danshuang_touzhu_dan_kui_size = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var danshuang_touzhu_dan_ying_size = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var danshuang_touzhu_dan_jine = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

function touzhu_jisuan_jieguo_dan(beilv) {
    beilv = is_null(beilv) ? getById("danshuang_beilv").value : beilv;
    for (var i = 0; i < dangqian_danshuang_zu.length; i++) {
        dangqian_danshuang_zu_dan[i]++;
    }

    for (var j = 0; j < input_num_index + 1; j++) {
        var gongsi = 0;
        if (danshuang_touzhu_dan_kui_size[j] == 4 || danshuang_touzhu_dan_kui_size[j] == 8
            || danshuang_touzhu_dan_kui_size[j] == 14 || danshuang_touzhu_dan_kui_size[j] == 18) {
            dangqian_danshuang_zu_dan[j] = 0;
        }

        if (dos(input_num_name_array[j].innerHTML) || touzhu_danshuang_jieguo_ji[j] == 2) {//结果为单（赢）
            gongsi = gain_rule(dangqian_danshuang_zu_dan[j], danshuang_touzhu_dan_kui_size[j], false);
            danshuang_touzhu_dan_ying_size[j]++;
        } else {//结果也为双（亏）
            if (dangqian_danshuang_zu_dan[j] == niuzhuangweizhi && danshuang_touzhu_dan_kui_size[j] < 4) {
                dangqian_danshuang_zu_dan[j] = 0;
                gongsi = gain_rule(dangqian_danshuang_zu_dan[j], danshuang_touzhu_dan_kui_size[j], true);
            } else {
                dangqian_danshuang_zu_dan[j] = parseInt(dangqian_danshuang_zu_dan[j])
                    - huitui_jisuan(parseInt(dangqian_danshuang_zu_dan[j]), danshuang_touzhu_dan_kui_size[j]);
                gongsi = gain_rule(dangqian_danshuang_zu_dan[j], danshuang_touzhu_dan_kui_size[j], false);
            }
            danshuang_touzhu_dan_ying_size[j] = 0;
            danshuang_touzhu_dan_kui_size[j]++;
        }
        danshuang_touzhu_dan_jine[j] = beilv * gongsi;
    }
}

/**
 * 投注全为双
 */
var dangqian_danshuang_zu_shuang = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var danshuang_touzhu_shuang_kui_size = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var danshuang_touzhu_shuang_ying_size = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var danshuang_touzhu_shuang_jine = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

function touzhu_jisuan_jieguo_shuang(beilv) {
    beilv = is_null(beilv) ? getById("danshuang_beilv").value : beilv;
    for (var i = 0; i < dangqian_danshuang_zu_shuang.length; i++) {
        dangqian_danshuang_zu_shuang[i]++;
    }

    for (var j = 0; j < input_num_index + 1; j++) {
        var gongsi = 0;
        if (danshuang_touzhu_shuang_kui_size[j] == 4 || danshuang_touzhu_shuang_kui_size[j] == 8
            || danshuang_touzhu_shuang_kui_size[j] == 14 || danshuang_touzhu_shuang_kui_size[j] == 18) {
            dangqian_danshuang_zu_shuang[j] = 0;
        }

        if (!dos(input_num_name_array[j].innerHTML) || touzhu_danshuang_jieguo_ji[j] == 2) {//结果也为双（赢）
            gongsi = gain_rule(dangqian_danshuang_zu_shuang[j], danshuang_touzhu_shuang_kui_size[j], false);
            danshuang_touzhu_shuang_ying_size[j]++;
        } else {//结果为单（亏）
            if (dangqian_danshuang_zu_shuang[j] == niuzhuangweizhi && danshuang_touzhu_shuang_kui_size[j] < 4) {
                dangqian_danshuang_zu_shuang[j] = 0;
                gongsi = gain_rule(dangqian_danshuang_zu_shuang[j], danshuang_touzhu_shuang_kui_size[j], true);
            } else {
                dangqian_danshuang_zu_shuang[j] = parseInt(dangqian_danshuang_zu_shuang[j])
                    - huitui_jisuan(parseInt(dangqian_danshuang_zu_shuang[j]), danshuang_touzhu_shuang_kui_size[j]);
                gongsi = gain_rule(dangqian_danshuang_zu_shuang[j], danshuang_touzhu_shuang_kui_size[j], false);
            }
            danshuang_touzhu_shuang_ying_size[j] = 0;
            danshuang_touzhu_shuang_kui_size[j]++;
        }
        danshuang_touzhu_shuang_jine[j] = beilv * gongsi;
    }
}


/**
 * 展示投注金额
 */
function zhanshi_touzhu_danshuang(beilv) {
    beilv = is_null(beilv) ? getById("danshuang_beilv").value : beilv;
    if (beilv == "") {
        alert("单双倍率不能为空");
        danshuang_queren = false;
        return;
    }
    jisuan_yingkui_danshuang();
    if (qishu == 0) {
        for (var j = 0; j < input_num_index + 1; j++) {
            if (dos(input_num_name_array[j].innerHTML)) {
                danshuang_dan_view_array[j].innerHTML = beilv;
                touzhu_danshuang_jieguo_ji[j] = 1;
            } else {
                danshuang_shuang_view_array[j].innerHTML = beilv;
                touzhu_danshuang_jieguo_ji[j] = 0;
            }
            touzhu_danshuang_jine[j] = beilv;
        }
        touzhu_danshuang_jieguo_zong[touzhu_danshuang_jieguo_zong_size] = touzhu_danshuang_jieguo_ji;
        touzhu_danshuang_jieguo_zong_size++;
    } else {
        touzhu_jisuan_jieguo_dan(beilv);
        touzhu_jisuan_jieguo_shuang(beilv);
        for (var i = 0; i < input_num_index + 1; i++) {
            if (danshuang_touzhu_dan_jine[i] === danshuang_touzhu_shuang_jine[i]) {
                danshuang_dan_view_array[i].innerHTML = 0;
                danshuang_shuang_view_array[i].innerHTML = 0;
                touzhu_danshuang_jieguo_ji[i] = 2;
            } else if (danshuang_touzhu_dan_jine[i] > danshuang_touzhu_shuang_jine[i]) {
                touzhu_danshuang_jine[i] = danshuang_touzhu_dan_jine[i] - danshuang_touzhu_shuang_jine[i];
                touzhu_danshuang_jieguo_ji[i] = 0;
                danshuang_dan_view_array[i].innerHTML = touzhu_danshuang_jine[i];
            } else {
                touzhu_danshuang_jine[i] = danshuang_touzhu_shuang_jine[i] - danshuang_touzhu_dan_jine[i];
                touzhu_danshuang_jieguo_ji[i] = 1;
                danshuang_shuang_view_array[i].innerHTML = touzhu_danshuang_jine[i];
            }
        }
    }

}

/**
 * 计算亏盈并展示
 */
function jisuan_yingkui_danshuang() {
    for (var j = 0; j < input_num_index + 1; j++) {
        if (touzhu_danshuang_jieguo_ji[j] == 2) {
            console.log("盈")
            getById("danshuang_jieyu").value = parseInt(getById("danshuang_jieyu").value) + 0;
        } else if ((!dos(input_num_name_array[j].innerHTML) && touzhu_danshuang_jieguo_ji[j] == 1)
            || (dos(input_num_name_array[j].innerHTML) && touzhu_danshuang_jieguo_ji[j] == 0)) {//同为单或者同为双（盈）
            console.log("盈")
            getById("danshuang_jieyu").value = parseInt(getById("danshuang_jieyu").value) + parseInt(touzhu_danshuang_jine[j]);
        } else {//一大一小（亏）
            console.log("亏")
            getById("danshuang_jieyu").value = parseInt(getById("danshuang_jieyu").value) - parseInt(touzhu_danshuang_jine[j]);
        }
    }
}

//==================================================计算单双结束==================

//==================================================计算龙虎开始======================
/**
 * 投注计算（龙虎）
 * @returns {*}
 *
 * 展示投注结果
 * 记录投注结果
 * 计算投注倍率
 */
/**
 * 投注全为龙
 */
var dangqian_longhu_zu_long = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var longhu_touzhu_long_kui_size = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var longhu_touzhu_long_ying_size = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var longhu_touzhu_long_jine = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

function touzhu_jisuan_jieguo_long(beilv) {
    beilv = is_null(beilv) ? getById("longhu_beilv").value : beilv;
    for (var i = 0; i < dangqian_longhu_zu.length; i++) {
        dangqian_longhu_zu_long[i]++;
    }

    for (var j = 0; j < input_num_index + 1; j++) {
        var gongsi = 0;
        if (longhu_touzhu_long_kui_size[j] == 4 || longhu_touzhu_long_kui_size[j] == 8
            || longhu_touzhu_long_kui_size[j] == 14 || longhu_touzhu_long_kui_size[j] == 18) {
            dangqian_longhu_zu_long[j] = 0;
        }

        if (loh(input_num_name_array[j].innerHTML) || touzhu_longhu_jieguo_ji[j] == 2) {//结果为龙（赢）
            gongsi = gain_rule(dangqian_longhu_zu_long[j], longhu_touzhu_long_kui_size[j], false);
            longhu_touzhu_long_ying_size[j]++;
        } else {//结果也为虎（亏）
            if (dangqian_longhu_zu_long[j] == niuzhuangweizhi && longhu_touzhu_long_kui_size[j] < 4) {
                dangqian_longhu_zu_long[j] = 0;
                gongsi = gain_rule(dangqian_longhu_zu_long[j], longhu_touzhu_long_kui_size[j], true);
            } else {
                dangqian_longhu_zu_long[j] = parseInt(dangqian_longhu_zu_long[j])
                    - huitui_jisuan(parseInt(dangqian_longhu_zu_long[j]), longhu_touzhu_long_kui_size[j]);
                gongsi = gain_rule(dangqian_longhu_zu_long[j], longhu_touzhu_long_kui_size[j], false);
            }
            longhu_touzhu_long_ying_size[j] = 0;
            longhu_touzhu_long_kui_size[j]++;
        }
        longhu_touzhu_long_jine[j] = beilv * gongsi;
    }
}

/**
 * 投注全为虎
 */
var dangqian_longhu_zu_hu = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var longhu_touzhu_hu_kui_size = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var longhu_touzhu_hu_ying_size = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var longhu_touzhu_hu_jine = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

function touzhu_jisuan_jieguo_hu(beilv) {
    beilv = is_null(beilv) ? getById("longhu_beilv").value : beilv;
    for (var i = 0; i < dangqian_longhu_zu_hu.length; i++) {
        dangqian_longhu_zu_hu[i]++;
    }

    for (var j = 0; j < input_num_index + 1; j++) {
        var gongsi = 0;
        if (longhu_touzhu_hu_kui_size[j] == 4 || longhu_touzhu_hu_kui_size[j] == 8
            || longhu_touzhu_hu_kui_size[j] == 14 || longhu_touzhu_hu_kui_size[j] == 18) {
            dangqian_longhu_zu_hu[j] = 0;
        }

        if (!dos(input_num_name_array[j].innerHTML) || touzhu_longhu_jieguo_ji[j] == 2) {//结果也为虎（赢）
            gongsi = gain_rule(dangqian_longhu_zu_hu[j], longhu_touzhu_hu_kui_size[j], false);
            longhu_touzhu_hu_ying_size[j]++;
        } else {//结果为龙（亏）
            if (dangqian_longhu_zu_hu[j] == niuzhuangweizhi && longhu_touzhu_hu_kui_size[j] < 4) {
                dangqian_longhu_zu_hu[j] = 0;
                gongsi = gain_rule(dangqian_longhu_zu_hu[j], longhu_touzhu_hu_kui_size[j], true);
            } else {
                dangqian_longhu_zu_hu[j] = parseInt(dangqian_longhu_zu_hu[j])
                    - huitui_jisuan(parseInt(dangqian_longhu_zu_hu[j]), longhu_touzhu_hu_kui_size[j]);
                gongsi = gain_rule(dangqian_longhu_zu_hu[j], longhu_touzhu_hu_kui_size[j], false);
            }
            longhu_touzhu_hu_ying_size[j] = 0;
            longhu_touzhu_hu_kui_size[j]++;
        }
        longhu_touzhu_hu_jine[j] = beilv * gongsi;
    }
}


/**
 * 展示投注金额
 */
function zhanshi_touzhu_longhu(beilv) {
    beilv = is_null(beilv) ? getById("longhu_beilv").value : beilv;
    if (beilv == "") {
        alert("龙虎倍率不能为空");
        longhu_quren = false;
        return;
    }
    jisuan_yingkui_longhu();
    if (qishu == 0) {
        for (var j = 0; j < input_num_index + 1; j++) {
            if (loh(input_num_name_array[j].innerHTML)) {
                longhu_long_view_array[j].innerHTML = beilv;
                touzhu_longhu_jieguo_ji[j] = 1;
            } else {
                longhu_hu_view_array[j].innerHTML = beilv;
                touzhu_longhu_jieguo_ji[j] = 0;
            }
            touzhu_longhu_jine[j] = beilv;
        }
        touzhu_longhu_jieguo_zong[touzhu_longhu_jieguo_zong_size] = touzhu_longhu_jieguo_ji;
        touzhu_longhu_jieguo_zong_size++;
    } else {
        touzhu_jisuan_jieguo_long(beilv);
        touzhu_jisuan_jieguo_hu(beilv);
        for (var i = 0; i < input_num_index + 1; i++) {
            if (longhu_touzhu_long_jine[i] === longhu_touzhu_hu_jine[i]) {
                longhu_long_view_array[i].innerHTML = 0;
                longhu_hu_view_array[i].innerHTML = 0;
                touzhu_longhu_jieguo_ji[i] = 2;
            } else if (longhu_touzhu_long_jine[i] > longhu_touzhu_hu_jine[i]) {
                touzhu_longhu_jine[i] = longhu_touzhu_long_jine[i] - longhu_touzhu_hu_jine[i];
                touzhu_longhu_jieguo_ji[i] = 0;
                longhu_long_view_array[i].innerHTML = touzhu_longhu_jine[i];
            } else {
                touzhu_longhu_jine[i] = longhu_touzhu_hu_jine[i] - longhu_touzhu_long_jine[i];
                touzhu_longhu_jieguo_ji[i] = 1;
                longhu_hu_view_array[i].innerHTML = touzhu_longhu_jine[i];
            }
        }
    }

}

/**
 * 计算亏盈并展示
 */
function jisuan_yingkui_longhu() {
    for (var j = 0; j < input_num_index + 1; j++) {
        if (touzhu_longhu_jieguo_ji[j] == 2) {
            console.log("盈")
            getById("longhu_jieyu").value = parseInt(getById("longhu_jieyu").value) + 0;
        } else if ((!loh(input_num_name_array[j].innerHTML) && touzhu_longhu_jieguo_ji[j] == 1)
            || (loh(input_num_name_array[j].innerHTML) && touzhu_longhu_jieguo_ji[j] == 0)) {//同为龙或者同为虎（盈）
            console.log("盈")
            getById("longhu_jieyu").value = parseInt(getById("longhu_jieyu").value) + parseInt(touzhu_longhu_jine[j]);
        } else {//一龙一虎（亏）
            console.log("亏")
            getById("longhu_jieyu").value = parseInt(getById("longhu_jieyu").value) - parseInt(touzhu_longhu_jine[j]);
        }
    }
}

//==================================================计算龙虎结束==================


/**
 * 清空所有显示：单双，龙虎，大小
 */
function clear_view_div() {
    if (clear_daxiao) {
        clear_daxiao_fun();
    }

    if (clear_danshuang) {
        clear_danshuang_fun();
    }

    if (clear_longhu) {
        clear_longhu_fun();
    }
}

/**
 * 清除大小
 */
function clear_daxiao_fun() {
    for (var i = 0; i < daxiao_da_view_array.length; i++) {
        daxiao_xiao_view_array[i].innerHTML = "";
        daxiao_da_view_array[i].innerHTML = "";
    }
}

/**
 * 清除单双
 */
function clear_danshuang_fun() {
    for (var i = 0; i < danshuang_dan_view_array.length; i++) {
        danshuang_dan_view_array[i].innerHTML = "";
        danshuang_shuang_view_array[i].innerHTML = "";
    }
}

/**
 * 清除龙虎
 */
function clear_longhu_fun() {
    for (var i = 0; i < longhu_long_view_array.length; i++) {
        longhu_long_view_array[i].innerHTML = "";
        longhu_hu_view_array[i].innerHTML = "";
    }
}

/**
 * 重置按钮事件
 */
function restart_view_num() {

    if ((da_xiao && !daxiao_queren) || (dan_shuang && !danshuang_queren)
        || (long_hu && !longhu_quren) || (hunhe_jisuan && !hunhejisuan_quren)
        || (!da_xiao && !dan_shuang && !long_hu && !hunhe_jisuan)) {
        input_num_index = -1;
        for (var i = 0; i < input_num_name_array.length; i++) {
            input_num_name_array[i].innerHTML = "";
        }
        return
    }

    daxiao_queren = false;
    danshuang_queren = false;
    longhu_quren = false;
    hunhejisuan_quren = false;

    if (shifou_wanquan_shuru && input_num_index < 9) {//没有输入完就点击了重置
        input_num_index = -1;
        for (var i = 0; i < input_num_name_array.length; i++) {
            input_num_name_array[i].innerHTML = "";
        }
    } else if (!shifou_wanquan_shuru && input_num_index < 0) {
        return
    } else {
        input_num_index = -1;
        view_num_up();
        for (var i = 0; i < input_num_name_array.length; i++) {
            cunchudage[i] = input_num_name_array[i].innerHTML
            input_num_name_array[i].innerHTML = "";
        }
        cunchusuoyou[qishu] = cunchudage;
        qishu++;
        console.table(cunchusuoyou)
    }

}

/**
 * 数字展示区数据上移
 */
var view_num_one_array = getByName("view_num_one");
var view_num_two_array = getByName("view_num_two");

function view_num_up() {
    switch (qishu) {
        case 0:
            getById("view_num_one").innerHTML = 1;
            for (var i = 0; i < input_num_name_array.length; i++) {
                view_num_one_array[i].innerHTML = input_num_name_array[i].innerHTML;
            }
            break;
        case 1:
            getById("view_num_two").innerHTML = 2;
            for (var i = 0; i < input_num_name_array.length; i++) {
                view_num_two_array[i].innerHTML = input_num_name_array[i].innerHTML;
            }
            break;
        default :
            getById("view_num_one").innerHTML = qishu;
            getById("view_num_two").innerHTML = qishu + 1;
            for (var i = 0; i < input_num_name_array.length; i++) {
                view_num_one_array[i].innerHTML = view_num_two_array[i].innerHTML;
                view_num_two_array[i].innerHTML = input_num_name_array[i].innerHTML;
            }
            break;
    }
}

/**
 * 定义规则
 * @type {string}
 */
var kui_one_three = [1, 1, 2, 3, 3, 4, 5, 4, 6, 6];
var kui_niuzhuan = [2, 2, 3, 4, 4, 5, 6, 6, 8, 8]; //扭转公式
var kui_four_seven = [1, 2, 3, 2, 2, 3, 4, 4, 5, 6, 6, 8, 8];
var kui_eight_twelve = [2, 3, 5, 2, 2, 3, 4, 4, 5, 6, 6, 8, 8];
var kui_thirteen_eighteen = [3, 5, 8, 3, 3, 4, 6, 6, 7, 8, 7, 9, 9];
var kui_other = [1, 3, 5, 8, 3, 3, 4, 6, 6, 7, 8, 7, 9, 9];

/**
 * 返回当前规则投注倍率
 * @param ddz 当前组
 * @param dtks 当前基码数（亏的次数）
 * @param niuzhuan 是否进行公式扭转
 * @returns {*}
 */
function gain_rule(ddz, dtks, niuzhuan) {
    niuzhuan = is_null(niuzhuan) ? false : true;
    var a = 0;
    if (dtks == 0) {
        if (ddz < kui_one_three.length)
            return kui_one_three[ddz];
        else
            return kui_one_three[kui_one_three.length - 1];
    } else if (dtks < 3) {
        if (niuzhuan) {
            if (ddz < kui_niuzhuan.length)
                return kui_niuzhuan[ddz];
            else
                return kui_niuzhuan[kui_niuzhuan.length - 1];
        } else {
            if (ddz < kui_one_three.length)
                return kui_one_three[ddz];
            else
                return kui_one_three[kui_one_three.length - 1];
        }
    } else if (dtks < 7) {
        if (ddz < kui_four_seven.length)
            return kui_four_seven[ddz];
        else
            return kui_four_seven[kui_four_seven.length - 1];
    } else if (dtks < 12) {
        if (ddz < kui_eight_twelve.length)
            return kui_eight_twelve[ddz];
        else
            return kui_eight_twelve[kui_eight_twelve.length - 1];
    } else if (dtks < 18) {
        if (ddz < kui_thirteen_eighteen.length)
            return kui_thirteen_eighteen[ddz];
        else
            return kui_thirteen_eighteen[kui_thirteen_eighteen.length - 1];
    } else {
        if (ddz < kui_other.length)
            return kui_other[ddz];
        else
            return kui_other[kui_other.length - 1];
    }
    return a;
}

/**
 * 回退投注大小
 * @param ddzy 当前组
 * @param dtks 当前基码（亏的次数）
 * @returns {number}
 */
function huitui_jisuan(ddzy, dtks, niuzhuan) {
    niuzhuan = is_null(niuzhuan) ? false : niuzhuan;
    if (ddzy < 2) {
        return ddzy;
    }

    if (niuzhuan) {
        return ddzy > kui_niuzhuan.length ? 2 : 1;
    }
    if (dtks < 3) {
        return ddzy > kui_one_three.length ? 2 : 1;
    } else if (dtks < 7) {
        return ddzy > kui_four_seven.length ? 2 : 1;
    } else if (dtks < 12) {
        return ddzy > kui_eight_twelve.length ? 2 : 1;
    } else if (dtks < 18) {
        return ddzy > kui_thirteen_eighteen.length ? 2 : 1;
    } else {
        return ddzy > kui_other.length ? 2 : 1;
    }
}

/**
 * 判断是否为null
 * @param e
 * @returns {boolean}
 */
function is_null(e) {
    if (e === "" || e === null || e === undefined || e === "undefined")
        return true;
    else
        return false;
}

/**
 * 返回单双（true 单 false 双）
 * @param e
 * @returns {boolean}
 */
function dos(e) {
    return parseInt(e) % 2 == 0 ? false : true;
}

/**
 * 返回大小（true 大 false 小）
 * @param e
 * @returns {boolean}
 */
function dox(e) {
    if (parseInt(e) >= 6 || parseInt(e) === 0) {
        return true;
    } else {
        return false;
    }
}

/**
 * 返回龙虎（true 龙 false 虎）
 * @param e
 * @returns {boolean}
 */
var long = [1, 2, 4, 7, 0];
var hu = [3, 5, 6, 8, 9];

function loh(e) {
    for (var i = 0; i < long.length; i++) {
        if (parseInt(e) == long[i])
            return true;
    }
    for (var i = 0; i < hu.length; i++) {
        if (parseInt(e) == hu[i])
            return false;
    }
}

/**
 * 同意调整倍率未混合计算倍率
 */
function tiaozhengbeilv() {
    var beilv = getById("hunhejisuan_beilv").value;
    getById("daxiao_beilv").value = beilv;
    getById("danshuang_beilv").value = beilv;
    getById("longhu_beilv").value = beilv;
}