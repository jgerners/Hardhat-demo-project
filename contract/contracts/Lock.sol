// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "hardhat/console.sol";

contract Lock {
    uint public unlockTime;
    address payable public owner;
    uint public totalDeposited;

    event Withdrawal(uint amount, uint when);
    event Deposit(address indexed from, uint amount, uint when);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    constructor(uint _unlockTime) payable {
        unlockTime = _unlockTime;
        owner = payable(msg.sender);

        if (msg.value > 0) {
            totalDeposited = msg.value;
            console.log("Constructor deposit:", msg.value);
        }
    }
function withdraw() public payable{
    uint balance = address(this).balance;
    require(balance > 0, "No funds to withdraw");

    (bool success, ) = payable(msg.sender).call{value: balance}("");
    require(success, "Transfer failed.");

    emit Withdrawal(balance, block.timestamp);
}

    function deposit() public payable {
        require(msg.value > 0, "Deposit amount must be greater than zero");

        totalDeposited += msg.value;

        console.log("=== DEPOSIT DEBUG ===");
        console.log("Depositor:", msg.sender);
        console.log("Amount:", msg.value);
        console.log("New balance:", address(this).balance);
        console.log("Total deposited:", totalDeposited);

        emit Deposit(msg.sender, msg.value, block.timestamp);
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}
