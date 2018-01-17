/**
 * 投注计算结果
 * @constructor
 */
function CountResult() {

    this.lastDevote = new DevoteResult(); //上次投注结果
    this.thisDevote = new DevoteResult(); //本次投注结果
    this.lastWhetherDevote = true; //上次是否投注
    this.thisWhetherDevote = true; //本次是否投注
    this.thisCountEquation = 0;//本次计算公式
    this.thisCountEquationName = "b_dayu_fusi";//本次计算公式名称
    this.losingStreakNumber = 0;//连亏次数
    this.winningStreakNumber = 0;// 连胜次数
    this.thisWinningNumber = 0;//当前盈利次数
    this.thisLosingNumber = 0;//当前亏损次数
    this.profitOrLoss = "盈"; //盈或亏
    this.devoteRate = 0; //投注倍率
    this.lastDevoteRate = 0; //上次投注倍率
    this.profitAndLoss = 0;//盈亏数
    this.thisDevoteStreak = 0;//当前投注次数
    this.thisIsTransition = false;//当前投注是否转换公式
    this.thisLosingNumberAll = 0;//总共亏损次数
    this.thisIsReverse = false;//当前是否因为3输而进行扭转

    this.setLastDevote = function (lastDevote) {
        this.lastDevote = lastDevote;
    }

    this.getLastDevote = function() {
        return this.lastDevote;
    }
    this.setLastDevoteRate = function (lastDevoteRate) {
        this.lastDevoteRate = lastDevoteRate;
    }

    this.getLastDevoteRate = function() {
        return this.lastDevoteRate;
    }

    this.setThisDevote = function (thisDevote) {
        this.thisDevote = thisDevote;
    }

    this.getThisDevote = function () {
        return this.thisDevote;
    }

    this.setThisWhetherDevote = function (thisWhetherDevote) {
        this.thisWhetherDevote = thisWhetherDevote;
    }

    this.getThisWhetherDevote = function () {
        return this.thisWhetherDevote;
    }

    this.setLastWhetherDevote = function (lastWhetherDevote) {
        this.lastWhetherDevote = lastWhetherDevote;
    }

    this.getLastWhetherDevote = function () {
        return this.lastWhetherDevote;
    }

    this.setThisCountEquation = function (thisCountEquation) {
        this.thisCountEquation = thisCountEquation;
    }

    this.getThisCountEquation = function () {
        return this.thisCountEquation;
    }

    this.setLosingStreaknumber = function (losingStreakNumber) {
        this.losingStreakNumber = losingStreakNumber;
    }

    this.getLosingStreakNumber = function () {
        return this.losingStreakNumber;
    }

    this.setWinningStreakNumber = function (winningStreakNumber) {
        this.winningStreakNumber = winningStreakNumber;
    }

    this.getWinningStreakNumber = function () {
        return this.winningStreakNumber;
    }

    this.setThisWinningNumber = function (thisWinningNumber) {
        this.thisWinningNumber = thisWinningNumber;
    }

    this.getThisWinningNumber = function () {
        return this.thisWinningNumber;
    }


    this.setThisLosingNumber = function (thisLosingNumber) {
        this.thisLosingNumber = thisLosingNumber;
    }

    this.getThisLosningNumber = function () {
        return this.thisLosingNumber;
    }

    this.setProfitOrLoss = function (profitOrLoss) {
        this.profitOrLoss = profitOrLoss;
    }

    this.getProfitOrLoss = function () {
        return this.profitOrLoss;
    }

    this.setDevoteRate = function (devoteRate) {
        this.devoteRate = devoteRate;
    }

    this.getDevoteRate = function () {
        return this.devoteRate;
    }

    this.setProfitAndLoss = function (profitAndLoss) {
        this.profitAndLoss = profitAndLoss;
    }

    this.getProfitAndLoss = function () {
        return this.profitAndLoss;
    }

    this.setThisDevoteStreak = function (thisDevoteStreak) {
        this.thisDevoteStreak = thisDevoteStreak;
    }

    this.getThisDevoteStreak = function () {
        return this.thisDevoteStreak;
    }

    this.setThisIsTransition = function (thisIsTransition) {
        this.thisIsTransition = thisIsTransition;
    }

    this.getThisIsTransition = function () {
        return this.thisIsTransition;
    }

    this.setThisLosingNumberAll = function (thisLosingNumberAll) {
        this.thisLosingNumberAll = thisLosingNumberAll;
    }

    this.getThisLosingNumberAll = function () {
        return this.thisLosingNumberAll;
    }

    this.setThisIsReverse = function (thisIsReverse) {
        this.thisIsReverse = thisIsReverse;
    }

    this.getThisIsReverse = function () {
        return this.thisIsReverse;
    }

    this.setThisCountEquationName = function (thisCountEquationName) {
        this.thisCountEquationName = thisCountEquationName;
    }

    this.getThisCountEquationName = function () {
        return this.thisCountEquationName;
    }
}