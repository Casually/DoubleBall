/**
 * 投注结果
 * @constructor
 */
function Result() {

    this.shangcitouzhu = "";//上次投注
    this.dangqiantouzhu = "";//当前投注
    this.bencishifoutouzhu = true;//本次是否投注
    this.shangcishifoutouzhu = true;//上次是否投注
    this.yingorkui = "ying";//本次投注盈亏
    this.touzhubeilv = 0;//本次投注倍率

    this.setYingorkui = function (yok) {
        this.yingorkui = yok;
    }

    this.getYingorkui = function() {
        return this.yingorkui;
    }

    this.setBeilv = function (bl) {
        this.touzhubeilv = bl;
    }

    this.getBeilv = function () {
        return this.touzhubeilv;
    }
}
