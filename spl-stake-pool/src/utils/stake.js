"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newStakeAccount = exports.divideBnToNumber = exports.calcLamportsWithdrawAmount = exports.calcPoolTokensForDeposit = exports.prepareWithdrawAccounts = exports.getValidatorListAccount = void 0;
var web3_js_1 = require("@solana/web3.js");
var program_address_1 = require("./program-address");
var bn_js_1 = require("bn.js");
var math_1 = require("./math");
var layouts_1 = require("../layouts");
var constants_1 = require("../constants");
function getValidatorListAccount(connection, pubkey) {
    return __awaiter(this, void 0, void 0, function () {
        var account;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connection.getAccountInfo(pubkey)];
                case 1:
                    account = _a.sent();
                    if (!account) {
                        throw new Error('Invalid validator list account');
                    }
                    return [2 /*return*/, {
                            pubkey: pubkey,
                            account: {
                                data: layouts_1.ValidatorListLayout.decode(account === null || account === void 0 ? void 0 : account.data),
                                executable: account.executable,
                                lamports: account.lamports,
                                owner: account.owner,
                            },
                        }];
            }
        });
    });
}
exports.getValidatorListAccount = getValidatorListAccount;
function prepareWithdrawAccounts(connection, stakePool, stakePoolAddress, amount, compareFn, skipFee) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var validatorListAcc, validatorList, minBalanceForRentExemption, minBalance, accounts, _i, _c, validator, stakeAccountAddress, isPreferred, transientStakeLamports, transientStakeAccountAddress, reserveStake, reserveStakeBalance, withdrawFrom, remainingAmount, fee, inverseFee, _loop_1, _d, _e, type, state_1;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0: return [4 /*yield*/, connection.getAccountInfo(stakePool.validatorList)];
                case 1:
                    validatorListAcc = _f.sent();
                    validatorList = layouts_1.ValidatorListLayout.decode(validatorListAcc === null || validatorListAcc === void 0 ? void 0 : validatorListAcc.data);
                    if (!(validatorList === null || validatorList === void 0 ? void 0 : validatorList.validators) || (validatorList === null || validatorList === void 0 ? void 0 : validatorList.validators.length) == 0) {
                        throw new Error('No accounts found');
                    }
                    return [4 /*yield*/, connection.getMinimumBalanceForRentExemption(web3_js_1.StakeProgram.space)];
                case 2:
                    minBalanceForRentExemption = _f.sent();
                    minBalance = minBalanceForRentExemption + constants_1.MINIMUM_ACTIVE_STAKE;
                    accounts = [];
                    _i = 0, _c = validatorList.validators;
                    _f.label = 3;
                case 3:
                    if (!(_i < _c.length)) return [3 /*break*/, 7];
                    validator = _c[_i];
                    if (validator.status !== layouts_1.ValidatorStakeInfoStatus.Active) {
                        return [3 /*break*/, 6];
                    }
                    return [4 /*yield*/, (0, program_address_1.findStakeProgramAddress)(constants_1.STAKE_POOL_PROGRAM_ID, validator.voteAccountAddress, stakePoolAddress)];
                case 4:
                    stakeAccountAddress = _f.sent();
                    if (!validator.activeStakeLamports.isZero()) {
                        isPreferred = (_a = stakePool === null || stakePool === void 0 ? void 0 : stakePool.preferredWithdrawValidatorVoteAddress) === null || _a === void 0 ? void 0 : _a.equals(validator.voteAccountAddress);
                        accounts.push({
                            type: isPreferred ? 'preferred' : 'active',
                            voteAddress: validator.voteAccountAddress,
                            stakeAddress: stakeAccountAddress,
                            lamports: validator.activeStakeLamports.toNumber(),
                        });
                    }
                    transientStakeLamports = validator.transientStakeLamports.toNumber() - minBalance;
                    if (!(transientStakeLamports > 0)) return [3 /*break*/, 6];
                    return [4 /*yield*/, (0, program_address_1.findTransientStakeProgramAddress)(constants_1.STAKE_POOL_PROGRAM_ID, validator.voteAccountAddress, stakePoolAddress, validator.transientSeedSuffixStart)];
                case 5:
                    transientStakeAccountAddress = _f.sent();
                    accounts.push({
                        type: 'transient',
                        voteAddress: validator.voteAccountAddress,
                        stakeAddress: transientStakeAccountAddress,
                        lamports: transientStakeLamports,
                    });
                    _f.label = 6;
                case 6:
                    _i++;
                    return [3 /*break*/, 3];
                case 7:
                    // Sort from highest to lowest balance
                    accounts = accounts.sort(compareFn ? compareFn : function (a, b) { return b.lamports - a.lamports; });
                    return [4 /*yield*/, connection.getAccountInfo(stakePool.reserveStake)];
                case 8:
                    reserveStake = _f.sent();
                    reserveStakeBalance = ((_b = reserveStake === null || reserveStake === void 0 ? void 0 : reserveStake.lamports) !== null && _b !== void 0 ? _b : 0) - minBalanceForRentExemption;
                    if (reserveStakeBalance > 0) {
                        accounts.push({
                            type: 'reserve',
                            stakeAddress: stakePool.reserveStake,
                            lamports: reserveStakeBalance,
                        });
                    }
                    withdrawFrom = [];
                    remainingAmount = amount;
                    fee = stakePool.stakeWithdrawalFee;
                    inverseFee = {
                        numerator: fee.denominator.sub(fee.numerator),
                        denominator: fee.denominator,
                    };
                    _loop_1 = function (type) {
                        var filteredAccounts = accounts.filter(function (a) { return a.type == type; });
                        for (var _g = 0, filteredAccounts_1 = filteredAccounts; _g < filteredAccounts_1.length; _g++) {
                            var _h = filteredAccounts_1[_g], stakeAddress = _h.stakeAddress, voteAddress = _h.voteAddress, lamports = _h.lamports;
                            if (lamports <= minBalance && type == 'transient') {
                                continue;
                            }
                            var availableForWithdrawal = calcPoolTokensForDeposit(stakePool, lamports);
                            if (!skipFee && !inverseFee.numerator.isZero()) {
                                availableForWithdrawal = divideBnToNumber(new bn_js_1.default(availableForWithdrawal).mul(inverseFee.denominator), inverseFee.numerator);
                            }
                            var poolAmount = Math.min(availableForWithdrawal, remainingAmount);
                            if (poolAmount <= 0) {
                                continue;
                            }
                            // Those accounts will be withdrawn completely with `claim` instruction
                            withdrawFrom.push({ stakeAddress: stakeAddress, voteAddress: voteAddress, poolAmount: poolAmount });
                            remainingAmount -= poolAmount;
                            if (remainingAmount == 0) {
                                break;
                            }
                        }
                        if (remainingAmount == 0) {
                            return "break";
                        }
                    };
                    for (_d = 0, _e = ['preferred', 'active', 'transient', 'reserve']; _d < _e.length; _d++) {
                        type = _e[_d];
                        state_1 = _loop_1(type);
                        if (state_1 === "break")
                            break;
                    }
                    // Not enough stake to withdraw the specified amount
                    if (remainingAmount > 0) {
                        throw new Error("No stake accounts found in this pool with enough balance to withdraw ".concat((0, math_1.lamportsToSol)(amount), " pool tokens."));
                    }
                    return [2 /*return*/, withdrawFrom];
            }
        });
    });
}
exports.prepareWithdrawAccounts = prepareWithdrawAccounts;
/**
 * Calculate the pool tokens that should be minted for a deposit of `stakeLamports`
 */
function calcPoolTokensForDeposit(stakePool, stakeLamports) {
    if (stakePool.poolTokenSupply.isZero() || stakePool.totalLamports.isZero()) {
        return stakeLamports;
    }
    return Math.floor(divideBnToNumber(new bn_js_1.default(stakeLamports).mul(stakePool.poolTokenSupply), stakePool.totalLamports));
}
exports.calcPoolTokensForDeposit = calcPoolTokensForDeposit;
/**
 * Calculate lamports amount on withdrawal
 */
function calcLamportsWithdrawAmount(stakePool, poolTokens) {
    var numerator = new bn_js_1.default(poolTokens).mul(stakePool.totalLamports);
    var denominator = stakePool.poolTokenSupply;
    if (numerator.lt(denominator)) {
        return 0;
    }
    return divideBnToNumber(numerator, denominator);
}
exports.calcLamportsWithdrawAmount = calcLamportsWithdrawAmount;
function divideBnToNumber(numerator, denominator) {
    if (denominator.isZero()) {
        return 0;
    }
    var quotient = numerator.div(denominator).toNumber();
    var rem = numerator.umod(denominator);
    var gcd = rem.gcd(denominator);
    return quotient + rem.div(gcd).toNumber() / denominator.div(gcd).toNumber();
}
exports.divideBnToNumber = divideBnToNumber;
function newStakeAccount(feePayer, instructions, lamports) {
    // Account for tokens not specified, creating one
    var stakeReceiverKeypair = web3_js_1.Keypair.generate();
    console.log("Creating account to receive stake ".concat(stakeReceiverKeypair.publicKey));
    instructions.push(
    // Creating new account
    web3_js_1.SystemProgram.createAccount({
        fromPubkey: feePayer,
        newAccountPubkey: stakeReceiverKeypair.publicKey,
        lamports: lamports,
        space: web3_js_1.StakeProgram.space,
        programId: web3_js_1.StakeProgram.programId,
    }));
    return stakeReceiverKeypair;
}
exports.newStakeAccount = newStakeAccount;
