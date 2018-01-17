/**
 * 定义规则
 * @type {string}
 */
var kui_ting_size = 2;//亏损两次后停止投注
var kui_zero = "1,1,2,3|3,4|4,5|5,6|6,7|7,8|8,9|9,10|10,11|11,12|12,13";
var niuzhuang = "2,2,3,4|3,4|4,5|5,6|6,7|7,8|8,9|9,10|10,11|11,12|12,13";
var kui_zero_three = "1,1,2,3|2,2,3,4|3,4|4,5|5,6|6,7|7,8|8,9|9,10|10,11|11,12|12,13";
var kui_four_seven = "1,2,3|2,3|3,4|4,5|5,6|6,7|7,8|8,9|9,10|10,11|11,12|12,13";
var kui_eight_twelve = "2,3,5|3,4|4,5|5,6|6,7|7,8|8,9|9,10|10,11|11,12|12,13";
var kui_thirteen_eighteen = "3,5,8|3,4|4,5|5,6|6,7|7,8|8,9|9,10|10,11|11,12|12,13";
var kui_other = "1,3,5,8|4,5|5,6|6,7";

/**
 * 大小投注投大
 * 如果上次投注结果与本次提供的数据大小相同为盈（盈加1）否则未亏（亏加1）
 * @param touzhujieguo 上次投注结果
 * @param dangqiantouzhu 当前投注
 * @param dangqiangongshi 当起那公式
 */
function daoxiaotouzhutouda(lastCountResult,thisCountResult) {
    if(lastCountResult.getLosingStreak() >= 2){
        thisCountResult.setLosingStreak(parseInt(lastCountResult.getLosingStreak()) + 1);
    }else{

    }
}

/**
 * 大小投注投小
 */
function daxiaotouzhutouxaio() {
    
}
