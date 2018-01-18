/**
 * 定义规则
 */
var A_dayu_fusi = [1, 1, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16,
    16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 30];
var A_xiaoyu_fusi = [1, 2, 3, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16,
    16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 30];
var A_xiaoyu_fuba = [2, 3, 5, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16,
    16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 30];
var A_xiaoyu_fushisan = [3, 5, 8, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16,
    16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 30];
var A_xiaoyu_fushiba = [1, 3, 5, 8, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16,
    16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 30];
var A_kui_niuzhuan = [2, 2, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16,
    16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 30]; //扭转公式

/**
 * 定义存储
 */
var A_cunchu_suoyou_jima_da = new Array();//存储所有基码
var A_cunchu_suoyou_jima_xiao = new Array();//存储所有基码
var A_cunchu_dange_jima_da = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];//存储单个基码
var A_cunchu_dange_jima_xiao = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];//存储单个基码

var A_cunchu_suoyou_jima_danshuang_dan = new Array();//存储所有基码
var A_cunchu_suoyou_jima_danshuang_shuang = new Array();//存储所有基码
var A_cunchu_dange_jima_danshuang_dan = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];//存储单个基码
var A_cunchu_dange_jima_danshuang_shuang = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];//存储单个基码

var A_cunchu_suoyou_jima_longhu_long = new Array();//存储所有基码
var A_cunchu_suoyou_jima_longhu_hu = new Array();//存储所有基码
var A_cunchu_dange_jima_longhu_long = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];//存储单个基码
var A_cunchu_dange_jima_longhu_hu = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];//存储单个基码

var A_dangqian_qishu = 0;
var A_dangqian_qishu_danshuang = 0;
var A_dangqian_qishu_longhu = 0;

//==================================================计算大小开始（面向对象）======================

var shifoutouzhuguo_da = [false, false, false, false, false, false, false, false, false, false];

/**
 * 计算投注大
 * @param input 当前输入的数值
 * @param beilv 当前的倍率
 * @returns {number}
 * @constructor
 */
function A_DevoteCount_da(input, beilv, size) {
    var devoteMoney = 0;
    //console.log(devote_all_record_da[size]);
    if (is_null(devote_all_record_da[size])) {
        devote_all_record_da[size] = new Array();
        shifoutouzhuguo_da[size] = false;
    } else if (devote_all_record_da[size].length == 0) {
        shifoutouzhuguo_da[size] = false;
    } else {
        shifoutouzhuguo_da[size] = true;
    }
    if (!shifoutouzhuguo_da[size]) {//从未投注

        if (dox(input)) {//第一次出现大开始投注，否则不投注
            shifoutouzhuguo_da[size] = true;
            var gongsi = jisuantouzhu_a(0, 0, false);
            dr = new DevoteResult();
            dr.setDevoteType("大")
            dr.setDevoteMoney(gongsi * beilv);
            cr = new CountResult();
            cr.setThisDevote(dr);
            cr.setThisWhetherDevote(true);
            cr.setDevoteRate(gongsi);
            cr.setThisDevoteStreak(0);
            cr.setThisCountEquation(0)
            cr.setLastDevoteRate(0);
            cr.setThisCountEquationName("A_dayu_fusi");
            devote_all_record_da[size][dcrai_da[size]] = cr;
            dcrai_da[size]++;
            devoteMoney = gongsi * beilv;
        }
    } else {
        shifoutouzhuguo_da[size] = true;
        if (dox(input)) {//盈
            var shifouniuzhuang = devote_all_record_da[size][dcrai_da[size] - 1].getThisIsReverse();
            dr = new DevoteResult();
            cr = new CountResult();
            cr.setThisLosingNumberAll(parseInt(devote_all_record_da[size][dcrai_da[size] - 1].getThisLosingNumberAll()));
            if (!dox(cunchusuoyou[qishu - 1][size])
                && parseInt(devote_all_record_da[size][dcrai_da[size] - 1].getThisLosningNumber()) > 1) {//如果上一期出的结果不为大，不进行投注
                return 0;
            }

            var devote_streak = parseInt(devote_all_record_da[size][dcrai_da[size] - 1].getThisCountEquation()) + 1;//投注次数

            var gongsi = jisuantouzhu_a(devote_all_record_da[size][dcrai_da[size] - 1].getThisCountEquationName(),
                devote_streak, devote_all_record_da[size][dcrai_da[size] - 1].getThisIsReverse());

            if (!devote_all_record_da[size][dcrai_da[size] - 1].getThisWhetherDevote()) {
                gongsi = jisuantouzhu_a(getJisuangongshi_a(A_cunchu_dange_jima_da[size]),
                    devote_streak, devote_all_record_da[size][dcrai_da[size] - 1].getThisIsReverse());
            }

            if (devote_streak >= b_yishuyiyingzhuanhuan && devote_all_record_da[size][dcrai_da[size] - 1].getDevoteRate() > 2) {
                if (devote_all_record_da[size][dcrai_da[size] - 1].getProfitOrLoss() == "亏"
                    && devote_all_record_da[size][dcrai_da[size] - 2].getProfitOrLoss() == "盈"
                    && (devote_all_record_da[size][dcrai_da[size] - 1].getThisCountEquationName() == "A_dayu_fusi"
                        || devote_all_record_da[size][dcrai_da[size] - 1].getThisCountEquationName() == "A_kui_niuzhuan")) {
                    devote_streak = 0;
                    shifouniuzhuang = true;
                    gongsi = jisuantouzhu_a("A_kui_niuzhuan", devote_streak, shifouniuzhuang);
                }
            }

            dr = new DevoteResult();
            dr.setDevoteType("大")
            dr.setDevoteMoney(gongsi * beilv);

            cr.setThisDevote(dr);//当前投注
            cr.setLastDevote(devote_all_record_da[size][dcrai_da[size] - 1].getThisDevote());//上一次投注
            cr.setLastWhetherDevote(devote_all_record_da[size][dcrai_da[size] - 1].getThisWhetherDevote());//上次是否投注
            cr.setThisWhetherDevote(true);//本次是否投注
            cr.setDevoteRate(gongsi);//投注倍率
            cr.setLastDevoteRate(devote_all_record_da[size][dcrai_da[size] - 1].getDevoteRate());
            cr.setThisDevoteStreak(parseInt(devote_all_record_da[size][dcrai_da[size] - 1].getThisDevoteStreak()) + 1);//本次投注次数
            cr.setThisCountEquation(devote_streak);//本次计算公式
            cr.setWinningStreakNumber(parseInt(devote_all_record_da[size][dcrai_da[size] - 1].getWinningStreakNumber()) + 1);//本次连胜次数
            cr.setThisWinningNumber(parseInt(devote_all_record_da[size][dcrai_da[size] - 1].getThisWinningNumber()) + 1);//本次第几次盈利
            cr.setLosingStreaknumber(0);//连败修改为0
            cr.setProfitOrLoss("盈");//设置上次为
            cr.setThisIsReverse(shifouniuzhuang);

            if (!devote_all_record_da[size][dcrai_da[size] - 1].getThisWhetherDevote()) {
                cr.setThisCountEquationName(getJisuangongshi_a(A_cunchu_dange_jima_da[size]));
            } else {
                if (devote_all_record_da[size][dcrai_da[size] - 1].getDevoteRate() == 1
                    && devote_all_record_da[size][dcrai_da[size] - 1].getProfitOrLoss() == "亏") {
                    cr.setThisCountEquationName(getJisuangongshi_a(A_cunchu_dange_jima_da[size]));
                } else {
                    cr.setThisCountEquationName(devote_all_record_da[size][dcrai_da[size] - 1].getThisCountEquationName());
                }
            }
            if (devote_streak >= b_yishuyiyingzhuanhuan && devote_all_record_da[size][dcrai_da[size] - 1].getDevoteRate() > 2) {
                if (devote_all_record_da[size][dcrai_da[size] - 1].getProfitOrLoss() == "亏"
                    && devote_all_record_da[size][dcrai_da[size] - 2].getProfitOrLoss() == "盈"
                    && (devote_all_record_da[size][dcrai_da[size] - 1].getThisCountEquationName() == "A_dayu_fusi"
                        || devote_all_record_da[size][dcrai_da[size] - 1].getThisCountEquationName() == "A_kui_niuzhuan")) {
                    cr.setThisCountEquationName("A_kui_niuzhuan");
                }
            }

            devote_all_record_da[size][dcrai_da[size]] = cr;
            dcrai_da[size]++;
            devoteMoney = gongsi * beilv;
        } else {
            dr = new DevoteResult();
            cr = new CountResult();
            cr.setThisLosingNumberAll(parseInt(devote_all_record_da[size][dcrai_da[size] - 1].getThisLosingNumberAll()) + 1);
            if (devote_all_record_da[size][dcrai_da[size] - 1].getLosingStreakNumber() < 1) {
                var devote_streak = parseInt(devote_all_record_da[size][dcrai_da[size] - 1].getThisCountEquation()) - 1;//投注次数

                if (parseInt(devote_all_record_da[size][dcrai_da[size] - 1].getDevoteRate()) === 2 && devote_streak < 4) {
                    devote_streak = 0;
                }

                var shifouniuzhuang = false;
                if (parseInt(devote_all_record_da[size][dcrai_da[size] - 1].getDevoteRate()) === 3
                    && parseInt(devote_all_record_da[size][dcrai_da[size] - 2].getDevoteRate()) != 3) {

                    if (devote_all_record_da[size][dcrai_da[size] - 1].getThisCountEquationName() === "A_dayu_fusi" ||
                        devote_all_record_da[size][dcrai_da[size] - 1].getThisCountEquationName() === "A_kui_niuzhuan") {
                        devote_streak = 0;
                        shifouniuzhuang = true;
                        cr.setThisIsReverse(true);
                    }
                } else if (devote_all_record_da[size][dcrai_da[size] - 1].getThisIsReverse()) {
                    shifouniuzhuang = true;
                    cr.setThisIsReverse(true);
                } else {
                    cr.setThisIsReverse(false);
                }

                if (devote_streak < 0) {
                    devote_streak = 0;
                }

                if (devote_all_record_da[size][dcrai_da[size] - 1].getThisCountEquationName() != "A_dayu_fusi" &&
                    devote_all_record_da[size][dcrai_da[size] - 1].getThisCountEquationName() != "A_kui_niuzhuan") {
                    if (A_cunchu_dange_jima_da[size] < -3) {
                        devote_streak = 0;
                    } else {
                        if (devote_streak > 3) {
                            if (parseInt(devote_all_record_da[size][dcrai_da[size] - 1].getDevoteRate())
                                > parseInt(devote_all_record_da[size][dcrai_da[size] - 2].getDevoteRate())) {
                                devote_streak = parseInt(devote_all_record_da[size][dcrai_da[size] - 1].getThisCountEquation()) - 1;
                            } else {
                                devote_streak = parseInt(devote_all_record_da[size][dcrai_da[size] - 1].getThisCountEquation());
                            }
                        }
                    }
                }

                if (A_cunchu_suoyou_jima_da.length > 2) {
                    if (devote_all_record_da[size][dcrai_da[size] - 1].getThisCountEquationName() != "A_dayu_fusi" &&
                        devote_all_record_da[size][dcrai_da[size] - 1].getThisCountEquationName() != "A_kui_niuzhuan") {
                        if (!A_shifoutongyigongshi(A_cunchu_suoyou_jima_da[A_cunchu_suoyou_jima_da.length - 2][size], A_cunchu_dange_jima_da[size])) {
                            devote_streak = 0;
                            shifouniuzhuang = false;
                        }
                    }
                }

                if (devote_all_record_da[size][dcrai_da[size] - 1].getThisCountEquationName() != "A_dayu_fusi" &&
                    devote_all_record_da[size][dcrai_da[size] - 1].getThisCountEquationName() != "A_kui_niuzhuan") {
                    gongsi = jisuantouzhu_a(A_cunchu_dange_jima_da[size], devote_streak, shifouniuzhuang);
                } else {
                    gongsi = jisuantouzhu_a(devote_all_record_da[size][dcrai_da[size] - 1].getThisCountEquationName(), devote_streak, shifouniuzhuang);
                }

                if (devote_streak + 1 > 4
                    && (devote_all_record_da[size][dcrai_da[size] - 1].getThisCountEquationName() === "A_dayu_fusi"
                        || devote_all_record_da[size][dcrai_da[size] - 1].getThisCountEquationName() === "A_kui_niuzhuan")) {
                    /*shifouniuzhuang = true;
                    devote_streak = 0;*/
                    gongsi = jisuantouzhu_a(devote_all_record_da[size][dcrai_da[size] - 1].getThisCountEquationName(), devote_streak, shifouniuzhuang);
                }

                if (devote_streak + 1 > 3
                    && devote_all_record_da[size][dcrai_da[size] - 1].getThisCountEquationName() != "A_dayu_fusi"
                    && devote_all_record_da[size][dcrai_da[size] - 1].getThisCountEquationName() != "A_kui_niuzhuan") {
                    devote_streak = 0;
                    gongsi = jisuantouzhu_a(getJisuangongshi_a(A_cunchu_dange_jima_da[size]), devote_streak);
                }

                dr.setDevoteType("大")
                dr.setDevoteMoney(gongsi * beilv);

                cr.setThisDevote(dr);//当前投注
                cr.setLastDevote(devote_all_record_da[size][dcrai_da[size] - 1].getThisDevote());//上一次投注
                cr.setLastWhetherDevote(devote_all_record_da[size][dcrai_da[size] - 1].getThisWhetherDevote());//上次是否投注
                cr.setThisWhetherDevote(true);//本次是否投注
                cr.setDevoteRate(gongsi);//投注倍率
                cr.setLastDevoteRate(devote_all_record_da[size][dcrai_da[size] - 1].getDevoteRate());
                cr.setThisDevoteStreak(parseInt(devote_all_record_da[size][dcrai_da[size] - 1].getThisDevoteStreak()) + 1);//本次投注次数
                cr.setThisCountEquation(devote_streak);//本次计算公式
                cr.setLosingStreaknumber(parseInt(devote_all_record_da[size][dcrai_da[size] - 1].getLosingStreakNumber()) + 1);//本次连败次数
                cr.setThisLosingNumber(parseInt(devote_all_record_da[size][dcrai_da[size] - 1].getThisLosningNumber()) + 1);//本次第几次亏损
                cr.setWinningStreakNumber(0);//连胜修改为0
                cr.setProfitOrLoss("亏");//设置本次未亏
                if (shifouniuzhuang && devote_all_record_da[size][dcrai_da[size] - 1].getThisCountEquationName() === "A_dayu_fusi") {
                    cr.setThisCountEquationName("A_kui_niuzhuan");
                } else if (devote_all_record_da[size][dcrai_da[size] - 1].getThisCountEquationName() === "A_kui_niuzhuan") {
                    cr.setThisCountEquationName("A_kui_niuzhuan");
                } else {
                    cr.setThisCountEquationName(getJisuangongshi_a(A_cunchu_dange_jima_da[size], shifouniuzhuang));
                }
                devote_all_record_da[size][dcrai_da[size]] = cr;
                dcrai_da[size]++;
                devoteMoney = gongsi * beilv;
            } else {
                cr = new CountResult();
                cr.setLastDevote(devote_all_record_da[size][dcrai_da[size] - 1].getThisDevote());//上一次投注
                cr.setLastWhetherDevote(devote_all_record_da[size][dcrai_da[size] - 1].getThisWhetherDevote());//上次是否投注
                cr.setThisWhetherDevote(false);//本次是否投注
                cr.setDevoteRate(0);//投注倍率
                cr.setLastDevoteRate(devote_all_record_da[size][dcrai_da[size] - 1].getDevoteRate());
                cr.setThisDevoteStreak(parseInt(devote_all_record_da[size][dcrai_da[size] - 1].getThisDevoteStreak()) + 1);//本次投注次数
                cr.setThisCountEquation(devote_streak);//本次计算公式
                cr.setLosingStreaknumber(parseInt(devote_all_record_da[size][dcrai_da[size] - 1].getLosingStreakNumber()));//本次连败次数
                cr.setThisLosingNumber(parseInt(devote_all_record_da[size][dcrai_da[size] - 1].getThisLosningNumber()));//本次第几次亏损
                cr.setWinningStreakNumber(0);//连胜修改为0
                cr.setProfitOrLoss("亏");//设置本次未亏
                cr.setThisCountEquationName(getJisuangongshi_a(A_cunchu_dange_jima_da[size]));
                devote_all_record_da[size][dcrai_da[size]] = cr;
                dcrai_da[size]++;
                devoteMoney = 0;

                devote_all_record_da[size][dcrai_da[size] - 1].setThisCountEquation(-1);
                devote_all_record_da[size][dcrai_da[size] - 1].setThisIsReverse(false);
            }
        }
    }
    return devoteMoney;
}

var shifoutouzhuguo_xiao = [false, false, false, false, false, false, false, false, false, false];

/**
 * 计算投注小
 * @param input 当前输入的数值
 * @param beilv 当前投注倍率
 * @returns {number}
 * @constructor
 */
function A_DevoteCount_xiao(input, beilv, size) {
    var devoteMoney = 0;
    if (is_null(devote_all_record_xiao[size])) {
        devote_all_record_xiao[size] = new Array();
        shifoutouzhuguo_xiao[size] = false;
    } else if (devote_all_record_xiao[size].length == 0) {
        shifoutouzhuguo_xiao[size] = false;
    } else {
        shifoutouzhuguo_xiao[size] = true;
    }
    if (!shifoutouzhuguo_xiao[size]) {//从未投注

        if (!dox(input)) {//第一次出现小开始投注，否则不投注
            shifoutouzhuguo_xiao[size] = true;
            var gongsi = jisuantouzhu_a(0, 0, false);
            dr = new DevoteResult();
            dr.setDevoteType("小")
            dr.setDevoteMoney(gongsi * beilv);
            cr = new CountResult();
            cr.setThisDevote(dr);
            cr.setThisWhetherDevote(true);
            cr.setDevoteRate(gongsi);
            cr.setThisDevoteStreak(0);
            cr.setThisCountEquation(0);
            cr.setLastDevoteRate(0);
            cr.setThisCountEquationName("A_dayu_fusi");
            devote_all_record_xiao[size][parseInt(dcrai_xiao[size])] = cr;
            dcrai_xiao[size]++;
            devoteMoney = gongsi * beilv;
        }
    } else {
        shifoutouzhuguo_xiao[size] = true;
        if (!dox(input)) {//盈
            var shifouniuzhuang = devote_all_record_xiao[size][dcrai_xiao[size] - 1].getThisIsReverse();
            cr = new CountResult();
            cr.setThisLosingNumberAll(parseInt(devote_all_record_xiao[size][dcrai_xiao[size] - 1].getThisLosingNumberAll()));
            if (dox(cunchusuoyou[qishu - 1][size])
                && parseInt(devote_all_record_xiao[size][dcrai_xiao[size] - 1].getThisLosningNumber()) > 1) {//如果上一期出的结果不为小，不进行投注
                return 0;
            }

            var devote_streak = parseInt(devote_all_record_xiao[size][dcrai_xiao[size] - 1].getThisCountEquation()) + 1;//投注次数

            var gongsi = jisuantouzhu_a(devote_all_record_xiao[size][dcrai_xiao[size] - 1].getThisCountEquationName(),
                devote_streak, devote_all_record_xiao[size][dcrai_xiao[size] - 1].getThisIsReverse());

            if (!devote_all_record_xiao[size][dcrai_xiao[size] - 1].getThisWhetherDevote()) {
                gongsi = jisuantouzhu_a(getJisuangongshi_a(A_cunchu_dange_jima_xiao[size]),
                    devote_streak, devote_all_record_xiao[size][dcrai_xiao[size] - 1].getThisIsReverse());
            }

            if (devote_streak >= b_yishuyiyingzhuanhuan && devote_all_record_xiao[size][dcrai_xiao[size] - 1].getDevoteRate() > 2) {
                if (devote_all_record_xiao[size][dcrai_xiao[size] - 1].getProfitOrLoss() == "亏"
                    && devote_all_record_xiao[size][dcrai_xiao[size] - 2].getProfitOrLoss() == "盈"
                    && (devote_all_record_xiao[size][dcrai_xiao[size] - 1].getThisCountEquationName() == "A_dayu_fusi"
                        || devote_all_record_xiao[size][dcrai_xiao[size] - 1].getThisCountEquationName() == "A_kui_niuzhuan")) {
                    devote_streak = 0;
                    shifouniuzhuang = true;
                    gongsi = jisuantouzhu_a("A_kui_niuzhuan", devote_streak, shifouniuzhuang);
                }
            }

            dr = new DevoteResult();
            dr.setDevoteType("小")
            dr.setDevoteMoney(gongsi * beilv);

            cr.setThisDevote(dr);//当前投注
            cr.setLastDevote(devote_all_record_xiao[size][dcrai_xiao[size] - 1].getThisDevote());//上一次投注
            cr.setLastWhetherDevote(devote_all_record_xiao[size][dcrai_xiao[size] - 1].getThisWhetherDevote());//上次是否投注
            cr.setThisWhetherDevote(true);//本次是否投注
            cr.setDevoteRate(gongsi);//投注倍率
            cr.setLastDevoteRate(devote_all_record_xiao[size][dcrai_xiao[size] - 1].getDevoteRate());
            cr.setThisDevoteStreak(parseInt(devote_all_record_xiao[size][dcrai_xiao[size] - 1].getThisDevoteStreak()) + 1);//本次投注次数
            cr.setThisCountEquation(devote_streak);//单前计算公式（指的时公式第几个）
            cr.setWinningStreakNumber(parseInt(devote_all_record_xiao[size][dcrai_xiao[size] - 1].getWinningStreakNumber()) + 1);//本次连胜次数
            cr.setThisWinningNumber(parseInt(devote_all_record_xiao[size][dcrai_xiao[size] - 1].getThisWinningNumber()) + 1);//本次第几次盈利
            cr.setLosingStreaknumber(0);//连败修改为0
            cr.setProfitOrLoss("盈");//设置上次为盈利
            cr.setThisIsReverse(shifouniuzhuang);
            if (!devote_all_record_xiao[size][dcrai_xiao[size] - 1].getThisWhetherDevote()) {
                cr.setThisCountEquationName(getJisuangongshi_a(A_cunchu_dange_jima_xiao[size]));
            } else {
                if (devote_all_record_xiao[size][dcrai_xiao[size] - 1].getDevoteRate() == 1
                    && devote_all_record_xiao[size][dcrai_xiao[size] - 1].getProfitOrLoss() == "亏") {
                    cr.setThisCountEquationName(getJisuangongshi_a(A_cunchu_dange_jima_xiao[size]));
                } else {
                    cr.setThisCountEquationName(devote_all_record_xiao[size][dcrai_xiao[size] - 1].getThisCountEquationName());
                }
            }

            if (devote_streak >= b_yishuyiyingzhuanhuan && devote_all_record_xiao[size][dcrai_xiao[size] - 1].getDevoteRate() > 2) {
                if (devote_all_record_xiao[size][dcrai_xiao[size] - 1].getProfitOrLoss() == "亏"
                    && devote_all_record_xiao[size][dcrai_xiao[size] - 2].getProfitOrLoss() == "盈"
                    && (devote_all_record_xiao[size][dcrai_xiao[size] - 1].getThisCountEquationName() == "A_dayu_fusi"
                        || devote_all_record_xiao[size][dcrai_xiao[size] - 1].getThisCountEquationName() == "A_kui_niuzhuan")) {
                    cr.setThisCountEquationName("A_kui_niuzhuan");
                }
            }

            devote_all_record_xiao[size][dcrai_xiao[size]] = cr;
            dcrai_xiao[size]++;
            devoteMoney = gongsi * beilv;
        } else {
            cr = new CountResult();
            cr.setThisLosingNumberAll(parseInt(devote_all_record_xiao[size][dcrai_xiao[size] - 1].getThisLosingNumberAll() + 1));
            if (devote_all_record_xiao[size][dcrai_xiao[size] - 1].getLosingStreakNumber() < 1) {


                var devote_streak = parseInt(devote_all_record_xiao[size][dcrai_xiao[size] - 1].getThisCountEquation()) - 1;//投注次数

                if (parseInt(devote_all_record_xiao[size][dcrai_xiao[size] - 1].getDevoteRate()) === 2 && devote_streak < 4) {
                    devote_streak = 0;
                }

                var shifouniuzhuang = false;
                if (parseInt(devote_all_record_xiao[size][dcrai_xiao[size] - 1].getDevoteRate()) === 3
                    && parseInt(devote_all_record_xiao[size][dcrai_xiao[size] - 2].getDevoteRate()) != 3) {

                    if (devote_all_record_xiao[size][dcrai_xiao[size] - 1].getThisCountEquationName() === "A_dayu_fusi" ||
                        devote_all_record_xiao[size][dcrai_xiao[size] - 1].getThisCountEquationName() === "A_kui_niuzhuan") {
                        devote_streak = 0;
                        shifouniuzhuang = true;
                        cr.setThisIsReverse(true);
                    }
                } else if (devote_all_record_xiao[size][dcrai_xiao[size] - 1].getThisIsReverse()) {
                    shifouniuzhuang = true;
                    cr.setThisIsReverse(true);
                } else {
                    cr.setThisIsReverse(false);
                }

                if (devote_streak < 0) {
                    devote_streak = 0;
                }

                if (devote_all_record_xiao[size][dcrai_xiao[size] - 1].getThisCountEquationName() != "A_dayu_fusi" &&
                    devote_all_record_xiao[size][dcrai_xiao[size] - 1].getThisCountEquationName() != "A_kui_niuzhuan") {
                    if (A_cunchu_dange_jima_xiao[size] < -3) {
                        devote_streak = 0;
                    } else {
                        if (devote_streak > 3) {
                            if (parseInt(devote_all_record_xiao[size][dcrai_xiao[size] - 1].getDevoteRate())
                                > parseInt(devote_all_record_xiao[size][dcrai_xiao[size] - 2].getDevoteRate())) {
                                devote_streak = parseInt(devote_all_record_xiao[size][dcrai_xiao[size] - 1].getThisCountEquation()) - 1;
                            } else {
                                devote_streak = parseInt(devote_all_record_xiao[size][dcrai_xiao[size] - 1].getThisCountEquation());
                            }
                        }
                    }
                }

                if (A_cunchu_suoyou_jima_xiao.length > 2) {
                    if (devote_all_record_xiao[size][dcrai_xiao[size] - 1].getThisCountEquationName() != "A_dayu_fusi" &&
                        devote_all_record_xiao[size][dcrai_xiao[size] - 1].getThisCountEquationName() != "A_kui_niuzhuan") {
                        if (!A_shifoutongyigongshi(A_cunchu_suoyou_jima_xiao[A_cunchu_suoyou_jima_xiao.length - 2][size], A_cunchu_dange_jima_xiao[size])) {
                            devote_streak = 0;
                            shifouniuzhuang = false;
                        }
                    }
                }

                if (devote_all_record_xiao[size][dcrai_xiao[size] - 1].getThisCountEquationName() != "A_dayu_fusi" &&
                    devote_all_record_xiao[size][dcrai_xiao[size] - 1].getThisCountEquationName() != "A_kui_niuzhuan") {
                    gongsi = jisuantouzhu_a(A_cunchu_dange_jima_xiao[size], devote_streak, shifouniuzhuang);
                } else {
                    gongsi = jisuantouzhu_a(devote_all_record_xiao[size][dcrai_xiao[size] - 1].getThisCountEquationName(), devote_streak, shifouniuzhuang);
                }

                if (devote_streak + 1 > 4
                    && (devote_all_record_xiao[size][dcrai_xiao[size] - 1].getThisCountEquationName() === "A_dayu_fusi"
                        || devote_all_record_xiao[size][dcrai_xiao[size] - 1].getThisCountEquationName() === "A_kui_niuzhuan")) {
                    /*shifouniuzhuang = true;
                    devote_streak = 0;*/
                    gongsi = jisuantouzhu_a(devote_all_record_xiao[size][dcrai_xiao[size] - 1].getThisCountEquationName(), devote_streak, shifouniuzhuang);
                }
                if (devote_streak + 1 > 3 && devote_all_record_xiao[size][dcrai_xiao[size] - 1].getThisCountEquationName() != "A_dayu_fusi"
                    && devote_all_record_xiao[size][dcrai_xiao[size] - 1].getThisCountEquationName() != "A_kui_niuzhuan") {
                    devote_streak = 0;
                    gongsi = jisuantouzhu_a(getJisuangongshi_a(A_cunchu_dange_jima_xiao[size]), devote_streak);
                }

                dr = new DevoteResult();
                dr.setDevoteType("小")
                dr.setDevoteMoney(gongsi * beilv);

                cr.setThisDevote(dr);//当前投注
                cr.setLastDevote(devote_all_record_xiao[size][dcrai_xiao[size] - 1].getThisDevote());//上一次投注
                cr.setLastWhetherDevote(devote_all_record_xiao[size][dcrai_xiao[size] - 1].getThisWhetherDevote());//上次是否投注
                cr.setThisWhetherDevote(true);//本次是否投注
                cr.setDevoteRate(gongsi);//投注倍率
                cr.setLastDevoteRate(devote_all_record_xiao[size][dcrai_xiao[size] - 1].getDevoteRate());
                cr.setThisDevoteStreak(parseInt(devote_all_record_xiao[size][dcrai_xiao[size] - 1].getThisDevoteStreak()) + 1);//本次投注次数
                cr.setThisCountEquation(devote_streak);//单前计算公式（指的时公式第几个）
                cr.setLosingStreaknumber(parseInt(devote_all_record_xiao[size][dcrai_xiao[size] - 1].getLosingStreakNumber()) + 1);//本次连败次数
                cr.setThisLosingNumber(parseInt(devote_all_record_xiao[size][dcrai_xiao[size] - 1].getThisLosningNumber()) + 1);//本次第几次亏损
                cr.setWinningStreakNumber(0);//连胜修改为0
                cr.setProfitOrLoss("亏");//设置本次未亏

                if (shifouniuzhuang && devote_all_record_xiao[size][dcrai_xiao[size] - 1].getThisCountEquationName() === "A_dayu_fusi") {
                    cr.setThisCountEquationName("A_kui_niuzhuan");
                } else if (devote_all_record_xiao[size][dcrai_xiao[size] - 1].getThisCountEquationName() === "A_kui_niuzhuan") {
                    cr.setThisCountEquationName("A_kui_niuzhuan");
                } else {
                    cr.setThisCountEquationName(getJisuangongshi_a(A_cunchu_dange_jima_xiao[size], shifouniuzhuang));
                }
                devote_all_record_xiao[size][dcrai_xiao[size]] = cr;
                dcrai_xiao[size]++;
                devoteMoney = gongsi * beilv;
            } else {

                cr = new CountResult();
                cr.setLastDevote(devote_all_record_xiao[size][dcrai_xiao[size] - 1].getThisDevote());//上一次投注
                cr.setLastWhetherDevote(devote_all_record_xiao[size][dcrai_xiao[size] - 1].getThisWhetherDevote());//上次是否投注
                cr.setThisWhetherDevote(false);//本次是否投注
                cr.setDevoteRate(0);//投注倍率
                cr.setLastDevoteRate(devote_all_record_xiao[size][dcrai_xiao[size] - 1].getDevoteRate());
                cr.setThisDevoteStreak(parseInt(devote_all_record_xiao[size][dcrai_xiao[size] - 1].getThisDevoteStreak()) + 1);//本次投注次数
                cr.setThisCountEquation(devote_streak);//本次计算公式
                cr.setLosingStreaknumber(parseInt(devote_all_record_xiao[size][dcrai_xiao[size] - 1].getLosingStreakNumber()));//本次连败次数
                cr.setThisLosingNumber(parseInt(devote_all_record_xiao[size][dcrai_xiao[size] - 1].getThisLosningNumber()));//本次第几次亏损
                cr.setWinningStreakNumber(0);//连胜修改为0
                cr.setProfitOrLoss("亏");//设置本次未亏
                cr.setThisCountEquationName(getJisuangongshi_a(A_cunchu_dange_jima_xiao[size]));

                devote_all_record_xiao[size][dcrai_xiao[size]] = cr;
                dcrai_xiao[size]++;
                devoteMoney = 0;

                devote_all_record_xiao[size][dcrai_xiao[size] - 1].setThisCountEquation(-1);
                devote_all_record_xiao[size][dcrai_xiao[size] - 1].setThisIsReverse(false);
            }
        }
    }
    return devoteMoney;
}

/**
 * 双向投注计算展示最终投注金额
 * @param beilv 投注倍率
 */
function A_count_daxiao_devote(input, beilv, size) {
    dr = new DevoteResult();

    var da = A_DevoteCount_da(input, beilv, size);
    var xiao = A_DevoteCount_xiao(input, beilv, size);

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
    return dr;
}

function A_devote_daxiao_view() {
    var beilv = getById("daxiao_beilv").value;
    if (is_null(beilv)) {
        alert("大小倍率不能为空");
        daxiao_queren = false;
        return;
    }

    A_dangqian_qishu++;
    var A_cunchu_dange_jima_daxiao_da = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];//存储单个基码
    var A_cunchu_dange_jima_daxiao_xiao = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];//存储单个基码

    for (var i = 0; i < input_num_index + 1; i++) {
        if (!shifoutouzhuguo_xiao[i] && !shifoutouzhuguo_da[i]) {//从未投注
            A_cunchu_dange_jima_da[i] = 0;
            A_cunchu_dange_jima_xiao[i] = 0;
            A_cunchu_dange_jima_daxiao_da[i] += A_cunchu_dange_jima_da[i];
            A_cunchu_dange_jima_daxiao_xiao[i] += A_cunchu_dange_jima_xiao[i];
        } else {
            if (!shifoutouzhuguo_da[i]) {
                A_cunchu_dange_jima_xiao[i] += parseInt(jisuanjima_a(devote_all_record_xiao[i][devote_all_record_xiao[i].length - 1],
                    parseInt(input_num_name_array[i].innerHTML), "小"));
                A_cunchu_dange_jima_daxiao_xiao[i] += A_cunchu_dange_jima_xiao[i];
            } else if (!shifoutouzhuguo_xiao[i]) {
                A_cunchu_dange_jima_da[i] += parseInt(jisuanjima_a(devote_all_record_da[i][devote_all_record_da[i].length - 1],
                    parseInt(input_num_name_array[i].innerHTML), "大"));
                A_cunchu_dange_jima_daxiao_da[i] += A_cunchu_dange_jima_da[i];
            } else {
                A_cunchu_dange_jima_xiao[i] += parseInt(jisuanjima_a(devote_all_record_xiao[i][devote_all_record_xiao[i].length - 1],
                    parseInt(input_num_name_array[i].innerHTML), "小"));
                A_cunchu_dange_jima_daxiao_xiao[i] += A_cunchu_dange_jima_xiao[i];

                A_cunchu_dange_jima_da[i] += parseInt(jisuanjima_a(devote_all_record_da[i][devote_all_record_da[i].length - 1],
                    parseInt(input_num_name_array[i].innerHTML), "大"));
                A_cunchu_dange_jima_daxiao_da[i] += A_cunchu_dange_jima_da[i];
            }
        }
    }

    A_cunchu_suoyou_jima_da[A_dangqian_qishu] = A_cunchu_dange_jima_daxiao_da;
    A_cunchu_suoyou_jima_xiao[A_dangqian_qishu] = A_cunchu_dange_jima_daxiao_xiao;
    printArray(A_cunchu_suoyou_jima_da);
    printArray(A_cunchu_suoyou_jima_xiao);

    if (dancitouzhujieguo.length != 0) {
        A_jisuan_yingkui_daxiao_jieguo();
    }

    var dancitouzhujieguo_s = new Array();
    for (var j = 0; j < input_num_index + 1; j++) {

        dr = new DevoteResult();
        dr = A_count_daxiao_devote(input_num_name_array[j].innerHTML, beilv, j);
        if (dr.getDevoteType() === "大") {
            daxiao_da_view_array[j].innerHTML = dr.getDevoteMoney();
        } else {
            daxiao_xiao_view_array[j].innerHTML = dr.getDevoteMoney();
        }
        dancitouzhujieguo[j] = dr;
        dancitouzhujieguo_s[j] = dancitouzhujieguo[j];
    }
    meiyicitouzhujieguo[meiyicitouru] = dancitouzhujieguo_s;
    meiyicitouru++;

}

/**
 * 计算亏盈并展示
 */
function A_jisuan_yingkui_daxiao_jieguo() {
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
    jieyu_daxiao[A_dangqian_qishu] = getById("daxiao_jieyu").value;
    /*   for(var i = 0;i < A_cunchu_dange_jima.length;i++){
           daxiao_zhanshi[j].innerHTML = A_cunchu_dange_jima[i];
       }
   */
    var num_all = 0;
    for (var i = 0; i < daxiao_zhanshi.length - 1; i++) {
        num_all += is_null(daxiao_zhanshi[i].innerHTML) ? 0 : parseInt(daxiao_zhanshi[i].innerHTML);
    }
    daxiao_zhanshi[daxiao_zhanshi.length - 1].innerHTML = num_all;
    /*   getById("daxiao_jieyu").value = parseInt(num_all)*/

}

//==================================================计算大小结束（面向对象）======================

//==================================================计算单双开始（面向对象）======================

var shifoutouzhuguo_dan = [false, false, false, false, false, false, false, false, false, false];

/**
 * 计算投注单
 * @param input 当前输入的数值
 * @param beilv 当前的倍率
 * @returns {number}
 * @constructor
 */
function A_DevoteCount_dan(input, beilv, size) {
    var devoteMoney = 0;
    //console.log(devote_all_record_dan[size]);
    if (is_null(devote_all_record_dan[size])) {
        devote_all_record_dan[size] = new Array();
        shifoutouzhuguo_dan[size] = false;
    } else if (devote_all_record_dan[size].length == 0) {
        shifoutouzhuguo_dan[size] = false;
    } else {
        shifoutouzhuguo_dan[size] = true;
    }
    if (!shifoutouzhuguo_dan[size]) {//从未投注

        if (dos(input)) {//第一次出现单开始投注，否则不投注
            shifoutouzhuguo_dan[size] = true;
            var gongsi = jisuantouzhu_a(0, 0, false);
            dr = new DevoteResult();
            dr.setDevoteType("单")
            dr.setDevoteMoney(gongsi * beilv);
            cr = new CountResult();
            cr.setThisDevote(dr);
            cr.setThisWhetherDevote(true);
            cr.setDevoteRate(gongsi);
            cr.setThisDevoteStreak(0);
            cr.setThisCountEquation(0)
            cr.setLastDevoteRate(0);
            cr.setThisCountEquationName("A_dayu_fusi");
            devote_all_record_dan[size][dcrai_dan[size]] = cr;
            dcrai_dan[size]++;
            devoteMoney = gongsi * beilv;
        }
    } else {
        shifoutouzhuguo_dan[size] = true;
        if (dos(input)) {//盈
            var shifouniuzhuang = devote_all_record_dan[size][dcrai_dan[size] - 1].getThisIsReverse();
            dr = new DevoteResult();
            cr = new CountResult();
            cr.setThisLosingNumberAll(parseInt(devote_all_record_dan[size][dcrai_dan[size] - 1].getThisLosingNumberAll()));
            if (!dos(cunchusuoyou[qishu - 1][size])
                && parseInt(devote_all_record_dan[size][dcrai_dan[size] - 1].getThisLosningNumber()) > 1) {//如果上一期出的结果不为单，不进行投注
                return 0;
            }

            var devote_streak = parseInt(devote_all_record_dan[size][dcrai_dan[size] - 1].getThisCountEquation()) + 1;//投注次数

            var gongsi = jisuantouzhu_a(devote_all_record_dan[size][dcrai_dan[size] - 1].getThisCountEquationName(),
                devote_streak, devote_all_record_dan[size][dcrai_dan[size] - 1].getThisIsReverse());


            if (!devote_all_record_dan[size][dcrai_dan[size] - 1].getThisWhetherDevote()) {
                gongsi = jisuantouzhu_a(getJisuangongshi_a(A_cunchu_dange_jima_danshuang_dan[size]),
                    devote_streak, devote_all_record_dan[size][dcrai_dan[size] - 1].getThisIsReverse());
            }

            if (devote_streak >= b_yishuyiyingzhuanhuan && devote_all_record_dan[size][dcrai_dan[size] - 1].getDevoteRate() > 2) {
                if (devote_all_record_dan[size][dcrai_dan[size] - 1].getProfitOrLoss() == "亏"
                    && devote_all_record_dan[size][dcrai_dan[size] - 2].getProfitOrLoss() == "盈"
                    && (devote_all_record_dan[size][dcrai_dan[size] - 1].getThisCountEquationName() == "A_dayu_fusi"
                        || devote_all_record_dan[size][dcrai_dan[size] - 1].getThisCountEquationName() == "A_kui_niuzhuan")) {
                    devote_streak = 0;
                    shifouniuzhuang = true;
                    gongsi = jisuantouzhu_a("A_kui_niuzhuan", devote_streak, shifouniuzhuang);
                }
            }

            dr = new DevoteResult();
            dr.setDevoteType("单")
            dr.setDevoteMoney(gongsi * beilv);

            cr.setThisDevote(dr);//当前投注
            cr.setLastDevote(devote_all_record_dan[size][dcrai_dan[size] - 1].getThisDevote());//上一次投注
            cr.setLastWhetherDevote(devote_all_record_dan[size][dcrai_dan[size] - 1].getThisWhetherDevote());//上次是否投注
            cr.setThisWhetherDevote(true);//本次是否投注
            cr.setDevoteRate(gongsi);//投注倍率
            cr.setLastDevoteRate(devote_all_record_dan[size][dcrai_dan[size] - 1].getDevoteRate());
            cr.setThisDevoteStreak(parseInt(devote_all_record_dan[size][dcrai_dan[size] - 1].getThisDevoteStreak()) + 1);//本次投注次数
            cr.setThisCountEquation(devote_streak);//本次计算公式
            cr.setWinningStreakNumber(parseInt(devote_all_record_dan[size][dcrai_dan[size] - 1].getWinningStreakNumber()) + 1);//本次连胜次数
            cr.setThisWinningNumber(parseInt(devote_all_record_dan[size][dcrai_dan[size] - 1].getThisWinningNumber()) + 1);//本次第几次盈利
            cr.setLosingStreaknumber(0);//连败修改为0
            cr.setProfitOrLoss("盈");//设置上次为
            cr.setThisIsReverse(shifouniuzhuang);
            if (!devote_all_record_dan[size][dcrai_dan[size] - 1].getThisWhetherDevote()) {
                cr.setThisCountEquationName(getJisuangongshi_a(A_cunchu_dange_jima_danshuang_dan[size]));
            } else {
                if (devote_all_record_dan[size][dcrai_dan[size] - 1].getDevoteRate() == 1
                    && devote_all_record_dan[size][dcrai_dan[size] - 1].getProfitOrLoss() == "亏") {
                    cr.setThisCountEquationName(getJisuangongshi_a(A_cunchu_dange_jima_danshuang_dan[size]));
                } else {
                    cr.setThisCountEquationName(devote_all_record_dan[size][dcrai_dan[size] - 1].getThisCountEquationName());
                }
            }
            if (devote_streak >= b_yishuyiyingzhuanhuan && devote_all_record_dan[size][dcrai_dan[size] - 1].getDevoteRate() > 2) {
                if (devote_all_record_dan[size][dcrai_dan[size] - 1].getProfitOrLoss() == "亏"
                    && devote_all_record_dan[size][dcrai_dan[size] - 2].getProfitOrLoss() == "盈"
                    && (devote_all_record_dan[size][dcrai_dan[size] - 1].getThisCountEquationName() == "A_dayu_fusi"
                        || devote_all_record_dan[size][dcrai_dan[size] - 1].getThisCountEquationName() == "A_kui_niuzhuan")) {
                    cr.setThisCountEquationName("A_kui_niuzhuan");
                }
            }

            devote_all_record_dan[size][dcrai_dan[size]] = cr;
            dcrai_dan[size]++;
            devoteMoney = gongsi * beilv;
        } else {
            dr = new DevoteResult();
            cr = new CountResult();
            cr.setThisLosingNumberAll(parseInt(devote_all_record_dan[size][dcrai_dan[size] - 1].getThisLosingNumberAll()) + 1);
            if (devote_all_record_dan[size][dcrai_dan[size] - 1].getLosingStreakNumber() < 1) {
                var devote_streak = parseInt(devote_all_record_dan[size][dcrai_dan[size] - 1].getThisCountEquation()) - 1;//投注次数

                if (parseInt(devote_all_record_dan[size][dcrai_dan[size] - 1].getDevoteRate()) === 2 && devote_streak < 4) {
                    devote_streak = 0;
                }

                var shifouniuzhuang = false;
                if (parseInt(devote_all_record_dan[size][dcrai_dan[size] - 1].getDevoteRate()) === 3
                    && parseInt(devote_all_record_dan[size][dcrai_dan[size] - 2].getDevoteRate()) != 3) {

                    if (devote_all_record_dan[size][dcrai_dan[size] - 1].getThisCountEquationName() === "A_dayu_fusi" ||
                        devote_all_record_dan[size][dcrai_dan[size] - 1].getThisCountEquationName() === "A_kui_niuzhuan") {
                        devote_streak = 0;
                        shifouniuzhuang = true;
                        cr.setThisIsReverse(true);
                    }
                } else if (devote_all_record_dan[size][dcrai_dan[size] - 1].getThisIsReverse()) {
                    shifouniuzhuang = true;
                    cr.setThisIsReverse(true);
                } else {
                    cr.setThisIsReverse(false);
                }

                if (devote_streak < 0) {
                    devote_streak = 0;
                }

                if (devote_all_record_dan[size][dcrai_dan[size] - 1].getThisCountEquationName() != "A_dayu_fusi" &&
                    devote_all_record_dan[size][dcrai_dan[size] - 1].getThisCountEquationName() != "A_kui_niuzhuan") {
                    if (A_cunchu_dange_jima_danshuang_dan[size] < -3) {
                        devote_streak = 0;
                    } else {
                        if (devote_streak > 3) {
                            if (parseInt(devote_all_record_dan[size][dcrai_dan[size] - 1].getDevoteRate())
                                > parseInt(devote_all_record_dan[size][dcrai_dan[size] - 2].getDevoteRate())) {
                                devote_streak = parseInt(devote_all_record_dan[size][dcrai_dan[size] - 1].getThisCountEquation()) - 1;
                            } else {
                                devote_streak = parseInt(devote_all_record_dan[size][dcrai_dan[size] - 1].getThisCountEquation());
                            }
                        }
                    }
                }

                if (A_cunchu_suoyou_jima_danshuang_dan.length > 2) {
                    if (devote_all_record_dan[size][dcrai_dan[size] - 1].getThisCountEquationName() != "A_dayu_fusi" &&
                        devote_all_record_dan[size][dcrai_dan[size] - 1].getThisCountEquationName() != "A_kui_niuzhuan") {
                        if (!A_shifoutongyigongshi(A_cunchu_suoyou_jima_danshuang_dan[A_cunchu_suoyou_jima_danshuang_dan.length - 2][size], A_cunchu_dange_jima_danshuang_dan[size])) {
                            devote_streak = 0;
                            shifouniuzhuang = false;
                        }
                    }
                }

                if (devote_all_record_dan[size][dcrai_dan[size] - 1].getThisCountEquationName() != "A_dayu_fusi" &&
                    devote_all_record_dan[size][dcrai_dan[size] - 1].getThisCountEquationName() != "A_kui_niuzhuan") {
                    gongsi = jisuantouzhu_a(A_cunchu_dange_jima_danshuang_dan[size], devote_streak, shifouniuzhuang);
                } else {
                    gongsi = jisuantouzhu_a(devote_all_record_dan[size][dcrai_dan[size] - 1].getThisCountEquationName(), devote_streak, shifouniuzhuang);
                }

                if (devote_streak + 1 > 4
                    && (devote_all_record_dan[size][dcrai_dan[size] - 1].getThisCountEquationName() === "A_dayu_fusi"
                        || devote_all_record_dan[size][dcrai_dan[size] - 1].getThisCountEquationName() === "A_kui_niuzhuan")) {
                    /*shifouniuzhuang = true;
                    devote_streak = 0;*/
                    gongsi = jisuantouzhu_a(devote_all_record_dan[size][dcrai_dan[size] - 1].getThisCountEquationName(), devote_streak, shifouniuzhuang);
                }
                if (devote_streak + 1 > 3
                    && devote_all_record_dan[size][dcrai_dan[size] - 1].getThisCountEquationName() != "A_dayu_fusi"
                    && devote_all_record_dan[size][dcrai_dan[size] - 1].getThisCountEquationName() != "A_kui_niuzhuan") {
                    devote_streak = 0;
                    gongsi = jisuantouzhu_a(getJisuangongshi_a(A_cunchu_dange_jima_danshuang_dan[size]), devote_streak);
                }

                dr.setDevoteType("单")
                dr.setDevoteMoney(gongsi * beilv);

                cr.setThisDevote(dr);//当前投注
                cr.setLastDevote(devote_all_record_dan[size][dcrai_dan[size] - 1].getThisDevote());//上一次投注
                cr.setLastWhetherDevote(devote_all_record_dan[size][dcrai_dan[size] - 1].getThisWhetherDevote());//上次是否投注
                cr.setThisWhetherDevote(true);//本次是否投注
                cr.setDevoteRate(gongsi);//投注倍率
                cr.setLastDevoteRate(devote_all_record_dan[size][dcrai_dan[size] - 1].getDevoteRate());
                cr.setThisDevoteStreak(parseInt(devote_all_record_dan[size][dcrai_dan[size] - 1].getThisDevoteStreak()) + 1);//本次投注次数
                cr.setThisCountEquation(devote_streak);//本次计算公式
                cr.setLosingStreaknumber(parseInt(devote_all_record_dan[size][dcrai_dan[size] - 1].getLosingStreakNumber()) + 1);//本次连败次数
                cr.setThisLosingNumber(parseInt(devote_all_record_dan[size][dcrai_dan[size] - 1].getThisLosningNumber()) + 1);//本次第几次亏损
                cr.setWinningStreakNumber(0);//连胜修改为0
                cr.setProfitOrLoss("亏");//设置本次未亏
                if (shifouniuzhuang && devote_all_record_dan[size][dcrai_dan[size] - 1].getThisCountEquationName() === "A_dayu_fusi") {
                    cr.setThisCountEquationName("A_kui_niuzhuan");
                } else if (devote_all_record_dan[size][dcrai_dan[size] - 1].getThisCountEquationName() === "A_kui_niuzhuan") {
                    cr.setThisCountEquationName("A_kui_niuzhuan");
                } else {
                    cr.setThisCountEquationName(getJisuangongshi_a(A_cunchu_dange_jima_danshuang_dan[size], shifouniuzhuang));
                }
                devote_all_record_dan[size][dcrai_dan[size]] = cr;
                dcrai_dan[size]++;
                devoteMoney = gongsi * beilv;
            } else {
                cr = new CountResult();
                cr.setLastDevote(devote_all_record_dan[size][dcrai_dan[size] - 1].getThisDevote());//上一次投注
                cr.setLastWhetherDevote(devote_all_record_dan[size][dcrai_dan[size] - 1].getThisWhetherDevote());//上次是否投注
                cr.setThisWhetherDevote(false);//本次是否投注
                cr.setDevoteRate(0);//投注倍率
                cr.setLastDevoteRate(devote_all_record_dan[size][dcrai_dan[size] - 1].getDevoteRate());
                cr.setThisDevoteStreak(parseInt(devote_all_record_dan[size][dcrai_dan[size] - 1].getThisDevoteStreak()) + 1);//本次投注次数
                cr.setThisCountEquation(devote_streak);//本次计算公式
                cr.setLosingStreaknumber(parseInt(devote_all_record_dan[size][dcrai_dan[size] - 1].getLosingStreakNumber()));//本次连败次数
                cr.setThisLosingNumber(parseInt(devote_all_record_dan[size][dcrai_dan[size] - 1].getThisLosningNumber()));//本次第几次亏损
                cr.setWinningStreakNumber(0);//连胜修改为0
                cr.setProfitOrLoss("亏");//设置本次未亏
                cr.setThisCountEquationName(getJisuangongshi_a(A_cunchu_dange_jima_danshuang_dan[size]));
                devote_all_record_dan[size][dcrai_dan[size]] = cr;
                dcrai_dan[size]++;
                devoteMoney = 0;

                devote_all_record_dan[size][dcrai_dan[size] - 1].setThisCountEquation(-1);
                devote_all_record_dan[size][dcrai_dan[size] - 1].setThisIsReverse(false);
            }
        }
    }
    return devoteMoney;
}

var shifoutouzhuguo_shuang = [false, false, false, false, false, false, false, false, false, false];

/**
 * 计算投注双
 * @param input 当前输入的数值
 * @param beilv 当前投注倍率
 * @returns {number}
 * @constructor
 */
function A_DevoteCount_shuang(input, beilv, size) {
    var devoteMoney = 0;
    if (is_null(devote_all_record_shuang[size])) {
        devote_all_record_shuang[size] = new Array();
        shifoutouzhuguo_shuang[size] = false;
    } else if (devote_all_record_shuang[size].length == 0) {
        shifoutouzhuguo_shuang[size] = false;
    } else {
        shifoutouzhuguo_shuang[size] = true;
    }
    if (!shifoutouzhuguo_shuang[size]) {//从未投注

        if (!dos(input)) {//第一次出现双开始投注，否则不投注
            shifoutouzhuguo_shuang[size] = true;
            var gongsi = jisuantouzhu_a(0, 0, false);
            dr = new DevoteResult();
            dr.setDevoteType("双")
            dr.setDevoteMoney(gongsi * beilv);
            cr = new CountResult();
            cr.setThisDevote(dr);
            cr.setThisWhetherDevote(true);
            cr.setDevoteRate(gongsi);
            cr.setThisDevoteStreak(0);
            cr.setThisCountEquation(0);
            cr.setLastDevoteRate(0);
            cr.setThisCountEquationName("A_dayu_fusi");
            devote_all_record_shuang[size][parseInt(dcrai_shuang[size])] = cr;
            dcrai_shuang[size]++;
            devoteMoney = gongsi * beilv;
        }
    } else {
        shifoutouzhuguo_shuang[size] = true;
        if (!dos(input)) {//盈
            var shifouniuzhuang = devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisIsReverse();
            cr = new CountResult();
            cr.setThisLosingNumberAll(parseInt(devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisLosingNumberAll()));
            if (dos(cunchusuoyou[qishu - 1][size])
                && parseInt(devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisLosningNumber()) > 1) {//如果上一期出的结果不为双，不进行投注
                return 0;
            }

            var devote_streak = parseInt(devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisCountEquation()) + 1;//投注次数

            var gongsi = jisuantouzhu_a(devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisCountEquationName(),
                devote_streak, devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisIsReverse());

            if (!devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisWhetherDevote()) {
                gongsi = jisuantouzhu_a(getJisuangongshi_a(A_cunchu_dange_jima_danshuang_shuang[size]),
                    devote_streak, devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisIsReverse());
            }

            if (devote_streak >= b_yishuyiyingzhuanhuan && devote_all_record_shuang[size][dcrai_shuang[size] - 1].getDevoteRate() > 2) {
                if (devote_all_record_shuang[size][dcrai_shuang[size] - 1].getProfitOrLoss() == "亏"
                    && devote_all_record_shuang[size][dcrai_shuang[size] - 2].getProfitOrLoss() == "盈"
                    && (devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisCountEquationName() == "A_dayu_fusi"
                        || devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisCountEquationName() == "A_kui_niuzhuan")) {
                    devote_streak = 0;
                    shifouniuzhuang = true;
                    gongsi = jisuantouzhu_a("A_kui_niuzhuan", devote_streak, shifouniuzhuang);
                }
            }
            dr = new DevoteResult();
            dr.setDevoteType("双")
            dr.setDevoteMoney(gongsi * beilv);

            cr.setThisDevote(dr);//当前投注
            cr.setLastDevote(devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisDevote());//上一次投注
            cr.setLastWhetherDevote(devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisWhetherDevote());//上次是否投注
            cr.setThisWhetherDevote(true);//本次是否投注
            cr.setDevoteRate(gongsi);//投注倍率
            cr.setLastDevoteRate(devote_all_record_shuang[size][dcrai_shuang[size] - 1].getDevoteRate());
            cr.setThisDevoteStreak(parseInt(devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisDevoteStreak()) + 1);//本次投注次数
            cr.setThisCountEquation(devote_streak);//单前计算公式（指的时公式第几个）
            cr.setWinningStreakNumber(parseInt(devote_all_record_shuang[size][dcrai_shuang[size] - 1].getWinningStreakNumber()) + 1);//本次连胜次数
            cr.setThisWinningNumber(parseInt(devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisWinningNumber()) + 1);//本次第几次盈利
            cr.setLosingStreaknumber(0);//连败修改为0
            cr.setProfitOrLoss("盈");//设置上次为盈利
            cr.setThisIsReverse(shifouniuzhuang);
            if (!devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisWhetherDevote()) {
                cr.setThisCountEquationName(getJisuangongshi_a(A_cunchu_dange_jima_danshuang_shuang[size]));
            } else {
                if (devote_all_record_shuang[size][dcrai_shuang[size] - 1].getDevoteRate() == 1
                    && devote_all_record_shuang[size][dcrai_shuang[size] - 1].getProfitOrLoss() == "亏") {
                    cr.setThisCountEquationName(getJisuangongshi_a(A_cunchu_dange_jima_danshuang_shuang[size]));
                } else {
                    cr.setThisCountEquationName(devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisCountEquationName());
                }
            }
            if (devote_streak >= b_yishuyiyingzhuanhuan && devote_all_record_shuang[size][dcrai_shuang[size] - 1].getDevoteRate() > 2) {
                if (devote_all_record_shuang[size][dcrai_shuang[size] - 1].getProfitOrLoss() == "亏"
                    && devote_all_record_shuang[size][dcrai_shuang[size] - 2].getProfitOrLoss() == "盈"
                    && (devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisCountEquationName() == "A_dayu_fusi"
                        || devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisCountEquationName() == "A_kui_niuzhuan")) {
                    cr.setThisCountEquationName("A_kui_niuzhuan");
                }
            }
            devote_all_record_shuang[size][dcrai_shuang[size]] = cr;
            dcrai_shuang[size]++;
            devoteMoney = gongsi * beilv;
        } else {
            cr = new CountResult();
            cr.setThisLosingNumberAll(parseInt(devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisLosingNumberAll() + 1));
            if (devote_all_record_shuang[size][dcrai_shuang[size] - 1].getLosingStreakNumber() < 1) {


                var devote_streak = parseInt(devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisCountEquation()) - 1;//投注次数

                if (parseInt(devote_all_record_shuang[size][dcrai_shuang[size] - 1].getDevoteRate()) === 2 && devote_streak < 4) {
                    devote_streak = 0;
                }

                var shifouniuzhuang = false;
                if (parseInt(devote_all_record_shuang[size][dcrai_shuang[size] - 1].getDevoteRate()) === 3
                    && parseInt(devote_all_record_shuang[size][dcrai_shuang[size] - 2].getDevoteRate()) != 3) {

                    if (devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisCountEquationName() === "A_dayu_fusi" ||
                        devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisCountEquationName() === "A_kui_niuzhuan") {
                        devote_streak = 0;
                        shifouniuzhuang = true;
                        cr.setThisIsReverse(true);
                    }
                } else if (devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisIsReverse()) {
                    shifouniuzhuang = true;
                    cr.setThisIsReverse(true);
                } else {
                    cr.setThisIsReverse(false);
                }

                if (devote_streak < 0) {
                    devote_streak = 0;
                }

                if (devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisCountEquationName() != "A_dayu_fusi" &&
                    devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisCountEquationName() != "A_kui_niuzhuan") {
                    if (A_cunchu_dange_jima_danshuang_shuang[size] < -3) {
                        devote_streak = 0;
                    } else {
                        if (devote_streak > 3) {
                            if (parseInt(devote_all_record_shuang[size][dcrai_shuang[size] - 1].getDevoteRate())
                                > parseInt(devote_all_record_shuang[size][dcrai_shuang[size] - 2].getDevoteRate())) {
                                devote_streak = parseInt(devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisCountEquation()) - 1;
                            } else {
                                devote_streak = parseInt(devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisCountEquation());
                            }
                        }
                    }
                }

                if (A_cunchu_suoyou_jima_danshuang_shuang.length > 2) {
                    if (devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisCountEquationName() != "A_dayu_fusi" &&
                        devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisCountEquationName() != "A_kui_niuzhuan") {
                        if (!A_shifoutongyigongshi(A_cunchu_suoyou_jima_danshuang_shuang[A_cunchu_suoyou_jima_danshuang_shuang.length - 2][size], A_cunchu_dange_jima_danshuang_shuang[size])) {
                            devote_streak = 0;
                            shifouniuzhuang = false;
                        }
                    }
                }

                if (devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisCountEquationName() != "A_dayu_fusi" &&
                    devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisCountEquationName() != "A_kui_niuzhuan") {
                    gongsi = jisuantouzhu_a(A_cunchu_dange_jima_danshuang_shuang[size], devote_streak, shifouniuzhuang);
                } else {
                    gongsi = jisuantouzhu_a(devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisCountEquationName(), devote_streak, shifouniuzhuang);
                }

                if (devote_streak + 1 > 4
                    && (devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisCountEquationName() === "A_dayu_fusi"
                        || devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisCountEquationName() === "A_kui_niuzhuan")) {
                    /*shifouniuzhuang = true;
                    devote_streak = 0;*/
                    gongsi = jisuantouzhu_a(devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisCountEquationName(), devote_streak, shifouniuzhuang);
                }

                if (devote_streak + 1 > 3
                    && devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisCountEquationName() != "A_dayu_fusi"
                    && devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisCountEquationName() != "A_kui_niuzhuan") {
                    devote_streak = 0;
                    gongsi = jisuantouzhu_a(getJisuangongshi_a(A_cunchu_dange_jima_danshuang_shuang[size]), devote_streak);
                }

                dr = new DevoteResult();
                dr.setDevoteType("双")
                dr.setDevoteMoney(gongsi * beilv);

                cr.setThisDevote(dr);//当前投注
                cr.setLastDevote(devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisDevote());//上一次投注
                cr.setLastWhetherDevote(devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisWhetherDevote());//上次是否投注
                cr.setThisWhetherDevote(true);//本次是否投注
                cr.setDevoteRate(gongsi);//投注倍率
                cr.setLastDevoteRate(devote_all_record_shuang[size][dcrai_shuang[size] - 1].getDevoteRate());
                cr.setThisDevoteStreak(parseInt(devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisDevoteStreak()) + 1);//本次投注次数
                cr.setThisCountEquation(devote_streak);//单前计算公式（指的时公式第几个）
                cr.setLosingStreaknumber(parseInt(devote_all_record_shuang[size][dcrai_shuang[size] - 1].getLosingStreakNumber()) + 1);//本次连败次数
                cr.setThisLosingNumber(parseInt(devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisLosningNumber()) + 1);//本次第几次亏损
                cr.setWinningStreakNumber(0);//连胜修改为0
                cr.setProfitOrLoss("亏");//设置本次未亏
                if (shifouniuzhuang && devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisCountEquationName() === "A_dayu_fusi") {
                    cr.setThisCountEquationName("A_kui_niuzhuan");
                } else if (devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisCountEquationName() === "A_kui_niuzhuan") {
                    cr.setThisCountEquationName("A_kui_niuzhuan");
                } else {
                    cr.setThisCountEquationName(getJisuangongshi_a(A_cunchu_dange_jima_danshuang_shuang[size], shifouniuzhuang));
                }
                devote_all_record_shuang[size][dcrai_shuang[size]] = cr;
                dcrai_shuang[size]++;
                devoteMoney = gongsi * beilv;
            } else {

                cr = new CountResult();
                cr.setLastDevote(devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisDevote());//上一次投注
                cr.setLastWhetherDevote(devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisWhetherDevote());//上次是否投注
                cr.setThisWhetherDevote(false);//本次是否投注
                cr.setDevoteRate(0);//投注倍率
                cr.setLastDevoteRate(devote_all_record_shuang[size][dcrai_shuang[size] - 1].getDevoteRate());
                cr.setThisDevoteStreak(parseInt(devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisDevoteStreak()) + 1);//本次投注次数
                cr.setThisCountEquation(devote_streak);//本次计算公式
                cr.setLosingStreaknumber(parseInt(devote_all_record_shuang[size][dcrai_shuang[size] - 1].getLosingStreakNumber()));//本次连败次数
                cr.setThisLosingNumber(parseInt(devote_all_record_shuang[size][dcrai_shuang[size] - 1].getThisLosningNumber()));//本次第几次亏损
                cr.setWinningStreakNumber(0);//连胜修改为0
                cr.setProfitOrLoss("亏");//设置本次未亏
                cr.setThisCountEquationName(getJisuangongshi_a(A_cunchu_dange_jima_danshuang_shuang[size]));

                devote_all_record_shuang[size][dcrai_shuang[size]] = cr;
                dcrai_shuang[size]++;
                devoteMoney = 0;

                devote_all_record_shuang[size][dcrai_shuang[size] - 1].setThisCountEquation(-1);
                devote_all_record_shuang[size][dcrai_shuang[size] - 1].setThisIsReverse(false);
            }
        }
    }
    return devoteMoney;
}

/**
 * 双向投注计算展示最终投注金额
 * @param beilv 投注倍率
 */
function A_count_danshuang_devote(input, beilv, size) {
    dr = new DevoteResult();

    var dan = A_DevoteCount_dan(input, beilv, size);
    var shuang = A_DevoteCount_shuang(input, beilv, size);

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
    return dr;
}

function A_devote_danshuang_view() {
    var beilv = getById("danshuang_beilv").value;
    if (is_null(beilv)) {
        alert("单双倍率不能为空");
        danshuang_queren = false;
        return;
    }

    A_dangqian_qishu_danshuang++;
    var A_cunchu_dange_jima_danshuang_s_dan = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];//存储单个基码
    var A_cunchu_dange_jima_danshuang_s_shuang = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];//存储单个基码

    for (var i = 0; i < input_num_index + 1; i++) {
        if (!shifoutouzhuguo_shuang[i] && !shifoutouzhuguo_dan[i]) {//从未投注
            A_cunchu_dange_jima_danshuang_dan[i] = 0;
            A_cunchu_dange_jima_danshuang_shuang[i] = 0;
            A_cunchu_dange_jima_danshuang_s_dan[i] += A_cunchu_dange_jima_danshuang_dan[i];
            A_cunchu_dange_jima_danshuang_s_shuang[i] += A_cunchu_dange_jima_danshuang_shuang[i];
        } else {
            if (!shifoutouzhuguo_dan[i]) {
                A_cunchu_dange_jima_danshuang_shuang[i] += parseInt(jisuanjima_dos_a(devote_all_record_shuang[i][devote_all_record_shuang[i].length - 1],
                    parseInt(input_num_name_array[i].innerHTML), "双"));
                A_cunchu_dange_jima_danshuang_s_shuang[i] += A_cunchu_dange_jima_danshuang_shuang[i];
            } else if (!shifoutouzhuguo_shuang[i]) {
                A_cunchu_dange_jima_danshuang_dan[i] += parseInt(jisuanjima_dos_a(devote_all_record_dan[i][devote_all_record_dan[i].length - 1],
                    parseInt(input_num_name_array[i].innerHTML), "单"));
                A_cunchu_dange_jima_danshuang_s_dan[i] += A_cunchu_dange_jima_danshuang_dan[i];
            } else {
                A_cunchu_dange_jima_danshuang_shuang[i] += parseInt(jisuanjima_dos_a(devote_all_record_shuang[i][devote_all_record_shuang[i].length - 1],
                    parseInt(input_num_name_array[i].innerHTML), "双"));
                A_cunchu_dange_jima_danshuang_s_shuang[i] += A_cunchu_dange_jima_danshuang_shuang[i];

                A_cunchu_dange_jima_danshuang_dan[i] += parseInt(jisuanjima_dos_a(devote_all_record_dan[i][devote_all_record_dan[i].length - 1],
                    parseInt(input_num_name_array[i].innerHTML), "单"));
                A_cunchu_dange_jima_danshuang_s_dan[i] += A_cunchu_dange_jima_danshuang_dan[i];

            }
        }
    }

    A_cunchu_suoyou_jima_danshuang_dan[A_dangqian_qishu_danshuang] = A_cunchu_dange_jima_danshuang_s_dan;
    A_cunchu_suoyou_jima_danshuang_shuang[A_dangqian_qishu_danshuang] = A_cunchu_dange_jima_danshuang_shuang;
    printArray(A_cunchu_suoyou_jima_danshuang_dan);
    printArray(A_cunchu_suoyou_jima_danshuang_shuang);

    if (dancitouzhujieguo_danshuang.length != 0) {
        A_jisuan_yingkui_danshuang_jieguo();
    }

    var dancitouzhujieguo_danshuang_s = new Array();
    for (var j = 0; j < input_num_index + 1; j++) {

        dr = new DevoteResult();
        dr = A_count_danshuang_devote(input_num_name_array[j].innerHTML, beilv, j);
        if (dr.getDevoteType() === "单") {
            danshuang_dan_view_array[j].innerHTML = dr.getDevoteMoney();
        } else {
            danshuang_shuang_view_array[j].innerHTML = dr.getDevoteMoney();
        }
        dancitouzhujieguo_danshuang[j] = dr;
        dancitouzhujieguo_danshuang_s[j] = dancitouzhujieguo_danshuang[j];
    }
    meiyicitouzhujieguo_danshuang[meiyicitouru_danshuang] = dancitouzhujieguo_danshuang_s;
    meiyicitouru_danshuang++;

}

/**
 * 计算亏盈并展示
 */
function A_jisuan_yingkui_danshuang_jieguo() {
    danshuang_yingkui_zhanshi_dan[danshuang_yingkui_zhanshi_dan.length - 1].innerHTML = "";
    danshuang_yingkui_zhanshi_shuang[danshuang_yingkui_zhanshi_shuang.length - 1].innerHTML = "";
    for (var j = 0; j < input_num_index + 1; j++) {
        if (is_null(dancitouzhujieguo_danshuang[j])) {
            continue;
        }
        if ((!dos(input_num_name_array[j].innerHTML) && dancitouzhujieguo_danshuang[j].getDevoteType() == "双")
            || (dos(input_num_name_array[j].innerHTML) && dancitouzhujieguo_danshuang[j].getDevoteType() == "单")) {//同为双或者同为单（盈）
            //console.log("盈")
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
    jieyu_danshuang[A_dangqian_qishu_danshuang] = getById("danshuang_jieyu").value;
    var num_all = 0;
    for (var i = 0; i < danshuang_zhanshi.length - 1; i++) {
        num_all += is_null(danshuang_zhanshi[i].innerHTML) ? 0 : parseInt(danshuang_zhanshi[i].innerHTML);
    }
    danshuang_zhanshi[danshuang_zhanshi.length - 1].innerHTML = num_all;

}

//==================================================计算单双结束（面向对象）======================


//==================================================计算龙虎开始（面向对象）======================

var shifoutouzhuguo_long = [false, false, false, false, false, false, false, false, false, false];

/**
 * 计算投注龙
 * @param input 当前输入的数值
 * @param beilv 当前的倍率
 * @returns {number}
 * @constructor
 */
function A_DevoteCount_long(input, beilv, size) {
    var devoteMoney = 0;
    //console.log(devote_all_record_long[size]);
    if (is_null(devote_all_record_long[size])) {
        devote_all_record_long[size] = new Array();
        shifoutouzhuguo_long[size] = false;
    } else if (devote_all_record_long[size].length == 0) {
        shifoutouzhuguo_long[size] = false;
    } else {
        shifoutouzhuguo_long[size] = true;
    }
    if (!shifoutouzhuguo_long[size]) {//从未投注

        if (loh(input)) {//第一次出现龙开始投注，否则不投注
            shifoutouzhuguo_long[size] = true;
            var gongsi = jisuantouzhu_a(0, 0, false);
            dr = new DevoteResult();
            dr.setDevoteType("龙")
            dr.setDevoteMoney(gongsi * beilv);
            cr = new CountResult();
            cr.setThisDevote(dr);
            cr.setThisWhetherDevote(true);
            cr.setDevoteRate(gongsi);
            cr.setThisDevoteStreak(0);
            cr.setThisCountEquation(0)
            cr.setLastDevoteRate(0);
            cr.setThisCountEquationName("A_dayu_fusi");
            devote_all_record_long[size][dcrai_long[size]] = cr;
            dcrai_long[size]++;
            devoteMoney = gongsi * beilv;
        }
    } else {
        shifoutouzhuguo_long[size] = true;
        if (loh(input)) {//盈
            var shifouniuzhuang = devote_all_record_long[size][dcrai_long[size] - 1].getThisIsReverse();
            dr = new DevoteResult();
            cr = new CountResult();
            cr.setThisLosingNumberAll(parseInt(devote_all_record_long[size][dcrai_long[size] - 1].getThisLosingNumberAll()));
            if (!loh(cunchusuoyou[qishu - 1][size])
                && parseInt(devote_all_record_long[size][dcrai_long[size] - 1].getThisLosningNumber()) > 1) {//如果上一期出的结果不为龙，不进行投注
                return 0;
            }

            var devote_streak = parseInt(devote_all_record_long[size][dcrai_long[size] - 1].getThisCountEquation()) + 1;//投注次数

            var gongsi = jisuantouzhu_a(devote_all_record_long[size][dcrai_long[size] - 1].getThisCountEquationName(),
                devote_streak, devote_all_record_long[size][dcrai_long[size] - 1].getThisIsReverse());

            if (!devote_all_record_long[size][dcrai_long[size] - 1].getThisWhetherDevote()) {
                gongsi = jisuantouzhu_a(getJisuangongshi_a(A_cunchu_dange_jima_longhu_long[size]),
                    devote_streak, devote_all_record_long[size][dcrai_long[size] - 1].getThisIsReverse());
            }

            if (devote_streak >= b_yishuyiyingzhuanhuan && devote_all_record_long[size][dcrai_long[size] - 1].getDevoteRate() > 2) {
                if (devote_all_record_long[size][dcrai_long[size] - 1].getProfitOrLoss() == "亏"
                    && devote_all_record_long[size][dcrai_long[size] - 2].getProfitOrLoss() == "盈"
                    && (devote_all_record_long[size][dcrai_long[size] - 1].getThisCountEquationName() == "A_dayu_fusi"
                        || devote_all_record_long[size][dcrai_long[size] - 1].getThisCountEquationName() == "A_kui_niuzhuan")) {
                    devote_streak = 0;
                    shifouniuzhuang = true;
                    gongsi = jisuantouzhu_a("A_kui_niuzhuan", devote_streak, shifouniuzhuang);
                }
            }

            dr = new DevoteResult();
            dr.setDevoteType("龙")
            dr.setDevoteMoney(gongsi * beilv);

            cr.setThisDevote(dr);//当前投注
            cr.setLastDevote(devote_all_record_long[size][dcrai_long[size] - 1].getThisDevote());//上一次投注
            cr.setLastWhetherDevote(devote_all_record_long[size][dcrai_long[size] - 1].getThisWhetherDevote());//上次是否投注
            cr.setThisWhetherDevote(true);//本次是否投注
            cr.setDevoteRate(gongsi);//投注倍率
            cr.setLastDevoteRate(devote_all_record_long[size][dcrai_long[size] - 1].getDevoteRate());
            cr.setThisDevoteStreak(parseInt(devote_all_record_long[size][dcrai_long[size] - 1].getThisDevoteStreak()) + 1);//本次投注次数
            cr.setThisCountEquation(devote_streak);//本次计算公式
            cr.setWinningStreakNumber(parseInt(devote_all_record_long[size][dcrai_long[size] - 1].getWinningStreakNumber()) + 1);//本次连胜次数
            cr.setThisWinningNumber(parseInt(devote_all_record_long[size][dcrai_long[size] - 1].getThisWinningNumber()) + 1);//本次第几次盈利
            cr.setLosingStreaknumber(0);//连败修改为0
            cr.setProfitOrLoss("盈");//设置上次为
            cr.setThisIsReverse(shifouniuzhuang);

            if (!devote_all_record_long[size][dcrai_long[size] - 1].getThisWhetherDevote()) {
                cr.setThisCountEquationName(getJisuangongshi_a(A_cunchu_dange_jima_longhu_long[size]));
            } else {
                if (devote_all_record_long[size][dcrai_long[size] - 1].getDevoteRate() == 1
                    && devote_all_record_long[size][dcrai_long[size] - 1].getProfitOrLoss() == "亏") {
                    cr.setThisCountEquationName(getJisuangongshi_a(A_cunchu_dange_jima_longhu_long[size]));
                } else {
                    cr.setThisCountEquationName(devote_all_record_long[size][dcrai_long[size] - 1].getThisCountEquationName());
                }
            }
            if (devote_streak >= b_yishuyiyingzhuanhuan && devote_all_record_long[size][dcrai_long[size] - 1].getDevoteRate() > 2) {
                if (devote_all_record_long[size][dcrai_long[size] - 1].getProfitOrLoss() == "亏"
                    && devote_all_record_long[size][dcrai_long[size] - 2].getProfitOrLoss() == "盈"
                    && (devote_all_record_long[size][dcrai_long[size] - 1].getThisCountEquationName() == "A_dayu_fusi"
                        || devote_all_record_long[size][dcrai_long[size] - 1].getThisCountEquationName() == "A_kui_niuzhuan")) {
                    cr.setThisCountEquationName("A_kui_niuzhuan");
                }
            }

            devote_all_record_long[size][dcrai_long[size]] = cr;
            dcrai_long[size]++;
            devoteMoney = gongsi * beilv;
        } else {
            dr = new DevoteResult();
            cr = new CountResult();
            cr.setThisLosingNumberAll(parseInt(devote_all_record_long[size][dcrai_long[size] - 1].getThisLosingNumberAll()) + 1);
            if (devote_all_record_long[size][dcrai_long[size] - 1].getLosingStreakNumber() < 1) {
                var devote_streak = parseInt(devote_all_record_long[size][dcrai_long[size] - 1].getThisCountEquation()) - 1;//投注次数

                if (parseInt(devote_all_record_long[size][dcrai_long[size] - 1].getDevoteRate()) === 2 && devote_streak < 4) {
                    devote_streak = 0;
                }

                var shifouniuzhuang = false;
                if (parseInt(devote_all_record_long[size][dcrai_long[size] - 1].getDevoteRate()) === 3
                    && parseInt(devote_all_record_long[size][dcrai_long[size] - 2].getDevoteRate()) != 3) {

                    if (devote_all_record_long[size][dcrai_long[size] - 1].getThisCountEquationName() === "A_dayu_fusi" ||
                        devote_all_record_long[size][dcrai_long[size] - 1].getThisCountEquationName() === "A_kui_niuzhuan") {
                        devote_streak = 0;
                        shifouniuzhuang = true;
                        cr.setThisIsReverse(true);
                    }
                } else if (devote_all_record_long[size][dcrai_long[size] - 1].getThisIsReverse()) {
                    shifouniuzhuang = true;
                    cr.setThisIsReverse(true);
                } else {
                    cr.setThisIsReverse(false);
                }

                if (devote_streak < 0) {
                    devote_streak = 0;
                }

                if (devote_all_record_long[size][dcrai_long[size] - 1].getThisCountEquationName() != "A_dayu_fusi" &&
                    devote_all_record_long[size][dcrai_long[size] - 1].getThisCountEquationName() != "A_kui_niuzhuan") {
                    if (A_cunchu_dange_jima_longhu_long[size] < -3) {
                        devote_streak = 0;
                    } else {
                        if (devote_streak > 3) {
                            if (parseInt(devote_all_record_long[size][dcrai_long[size] - 1].getDevoteRate())
                                > parseInt(devote_all_record_long[size][dcrai_long[size] - 2].getDevoteRate())) {
                                devote_streak = parseInt(devote_all_record_long[size][dcrai_long[size] - 1].getThisCountEquation()) - 1;
                            } else {
                                devote_streak = parseInt(devote_all_record_long[size][dcrai_long[size] - 1].getThisCountEquation());
                            }
                        }
                    }
                }

                if (A_cunchu_suoyou_jima_longhu_long.length > 2) {
                    if (devote_all_record_long[size][dcrai_long[size] - 1].getThisCountEquationName() != "A_dayu_fusi" &&
                        devote_all_record_long[size][dcrai_long[size] - 1].getThisCountEquationName() != "A_kui_niuzhuan") {
                        if (!A_shifoutongyigongshi(A_cunchu_suoyou_jima_longhu_long[A_cunchu_suoyou_jima_longhu_long.length - 2][size], A_cunchu_dange_jima_longhu_long[size])) {
                            devote_streak = 0;
                            shifouniuzhuang = false;
                        }
                    }
                }

                if (devote_all_record_long[size][dcrai_long[size] - 1].getThisCountEquationName() != "A_dayu_fusi" &&
                    devote_all_record_long[size][dcrai_long[size] - 1].getThisCountEquationName() != "A_kui_niuzhuan") {
                    gongsi = jisuantouzhu_a(A_cunchu_dange_jima_longhu_long[size], devote_streak, shifouniuzhuang);
                } else {
                    gongsi = jisuantouzhu_a(devote_all_record_long[size][dcrai_long[size] - 1].getThisCountEquationName(), devote_streak, shifouniuzhuang);
                }

                if (devote_streak + 1 > 4
                    && (devote_all_record_long[size][dcrai_long[size] - 1].getThisCountEquationName() === "A_dayu_fusi"
                        || devote_all_record_long[size][dcrai_long[size] - 1].getThisCountEquationName() === "A_kui_niuzhuan")) {
                    /*shifouniuzhuang = true;
                    devote_streak = 0;*/
                    gongsi = jisuantouzhu_a(devote_all_record_long[size][dcrai_long[size] - 1].getThisCountEquationName(), devote_streak, shifouniuzhuang);
                }
                if (devote_streak + 1 > 3
                    && devote_all_record_long[size][dcrai_long[size] - 1].getThisCountEquationName() != "A_dayu_fusi"
                    && devote_all_record_long[size][dcrai_long[size] - 1].getThisCountEquationName() != "A_kui_niuzhuan") {
                    devote_streak = 0;
                    gongsi = jisuantouzhu_a(getJisuangongshi_a(A_cunchu_dange_jima_longhu_long[size]), devote_streak);
                }

                dr.setDevoteType("龙")
                dr.setDevoteMoney(gongsi * beilv);

                cr.setThisDevote(dr);//当前投注
                cr.setLastDevote(devote_all_record_long[size][dcrai_long[size] - 1].getThisDevote());//上一次投注
                cr.setLastWhetherDevote(devote_all_record_long[size][dcrai_long[size] - 1].getThisWhetherDevote());//上次是否投注
                cr.setThisWhetherDevote(true);//本次是否投注
                cr.setDevoteRate(gongsi);//投注倍率
                cr.setLastDevoteRate(devote_all_record_long[size][dcrai_long[size] - 1].getDevoteRate());
                cr.setThisDevoteStreak(parseInt(devote_all_record_long[size][dcrai_long[size] - 1].getThisDevoteStreak()) + 1);//本次投注次数
                cr.setThisCountEquation(devote_streak);//本次计算公式
                cr.setLosingStreaknumber(parseInt(devote_all_record_long[size][dcrai_long[size] - 1].getLosingStreakNumber()) + 1);//本次连败次数
                cr.setThisLosingNumber(parseInt(devote_all_record_long[size][dcrai_long[size] - 1].getThisLosningNumber()) + 1);//本次第几次亏损
                cr.setWinningStreakNumber(0);//连胜修改为0
                cr.setProfitOrLoss("亏");//设置本次未亏
                if (shifouniuzhuang && devote_all_record_long[size][dcrai_long[size] - 1].getThisCountEquationName() === "A_dayu_fusi") {
                    cr.setThisCountEquationName("A_kui_niuzhuan");
                } else if (devote_all_record_long[size][dcrai_long[size] - 1].getThisCountEquationName() === "A_kui_niuzhuan") {
                    cr.setThisCountEquationName("A_kui_niuzhuan");
                } else {
                    cr.setThisCountEquationName(getJisuangongshi_a(A_cunchu_dange_jima_longhu_long[size], shifouniuzhuang));
                }
                devote_all_record_long[size][dcrai_long[size]] = cr;
                dcrai_long[size]++;
                devoteMoney = gongsi * beilv;
            } else {
                cr = new CountResult();
                cr.setLastDevote(devote_all_record_long[size][dcrai_long[size] - 1].getThisDevote());//上一次投注
                cr.setLastWhetherDevote(devote_all_record_long[size][dcrai_long[size] - 1].getThisWhetherDevote());//上次是否投注
                cr.setThisWhetherDevote(false);//本次是否投注
                cr.setDevoteRate(0);//投注倍率
                cr.setLastDevoteRate(devote_all_record_long[size][dcrai_long[size] - 1].getDevoteRate());
                cr.setThisDevoteStreak(parseInt(devote_all_record_long[size][dcrai_long[size] - 1].getThisDevoteStreak()) + 1);//本次投注次数
                cr.setThisCountEquation(devote_streak);//本次计算公式
                cr.setLosingStreaknumber(parseInt(devote_all_record_long[size][dcrai_long[size] - 1].getLosingStreakNumber()));//本次连败次数
                cr.setThisLosingNumber(parseInt(devote_all_record_long[size][dcrai_long[size] - 1].getThisLosningNumber()));//本次第几次亏损
                cr.setWinningStreakNumber(0);//连胜修改为0
                cr.setProfitOrLoss("亏");//设置本次未亏
                cr.setThisCountEquationName(getJisuangongshi_a(A_cunchu_dange_jima_longhu_long[size]));
                devote_all_record_long[size][dcrai_long[size]] = cr;
                dcrai_long[size]++;
                devoteMoney = 0;

                devote_all_record_long[size][dcrai_long[size] - 1].setThisCountEquation(-1);
                devote_all_record_long[size][dcrai_long[size] - 1].setThisIsReverse(false);
            }
        }
    }
    return devoteMoney;
}

var shifoutouzhuguo_hu = [false, false, false, false, false, false, false, false, false, false];

/**
 * 计算投注虎
 * @param input 当前输入的数值
 * @param beilv 当前投注倍率
 * @returns {number}
 * @constructor
 */
function A_DevoteCount_hu(input, beilv, size) {
    var devoteMoney = 0;
    if (is_null(devote_all_record_hu[size])) {
        devote_all_record_hu[size] = new Array();
        shifoutouzhuguo_hu[size] = false;
    } else if (devote_all_record_hu[size].length == 0) {
        shifoutouzhuguo_hu[size] = false;
    } else {
        shifoutouzhuguo_hu[size] = true;
    }
    if (!shifoutouzhuguo_hu[size]) {//从未投注

        if (!loh(input)) {//第一次出现虎开始投注，否则不投注
            shifoutouzhuguo_hu[size] = true;
            var gongsi = jisuantouzhu_a(0, 0, false);
            dr = new DevoteResult();
            dr.setDevoteType("虎")
            dr.setDevoteMoney(gongsi * beilv);
            cr = new CountResult();
            cr.setThisDevote(dr);
            cr.setThisWhetherDevote(true);
            cr.setDevoteRate(gongsi);
            cr.setThisDevoteStreak(0);
            cr.setThisCountEquation(0);
            cr.setLastDevoteRate(0);
            cr.setThisCountEquationName("A_dayu_fusi");
            devote_all_record_hu[size][parseInt(dcrai_hu[size])] = cr;
            dcrai_hu[size]++;
            devoteMoney = gongsi * beilv;
        }
    } else {
        shifoutouzhuguo_hu[size] = true;
        if (!loh(input)) {//盈
            var shifouniuzhuang = devote_all_record_hu[size][dcrai_hu[size] - 1].getThisIsReverse();
            cr = new CountResult();
            cr.setThisLosingNumberAll(parseInt(devote_all_record_hu[size][dcrai_hu[size] - 1].getThisLosingNumberAll()));
            if (loh(cunchusuoyou[qishu - 1][size])
                && parseInt(devote_all_record_hu[size][dcrai_hu[size] - 1].getThisLosningNumber()) > 1) {//如果上一期出的结果不为虎，不进行投注
                return 0;
            }

            var devote_streak = parseInt(devote_all_record_hu[size][dcrai_hu[size] - 1].getThisCountEquation()) + 1;//投注次数

            var gongsi = jisuantouzhu_a(devote_all_record_hu[size][dcrai_hu[size] - 1].getThisCountEquationName(),
                devote_streak, devote_all_record_hu[size][dcrai_hu[size] - 1].getThisIsReverse());

            if (!devote_all_record_hu[size][dcrai_hu[size] - 1].getThisWhetherDevote()) {
                gongsi = jisuantouzhu_a(getJisuangongshi_a(A_cunchu_dange_jima_longhu_hu[size]),
                    devote_streak, devote_all_record_hu[size][dcrai_hu[size] - 1].getThisIsReverse());
            }

            if (devote_streak >= b_yishuyiyingzhuanhuan && devote_all_record_hu[size][dcrai_hu[size] - 1].getDevoteRate() > 2) {
                if (devote_all_record_hu[size][dcrai_hu[size] - 1].getProfitOrLoss() == "亏"
                    && devote_all_record_hu[size][dcrai_hu[size] - 2].getProfitOrLoss() == "盈"
                    && (devote_all_record_hu[size][dcrai_hu[size] - 1].getThisCountEquationName() == "A_dayu_fusi"
                        || devote_all_record_hu[size][dcrai_hu[size] - 1].getThisCountEquationName() == "A_kui_niuzhuan")) {
                    devote_streak = 0;
                    shifouniuzhuang = true;
                    gongsi = jisuantouzhu_a("A_kui_niuzhuan", devote_streak, shifouniuzhuang);
                }
            }

            dr = new DevoteResult();
            dr.setDevoteType("虎")
            dr.setDevoteMoney(gongsi * beilv);

            cr.setThisDevote(dr);//当前投注
            cr.setLastDevote(devote_all_record_hu[size][dcrai_hu[size] - 1].getThisDevote());//上一次投注
            cr.setLastWhetherDevote(devote_all_record_hu[size][dcrai_hu[size] - 1].getThisWhetherDevote());//上次是否投注
            cr.setThisWhetherDevote(true);//本次是否投注
            cr.setDevoteRate(gongsi);//投注倍率
            cr.setLastDevoteRate(devote_all_record_hu[size][dcrai_hu[size] - 1].getDevoteRate());
            cr.setThisDevoteStreak(parseInt(devote_all_record_hu[size][dcrai_hu[size] - 1].getThisDevoteStreak()) + 1);//本次投注次数
            cr.setThisCountEquation(devote_streak);//龙前计算公式（指的时公式第几个）
            cr.setWinningStreakNumber(parseInt(devote_all_record_hu[size][dcrai_hu[size] - 1].getWinningStreakNumber()) + 1);//本次连胜次数
            cr.setThisWinningNumber(parseInt(devote_all_record_hu[size][dcrai_hu[size] - 1].getThisWinningNumber()) + 1);//本次第几次盈利
            cr.setLosingStreaknumber(0);//连败修改为0
            cr.setProfitOrLoss("盈");//设置上次为盈利
            cr.setThisIsReverse(shifouniuzhuang);
            if (!devote_all_record_hu[size][dcrai_hu[size] - 1].getThisWhetherDevote()) {
                cr.setThisCountEquationName(getJisuangongshi_a(A_cunchu_dange_jima_longhu_hu[size]));
            } else {
                if (devote_all_record_hu[size][dcrai_hu[size] - 1].getDevoteRate() == 1
                    && devote_all_record_hu[size][dcrai_hu[size] - 1].getProfitOrLoss() == "亏") {
                    cr.setThisCountEquationName(getJisuangongshi_a(A_cunchu_dange_jima_longhu_hu[size]));
                } else {
                    cr.setThisCountEquationName(devote_all_record_hu[size][dcrai_hu[size] - 1].getThisCountEquationName());
                }
            }
            if (devote_streak >= b_yishuyiyingzhuanhuan && devote_all_record_hu[size][dcrai_hu[size] - 1].getDevoteRate() > 2) {
                if (devote_all_record_hu[size][dcrai_hu[size] - 1].getProfitOrLoss() == "亏"
                    && devote_all_record_hu[size][dcrai_hu[size] - 2].getProfitOrLoss() == "盈"
                    && (devote_all_record_hu[size][dcrai_hu[size] - 1].getThisCountEquationName() == "A_dayu_fusi"
                        || devote_all_record_hu[size][dcrai_hu[size] - 1].getThisCountEquationName() == "A_kui_niuzhuan")) {
                    cr.setThisCountEquationName(getJisuangongshi_a(A_cunchu_dange_jima_longhu_hu[size]));
                }
            }
            devote_all_record_hu[size][dcrai_hu[size]] = cr;
            dcrai_hu[size]++;
            devoteMoney = gongsi * beilv;
        } else {
            cr = new CountResult();
            cr.setThisLosingNumberAll(parseInt(devote_all_record_hu[size][dcrai_hu[size] - 1].getThisLosingNumberAll() + 1));
            if (devote_all_record_hu[size][dcrai_hu[size] - 1].getLosingStreakNumber() < 1) {


                var devote_streak = parseInt(devote_all_record_hu[size][dcrai_hu[size] - 1].getThisCountEquation()) - 1;//投注次数

                if (parseInt(devote_all_record_hu[size][dcrai_hu[size] - 1].getDevoteRate()) === 2 && devote_streak < 4) {
                    devote_streak = 0;
                }

                var shifouniuzhuang = false;
                if (parseInt(devote_all_record_hu[size][dcrai_hu[size] - 1].getDevoteRate()) === 3
                    && parseInt(devote_all_record_hu[size][dcrai_hu[size] - 2].getDevoteRate()) != 3) {

                    if (devote_all_record_hu[size][dcrai_hu[size] - 1].getThisCountEquationName() === "A_dayu_fusi" ||
                        devote_all_record_hu[size][dcrai_hu[size] - 1].getThisCountEquationName() === "A_kui_niuzhuan") {
                        devote_streak = 0;
                        shifouniuzhuang = true;
                        cr.setThisIsReverse(true);
                    }
                } else if (devote_all_record_hu[size][dcrai_hu[size] - 1].getThisIsReverse()) {
                    shifouniuzhuang = true;
                    cr.setThisIsReverse(true);
                } else {
                    cr.setThisIsReverse(false);
                }

                if (devote_streak < 0) {
                    devote_streak = 0;
                }

                if (devote_all_record_hu[size][dcrai_hu[size] - 1].getThisCountEquationName() != "A_dayu_fusi" &&
                    devote_all_record_hu[size][dcrai_hu[size] - 1].getThisCountEquationName() != "A_kui_niuzhuan") {
                    if (A_cunchu_dange_jima_longhu_hu[size] < -3) {
                        devote_streak = 0;
                    } else {
                        if (devote_streak > 3) {
                            if (parseInt(devote_all_record_hu[size][dcrai_hu[size] - 1].getDevoteRate())
                                > parseInt(devote_all_record_hu[size][dcrai_hu[size] - 2].getDevoteRate())) {
                                devote_streak = parseInt(devote_all_record_hu[size][dcrai_hu[size] - 1].getThisCountEquation()) - 1;
                            } else {
                                devote_streak = parseInt(devote_all_record_hu[size][dcrai_hu[size] - 1].getThisCountEquation());
                            }
                        }
                    }
                }

                if (A_cunchu_suoyou_jima_longhu_hu.length > 2) {
                    if (devote_all_record_hu[size][dcrai_hu[size] - 1].getThisCountEquationName() != "A_dayu_fusi" &&
                        devote_all_record_hu[size][dcrai_hu[size] - 1].getThisCountEquationName() != "A_kui_niuzhuan") {
                        if (!A_shifoutongyigongshi(A_cunchu_suoyou_jima_longhu_hu[A_cunchu_suoyou_jima_longhu_hu.length - 2][size], A_cunchu_dange_jima_longhu_hu[size])) {
                            devote_streak = 0;
                            shifouniuzhuang = false;
                        }
                    }
                }

                if (devote_all_record_hu[size][dcrai_hu[size] - 1].getThisCountEquationName() != "A_dayu_fusi" &&
                    devote_all_record_hu[size][dcrai_hu[size] - 1].getThisCountEquationName() != "A_kui_niuzhuan") {
                    gongsi = jisuantouzhu_a(A_cunchu_dange_jima_longhu_hu[size], devote_streak, shifouniuzhuang);
                } else {
                    gongsi = jisuantouzhu_a(devote_all_record_hu[size][devote_all_record_hu[size].length - 1].getThisCountEquationName(), devote_streak, shifouniuzhuang);
                }

                if (devote_streak + 1 > 4
                    && (devote_all_record_hu[size][dcrai_hu[size] - 1].getThisCountEquationName() === "A_dayu_fusi"
                        || devote_all_record_hu[size][dcrai_hu[size] - 1].getThisCountEquationName() === "A_kui_niuzhuan")) {
                    /*shifouniuzhuang = true;
                    devote_streak = 0;*/
                    gongsi = jisuantouzhu_a(devote_all_record_hu[size][dcrai_hu[size] - 1].getThisCountEquationName(), devote_streak, shifouniuzhuang);
                }
                if (devote_streak + 1 > 3
                    && devote_all_record_hu[size][dcrai_hu[size] - 1].getThisCountEquationName() != "A_dayu_fusi"
                    && devote_all_record_hu[size][dcrai_hu[size] - 1].getThisCountEquationName() != "A_kui_niuzhuan") {
                    devote_streak = 0;
                    gongsi = jisuantouzhu_a(getJisuangongshi_a(A_cunchu_dange_jima_longhu_hu[size]), devote_streak);
                }

                dr = new DevoteResult();
                dr.setDevoteType("虎")
                dr.setDevoteMoney(gongsi * beilv);

                cr.setThisDevote(dr);//当前投注
                cr.setLastDevote(devote_all_record_hu[size][dcrai_hu[size] - 1].getThisDevote());//上一次投注
                cr.setLastWhetherDevote(devote_all_record_hu[size][dcrai_hu[size] - 1].getThisWhetherDevote());//上次是否投注
                cr.setThisWhetherDevote(true);//本次是否投注
                cr.setDevoteRate(gongsi);//投注倍率
                cr.setLastDevoteRate(devote_all_record_hu[size][dcrai_hu[size] - 1].getDevoteRate());
                cr.setThisDevoteStreak(parseInt(devote_all_record_hu[size][dcrai_hu[size] - 1].getThisDevoteStreak()) + 1);//本次投注次数
                cr.setThisCountEquation(devote_streak);//龙前计算公式（指的时公式第几个）
                cr.setLosingStreaknumber(parseInt(devote_all_record_hu[size][dcrai_hu[size] - 1].getLosingStreakNumber()) + 1);//本次连败次数
                cr.setThisLosingNumber(parseInt(devote_all_record_hu[size][dcrai_hu[size] - 1].getThisLosningNumber()) + 1);//本次第几次亏损
                cr.setWinningStreakNumber(0);//连胜修改为0
                cr.setProfitOrLoss("亏");//设置本次未亏
                if (shifouniuzhuang && devote_all_record_hu[size][dcrai_hu[size] - 1].getThisCountEquationName() === "A_dayu_fusi") {
                    cr.setThisCountEquationName("A_kui_niuzhuan");
                } else if (devote_all_record_hu[size][dcrai_hu[size] - 1].getThisCountEquationName() === "A_kui_niuzhuan") {
                    cr.setThisCountEquationName("A_kui_niuzhuan");
                } else {
                    cr.setThisCountEquationName(getJisuangongshi_a(A_cunchu_dange_jima_longhu_hu[size], shifouniuzhuang));
                }
                devote_all_record_hu[size][dcrai_hu[size]] = cr;
                dcrai_hu[size]++;
                devoteMoney = gongsi * beilv;
            } else {

                cr = new CountResult();
                cr.setLastDevote(devote_all_record_hu[size][dcrai_hu[size] - 1].getThisDevote());//上一次投注
                cr.setLastWhetherDevote(devote_all_record_hu[size][dcrai_hu[size] - 1].getThisWhetherDevote());//上次是否投注
                cr.setThisWhetherDevote(false);//本次是否投注
                cr.setDevoteRate(0);//投注倍率
                cr.setLastDevoteRate(devote_all_record_hu[size][dcrai_hu[size] - 1].getDevoteRate());
                cr.setThisDevoteStreak(parseInt(devote_all_record_hu[size][dcrai_hu[size] - 1].getThisDevoteStreak()) + 1);//本次投注次数
                cr.setThisCountEquation(devote_streak);//本次计算公式
                cr.setLosingStreaknumber(parseInt(devote_all_record_hu[size][dcrai_hu[size] - 1].getLosingStreakNumber()));//本次连败次数
                cr.setThisLosingNumber(parseInt(devote_all_record_hu[size][dcrai_hu[size] - 1].getThisLosningNumber()));//本次第几次亏损
                cr.setWinningStreakNumber(0);//连胜修改为0
                cr.setProfitOrLoss("亏");//设置本次未亏
                cr.setThisCountEquationName(getJisuangongshi_a(A_cunchu_dange_jima_longhu_hu[size]));

                devote_all_record_hu[size][dcrai_hu[size]] = cr;
                dcrai_hu[size]++;
                devoteMoney = 0;

                devote_all_record_hu[size][dcrai_hu[size] - 1].setThisCountEquation(-1);
                devote_all_record_hu[size][dcrai_hu[size] - 1].setThisIsReverse(false);
            }
        }
    }
    return devoteMoney;
}

/**
 * 虎向投注计算展示最终投注金额
 * @param beilv 投注倍率
 */
function A_count_longhu_devote(input, beilv, size) {
    dr = new DevoteResult();

    var long = A_DevoteCount_long(input, beilv, size);
    var hu = A_DevoteCount_hu(input, beilv, size);

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
    return dr;
}

function A_devote_longhu_view() {
    var beilv = getById("longhu_beilv").value;
    if (is_null(beilv)) {
        alert("龙虎倍率不能为空");
        longhu_queren = false;
        return;
    }

    A_dangqian_qishu_longhu++;
    var A_cunchu_dange_jima_longhu_s_long = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];//存储龙个基码
    var A_cunchu_dange_jima_longhu_s_hu = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];//存储龙个基码

    for (var i = 0; i < input_num_index + 1; i++) {
        if (!shifoutouzhuguo_hu[i] && !shifoutouzhuguo_long[i]) {//从未投注
            A_cunchu_dange_jima_longhu_long[i] = 0;
            A_cunchu_dange_jima_longhu_hu[i] = 0;
            A_cunchu_dange_jima_longhu_s_long[i] += A_cunchu_dange_jima_longhu_long[i];
            A_cunchu_dange_jima_longhu_s_hu[i] += A_cunchu_dange_jima_longhu_hu[i];
        } else {
            if (!shifoutouzhuguo_long[i]) {
                A_cunchu_dange_jima_longhu_hu[i] += parseInt(jisuanjima_loh_a(0, devote_all_record_hu[i][devote_all_record_hu[i].length - 1],
                    parseInt(input_num_name_array[i].innerHTML), "虎"));
                A_cunchu_dange_jima_longhu_s_long[i] += A_cunchu_dange_jima_longhu_long[i];
            } else if (!shifoutouzhuguo_hu[i]) {
                A_cunchu_dange_jima_longhu_long[i] += parseInt(jisuanjima_loh_a(devote_all_record_long[i][devote_all_record_long[i].length - 1],
                    parseInt(input_num_name_array[i].innerHTML), "long"));
                A_cunchu_dange_jima_longhu_s_long[i] += A_cunchu_dange_jima_longhu_long[i];
            } else {
                A_cunchu_dange_jima_longhu_hu[i] += parseInt(jisuanjima_loh_a(0, devote_all_record_hu[i][devote_all_record_hu[i].length - 1],
                    parseInt(input_num_name_array[i].innerHTML), "虎"));
                A_cunchu_dange_jima_longhu_s_long[i] += A_cunchu_dange_jima_longhu_long[i];

                A_cunchu_dange_jima_longhu_long[i] += parseInt(jisuanjima_loh_a(devote_all_record_long[i][devote_all_record_long[i].length - 1],
                    parseInt(input_num_name_array[i].innerHTML), "long"));
                A_cunchu_dange_jima_longhu_s_long[i] += A_cunchu_dange_jima_longhu_long[i];

            }
        }
    }

    A_cunchu_suoyou_jima_longhu_long[A_dangqian_qishu_longhu] = A_cunchu_dange_jima_longhu_s_long;
    A_cunchu_suoyou_jima_longhu_hu[A_dangqian_qishu_longhu] = A_cunchu_dange_jima_longhu_s_hu;
    printArray(A_cunchu_suoyou_jima_longhu_long);
    printArray(A_cunchu_suoyou_jima_longhu_hu);

    if (dancitouzhujieguo_longhu.length != 0) {
        A_jisuan_yingkui_longhu_jieguo();
    }

    var dancitouzhujieguo_longhu_s = new Array();
    for (var j = 0; j < input_num_index + 1; j++) {

        dr = new DevoteResult();
        dr = A_count_longhu_devote(input_num_name_array[j].innerHTML, beilv, j);
        if (dr.getDevoteType() === "龙") {
            longhu_long_view_array[j].innerHTML = dr.getDevoteMoney();
        } else {
            longhu_hu_view_array[j].innerHTML = dr.getDevoteMoney();
        }
        dancitouzhujieguo_longhu[j] = dr;
        dancitouzhujieguo_longhu_s[j] = dancitouzhujieguo_longhu[j];
    }
    meiyicitouzhujieguo_longhu[meiyicitouru_longhu] = dancitouzhujieguo_longhu_s;
    meiyicitouru_longhu++;

}

/**
 * 计算亏盈并展示
 */
function A_jisuan_yingkui_longhu_jieguo() {
    longhu_yingkui_zhanshi_long[longhu_yingkui_zhanshi_long.length - 1].innerHTML = "";
    longhu_yingkui_zhanshi_hu[longhu_yingkui_zhanshi_hu.length - 1].innerHTML = "";
    for (var j = 0; j < input_num_index + 1; j++) {
        if (is_null(dancitouzhujieguo_longhu[j])) {
            continue;
        }
        if ((!loh(input_num_name_array[j].innerHTML) && dancitouzhujieguo_longhu[j].getDevoteType() == "虎")
            || (loh(input_num_name_array[j].innerHTML) && dancitouzhujieguo_longhu[j].getDevoteType() == "龙")) {//同为虎或者同为龙（盈）
            //console.log("盈")
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

    jieyu_longhu[A_dangqian_qishu_longhu] = getById("longhu_jieyu").value;
    var num_all = 0;
    for (var i = 0; i < longhu_zhanshi.length - 1; i++) {
        num_all += is_null(longhu_zhanshi[i].innerHTML) ? 0 : parseInt(longhu_zhanshi[i].innerHTML);
    }
    longhu_zhanshi[longhu_zhanshi.length - 1].innerHTML = num_all;

}

//==================================================计算龙虎结束（面向对象）======================


/**
 * 计算基码差
 * @param a CountResult
 * @param c inputNum
 * @param t 大小
 * @returns {number}
 */
function jisuanjima_a(a, c, t) {
    var a1 = 0;
    try {
        if (t === "大") {
            if (a != 0) {
                if (dox(c)) {
                    a1 = a.getDevoteRate();
                } else {
                    a1 = -(a.getDevoteRate());
                }
            }
        } else {
            if (a != 0) {
                if (!dox(c)) {
                    a1 = a.getDevoteRate();
                } else {
                    a1 = -(a.getDevoteRate());
                }
            }
        }
    } catch (e) {
        console.log(e)
    }


    return a1;
}

/**
 * 计算基码差（单双）
 * @param a CountResult
 * @param c inputnum
 * @param t 单或者双
 * @returns {number}
 */
function jisuanjima_dos_a(a, c, t) {
    var a1 = 0;
    try {
        if (t === "单") {
            if (a != 0) {
                if (dos(c)) {
                    a1 = a.getDevoteRate();
                } else {
                    a1 = -(a.getDevoteRate());
                }
            }
        } else {
            if (a != 0) {
                if (!dos(c)) {
                    a1 = a.getDevoteRate();
                } else {
                    a1 = -(a.getDevoteRate());
                }
            }
        }
    } catch (e) {
        console.log(e)
    }


    return a1;
}

/**
 * 计算基码差（龙虎）
 * @param a CountResult
 * @param c CountResult
 * @param t CountResult
 * @returns {number}
 */
function jisuanjima_loh_a(a, c, t) {
    var a1 = 0;
    try{
        if (t === "龙") {
            if (a != 0) {
                if (loh(c)) {
                    a1 = a.getDevoteRate();
                } else {
                    a1 = -(a.getDevoteRate());
                }
            }
        } else {
            if (a != 0) {
                if (!loh(c)) {
                    a1 = a.getDevoteRate();
                } else {
                    a1 = -(a.getDevoteRate());
                }
            }
        }
    }catch (e){
        console.log(e)
    }


    return a1;
}

/**
 * 计算投注结果
 * @param jima 决定公式
 * @param dangqiantouzhu 决定投注结果
 * @returns {number}
 */
function jisuantouzhu_a(jima, dangqiantouzhu, nz) {

    switch (jima) {
        case "A_kui_niuzhuan":
            return A_kui_niuzhuan[dangqiantouzhu];
        case "A_dayu_fusi":
            if (nz) {
                return A_kui_niuzhuan[dangqiantouzhu];
            }
            return A_dayu_fusi[dangqiantouzhu];
        case "A_xiaoyu_fusi":
            return A_xiaoyu_fusi[dangqiantouzhu];
        case "A_xiaoyu_fuba":
            return A_xiaoyu_fuba[dangqiantouzhu];
        case "A_xiaoyu_fushisan":
            return A_xiaoyu_fushisan[dangqiantouzhu];
        case "A_xiaoyu_fushiba":
            return A_xiaoyu_fushiba[dangqiantouzhu];
    }

    if (jima > -4) {
        if (nz) {
            return A_kui_niuzhuan[dangqiantouzhu];
        }
        return A_dayu_fusi[dangqiantouzhu];
    } else if (jima > -8) {
        return A_xiaoyu_fusi[dangqiantouzhu];
    } else if (jima > -13) {
        return A_xiaoyu_fuba[dangqiantouzhu];
    } else if (jima > -18) {
        return A_xiaoyu_fushisan[dangqiantouzhu];
    } else {
        return A_xiaoyu_fushiba[dangqiantouzhu];
    }

    return 0;
}

/**
 * 查询公式
 */
function getJisuangongshi_a(jima, nz) {
    if (jima > -4) {
        if (nz) {
            return "A_kui_niuzhuan";
        }
        return "A_dayu_fusi";
    } else if (jima > -8) {
        return "A_xiaoyu_fusi";
    } else if (jima > -13) {
        return "A_xiaoyu_fuba";
    } else if (jima > -18) {
        return "A_xiaoyu_fushisan";
    } else {
        return "A_xiaoyu_fushiba"
    }
    return 0;
}

/**
 * 判断两个是否是同一个公式
 * @param a
 * @param b
 * @returns {boolean}
 */
function A_shifoutongyigongshi(a, b) {
    var c = 0;
    var d = 0;
    if (a > -4) {
        c = 1;
    } else if (a >= -13) {
        c = 2;
    } else {
        c = 3;
    }

    if (b > -4) {
        d = 1;
    } else if (b >= -13) {
        d = 2;
    } else {
        d = 3;
    }

    //alert(a + " === " + b + " = " + (c === d));
    return c === d;
}