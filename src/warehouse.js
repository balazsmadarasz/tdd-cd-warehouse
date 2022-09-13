const Cd = require("./cd");

class Warehouse {
  stock = [];
  search(text) {
    return this.stock.filter(
      (x) => x.title.startsWith(text) || x.artist.startsWith(text)
    );
  }

  record(records) {
    records.forEach((record) => {
      const cd = this.stock.find(
        (x) => x.artist === record.artist && x.title === record.title
      );
      if (cd) {
        cd.copy += record.copy;
      } else {
        this.stock.push(new Cd(record.title, record.artist, record.copy, () => {}));
      }
    });
  }
  buy(records, email) {
    const isAllExistsInStock = records.some((record) => {
      const cd = this.stock.find(
        (item) =>
          item.artist === record.artist &&
          item.title === record.title &&
          record.copy <= item.copy
      );
      if (!cd) {
        return false;
      }
      return true;
    });
    if (!isAllExistsInStock) {
      return false;
    }

    records.forEach((record) => {
      const cd = this.stock.find(
        (item) => item.artist === record.artist && item.title === record.title
      );
      cd.buy(email, record.copy);
    });
    return true;
  }
}

module.exports = Warehouse;
