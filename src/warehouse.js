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
        this.stock.push({ ...record, purchases: [], reviews: [] });
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
      cd.copy -= record.copy;
      cd.purchases.push(email);
    });
    return true;
  }

  review(record, review) {
    const cd = this.stock.find(
      (item) =>
        item.artist === record.artist &&
        item.title === record.title &&
        item.purchases.some(email => email === review.email)
    );
    if (!cd) {
      return false;
    }
    cd.reviews.push(review);
    return true;
  }
}

module.exports = Warehouse;
