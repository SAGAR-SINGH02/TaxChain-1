const TaxChain = artifacts.require("TaxChain");

contract("TaxChain", (accounts) => {
  const user = accounts[0];
  let contract;

  before(async () => {
    contract = await TaxChain.deployed();
  });

  it("should file a tax record", async () => {
    const amount = web3.utils.toWei("1", "ether");
    const fileHash = "QmTestHash123";

    const result = await contract.fileTax(amount, fileHash, { from: user });

    assert.equal(result.logs[0].event, "TaxFiled", "TaxFiled event should be emitted");
  });

  it("should retrieve the latest tax record", async () => {
    const record = await contract.getLatestTax(user);

    assert.equal(record.fileHash, "QmTestHash123", "File hash should match");
    assert.equal(record.amount.toString(), web3.utils.toWei("1", "ether"), "Amount should match");
    assert.equal(record.refunded, false, "Refund should be false");
  });

  it("should request a refund", async () => {
    const result = await contract.requestRefund({ from: user });

    assert.equal(result.logs[0].event, "RefundRequested", "RefundRequested event should be emitted");

    const updatedRecord = await contract.getLatestTax(user);
    assert.equal(updatedRecord.refunded, true, "Refund status should be true");
  });

  it("should not allow refund again", async () => {
    try {
      await contract.requestRefund({ from: user });
      assert.fail("Refund should not be allowed again");
    } catch (error) {
      assert(error.message.includes("Already refunded"), "Should throw already refunded error");
    }
  });

  it("should throw error for user with no tax records", async () => {
    const newUser = accounts[1];
    try {
      await contract.getLatestTax(newUser);
      assert.fail("Should not retrieve record for user with no history");
    } catch (error) {
      assert(error.message.includes("No records"), "Should throw no records error");
    }
  });
});
