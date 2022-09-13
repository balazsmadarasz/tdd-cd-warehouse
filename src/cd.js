class Cd {
    title;
    artist;
    copy;
    purchases = [];
    reviews = [];
    notify;

    constructor(title, artist, copy, notify) {
        this.title = title;
        this.artist = artist;
        this.copy = copy;
        this.notify = notify;
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
}

module.exports = Cd;