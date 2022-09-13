class Cd {
    title;
    artist;
    copy;
    purchases = [];
    reviews = [];
    price;
    notify;
    isInTop100;
    getLowestCompPrice;

    constructor(title, artist, copy, price, externalServices) {
        this.title = title;
        this.artist = artist;
        this.copy = copy;
        this.price = price;
        this.notify = externalServices.notify;
        this.isInTop100 = externalServices.isInTop100;
        this.getLowestCompPrice = externalServices.getLowestCompPrice;
    }

    buy(email, copy) {
        this.copy -= copy;
        this.purchases.push(email);
        this.notify(this.title, this.artist, copy);
    }

    review(review) {
        if (!this.purchases.some(email => email === review.email)) {
            return false;
        }
        this.reviews.push(review);
        return true;
      }

    getPrice() {
        if (this.isInTop100()) {
            return this.getLowestCompPrice() - 1;
        }
        return this.price;
    }
}

module.exports = Cd;