class Util {

    static #defaultFormat = Intl.NumberFormat('pt-br', {
        currency: 'BRL',
        style: 'currency'
    });

    static FormatCurrency(value) {
        return this.#defaultFormat.format(value);
    }

    static unFormatCurrency(value) {
        return Number(value.replace(/\D/g, '')) / 100;
    }
}

module.exports = Util;