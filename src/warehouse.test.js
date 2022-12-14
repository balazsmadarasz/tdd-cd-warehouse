const Cd = require("./cd");
const Warehouse = require("./warehouse");

describe("warehouse", () => {
  let warehouse;

  beforeEach(() => {
    warehouse = new Warehouse();
    warehouse.record([
      { title: "a", artist: "a", copy: 1 },
      { title: "b", artist: "b", copy: 1 },
    ]);
  });
  describe("search", () => {
    it("empty then search result is empty", () => {
      expect(warehouse.search("test").length).toEqual(0);
    });

    it("get result when type 'a', and return every search result", () => {
      const result = warehouse.search("a")[0];
      expect(result.title).toEqual("a");
      expect(result.artist).toEqual("a");
      expect(result.copy).toEqual(1);
    });
  });

  describe("record", () => {
    it("CDs an give back the records in the search results", () => {
      warehouse.record([
        { title: "recorded 1", artist: "recorded 1", copy: 1 },
        { title: "recorded 2", artist: "recorded 2", copy: 2 },
      ]);
      expect(warehouse.search("recorded").length).toEqual(2);
    });
    it("CDs what exists already in the stock, and just increse the cpoies", () => {
      warehouse.record([{ title: "a", artist: "a", copy: 1 }]);
      expect(warehouse.search("a")[0].copy).toEqual(2);
    });
  });

  describe("buy", () => {
    it("batch of CDs", () => {
      const result = warehouse.buy(
        [{ title: "a", artist: "a", copy: 1 }],
        "a@a.com"
      );
      expect(result).toEqual(true);
      expect(warehouse.search("a")[0].copy).toEqual(0);
      expect(warehouse.search("a")[0].purchases).toEqual(["a@a.com"]);
    });
    it("failing when cd is not exists", () => {
      const result = warehouse.buy(
        [{ title: "c", artist: "c", copy: 1 }],
        "a@a.com"
      );
      expect(result).toEqual(false);
    });

    it("failing when cd is out of stock", () => {
      const result = warehouse.buy(
        [{ title: "a", artist: "a", copy: 2 }],
        "a@a.com"
      );
      expect(result).toEqual(false);
    });
    it("notify is called with the right parameters", () => {
      let artist = "";
      let title = "";
      let copy = 0;
      const notify = (titleParam, artistParam, copyParam) => {
        title = titleParam;
        artist = artistParam;
        copy = copyParam;
      };
      const cd = new Cd("a", "a", 1, 10, { notify, isInTop100: () => false });
      cd.buy("a@a.com", 1);
      expect(artist).toEqual("a");
      expect(title).toEqual("a");
      expect(copy).toEqual(1);
    })
  });

  describe("review", () => {
      it('can not send if user does not have any purshes for the cd', () => {
        const cd = new Cd("a", "a", 1, 10, { notify: () => {}, isInTop100: () => false });
        const result = cd.review(
            { rate: 2, message: "message 1", email: "a@a.com" },
          );
        expect(result).toEqual(false);
      });
      it("able to make a review if he has any purcheses", () => {
        const cd = new Cd("a", "a", 1, 10, { notify: () => {}, isInTop100: () => false });
        cd.buy("a@a.com", 1);
        const result = cd.review(
          { rate: 2, message: "message 1", email: "a@a.com" },
        );
        expect(result).toEqual(true);
        expect(cd.reviews[0]).toEqual({ rate: 2, message: "message 1", email: "a@a.com" });
      });
  });
});
