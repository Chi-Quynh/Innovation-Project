const SimpleStorage = artifacts.require("SimpleStorage");

contract("SimpleStorage", (accounts) => {
    it("should store and retrieve a value", async () => {
        const instance = await SimpleStorage.deployed();

        // Set a value
        await instance.set(42, { from: accounts[0] });

        // Retrieve the value
        const result = await instance.get();
        assert.equal(result, 42, "The value 42 was not stored.");
    });
});

