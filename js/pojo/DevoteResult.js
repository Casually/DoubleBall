/**
 * 投注结果
 * @constructor
 */
function DevoteResult() {

    this.devoteType;//投注类型
    this.devoteMoney;//投注金额

    this.setDevoteType = function (devoteType) {
        this.devoteType = devoteType;
    }

    this.getDevoteType = function () {
        return this.devoteType;
    }

    this.setDevoteMoney = function (devoteMoney) {
        this.devoteMoney = devoteMoney;
    }

    this.getDevoteMoney = function () {
        return this.devoteMoney;
    }
}