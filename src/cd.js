class Cd {
    title;
    artist;
    copy;
    purchases = [];
    reviews = [];

    constructor(title, artist, copy) {
        this.title = title;
        this.artist = artist;
        this.copy = copy;
    }

    buy(email, copy) {
        this.copy -= copy;
        this.purchases.push(email);
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