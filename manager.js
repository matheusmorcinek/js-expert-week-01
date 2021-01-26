const Employee = require('./employee');
const Util = require('./util');

class Manager extends Employee {

    #bonuses = 2000;

    get bonuses() {
        return Util.FormatCurrency(this.#bonuses);
    }

    get netPay() {
        const finalValue = Util.unFormatCurrency(super.netPay) +  Util.unFormatCurrency(this.bonuses);
        return Util.FormatCurrency(finalValue);
    }

  
}

module.exports = Manager;