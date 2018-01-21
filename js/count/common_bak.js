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

//定义展示盈亏状况
var daxiao_yingkui_zhanshi_da = getByName("daxiao_yingkui_zhanshi_da");
var daxiao_yingkui_zhanshi_xiao = getByName("daxiao_yingkui_zhanshi_xiao");
var danshuang_yingkui_zhanshi_dan = getByName("danshuang_yingkui_zhanshi_dan");
var danshuang_yingkui_zhanshi_shuang = getByName("danshuang_yingkui_zhanshi_shuang");
var longhu_yingkui_zhanshi_long = getByName("longhu_yingkui_zhanshi_long");
var longhu_yingkui_zhanshi_hu = getByName("longhu_yingkui_zhanshi_hu");

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

var jieyu_daxiao = new Array();
var jieyu_danshuang = new Array();
var jieyu_longhu = new Array();

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
            yuanbeijingse = click_element.style.backgroundColor;
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
                    if (hunhe_jisuan) {
                        clear_btn_balck();
                        hunhe_jisuan = false;
                        da_xiao = false;
                        dan_shuang = false;
                        long_hu = false;
                    }
                    if (da_xiao) {
                        da_xiao = false;
                        click_element.style.backgroundColor = ""
                    } else {
                        da_xiao = true;
                        click_element.style.backgroundColor = "#ffd32f"
                    }
                    break;
                case "单双":
                    if (hunhe_jisuan) {
                        clear_btn_balck();
                        hunhe_jisuan = false;
                        da_xiao = false;
                        dan_shuang = false;
                        long_hu = false;
                    }
                    if (hunhe_jisuan) {
                        return;
                    }
                    if (dan_shuang) {
                        dan_shuang = false;
                        click_element.style.backgroundColor = ""
                    } else {
                        dan_shuang = true;
                        click_element.style.backgroundColor = "#ffd32f"
                    }
                    break;
                case "龙虎":
                    if (hunhe_jisuan) {
                        clear_btn_balck();
                        hunhe_jisuan = false;
                        da_xiao = false;
                        dan_shuang = false;
                        long_hu = false;
                    }
                    if (hunhe_jisuan) {
                        return;
                    }
                    if (long_hu) {
                        long_hu = false;
                        click_element.style.backgroundColor = "";
                    } else {
                        long_hu = true;
                        click_element.style.backgroundColor = "#ffd32f"
                    }
                    break;
                default :
                    clear_btn_balck();
                    if (hunhe_jisuan) {
                        hunhe_jisuan = false;
                        da_xiao = false;
                        dan_shuang = false;
                        long_hu = false;
                        click_element.style.backgroundColor = ""
                    } else {
                        hunhe_jisuan = true;
                        da_xiao = true;
                        dan_shuang = true;
                        long_hu = true;
                        click_element.style.backgroundColor = "#ffd32f"
                    }
                    break;
            }
            break;
        case "view-input-num":
            //console.log(e.toElement.getAttribute("data"))
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

/**
 * 清除所有按钮
 */
function clear_btn_balck() {
    var a_bt = getByName("count_type");
    for (var i = 0; i < a_bt.length; i++) {
        a_bt[i].style.backgroundColor = "";
    }
}

document.addEventListener("mouseup", function (e) {
    var click_element = e.toElement;
    if (click_element.getAttribute("name") === "input_num") {
        click_element.style.backgroundColor = yuanbeijingse;
        input_num_name_array[input_num_index].style.backgroundColor = yuanbeijingse;
    }
})

var enter_key = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
document.addEventListener("keydown", function (ev) {
    //console.log(ev.key)
    if (ev.key === "Escape") {
        restart_view_num();
    }

    if (daxiao_queren || danshuang_queren || longhu_quren || hunhejisuan_quren) {
        return
    }
    if (getById("daxiao_beilv") == document.activeElement
        || getById("danshuang_beilv") == document.activeElement
        || getById("longhu_beilv") == document.activeElement
        || getById("hunhejisuan_beilv") == document.activeElement) {
        //console.log("倍率获得焦点");
        return;
    }

    for (var i = 0; i < enter_key.length; i++) {
        if (ev.key == enter_key[i]) {
            if (input_num_index < input_num_name_array.length - 1) {
                input_num_index++;
                input_num_name_array[input_num_index].innerHTML = ev.key;
                yuanbeijingse = getByName("input_num")[9]
                for (var i = 0;i<enter_key.length;i++){
                    if(getByName("input_num")[i].innerHTML === ev.key){
                        yuanbeijingse = getByName("input_num")[i].style.backgroundColor;
                        getByName("input_num")[i].style.backgroundColor = "red";
                        break;
                    }
                }
                input_num_name_array[input_num_index].style.backgroundColor = yuanbeijingse;
                return;
            }
        }
    }

    if (ev.key === "Enter") {
        input_num_enter();
    }

})

document.addEventListener("keyup", function (ev) {
    if (getById("daxiao_beilv") == document.activeElement
        || getById("danshuang_beilv") == document.activeElement
        || getById("longhu_beilv") == document.activeElement
        || getById("hunhejisuan_beilv") == document.activeElement) {
        //console.log("倍率获得焦点");
        return;
    }
    for (var i = 0;i<enter_key.length;i++){
        if(getByName("input_num")[i].innerHTML === ev.key){
            getByName("input_num")[i].style.backgroundColor = yuanbeijingse;
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

    if (!da_xiao && !dan_shuang && !long_hu && !hunhe_jisuan) {
        alert("请选择投注计算类型");
    }

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

    if (hunhe_jisuan && !hunhejisuan_quren) {
        //console.log("调用混合计算公式");
        hunhejisuan_quren = true;
        daxiao_queren = true;
        danshuang_queren = true;
        longhu_quren = true;
        clear_view_div();
        clear_daxiao_fun();
        clear_danshuang_fun();
        clear_longhu_fun();
        count_hunhejisuan();
        console.log("=====================混合=======================")
        return;
        //tiaozhengbeilv();
    }
    if (da_xiao && !daxiao_queren) {
        //console.log("调用大小计算公式");
        daxiao_queren = true;
        clear_daxiao_fun();
        if (Bmoshikaiqi) {
            b_devote_daxiao_view();
        } else if (Cmoshikaiqi) {
            C_devote_daxiao_view();
        } else if (Amoshikaiqi) {
            A_devote_daxiao_view();
        } else {
            devote_daxiao_view();
        }
        console.log("=====================大小=======================")
    }

    if (dan_shuang && !danshuang_queren) {
        //console.log("调用单双计算公式");
        danshuang_queren = true;
        clear_danshuang_fun();
        if (Bmoshikaiqi) {
            b_devote_danshuang_view()
        } else if (Cmoshikaiqi) {
            C_devote_danshuang_view();
        } else if (Amoshikaiqi) {
            A_devote_danshuang_view();
        } else {
            devote_danshuang_view();
        }
        console.log("=====================单双=======================")
    }

    if (long_hu && !longhu_quren) {
        //console.log("调用龙虎计算公式");
        longhu_quren = true;
        clear_longhu_fun()
        if (Bmoshikaiqi) {
            b_devote_longhu_view()
        } else if (Cmoshikaiqi) {
            C_devote_longhu_view();
        } else if (Amoshikaiqi) {
            A_devote_longhu_view();
        } else {
            devote_longhu_view();
        }
        console.log("=====================龙虎=======================")
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
    if (Bmoshikaiqi) {
        b_devote_daxiao_view();
        b_devote_danshuang_view();
        b_devote_longhu_view();
    } else if (Cmoshikaiqi) {
        C_devote_daxiao_view();
        C_devote_danshuang_view();
        C_devote_longhu_view();
    } else if (Amoshikaiqi) {
        A_devote_daxiao_view();
        A_devote_danshuang_view();
        A_devote_longhu_view();
    } else {
        devote_daxiao_view();
        devote_danshuang_view();
        devote_longhu_view();
    }

    getById("hunhejisuan_jieyu").value = parseInt(getById("daxiao_jieyu").value)
        + parseInt(getById("danshuang_jieyu").value)
        + parseInt(getById("longhu_jieyu").value)

}

/**
 * 定义存储投注结果
 */
var danxiang_touzhu_daxiao_da = [false, false, false, false, false, false, false, false, false, false, false,];
var danxiang_touzhu_daxiao_xiao = [false, false, false, false, false, false, false, false, false, false, false,];

//==================================================计算大小开始（面向对象）======================
var devote_all_record_da = new Array();//记录投注的所有结果
var dcrai_da = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

/**
 * 计算投注大
 * @param input 当前输入的数值
 * @param beilv 当前的倍率
 * @returns {number}
 * @constructor
 */
function DevoteCount_da(input, beilv, size) {
    var devoteMoney = 0;
    var shifoutouzhuguo = true;
    //console.log(devote_all_record_da[size]);
    if (is_null(devote_all_record_da[size])) {
        devote_all_record_da[size] = new Array();
        shifoutouzhuguo = false;
    } else if (devote_all_record_da[size].length == 0) {
        shifoutouzhuguo = false;
    } else {
        shifoutouzhuguo = true;
    }
    if (!shifoutouzhuguo) {//从未投注
        if (dox(input)) {//第一次出现大开始投注，否则不投注
            if (shifoudanxiang && danxiang_touzhu_daxiao_xiao[size]) {
                return 0;
            }

            if (shifoudanxiang) {
                danxiang_touzhu_daxiao_da[size] = true;
            }

            var gongsi = gain_rule(0, 0, false);
            dr = new DevoteResult();
            dr.setDevoteType("大")
            dr.setDevoteMoney(gongsi * beilv);
            cr = new CountResult();
            cr.setThisDevote(dr);
            cr.setThisWhetherDevote(true);
            cr.setDevoteRate(gongsi);
            cr.setThisDevoteStreak(0);
            cr.setThisCountEquation(0)
            devote_all_record_da[size][dcrai_da[size]] = cr;
            dcrai_da[size]++;
            devoteMoney = gongsi * beilv;
        }
    } else {
        if (shifoudanxiang && !danxiang_touzhu_daxiao_da[size]) {
            return 0;
        }
        //console.log("开始打印大的记录")
        //console.table(devote_all_record_da[size])
        //console.log("结束打印大的记录")
        if (dox(input)) {//盈
            dr = new DevoteResult();
            cr = new CountResult();
            cr.setThisLosingNumberAll(parseInt(devote_all_record_da[size][dcrai_da[size] - 1].getThisLosingNumberAll()));
            if (!dox(cunchusuoyou[qishu - 1][size])
                && parseInt(devote_all_record_da[size][dcrai_da[size] - 1].getThisLosningNumber()) > 1) {//如果上一期出的结果不为大，不进行投注
                return 0;
            }

            var devote_streak = parseInt(devote_all_record_da[size][dcrai_da[size] - 1].getThisCountEquation()) + 1;//投注次数

            var kuisuncishu = parseInt(devote_all_record_da[size][dcrai_da[size] - 1].getThisLosingNumberAll());
            if (kuisuncishu == 1 || kuisuncishu == 4 || kuisuncishu == 8 || kuisuncishu == 13) {
                if (!devote_all_record_da[size][dcrai_da[size] - 1].getThisIsTransition()) {
                    devote_streak = 0;
                }
                cr.setThisIsTransition(true);
            } else {
                cr.setThisIsTransition(false);
            }

            if (devote_streak > 6) {
                if (devote_all_record_da[size][dcrai_da[size] - 1].getProfitOrLoss() === "盈" &&
                    devote_all_record_da[size][dcrai_da[size] - 2].getProfitOrLoss() === "亏" &&
                    devote_all_record_da[size][dcrai_da[size] - 3].getProfitOrLoss() === "盈" &&
                    parseInt(devote_all_record_da[size][dcrai_da[size] - 1].getDevoteRate()) ===
                    parseInt(devote_all_record_da[size][dcrai_da[size] - 3].getDevoteRate())) {
                    devote_streak = 0;
                }
            }


            var gongsi = gain_rule(devote_streak, parseInt(devote_all_record_da[size][dcrai_da[size] - 1].getThisLosingNumberAll()),
                devote_all_record_da[size][dcrai_da[size] - 1].getThisIsReverse());

            dr = new DevoteResult();
            dr.setDevoteType("大")
            dr.setDevoteMoney(gongsi * beilv);

            cr.setThisDevote(dr);//当前投注
            cr.setLastDevote(devote_all_record_da[size][dcrai_da[size] - 1].getThisDevote());//上一次投注
            cr.setLastWhetherDevote(devote_all_record_da[size][dcrai_da[size] - 1].getThisWhetherDevote());//上次是否投注
            cr.setThisWhetherDevote(true);//本次是否投注
            cr.setDevoteRate(gongsi);//投注倍率
            cr.setThisDevoteStreak(parseInt(devote_all_record_da[size][dcrai_da[size] - 1].getThisDevoteStreak()) + 1);//本次投注次数
            cr.setThisCountEquation(devote_streak);//本次计算公式
            cr.setWinningStreakNumber(parseInt(devote_all_record_da[size][dcrai_da[size] - 1].getWinningStreakNumber()) + 1);//本次连胜次数
            cr.setThisWinningNumber(parseInt(devote_all_record_da[size][dcrai_da[size] - 1].getThisWinningNumber()) + 1);//本次第几次盈利
            cr.setLosingStreaknumber(0);//连败修改为0
            cr.setProfitOrLoss("盈");//设置上次为
            cr.setThisIsReverse(devote_all_record_da[size][dcrai_da[size] - 1].getThisIsReverse());
            devote_all_record_da[size][dcrai_da[size]] = cr;
            dcrai_da[size]++;
            devoteMoney = gongsi * beilv;
        } else {
            dr = new DevoteResult();
            cr = new CountResult();
            cr.setThisLosingNumberAll(parseInt(devote_all_record_da[size][dcrai_da[size] - 1].getThisLosingNumberAll()) + 1);
            if (devote_all_record_da[size][dcrai_da[size] - 1].getLosingStreakNumber() < 1) {
                var devote_streak = parseInt(devote_all_record_da[size][dcrai_da[size] - 1].getThisCountEquation()) - 1;//投注次数

                var shifouniuzhuang = false;
                if (parseInt(devote_all_record_da[size][dcrai_da[size] - 1].getDevoteRate()) === 3
                    && parseInt(devote_all_record_da[size][dcrai_da[size] - 2].getDevoteRate()) != 3) {
                    shifouniuzhuang = true;
                    cr.setThisIsReverse(true);
                    devote_streak = 0;
                } else if (devote_all_record_da[size][dcrai_da[size] - 1].getThisIsReverse()) {
                    shifouniuzhuang = true;
                    cr.setThisIsReverse(true);
                } else {
                    cr.setThisIsReverse(false);
                    cr.setThisIsReverse(devote_all_record_da[size][dcrai_da[size] - 1].getThisIsReverse());
                }
                var gongsi = gain_rule(devote_streak,
                    parseInt(devote_all_record_da[size][dcrai_da[size] - 1].getThisLosingNumberAll()) + 1, shifouniuzhuang);

                if (devote_all_record_da[size][dcrai_da[size] - 1].getDevoteRate() === gongsi && gongsi > 2) {//如果上一次投注公司和本次相投，并且不等与2说明不是同一级别，不进行切换公式
                } else {
                    var kuisuncishu = parseInt(devote_all_record_da[size][dcrai_da[size] - 1].getThisLosingNumberAll()) + 1;
                    if (kuisuncishu == 1 || kuisuncishu == 4 || kuisuncishu == 8 || kuisuncishu == 13) {//如果亏顺基码为这些时，进行切换
                        if (!devote_all_record_da[size][dcrai_da[size] - 1].getThisIsTransition()) {
                            devote_streak = 0;
                        }
                        cr.setThisIsTransition(true);
                    } else {
                        cr.setThisIsTransition(false);
                    }
                }

                if (devote_streak < 0) {
                    devote_streak = 0;
                }

                //alert(devote_streak+"========"+(parseInt(devote_all_record_da[size][dcrai_da[size] - 1].getThisLosningNumber()) + 1 ) + "=====" + gongsi + "===" + (devote_streak + 1 === 4 ))
                gongsi = gain_rule(devote_streak,
                    parseInt(devote_all_record_da[size][dcrai_da[size] - 1].getThisLosingNumberAll()) + 1, shifouniuzhuang);

                if (devote_all_record_da[size][dcrai_da[size] - 1].getDevoteRate() == 2 && devote_streak + 1 < 4) {
                    devote_streak = 0;
                }

                dr.setDevoteType("大")
                dr.setDevoteMoney(gongsi * beilv);

                cr.setThisDevote(dr);//当前投注
                cr.setLastDevote(devote_all_record_da[size][dcrai_da[size] - 1].getThisDevote());//上一次投注
                cr.setLastWhetherDevote(devote_all_record_da[size][dcrai_da[size] - 1].getThisWhetherDevote());//上次是否投注
                cr.setThisWhetherDevote(true);//本次是否投注
                cr.setDevoteRate(gongsi);//投注倍率
                cr.setThisDevoteStreak(parseInt(devote_all_record_da[size][dcrai_da[size] - 1].getThisDevoteStreak()) + 1);//本次投注次数
                cr.setThisCountEquation(devote_streak);//本次计算公式
                cr.setLosingStreaknumber(parseInt(devote_all_record_da[size][dcrai_da[size] - 1].getLosingStreakNumber()) + 1);//本次连败次数
                cr.setThisLosingNumber(parseInt(devote_all_record_da[size][dcrai_da[size] - 1].getThisLosningNumber()) + 1);//本次第几次亏损
                cr.setWinningStreakNumber(0);//连胜修改为0
                cr.setProfitOrLoss("亏");//设置本次未亏
                devote_all_record_da[size][dcrai_da[size]] = cr;
                dcrai_da[size]++;
                devoteMoney = gongsi * beilv;
            } else {
                devote_all_record_da[size][dcrai_da[size] - 1].setThisCountEquation(-1);
                devote_all_record_da[size][dcrai_da[size] - 1].setThisIsReverse(false);
            }
        }
    }
    return devoteMoney;
}

var devote_all_record_xiao = new Array();//记录投注的所有结果
var dcrai_xiao = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

/**
 * 计算投注小
 * @param input 当前输入的数值
 * @param beilv 当前投注倍率
 * @returns {number}
 * @constructor
 */
function DevoteCount_xiao(input, beilv, size) {
    var devoteMoney = 0;
    var shifoutouzhuguo = true;
    if (is_null(devote_all_record_xiao[size])) {
        devote_all_record_xiao[size] = new Array();
        shifoutouzhuguo = false;
    } else if (devote_all_record_xiao[size].length == 0) {
        shifoutouzhuguo = false;
    } else {
        shifoutouzhuguo = true;
    }
    if (!shifoutouzhuguo) {//从未投注
        if (!dox(input)) {//第一次出现小开始投注，否则不投注
            if (shifoudanxiang && danxiang_touzhu_daxiao_da[size]) {
                return 0;
            }
            if (shifoudanxiang) {
                danxiang_touzhu_daxiao_xiao[size] = true;
            }
            var gongsi = gain_rule(0, 0, false);
            dr = new DevoteResult();
            dr.setDevoteType("小")
            dr.setDevoteMoney(gongsi * beilv);
            cr = new CountResult();
            cr.setThisDevote(dr);
            cr.setThisWhetherDevote(true);
            cr.setDevoteRate(gongsi);
            cr.setThisDevoteStreak(0);
            cr.setThisCountEquation(0);
            devote_all_record_xiao[size][parseInt(dcrai_xiao[size])] = cr;
            dcrai_xiao[size]++;
            devoteMoney = gongsi * beilv;
        }
    } else {
        if (shifoudanxiang && !danxiang_touzhu_daxiao_xiao[size]) {
            return 0;
        }
        //console.log("开始打印小的记录")
        //console.table(devote_all_record_xiao[size])
        //console.log("结束打印小的记录")
        if (!dox(input)) {//盈

            cr = new CountResult();
            cr.setThisLosingNumberAll(parseInt(devote_all_record_xiao[size][dcrai_xiao[size] - 1].getThisLosingNumberAll()));
            if (dox(cunchusuoyou[qishu - 1][size])
                && parseInt(devote_all_record_xiao[size][dcrai_xiao[size] - 1].getThisLosningNumber()) > 1) {//如果上一期出的结果不为小，不进行投注
                return 0;
            }

            var devote_streak = parseInt(devote_all_record_xiao[size][dcrai_xiao[size] - 1].getThisCountEquation()) + 1;//投注次数

            var kuisuncishu = parseInt(devote_all_record_xiao[size][dcrai_xiao[size] - 1].getThisLosingNumberAll());
            if (kuisuncishu == 1 || kuisuncishu == 4 || kuisuncishu == 8 || kuisuncishu == 13) {
                if (!devote_all_record_xiao[size][dcrai_xiao[size] - 1].getThisIsTransition()) {
                    devote_streak = 0;
                }
                cr.setThisIsTransition(true);
            } else {
                cr.setThisIsTransition(false);
            }

            if (devote_streak > 6) {
                //console.table(devote_all_record_xiao[size])
                if (devote_all_record_xiao[size][dcrai_xiao[size] - 1].getProfitOrLoss() === "盈" &&
                    devote_all_record_xiao[size][dcrai_xiao[size] - 2].getProfitOrLoss() === "亏" &&
                    devote_all_record_xiao[size][dcrai_xiao[size] - 3].getProfitOrLoss() === "盈" &&
                    parseInt(devote_all_record_xiao[size][dcrai_xiao[size] - 1].getDevoteRate()) ===
                    parseInt(devote_all_record_xiao[size][dcrai_xiao[size] - 3].getDevoteRate())) {
                    devote_streak = 0;
                }
            }
            var gongsi = gain_rule(devote_streak, parseInt(devote_all_record_xiao[size][dcrai_xiao[size] - 1].getThisLosingNumberAll()),
                devote_all_record_xiao[size][dcrai_xiao[size] - 1].getThisIsReverse());
            dr = new DevoteResult();
            dr.setDevoteType("小")
            dr.setDevoteMoney(gongsi * beilv);

            cr.setThisDevote(dr);//当前投注
            cr.setLastDevote(devote_all_record_xiao[size][dcrai_xiao[size] - 1].getThisDevote());//上一次投注
            cr.setLastWhetherDevote(devote_all_record_xiao[size][dcrai_xiao[size] - 1].getThisWhetherDevote());//上次是否投注
            cr.setThisWhetherDevote(true);//本次是否投注
            cr.setDevoteRate(gongsi);//投注倍率
            cr.setThisDevoteStreak(parseInt(devote_all_record_xiao[size][dcrai_xiao[size] - 1].getThisDevoteStreak()) + 1);//本次投注次数
            cr.setThisCountEquation(devote_streak);//单前计算公式（指的时公式第几个）
            cr.setWinningStreakNumber(parseInt(devote_all_record_xiao[size][dcrai_xiao[size] - 1].getWinningStreakNumber()) + 1);//本次连胜次数
            cr.setThisWinningNumber(parseInt(devote_all_record_xiao[size][dcrai_xiao[size] - 1].getThisWinningNumber()) + 1);//本次第几次盈利
            cr.setLosingStreaknumber(0);//连败修改为0
            cr.setProfitOrLoss("盈");//设置上次为盈利
            cr.setThisIsReverse(devote_all_record_xiao[size][dcrai_xiao[size] - 1].getThisIsReverse());
            devote_all_record_xiao[size][dcrai_xiao[size]] = cr;
            dcrai_xiao[size]++;
            devoteMoney = gongsi * beilv;
        } else {
            cr = new CountResult();
            cr.setThisLosingNumberAll(parseInt(devote_all_record_xiao[size][dcrai_xiao[size] - 1].getThisLosingNumberAll() + 1));
            if (devote_all_record_xiao[size][dcrai_xiao[size] - 1].getLosingStreakNumber() < 1) {


                var devote_streak = parseInt(devote_all_record_xiao[size][dcrai_xiao[size] - 1].getThisCountEquation()) - 1;//投注次数

                var shifouniuzhuang = false;
                if (parseInt(devote_all_record_xiao[size][dcrai_xiao[size] - 1].getDevoteRate()) === 3
                    && parseInt(devote_all_record_xiao[size][dcrai_xiao[size] - 2].getDevoteRate()) != 3) {

                    shifouniuzhuang = true;
                    cr.setThisIsReverse(true);
                    devote_streak = 0;
                } else if (devote_all_record_xiao[size][dcrai_xiao[size] - 1].getThisIsReverse()) {
                    shifouniuzhuang = true;
                    cr.setThisIsReverse(true);
                } else {
                    cr.setThisIsReverse(false);
                    cr.setThisIsReverse(devote_all_record_xiao[size][dcrai_xiao[size] - 1].getThisIsReverse())
                }

                var gongsi = gain_rule(devote_streak,
                    parseInt(devote_all_record_xiao[size][dcrai_xiao[size] - 1].getThisLosingNumberAll()) + 1, shifouniuzhuang);

                if (devote_all_record_xiao[size][dcrai_xiao[size] - 1].getDevoteRate() === gongsi && gongsi > 2) {//如果上一次投注公司和本次相投，并且不等与2说明不是同一级别，不进行切换公式
                } else {
                    var kuisuncishu = parseInt(devote_all_record_xiao[size][dcrai_xiao[size] - 1].getThisLosingNumberAll()) + 1;
                    if (kuisuncishu == 1 || kuisuncishu == 4 || kuisuncishu == 8 || kuisuncishu == 13) {
                        if (!devote_all_record_xiao[size][dcrai_xiao[size] - 1].getThisIsTransition()) {
                            devote_streak = 0;
                        }
                        cr.setThisIsTransition(true);
                    } else {
                        cr.setThisIsTransition(false);
                    }
                }

                if (devote_streak < 0) {
                    devote_streak = 0;
                }

                /*  var shifouniuzhuang = false;
                  if(parseInt(devote_all_record_xiao[size][dcrai_xiao[size] - 1].getDevoteRate()) === 3 && devote_streak > 4 ){
                      shifouniuzhuang = true;
                  }*/

                gongsi = gain_rule(devote_streak,
                    parseInt(devote_all_record_xiao[size][dcrai_xiao[size] - 1].getThisLosingNumberAll()) + 1, shifouniuzhuang);

                if (devote_all_record_xiao[size][dcrai_xiao[size] - 1].getDevoteRate() == 2 && devote_streak + 1 < 4) {
                    devote_streak = 0;
                }

                dr = new DevoteResult();
                dr.setDevoteType("小")
                dr.setDevoteMoney(gongsi * beilv);

                cr.setThisDevote(dr);//当前投注
                cr.setLastDevote(devote_all_record_xiao[size][dcrai_xiao[size] - 1].getThisDevote());//上一次投注
                cr.setLastWhetherDevote(devote_all_record_xiao[size][dcrai_xiao[size] - 1].getThisWhetherDevote());//上次是否投注
                cr.setThisWhetherDevote(true);//本次是否投注
                cr.setDevoteRate(gongsi);//投注倍率
                cr.setThisDevoteStreak(parseInt(devote_all_record_xiao[size][dcrai_xiao[size] - 1].getThisDevoteStreak()) + 1);//本次投注次数
                cr.setThisCountEquation(devote_streak);//单前计算公式（指的时公式第几个）
                cr.setLosingStreaknumber(parseInt(devote_all_record_xiao[size][dcrai_xiao[size] - 1].getLosingStreakNumber()) + 1);//本次连败次数
                cr.setThisLosingNumber(parseInt(devote_all_record_xiao[size][dcrai_xiao[size] - 1].getThisLosningNumber()) + 1);//本次第几次亏损
                cr.setWinningStreakNumber(0);//连胜修改为0
                cr.setProfitOrLoss("亏");//设置本次未亏
                devote_all_record_xiao[size][dcrai_xiao[size]] = cr;
                dcrai_xiao[size]++;
                devoteMoney = gongsi * beilv;
            } else {
                devote_all_record_xiao[size][dcrai_xiao[size] - 1].setThisCountEquation(-1);
                devote_all_record_xiao[size][dcrai_xiao[size] - 1].setThisIsReverse(false);
            }
        }
    }
    return devoteMoney;
}

var devote_count_record_all = new Array();//记录所有投注计算结果
var dcrai_all = 0;

/**
 * 双向投注计算展示最终投注金额
 * @param beilv 投注倍率
 */
function count_daxiao_devote(input, beilv, size) {
    dr = new DevoteResult();

    var da = DevoteCount_da(input, beilv, size);
    var xiao = DevoteCount_xiao(input, beilv, size);

    console.log(da + "=============" + xiao);

    if (da > xiao) {
        dr.setDevoteType("大");
        dr.setDevoteMoney(parseInt(da) - parseInt(xiao));
    } else {
        dr.setDevoteType("小");
        dr.setDevoteMoney(parseInt(xiao) - parseInt(da));
    }
    devote_count_record_all[dcrai_all] = dr;
    dcrai_all++;
    //console.log(dr.getDevoteType())
    return dr;
}

var meiyicitouzhujieguo = new Array();
var dancitouzhujieguo = new Array();
var meiyicitouru = 0;

function devote_daxiao_view() {
    var beilv = getById("daxiao_beilv").value;
    if (is_null(beilv)) {
        alert("大小倍率不能为空");
        daxiao_queren = false;
        return;
    }

    if (dancitouzhujieguo.length != 0) {
        jisuan_yingkui_daxiao_jieguo();
    }

    for (var j = 0; j < input_num_index + 1; j++) {
        //console.log(daxiao_da_view_array[j].innerHTML)
        //console.log(daxiao_yingkui_zhanshi_da[j].innerHTML)
        dr = new DevoteResult();
        dr = count_daxiao_devote(input_num_name_array[j].innerHTML, beilv, j);
        if (dr.getDevoteType() === "大") {
            daxiao_da_view_array[j].innerHTML = dr.getDevoteMoney();
        } else {
            daxiao_xiao_view_array[j].innerHTML = dr.getDevoteMoney();
        }
        dancitouzhujieguo[j] = dr;
    }
    meiyicitouzhujieguo[meiyicitouru] = dancitouzhujieguo;
    meiyicitouru++;

}

var daxiao_zhanshi = getByName("daxiao_yingkui_zhanshi");

/**
 * 计算亏盈并展示
 */
function jisuan_yingkui_daxiao_jieguo() {
    daxiao_yingkui_zhanshi_da[daxiao_yingkui_zhanshi_da.length - 1].innerHTML = "";
    daxiao_yingkui_zhanshi_xiao[daxiao_yingkui_zhanshi_xiao.length - 1].innerHTML = "";
    for (var j = 0; j < input_num_index + 1; j++) {
        if (is_null(dancitouzhujieguo[j])) {
            continue;
        }
        if ((!dox(input_num_name_array[j].innerHTML) && dancitouzhujieguo[j].getDevoteType() == "小")
            || (dox(input_num_name_array[j].innerHTML) && dancitouzhujieguo[j].getDevoteType() == "大")) {//同为小或者同为大（盈）
            //console.log("盈")
            daxiao_yingkui_zhanshi_da[j].innerHTML =
                parseInt(is_null(daxiao_yingkui_zhanshi_da[j].innerHTML) ? 0 : daxiao_yingkui_zhanshi_da[j].innerHTML) +
                parseInt(dancitouzhujieguo[j].getDevoteMoney());

            daxiao_yingkui_zhanshi_da[daxiao_yingkui_zhanshi_da.length - 1].innerHTML =
                parseInt(is_null(daxiao_yingkui_zhanshi_da[daxiao_yingkui_zhanshi_da.length - 1].innerHTML)
                    ? 0 : daxiao_yingkui_zhanshi_da[daxiao_yingkui_zhanshi_da.length - 1].innerHTML) +
                parseInt(daxiao_yingkui_zhanshi_da[j].innerHTML);

            getById("daxiao_jieyu").value = parseInt(getById("daxiao_jieyu").value) + parseInt(dancitouzhujieguo[j].getDevoteMoney());
        } else {//一大一小（亏）
            //console.log("亏")
            daxiao_yingkui_zhanshi_xiao[j].innerHTML =
                parseInt(is_null(daxiao_yingkui_zhanshi_xiao[j].innerHTML) ? 0 : daxiao_yingkui_zhanshi_xiao[j].innerHTML) +
                parseInt(dancitouzhujieguo[j].getDevoteMoney());

            daxiao_yingkui_zhanshi_xiao[daxiao_yingkui_zhanshi_xiao.length - 1].innerHTML =
                parseInt(is_null(daxiao_yingkui_zhanshi_xiao[daxiao_yingkui_zhanshi_xiao.length - 1].innerHTML)
                    ? 0 : daxiao_yingkui_zhanshi_xiao[daxiao_yingkui_zhanshi_xiao.length - 1].innerHTML) +
                parseInt(daxiao_yingkui_zhanshi_xiao[j].innerHTML);

            getById("daxiao_jieyu").value = parseInt(getById("daxiao_jieyu").value) - parseInt(dancitouzhujieguo[j].getDevoteMoney());
        }

        daxiao_zhanshi[j].innerHTML = parseInt(is_null(daxiao_yingkui_zhanshi_da[j].innerHTML) ? 0 : daxiao_yingkui_zhanshi_da[j].innerHTML) -
            parseInt(is_null(daxiao_yingkui_zhanshi_xiao[j].innerHTML) ? 0 : daxiao_yingkui_zhanshi_xiao[j].innerHTML);
    }

    var num_all = 0;
    for (var i = 0; i < daxiao_zhanshi.length - 1; i++) {
        num_all += is_null(daxiao_zhanshi[i].innerHTML) ? 0 : parseInt(daxiao_zhanshi[i].innerHTML);
    }
    daxiao_zhanshi[daxiao_zhanshi.length - 1].innerHTML = num_all;

}

//==================================================计算大小结束（面向对象）======================

//==================================================计算单双开始======================

var devote_all_record_dan = new Array();//记录投注的所有结果
var dcrai_dan = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

var danxiang_touzhu_danshuang_dan = [false, false, false, false, false, false, false, false, false, false, false,];
var danxiang_touzhu_danshuang_shuang = [false, false, false, false, false, false, false, false, false, false, false,];

/**
 * 计算投注单
 * @param input 当前输入的数值
 * @param beilv 当前的倍率
 * @returns {number}
 * @constructor
 */
function DevoteCount_dan(input, beilv, size) {
    var devoteMoney = 0;
    var shifoutouzhuguo = true;

    if (is_null(devote_all_record_dan[size])) {
        devote_all_record_dan[size] = new Array();
        shifoutouzhuguo = false;
    } else if (devote_all_record_dan[size].length == 0) {
        shifoutouzhuguo = false;
    } else {
        shifoutouzhuguo = true;
    }
    if (!shifoutouzhuguo) {//从未投注
        if (dos(input)) {//第一次出现单开始投注，否则不投注
            if (shifoudanxiang && danxiang_touzshuang_danshuang_shuang[size]) {
                return 0;
            }

            if (shifoudanxiang) {
                danxiang_touzshuang_danshuang_dan[size] = true;
            }

            var gongsi = gain_rule(0, 0, false);
            dr = new DevoteResult();
            dr.setDevoteType("单")
            dr.setDevoteMoney(gongsi * beilv);
            cr = new CountResult();
            cr.setThisDevote(dr);
            cr.setThisWhetherDevote(true);
            cr.setDevoteRate(gongsi);
            cr.setThisDevoteStreak(0);
            cr.setThisCountEquation(0)
            devote_all_record_dan[size][dcrai_dan[size]] = cr;
            dcrai_dan[size]++;
            devoteMoney = gongsi * beilv;
        }
    } else {
        if (shifoudanxiang && !danxiang_touzshuang_danshuang_dan[size]) {
            return 0;
        }
        if (dos(input)) {//盈
            dr = new DevoteResult();
            cr = new CountResult();
            cr.setThisLosingNumberAll(parseInt(devote_all_record_dan[size][dcrai_dan[size] - 1].getThisLosingNumberAll()));
            if (!dos(cunchusuoyou[qishu - 1][size])
                && parseInt(devote_all_record_dan[size][dcrai_dan[size] - 1].getThisLosningNumber()) > 1) {//如果上一期出的结果不为单，不进行投注
                return 0;
            }

            var devote_streak = parseInt(devote_all_record_dan[size][dcrai_dan[size] - 1].getThisCountEquation()) + 1;//投注次数

            var kuisuncishu = parseInt(devote_all_record_dan[size][dcrai_dan[size] - 1].getThisLosingNumberAll());
            if (kuisuncishu == 1 || kuisuncishu == 4 || kuisuncishu == 8 || kuisuncishu == 13) {
                if (!devote_all_record_dan[size][dcrai_dan[size] - 1].getThisIsTransition()) {
                    devote_streak = 0;
                }
                cr.setThisIsTransition(true);
            } else {
                cr.setThisIsTransition(false);
            }

            if (devote_streak > 6) {
                if (devote_all_record_dan[size][dcrai_dan[size] - 1].getProfitOrLoss() === "盈" &&
                    devote_all_record_dan[size][dcrai_dan[size] - 2].getProfitOrLoss() === "亏" &&
                    devote_all_record_dan[size][dcrai_dan[size] - 3].getProfitOrLoss() === "盈" &&
                    parseInt(devote_all_record_dan[size][dcrai_dan[size] - 1].getDevoteRate()) ===
                    parseInt(devote_all_record_dan[size][dcrai_dan[size] - 3].getDevoteRate())) {
                    devote_streak = 0;
                }
            }


            var gongsi = gain_rule(devote_streak, parseInt(devote_all_record_dan[size][dcrai_dan[size] - 1].getThisLosingNumberAll()),
                devote_all_record_dan[size][dcrai_dan[size] - 1].getThisIsReverse());

            dr = new DevoteResult();
            dr.setDevoteType("单")
            dr.setDevoteMoney(gongsi * beilv);

            cr.setThisDevote(dr);//当前投注
            cr.setLastDevote(devote_all_record_dan[size][dcrai_dan[size] - 1].getThisDevote());//上一次投注
            cr.setLastWhetherDevote(devote_all_record_dan[size][dcrai_dan[size] - 1].getThisWhetherDevote());//上次是否投注
            cr.setThisWhetherDevote(true);//本次是否投注
            cr.setDevoteRate(gongsi);//投注倍率
            cr.setThisDevoteStreak(parseInt(devote_all_record_dan[size][dcrai_dan[size] - 1].getThisDevoteStreak()) + 1);//本次投注次数
            cr.setThisCountEquation(devote_streak);//本次计算公式
            cr.setWinningStreakNumber(parseInt(devote_all_record_dan[size][dcrai_dan[size] - 1].getWinningStreakNumber()) + 1);//本次连胜次数
            cr.setThisWinningNumber(parseInt(devote_all_record_dan[size][dcrai_dan[size] - 1].getThisWinningNumber()) + 1);//本次第几次盈利
            cr.setLosingStreaknumber(0);//连败修改为0
            cr.setThisIsReverse(devote_all_record_dan[size][dcrai_dan[size] - 1].getThisIsReverse());
            cr.setProfitOrLoss("盈");//设置上次为
            devote_all_record_dan[size][dcrai_dan[size]] = cr;
            dcrai_dan[size]++;
            devoteMoney = gongsi * beilv;
        } else {
            dr = new DevoteResult();
            cr = new CountResult();
            cr.setThisLosingNumberAll(parseInt(devote_all_record_dan[size][dcrai_dan[size] - 1].getThisLosingNumberAll()) + 1);
            if (devote_all_record_dan[size][dcrai_dan[size] - 1].getLosingStreakNumber() < 1) {
                var devote_streak = parseInt(devote_all_record_dan[size][dcrai_dan[size] - 1].getThisCountEquation()) - 1;//投注次数

                var shifouniuzhuang = false;
                if (parseInt(devote_all_record_dan[size][dcrai_dan[size] - 1].getDevoteRate()) === 3
                    && parseInt(devote_all_record_dan[size][dcrai_dan[size] - 2].getDevoteRate()) != 3) {
                    shifouniuzhuang = true;
                    cr.setThisIsReverse(true);
                    devote_streak = 0;
                } else if (devote_all_record_dan[size][dcrai_dan[size] - 1].getThisIsReverse()) {
                    shifouniuzhuang = true;
                    cr.setThisIsReverse(true);
                } else {
                    cr.setThisIsReverse(false);
                    cr.setThisIsReverse(devote_all_record_dan[size][dcrai_dan[size] - 1].getThisIsReverse());
                }
                var gongsi = gain_rule(devote_streak,
                    parseInt(devote_all_record_dan[size][dcrai_dan[size] - 1].getThisLosingNumberAll()) + 1, shifouniuzhuang);

                if (devote_all_record_dan[size][dcrai_dan[size] - 1].getDevoteRate() === gongsi && gongsi > 2) {//如果上一次投注公司和本次相投，并且不等与2说明不是同一级别，不进行切换公式
                } else {
                    var kuisuncishu = parseInt(devote_all_record_dan[size][dcrai_dan[size] - 1].getThisLosingNumberAll()) + 1;
                    if (kuisuncishu == 1 || kuisuncishu == 4 || kuisuncishu == 8 || kuisuncishu == 13) {//如果亏顺基码为这些时，进行切换
                        if (!devote_all_record_dan[size][dcrai_dan[size] - 1].getThisIsTransition()) {
                            devote_streak = 0;
                        }
                        cr.setThisIsTransition(true);
                    } else {
                        cr.setThisIsTransition(false);
                    }
                }

                if (devote_streak < 0) {
                    devote_streak = 0;
                }

                gongsi = gain_rule(devote_streak,
                    parseInt(devote_all_record_dan[size][dcrai_dan[size] - 1].getThisLosingNumberAll()) + 1, shifouniuzhuang);

                if (devote_all_record_dan[size][dcrai_dan[size] - 1].getDevoteRate() == 2 && devote_streak + 1 < 4) {
                    devote_streak = 0;
                }

                dr.setDevoteType("单")
                dr.setDevoteMoney(gongsi * beilv);

                cr.setThisDevote(dr);//当前投注
                cr.setLastDevote(devote_all_record_dan[size][dcrai_dan[size] - 1].getThisDevote());//上一次投注
                cr.setLastWhetherDevote(devote_all_record_dan[size][dcrai_dan[size] - 1].getThisWhetherDevote());//上次是否投注
                cr.setThisWhetherDevote(true);//本次是否投注
                cr.setDevoteRate(gongsi);//投注倍率
                cr.setThisDevoteStreak(parseInt(devote_all_record_dan[size][dcrai_dan[size] - 1].getThisDevoteStreak()) + 1);//本次投注次数
                cr.setThisCountEquation(devote_streak);//本次计算公式
                cr.setLosingStreaknumber(parseInt(devote_all_record_dan[size][dcrai_dan[size] - 1].getLosingStreakNumber()) + 1);//本次连败次数
                cr.setThisLosingNumber(parseInt(devote_all_record_dan[size][dcrai_dan[size] - 1].getThisLosningNumber()) + 1);//本次第几次亏损
                cr.setWinningStreakNumber(0);//连胜修改为0
                cr.setProfitOrLoss("亏");//设置本次未亏
                devote_all_record_dan[size][dcrai_dan[size]] = cr;
                dcrai_dan[size]++;
                devoteMoney = gongsi * beilv;
            } else {
                devote_all_record_dan[size][dcrai_dan[size] - 1].setThisCountEquation(-1);
                devote_all_record_dan[size][dcrai_dan[size] - 1].setThisIsReverse(false);
            }
        }
    }
    return devoteMoney;
}

var devote_all_record_shuang = new Array();//记录投注的所有结果
var dcrai_shuang = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

/**
 * 计算投注双
 * @param input 当前输入的数值
 * @param beilv 当前投注倍率
 * @returns {number}
 * @constructor
 */
function DevoteCount_shuang(input, beilv, size) {
    var devoteMoney = 0;
    var shifoutouzhuguo = true;
    if (is_null(devote_all_record_shuang[size])) {
        devote_all_record_shuang[size] = new Array();
        shifoutouzhuguo = false;
    } else if (devote_all_record_shuang[size].length == 0) {
        shifoutouzhuguo = false;
    } else {
        shifoutouzhuguo = true;
    }
    if (!shifoutouzhuguo) {//从未投注
        if (!dos(input)) {//第一次出现双开始投注，否则不投注
            if (shifoudanxiang && danxiang_touzshuang_danshuang_dan[size]) {
                return 0;
            }
            if (shifoudanxiang) {
                danxiang_touzshuang_danshuang_shuang[size] = true;
            }
            var gongsi = gain_rule(0, 0, false);
            dr = new DevoteResult();
            dr.setDevoteType("双")
            dr.setDevoteMoney(gongsi * beilv);
            cr = new CountResult();
            cr.setThisDevote(dr);
            cr.setThisWhetherDevote(true);
            cr.setDevoteRate(gongsi);
            cr.setThisDevoteStreak(0);
            cr.setThisCountEquation(0);
            devote_all_record_shuang[size][parseInt(dcrai_shuang[size])] = cr;
            dcrai_shuang[size]++;
            devoteMoney = gongsi * beilv;
        }
    } else {
        if (shifoudanxiang && !danxiang_touzshuang_danshuang_shuang[size]) {
            return 0;
        }

        if (!dos(input)) {//盈

            cr = new CountResult();
            cr.setThisLosingNumberAll(parseInt(devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisLosingNumberAll()));
            if (dos(cunchusuoyou[qishu - 1][size])
                && parseInt(devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisLosningNumber()) > 1) {//如果上一期出的结果不为双，不进行投注
                return 0;
            }

            var devote_streak = parseInt(devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisCountEquation()) + 1;//投注次数

            var kuisuncishu = parseInt(devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisLosingNumberAll());
            if (kuisuncishu == 1 || kuisuncishu == 4 || kuisuncishu == 8 || kuisuncishu == 13) {
                if (!devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisIsTransition()) {
                    devote_streak = 0;
                }
                cr.setThisIsTransition(true);
            } else {
                cr.setThisIsTransition(false);
            }

            if (devote_streak > 6) {
                //console.table(devote_all_record_shuang[size])
                if (devote_all_record_shuang[size][dcrai_shuang[size] - 1].getProfitOrLoss() === "盈" &&
                    devote_all_record_shuang[size][dcrai_shuang[size] - 2].getProfitOrLoss() === "亏" &&
                    devote_all_record_shuang[size][dcrai_shuang[size] - 3].getProfitOrLoss() === "盈" &&
                    parseInt(devote_all_record_shuang[size][dcrai_shuang[size] - 1].getDevoteRate()) ===
                    parseInt(devote_all_record_shuang[size][dcrai_shuang[size] - 3].getDevoteRate())) {
                    devote_streak = 0;
                }
            }
            var gongsi = gain_rule(devote_streak, parseInt(devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisLosingNumberAll()),
                devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisIsReverse());
            dr = new DevoteResult();
            dr.setDevoteType("双")
            dr.setDevoteMoney(gongsi * beilv);

            cr.setThisDevote(dr);//当前投注
            cr.setLastDevote(devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisDevote());//上一次投注
            cr.setLastWhetherDevote(devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisWhetherDevote());//上次是否投注
            cr.setThisWhetherDevote(true);//本次是否投注
            cr.setDevoteRate(gongsi);//投注倍率
            cr.setThisDevoteStreak(parseInt(devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisDevoteStreak()) + 1);//本次投注次数
            cr.setThisCountEquation(devote_streak);//单前计算公式（指的时公式第几个）
            cr.setWinningStreakNumber(parseInt(devote_all_record_shuang[size][dcrai_shuang[size] - 1].getWinningStreakNumber()) + 1);//本次连胜次数
            cr.setThisWinningNumber(parseInt(devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisWinningNumber()) + 1);//本次第几次盈利
            cr.setLosingStreaknumber(0);//连败修改为0
            cr.setProfitOrLoss("盈");//设置上次为盈利
            cr.setThisIsReverse(devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisIsReverse());
            devote_all_record_shuang[size][dcrai_shuang[size]] = cr;
            dcrai_shuang[size]++;
            devoteMoney = gongsi * beilv;
        } else {
            cr = new CountResult();
            cr.setThisLosingNumberAll(parseInt(devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisLosingNumberAll() + 1));
            if (devote_all_record_shuang[size][dcrai_shuang[size] - 1].getLosingStreakNumber() < 1) {


                var devote_streak = parseInt(devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisCountEquation()) - 1;//投注次数

                var shifouniuzhuang = false;
                if (parseInt(devote_all_record_shuang[size][dcrai_shuang[size] - 1].getDevoteRate()) === 3
                    && parseInt(devote_all_record_shuang[size][dcrai_shuang[size] - 2].getDevoteRate()) != 3) {

                    shifouniuzhuang = true;
                    cr.setThisIsReverse(true);
                    devote_streak = 0;
                } else if (devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisIsReverse()) {
                    shifouniuzhuang = true;
                    cr.setThisIsReverse(true);
                } else {
                    cr.setThisIsReverse(false);
                    cr.setThisIsReverse(devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisIsReverse());
                }

                var gongsi = gain_rule(devote_streak,
                    parseInt(devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisLosingNumberAll()) + 1, shifouniuzhuang);

                if (devote_all_record_shuang[size][dcrai_shuang[size] - 1].getDevoteRate() === gongsi && gongsi > 2) {//如果上一次投注公司和本次相投，并且不等与2说明不是同一级别，不进行切换公式
                } else {
                    var kuisuncishu = parseInt(devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisLosingNumberAll()) + 1;
                    if (kuisuncishu == 1 || kuisuncishu == 4 || kuisuncishu == 8 || kuisuncishu == 13) {
                        if (!devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisIsTransition()) {
                            devote_streak = 0;
                        }
                        cr.setThisIsTransition(true);
                    } else {
                        cr.setThisIsTransition(false);
                    }
                }

                if (devote_streak < 0) {
                    devote_streak = 0;
                }

                gongsi = gain_rule(devote_streak,
                    parseInt(devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisLosingNumberAll()) + 1, shifouniuzhuang);

                if (devote_all_record_shuang[size][dcrai_shuang[size] - 1].getDevoteRate() == 2 && devote_streak + 1 < 4) {
                    devote_streak = 0;
                }

                dr = new DevoteResult();
                dr.setDevoteType("双")
                dr.setDevoteMoney(gongsi * beilv);

                cr.setThisDevote(dr);//当前投注
                cr.setLastDevote(devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisDevote());//上一次投注
                cr.setLastWhetherDevote(devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisWhetherDevote());//上次是否投注
                cr.setThisWhetherDevote(true);//本次是否投注
                cr.setDevoteRate(gongsi);//投注倍率
                cr.setThisDevoteStreak(parseInt(devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisDevoteStreak()) + 1);//本次投注次数
                cr.setThisCountEquation(devote_streak);//单前计算公式（指的时公式第几个）
                cr.setLosingStreaknumber(parseInt(devote_all_record_shuang[size][dcrai_shuang[size] - 1].getLosingStreakNumber()) + 1);//本次连败次数
                cr.setThisLosingNumber(parseInt(devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisLosningNumber()) + 1);//本次第几次亏损
                cr.setWinningStreakNumber(0);//连胜修改为0
                cr.setProfitOrLoss("亏");//设置本次未亏

                devote_all_record_shuang[size][dcrai_shuang[size]] = cr;
                dcrai_shuang[size]++;
                devoteMoney = gongsi * beilv;
            } else {
                devote_all_record_shuang[size][dcrai_shuang[size] - 1].setThisCountEquation(-1);
                devote_all_record_shuang[size][dcrai_shuang[size] - 1].setThisIsReverse(false);
            }
        }
    }
    return devoteMoney;
}

var devote_count_record_all_danshuang = new Array();//记录所有投注计算结果
var dcrai_all_danshuang = 0;

/**
 * 双向投注计算展示最终投注金额
 * @param beilv 投注倍率
 */
function count_danshuang_devote(input, beilv, size) {
    dr = new DevoteResult();

    var dan = DevoteCount_dan(input, beilv, size);
    var shuang = DevoteCount_shuang(input, beilv, size);

    console.log(dan + "=============" + shuang);

    if (dan > shuang) {
        dr.setDevoteType("单");
        dr.setDevoteMoney(parseInt(dan) - parseInt(shuang));
    } else {
        dr.setDevoteType("双");
        dr.setDevoteMoney(parseInt(shuang) - parseInt(dan));
    }
    devote_count_record_all_danshuang[dcrai_all_danshuang] = dr;
    dcrai_all_danshuang++;
    //console.log(dr.getDevoteType())
    return dr;
}

var meiyicitouzhujieguo_danshuang = new Array();
var dancitouzhujieguo_danshuang = new Array();
var meiyicitouru_danshuang = 0;

function devote_danshuang_view() {
    var beilv = getById("danshuang_beilv").value;
    if (is_null(beilv)) {
        alert("单双倍率不能为空");
        danshuang_queren = false;
        return;
    }

    if (dancitouzhujieguo_danshuang.length != 0) {
        jisuan_yingkui_danshuang_jieguo();
    }

    for (var j = 0; j < input_num_index + 1; j++) {
        dr = new DevoteResult();
        dr = count_danshuang_devote(input_num_name_array[j].innerHTML, beilv, j);
        if (dr.getDevoteType() === "单") {
            danshuang_dan_view_array[j].innerHTML = dr.getDevoteMoney();
        } else {
            danshuang_shuang_view_array[j].innerHTML = dr.getDevoteMoney();
        }
        dancitouzhujieguo_danshuang[j] = dr;
    }
    meiyicitouzhujieguo_danshuang[meiyicitouru_danshuang] = dancitouzhujieguo_danshuang;
    meiyicitouru_danshuang++;

}

var danshuang_zhanshi = getByName("danshuang_yingkui_zhanshi");

/**
 * 计算亏盈并展示
 */
function jisuan_yingkui_danshuang_jieguo() {
    danshuang_yingkui_zhanshi_dan[danshuang_yingkui_zhanshi_dan.length - 1].innerHTML = "";
    danshuang_yingkui_zhanshi_shuang[danshuang_yingkui_zhanshi_shuang.length - 1].innerHTML = "";
    for (var j = 0; j < input_num_index + 1; j++) {
        if (is_null(dancitouzhujieguo_danshuang[j])) {
            continue;
        }
        if ((!dos(input_num_name_array[j].innerHTML) && dancitouzhujieguo_danshuang[j].getDevoteType() == "双")
            || (dos(input_num_name_array[j].innerHTML) && dancitouzhujieguo_danshuang[j].getDevoteType() == "单")) {//同为双或者同为单（盈）
            danshuang_yingkui_zhanshi_dan[j].innerHTML =
                parseInt(is_null(danshuang_yingkui_zhanshi_dan[j].innerHTML) ? 0 : danshuang_yingkui_zhanshi_dan[j].innerHTML) +
                parseInt(dancitouzhujieguo_danshuang[j].getDevoteMoney());

            danshuang_yingkui_zhanshi_dan[danshuang_yingkui_zhanshi_dan.length - 1].innerHTML =
                parseInt(is_null(danshuang_yingkui_zhanshi_dan[danshuang_yingkui_zhanshi_dan.length - 1].innerHTML)
                    ? 0 : danshuang_yingkui_zhanshi_dan[danshuang_yingkui_zhanshi_dan.length - 1].innerHTML) +
                parseInt(danshuang_yingkui_zhanshi_dan[j].innerHTML);

            getById("danshuang_jieyu").value = parseInt(getById("danshuang_jieyu").value) + parseInt(dancitouzhujieguo_danshuang[j].getDevoteMoney());
        } else {//一单一双（亏）
            danshuang_yingkui_zhanshi_shuang[j].innerHTML =
                parseInt(is_null(danshuang_yingkui_zhanshi_shuang[j].innerHTML) ? 0 : danshuang_yingkui_zhanshi_shuang[j].innerHTML) +
                parseInt(dancitouzhujieguo_danshuang[j].getDevoteMoney());

            danshuang_yingkui_zhanshi_shuang[danshuang_yingkui_zhanshi_shuang.length - 1].innerHTML =
                parseInt(is_null(danshuang_yingkui_zhanshi_shuang[danshuang_yingkui_zhanshi_shuang.length - 1].innerHTML)
                    ? 0 : danshuang_yingkui_zhanshi_shuang[danshuang_yingkui_zhanshi_shuang.length - 1].innerHTML) +
                parseInt(danshuang_yingkui_zhanshi_shuang[j].innerHTML);

            getById("danshuang_jieyu").value = parseInt(getById("danshuang_jieyu").value) - parseInt(dancitouzhujieguo_danshuang[j].getDevoteMoney());
        }

        danshuang_zhanshi[j].innerHTML = parseInt(is_null(danshuang_yingkui_zhanshi_dan[j].innerHTML) ? 0 : danshuang_yingkui_zhanshi_dan[j].innerHTML) -
            parseInt(is_null(danshuang_yingkui_zhanshi_shuang[j].innerHTML) ? 0 : danshuang_yingkui_zhanshi_shuang[j].innerHTML);
    }

    var num_all = 0;
    for (var i = 0; i < danshuang_zhanshi.length - 1; i++) {
        num_all += is_null(danshuang_zhanshi[i].innerHTML) ? 0 : parseInt(danshuang_zhanshi[i].innerHTML);
    }
    danshuang_zhanshi[danshuang_zhanshi.length - 1].innerHTML = num_all;

}

//==================================================计算单双结束（面向对象）======================

//==================================================计算龙虎开始======================


var devote_all_record_long = new Array();//记录投注的所有结果
var dcrai_long = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

var danxiang_touzhu_longhu_long = [false, false, false, false, false, false, false, false, false, false, false,];
var danxiang_touzhu_longhu_hu = [false, false, false, false, false, false, false, false, false, false, false,];

/**
 * 计算投注龙
 * @param input 当前输入的数值
 * @param beilv 当前的倍率
 * @returns {number}
 * @constructor
 */
function DevoteCount_long(input, beilv, size) {
    var devoteMoney = 0;
    var shifoutouzhuguo = true;

    if (is_null(devote_all_record_long[size])) {
        devote_all_record_long[size] = new Array();
        shifoutouzhuguo = false;
    } else if (devote_all_record_long[size].length == 0) {
        shifoutouzhuguo = false;
    } else {
        shifoutouzhuguo = true;
    }
    if (!shifoutouzhuguo) {//从未投注
        if (loh(input)) {//第一次出现龙开始投注，否则不投注
            if (shifoudanxiang && danxiang_touzhu_longhu_hu[size]) {
                return 0;
            }

            if (shifoudanxiang) {
                danxiang_touzhu_longhu_long[size] = true;
            }

            var gongsi = gain_rule(0, 0, false);
            dr = new DevoteResult();
            dr.setDevoteType("龙")
            dr.setDevoteMoney(gongsi * beilv);
            cr = new CountResult();
            cr.setThisDevote(dr);
            cr.setThisWhetherDevote(true);
            cr.setDevoteRate(gongsi);
            cr.setThisDevoteStreak(0);
            cr.setThisCountEquation(0)
            devote_all_record_long[size][dcrai_long[size]] = cr;
            dcrai_long[size]++;
            devoteMoney = gongsi * beilv;
        }
    } else {
        if (shifoudanxiang && !danxiang_touzhu_longhu_long[size]) {
            return 0;
        }
        if (loh(input)) {//盈
            dr = new DevoteResult();
            cr = new CountResult();
            cr.setThisLosingNumberAll(parseInt(devote_all_record_long[size][dcrai_long[size] - 1].getThisLosingNumberAll()));
            if (!loh(cunchusuoyou[qishu - 1][size])
                && parseInt(devote_all_record_long[size][dcrai_long[size] - 1].getThisLosningNumber()) > 1) {//如果上一期出的结果不为龙，不进行投注
                return 0;
            }

            var devote_streak = parseInt(devote_all_record_long[size][dcrai_long[size] - 1].getThisCountEquation()) + 1;//投注次数

            var kuisuncishu = parseInt(devote_all_record_long[size][dcrai_long[size] - 1].getThisLosingNumberAll());
            if (kuisuncishu == 1 || kuisuncishu == 4 || kuisuncishu == 8 || kuisuncishu == 13) {
                if (!devote_all_record_long[size][dcrai_long[size] - 1].getThisIsTransition()) {
                    devote_streak = 0;
                }
                cr.setThisIsTransition(true);
            } else {
                cr.setThisIsTransition(false);
            }

            if (devote_streak > 6) {
                if (devote_all_record_long[size][dcrai_long[size] - 1].getProfitOrLoss() === "盈" &&
                    devote_all_record_long[size][dcrai_long[size] - 2].getProfitOrLoss() === "亏" &&
                    devote_all_record_long[size][dcrai_long[size] - 3].getProfitOrLoss() === "盈" &&
                    parseInt(devote_all_record_long[size][dcrai_long[size] - 1].getDevoteRate()) ===
                    parseInt(devote_all_record_long[size][dcrai_long[size] - 3].getDevoteRate())) {
                    devote_streak = 0;
                }
            }


            var gongsi = gain_rule(devote_streak, parseInt(devote_all_record_long[size][dcrai_long[size] - 1].getThisLosingNumberAll()),
                devote_all_record_long[size][dcrai_long[size] - 1].getThisIsReverse());

            dr = new DevoteResult();
            dr.setDevoteType("龙")
            dr.setDevoteMoney(gongsi * beilv);

            cr.setThisDevote(dr);//当前投注
            cr.setLastDevote(devote_all_record_long[size][dcrai_long[size] - 1].getThisDevote());//上一次投注
            cr.setLastWhetherDevote(devote_all_record_long[size][dcrai_long[size] - 1].getThisWhetherDevote());//上次是否投注
            cr.setThisWhetherDevote(true);//本次是否投注
            cr.setDevoteRate(gongsi);//投注倍率
            cr.setThisDevoteStreak(parseInt(devote_all_record_long[size][dcrai_long[size] - 1].getThisDevoteStreak()) + 1);//本次投注次数
            cr.setThisCountEquation(devote_streak);//本次计算公式
            cr.setWinningStreakNumber(parseInt(devote_all_record_long[size][dcrai_long[size] - 1].getWinningStreakNumber()) + 1);//本次连胜次数
            cr.setThisWinningNumber(parseInt(devote_all_record_long[size][dcrai_long[size] - 1].getThisWinningNumber()) + 1);//本次第几次盈利
            cr.setLosingStreaknumber(0);//连败修改为0
            cr.setProfitOrLoss("盈");//设置上次为
            cr.setThisIsReverse(devote_all_record_long[size][dcrai_long[size] - 1].getThisIsReverse());
            devote_all_record_long[size][dcrai_long[size]] = cr;
            dcrai_long[size]++;
            devoteMoney = gongsi * beilv;
        } else {
            dr = new DevoteResult();
            cr = new CountResult();
            cr.setThisLosingNumberAll(parseInt(devote_all_record_long[size][dcrai_long[size] - 1].getThisLosingNumberAll()) + 1);
            if (devote_all_record_long[size][dcrai_long[size] - 1].getLosingStreakNumber() < 1) {
                var devote_streak = parseInt(devote_all_record_long[size][dcrai_long[size] - 1].getThisCountEquation()) - 1;//投注次数

                var shifouniuzhuang = false;
                if (parseInt(devote_all_record_long[size][dcrai_long[size] - 1].getDevoteRate()) === 3
                    && parseInt(devote_all_record_long[size][dcrai_long[size] - 2].getDevoteRate()) != 3) {
                    shifouniuzhuang = true;
                    cr.setThisIsReverse(true);
                    devote_streak = 0;
                } else if (devote_all_record_long[size][dcrai_long[size] - 1].getThisIsReverse()) {
                    shifouniuzhuang = true;
                    cr.setThisIsReverse(true);
                } else {
                    cr.setThisIsReverse(false);
                    cr.setThisIsReverse(devote_all_record_long[size][dcrai_long[size] - 1].getThisIsReverse());
                }
                var gongsi = gain_rule(devote_streak,
                    parseInt(devote_all_record_long[size][dcrai_long[size] - 1].getThisLosingNumberAll()) + 1, shifouniuzhuang);

                if (devote_all_record_long[size][dcrai_long[size] - 1].getDevoteRate() === gongsi && gongsi > 2) {//如果上一次投注公司和本次相投，并且不等与2说明不是同一级别，不进行切换公式
                } else {
                    var kuisuncishu = parseInt(devote_all_record_long[size][dcrai_long[size] - 1].getThisLosingNumberAll()) + 1;
                    if (kuisuncishu == 1 || kuisuncishu == 4 || kuisuncishu == 8 || kuisuncishu == 13) {//如果亏顺基码为这些时，进行切换
                        if (!devote_all_record_long[size][dcrai_long[size] - 1].getThisIsTransition()) {
                            devote_streak = 0;
                        }
                        cr.setThisIsTransition(true);
                    } else {
                        cr.setThisIsTransition(false);
                    }
                }

                if (devote_streak < 0) {
                    devote_streak = 0;
                }

                gongsi = gain_rule(devote_streak,
                    parseInt(devote_all_record_long[size][dcrai_long[size] - 1].getThisLosingNumberAll()) + 1, shifouniuzhuang);

                if (devote_all_record_long[size][dcrai_long[size] - 1].getDevoteRate() == 2 && devote_streak + 1 < 4) {
                    devote_streak = 0;
                }

                dr.setDevoteType("龙")
                dr.setDevoteMoney(gongsi * beilv);

                cr.setThisDevote(dr);//当前投注
                cr.setLastDevote(devote_all_record_long[size][dcrai_long[size] - 1].getThisDevote());//上一次投注
                cr.setLastWhetherDevote(devote_all_record_long[size][dcrai_long[size] - 1].getThisWhetherDevote());//上次是否投注
                cr.setThisWhetherDevote(true);//本次是否投注
                cr.setDevoteRate(gongsi);//投注倍率
                cr.setThisDevoteStreak(parseInt(devote_all_record_long[size][dcrai_long[size] - 1].getThisDevoteStreak()) + 1);//本次投注次数
                cr.setThisCountEquation(devote_streak);//本次计算公式
                cr.setLosingStreaknumber(parseInt(devote_all_record_long[size][dcrai_long[size] - 1].getLosingStreakNumber()) + 1);//本次连败次数
                cr.setThisLosingNumber(parseInt(devote_all_record_long[size][dcrai_long[size] - 1].getThisLosningNumber()) + 1);//本次第几次亏损
                cr.setWinningStreakNumber(0);//连胜修改为0
                cr.setProfitOrLoss("亏");//设置本次未亏
                devote_all_record_long[size][dcrai_long[size]] = cr;
                dcrai_long[size]++;
                devoteMoney = gongsi * beilv;
            } else {
                devote_all_record_long[size][dcrai_long[size] - 1].setThisCountEquation(-1);
                devote_all_record_long[size][dcrai_long[size] - 1].setThisIsReverse(false);
            }
        }
    }
    return devoteMoney;
}

var devote_all_record_hu = new Array();//记录投注的所有结果
var dcrai_hu = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

/**
 * 计算投注虎
 * @param input 当前输入的数值
 * @param beilv 当前投注倍率
 * @returns {number}
 * @constructor
 */
function DevoteCount_hu(input, beilv, size) {
    var devoteMoney = 0;
    var shifoutouzhuguo = true;
    if (is_null(devote_all_record_hu[size])) {
        devote_all_record_hu[size] = new Array();
        shifoutouzhuguo = false;
    } else if (devote_all_record_hu[size].length == 0) {
        shifoutouzhuguo = false;
    } else {
        shifoutouzhuguo = true;
    }
    if (!shifoutouzhuguo) {//从未投注
        if (!loh(input)) {//第一次出现虎开始投注，否则不投注
            if (shifoudanxiang && danxiang_touzhu_longhu_long[size]) {
                return 0;
            }
            if (shifoudanxiang) {
                danxiang_touzhu_longhu_hu[size] = true;
            }
            var gongsi = gain_rule(0, 0, false);
            dr = new DevoteResult();
            dr.setDevoteType("虎")
            dr.setDevoteMoney(gongsi * beilv);
            cr = new CountResult();
            cr.setThisDevote(dr);
            cr.setThisWhetherDevote(true);
            cr.setDevoteRate(gongsi);
            cr.setThisDevoteStreak(0);
            cr.setThisCountEquation(0);
            devote_all_record_hu[size][parseInt(dcrai_hu[size])] = cr;
            dcrai_hu[size]++;
            devoteMoney = gongsi * beilv;
        }
    } else {
        if (shifoudanxiang && !danxiang_touzhu_longhu_hu[size]) {
            return 0;
        }

        if (!loh(input)) {//盈

            cr = new CountResult();
            cr.setThisLosingNumberAll(parseInt(devote_all_record_hu[size][dcrai_hu[size] - 1].getThisLosingNumberAll()));
            if (loh(cunchusuoyou[qishu - 1][size])
                && parseInt(devote_all_record_hu[size][dcrai_hu[size] - 1].getThisLosningNumber()) > 1) {//如果上一期出的结果不为虎，不进行投注
                return 0;
            }

            var devote_streak = parseInt(devote_all_record_hu[size][dcrai_hu[size] - 1].getThisCountEquation()) + 1;//投注次数

            var kuisuncishu = parseInt(devote_all_record_hu[size][dcrai_hu[size] - 1].getThisLosingNumberAll());
            if (kuisuncishu == 1 || kuisuncishu == 4 || kuisuncishu == 8 || kuisuncishu == 13) {
                if (!devote_all_record_hu[size][dcrai_hu[size] - 1].getThisIsTransition()) {
                    devote_streak = 0;
                }
                cr.setThisIsTransition(true);
            } else {
                cr.setThisIsTransition(false);
            }

            if (devote_streak > 6) {
                //console.table(devote_all_record_hu[size])
                if (devote_all_record_hu[size][dcrai_hu[size] - 1].getProfitOrLoss() === "盈" &&
                    devote_all_record_hu[size][dcrai_hu[size] - 2].getProfitOrLoss() === "亏" &&
                    devote_all_record_hu[size][dcrai_hu[size] - 3].getProfitOrLoss() === "盈" &&
                    parseInt(devote_all_record_hu[size][dcrai_hu[size] - 1].getDevoteRate()) ===
                    parseInt(devote_all_record_hu[size][dcrai_hu[size] - 3].getDevoteRate())) {
                    devote_streak = 0;
                }
            }
            var gongsi = gain_rule(devote_streak, parseInt(devote_all_record_hu[size][dcrai_hu[size] - 1].getThisLosingNumberAll()),
                devote_all_record_hu[size][dcrai_hu[size] - 1].getThisIsReverse());
            dr = new DevoteResult();
            dr.setDevoteType("虎")
            dr.setDevoteMoney(gongsi * beilv);

            cr.setThisDevote(dr);//当前投注
            cr.setLastDevote(devote_all_record_hu[size][dcrai_hu[size] - 1].getThisDevote());//上一次投注
            cr.setLastWhetherDevote(devote_all_record_hu[size][dcrai_hu[size] - 1].getThisWhetherDevote());//上次是否投注
            cr.setThisWhetherDevote(true);//本次是否投注
            cr.setDevoteRate(gongsi);//投注倍率
            cr.setThisDevoteStreak(parseInt(devote_all_record_hu[size][dcrai_hu[size] - 1].getThisDevoteStreak()) + 1);//本次投注次数
            cr.setThisCountEquation(devote_streak);//龙前计算公式（指的时公式第几个）
            cr.setWinningStreakNumber(parseInt(devote_all_record_hu[size][dcrai_hu[size] - 1].getWinningStreakNumber()) + 1);//本次连胜次数
            cr.setThisWinningNumber(parseInt(devote_all_record_hu[size][dcrai_hu[size] - 1].getThisWinningNumber()) + 1);//本次第几次盈利
            cr.setLosingStreaknumber(0);//连败修改为0
            cr.setProfitOrLoss("盈");//设置上次为盈利
            cr.setThisIsReverse(devote_all_record_hu[size][dcrai_hu[size] - 1].getThisIsReverse());
            devote_all_record_hu[size][dcrai_hu[size]] = cr;
            dcrai_hu[size]++;
            devoteMoney = gongsi * beilv;
        } else {
            cr = new CountResult();
            cr.setThisLosingNumberAll(parseInt(devote_all_record_hu[size][dcrai_hu[size] - 1].getThisLosingNumberAll() + 1));
            if (devote_all_record_hu[size][dcrai_hu[size] - 1].getLosingStreakNumber() < 1) {


                var devote_streak = parseInt(devote_all_record_hu[size][dcrai_hu[size] - 1].getThisCountEquation()) - 1;//投注次数

                var shifouniuzhuang = false;
                if (parseInt(devote_all_record_hu[size][dcrai_hu[size] - 1].getDevoteRate()) === 3
                    && parseInt(devote_all_record_hu[size][dcrai_hu[size] - 2].getDevoteRate()) != 3) {

                    shifouniuzhuang = true;
                    cr.setThisIsReverse(true);
                    devote_streak = 0;
                } else if (devote_all_record_hu[size][dcrai_hu[size] - 1].getThisIsReverse()) {
                    shifouniuzhuang = true;
                    cr.setThisIsReverse(true);
                } else {
                    cr.setThisIsReverse(false);
                    cr.setThisIsReverse(devote_all_record_hu[size][dcrai_hu[size] - 1].getThisIsReverse());
                }

                var gongsi = gain_rule(devote_streak,
                    parseInt(devote_all_record_hu[size][dcrai_hu[size] - 1].getThisLosingNumberAll()) + 1, shifouniuzhuang);

                if (devote_all_record_hu[size][dcrai_hu[size] - 1].getDevoteRate() === gongsi && gongsi > 2) {//如果上一次投注公司和本次相投，并且不等与2说明不是同一级别，不进行切换公式
                } else {
                    var kuisuncishu = parseInt(devote_all_record_hu[size][dcrai_hu[size] - 1].getThisLosingNumberAll()) + 1;
                    if (kuisuncishu == 1 || kuisuncishu == 4 || kuisuncishu == 8 || kuisuncishu == 13) {
                        if (!devote_all_record_hu[size][dcrai_hu[size] - 1].getThisIsTransition()) {
                            devote_streak = 0;
                        }
                        cr.setThisIsTransition(true);
                    } else {
                        cr.setThisIsTransition(false);
                    }
                }

                if (devote_streak < 0) {
                    devote_streak = 0;
                }

                gongsi = gain_rule(devote_streak,
                    parseInt(devote_all_record_hu[size][dcrai_hu[size] - 1].getThisLosingNumberAll()) + 1, shifouniuzhuang);

                if (devote_all_record_hu[size][dcrai_hu[size] - 1].getDevoteRate() == 2 && devote_streak + 1 < 4) {
                    devote_streak = 0;
                }

                dr = new DevoteResult();
                dr.setDevoteType("虎")
                dr.setDevoteMoney(gongsi * beilv);

                cr.setThisDevote(dr);//当前投注
                cr.setLastDevote(devote_all_record_hu[size][dcrai_hu[size] - 1].getThisDevote());//上一次投注
                cr.setLastWhetherDevote(devote_all_record_hu[size][dcrai_hu[size] - 1].getThisWhetherDevote());//上次是否投注
                cr.setThisWhetherDevote(true);//本次是否投注
                cr.setDevoteRate(gongsi);//投注倍率
                cr.setThisDevoteStreak(parseInt(devote_all_record_hu[size][dcrai_hu[size] - 1].getThisDevoteStreak()) + 1);//本次投注次数
                cr.setThisCountEquation(devote_streak);//龙前计算公式（指的时公式第几个）
                cr.setLosingStreaknumber(parseInt(devote_all_record_hu[size][dcrai_hu[size] - 1].getLosingStreakNumber()) + 1);//本次连败次数
                cr.setThisLosingNumber(parseInt(devote_all_record_hu[size][dcrai_hu[size] - 1].getThisLosningNumber()) + 1);//本次第几次亏损
                cr.setWinningStreakNumber(0);//连胜修改为0
                cr.setProfitOrLoss("亏");//设置本次未亏
                devote_all_record_hu[size][dcrai_hu[size]] = cr;
                dcrai_hu[size]++;
                devoteMoney = gongsi * beilv;
            } else {
                devote_all_record_hu[size][dcrai_hu[size] - 1].setThisCountEquation(-1);
                devote_all_record_hu[size][dcrai_hu[size] - 1].setThisIsReverse(false);
            }
        }
    }
    return devoteMoney;
}

var devote_count_record_all_longhu = new Array();//记录所有投注计算结果
var dcrai_all_longhu = 0;

/**
 * 虎向投注计算展示最终投注金额
 * @param beilv 投注倍率
 */
function count_longhu_devote(input, beilv, size) {
    dr = new DevoteResult();

    var long = DevoteCount_long(input, beilv, size);
    var hu = DevoteCount_hu(input, beilv, size);

    console.log(long + "=============" + hu);

    if (long > hu) {
        dr.setDevoteType("龙");
        dr.setDevoteMoney(parseInt(long) - parseInt(hu));
    } else {
        dr.setDevoteType("虎");
        dr.setDevoteMoney(parseInt(hu) - parseInt(long));
    }
    devote_count_record_all_longhu[dcrai_all_longhu] = dr;
    dcrai_all_longhu++;
    //console.log(dr.getDevoteType())
    return dr;
}

var meiyicitouzhujieguo_longhu = new Array();
var dancitouzhujieguo_longhu = new Array();
var meiyicitouru_longhu = 0;

function devote_longhu_view() {
    var beilv = getById("longhu_beilv").value;
    if (is_null(beilv)) {
        alert("龙虎倍率不能为空");
        longhu_queren = false;
        return;
    }

    if (dancitouzhujieguo_longhu.length != 0) {
        jisuan_yingkui_longhu_jieguo();
    }

    for (var j = 0; j < input_num_index + 1; j++) {
        dr = new DevoteResult();
        dr = count_longhu_devote(input_num_name_array[j].innerHTML, beilv, j);
        if (dr.getDevoteType() === "龙") {
            longhu_long_view_array[j].innerHTML = dr.getDevoteMoney();
        } else {
            longhu_hu_view_array[j].innerHTML = dr.getDevoteMoney();
        }
        dancitouzhujieguo_longhu[j] = dr;
    }
    meiyicitouzhujieguo_longhu[meiyicitouru_longhu] = dancitouzhujieguo_longhu;
    meiyicitouru_longhu++;

}

var longhu_zhanshi = getByName("longhu_yingkui_zhanshi");

/**
 * 计算亏盈并展示
 */
function jisuan_yingkui_longhu_jieguo() {
    longhu_yingkui_zhanshi_long[longhu_yingkui_zhanshi_long.length - 1].innerHTML = "";
    longhu_yingkui_zhanshi_hu[longhu_yingkui_zhanshi_hu.length - 1].innerHTML = "";
    for (var j = 0; j < input_num_index + 1; j++) {
        if (is_null(dancitouzhujieguo_longhu[j])) {
            continue;
        }
        if ((!loh(input_num_name_array[j].innerHTML) && dancitouzhujieguo_longhu[j].getDevoteType() == "虎")
            || (loh(input_num_name_array[j].innerHTML) && dancitouzhujieguo_longhu[j].getDevoteType() == "龙")) {//同为虎或者同为龙（盈）
            longhu_yingkui_zhanshi_long[j].innerHTML =
                parseInt(is_null(longhu_yingkui_zhanshi_long[j].innerHTML) ? 0 : longhu_yingkui_zhanshi_long[j].innerHTML) +
                parseInt(dancitouzhujieguo_longhu[j].getDevoteMoney());

            longhu_yingkui_zhanshi_long[longhu_yingkui_zhanshi_long.length - 1].innerHTML =
                parseInt(is_null(longhu_yingkui_zhanshi_long[longhu_yingkui_zhanshi_long.length - 1].innerHTML)
                    ? 0 : longhu_yingkui_zhanshi_long[longhu_yingkui_zhanshi_long.length - 1].innerHTML) +
                parseInt(longhu_yingkui_zhanshi_long[j].innerHTML);

            getById("longhu_jieyu").value = parseInt(getById("longhu_jieyu").value) + parseInt(dancitouzhujieguo_longhu[j].getDevoteMoney());
        } else {//一龙一虎（亏）
            longhu_yingkui_zhanshi_hu[j].innerHTML =
                parseInt(is_null(longhu_yingkui_zhanshi_hu[j].innerHTML) ? 0 : longhu_yingkui_zhanshi_hu[j].innerHTML) +
                parseInt(dancitouzhujieguo_longhu[j].getDevoteMoney());

            longhu_yingkui_zhanshi_hu[longhu_yingkui_zhanshi_hu.length - 1].innerHTML =
                parseInt(is_null(longhu_yingkui_zhanshi_hu[longhu_yingkui_zhanshi_hu.length - 1].innerHTML)
                    ? 0 : longhu_yingkui_zhanshi_hu[longhu_yingkui_zhanshi_hu.length - 1].innerHTML) +
                parseInt(longhu_yingkui_zhanshi_hu[j].innerHTML);

            getById("longhu_jieyu").value = parseInt(getById("longhu_jieyu").value) - parseInt(dancitouzhujieguo_longhu[j].getDevoteMoney());
        }

        longhu_zhanshi[j].innerHTML = parseInt(is_null(longhu_yingkui_zhanshi_long[j].innerHTML) ? 0 : longhu_yingkui_zhanshi_long[j].innerHTML) -
            parseInt(is_null(longhu_yingkui_zhanshi_hu[j].innerHTML) ? 0 : longhu_yingkui_zhanshi_hu[j].innerHTML);
    }

    var num_all = 0;
    for (var i = 0; i < longhu_zhanshi.length - 1; i++) {
        num_all += is_null(longhu_zhanshi[i].innerHTML) ? 0 : parseInt(longhu_zhanshi[i].innerHTML);
    }
    longhu_zhanshi[longhu_zhanshi.length - 1].innerHTML = num_all;

}

//==================================================计算龙虎结束（面向对象）======================

/**
 * 记录清除前的数据
 */
var qingchuqianda = new Array();
var qingchuqianxiao = new Array();
var qingchuqiandan = new Array();
var qingchuqianshuang = new Array();
var qingchuqianlong = new Array();
var qingchuqianhu = new Array();

function jiluqingchuqianshuju() {
    for (var i = 0; i < 10; i++) {
        qingchuqianda[i] = daxiao_da_view_array[i].innerHTML;
        qingchuqianxiao[i] = daxiao_xiao_view_array[i].innerHTML;
        qingchuqiandan[i] = danshuang_dan_view_array[i].innerHTML;
        qingchuqianshuang[i] = danshuang_shuang_view_array[i].innerHTML;
        qingchuqianlong[i] = longhu_long_view_array[i].innerHTML;
        qingchuqianhu[i] = longhu_hu_view_array[i].innerHTML;
    }
}

/**
 * 清空所有显示：单双，龙虎，大小
 */
function clear_view_div() {
    jiluqingchuqianshuju();
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
    jiluqingchuqianshuju();
    for (var i = 0; i < daxiao_da_view_array.length; i++) {
        daxiao_xiao_view_array[i].innerHTML = "";
        daxiao_da_view_array[i].innerHTML = "";
    }
}

/**
 * 清除单双
 */
function clear_danshuang_fun() {
    jiluqingchuqianshuju();
    for (var i = 0; i < danshuang_dan_view_array.length; i++) {
        danshuang_dan_view_array[i].innerHTML = "";
        danshuang_shuang_view_array[i].innerHTML = "";
    }
}

/**
 * 清除龙虎
 */
function clear_longhu_fun() {
    jiluqingchuqianshuju();
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
            input_num_name_array[i].style.backgroundColor = "";
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
            input_num_name_array[i].style.backgroundColor = "";
        }
    } else if (!shifou_wanquan_shuru && input_num_index < 0) {
        return
    } else {
        input_num_index = -1;
        view_num_up();
        var cunchudage_s = new Array();
        for (var i = 0; i < input_num_name_array.length; i++) {
            cunchudage[i] = input_num_name_array[i].innerHTML;
            cunchudage_s[i] = cunchudage[i];
            input_num_name_array[i].innerHTML = "";
            input_num_name_array[i].style.backgroundColor = "";
        }
        cunchusuoyou[qishu] = cunchudage_s;
        qishu++;
        ////console.table(cunchusuoyou)
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
var kui_start = [1, 1, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16,
    16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 30];
var kui_one_three = [1, 1, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16,
    16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 30];
var kui_niuzhuan = [2, 2, 3, 4, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16,
    16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 30]; //扭转公式
var kui_four_seven = [1, 2, 3, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16,
    16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 30];
var kui_eight_twelve = [2, 3, 5, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16,
    16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 30];
var kui_thirteen_eighteen = [3, 5, 8, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16,
    16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 30];
var kui_other = [1, 3, 5, 8, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16,
    16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 30];


/**
 * 返回当前规则投注倍率
 * @param ddz 当前组
 * @param dtks 当前基码数（亏的次数）
 * @param niuzhuan 是否进行公式扭转
 * @returns {*}
 */
function gain_rule(ddz, dtks, niuzhuan) {
    //alert(ddz + "========="+dtks+"=========="+niuzhuan);
    var nz = is_null(niuzhuan) ? false : niuzhuan;
    var a = 0;
    if (dtks === 0) {
        if (ddz < kui_one_three.length)
            return kui_start[ddz];
        else
            return kui_one_three[kui_one_three.length - 1];
    } else if (dtks <= 3) {
        if (nz) {
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
    } else if (dtks <= 7) {
        if (ddz < kui_four_seven.length)
            return kui_four_seven[ddz];
        else
            return kui_four_seven[kui_four_seven.length - 1];
    } else if (dtks <= 12) {
        if (ddz < kui_eight_twelve.length)
            return kui_eight_twelve[ddz];
        else
            return kui_eight_twelve[kui_eight_twelve.length - 1];
    } else if (dtks <= 18) {
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

/**
 * 设置A1规则
 * @constructor
 */
function A1_shuangxiang() {
    chongzhi_danxiang();
    kui_start = [1, 1, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16,
        16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 30];
    kui_one_three = [1, 1, 2, 3, 2, 2, 3, 4, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16,
        16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 30];
    kui_niuzhuan = [2, 2, 3, 4, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16,
        16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 30]; //扭转公式
    kui_four_seven = [1, 2, 3, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16,
        16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 30];
    kui_eight_twelve = [2, 3, 5, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16,
        16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 30];
    kui_thirteen_eighteen = [3, 5, 8, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16,
        16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 30];
    kui_other = [1, 3, 5, 8, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16,
        16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 30];
}

var shifoudanxiang = false;

function B1_danxiang() {
    A1_shuangxiang();
    shifoudanxiang = true;
}

/**
 * 设置B1规则
 * @constructor
 */
function A2_shuangxiang() {
    chongzhi_danxiang();
    kui_start = [1, 1, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16,
        16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 30];
    kui_one_three = [1, 1, 2, 3, 2, 2, 3, 4, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16,
        16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 30];
    kui_niuzhuan = [2, 2, 3, 4, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16,
        16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 30];//扭转公式
    kui_four_seven = [1, 2, 3, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16,
        16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 30];
    kui_eight_twelve = [2, 3, 5, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16,
        16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 30];
    kui_thirteen_eighteen = [1, 2, 4, 8, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16,
        16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 30];
    kui_other = [1, 2, 4, 8, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16,
        16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 30];
}

function B2_danxiang() {
    A2_shuangxiang();
    shifoudanxiang = true;
}

/**
 * 重置单项投注
 */
function chongzhi_danxiang() {
    danxiang_touzhu_daxiao_da = [false, false, false, false, false, false, false, false, false, false, false,];
    danxiang_touzhu_daxiao_xiao = [false, false, false, false, false, false, false, false, false, false, false,];
    danxiang_touzhu_danshuang_dan = [false, false, false, false, false, false, false, false, false, false, false,];
    danxiang_touzhu_danshuang_shuang = [false, false, false, false, false, false, false, false, false, false, false,];
    danxiang_touzhu_longhu_long = [false, false, false, false, false, false, false, false, false, false, false,];
    danxiang_touzhu_longhu_hu = [false, false, false, false, false, false, false, false, false, false, false,];
}

var Amoshikaiqi = false;

/**
 * A模式
 * @constructor
 */
function Amoshi() {
    Amoshikaiqi = true;
}

var Bmoshikaiqi = false;

/**
 * B模式
 * @constructor
 */
function Bmoshi() {
    Bmoshikaiqi = true;
}

var Cmoshikaiqi = false;

/**
 * C模式
 * @constructor
 */
function Cmoshi() {
    Cmoshikaiqi = true;
}

/**
 * 清除指定那么的节点内容
 * @param name
 */
function clearName(name) {
    var clearNameArray = getByName(name);
    for (var i = 0; i < clearNameArray.length; i++) {
        clearNameArray[i].innerHTML = "";
    }
}

/**
 * 获取url参数
 * @param name
 * @returns {*}
 * @constructor
 */
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

function init_load() {
    var Request = new UrlSearch(); //实例化
    switch (Request.type) {
        case "A1":
            A1_shuangxiang();
            $("#this_type").html("A1双向投注");
            break;
        case "A2":
            A2_shuangxiang();
            $("#this_type").html("A2双向投注");
            break;
        case "B1":
            $("#this_type").html("B1单向顺投");
            B1_danxiang();
            break;
        case "B2":
            $("#this_type").html("B2单向顺投");
            B2_danxiang();
            break;

        case "A":
            $("#this_type").html("A模式");
            Amoshi();
            break;
        case "B":
            $("#this_type").html("B模式");
            Bmoshi();
            break;
        case "C":
            $("#this_type").html("C模式");
            Cmoshi();
            break;
        default:
            $("#this_type").html("B模式");
            Bmoshi();
            break;
    }
}

/**
 * 跳转不同模式
 * @param type
 */
function tiaozhuan_type(type) {
    var data = [{
        "name": "type",
        "param": type
    }]
    //alert(addUrlParam(data))
    var url = addUrlParam(data);
    window.location.href = url;
    //window.navigate( addUrlParam(data));
}

/**
 * 添加参数到url
 * @param data
 * @returns {string}
 */
function addUrlParam(data) {
    var url = window.document.location.href;
    var Request = new UrlSearch(); //实例化
    if (!is_null(Request.type)) {
        url = url.split("&type=")[0];
    }
    if (url.indexOf("?") == -1) {
        url += "?";
    }
    for (var i = 0; i < data.length; i++) {
        url += "&" + data[i].name + "=" + data[i].param;
    }
    return url;
}

function UrlSearch() {
    var name, value;
    var str = location.href; //取得整个地址栏
    var num = str.indexOf("?")
    str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]

    var arr = str.split("&"); //各个参数放到数组里
    for (var i = 0; i < arr.length; i++) {
        num = arr[i].indexOf("=");
        if (num > 0) {
            name = arr[i].substring(0, num);
            value = arr[i].substr(num + 1);
            this[name] = value;
        }
    }
}

/**
 * 回退
 * 1.清除本次的所有数据
 * 2.清除显示的所有数据
 * 3.回显上两次数据
 * @param num回退的次数
 */
function huitui(num) {
    if (num > cunchusuoyou.length) {
        console.log("param error!!!")
        return;
    }
    input_num_enter();
    restart_view_num();
    huitui_yangsi(num);
    huitui_shuju(num);
    huitui_moshi(num);
    huitui_touzhu_data();
}

/**
 * 回退投注展示数据
 */
function huitui_touzhu_data() {
    clear_daxiao_fun();
    clear_danshuang_fun();
    clear_longhu_fun();

    if (meiyicitouzhujieguo.length != 0) {
        for (var i = 0; i < meiyicitouzhujieguo[meiyicitouzhujieguo.length - 1].length; i++) {

            var dr_daxiao = meiyicitouzhujieguo[meiyicitouzhujieguo.length - 1][i];
            if (dr_daxiao.getDevoteType() === "大") {
                daxiao_da_view_array[i].innerHTML = dr_daxiao.getDevoteMoney();
            } else {
                daxiao_xiao_view_array[i].innerHTML = dr_daxiao.getDevoteMoney();
            }
        }
        getById("daxiao_jieyu").value = is_null(jieyu_daxiao[jieyu_daxiao.length - 1]) ? 0 : jieyu_daxiao[jieyu_daxiao.length - 1];
    }

    if (meiyicitouzhujieguo_danshuang.length != 0) {
        for (var i = 0; i < meiyicitouzhujieguo_danshuang[meiyicitouzhujieguo_danshuang.length - 1].length; i++) {

            var dr_danshuang = meiyicitouzhujieguo_danshuang[meiyicitouzhujieguo_danshuang.length - 1][i];
            if (dr_danshuang.getDevoteType() === "单") {
                danshuang_dan_view_array[i].innerHTML = dr_danshuang.getDevoteMoney();
            } else {
                danshuang_shuang_view_array[i].innerHTML = dr_danshuang.getDevoteMoney();
            }

        }
        getById("danshuang_jieyu").value = is_null(jieyu_danshuang[jieyu_danshuang.length - 1]) ? 0 : jieyu_danshuang[jieyu_danshuang.length - 1];
    }

    if (meiyicitouzhujieguo_longhu.length != 0) {
        for (var i = 0; i < meiyicitouzhujieguo_longhu[meiyicitouzhujieguo_longhu.length - 1].length; i++) {


            var dr_longhu = meiyicitouzhujieguo_longhu[meiyicitouzhujieguo_longhu.length - 1][i];
            if (dr_longhu.getDevoteType() === "龙") {
                longhu_long_view_array[i].innerHTML = dr_longhu.getDevoteMoney();
            } else {
                longhu_hu_view_array[i].innerHTML = dr_longhu.getDevoteMoney();
            }

        }
        getById("longhu_jieyu").value = is_null(jieyu_longhu[jieyu_longhu.length - 1]) ? 0 : jieyu_longhu[jieyu_longhu.length - 1];
    }

    getById("hunhejisuan_jieyu").value = parseInt(getById("daxiao_jieyu").value)
        + parseInt(getById("danshuang_jieyu").value)
        + parseInt(getById("longhu_jieyu").value)
}

/**
 * 回退样式
 * @param num
 */
function huitui_yangsi(num) {
    switch (cunchusuoyou.length) {
        case 0://为做任何运算，直接返回
            break;
        case 1://一次运算，情况所有数据即可
            cunchusuoyou = [];//回退几步，就清除几步数据
            for (var i = 0; i < view_num_one_array.length; i++) {
                input_num_name_array[i].innerHTML = "";
                view_num_one_array[i].innerHTML = "";
                view_num_two_array[i].innerHTML = "";
            }

            break;
        case 2://二次运算，只回显一条数据
            cunchusuoyou.splice(cunchusuoyou.length - num, num);//回退几步，就清除几步数据
            for (var i = 0; i < view_num_one_array.length; i++) {
                input_num_name_array[i].innerHTML = "";
                view_num_one_array[i].innerHTML = is_null(cunchusuoyou[0][i])
                    ? "" : cunchusuoyou[0][i];
                view_num_two_array[i].innerHTML = "";
            }
            break;
        default:
            cunchusuoyou.splice(cunchusuoyou.length - num, num);//回退几步，就清除几步数据
            for (var i = 0; i < view_num_one_array.length; i++) {
                input_num_name_array[i].innerHTML = "";
                view_num_one_array[i].innerHTML = is_null(cunchusuoyou[cunchusuoyou.length - 2][i])
                    ? "" : cunchusuoyou[cunchusuoyou.length - 2][i];
                view_num_two_array[i].innerHTML = is_null(cunchusuoyou[cunchusuoyou.length - 1][i])
                    ? "" : cunchusuoyou[cunchusuoyou.length - 1][i];
            }
            getById("view_num_one").innerHTML = parseInt(getById("view_num_one").innerHTML) - num;
            getById("view_num_two").innerHTML = parseInt(getById("view_num_two").innerHTML) - num;
            break;
    }
}

/**
 * 回退数据
 */
function huitui_shuju(num) {
    qishu = qishu - num;
    if (da_xiao) {
        if (qishu == 0) {
            danxiang_touzhu_daxiao_da = [false, false, false, false, false, false, false, false, false, false, false,];
            danxiang_touzhu_daxiao_xiao = [false, false, false, false, false, false, false, false, false, false, false,];
        }
        for (var i = 0; i < devote_all_record_da.length; i++) {
            devote_all_record_da[i].splice(devote_all_record_da[i].length - num, num);
            dcrai_da[i] = dcrai_da[i] - num;

            if (is_null(devote_all_record_da[i][devote_all_record_da[i].length - 1])) {
                danxiang_touzhu_daxiao_da[i] = false;
            } else {
                if (is_null(devote_all_record_da[i][devote_all_record_da[i].length - 1].getThisWhetherDevote())) {
                    danxiang_touzhu_daxiao_da[i] = false;
                } else {
                    danxiang_touzhu_daxiao_da[i] = devote_all_record_da[i][devote_all_record_da[i].length - 1].getThisWhetherDevote();
                }
            }
        }

        for (var i = 0; i < devote_all_record_xiao.length; i++) {
            devote_all_record_xiao[i].splice(devote_all_record_xiao[i].length - num, num);
            dcrai_xiao[i] = dcrai_xiao[i] - num;

            if (is_null(devote_all_record_xiao[i][devote_all_record_xiao[i].length - 1])) {
                danxiang_touzhu_daxiao_xiao[i] = false;
            } else {
                if (is_null(devote_all_record_xiao[i][devote_all_record_xiao[i].length - 1].getThisWhetherDevote())) {
                    danxiang_touzhu_daxiao_xiao[i] = false;
                } else {
                    danxiang_touzhu_daxiao_xiao[i] = devote_all_record_xiao[i][devote_all_record_xiao[i].length - 1].getThisWhetherDevote();
                }
            }

        }

        devote_count_record_all.splice(devote_count_record_all.length - num, num);
        //tihuanshuzushuju(devote_count_record_all,dcrai_all);
        dcrai_all = -num;

        meiyicitouzhujieguo.splice(meiyicitouzhujieguo.length - num, num);
        tihuanshuzushuju(meiyicitouzhujieguo, dancitouzhujieguo);

        meiyicitouru = meiyicitouru - num;
    }
    if (dan_shuang) {
        if (qishu == 0) {
            danxiang_touzhu_danshuang_dan = [false, false, false, false, false, false, false, false, false, false, false,];
            danxiang_touzhu_danshuang_shuang = [false, false, false, false, false, false, false, false, false, false, false,];
        }
        for (var i = 0; i < devote_all_record_dan.length; i++) {
            devote_all_record_dan[i].splice(devote_all_record_dan[i].length - num, num);
            dcrai_dan[i] = dcrai_dan[i] - num;

            if (is_null(devote_all_record_dan[i][devote_all_record_dan[i].length - 1])) {
                danxiang_touzhu_danshuang_dan[i] = false;
            } else {
                if (is_null(devote_all_record_dan[i][devote_all_record_dan[i].length - 1].getThisWhetherDevote())) {
                    danxiang_touzhu_danshuang_dan[i] = false;
                } else {
                    danxiang_touzhu_danshuang_dan[i] = devote_all_record_dan[i][devote_all_record_dan[i].length - 1].getThisWhetherDevote();
                }
            }
        }
        for (var i = 0; i < devote_all_record_shuang.length; i++) {
            devote_all_record_shuang[i].splice(devote_all_record_shuang[i].length - num, num);
            dcrai_shuang[i] = dcrai_shuang[i] - num;

            if (is_null(devote_all_record_shuang[i][devote_all_record_shuang[i].length - 1])) {
                danxiang_touzhu_danshuang_shuang[i] = false;
            } else {
                if (is_null(devote_all_record_shuang[i][devote_all_record_shuang[i].length - 1].getThisWhetherDevote())) {
                    danxiang_touzhu_danshuang_shuang[i] = false;
                } else {
                    danxiang_touzhu_danshuang_shuang[i] = devote_all_record_shuang[i][devote_all_record_shuang[i].length - 1].getThisWhetherDevote();
                }
            }
        }

        devote_count_record_all_danshuang.splice(devote_count_record_all_danshuang.length - num, num);
        //tihuanshuzushuju(devote_count_record_all_danshuang,dcrai_all_danshuang);
        dcrai_all_danshuang -= num;
        meiyicitouzhujieguo_danshuang.splice(meiyicitouzhujieguo_danshuang.length - num, num);
        tihuanshuzushuju(meiyicitouzhujieguo_danshuang, dancitouzhujieguo_danshuang);

        meiyicitouru_danshuang = meiyicitouru_danshuang - num;
    }
    if (long_hu) {
        if (qishu == 0) {
            danxiang_touzhu_longhu_long = [false, false, false, false, false, false, false, false, false, false, false,];
            danxiang_touzhu_longhu_hu = [false, false, false, false, false, false, false, false, false, false, false,];
        }
        for (var i = 0; i < devote_all_record_long.length; i++) {
            devote_all_record_long[i].splice(devote_all_record_long[i].length - num, num);
            dcrai_long[i] = dcrai_long[i] - num;

            if (is_null(devote_all_record_long[i][devote_all_record_long[i].length - 1])) {
                danxiang_touzhu_longhu_long[i] = false;
            } else {
                if (is_null(devote_all_record_long[i][devote_all_record_long[i].length - 1].getThisWhetherDevote())) {
                    danxiang_touzhu_longhu_long[i] = false;
                } else {
                    danxiang_touzhu_longhu_long[i] = devote_all_record_long[i][devote_all_record_long[i].length - 1].getThisWhetherDevote();
                }
            }
        }
        for (var i = 0; i < devote_all_record_hu.length; i++) {
            devote_all_record_hu[i].splice(devote_all_record_hu[i].length - num, num);
            dcrai_hu[i] = dcrai_hu[i] - num;

            if (is_null(devote_all_record_hu[i][devote_all_record_hu[i].length - 1])) {
                danxiang_touzhu_longhu_hu[i] = false;
            } else {
                if (is_null(devote_all_record_hu[i][devote_all_record_hu[i].length - 1].getThisWhetherDevote())) {
                    danxiang_touzhu_longhu_hu[i] = false;
                } else {
                    danxiang_touzhu_longhu_hu[i] = devote_all_record_hu[i][devote_all_record_hu[i].length - 1].getThisWhetherDevote();
                }
            }
        }

        devote_count_record_all_longhu.splice(devote_count_record_all_longhu.length - num, num);
        //tihuanshuzushuju(devote_count_record_all_longhu,dcrai_all_longhu);
        dcrai_all_longhu -= num;
        meiyicitouzhujieguo_longhu.splice(meiyicitouzhujieguo_longhu.length - num, num);
        tihuanshuzushuju(meiyicitouzhujieguo_longhu, dancitouzhujieguo_longhu);

        meiyicitouru_longhu = meiyicitouru_longhu - num;
    }

    tihuanshuzushuju(cunchusuoyou, cunchudage);
}

function huitui_moshi(num) {
    if (Amoshikaiqi) {
        if (da_xiao) {
            if (qishu == 0) {
                shifoutouzhuguo_da = [false, false, false, false, false, false, false, false, false, false, false,];
                shifoutouzhuguo_xiao = [false, false, false, false, false, false, false, false, false, false, false,];
            }

            A_cunchu_suoyou_jima_da.splice(A_cunchu_suoyou_jima_da.length - num, num);
            tihuanshuzushuju(A_cunchu_suoyou_jima_da, A_cunchu_dange_jima_da);

            A_cunchu_suoyou_jima_xiao.splice(A_cunchu_suoyou_jima_xiao.length - num, num);
            tihuanshuzushuju(A_cunchu_suoyou_jima_xiao, A_cunchu_dange_jima_xiao);


            for (var i = 0; i < 10; i++) {
                if (dcrai_da[i] <= 0) {
                    shifoutouzhuguo_da[i] = false;
                } else {
                    shifoutouzhuguo_da[i] = true;
                }
                if (dcrai_xiao[i] <= 0) {
                    shifoutouzhuguo_xiao[i] = false;
                } else {
                    shifoutouzhuguo_xiao[i] = true;
                }
            }


            A_dangqian_qishu = A_dangqian_qishu - num;
        }
        if (dan_shuang) {
            if (qishu == 0) {
                shifoutouzhuguo_dan = [false, false, false, false, false, false, false, false, false, false, false,];
                shifoutouzhuguo_shuang = [false, false, false, false, false, false, false, false, false, false, false,];
            }

            A_cunchu_suoyou_jima_danshuang_dan.splice(A_cunchu_suoyou_jima_danshuang_dan.length - num, num);
            tihuanshuzushuju(A_cunchu_suoyou_jima_danshuang_dan, A_cunchu_dange_jima_danshuang_dan);

            A_cunchu_suoyou_jima_danshuang_shuang.splice(A_cunchu_suoyou_jima_danshuang_shuang.length - num, num);
            tihuanshuzushuju(A_cunchu_suoyou_jima_danshuang_shuang, A_cunchu_dange_jima_danshuang_shuang);


            for (var i = 0; i < 10; i++) {
                if (dcrai_dan[i] <= 0) {
                    shifoutouzhuguo_dan[i] = false;
                } else {
                    shifoutouzhuguo_dan[i] = true;
                }
                if (dcrai_shuang[i] <= 0) {
                    shifoutouzhuguo_shuang[i] = false;
                } else {
                    shifoutouzhuguo_shuang[i] = true;
                }
            }

            A_dangqian_qishu_danshuang = A_dangqian_qishu_danshuang - num;
        }
        if (long_hu) {
            if (qishu == 0) {
                shifoutouzhuguo_long = [false, false, false, false, false, false, false, false, false, false, false,];
                shifoutouzhuguo_hu = [false, false, false, false, false, false, false, false, false, false, false,];
            }

            A_cunchu_suoyou_jima_longhu_long.splice(A_cunchu_suoyou_jima_longhu_long.length - num, num);
            tihuanshuzushuju(A_cunchu_suoyou_jima_longhu_long, A_cunchu_dange_jima_longhu_long);

            A_cunchu_suoyou_jima_longhu_hu.splice(A_cunchu_suoyou_jima_longhu_hu.length - num, num);
            tihuanshuzushuju(A_cunchu_suoyou_jima_longhu_hu, A_cunchu_dange_jima_longhu_hu);


            for (var i = 0; i < 10; i++) {
                if (dcrai_long[i] <= 0) {
                    shifoutouzhuguo_long[i] = false;
                } else {
                    shifoutouzhuguo_long[i] = true;
                }
                if (dcrai_hu[i] <= 0) {
                    shifoutouzhuguo_hu[i] = false;
                } else {
                    shifoutouzhuguo_hu[i] = true;
                }
            }


            A_dangqian_qishu_longhu = A_dangqian_qishu_longhu - num;
        }
    }
    if (Bmoshikaiqi) {
        if (da_xiao) {
            if (qishu == 0) {
                shifoutouzhuguo_da = [false, false, false, false, false, false, false, false, false, false, false,];
                shifoutouzhuguo_xiao = [false, false, false, false, false, false, false, false, false, false, false,];
            }

            b_cunchu_suoyou_jima.splice(b_cunchu_suoyou_jima.length - num, num);
            jieyu_daxiao.splice(jieyu_daxiao.length - num, num);
            tihuanshuzushuju(b_cunchu_suoyou_jima, b_cunchu_dange_jima);

            for (var i = 0; i < 10; i++) {
                if (dcrai_da[i] <= 0) {
                    shifoutouzhuguo_da[i] = false;
                } else {
                    shifoutouzhuguo_da[i] = true;
                }
                if (dcrai_xiao[i] <= 0) {
                    shifoutouzhuguo_xiao[i] = false;
                } else {
                    shifoutouzhuguo_xiao[i] = true;
                }
            }

            b_dangqian_qishu = b_dangqian_qishu - num;
        }
        if (dan_shuang) {
            if (qishu == 0) {
                shifoutouzhuguo_dan = [false, false, false, false, false, false, false, false, false, false, false,];
                shifoutouzhuguo_shuang = [false, false, false, false, false, false, false, false, false, false, false,];
            }

            b_cunchu_suoyou_jima_danshuang.splice(b_cunchu_suoyou_jima_danshuang.length - num, num);
            jieyu_danshuang.splice(jieyu_danshuang.length - num, num);
            tihuanshuzushuju(b_cunchu_suoyou_jima_danshuang, b_cunchu_dange_jima_danshuang);

            for (var i = 0; i < 10; i++) {
                if (dcrai_dan[i] <= 0) {
                    shifoutouzhuguo_dan[i] = false;
                } else {
                    shifoutouzhuguo_dan[i] = true;
                }
                if (dcrai_shuang[i] <= 0) {
                    shifoutouzhuguo_shuang[i] = false;
                } else {
                    shifoutouzhuguo_shuang[i] = true;
                }
            }

            b_dangqian_qishu_danshuang = b_dangqian_qishu_danshuang - num;
        }
        if (long_hu) {
            if (qishu == 0) {
                shifoutouzhuguo_long = [false, false, false, false, false, false, false, false, false, false, false,];
                shifoutouzhuguo_hu = [false, false, false, false, false, false, false, false, false, false, false,];
            }

            b_cunchu_suoyou_jima_longhu.splice(b_cunchu_suoyou_jima_longhu.length - num, num);
            jieyu_longhu.splice(jieyu_longhu.length - num, num);
            tihuanshuzushuju(b_cunchu_suoyou_jima_longhu, b_cunchu_dange_jima_longhu);


            for (var i = 0; i < 10; i++) {
                if (dcrai_long[i] <= 0) {
                    shifoutouzhuguo_long[i] = false;
                } else {
                    shifoutouzhuguo_long[i] = true;
                }
                if (dcrai_hu[i] <= 0) {
                    shifoutouzhuguo_hu[i] = false;
                } else {
                    shifoutouzhuguo_hu[i] = true;
                }
            }

            b_dangqian_qishu_longhu = b_dangqian_qishu_longhu - num;
        }
    }
    if (Cmoshikaiqi) {
        if (da_xiao) {
            if (qishu == 0) {
                shifoutouzhuguo_da = [false, false, false, false, false, false, false, false, false, false, false,];
                shifoutouzhuguo_xiao = [false, false, false, false, false, false, false, false, false, false, false,];
            }

            C_cunchu_suoyou_jima.splice(C_cunchu_suoyou_jima.length - num, num);
            tihuanshuzushuju(C_cunchu_suoyou_jima, C_cunchu_dange_jima);


            for (var i = 0; i < 10; i++) {
                if (dcrai_da[i] <= 0) {
                    shifoutouzhuguo_da[i] = false;
                } else {
                    shifoutouzhuguo_da[i] = true;
                }
                if (dcrai_xiao[i] <= 0) {
                    shifoutouzhuguo_xiao[i] = false;
                } else {
                    shifoutouzhuguo_xiao[i] = true;
                }
            }

            C_dangqian_qishu = C_dangqian_qishu - num;
        }
        if (dan_shuang) {
            if (qishu == 0) {
                shifoutouzhuguo_dan = [false, false, false, false, false, false, false, false, false, false, false,];
                shifoutouzhuguo_shuang = [false, false, false, false, false, false, false, false, false, false, false,];
            }

            C_cunchu_suoyou_jima_danshuang.splice(C_cunchu_suoyou_jima_danshuang.length - num, num);
            tihuanshuzushuju(C_cunchu_suoyou_jima_danshuang, C_cunchu_dange_jima_danshuang);

            for (var i = 0; i < 10; i++) {
                if (dcrai_dan[i] <= 0) {
                    shifoutouzhuguo_dan[i] = false;
                } else {
                    shifoutouzhuguo_dan[i] = true;
                }
                if (dcrai_shuang[i] <= 0) {
                    shifoutouzhuguo_shuang[i] = false;
                } else {
                    shifoutouzhuguo_shuang[i] = true;
                }
            }

            C_dangqian_qishu_danshuang = C_dangqian_qishu_danshuang - num;
        }
        if (long_hu) {
            if (qishu == 0) {
                shifoutouzhuguo_long = [false, false, false, false, false, false, false, false, false, false, false,];
                shifoutouzhuguo_hu = [false, false, false, false, false, false, false, false, false, false, false,];
            }

            C_cunchu_suoyou_jima_longhu.splice(C_cunchu_suoyou_jima_longhu.length - num, num);
            tihuanshuzushuju(C_cunchu_suoyou_jima_longhu, C_cunchu_dange_jima_longhu);


            for (var i = 0; i < 10; i++) {
                if (dcrai_long[i] <= 0) {
                    shifoutouzhuguo_long[i] = false;
                } else {
                    shifoutouzhuguo_long[i] = true;
                }
                if (dcrai_hu[i] <= 0) {
                    shifoutouzhuguo_hu[i] = false;
                } else {
                    shifoutouzhuguo_hu[i] = true;
                }
            }

            C_dangqian_qishu_longhu = C_dangqian_qishu_longhu - num;
        }
    }
}

/**
 * 打印数组
 * @param obj
 */
function printArray(obj) {
    var str = "[ ";
    for (var i = 0; i < obj.length; i++) {
        if (obj[i] instanceof Array) {
            printArray(obj[i]);
        } else {
            str += obj[i] + " , ";
        }
    }
    str += " ]";
    console.log(str);
}

/**
 * 替换数组数据到回退的次数
 * @param ar1
 * @param ar2
 */
function tihuanshuzushuju(ar1, ar2) {
    try {
        if (ar1.length != 0) {
            ar2 = ar1[ar1.length - 1];
        }
    } catch (e) {
        console.log(e)
    }
}

/**
 * 截取数组
 * @param arr
 * @param num
 * @returns {any[]}
 */
function splice_fun(arr, num) {
    alert(arr.length)
    var r = new Array();
    for (var i = 0; i < arr.length - num; i++) {
        r[i] = arr[i];
    }
    return r;
}

//h5 local store
// value 为字符串 或者 JSON格式
function setStore(key,value){
    localStorage.setItem(key, value);
}

//取
function getStore(key){
    return localStorage.getItem(key);
}

//删
function clearStore(key){
    localStorage.removeItem(key);
}

//清除所有
function clearAllStore(){
    localStorage.clear();
}

/**
 * 恢复数据
 */
function huifushuju() {
    huoquhuancushuju();
    if(Amoshikaiqi){
        if(getStore("state") != "A"){
            alert("当前模式无数据恢复")
            return;
        }
        huoquhuancunA();
    }
    if(Bmoshikaiqi){
        if(getStore("state") != ""){
            alert("当前模式无数据恢复")
            return;
        }
        huoquhuancunB();
    }
    if(Cmoshikaiqi){
        if(getStore("state") != "C"){
            alert("当前模式无数据恢复")
            return;
        }
        huoquhuancunC();
    }

    huitui(0);
}

/**
 * 记录所有数据
 */
function jilusuoyoushuju() {
    console.log("开始记录数据")
    cunchushuju();
    if(Amoshikaiqi){
        cuncushujuA();
    }
    if(Bmoshikaiqi){
        cuncushujuB();
    }
    if(Cmoshikaiqi){
        cuncushujuC();
    }
}

/**
 * 将公共数据存放到缓存
 */
function cunchushuju() {

    if(Amoshikaiqi){
        setStore("state","A");
    }
    if(Bmoshikaiqi){
        setStore("state","B");
    }
    if(Cmoshikaiqi){
        setStore("state","C");
    }

    setStore("input_num_index",input_num_index);
    setStore("qishu",qishu);
    setStore("yuanbeijingse",yuanbeijingse);
    setStore("cunchusuoyou",cunchusuoyou);
    setStore("cunchudage",cunchudage);
    setStore("jieyu_daxiao",jieyu_daxiao);
    setStore("jieyu_danshuang",jieyu_danshuang);
    setStore("jieyu_longhu",jieyu_longhu);
    setStore("danxiang_touzhu_daxiao_da",danxiang_touzhu_daxiao_da);
    setStore("danxiang_touzhu_daxiao_xiao",danxiang_touzhu_daxiao_xiao);
    setStore("devote_all_record_da",devote_all_record_da);
    setStore("dcrai_da",dcrai_da);
    setStore("devote_all_record_xiao",devote_all_record_xiao);
    setStore("dcrai_xiao",dcrai_xiao);
    setStore("devote_count_record_all",devote_count_record_all);
    setStore("dcrai_all",dcrai_all);
    setStore("meiyicitouzhujieguo",meiyicitouzhujieguo);
    setStore("dancitouzhujieguo",dancitouzhujieguo);
    setStore("meiyicitouru",meiyicitouru);
    setStore("devote_all_record_dan",devote_all_record_dan);
    setStore("dcrai_dan",dcrai_dan);
    setStore("danxiang_touzhu_danshuang_dan",danxiang_touzhu_danshuang_dan);
    setStore("danxiang_touzhu_danshuang_shuang",danxiang_touzhu_danshuang_shuang);
    setStore("devote_all_record_shuang",devote_all_record_shuang);
    setStore("dcrai_shuang",dcrai_shuang);
    setStore("devote_count_record_all_danshuang",devote_count_record_all_danshuang);
    setStore("dcrai_all_danshuang",dcrai_all_danshuang);
    setStore("meiyicitouzhujieguo_danshuang",meiyicitouzhujieguo_danshuang);
    setStore("dancitouzhujieguo_danshuang",dancitouzhujieguo_danshuang);
    setStore("meiyicitouru_danshuang",meiyicitouru_danshuang);
    setStore("devote_all_record_long",devote_all_record_long);
    setStore("danxiang_touzhu_longhu_long",danxiang_touzhu_longhu_long);
    setStore("danxiang_touzhu_longhu_hu",danxiang_touzhu_longhu_hu);
    setStore("devote_all_record_hu",devote_all_record_hu);
    setStore("dcrai_hu",dcrai_hu);
    setStore("devote_count_record_all_longhu",devote_count_record_all_longhu);
    setStore("dcrai_all_longhu",dcrai_all_longhu);
    setStore("meiyicitouzhujieguo_longhu",meiyicitouzhujieguo_longhu);
    setStore("dancitouzhujieguo_longhu",dancitouzhujieguo_longhu);
    setStore("meiyicitouru_longhu",meiyicitouru_longhu);
    setStore("qingchuqianda",qingchuqianda);
    setStore("qingchuqianxiao",qingchuqianxiao);
    setStore("qingchuqiandan",qingchuqiandan);
    setStore("qingchuqianshuang",qingchuqianshuang);
    setStore("qingchuqianlong",qingchuqianlong);
    setStore("qingchuqianhu",qingchuqianhu);
}

/**
 * A模式计算的数据存入缓存
 */
function cuncushujuA() {
    setStore("A_cunchu_suoyou_jima_da",A_cunchu_suoyou_jima_da);
    setStore("A_cunchu_suoyou_jima_xiao",A_cunchu_suoyou_jima_xiao);
    setStore("A_cunchu_dange_jima_da",A_cunchu_dange_jima_da);
    setStore("A_cunchu_dange_jima_xiao",A_cunchu_dange_jima_xiao);
    setStore("A_cunchu_suoyou_jima_danshuang_dan",A_cunchu_suoyou_jima_danshuang_dan);
    setStore("A_cunchu_suoyou_jima_danshuang_shuang",A_cunchu_suoyou_jima_danshuang_shuang);
    setStore("A_cunchu_dange_jima_danshuang_dan",A_cunchu_dange_jima_danshuang_dan);
    setStore("A_cunchu_dange_jima_danshuang_shuang",A_cunchu_dange_jima_danshuang_shuang);
    setStore("A_cunchu_suoyou_jima_longhu_long",A_cunchu_suoyou_jima_longhu_long);
    setStore("A_cunchu_suoyou_jima_longhu_hu",A_cunchu_suoyou_jima_longhu_hu);
    setStore("A_cunchu_dange_jima_longhu_long",A_cunchu_dange_jima_longhu_long);
    setStore("A_cunchu_dange_jima_longhu_hu",A_cunchu_dange_jima_longhu_hu);
    setStore("A_dangqian_qishu",A_dangqian_qishu);
    setStore("A_dangqian_qishu_danshuang",A_dangqian_qishu_danshuang);
    setStore("A_dangqian_qishu_longhu",A_dangqian_qishu_longhu);
    setStore("shifoutouzhuguo_da",shifoutouzhuguo_da);
    setStore("shifoutouzhuguo_xiao",shifoutouzhuguo_xiao);
    setStore("shifoutouzhuguo_long",shifoutouzhuguo_long);
    setStore("shifoutouzhuguo_hu",shifoutouzhuguo_hu);
    setStore("shifoutouzhuguo_dan",shifoutouzhuguo_dan);
    setStore("shifoutouzhuguo_shuang",shifoutouzhuguo_shuang);
}

/**
 * B模式计算的数据存入缓存
 */
function cuncushujuB() {
    setStore("b_cunchu_suoyou_jima",b_cunchu_suoyou_jima);
    setStore("b_cunchu_dange_jima",b_cunchu_dange_jima);
    setStore("b_cunchu_suoyou_jima_danshuang",b_cunchu_suoyou_jima_danshuang);
    setStore("b_cunchu_dange_jima_danshuang",b_cunchu_dange_jima_danshuang);
    setStore("b_cunchu_suoyou_jima_longhu",b_cunchu_suoyou_jima_longhu);
    setStore("b_cunchu_dange_jima_longhu",b_cunchu_dange_jima_longhu);
    setStore("b_dangqian_qishu",b_dangqian_qishu);
    setStore("b_dangqian_qishu_danshuang",b_dangqian_qishu_danshuang);
    setStore("b_dangqian_qishu_longhu",b_dangqian_qishu_longhu);
    setStore("shifoutouzhuguo_da",shifoutouzhuguo_da);
    setStore("shifoutouzhuguo_xiao",shifoutouzhuguo_xiao);
    setStore("shifoutouzhuguo_long",shifoutouzhuguo_long);
    setStore("shifoutouzhuguo_hu",shifoutouzhuguo_hu);
    setStore("shifoutouzhuguo_dan",shifoutouzhuguo_dan);
    setStore("shifoutouzhuguo_shuang",shifoutouzhuguo_shuang);
}

/**
 * C模式计算的数据存入缓存
 */
function cuncushujuC() {
    setStore("C_cunchu_suoyou_jima",C_cunchu_suoyou_jima);
    setStore("C_cunchu_dange_jima",C_cunchu_dange_jima);
    setStore("C_cunchu_suoyou_jima_danshuang",C_cunchu_suoyou_jima_danshuang);
    setStore("C_cunchu_dange_jima_danshuang",C_cunchu_dange_jima_danshuang);
    setStore("C_cunchu_suoyou_jima_longhu",C_cunchu_suoyou_jima_longhu);
    setStore("C_cunchu_dange_jima_longhu",C_cunchu_dange_jima_longhu);
    setStore("C_dangqian_qishu",C_dangqian_qishu);
    setStore("C_dangqian_qishu_danshuang",C_dangqian_qishu_danshuang);
    setStore("C_dangqian_qishu_longhu",C_dangqian_qishu_longhu);
    setStore("shifoutouzhuguo_da",shifoutouzhuguo_da);
    setStore("shifoutouzhuguo_xiao",shifoutouzhuguo_xiao);
    setStore("shifoutouzhuguo_long",shifoutouzhuguo_long);
    setStore("shifoutouzhuguo_hu",shifoutouzhuguo_hu);
    setStore("shifoutouzhuguo_dan",shifoutouzhuguo_dan);
    setStore("shifoutouzhuguo_shuang",shifoutouzhuguo_shuang);
}

/**
 * 获取缓存中的公共数据
 */
function huoquhuancushuju() {
    input_num_index = getStore("input_num_index");
    qishu = getStore("qishu");
    yuanbeijingse = getStore("yuanbeijingse");
    cunchusuoyou = getStore("cunchusuoyou");
    cunchudage = getStore("cunchudage");
    jieyu_daxiao = getStore("jieyu_daxiao");
    jieyu_danshuang = getStore("jieyu_danshuang");
    jieyu_longhu = getStore("jieyu_longhu");
    danxiang_touzhu_daxiao_da = getStore("danxiang_touzhu_daxiao_da");
    danxiang_touzhu_daxiao_xiao = getStore("danxiang_touzhu_daxiao_xiao");
    devote_all_record_da = getStore("devote_all_record_da");
    dcrai_da = getStore("dcrai_da");
    devote_all_record_xiao = getStore("devote_all_record_xiao");
    dcrai_xiao = getStore("dcrai_xiao");
    devote_count_record_all = getStore("devote_count_record_all");
    dcrai_all = getStore("dcrai_all");
    meiyicitouzhujieguo = getStore("meiyicitouzhujieguo");
    dancitouzhujieguo = getStore("dancitouzhujieguo");
    meiyicitouru = getStore("meiyicitouru");
    devote_all_record_dan = getStore("devote_all_record_dan");
    dcrai_dan = getStore("dcrai_dan");
    danxiang_touzhu_danshuang_dan = getStore("danxiang_touzhu_danshuang_dan");
    danxiang_touzhu_danshuang_shuang = getStore("danxiang_touzhu_danshuang_shuang");
    devote_all_record_shuang = getStore("devote_all_record_shuang");
    dcrai_shuang = getStore("dcrai_shuang");
    devote_count_record_all_danshuang = getStore("devote_count_record_all_danshuang");
    dcrai_all_danshuang = getStore("dcrai_all_danshuang");
    meiyicitouzhujieguo_danshuang = getStore("meiyicitouzhujieguo_danshuang");
    dancitouzhujieguo_danshuang = getStore("dancitouzhujieguo_danshuang");
    meiyicitouru_danshuang = getStore("meiyicitouru_danshuang");
    devote_all_record_long = getStore("devote_all_record_long");
    dcrai_long = getStore("dcrai_long");
    danxiang_touzhu_longhu_long = getStore("danxiang_touzhu_longhu_long");
    danxiang_touzhu_longhu_hu = getStore("danxiang_touzhu_longhu_hu");
    devote_all_record_hu = getStore("devote_all_record_hu");
    dcrai_hu = getStore("dcrai_hu");
    devote_count_record_all_longhu = getStore("devote_count_record_all_longhu");
    dcrai_all_longhu = getStore("dcrai_all_longhu");
    meiyicitouzhujieguo_longhu = getStore("meiyicitouzhujieguo_longhu");
    dancitouzhujieguo_longhu = getStore("dancitouzhujieguo_longhu");
    meiyicitouru_longhu = getStore("meiyicitouru_longhu");
    qingchuqianda = getStore("qingchuqianda");
    qingchuqianxiao = getStore("qingchuqianxiao");
    qingchuqiandan = getStore("qingchuqiandan");
    qingchuqianshuang = getStore("qingchuqianshuang");
    qingchuqianlong = getStore("qingchuqianlong");
    qingchuqianhu = getStore("qingchuqianhu");
}

/**
 * 获取缓存中A模式数据
 */
function huoquhuancunA() {
    A_cunchu_suoyou_jima_da = getStore("A_cunchu_suoyou_jima_da");
    A_cunchu_suoyou_jima_xiao = getStore("A_cunchu_suoyou_jima_xiao");
    A_cunchu_dange_jima_da = getStore("A_cunchu_dange_jima_da");
    A_cunchu_dange_jima_xiao = getStore("A_cunchu_dange_jima_xiao");
    A_cunchu_suoyou_jima_danshuang_dan = getStore("A_cunchu_suoyou_jima_danshuang_dan");
    A_cunchu_suoyou_jima_danshuang_shuang = getStore("A_cunchu_suoyou_jima_danshuang_shuang");
    A_cunchu_dange_jima_danshuang_dan = getStore("A_cunchu_dange_jima_danshuang_dan");
    A_cunchu_dange_jima_danshuang_shuang = getStore("A_cunchu_dange_jima_danshuang_shuang");
    A_cunchu_suoyou_jima_longhu_long = getStore("A_cunchu_suoyou_jima_longhu_long");
    A_cunchu_suoyou_jima_longhu_hu = getStore("A_cunchu_suoyou_jima_longhu_hu");
    A_cunchu_dange_jima_longhu_long = getStore("A_cunchu_dange_jima_longhu_long");
    A_cunchu_dange_jima_longhu_hu = getStore("A_cunchu_dange_jima_longhu_hu");
    A_dangqian_qishu = getStore("A_dangqian_qishu");
    A_dangqian_qishu_danshuang = getStore("A_dangqian_qishu_danshuang");
    A_dangqian_qishu_longhu = getStore("A_dangqian_qishu_longhu");
    shifoutouzhuguo_da = getStore("shifoutouzhuguo_da");
    shifoutouzhuguo_xiao = getStore("shifoutouzhuguo_xiao");
    shifoutouzhuguo_long = getStore("shifoutouzhuguo_long");
    shifoutouzhuguo_hu = getStore("shifoutouzhuguo_hu");
    shifoutouzhuguo_dan = getStore("shifoutouzhuguo_dan");
    shifoutouzhuguo_shuang = getStore("shifoutouzhuguo_shuang");
}
/**
 * 获取缓存中B模式数据
 */
function huoquhuancunB() {
    b_cunchu_suoyou_jima = getStore("b_cunchu_suoyou_jima");
    b_cunchu_dange_jima = getStore("b_cunchu_dange_jima");
    b_cunchu_suoyou_jima_danshuang = getStore("b_cunchu_suoyou_jima_danshuang");
    b_cunchu_dange_jima_danshuang = getStore("b_cunchu_dange_jima_danshuang");
    b_cunchu_suoyou_jima_longhu = getStore("b_cunchu_suoyou_jima_longhu");
    b_cunchu_dange_jima_longhu = getStore("b_cunchu_dange_jima_longhu");
    b_dangqian_qishu = getStore("b_dangqian_qishu");
    b_dangqian_qishu_danshuang = getStore("b_dangqian_qishu_danshuang");
    b_dangqian_qishu_longhu = getStore("b_dangqian_qishu_longhu");
    shifoutouzhuguo_da = getStore("shifoutouzhuguo_da");
    shifoutouzhuguo_xiao = getStore("shifoutouzhuguo_xiao");
    shifoutouzhuguo_long = getStore("shifoutouzhuguo_long");
    shifoutouzhuguo_hu = getStore("shifoutouzhuguo_hu");
    shifoutouzhuguo_dan = getStore("shifoutouzhuguo_dan");
    shifoutouzhuguo_shuang = getStore("shifoutouzhuguo_shuang");
}
/**
 * 获取缓存中C模式数据
 */
function huoquhuancunC() {
    C_cunchu_suoyou_jima = getStore("C_cunchu_suoyou_jima");
    C_cunchu_dange_jima = getStore("C_cunchu_dange_jima");
    C_cunchu_suoyou_jima_danshuang = getStore("C_cunchu_suoyou_jima_danshuang");
    C_cunchu_dange_jima_danshuang = getStore("C_cunchu_dange_jima_danshuang");
    C_cunchu_suoyou_jima_longhu = getStore("C_cunchu_suoyou_jima_longhu");
    C_cunchu_dange_jima_longhu = getStore("C_cunchu_dange_jima_longhu");
    C_dangqian_qishu = getStore("C_dangqian_qishu");
    C_dangqian_qishu_danshuang = getStore("C_dangqian_qishu_danshuang");
    C_dangqian_qishu_longhu = getStore("C_dangqian_qishu_longhu");
    shifoutouzhuguo_da = getStore("shifoutouzhuguo_da");
    shifoutouzhuguo_xiao = getStore("shifoutouzhuguo_xiao");
    shifoutouzhuguo_long = getStore("shifoutouzhuguo_long");
    shifoutouzhuguo_hu = getStore("shifoutouzhuguo_hu");
    shifoutouzhuguo_dan = getStore("shifoutouzhuguo_dan");
    shifoutouzhuguo_shuang = getStore("shifoutouzhuguo_shuang");
}