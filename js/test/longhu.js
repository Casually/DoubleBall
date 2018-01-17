//==================================================计算单双开始（面向对象）======================
var devote_all_record_dan = new Array();//记录投注的所有结果
var dcrai_dan = [0,0,0,0,0,0,0,0,0,0];

/**
 * 计算投注单
 * @param input 当前输入的数值
 * @param beilv 当前的倍率
 * @returns {number}
 * @constructor
 */
function DevoteCount_dan(input,beilv,size){
    var devoteMoney = 0;
    var shifoutouzhuguo = true;

    if(is_null(devote_all_record_dan[size])){
        devote_all_record_dan[size] = new Array();
        shifoutouzhuguo = false;
    }else if(devote_all_record_dan[size].length == 0){
        shifoutouzhuguo = false;
    }else{
        shifoutouzhuguo = true;
    }
    if(!shifoutouzhuguo){//从未投注
        if(loh(input)){//第一次出现单开始投注，否则不投注
            if(shifoudanxiang && danxiang_touzshuang_danshuang_shuang[size]){
                return 0;
            }

            if(shifoudanxiang){
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
    }else{
        if(shifoudanxiang && !danxiang_touzshuang_danshuang_dan[size]){
            return 0;
        }
        if(loh(input)){//盈
            dr = new DevoteResult();
            cr = new CountResult();
            cr.setThisLosingNumberAll(parseInt(devote_all_record_dan[size][dcrai_dan[size] - 1].getThisLosingNumberAll()));
            if(!loh(cunchusuoyou[qishu - 1][size])
                && parseInt(devote_all_record_dan[size][dcrai_dan[size] - 1].getThisLosningNumber()) > 1){//如果上一期出的结果不为单，不进行投注
                return 0;
            }

            var devote_streak = parseInt(devote_all_record_dan[size][dcrai_dan[size] - 1].getThisCountEquation()) + 1;//投注次数

            var kuisuncishu  = parseInt(devote_all_record_dan[size][dcrai_dan[size] - 1].getThisLosingNumberAll());
            if(kuisuncishu == 1 || kuisuncishu == 4 || kuisuncishu == 8 || kuisuncishu ==13){
                if(!devote_all_record_dan[size][dcrai_dan[size] - 1].getThisIsTransition()){
                    devote_streak = 0;
                }
                cr.setThisIsTransition(true);
            }else{
                cr.setThisIsTransition(false);
            }

            if(devote_streak > 6){
                if(devote_all_record_dan[size][dcrai_dan[size] - 1].getProfitOrLoss() === "盈" &&
                    devote_all_record_dan[size][dcrai_dan[size] - 2].getProfitOrLoss() === "亏" &&
                    devote_all_record_dan[size][dcrai_dan[size] - 3].getProfitOrLoss() === "盈" &&
                    parseInt(devote_all_record_dan[size][dcrai_dan[size] - 1].getDevoteRate()) ===
                    parseInt(devote_all_record_dan[size][dcrai_dan[size] - 3].getDevoteRate())){
                    devote_streak = 0;
                }
            }


            var gongsi = gain_rule(devote_streak,parseInt(devote_all_record_dan[size][dcrai_dan[size] - 1].getThisLosingNumberAll()),
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
            cr.setProfitOrLoss("盈");//设置上次为
            devote_all_record_dan[size][dcrai_dan[size]] = cr;
            dcrai_dan[size]++;
            devoteMoney = gongsi * beilv;
        }else{
            dr = new DevoteResult();
            cr = new CountResult();
            cr.setThisLosingNumberAll(parseInt(devote_all_record_dan[size][dcrai_dan[size] - 1].getThisLosingNumberAll()) + 1);
            if(devote_all_record_dan[size][dcrai_dan[size] - 1].getLosingStreakNumber() < 1){
                var devote_streak = parseInt(devote_all_record_dan[size][dcrai_dan[size] - 1].getThisCountEquation()) - 1;//投注次数

                var shifouniuzhuang = false;
                if(parseInt(devote_all_record_dan[size][dcrai_dan[size] - 1].getDevoteRate()) === 3
                    && parseInt(devote_all_record_dan[size][dcrai_dan[size] - 2].getDevoteRate()) != 3){
                    shifouniuzhuang = true;
                    cr.setThisIsReverse(true);
                    devote_streak = 0;
                }else if(devote_all_record_dan[size][dcrai_dan[size] - 1].getThisIsReverse() ){
                    shifouniuzhuang = true;
                    cr.setThisIsReverse(true);
                }else{
                    cr.setThisIsReverse(false);
                }
                var gongsi = gain_rule(devote_streak,
                    parseInt(devote_all_record_dan[size][dcrai_dan[size] - 1].getThisLosingNumberAll()) + 1,shifouniuzhuang);

                if(devote_all_record_dan[size][dcrai_dan[size] - 1].getDevoteRate() === gongsi && gongsi > 2){//如果上一次投注公司和本次相投，并且不等与2说明不是同一级别，不进行切换公式
                }else{
                    var kuisuncishu  = parseInt(devote_all_record_dan[size][dcrai_dan[size] - 1].getThisLosingNumberAll()) + 1;
                    if(kuisuncishu == 1 || kuisuncishu == 4 || kuisuncishu == 8 || kuisuncishu ==13){//如果亏顺基码为这些时，进行切换
                        if(!devote_all_record_dan[size][dcrai_dan[size] - 1].getThisIsTransition()){
                            devote_streak = 0;
                        }
                        cr.setThisIsTransition(true);
                    }else{
                        cr.setThisIsTransition(false);
                    }
                }

                if(devote_streak<0){
                    devote_streak = 0;
                }

                gongsi = gain_rule(devote_streak,
                    parseInt(devote_all_record_dan[size][dcrai_dan[size] - 1].getThisLosingNumberAll()) + 1,shifouniuzhuang);

                if(devote_all_record_dan[size][dcrai_dan[size] - 1].getDevoteRate() == 2 && devote_streak + 1 < 4 ){
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
            }else{
                devote_all_record_dan[size][dcrai_dan[size] - 1].setThisCountEquation(-1);
                devote_all_record_dan[size][dcrai_dan[size] - 1].setThisIsReverse(false);
            }
        }
    }
    return devoteMoney;
}

var devote_all_record_shuang = new Array();//记录投注的所有结果
var dcrai_shuang = [0,0,0,0,0,0,0,0,0,0];

/**
 * 计算投注双
 * @param input 当前输入的数值
 * @param beilv 当前投注倍率
 * @returns {number}
 * @constructor
 */
function DevoteCount_shuang(input,beilv,size){
    var devoteMoney = 0;
    var shifoutouzhuguo = true;
    if(is_null(devote_all_record_shuang[size])){
        devote_all_record_shuang[size] = new Array();
        shifoutouzhuguo = false;
    }else if(devote_all_record_shuang[size].length == 0){
        shifoutouzhuguo = false;
    }else{
        shifoutouzhuguo = true;
    }
    if(!shifoutouzhuguo){//从未投注
        if(!loh(input)){//第一次出现双开始投注，否则不投注
            if(shifoudanxiang && danxiang_touzshuang_danshuang_dan[size]){
                return 0 ;
            }
            if(shifoudanxiang){
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
    }else{
        if(shifoudanxiang && !danxiang_touzshuang_danshuang_shuang[size]){
            return 0;
        }

        if(!loh(input)){//盈

            cr = new CountResult();
            cr.setThisLosingNumberAll(parseInt(devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisLosingNumberAll()));
            if(loh(cunchusuoyou[qishu - 1][size])
                && parseInt(devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisLosningNumber()) > 1){//如果上一期出的结果不为双，不进行投注
                return 0;
            }

            var devote_streak = parseInt(devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisCountEquation()) + 1;//投注次数

            var kuisuncishu  = parseInt(devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisLosingNumberAll());
            if(kuisuncishu == 1 || kuisuncishu == 4 || kuisuncishu == 8 || kuisuncishu ==13){
                if(!devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisIsTransition()){
                    devote_streak = 0;
                }
                cr.setThisIsTransition(true);
            }else{
                cr.setThisIsTransition(false);
            }

            if(devote_streak > 6){
                //console.table(devote_all_record_shuang[size])
                if(devote_all_record_shuang[size][dcrai_shuang[size] - 1].getProfitOrLoss() === "盈" &&
                    devote_all_record_shuang[size][dcrai_shuang[size] - 2].getProfitOrLoss() === "亏" &&
                    devote_all_record_shuang[size][dcrai_shuang[size] - 3].getProfitOrLoss() === "盈" &&
                    parseInt(devote_all_record_shuang[size][dcrai_shuang[size] - 1].getDevoteRate()) ===
                    parseInt(devote_all_record_shuang[size][dcrai_shuang[size] - 3].getDevoteRate())){
                    devote_streak = 0;
                }
            }
            var gongsi = gain_rule(devote_streak,parseInt(devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisLosingNumberAll()),
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
            devote_all_record_shuang[size][dcrai_shuang[size]] = cr;
            dcrai_shuang[size]++;
            devoteMoney = gongsi * beilv;
        }else{
            cr = new CountResult();
            cr.setThisLosingNumberAll(parseInt(devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisLosingNumberAll() + 1));
            if(devote_all_record_shuang[size][dcrai_shuang[size] - 1].getLosingStreakNumber() < 1){


                var devote_streak = parseInt(devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisCountEquation()) - 1;//投注次数

                var shifouniuzhuang = false;
                if(parseInt(devote_all_record_shuang[size][dcrai_shuang[size] - 1].getDevoteRate()) === 3
                    && parseInt(devote_all_record_shuang[size][dcrai_shuang[size] - 2].getDevoteRate()) != 3){

                    shifouniuzhuang = true;
                    cr.setThisIsReverse(true);
                    devote_streak = 0;
                }else if(devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisIsReverse()){
                    shifouniuzhuang = true;
                    cr.setThisIsReverse(true);
                }else{
                    cr.setThisIsReverse(false);
                }

                var gongsi = gain_rule(devote_streak,
                    parseInt(devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisLosingNumberAll()) + 1,shifouniuzhuang);

                if(devote_all_record_shuang[size][dcrai_shuang[size] - 1].getDevoteRate() === gongsi && gongsi > 2){//如果上一次投注公司和本次相投，并且不等与2说明不是同一级别，不进行切换公式
                }else {
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

                if(devote_streak <0){
                    devote_streak = 0;
                }

                gongsi = gain_rule(devote_streak,
                    parseInt(devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisLosingNumberAll()) + 1,shifouniuzhuang);

                if(devote_all_record_shuang[size][dcrai_shuang[size] - 1].getDevoteRate() == 2 && devote_streak + 1 < 4 ){
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
            }else{
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
function count_danshuang_devote(input,beilv,size) {
    dr = new DevoteResult();

    var dan = DevoteCount_dan(input,beilv,size);
    var shuang = DevoteCount_hu(input,beilv,size);

    console.log(dan + "=============" + hu);

    if(dan > hu){
        dr.setDevoteType("单");
        dr.setDevoteMoney(parseInt(dan) - parseInt(hu));
    }else{
        dr.setDevoteType("双");
        dr.setDevoteMoney(parseInt(hu) - parseInt(dan));
    }
    devote_count_record_all_danshuang[dcrai_all_danshuang] = dr;
    dcrai_all_danshuang++;
    //console.log(dr.getDevoteType())
    return dr;
}

var meiyicitouzhujieguo_danshuang = new Array();
var dancitouzhujieguo_danshuang = new Array();
var meiyicitouru_danshuang = 0;

function devote_danshuang_view(){
    var beilv =  getById("danshuang_beilv").value;
    if (is_null(beilv)) {
        alert("单双倍率不能为空");
        danshuang_queren = false;
        return;
    }

    if(dancitouzhujieguo_danshuang.length != 0 ){
        jisuan_yingkui_danshuang_jieguo();
    }

    for (var j = 0; j < input_num_index + 1; j++) {
        dr = new DevoteResult();
        dr = count_danshuang_devote(input_num_name_array[j].innerHTML,beilv,j);
        if(dr.getDevoteType() === "单"){
            danshuang_dan_view_array[j].innerHTML = dr.getDevoteMoney();
        }else{
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
        if(is_null(dancitouzhujieguo_danshuang[j])){
            continue;
        }
        if ((!loh(input_num_name_array[j].innerHTML) && dancitouzhujieguo_danshuang[j].getDevoteType() == "双")
            || (loh(input_num_name_array[j].innerHTML) && dancitouzhujieguo_danshuang[j].getDevoteType() == "单")) {//同为双或者同为单（盈）
            danshuang_yingkui_zhanshi_dan[j].innerHTML =
                parseInt(is_null(danshuang_yingkui_zhanshi_dan[j].innerHTML) ? 0 : danshuang_yingkui_zhanshi_dan[j].innerHTML) +
                parseInt(dancitouzhujieguo_danshuang[j].getDevoteMoney());

            danshuang_yingkui_zhanshi_dan[danshuang_yingkui_zhanshi_dan.length - 1].innerHTML =
                parseInt(is_null(danshuang_yingkui_zhanshi_dan[danshuang_yingkui_zhanshi_dan.length - 1].innerHTML)
                    ? 0 :danshuang_yingkui_zhanshi_dan[danshuang_yingkui_zhanshi_dan.length - 1].innerHTML) +
                parseInt(danshuang_yingkui_zhanshi_dan[j].innerHTML);

            getById("danshuang_jieyu").value = parseInt(getById("danshuang_jieyu").value) + parseInt(dancitouzhujieguo_danshuang[j].getDevoteMoney());
        } else {//一单一双（亏）
            danshuang_yingkui_zhanshi_shuang[j].innerHTML =
                parseInt(is_null(danshuang_yingkui_zhanshi_shuang[j].innerHTML) ? 0 : danshuang_yingkui_zhanshi_shuang[j].innerHTML) +
                parseInt(dancitouzhujieguo_danshuang[j].getDevoteMoney());

            danshuang_yingkui_zhanshi_shuang[danshuang_yingkui_zhanshi_shuang.length - 1].innerHTML =
                parseInt(is_null(danshuang_yingkui_zhanshi_shuang[danshuang_yingkui_zhanshi_shuang.length - 1].innerHTML)
                    ? 0 :danshuang_yingkui_zhanshi_shuang[danshuang_yingkui_zhanshi_shuang.length - 1].innerHTML) +
                parseInt(danshuang_yingkui_zhanshi_shuang[j].innerHTML);

            getById("danshuang_jieyu").value = parseInt(getById("danshuang_jieyu").value) - parseInt(dancitouzhujieguo_danshuang[j].getDevoteMoney());
        }

        danshuang_zhanshi[j].innerHTML = parseInt(is_null(danshuang_yingkui_zhanshi_dan[j].innerHTML)?0:danshuang_yingkui_zhanshi_dan[j].innerHTML) -
            parseInt(is_null(danshuang_yingkui_zhanshi_shuang[j].innerHTML)?0:danshuang_yingkui_zhanshi_shuang[j].innerHTML);
    }

    var num_all = 0;
    for(var i = 0;i<danshuang_zhanshi.length - 1;i++){
        num_all += is_null(danshuang_zhanshi[i].innerHTML)?0:parseInt(danshuang_zhanshi[i].innerHTML);
    }
    danshuang_zhanshi[danshuang_zhanshi.length - 1].innerHTML = num_all;

}

//==================================================计算单双结束（面向对象）======================