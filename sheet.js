const { GoogleSpreadsheet } = require('google-spreadsheet');

module.exports = class Sheet {
    constructor() {
        this.doc = new GoogleSpreadsheet('1StDXZx6Hv_clTEmSsj-afMOmyVICcpqqe5BJqamI2dU');
    }
    async load() {
        await this.doc.useServiceAccountAuth(require('./credentials.json'));
        await this.doc.loadInfo();
    }
    async addRows(rows, i) {
        const sheet = this.doc.sheetsByIndex[i]; // or use doc.sheetsById[id]
        await sheet.addRows(rows);
    }
    async getRows(i) {
        const sheet = this.doc.sheetsByIndex[i]; // or use doc.sheetsById[]
        const rows = await sheet.getRows();
        return rows
    }
}