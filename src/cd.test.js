const Cd = require("./cd");

describe("cd", () => {
    describe("getPrice", () => {
        it("cd is not in top 100", () => {
            const externalServices = {
                notify: () => {},
                isInTop100: () => false,
            }
            const cd = new Cd("a", "a", 1, 10, externalServices);
            expect(cd.getPrice()).toEqual(10)
        });

        it("cd is in top 100", () => {
            const externalServices = {
                notify: () => {},
                isInTop100: () => true,
                getLowestCompPrice: () => 5,
            }
            const cd = new Cd("a", "a", 1, 10, externalServices);
            expect(cd.getPrice()).toEqual(4);
        });
    });
});