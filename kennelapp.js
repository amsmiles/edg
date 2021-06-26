"use strict";

// Unpkg imports
const web3 = new Web3;
const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;
const ethers = window.ethers;

var bnb;
var ada;
var eth;
var linkc;
var poo;
var sfm;

// Web3modal instance
let web3Modal;

//current acc
let currentaccount;

// Chosen wallet provider given by the dialog window
let provider;

// Edoge Contract
const edogecontractAddress = "0x3ee4c28ec61e3446289de4c9124866fccf9b9511";
const edogecontractAbi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"address","name":"recipient","type":"address"}],"name":"OnWithdrawDOGE","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[],"name":"AddressResetSellLock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"BalanceLimitDivider","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DOGEWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"InitialSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MaxSellLockTime","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"SellLimitDivider","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"SetupEnableTrading","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"liquidityTokenAddress","type":"address"}],"name":"SetupLiquidityTokenAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"newShare","type":"uint8"}],"name":"TeamChangeMarketingShare","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"TeamCreateLPandBNB","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"disabled","type":"bool"}],"name":"TeamDisableSellLock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"TeamReleaseLiquidity","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"addToStaking","type":"bool"}],"name":"TeamRemoveLiquidity","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"TeamRemoveRemainingBNB","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"sellLockSeconds","type":"uint256"}],"name":"TeamSetSellLockTime","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"burnTaxes","type":"uint8"},{"internalType":"uint8","name":"liquidityTaxes","type":"uint8"},{"internalType":"uint8","name":"stakingTaxes","type":"uint8"},{"internalType":"uint8","name":"buyTax","type":"uint8"},{"internalType":"uint8","name":"sellTax","type":"uint8"},{"internalType":"uint8","name":"transferTax","type":"uint8"}],"name":"TeamSetTaxes","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"manual","type":"bool"}],"name":"TeamSwitchManualBNBConversion","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"secondsUntilUnlock","type":"uint256"}],"name":"TeamUnlockLiquidityInSeconds","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newBalanceLimit","type":"uint256"},{"internalType":"uint256","name":"newSellLimit","type":"uint256"}],"name":"TeamUpdateLimits","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"TeamWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TeamWithdrawMarketingBNB","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"TeamWithdrawMarketingBNB","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"_getTotalShares","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"balanceLimit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"AddressToCheck","type":"address"}],"name":"getAddressSellLockTimeInSeconds","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBurnedTokens","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"getDividents","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getLimits","outputs":[{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"uint256","name":"sell","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getLiquidityReleaseTimeInSeconds","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getSellLockTimeInSeconds","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTaxes","outputs":[{"internalType":"uint256","name":"burnTax","type":"uint256"},{"internalType":"uint256","name":"liquidityTax","type":"uint256"},{"internalType":"uint256","name":"marketingTax","type":"uint256"},{"internalType":"uint256","name":"buyTax","type":"uint256"},{"internalType":"uint256","name":"sellTax","type":"uint256"},{"internalType":"uint256","name":"transferTax","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"isExcludedFromStaking","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"manualConversion","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"marketingBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"marketingShare","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"profitPerShare","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"sellLimit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sellLockDisabled","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sellLockTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"totalLPBNB","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalPayouts","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalStakingReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tradingEnabled","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}];

const poocontractAbi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"address","name":"recipient","type":"address"}],"name":"OnWithdrawPoocoin","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[],"name":"AddressResetSellLock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"BalanceLimitDivider","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"InitialSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MaxSellLockTime","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PoocoinWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"SellLimitDivider","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"SetupEnableTrading","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"liquidityTokenAddress","type":"address"}],"name":"SetupLiquidityTokenAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"newShare","type":"uint8"}],"name":"TeamChangeMarketingShare","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"TeamCreateLPandBNB","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"disabled","type":"bool"}],"name":"TeamDisableSellLock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"TeamReleaseLiquidity","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"addToStaking","type":"bool"}],"name":"TeamRemoveLiquidity","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"TeamRemoveRemainingBNB","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"sellLockSeconds","type":"uint256"}],"name":"TeamSetSellLockTime","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"burnTaxes","type":"uint8"},{"internalType":"uint8","name":"liquidityTaxes","type":"uint8"},{"internalType":"uint8","name":"stakingTaxes","type":"uint8"},{"internalType":"uint8","name":"buyTax","type":"uint8"},{"internalType":"uint8","name":"sellTax","type":"uint8"},{"internalType":"uint8","name":"transferTax","type":"uint8"}],"name":"TeamSetTaxes","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"manual","type":"bool"}],"name":"TeamSwitchManualBNBConversion","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"secondsUntilUnlock","type":"uint256"}],"name":"TeamUnlockLiquidityInSeconds","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newBalanceLimit","type":"uint256"},{"internalType":"uint256","name":"newSellLimit","type":"uint256"}],"name":"TeamUpdateLimits","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"TeamWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TeamWithdrawMarketingBNB","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"TeamWithdrawMarketingBNB","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"_getTotalShares","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"balanceLimit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"AddressToCheck","type":"address"}],"name":"getAddressSellLockTimeInSeconds","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBurnedTokens","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"getDividents","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getLimits","outputs":[{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"uint256","name":"sell","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getLiquidityReleaseTimeInSeconds","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getSellLockTimeInSeconds","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTaxes","outputs":[{"internalType":"uint256","name":"burnTax","type":"uint256"},{"internalType":"uint256","name":"liquidityTax","type":"uint256"},{"internalType":"uint256","name":"marketingTax","type":"uint256"},{"internalType":"uint256","name":"buyTax","type":"uint256"},{"internalType":"uint256","name":"sellTax","type":"uint256"},{"internalType":"uint256","name":"transferTax","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"isExcludedFromStaking","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"manualConversion","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"marketingBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"marketingShare","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"profitPerShare","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"sellLimit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sellLockDisabled","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sellLockTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"totalLPBNB","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalPayouts","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalStakingReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tradingEnabled","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}];
const poocontractAddress = "0xc9acb3c752bf43cac1c81b268ea967e8ffc9f75b";

const adacontractAbi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"address","name":"recipient","type":"address"}],"name":"OnWithdrawADA","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[],"name":"ADAWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"AddressResetSellLock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"BalanceLimitDivider","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"InitialSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MaxSellLockTime","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MaxTax","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"SellLimitDivider","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"addressesToAdd","type":"address[]"}],"name":"SetupAddArrayToWhitelist","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"addressToAdd","type":"address"}],"name":"SetupAddToWhitelist","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"SetupEnableTrading","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"SetupEnableWhitelistTrading","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"liquidityTokenAddress","type":"address"}],"name":"SetupLiquidityTokenAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"addressToRemove","type":"address"}],"name":"SetupRemoveFromWhitelist","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"newShare","type":"uint8"}],"name":"TeamChangeMarketingShare","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"TeamCreateLPandBNB","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"disabled","type":"bool"}],"name":"TeamDisableSellLock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"TeamExcludeAccountFromFees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"TeamExcludeAccountFromSellLock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"TeamExcludeFromStaking","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"TeamIncludeAccountToFees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"TeamIncludeAccountToSellLock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"TeamIncludeToStaking","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"TeamReleaseLiquidity","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"addToStaking","type":"bool"}],"name":"TeamRemoveLiquidity","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"TeamRemoveRemainingBNB","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"sellLockSeconds","type":"uint256"}],"name":"TeamSetSellLockTime","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"burnTaxes","type":"uint8"},{"internalType":"uint8","name":"liquidityTaxes","type":"uint8"},{"internalType":"uint8","name":"stakingTaxes","type":"uint8"},{"internalType":"uint8","name":"buyTax","type":"uint8"},{"internalType":"uint8","name":"sellTax","type":"uint8"},{"internalType":"uint8","name":"transferTax","type":"uint8"}],"name":"TeamSetTaxes","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"manual","type":"bool"}],"name":"TeamSwitchManualBNBConversion","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"secondsUntilUnlock","type":"uint256"}],"name":"TeamUnlockLiquidityInSeconds","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newBalanceLimit","type":"uint256"},{"internalType":"uint256","name":"newSellLimit","type":"uint256"}],"name":"TeamUpdateLimits","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"TeamWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TeamWithdrawMarketingBNB","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"TeamWithdrawMarketingBNB","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"TeamlimitLiquidityReleaseTo20Percent","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"WhiteListBalanceLimitDivider","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_getTotalShares","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"balanceLimit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"AddressToCheck","type":"address"}],"name":"getAddressSellLockTimeInSeconds","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBurnedTokens","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"getDividents","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getLimits","outputs":[{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"uint256","name":"sell","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getLiquidityReleaseTimeInSeconds","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getSellLockTimeInSeconds","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTaxes","outputs":[{"internalType":"uint256","name":"burnTax","type":"uint256"},{"internalType":"uint256","name":"liquidityTax","type":"uint256"},{"internalType":"uint256","name":"marketingTax","type":"uint256"},{"internalType":"uint256","name":"buyTax","type":"uint256"},{"internalType":"uint256","name":"sellTax","type":"uint256"},{"internalType":"uint256","name":"transferTax","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"AddressToCheck","type":"address"}],"name":"getWhitelistedStatus","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"isExcludedFromStaking","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"liquidityRelease20Percent","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"manualConversion","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"marketingBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"marketingShare","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"profitPerShare","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"sellLimit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sellLockDisabled","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sellLockTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"totalLPBNB","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalPayouts","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalStakingReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tradingEnabled","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"whiteListTrading","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"stateMutability":"payable","type":"receive"}];
const adacontractAddress = "0x63b96e2aa10d56a638d23498e81d7403d2b64178";

const sfmcontractAbi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"address","name":"recipient","type":"address"}],"name":"OnWithdrawADA","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[],"name":"ADAWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"AddressResetSellLock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"BalanceLimitDivider","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"InitialSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MaxSellLockTime","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MaxTax","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"SellLimitDivider","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"addressesToAdd","type":"address[]"}],"name":"SetupAddArrayToWhitelist","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"addressToAdd","type":"address"}],"name":"SetupAddToWhitelist","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"SetupEnableTrading","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"SetupEnableWhitelistTrading","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"liquidityTokenAddress","type":"address"}],"name":"SetupLiquidityTokenAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"addressToRemove","type":"address"}],"name":"SetupRemoveFromWhitelist","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"newShare","type":"uint8"}],"name":"TeamChangeMarketingShare","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"TeamCreateLPandBNB","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"disabled","type":"bool"}],"name":"TeamDisableSellLock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"TeamExcludeAccountFromFees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"TeamExcludeAccountFromSellLock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"TeamExcludeFromStaking","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"TeamIncludeAccountToFees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"TeamIncludeAccountToSellLock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"TeamIncludeToStaking","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"TeamReleaseLiquidity","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"addToStaking","type":"bool"}],"name":"TeamRemoveLiquidity","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"TeamRemoveRemainingBNB","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"sellLockSeconds","type":"uint256"}],"name":"TeamSetSellLockTime","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"burnTaxes","type":"uint8"},{"internalType":"uint8","name":"liquidityTaxes","type":"uint8"},{"internalType":"uint8","name":"stakingTaxes","type":"uint8"},{"internalType":"uint8","name":"buyTax","type":"uint8"},{"internalType":"uint8","name":"sellTax","type":"uint8"},{"internalType":"uint8","name":"transferTax","type":"uint8"}],"name":"TeamSetTaxes","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"manual","type":"bool"}],"name":"TeamSwitchManualBNBConversion","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"secondsUntilUnlock","type":"uint256"}],"name":"TeamUnlockLiquidityInSeconds","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newBalanceLimit","type":"uint256"},{"internalType":"uint256","name":"newSellLimit","type":"uint256"}],"name":"TeamUpdateLimits","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"TeamWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TeamWithdrawMarketingBNB","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"TeamWithdrawMarketingBNB","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"TeamlimitLiquidityReleaseTo20Percent","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"WhiteListBalanceLimitDivider","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_getTotalShares","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"balanceLimit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"AddressToCheck","type":"address"}],"name":"getAddressSellLockTimeInSeconds","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBurnedTokens","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"getDividents","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getLimits","outputs":[{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"uint256","name":"sell","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getLiquidityReleaseTimeInSeconds","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getSellLockTimeInSeconds","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTaxes","outputs":[{"internalType":"uint256","name":"burnTax","type":"uint256"},{"internalType":"uint256","name":"liquidityTax","type":"uint256"},{"internalType":"uint256","name":"marketingTax","type":"uint256"},{"internalType":"uint256","name":"buyTax","type":"uint256"},{"internalType":"uint256","name":"sellTax","type":"uint256"},{"internalType":"uint256","name":"transferTax","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"AddressToCheck","type":"address"}],"name":"getWhitelistedStatus","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"isExcludedFromStaking","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"liquidityRelease20Percent","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"manualConversion","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"marketingBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"marketingShare","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"profitPerShare","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"sellLimit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sellLockDisabled","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sellLockTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"totalLPBNB","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalPayouts","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalStakingReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tradingEnabled","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"whiteListTrading","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"stateMutability":"payable","type":"receive"}];
const sfmcontractAddress = "0xd65dd16b233d99f4a0dceec3582cb0a302e28092";

const linkcontractAbi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"address","name":"recipient","type":"address"}],"name":"OnWithdrawLINK","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[],"name":"AddressResetSellLock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"BalanceLimitDivider","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"InitialSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"LINKWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"MaxSellLockTime","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MaxTax","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"SellLimitDivider","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"addressesToAdd","type":"address[]"}],"name":"SetupAddArrayToWhitelist","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"addressToAdd","type":"address"}],"name":"SetupAddToWhitelist","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"SetupEnableTrading","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"SetupEnableWhitelistTrading","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"liquidityTokenAddress","type":"address"}],"name":"SetupLiquidityTokenAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"addressToRemove","type":"address"}],"name":"SetupRemoveFromWhitelist","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"newShare","type":"uint8"}],"name":"TeamChangeMarketingShare","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"TeamCreateLPandBNB","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"disabled","type":"bool"}],"name":"TeamDisableSellLock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"TeamExcludeAccountFromFees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"TeamExcludeAccountFromSellLock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"TeamExcludeFromStaking","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"TeamIncludeAccountToFees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"TeamIncludeAccountToSellLock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"TeamIncludeToStaking","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"TeamReleaseLiquidity","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"addToStaking","type":"bool"}],"name":"TeamRemoveLiquidity","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"TeamRemoveRemainingBNB","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"sellLockSeconds","type":"uint256"}],"name":"TeamSetSellLockTime","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"burnTaxes","type":"uint8"},{"internalType":"uint8","name":"liquidityTaxes","type":"uint8"},{"internalType":"uint8","name":"stakingTaxes","type":"uint8"},{"internalType":"uint8","name":"buyTax","type":"uint8"},{"internalType":"uint8","name":"sellTax","type":"uint8"},{"internalType":"uint8","name":"transferTax","type":"uint8"}],"name":"TeamSetTaxes","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"manual","type":"bool"}],"name":"TeamSwitchManualBNBConversion","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"secondsUntilUnlock","type":"uint256"}],"name":"TeamUnlockLiquidityInSeconds","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newBalanceLimit","type":"uint256"},{"internalType":"uint256","name":"newSellLimit","type":"uint256"}],"name":"TeamUpdateLimits","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"TeamWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TeamWithdrawMarketingBNB","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"TeamWithdrawMarketingBNB","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"TeamlimitLiquidityReleaseTo20Percent","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"WhiteListBalanceLimitDivider","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_getTotalShares","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"balanceLimit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"AddressToCheck","type":"address"}],"name":"getAddressSellLockTimeInSeconds","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBurnedTokens","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"getDividents","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getLimits","outputs":[{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"uint256","name":"sell","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getLiquidityReleaseTimeInSeconds","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getSellLockTimeInSeconds","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTaxes","outputs":[{"internalType":"uint256","name":"burnTax","type":"uint256"},{"internalType":"uint256","name":"liquidityTax","type":"uint256"},{"internalType":"uint256","name":"marketingTax","type":"uint256"},{"internalType":"uint256","name":"buyTax","type":"uint256"},{"internalType":"uint256","name":"sellTax","type":"uint256"},{"internalType":"uint256","name":"transferTax","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"AddressToCheck","type":"address"}],"name":"getWhitelistedStatus","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"isExcludedFromStaking","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"liquidityRelease20Percent","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"manualConversion","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"marketingBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"marketingShare","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"profitPerShare","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"sellLimit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sellLockDisabled","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sellLockTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"totalLPBNB","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalPayouts","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalStakingReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tradingEnabled","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"whiteListTrading","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"stateMutability":"payable","type":"receive"}];
const linkcontractAddress = "0x1d3ee74c3cba39ac55f3011681a1e3700a5dec43"; 

const ethcontractAbi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"address","name":"recipient","type":"address"}],"name":"OnWithdrawETH","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[],"name":"AddressResetSellLock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"BalanceLimitDivider","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ETHWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"InitialSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MaxSellLockTime","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MaxTax","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"SellLimitDivider","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"addressesToAdd","type":"address[]"}],"name":"SetupAddArrayToWhitelist","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"addressToAdd","type":"address"}],"name":"SetupAddToWhitelist","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"SetupEnableTrading","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"SetupEnableWhitelistTrading","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"liquidityTokenAddress","type":"address"}],"name":"SetupLiquidityTokenAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"addressToRemove","type":"address"}],"name":"SetupRemoveFromWhitelist","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"newShare","type":"uint8"}],"name":"TeamChangeMarketingShare","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"TeamCreateLPandBNB","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"disabled","type":"bool"}],"name":"TeamDisableSellLock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"TeamExcludeAccountFromFees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"TeamExcludeAccountFromSellLock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"TeamExcludeFromStaking","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"TeamIncludeAccountToFees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"TeamIncludeAccountToSellLock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"TeamIncludeToStaking","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"TeamReleaseLiquidity","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"addToStaking","type":"bool"}],"name":"TeamRemoveLiquidity","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"TeamRemoveRemainingBNB","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"sellLockSeconds","type":"uint256"}],"name":"TeamSetSellLockTime","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"burnTaxes","type":"uint8"},{"internalType":"uint8","name":"liquidityTaxes","type":"uint8"},{"internalType":"uint8","name":"stakingTaxes","type":"uint8"},{"internalType":"uint8","name":"buyTax","type":"uint8"},{"internalType":"uint8","name":"sellTax","type":"uint8"},{"internalType":"uint8","name":"transferTax","type":"uint8"}],"name":"TeamSetTaxes","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"manual","type":"bool"}],"name":"TeamSwitchManualBNBConversion","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"secondsUntilUnlock","type":"uint256"}],"name":"TeamUnlockLiquidityInSeconds","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newBalanceLimit","type":"uint256"},{"internalType":"uint256","name":"newSellLimit","type":"uint256"}],"name":"TeamUpdateLimits","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"TeamWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TeamWithdrawMarketingBNB","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"TeamWithdrawMarketingBNB","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"TeamlimitLiquidityReleaseTo20Percent","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"WhiteListBalanceLimitDivider","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_getTotalShares","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"balanceLimit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"AddressToCheck","type":"address"}],"name":"getAddressSellLockTimeInSeconds","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBurnedTokens","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"getDividents","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getLimits","outputs":[{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"uint256","name":"sell","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getLiquidityReleaseTimeInSeconds","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getSellLockTimeInSeconds","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTaxes","outputs":[{"internalType":"uint256","name":"burnTax","type":"uint256"},{"internalType":"uint256","name":"liquidityTax","type":"uint256"},{"internalType":"uint256","name":"marketingTax","type":"uint256"},{"internalType":"uint256","name":"buyTax","type":"uint256"},{"internalType":"uint256","name":"sellTax","type":"uint256"},{"internalType":"uint256","name":"transferTax","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"AddressToCheck","type":"address"}],"name":"getWhitelistedStatus","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"isExcludedFromStaking","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"liquidityRelease20Percent","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"manualConversion","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"marketingBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"marketingShare","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"profitPerShare","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"sellLimit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sellLockDisabled","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sellLockTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"totalLPBNB","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalPayouts","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalStakingReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tradingEnabled","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"whiteListTrading","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"stateMutability":"payable","type":"receive"}];
const ethcontractAddress = "0xb59ec5f900043e5fb44e537497d46dc2c905ead0";


// Getting infuraID
function getInfuraId() {
  const provider = new ethers.providers.InfuraProvider();
  return provider.apiKey;
}

//Initialise
function init() {
  console.log("Starting...");
  console.log("WalletConnectProvider is", WalletConnectProvider);
  console.log("window.ethers is", ethers, "window.ethereum is", window.ethereum);

  //Wallet support
  const providerOptions = {walletconnect: 
	{package: WalletConnectProvider, options: 
	{infuraId: getInfuraId(),
	},},};
	
  web3Modal = new Web3Modal({
    cacheProvider: false, // o
    providerOptions, // r
    disableInjectedProvider: false, // o
	});

  console.log("Web3Modal instance is", web3Modal);
	
}

//UI Changes
async function fetchAccountData() {
	const wallet = new ethers.providers.Web3Provider(provider);
	// Get addy of the connected wallet
	const signer = wallet.getSigner();
	const selectedAccount = await signer.getAddress();
  currentaccount = await signer.getAddress();
	document.querySelector("#walletaddy").textContent = selectedAccount;
	// Display fully loaded UI for wallet data
	document.querySelector(".walleticon2").style.display = "block";
	document.querySelector(".walleticon").style.display = "none";
	const setcolor = document.getElementById('walleticon');
	var css = {backgroundColor: '#ffcfdf', backgroundImage: 'linear-gradient(315deg, #ffcfdf 0%, #b0f3f1 74%)', transition: 'all 250ms'};
	Object.assign(setcolor.style, css);

}

/**
 * Fetch account data for UI when
 * - User switches accounts in wallet
 * - User switches networks in wallet
 * - User connects wallet initially
 */
async function refreshAccountData() {
  // If any current data is displayed when
  // the user is switching acounts in the wallet
  // immediately hide this data

  // hide the createToken result on page refresh, only displays the result
  // when result is returned from the contract

  // Disable button while UI is loading.
  // fetchAccountData() will take a while as it communicates
  // with Ethereum node via JSON-RPC and loads chain data
  // over an API call.
  await fetchAccountData();
  document.querySelector("#walleticon").setAttribute("disabled", "disabled");
  
  document.querySelector("#walleticon").removeAttribute("disabled");
}

//Connect Wallet button
async function onConnect() {
  console.log("Opening a dialog", web3Modal);
  try {
    provider = await web3Modal.connect();
  } catch (e) {
    console.log("Could not get a wallet connection", e);
    return;
  }

  // Subscribe to accounts change
  provider.on("accountsChanged", (accounts) => {
    fetchAccountData();
  });

  // Subscribe to chainId change
  provider.on("chainChanged", (chainId) => {
    fetchAccountData();
  });
  
  await refreshAccountData();
}


async function updatestuff(){
	price();
	window.contractADA = await loadContractADA();
	window.contractETH = await loadContractETH();
	window.contractLINK = await loadContractLINK();
	window.contractPOO = await loadContractPOO();
	window.contractSFM = await loadContractSFM();
	
	getDividentsADA();
	getDividentsETH();
	getDividentsLINK();
	getDividentsPOO();
	getDividentsSFM();
	
	setTimeout(updatestuff, 5000);
}

//disconnect button
async function onDisconnect() {
  console.log("Killing the wallet connection", provider);

  // Which providers have close method?
  if (provider.close) {
    await provider.close();

    // If the cached provider is not cleared,
    // WalletConnect will default to the existing session
    // and does not allow to re-scan the QR code with a new wallet.
    // Depending on your use case you may want or want not his behavir.
    await web3Modal.clearCachedProvider();
    provider = null;
  }

  // Set the UI back to the initial state
	//document.querySelector("#btn-connect").style.display = "block";
	document.querySelector("#walletaddy").textContent = "Connect to start";
	document.querySelector(".walleticon2").style.display = "none";
	document.querySelector(".walleticon").style.display = "block";
}

//button even listereners
window.addEventListener("load", async () => {
  init();
  document.querySelector(".walleticon").addEventListener("click", onConnect);
  document.querySelector(".walleticon").addEventListener("click", updatestuff);
  document.querySelector(".claimadabtn").addEventListener("click", claimADA);
  document.querySelector(".claimpoobtn").addEventListener("click", claimPOO);
  document.querySelector(".claimethbtn").addEventListener("click", claimETH);
  document.querySelector(".claimsfmbtn").addEventListener("click", claimSFM);
  document.querySelector(".claimlinkbtn").addEventListener("click", claimLINK);
  document.querySelector(".walleticon2").addEventListener("click", onDisconnect);
});


//Price fetcher thingy


function price() {
    fetch('https://api.coingecko.com/api/v3/coins/binancecoin?tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=false')
        .then((response) => {
            return response.text();
        })
        .then((myContent) => {
            var market = JSON.parse(myContent);
            bnb = market["market_data"]["current_price"]["usd"];
        });
    fetch('https://api.coingecko.com/api/v3/coins/cardano?tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=false')
        .then((response) => {
            return response.text();
        })
        .then((myContent) => {
            var market = JSON.parse(myContent);
            ada = market["market_data"]["current_price"]["usd"];
        });
	fetch('https://api.coingecko.com/api/v3/coins/ethereum?tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=false')
	.then((response) => {
		return response.text();
	})
	.then((myContent) => {
		var market = JSON.parse(myContent);
		eth = market["market_data"]["current_price"]["usd"];
	});
		fetch('https://api.coingecko.com/api/v3/coins/chainlink?tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=false')
	.then((response) => {
		return response.text();
	})
	.then((myContent) => {
		var market = JSON.parse(myContent);
		linkc = market["market_data"]["current_price"]["usd"];
	});

	fetch('https://api.coingecko.com/api/v3/coins/poocoin?tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=false')
	.then((response) => {
		return response.text();
	})
	.then((myContent) => {
		var market = JSON.parse(myContent);
		poo = market["market_data"]["current_price"]["usd"];
	});
	
	fetch('https://api.coingecko.com/api/v3/coins/safemoon?tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=false')
	.then((response) => {
		return response.text();
	})
	.then((myContent) => {
		var market = JSON.parse(myContent);
		sfm = market["market_data"]["current_price"]["usd"];
	});

}


function toclaimADA(status) {
    const statusEl = document.getElementsByClassName("claimada")[0];
    statusEl.innerHTML = status;
    console.log(status);
}

function toclaimADAUSD(status) {
    const statusEl = document.getElementsByClassName("claimadausd")[0];
    statusEl.innerHTML = status;
    console.log(status);
}

function toclaimETH(status) {
    const statusEl = document.getElementsByClassName("claimeth")[0];
    statusEl.innerHTML = status;
    console.log(status);
}

function toclaimETHUSD(status) {
    const statusEl = document.getElementsByClassName("claimethusd")[0];
    statusEl.innerHTML = status;
    console.log(status);
}

function toclaimLINK(status) {
    const statusEl = document.getElementsByClassName("claimlink")[0];
    statusEl.innerHTML = status;
    console.log(status);
}

function toclaimLINKUSD(status) {
    const statusEl = document.getElementsByClassName("claimlinkusd")[0];
    statusEl.innerHTML = status;
    console.log(status);
}

function toclaimPOO(status) {
    const statusEl = document.getElementsByClassName("claimpoo")[0];
    statusEl.innerHTML = status;
    console.log(status);
}

function toclaimPOOUSD(status) {
    const statusEl = document.getElementsByClassName("claimpoousd")[0];
    statusEl.innerHTML = status;
    console.log(status);
}

function toclaimSFM(status) {
    const statusEl = document.getElementsByClassName("claimsfm")[0];
    statusEl.innerHTML = status;
    console.log(status);
}

function toclaimSFMUSD(status) {
    const statusEl = document.getElementsByClassName("claimsfmusd")[0];
    statusEl.innerHTML = status;
    console.log(status);
}



async function getDividentsADA() {
    const test = await window.contractADA.methods.getDividents(currentaccount).call();
	console.log(test);
    toclaimADA(`${numberWithCommas(((((test/1000000000000000000)*bnb)/ada)).toFixed(2))} ADA`);
    toclaimADAUSD(`${numberWithCommas((((test/1000000000000000000)*bnb)).toFixed(2))} USD`);
}

async function getDividentsETH() {
    const test = await window.contractETH.methods.getDividents(currentaccount).call();
    toclaimETH(`${numberWithCommas(((((test/1000000000000000000)*bnb)/eth)*1000).toFixed(2))} mETH`);
    toclaimETHUSD(`${numberWithCommas((((test/1000000000000000000)*bnb)).toFixed(2))} USD`);
}

async function getDividentsLINK() {
    const test = await window.contractLINK.methods.getDividents(currentaccount).call();
    toclaimLINK(`${numberWithCommas(((((test/1000000000000000000)*bnb)/linkc)).toFixed(2))} Link`);
    toclaimLINKUSD(`${numberWithCommas((((test/1000000000000000000)*bnb)).toFixed(2))} USD`);
}

async function getDividentsPOO() {
    const test = await window.contractPOO.methods.getDividents(currentaccount).call();
    toclaimPOO(`${numberWithCommas(((((test/1000000000000000000)*bnb)/poo)).toFixed(2))} Poo`);
    toclaimPOOUSD(`${numberWithCommas((((test/1000000000000000000)*bnb)).toFixed(2))} USD`);
}

async function getDividentsSFM() {
    const test = await window.contractSFM.methods.getDividents(currentaccount).call();
    toclaimSFM(`${numberWithCommas(((((test/1000000000000000000)*bnb)/sfm)/1000000).toFixed(2))} MSFM`);
    toclaimSFMUSD(`${numberWithCommas((((test/1000000000000000000)*bnb)).toFixed(2))} USD`);
}








async function claimADA() {
	window.contractADAWD = await loadContractADAWD();
    window.contractADAWD.methods.ADAWithdraw().send({
        from: currentaccount
    });

}

async function claimETH() {
	window.contractETHWD = await loadContractETHWD();
    window.contractETHWD.methods.ETHWithdraw().send({
        from: currentaccount
    });

}

async function claimLINK() {
	window.contractLINKWD = await loadContractLINKWD();
    window.contractLINKWD.methods.LINKWithdraw().send({
        from: currentaccount
    });

}

async function claimPOO() {
	window.contractPOOWD = await loadContractPOOWD();
    window.contractPOOWD.methods.PoocoinWithdraw().send({
        from: currentaccount
    });

}


async function claimSFM() {
	window.contractSFMWD = await loadContractSFMWD();
    window.contractSFMWD.methods.ADAWithdraw().send({
        from: currentaccount
    });

}













//Load contract
async function loadContractETH() {
   const wweb3 = new Web3(new Web3.providers.HttpProvider('https://bsc-dataseed.binance.org/'));
   const MyContract = new wweb3.eth.Contract(ethcontractAbi, ethcontractAddress);
    return MyContract;
}

async function loadContractLINK() {
   const wweb3 = new Web3(new Web3.providers.HttpProvider('https://bsc-dataseed.binance.org/'));
   const MyContract = new wweb3.eth.Contract(linkcontractAbi, linkcontractAddress);
    return MyContract;
}

async function loadContractSFM() {
   const wweb3 = new Web3(new Web3.providers.HttpProvider('https://bsc-dataseed.binance.org/'));
   const MyContract = new wweb3.eth.Contract(sfmcontractAbi, sfmcontractAddress);
    return MyContract;
}


async function loadContractPOO() {
   const wweb3 = new Web3(new Web3.providers.HttpProvider('https://bsc-dataseed.binance.org/'));
   const MyContract = new wweb3.eth.Contract(poocontractAbi, poocontractAddress);
    return MyContract;
}

async function loadContractADA() {
   const wweb3 = new Web3(new Web3.providers.HttpProvider('https://bsc-dataseed.binance.org/'));
   const MyContract = new wweb3.eth.Contract(adacontractAbi, adacontractAddress);
    return MyContract;
}












//Load contract for wihtdrawals

async function loadContractETHWD() {
  const wdweb3 = new Web3(provider);
  const MyContract = new wdweb3.eth.Contract(ethcontractAbi, ethcontractAddress);
  return MyContract;
}

async function loadContractLINKWD() {
  const wdweb3 = new Web3(provider);
  const MyContract = new wdweb3.eth.Contract(linkcontractAbi, linkcontractAddress);
  return MyContract;
}

async function loadContractSFMWD() {
  const wdweb3 = new Web3(provider);
  const MyContract = new wdweb3.eth.Contract(sfmcontractAbi, sfmcontractAddress);
    return MyContract;
}

async function loadContractPOOWD() {
  const wdweb3 = new Web3(provider);
  const MyContract = new wdweb3.eth.Contract(poocontractAbi, poocontractAddress);
    return MyContract;
}

async function loadContractADAWD() {
  const wdweb3 = new Web3(provider);
  const MyContract = new wdweb3.eth.Contract(adacontractAbi, adacontractAddress);
    return MyContract;
}




function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}



