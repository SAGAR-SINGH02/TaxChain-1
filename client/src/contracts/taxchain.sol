// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TaxChain {
    struct TaxRecord {
        uint256 amount;
        uint256 timestamp;
        bool refunded;
        string fileHash;
    }

    mapping(address => TaxRecord[]) public taxHistory;

    event TaxFiled(address indexed user, uint256 amount, string fileHash);
    event RefundRequested(address indexed user);

    // File a new tax record
    function fileTax(uint256 _amount, string memory _fileHash) public {
        TaxRecord memory newRecord = TaxRecord({
            amount: _amount,
            timestamp: block.timestamp,
            refunded: false,
            fileHash: _fileHash
        });
        taxHistory[msg.sender].push(newRecord);
        emit TaxFiled(msg.sender, _amount, _fileHash);
    }

    // Request a refund for the latest tax record
    function requestRefund() public {
        require(taxHistory[msg.sender].length > 0, "No tax records found");

        TaxRecord storage last = taxHistory[msg.sender][taxHistory[msg.sender].length - 1];
        require(!last.refunded, "Already refunded");

        last.refunded = true;
        emit RefundRequested(msg.sender);
    }

    // View the latest tax record for a user
    function getLatestTax(address user) public view returns (TaxRecord memory) {
        require(taxHistory[user].length > 0, "No records");
        return taxHistory[user][taxHistory[user].length - 1];
    }
}
