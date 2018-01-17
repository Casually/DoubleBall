getById = function (e) {
    return document.getElementById(e);
}

getByClass = function (e) {
    return document.getElementsByClassName(e);
}

getByName = function (e) {
    return document.getElementsByName(e);
}

//定义大小，单双，龙虎，混合计算按钮
var da_xiao = false;
var dan_shuang = false;
var long_hu = false;
var hunhe_jisuan = false;
var input_num_index = -1;//定义当前输入数据位子
var qishu = 0;//定义期数显示

var cunchusuoyou = new Array();
var cunchudage = new Array();

var shifou_queren= false;

var input_num_name_array = getByName("view-input-num");

document.addEventListener("click",function (e) {

})

/**
 * 按钮点击事件监听
 */
document.addEventListener("mousedown",function (e) {
    var click_element = e.toElement;

    switch (click_element.getAttribute("name")){
        case "input_num":
            if(input_num_index < input_num_name_array.length - 1){
                input_num_index++;
            }else{
                return;
            }
            input_num_name_array[input_num_index].innerHTML = click_element.innerHTML;
            click_element.style.backgroundColor = "red";
            input_num_name_array[input_num_index].style.backgroundColor = "green";
            break;
        case "count_type":
            switch (click_element.innerHTML){
                case "大小":
                    if(da_xiao){
                        da_xiao = false;
                        click_element.style.backgroundColor = "#FFFFFF"
                    }else{
                        da_xiao = true;
                        click_element.style.backgroundColor = "#ffd32f"
                    }
                    break;
                case "单双":
                    if(dan_shuang){
                        dan_shuang = false;
                        click_element.style.backgroundColor = "#FFFFFF"
                    }else{
                        dan_shuang = true;
                        click_element.style.backgroundColor = "#ffd32f"
                    }
                    break;
                case "龙虎":
                    if(long_hu){
                        long_hu = false;
                        click_element.style.backgroundColor = "#FFFFFF"
                    }else{
                        long_hu = true;
                        click_element.style.backgroundColor = "#ffd32f"
                    }
                    break;
                default :
                    if(hunhe_jisuan){
                        hunhe_jisuan = false;
                        click_element.style.backgroundColor = "#FFFFFF"
                    }else{
                        hunhe_jisuan = true;
                        click_element.style.backgroundColor = "#ffd32f"
                    }
                    break;
            }
            break;
    }
})

document.addEventListener("mouseup",function (e) {
    var click_element = e.toElement;
    if(click_element.getAttribute("name") === "input_num"){
        click_element.style.backgroundColor = "#FFF";
        input_num_name_array[input_num_index].style.backgroundColor = "#FFF";
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
var daxiao_touzhu_ying_size = [0,0,0,0,0,0,0,0,0,0];
var daxiao_touzhu_kui_size = [0,0,0,0,0,0,0,0,0,0];
var danshaung_touzhu_ying_size = 0;
var danshuang_touzhu_kui_size = 0;
var longhu_touzhu_ying_size = 0;
var longhu_touzhu_kui_size = 0;

/**
 * 定义当前投注计算第几组
 * @type {number}
 */
var dangqian_daxiao_zu = [0,0,0,0,0,0,0,0,0,0];
var dangqian_dangshuang_zu = 0;
var dangqian_longhu_zu = 0;
var dangqian_hunhejisuan_zu = 0;

/**
 * 定义当前计算公式是否进行扭转
 * @type {boolean}
 */
var danqian_daxiao_gongshi_niuzhuan = false;//当前计算公式是否进行扭转（大小）

/**
 * 定义累计连续赢多少次进行重置
 * @type {number}
 */
var chongzhi_daxiao_changdu = 20;

function input_num_enter() {//确认事件
    if(input_num_index < 9){
        return;
    }
    if(shifou_queren){

        alert("请勿重复计算，请点击重置后再次输入数据点击确认进行计算")
        return;
    }

    clear_view_div();

    if(da_xiao){
        console.log("调用大小计算公式");
        count_daxiao();
    }

    if(dan_shuang){
        console.log("调用单双计算公式");
        count_danshuang();
    }

    if(long_hu){
        console.log("调用龙虎计算公式");
    }

    if(hunhe_jisuan){
        console.log("调用混合计算公式");
        count_hunhejisuan();
    }
}

/**
 * 大小投注计算
 */
function count_daxiao(beilv) {
    var daxiao_beilv = is_null(beilv)?getById("daxiao_beilv").value:beilv;
    if(daxiao_beilv == ""){
        alert("大小倍率不能为空");
        return;
    }
    if(qishu == 0){
        for (var j = 0 ;j < input_num_index + 1;j++){
            input_num_name_array[j].innerHTML < 6 ? daxiao_xiao_view_array[j].innerHTML = daxiao_beilv : daxiao_da_view_array[j].innerHTML = daxiao_beilv;
        }
    }else if(qishu == 1){
        for (var j = 0 ;j < input_num_index + 1;j++){

            if(daxiao_touzhu_kui_size[j] == 4 || daxiao_touzhu_kui_size[j] == 8
                || daxiao_touzhu_kui_size[j] == 13 || daxiao_touzhu_kui_size[j] ==19){//进行公式变换
                dangqian_daxiao_zu[j] = 0;//将当前组重置为0
                danqian_daxiao_gongshi_niuzhuan = false;//将公式扭转初始化
            }

            if(view_num_one_array[j] < 6 ){
                if(input_num_name_array[j].innerHTML < 6 ){//同为小
                    daxiao_xiao_view_array[j].innerHTML = daxiao_beilv * gain_rule(dangqian_daxiao_zu[j],daxiao_touzhu_kui_size[j]);
                    daxiao_touzhu_ying_size[j]++;
                }else{
                    daxiao_touzhu_kui_size[j]++;
                    daxiao_touzhu_ying_size[j] = 0;
                    if(dangqian_daxiao_zu[j] == 4){
                        danqian_daxiao_gongshi_niuzhuan = true;
                        dangqian_daxiao_zu[j] = 0;
                    }else{
                        dangqian_daxiao_zu[j] -= huitui_daxiao(dangqian_daxiao_zu[j],daxiao_touzhu_kui_size[j]);
                    }
                    daxiao_da_view_array[j].innerHTML = daxiao_beilv * gain_rule(dangqian_daxiao_zu[j],daxiao_touzhu_kui_size[j]);
                }
            }else {
                if( input_num_name_array[j].innerHTML < 6 ){
                    daxiao_touzhu_kui_size[j]++;
                    daxiao_touzhu_ying_size[j] = 0;
                    if(dangqian_daxiao_zu[j] == 4){
                        danqian_daxiao_gongshi_niuzhuan = true;
                        dangqian_daxiao_zu[j] = 0;
                    }else {
                        dangqian_daxiao_zu[j] -= huitui_daxiao(dangqian_daxiao_zu[j],daxiao_touzhu_kui_size[j]);
                    }
                    daxiao_xiao_view_array[j].innerHTML = daxiao_beilv * gain_rule(dangqian_daxiao_zu[j],daxiao_touzhu_kui_size[j]);
                }else{//同为大
                    daxiao_da_view_array[j].innerHTML = daxiao_beilv  * gain_rule(dangqian_daxiao_zu[j],daxiao_touzhu_kui_size[j])
                    daxiao_touzhu_ying_size[j]++;
                }
            }
        }
    }else{
        for (var j = 0 ;j < input_num_index + 1;j++){

            if(daxiao_touzhu_kui_size[j] == 4 || daxiao_touzhu_kui_size[j] == 8
                || daxiao_touzhu_kui_size[j] == 13 || daxiao_touzhu_kui_size[j] ==19){//进行公式变换
                dangqian_daxiao_zu[j] = 0;
            }

            if(view_num_two_array[j] < 6 ){
                if(input_num_name_array[j].innerHTML < 6 ){//同为小
                    daxiao_xiao_view_array[j].innerHTML = daxiao_beilv * gain_rule(dangqian_daxiao_zu[j],daxiao_touzhu_kui_size[j]);
                    daxiao_touzhu_ying_size[j]++;
                }else{
                    daxiao_touzhu_kui_size[j]++;
                    daxiao_touzhu_ying_size[j] = 0;
                    if(dangqian_daxiao_zu[j] == 4){
                        danqian_daxiao_gongshi_niuzhuan = true;
                        dangqian_daxiao_zu[j] = 0;
                    }else{
                        dangqian_daxiao_zu[j] -= huitui_daxiao(dangqian_daxiao_zu[j],daxiao_touzhu_kui_size[j]);
                    }
                    daxiao_da_view_array[j].innerHTML = daxiao_beilv * gain_rule(dangqian_daxiao_zu[j],daxiao_touzhu_kui_size[j]);
                }
            }else {
                if( input_num_name_array[j].innerHTML < 6 ){
                    daxiao_touzhu_kui_size[j]++;
                    daxiao_touzhu_ying_size[j] = 0;
                    if(dangqian_daxiao_zu[j] == 4){
                        danqian_daxiao_gongshi_niuzhuan = true;
                        dangqian_daxiao_zu[j] = 0;
                    }else {
                        dangqian_daxiao_zu[j] -= huitui_daxiao(dangqian_daxiao_zu[j],daxiao_touzhu_kui_size[j]);
                    }
                    daxiao_xiao_view_array[j].innerHTML = daxiao_beilv * gain_rule(dangqian_daxiao_zu[j],daxiao_touzhu_kui_size[j]);
                }else{//同为大
                    daxiao_da_view_array[j].innerHTML = daxiao_beilv  * gain_rule(dangqian_daxiao_zu[j],daxiao_touzhu_kui_size[j])
                    daxiao_touzhu_ying_size[j]++;
                }
            }
        }
    }
    if(!shifou_queren){
        shifou_queren = true;
        for(var j = 0;j<dangqian_daxiao_zu.length;j++){
            getById("daxiao_jieyu").value = parseInt(getById("daxiao_jieyu").value) + daxiao_beilv * gain_rule(dangqian_daxiao_zu[j],daxiao_touzhu_kui_size[j]);//未判断输赢
            dangqian_daxiao_zu[j]++;
        }
    }
}

/**
 * 单双投注计算
 */
function count_danshuang(beilv) {
    var danshuang_beilv = is_null(beilv)?getById("danshuang_beilv").value:beilv;
    if(danshuang_beilv == ""){
        alert("单双倍率不能为空");
        return;
    }
    if(qishu == 0){
        for (var j = 0 ;j < input_num_index + 1;j++){
            input_num_name_array[j].innerHTML%2 == 0 ? danshuang_shuang_view_array[j].innerHTML = danshuang_beilv : danshuang_dan_view_array[j].innerHTML = danshuang_beilv;
        }
    }else{
        for (var j = 0 ;j < input_num_index + 1;j++){
            var a = Math.ceil(Math.random()*10)%2;
            a == 0 ? danshuang_shuang_view_array[j].innerHTML = 1 : danshuang_dan_view_array[j].innerHTML = 1;
        }
    }
}

/**
 * 混合投注计算
 */
function count_hunhejisuan() {
    var hunhejisuan_beilv = getById("longhu_beilv");
    if(hunhejisuan_beilv == ""){
        alert("混合计算倍率不能为空");
        return;
    }
    count_daxiao(hunhejisuan_beilv);
    count_danshuang(hunhejisuan_beilv);

}
/**
 * 清空所有显示：单双，龙虎，大小
 */
function clear_view_div() {
    for (var i = 0 ;i <daxiao_da_view_array.length ;i++){
        daxiao_xiao_view_array[i].innerHTML = "";
        daxiao_da_view_array[i].innerHTML = "";
    }

    for (var i = 0 ;i <danshuang_dan_view_array.length ;i++){
        danshuang_dan_view_array[i].innerHTML = "";
        danshuang_shuang_view_array[i].innerHTML = "";
    }

    for (var i = 0 ;i <longhu_long_view_array.length ;i++){
        longhu_long_view_array[i].innerHTML = "";
        longhu_hu_view_array[i].innerHTML = "";
    }
}

/**
 * 重置按钮事件
 */
function restart_view_num() {
    shifou_queren = false;
    if(input_num_index < 9){//没有输入完就点击了重置
        input_num_index = -1;
        for(var i = 0;i<input_num_name_array.length;i++){
            input_num_name_array[i].innerHTML="";
        }
    }else{
        input_num_index = -1;
        view_num_up();
        for(var i = 0;i<input_num_name_array.length;i++){
            cunchudage[i] = input_num_name_array[i].innerHTML
            input_num_name_array[i].innerHTML="";
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
    switch (qishu){
        case 0:
            getById("view_num_one").innerHTML = 1;
            for(var i = 0 ;i < input_num_name_array.length ;i++){
                view_num_one_array[i].innerHTML = input_num_name_array[i].innerHTML;
            }
            break;
        case 1:
            getById("view_num_two").innerHTML = 2;
            for(var i = 0 ;i < input_num_name_array.length ;i++){
                view_num_two_array[i].innerHTML = input_num_name_array[i].innerHTML;
            }
            break;
        default :
            getById("view_num_one").innerHTML = qishu;
            getById("view_num_two").innerHTML = qishu + 1;
            for(var i = 0 ;i < input_num_name_array.length ;i++){
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
var kui_one_three = [1,1,2,3,3,4,5,4,6,6];
var kui_niuzhuan = [2,2,3,4,4,5,6,6,8,8];
var kui_four_seven = [1,2,3,2,2,3,4,4,5,6,6,8,8];
var kui_eight_twelve = [2,3,5,2,2,3,4,4,5,6,6,8,8];
var kui_thirteen_eighteen = [3,5,8,3,3,4,6,6,7,8,7,9,9];
var kui_other = [1,3,5,8,3,3,4,6,6,7,8,7,9,9];

/**
 * 返回当前规则投注倍率
 * @param ddz
 * @param dtks
 * @returns {*}
 */
function gain_rule(ddz,dtks){
    var a = 0;
    if(dtks == 0){
        if(ddz < kui_one_three.length)
            return kui_one_three[ddz];
        else
            return kui_one_three[kui_one_three.length - 1];
    }else if(dtks < 3){
        if(danqian_daxiao_gongshi_niuzhuan){
            if(ddz < kui_niuzhuan.length)
                return kui_niuzhuan[ddz];
            else
                return kui_niuzhuan[kui_niuzhuan.length - 1];
        }else{
            if(ddz < kui_one_three.length)
                return kui_one_three[ddz];
            else
                return kui_one_three[kui_one_three.length - 1];
        }
    }else if(dtks <7){
        if(danqian_daxiao_gongshi_niuzhuan){
            if(ddz < kui_niuzhuan.length)
                return kui_niuzhuan[ddz];
            else
                return kui_niuzhuan[kui_niuzhuan.length - 1];
        }else{
            if(ddz < kui_four_seven.length)
                return kui_four_seven[ddz];
            else
                return kui_four_seven[kui_four_seven.length - 1];
        }
    }else if(dtks < 12){
        if(danqian_daxiao_gongshi_niuzhuan){
            if(ddz < kui_niuzhuan.length)
                return kui_niuzhuan[ddz];
            else
                return kui_niuzhuan[kui_niuzhuan.length - 1];
        }else{
            if(ddz < kui_eight_twelve.length)
                return kui_eight_twelve[ddz];
            else
                return kui_eight_twelve[kui_eight_twelve.length - 1];
        }
    }else if(dtks < 18){
        if(danqian_daxiao_gongshi_niuzhuan){
            if(ddz < kui_niuzhuan.length)
                return kui_niuzhuan[ddz];
            else
                return kui_niuzhuan[kui_niuzhuan.length - 1];
        }else{
            if(ddz < kui_thirteen_eighteen.length)
                return kui_thirteen_eighteen[ddz];
            else
                return kui_thirteen_eighteen[kui_thirteen_eighteen.length - 1];
        }
    }else{
        if(danqian_daxiao_gongshi_niuzhuan){
            if(ddz < kui_niuzhuan.length)
                return kui_niuzhuan[ddz];
            else
                return kui_niuzhuan[kui_niuzhuan.length - 1];
        }else{
            if(ddz < kui_other.length)
                return kui_other[ddz];
            else
                return kui_other[kui_other.length - 1];
        }
    }
    return a;
}

/**
 * 回退投注大小
 * @param ddzy
 * @param dtks
 * @returns {number}
 */
function huitui_daxiao(ddzy,dtks) {

    if(ddzy < 2){
        return ddzy;
    }

    if(danqian_daxiao_gongshi_niuzhuan){
        return ddzy > kui_niuzhuan.length ? 2 :1;
    }
    if(dtks < 3){
        return ddzy > kui_one_three.length ? 2 :1;
    }else if(dtks <7){
        return ddzy > kui_four_seven.length ? 2 :1;
    }else if(dtks < 12){
        return ddzy > kui_eight_twelve.length ? 2 :1;
    }else if(dtks < 18){
        return ddzy > kui_thirteen_eighteen.length ? 2 :1;
    }else{
        return ddzy > kui_other.length ? 2 :1;
    }
}
/**
 * 判断是否为null
 * @param e
 * @returns {boolean}
 */
function is_null(e) {
    if(e === "" || e === null || e === undefined || e === "undefined")
        return true;
    else
        return false;
}