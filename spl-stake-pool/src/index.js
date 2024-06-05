"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
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
exports.updatePoolTokenMetadata = exports.createPoolTokenMetadata = exports.redelegate = exports.stakePoolInfo = exports.updateStakePool = exports.decreaseValidatorStake = exports.increaseValidatorStake = exports.withdrawSol = exports.withdrawStake = exports.depositSol = exports.depositStake = exports.getStakePoolAccounts = exports.getStakeAccount = exports.getStakePoolAccount = exports.STAKE_POOL_PROGRAM_ID = void 0;
var web3_js_1 = require("@solana/web3.js");
var spl_token_1 = require("@solana/spl-token");
var utils_1 = require("./utils");
var instructions_1 = require("./instructions");
var layouts_1 = require("./layouts");
var constants_1 = require("./constants");
var superstruct_1 = require("superstruct");
var bn_js_1 = require("bn.js");
var constants_2 = require("./constants");
Object.defineProperty(exports, "STAKE_POOL_PROGRAM_ID", { enumerable: true, get: function () { return constants_2.STAKE_POOL_PROGRAM_ID; } });
__exportStar(require("./instructions"), exports);
/**
 * Retrieves and deserializes a StakePool account using a web3js connection and the stake pool address.
 * @param connection: An active web3js connection.
 * @param stakePoolAddress: The public key (address) of the stake pool account.
 */
function getStakePoolAccount(connection, stakePoolAddress) {
    return __awaiter(this, void 0, void 0, function () {
        var account;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, connection.getAccountInfo(stakePoolAddress)];
                case 1:
                    account = _c.sent();
                    if (!account) {
                        throw new Error('Invalid stake pool account');
                    }
                    return [2 /*return*/, {
                            pubkey: stakePoolAddress,
                            account: {
                                data: layouts_1.StakePoolLayout.decode(account.data),
                                executable: account.executable,
                                lamports: account.lamports,
                                owner: account.owner,
                            },
                        }];
            }
        });
    });
}
exports.getStakePoolAccount = getStakePoolAccount;
/**
 * Retrieves and deserializes a Stake account using a web3js connection and the stake address.
 * @param connection: An active web3js connection.
 * @param stakeAccount: The public key (address) of the stake account.
 */
function getStakeAccount(connection, stakeAccount) {
    return __awaiter(this, void 0, void 0, function () {
        var result, program, parsed;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, connection.getParsedAccountInfo(stakeAccount)];
                case 1:
                    result = (_c.sent()).value;
                    if (!result || !('parsed' in result.data)) {
                        throw new Error('Invalid stake account');
                    }
                    program = result.data.program;
                    if (program != 'stake') {
                        throw new Error('Not a stake account');
                    }
                    parsed = (0, superstruct_1.create)(result.data.parsed, layouts_1.StakeAccount);
                    return [2 /*return*/, parsed];
            }
        });
    });
}
exports.getStakeAccount = getStakeAccount;
/**
 * Retrieves all StakePool and ValidatorList accounts that are running a particular StakePool program.
 * @param connection: An active web3js connection.
 * @param stakePoolProgramAddress: The public key (address) of the StakePool program.
 */
function getStakePoolAccounts(connection, stakePoolProgramAddress) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, connection.getProgramAccounts(stakePoolProgramAddress)];
                case 1:
                    response = _c.sent();
                    return [2 /*return*/, response.map(function (a) {
                            var decodedData;
                            if (a.account.data.readUInt8() === 1) {
                                try {
                                    decodedData = layouts_1.StakePoolLayout.decode(a.account.data);
                                }
                                catch (error) {
                                    console.log('Could not decode StakeAccount. Error:', error);
                                    decodedData = undefined;
                                }
                            }
                            else if (a.account.data.readUInt8() === 2) {
                                try {
                                    decodedData = layouts_1.ValidatorListLayout.decode(a.account.data);
                                }
                                catch (error) {
                                    console.log('Could not decode ValidatorList. Error:', error);
                                    decodedData = undefined;
                                }
                            }
                            else {
                                console.error("Could not decode. StakePoolAccount Enum is ".concat(a.account.data.readUInt8(), ", expected 1 or 2!"));
                                decodedData = undefined;
                            }
                            return {
                                pubkey: a.pubkey,
                                account: {
                                    data: decodedData,
                                    executable: a.account.executable,
                                    lamports: a.account.lamports,
                                    owner: a.account.owner,
                                },
                            };
                        })];
            }
        });
    });
}
exports.getStakePoolAccounts = getStakePoolAccounts;
/**
 * Creates instructions required to deposit stake to stake pool.
 */
function depositStake(connection, stakePoolAddress, authorizedPubkey, validatorVote, depositStake, poolTokenReceiverAccount) {
    return __awaiter(this, void 0, void 0, function () {
        var stakePool, withdrawAuthority, validatorStake, instructions, signers, poolMint, associatedAddress;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, getStakePoolAccount(connection, stakePoolAddress)];
                case 1:
                    stakePool = _c.sent();
                    return [4 /*yield*/, (0, utils_1.findWithdrawAuthorityProgramAddress)(constants_1.STAKE_POOL_PROGRAM_ID, stakePoolAddress)];
                case 2:
                    withdrawAuthority = _c.sent();
                    return [4 /*yield*/, (0, utils_1.findStakeProgramAddress)(constants_1.STAKE_POOL_PROGRAM_ID, validatorVote, stakePoolAddress)];
                case 3:
                    validatorStake = _c.sent();
                    instructions = [];
                    signers = [];
                    poolMint = stakePool.account.data.poolMint;
                    // Create token account if not specified
                    if (!poolTokenReceiverAccount) {
                        associatedAddress = (0, spl_token_1.getAssociatedTokenAddressSync)(poolMint, authorizedPubkey, true, spl_token_1.TOKEN_2022_PROGRAM_ID);
                        instructions.push((0, spl_token_1.createAssociatedTokenAccountIdempotentInstruction)(authorizedPubkey, associatedAddress, authorizedPubkey, poolMint));
                        poolTokenReceiverAccount = associatedAddress;
                    }
                    instructions.push.apply(instructions, web3_js_1.StakeProgram.authorize({
                        stakePubkey: depositStake,
                        authorizedPubkey: authorizedPubkey,
                        newAuthorizedPubkey: stakePool.account.data.stakeDepositAuthority,
                        stakeAuthorizationType: web3_js_1.StakeAuthorizationLayout.Staker,
                    }).instructions);
                    instructions.push.apply(instructions, web3_js_1.StakeProgram.authorize({
                        stakePubkey: depositStake,
                        authorizedPubkey: authorizedPubkey,
                        newAuthorizedPubkey: stakePool.account.data.stakeDepositAuthority,
                        stakeAuthorizationType: web3_js_1.StakeAuthorizationLayout.Withdrawer,
                    }).instructions);
                    instructions.push(instructions_1.StakePoolInstruction.depositStake({
                        stakePool: stakePoolAddress,
                        validatorList: stakePool.account.data.validatorList,
                        depositAuthority: stakePool.account.data.stakeDepositAuthority,
                        reserveStake: stakePool.account.data.reserveStake,
                        managerFeeAccount: stakePool.account.data.managerFeeAccount,
                        referralPoolAccount: poolTokenReceiverAccount,
                        destinationPoolAccount: poolTokenReceiverAccount,
                        withdrawAuthority: withdrawAuthority,
                        depositStake: depositStake,
                        validatorStake: validatorStake,
                        poolMint: poolMint,
                    }));
                    return [2 /*return*/, {
                            instructions: instructions,
                            signers: signers,
                        }];
            }
        });
    });
}
exports.depositStake = depositStake;
/**
 * Creates instructions required to deposit sol to stake pool.
 */
function depositSol(connection, stakePoolAddress, from, lamports, destinationTokenAccount, referrerTokenAccount, depositAuthority) {
    return __awaiter(this, void 0, void 0, function () {
        var fromBalance, stakePoolAccount, stakePool, userSolTransfer, signers, instructions, associatedAddress, withdrawAuthority;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, connection.getBalance(from, 'confirmed')];
                case 1:
                    fromBalance = _c.sent();
                    if (fromBalance < lamports) {
                        throw new Error("Not enough SOL to deposit into pool. Maximum deposit amount is ".concat((0, utils_1.lamportsToSol)(fromBalance), " SOL."));
                    }
                    return [4 /*yield*/, getStakePoolAccount(connection, stakePoolAddress)];
                case 2:
                    stakePoolAccount = _c.sent();
                    stakePool = stakePoolAccount.account.data;
                    userSolTransfer = new web3_js_1.Keypair();
                    signers = [userSolTransfer];
                    instructions = [];
                    // Create the ephemeral SOL account
                    instructions.push(web3_js_1.SystemProgram.transfer({
                        fromPubkey: from,
                        toPubkey: userSolTransfer.publicKey,
                        lamports: lamports,
                    }));
                    // Create token account if not specified
                    if (!destinationTokenAccount) {
                        associatedAddress = (0, spl_token_1.getAssociatedTokenAddressSync)(stakePool.poolMint, from, true, spl_token_1.TOKEN_2022_PROGRAM_ID);
                        instructions.push((0, spl_token_1.createAssociatedTokenAccountIdempotentInstruction)(from, associatedAddress, from, stakePool.poolMint, spl_token_1.TOKEN_2022_PROGRAM_ID));
                        destinationTokenAccount = associatedAddress;
                    }
                    return [4 /*yield*/, (0, utils_1.findWithdrawAuthorityProgramAddress)(constants_1.STAKE_POOL_PROGRAM_ID, stakePoolAddress)];
                case 3:
                    withdrawAuthority = _c.sent();
                    instructions.push(instructions_1.StakePoolInstruction.depositSol({
                        stakePool: stakePoolAddress,
                        reserveStake: stakePool.reserveStake,
                        fundingAccount: userSolTransfer.publicKey,
                        destinationPoolAccount: destinationTokenAccount,
                        managerFeeAccount: stakePool.managerFeeAccount,
                        referralPoolAccount: referrerTokenAccount !== null && referrerTokenAccount !== void 0 ? referrerTokenAccount : destinationTokenAccount,
                        poolMint: stakePool.poolMint,
                        lamports: lamports,
                        withdrawAuthority: withdrawAuthority,
                        depositAuthority: depositAuthority,
                    }));
                    return [2 /*return*/, {
                            instructions: instructions,
                            signers: signers,
                        }];
            }
        });
    });
}
exports.depositSol = depositSol;
/**
 * Creates instructions required to withdraw stake from a stake pool.
 */
function withdrawStake(connection, stakePoolAddress, tokenOwner, amount, useReserve, voteAccountAddress, stakeReceiver, poolTokenAccount, validatorComparator) {
    var _c, _d, _e, _f;
    if (useReserve === void 0) { useReserve = false; }
    return __awaiter(this, void 0, void 0, function () {
        var stakePool, poolAmount, tokenAccount, stakeAccountRentExemption, withdrawAuthority, stakeReceiverAccount, withdrawAccounts, voteAccount_1, validatorListAccount, validatorList, isValidVoter, stakeAccountAddress, stakeAccount, availableForWithdrawal, stakeAccountAddress, stakeAccount, availableForWithdrawal, _g, _h, _j, instructions, userTransferAuthority, signers, totalRentFreeBalances, maxWithdrawAccounts, i, _i, withdrawAccounts_1, withdrawAccount, solWithdrawAmount, infoMsg, stakeToReceive, stakeKeypair;
        return __generator(this, function (_k) {
            switch (_k.label) {
                case 0: return [4 /*yield*/, getStakePoolAccount(connection, stakePoolAddress)];
                case 1:
                    stakePool = _k.sent();
                    poolAmount = (0, utils_1.solToLamports)(amount);
                    if (!poolTokenAccount) {
                        poolTokenAccount = (0, spl_token_1.getAssociatedTokenAddressSync)(stakePool.account.data.poolMint, tokenOwner, true, spl_token_1.TOKEN_2022_PROGRAM_ID);
                    }
                    return [4 /*yield*/, (0, spl_token_1.getAccount)(connection, poolTokenAccount)];
                case 2:
                    tokenAccount = _k.sent();
                    // Check withdrawFrom balance
                    if (tokenAccount.amount < poolAmount) {
                        throw new Error("Not enough token balance to withdraw ".concat((0, utils_1.lamportsToSol)(poolAmount), " pool tokens.\n        Maximum withdraw amount is ").concat((0, utils_1.lamportsToSol)(tokenAccount.amount), " pool tokens."));
                    }
                    return [4 /*yield*/, connection.getMinimumBalanceForRentExemption(web3_js_1.StakeProgram.space)];
                case 3:
                    stakeAccountRentExemption = _k.sent();
                    return [4 /*yield*/, (0, utils_1.findWithdrawAuthorityProgramAddress)(constants_1.STAKE_POOL_PROGRAM_ID, stakePoolAddress)];
                case 4:
                    withdrawAuthority = _k.sent();
                    stakeReceiverAccount = null;
                    if (!stakeReceiver) return [3 /*break*/, 6];
                    return [4 /*yield*/, getStakeAccount(connection, stakeReceiver)];
                case 5:
                    // @ts-ignore
                    stakeReceiverAccount = _k.sent();
                    _k.label = 6;
                case 6:
                    withdrawAccounts = [];
                    if (!useReserve) return [3 /*break*/, 7];
                    withdrawAccounts.push({
                        stakeAddress: stakePool.account.data.reserveStake,
                        voteAddress: undefined,
                        poolAmount: poolAmount,
                    });
                    return [3 /*break*/, 18];
                case 7:
                    if (!(stakeReceiverAccount && (stakeReceiverAccount === null || stakeReceiverAccount === void 0 ? void 0 : stakeReceiverAccount.type) == 'delegated')) return [3 /*break*/, 13];
                    voteAccount_1 = (_d = (_c = stakeReceiverAccount.info) === null || _c === void 0 ? void 0 : _c.stake) === null || _d === void 0 ? void 0 : _d.delegation.voter;
                    if (!voteAccount_1)
                        throw new Error("Invalid stake reciever ".concat(stakeReceiver, " delegation"));
                    return [4 /*yield*/, connection.getAccountInfo(stakePool.account.data.validatorList)];
                case 8:
                    validatorListAccount = _k.sent();
                    validatorList = layouts_1.ValidatorListLayout.decode(validatorListAccount === null || validatorListAccount === void 0 ? void 0 : validatorListAccount.data);
                    isValidVoter = validatorList.validators.find(function (val) {
                        return val.voteAccountAddress.equals(voteAccount_1);
                    });
                    if (voteAccountAddress && voteAccountAddress !== voteAccount_1) {
                        throw new Error("Provided withdrawal vote account ".concat(voteAccountAddress, " does not match delegation on stake receiver account ").concat(voteAccount_1, ",\n      remove this flag or provide a different stake account delegated to ").concat(voteAccountAddress));
                    }
                    if (!isValidVoter) return [3 /*break*/, 11];
                    return [4 /*yield*/, (0, utils_1.findStakeProgramAddress)(constants_1.STAKE_POOL_PROGRAM_ID, voteAccount_1, stakePoolAddress)];
                case 9:
                    stakeAccountAddress = _k.sent();
                    return [4 /*yield*/, connection.getAccountInfo(stakeAccountAddress)];
                case 10:
                    stakeAccount = _k.sent();
                    if (!stakeAccount) {
                        throw new Error("Preferred withdraw valdator's stake account is invalid");
                    }
                    availableForWithdrawal = (0, utils_1.calcLamportsWithdrawAmount)(stakePool.account.data, stakeAccount.lamports - constants_1.MINIMUM_ACTIVE_STAKE - stakeAccountRentExemption);
                    if (availableForWithdrawal < poolAmount) {
                        throw new Error("Not enough lamports available for withdrawal from ".concat(stakeAccountAddress, ",\n            ").concat(poolAmount, " asked, ").concat(availableForWithdrawal, " available."));
                    }
                    withdrawAccounts.push({
                        stakeAddress: stakeAccountAddress,
                        voteAddress: voteAccount_1,
                        poolAmount: poolAmount,
                    });
                    return [3 /*break*/, 12];
                case 11: throw new Error("Provided stake account is delegated to a vote account ".concat(voteAccount_1, " which does not exist in the stake pool"));
                case 12: return [3 /*break*/, 18];
                case 13:
                    if (!voteAccountAddress) return [3 /*break*/, 16];
                    return [4 /*yield*/, (0, utils_1.findStakeProgramAddress)(constants_1.STAKE_POOL_PROGRAM_ID, voteAccountAddress, stakePoolAddress)];
                case 14:
                    stakeAccountAddress = _k.sent();
                    return [4 /*yield*/, connection.getAccountInfo(stakeAccountAddress)];
                case 15:
                    stakeAccount = _k.sent();
                    if (!stakeAccount) {
                        throw new Error('Invalid Stake Account');
                    }
                    availableForWithdrawal = (0, utils_1.calcLamportsWithdrawAmount)(stakePool.account.data, stakeAccount.lamports - constants_1.MINIMUM_ACTIVE_STAKE - stakeAccountRentExemption);
                    if (availableForWithdrawal < poolAmount) {
                        // noinspection ExceptionCaughtLocallyJS
                        throw new Error("Not enough lamports available for withdrawal from ".concat(stakeAccountAddress, ",\n          ").concat(poolAmount, " asked, ").concat(availableForWithdrawal, " available."));
                    }
                    withdrawAccounts.push({
                        stakeAddress: stakeAccountAddress,
                        voteAddress: voteAccountAddress,
                        poolAmount: poolAmount,
                    });
                    return [3 /*break*/, 18];
                case 16:
                    _h = 
                    // Get the list of accounts to withdraw from
                    (_g = withdrawAccounts.push).apply;
                    _j = [
                        // Get the list of accounts to withdraw from
                        withdrawAccounts];
                    return [4 /*yield*/, (0, utils_1.prepareWithdrawAccounts)(connection, stakePool.account.data, stakePoolAddress, poolAmount, validatorComparator, poolTokenAccount.equals(stakePool.account.data.managerFeeAccount))];
                case 17:
                    // Get the list of accounts to withdraw from
                    _h.apply(_g, _j.concat([(_k.sent())]));
                    _k.label = 18;
                case 18:
                    instructions = [];
                    userTransferAuthority = web3_js_1.Keypair.generate();
                    signers = [userTransferAuthority];
                    instructions.push((0, spl_token_1.createApproveInstruction)(poolTokenAccount, userTransferAuthority.publicKey, tokenOwner, poolAmount));
                    totalRentFreeBalances = 0;
                    maxWithdrawAccounts = 5;
                    i = 0;
                    // Go through prepared accounts and withdraw/claim them
                    for (_i = 0, withdrawAccounts_1 = withdrawAccounts; _i < withdrawAccounts_1.length; _i++) {
                        withdrawAccount = withdrawAccounts_1[_i];
                        if (i > maxWithdrawAccounts) {
                            break;
                        }
                        solWithdrawAmount = Math.ceil((0, utils_1.calcLamportsWithdrawAmount)(stakePool.account.data, withdrawAccount.poolAmount));
                        infoMsg = "Withdrawing \u25CE".concat(solWithdrawAmount, ",\n      from stake account ").concat((_e = withdrawAccount.stakeAddress) === null || _e === void 0 ? void 0 : _e.toBase58());
                        if (withdrawAccount.voteAddress) {
                            infoMsg = "".concat(infoMsg, ", delegated to ").concat((_f = withdrawAccount.voteAddress) === null || _f === void 0 ? void 0 : _f.toBase58());
                        }
                        console.info(infoMsg);
                        stakeToReceive = void 0;
                        // @ts-ignore
                        if (!stakeReceiver || (stakeReceiverAccount && stakeReceiverAccount.type === 'delegated')) {
                            stakeKeypair = (0, utils_1.newStakeAccount)(tokenOwner, instructions, stakeAccountRentExemption);
                            signers.push(stakeKeypair);
                            totalRentFreeBalances += stakeAccountRentExemption;
                            stakeToReceive = stakeKeypair.publicKey;
                        }
                        else {
                            stakeToReceive = stakeReceiver;
                        }
                        instructions.push(instructions_1.StakePoolInstruction.withdrawStake({
                            stakePool: stakePoolAddress,
                            validatorList: stakePool.account.data.validatorList,
                            validatorStake: withdrawAccount.stakeAddress,
                            destinationStake: stakeToReceive,
                            destinationStakeAuthority: tokenOwner,
                            sourceTransferAuthority: userTransferAuthority.publicKey,
                            sourcePoolAccount: poolTokenAccount,
                            managerFeeAccount: stakePool.account.data.managerFeeAccount,
                            poolMint: stakePool.account.data.poolMint,
                            poolTokens: withdrawAccount.poolAmount,
                            withdrawAuthority: withdrawAuthority,
                        }));
                        i++;
                    }
                    // @ts-ignore
                    if (stakeReceiver && stakeReceiverAccount && stakeReceiverAccount.type === 'delegated') {
                        signers.forEach(function (newStakeKeypair) {
                            instructions.concat(web3_js_1.StakeProgram.merge({
                                stakePubkey: stakeReceiver,
                                sourceStakePubKey: newStakeKeypair.publicKey,
                                authorizedPubkey: tokenOwner,
                            }).instructions);
                        });
                    }
                    return [2 /*return*/, {
                            instructions: instructions,
                            signers: signers,
                            stakeReceiver: stakeReceiver,
                            totalRentFreeBalances: totalRentFreeBalances,
                        }];
            }
        });
    });
}
exports.withdrawStake = withdrawStake;
/**
 * Creates instructions required to withdraw SOL directly from a stake pool.
 */
function withdrawSol(connection, stakePoolAddress, tokenOwner, solReceiver, amount, solWithdrawAuthority) {
    return __awaiter(this, void 0, void 0, function () {
        var stakePool, poolAmount, poolTokenAccount, tokenAccount, instructions, userTransferAuthority, signers, poolWithdrawAuthority, expectedSolWithdrawAuthority, withdrawTransaction;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, getStakePoolAccount(connection, stakePoolAddress)];
                case 1:
                    stakePool = _c.sent();
                    poolAmount = (0, utils_1.solToLamports)(amount);
                    poolTokenAccount = (0, spl_token_1.getAssociatedTokenAddressSync)(stakePool.account.data.poolMint, tokenOwner, true, spl_token_1.TOKEN_2022_PROGRAM_ID);
                    return [4 /*yield*/, (0, spl_token_1.getAccount)(connection, poolTokenAccount)];
                case 2:
                    tokenAccount = _c.sent();
                    // Check withdrawFrom balance
                    if (tokenAccount.amount < poolAmount) {
                        throw new Error("Not enough token balance to withdraw ".concat((0, utils_1.lamportsToSol)(poolAmount), " pool tokens.\n          Maximum withdraw amount is ").concat((0, utils_1.lamportsToSol)(tokenAccount.amount), " pool tokens."));
                    }
                    instructions = [];
                    userTransferAuthority = web3_js_1.Keypair.generate();
                    signers = [userTransferAuthority];
                    instructions.push((0, spl_token_1.createApproveInstruction)(poolTokenAccount, userTransferAuthority.publicKey, tokenOwner, poolAmount));
                    return [4 /*yield*/, (0, utils_1.findWithdrawAuthorityProgramAddress)(constants_1.STAKE_POOL_PROGRAM_ID, stakePoolAddress)];
                case 3:
                    poolWithdrawAuthority = _c.sent();
                    if (solWithdrawAuthority) {
                        expectedSolWithdrawAuthority = stakePool.account.data.solWithdrawAuthority;
                        if (!expectedSolWithdrawAuthority) {
                            throw new Error('SOL withdraw authority specified in arguments but stake pool has none');
                        }
                        if (solWithdrawAuthority.toBase58() != expectedSolWithdrawAuthority.toBase58()) {
                            throw new Error("Invalid deposit withdraw specified, expected ".concat(expectedSolWithdrawAuthority.toBase58(), ", received ").concat(solWithdrawAuthority.toBase58()));
                        }
                    }
                    withdrawTransaction = instructions_1.StakePoolInstruction.withdrawSol({
                        stakePool: stakePoolAddress,
                        withdrawAuthority: poolWithdrawAuthority,
                        reserveStake: stakePool.account.data.reserveStake,
                        sourcePoolAccount: poolTokenAccount,
                        sourceTransferAuthority: userTransferAuthority.publicKey,
                        destinationSystemAccount: solReceiver,
                        managerFeeAccount: stakePool.account.data.managerFeeAccount,
                        poolMint: stakePool.account.data.poolMint,
                        poolTokens: poolAmount,
                        solWithdrawAuthority: solWithdrawAuthority,
                    });
                    instructions.push(withdrawTransaction);
                    return [2 /*return*/, {
                            instructions: instructions,
                            signers: signers,
                        }];
            }
        });
    });
}
exports.withdrawSol = withdrawSol;
/**
 * Creates instructions required to increase validator stake.
 */
function increaseValidatorStake(connection, stakePoolAddress, validatorVote, lamports, ephemeralStakeSeed) {
    return __awaiter(this, void 0, void 0, function () {
        var stakePool, validatorList, validatorInfo, withdrawAuthority, transientStakeSeed, transientStake, validatorStake, instructions, ephemeralStake;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, getStakePoolAccount(connection, stakePoolAddress)];
                case 1:
                    stakePool = _c.sent();
                    return [4 /*yield*/, (0, utils_1.getValidatorListAccount)(connection, stakePool.account.data.validatorList)];
                case 2:
                    validatorList = _c.sent();
                    validatorInfo = validatorList.account.data.validators.find(function (v) { return v.voteAccountAddress.toBase58() == validatorVote.toBase58(); });
                    if (!validatorInfo) {
                        throw new Error('Vote account not found in validator list');
                    }
                    return [4 /*yield*/, (0, utils_1.findWithdrawAuthorityProgramAddress)(constants_1.STAKE_POOL_PROGRAM_ID, stakePoolAddress)];
                case 3:
                    withdrawAuthority = _c.sent();
                    transientStakeSeed = validatorInfo.transientSeedSuffixStart.addn(1);
                    return [4 /*yield*/, (0, utils_1.findTransientStakeProgramAddress)(constants_1.STAKE_POOL_PROGRAM_ID, validatorInfo.voteAccountAddress, stakePoolAddress, transientStakeSeed)];
                case 4:
                    transientStake = _c.sent();
                    return [4 /*yield*/, (0, utils_1.findStakeProgramAddress)(constants_1.STAKE_POOL_PROGRAM_ID, validatorInfo.voteAccountAddress, stakePoolAddress)];
                case 5:
                    validatorStake = _c.sent();
                    instructions = [];
                    if (!(ephemeralStakeSeed != undefined)) return [3 /*break*/, 7];
                    return [4 /*yield*/, (0, utils_1.findEphemeralStakeProgramAddress)(constants_1.STAKE_POOL_PROGRAM_ID, stakePoolAddress, new bn_js_1.default(ephemeralStakeSeed))];
                case 6:
                    ephemeralStake = _c.sent();
                    instructions_1.StakePoolInstruction.increaseAdditionalValidatorStake({
                        stakePool: stakePoolAddress,
                        staker: stakePool.account.data.staker,
                        validatorList: stakePool.account.data.validatorList,
                        reserveStake: stakePool.account.data.reserveStake,
                        transientStakeSeed: transientStakeSeed.toNumber(),
                        withdrawAuthority: withdrawAuthority,
                        transientStake: transientStake,
                        validatorStake: validatorStake,
                        validatorVote: validatorVote,
                        lamports: lamports,
                        ephemeralStake: ephemeralStake,
                        ephemeralStakeSeed: ephemeralStakeSeed,
                    });
                    return [3 /*break*/, 8];
                case 7:
                    instructions.push(instructions_1.StakePoolInstruction.increaseValidatorStake({
                        stakePool: stakePoolAddress,
                        staker: stakePool.account.data.staker,
                        validatorList: stakePool.account.data.validatorList,
                        reserveStake: stakePool.account.data.reserveStake,
                        transientStakeSeed: transientStakeSeed.toNumber(),
                        withdrawAuthority: withdrawAuthority,
                        transientStake: transientStake,
                        validatorStake: validatorStake,
                        validatorVote: validatorVote,
                        lamports: lamports,
                    }));
                    _c.label = 8;
                case 8: return [2 /*return*/, {
                        instructions: instructions,
                    }];
            }
        });
    });
}
exports.increaseValidatorStake = increaseValidatorStake;
/**
 * Creates instructions required to decrease validator stake.
 */
function decreaseValidatorStake(connection, stakePoolAddress, validatorVote, lamports, ephemeralStakeSeed) {
    return __awaiter(this, void 0, void 0, function () {
        var stakePool, validatorList, validatorInfo, withdrawAuthority, validatorStake, transientStakeSeed, transientStake, instructions, ephemeralStake;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, getStakePoolAccount(connection, stakePoolAddress)];
                case 1:
                    stakePool = _c.sent();
                    return [4 /*yield*/, (0, utils_1.getValidatorListAccount)(connection, stakePool.account.data.validatorList)];
                case 2:
                    validatorList = _c.sent();
                    validatorInfo = validatorList.account.data.validators.find(function (v) { return v.voteAccountAddress.toBase58() == validatorVote.toBase58(); });
                    if (!validatorInfo) {
                        throw new Error('Vote account not found in validator list');
                    }
                    return [4 /*yield*/, (0, utils_1.findWithdrawAuthorityProgramAddress)(constants_1.STAKE_POOL_PROGRAM_ID, stakePoolAddress)];
                case 3:
                    withdrawAuthority = _c.sent();
                    return [4 /*yield*/, (0, utils_1.findStakeProgramAddress)(constants_1.STAKE_POOL_PROGRAM_ID, validatorInfo.voteAccountAddress, stakePoolAddress)];
                case 4:
                    validatorStake = _c.sent();
                    transientStakeSeed = validatorInfo.transientSeedSuffixStart.addn(1);
                    return [4 /*yield*/, (0, utils_1.findTransientStakeProgramAddress)(constants_1.STAKE_POOL_PROGRAM_ID, validatorInfo.voteAccountAddress, stakePoolAddress, transientStakeSeed)];
                case 5:
                    transientStake = _c.sent();
                    instructions = [];
                    if (!(ephemeralStakeSeed != undefined)) return [3 /*break*/, 7];
                    return [4 /*yield*/, (0, utils_1.findEphemeralStakeProgramAddress)(constants_1.STAKE_POOL_PROGRAM_ID, stakePoolAddress, new bn_js_1.default(ephemeralStakeSeed))];
                case 6:
                    ephemeralStake = _c.sent();
                    instructions.push(instructions_1.StakePoolInstruction.decreaseAdditionalValidatorStake({
                        stakePool: stakePoolAddress,
                        staker: stakePool.account.data.staker,
                        validatorList: stakePool.account.data.validatorList,
                        reserveStake: stakePool.account.data.reserveStake,
                        transientStakeSeed: transientStakeSeed.toNumber(),
                        withdrawAuthority: withdrawAuthority,
                        validatorStake: validatorStake,
                        transientStake: transientStake,
                        lamports: lamports,
                        ephemeralStake: ephemeralStake,
                        ephemeralStakeSeed: ephemeralStakeSeed,
                    }));
                    return [3 /*break*/, 8];
                case 7:
                    instructions.push(instructions_1.StakePoolInstruction.decreaseValidatorStakeWithReserve({
                        stakePool: stakePoolAddress,
                        staker: stakePool.account.data.staker,
                        validatorList: stakePool.account.data.validatorList,
                        reserveStake: stakePool.account.data.reserveStake,
                        transientStakeSeed: transientStakeSeed.toNumber(),
                        withdrawAuthority: withdrawAuthority,
                        validatorStake: validatorStake,
                        transientStake: transientStake,
                        lamports: lamports,
                    }));
                    _c.label = 8;
                case 8: return [2 /*return*/, {
                        instructions: instructions,
                    }];
            }
        });
    });
}
exports.decreaseValidatorStake = decreaseValidatorStake;
/**
 * Creates instructions required to completely update a stake pool after epoch change.
 */
function updateStakePool(connection, stakePool, noMerge) {
    if (noMerge === void 0) { noMerge = false; }
    return __awaiter(this, void 0, void 0, function () {
        var stakePoolAddress, validatorList, withdrawAuthority, updateListInstructions, instructions, startIndex, validatorChunks, _i, validatorChunks_1, validatorChunk, validatorAndTransientStakePairs, _c, validatorChunk_1, validator, validatorStake, transientStake;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    stakePoolAddress = stakePool.pubkey;
                    return [4 /*yield*/, (0, utils_1.getValidatorListAccount)(connection, stakePool.account.data.validatorList)];
                case 1:
                    validatorList = _d.sent();
                    return [4 /*yield*/, (0, utils_1.findWithdrawAuthorityProgramAddress)(constants_1.STAKE_POOL_PROGRAM_ID, stakePoolAddress)];
                case 2:
                    withdrawAuthority = _d.sent();
                    updateListInstructions = [];
                    instructions = [];
                    startIndex = 0;
                    validatorChunks = (0, utils_1.arrayChunk)(validatorList.account.data.validators, constants_1.MAX_VALIDATORS_TO_UPDATE);
                    _i = 0, validatorChunks_1 = validatorChunks;
                    _d.label = 3;
                case 3:
                    if (!(_i < validatorChunks_1.length)) return [3 /*break*/, 10];
                    validatorChunk = validatorChunks_1[_i];
                    validatorAndTransientStakePairs = [];
                    _c = 0, validatorChunk_1 = validatorChunk;
                    _d.label = 4;
                case 4:
                    if (!(_c < validatorChunk_1.length)) return [3 /*break*/, 8];
                    validator = validatorChunk_1[_c];
                    return [4 /*yield*/, (0, utils_1.findStakeProgramAddress)(constants_1.STAKE_POOL_PROGRAM_ID, validator.voteAccountAddress, stakePoolAddress)];
                case 5:
                    validatorStake = _d.sent();
                    validatorAndTransientStakePairs.push(validatorStake);
                    return [4 /*yield*/, (0, utils_1.findTransientStakeProgramAddress)(constants_1.STAKE_POOL_PROGRAM_ID, validator.voteAccountAddress, stakePoolAddress, validator.transientSeedSuffixStart)];
                case 6:
                    transientStake = _d.sent();
                    validatorAndTransientStakePairs.push(transientStake);
                    _d.label = 7;
                case 7:
                    _c++;
                    return [3 /*break*/, 4];
                case 8:
                    updateListInstructions.push(instructions_1.StakePoolInstruction.updateValidatorListBalance({
                        stakePool: stakePoolAddress,
                        validatorList: stakePool.account.data.validatorList,
                        reserveStake: stakePool.account.data.reserveStake,
                        validatorAndTransientStakePairs: validatorAndTransientStakePairs,
                        withdrawAuthority: withdrawAuthority,
                        startIndex: startIndex,
                        noMerge: noMerge,
                    }));
                    startIndex += constants_1.MAX_VALIDATORS_TO_UPDATE;
                    _d.label = 9;
                case 9:
                    _i++;
                    return [3 /*break*/, 3];
                case 10:
                    instructions.push(instructions_1.StakePoolInstruction.updateStakePoolBalance({
                        stakePool: stakePoolAddress,
                        validatorList: stakePool.account.data.validatorList,
                        reserveStake: stakePool.account.data.reserveStake,
                        managerFeeAccount: stakePool.account.data.managerFeeAccount,
                        poolMint: stakePool.account.data.poolMint,
                        withdrawAuthority: withdrawAuthority,
                    }));
                    instructions.push(instructions_1.StakePoolInstruction.cleanupRemovedValidatorEntries({
                        stakePool: stakePoolAddress,
                        validatorList: stakePool.account.data.validatorList,
                    }));
                    return [2 /*return*/, {
                            updateListInstructions: updateListInstructions,
                            finalInstructions: instructions,
                        }];
            }
        });
    });
}
exports.updateStakePool = updateStakePool;
/**
 * Retrieves detailed information about the StakePool.
 */
function stakePoolInfo(connection, stakePoolAddress) {
    var _c, _d;
    return __awaiter(this, void 0, void 0, function () {
        var stakePool, reserveAccountStakeAddress, totalLamports, lastUpdateEpoch, validatorList, maxNumberOfValidators, currentNumberOfValidators, epochInfo, reserveStake, withdrawAuthority, minimumReserveStakeBalance, stakeAccounts, totalPoolTokens, updateRequired;
        var _this = this;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0: return [4 /*yield*/, getStakePoolAccount(connection, stakePoolAddress)];
                case 1:
                    stakePool = _e.sent();
                    reserveAccountStakeAddress = stakePool.account.data.reserveStake;
                    totalLamports = stakePool.account.data.totalLamports;
                    lastUpdateEpoch = stakePool.account.data.lastUpdateEpoch;
                    return [4 /*yield*/, (0, utils_1.getValidatorListAccount)(connection, stakePool.account.data.validatorList)];
                case 2:
                    validatorList = _e.sent();
                    maxNumberOfValidators = validatorList.account.data.maxValidators;
                    currentNumberOfValidators = validatorList.account.data.validators.length;
                    return [4 /*yield*/, connection.getEpochInfo()];
                case 3:
                    epochInfo = _e.sent();
                    return [4 /*yield*/, connection.getAccountInfo(reserveAccountStakeAddress)];
                case 4:
                    reserveStake = _e.sent();
                    return [4 /*yield*/, (0, utils_1.findWithdrawAuthorityProgramAddress)(constants_1.STAKE_POOL_PROGRAM_ID, stakePoolAddress)];
                case 5:
                    withdrawAuthority = _e.sent();
                    return [4 /*yield*/, connection.getMinimumBalanceForRentExemption(web3_js_1.StakeProgram.space)];
                case 6:
                    minimumReserveStakeBalance = _e.sent();
                    return [4 /*yield*/, Promise.all(validatorList.account.data.validators.map(function (validator) { return __awaiter(_this, void 0, void 0, function () {
                            var stakeAccountAddress, transientStakeAccountAddress, updateRequired;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0: return [4 /*yield*/, (0, utils_1.findStakeProgramAddress)(constants_1.STAKE_POOL_PROGRAM_ID, validator.voteAccountAddress, stakePoolAddress)];
                                    case 1:
                                        stakeAccountAddress = _c.sent();
                                        return [4 /*yield*/, (0, utils_1.findTransientStakeProgramAddress)(constants_1.STAKE_POOL_PROGRAM_ID, validator.voteAccountAddress, stakePoolAddress, validator.transientSeedSuffixStart)];
                                    case 2:
                                        transientStakeAccountAddress = _c.sent();
                                        updateRequired = !validator.lastUpdateEpoch.eqn(epochInfo.epoch);
                                        return [2 /*return*/, {
                                                voteAccountAddress: validator.voteAccountAddress.toBase58(),
                                                stakeAccountAddress: stakeAccountAddress.toBase58(),
                                                validatorActiveStakeLamports: validator.activeStakeLamports.toString(),
                                                validatorLastUpdateEpoch: validator.lastUpdateEpoch.toString(),
                                                validatorLamports: validator.activeStakeLamports
                                                    .add(validator.transientStakeLamports)
                                                    .toString(),
                                                validatorTransientStakeAccountAddress: transientStakeAccountAddress.toBase58(),
                                                validatorTransientStakeLamports: validator.transientStakeLamports.toString(),
                                                updateRequired: updateRequired,
                                            }];
                                }
                            });
                        }); }))];
                case 7:
                    stakeAccounts = _e.sent();
                    totalPoolTokens = (0, utils_1.lamportsToSol)(stakePool.account.data.poolTokenSupply);
                    updateRequired = !lastUpdateEpoch.eqn(epochInfo.epoch);
                    return [2 /*return*/, {
                            address: stakePoolAddress.toBase58(),
                            poolWithdrawAuthority: withdrawAuthority.toBase58(),
                            manager: stakePool.account.data.manager.toBase58(),
                            staker: stakePool.account.data.staker.toBase58(),
                            stakeDepositAuthority: stakePool.account.data.stakeDepositAuthority.toBase58(),
                            stakeWithdrawBumpSeed: stakePool.account.data.stakeWithdrawBumpSeed,
                            maxValidators: maxNumberOfValidators,
                            validatorList: validatorList.account.data.validators.map(function (validator) {
                                return {
                                    activeStakeLamports: validator.activeStakeLamports.toString(),
                                    transientStakeLamports: validator.transientStakeLamports.toString(),
                                    lastUpdateEpoch: validator.lastUpdateEpoch.toString(),
                                    transientSeedSuffixStart: validator.transientSeedSuffixStart.toString(),
                                    transientSeedSuffixEnd: validator.transientSeedSuffixEnd.toString(),
                                    status: validator.status.toString(),
                                    voteAccountAddress: validator.voteAccountAddress.toString(),
                                };
                            }), // CliStakePoolValidator
                            validatorListStorageAccount: stakePool.account.data.validatorList.toBase58(),
                            reserveStake: stakePool.account.data.reserveStake.toBase58(),
                            poolMint: stakePool.account.data.poolMint.toBase58(),
                            managerFeeAccount: stakePool.account.data.managerFeeAccount.toBase58(),
                            tokenProgramId: stakePool.account.data.tokenProgramId.toBase58(),
                            totalLamports: stakePool.account.data.totalLamports.toString(),
                            poolTokenSupply: stakePool.account.data.poolTokenSupply.toString(),
                            lastUpdateEpoch: stakePool.account.data.lastUpdateEpoch.toString(),
                            lockup: stakePool.account.data.lockup, // pub lockup: CliStakePoolLockup
                            epochFee: stakePool.account.data.epochFee,
                            nextEpochFee: stakePool.account.data.nextEpochFee,
                            preferredDepositValidatorVoteAddress: stakePool.account.data.preferredDepositValidatorVoteAddress,
                            preferredWithdrawValidatorVoteAddress: stakePool.account.data.preferredWithdrawValidatorVoteAddress,
                            stakeDepositFee: stakePool.account.data.stakeDepositFee,
                            stakeWithdrawalFee: stakePool.account.data.stakeWithdrawalFee,
                            // CliStakePool the same
                            nextStakeWithdrawalFee: stakePool.account.data.nextStakeWithdrawalFee,
                            stakeReferralFee: stakePool.account.data.stakeReferralFee,
                            solDepositAuthority: (_c = stakePool.account.data.solDepositAuthority) === null || _c === void 0 ? void 0 : _c.toBase58(),
                            solDepositFee: stakePool.account.data.solDepositFee,
                            solReferralFee: stakePool.account.data.solReferralFee,
                            solWithdrawAuthority: (_d = stakePool.account.data.solWithdrawAuthority) === null || _d === void 0 ? void 0 : _d.toBase58(),
                            solWithdrawalFee: stakePool.account.data.solWithdrawalFee,
                            nextSolWithdrawalFee: stakePool.account.data.nextSolWithdrawalFee,
                            lastEpochPoolTokenSupply: stakePool.account.data.lastEpochPoolTokenSupply.toString(),
                            lastEpochTotalLamports: stakePool.account.data.lastEpochTotalLamports.toString(),
                            details: {
                                reserveStakeLamports: reserveStake === null || reserveStake === void 0 ? void 0 : reserveStake.lamports,
                                reserveAccountStakeAddress: reserveAccountStakeAddress.toBase58(),
                                minimumReserveStakeBalance: minimumReserveStakeBalance,
                                stakeAccounts: stakeAccounts,
                                totalLamports: totalLamports,
                                totalPoolTokens: totalPoolTokens,
                                currentNumberOfValidators: currentNumberOfValidators,
                                maxNumberOfValidators: maxNumberOfValidators,
                                updateRequired: updateRequired,
                            }, // CliStakePoolDetails
                        }];
            }
        });
    });
}
exports.stakePoolInfo = stakePoolInfo;
/**
 * Creates instructions required to redelegate stake.
 */
function redelegate(props) {
    return __awaiter(this, void 0, void 0, function () {
        var connection, stakePoolAddress, sourceVoteAccount, sourceTransientStakeSeed, destinationVoteAccount, destinationTransientStakeSeed, ephemeralStakeSeed, lamports, stakePool, stakePoolWithdrawAuthority, sourceValidatorStake, sourceTransientStake, destinationValidatorStake, destinationTransientStake, ephemeralStake, instructions;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    connection = props.connection, stakePoolAddress = props.stakePoolAddress, sourceVoteAccount = props.sourceVoteAccount, sourceTransientStakeSeed = props.sourceTransientStakeSeed, destinationVoteAccount = props.destinationVoteAccount, destinationTransientStakeSeed = props.destinationTransientStakeSeed, ephemeralStakeSeed = props.ephemeralStakeSeed, lamports = props.lamports;
                    return [4 /*yield*/, getStakePoolAccount(connection, stakePoolAddress)];
                case 1:
                    stakePool = _c.sent();
                    return [4 /*yield*/, (0, utils_1.findWithdrawAuthorityProgramAddress)(constants_1.STAKE_POOL_PROGRAM_ID, stakePoolAddress)];
                case 2:
                    stakePoolWithdrawAuthority = _c.sent();
                    return [4 /*yield*/, (0, utils_1.findStakeProgramAddress)(constants_1.STAKE_POOL_PROGRAM_ID, sourceVoteAccount, stakePoolAddress)];
                case 3:
                    sourceValidatorStake = _c.sent();
                    return [4 /*yield*/, (0, utils_1.findTransientStakeProgramAddress)(constants_1.STAKE_POOL_PROGRAM_ID, sourceVoteAccount, stakePoolAddress, new bn_js_1.default(sourceTransientStakeSeed))];
                case 4:
                    sourceTransientStake = _c.sent();
                    return [4 /*yield*/, (0, utils_1.findStakeProgramAddress)(constants_1.STAKE_POOL_PROGRAM_ID, destinationVoteAccount, stakePoolAddress)];
                case 5:
                    destinationValidatorStake = _c.sent();
                    return [4 /*yield*/, (0, utils_1.findTransientStakeProgramAddress)(constants_1.STAKE_POOL_PROGRAM_ID, destinationVoteAccount, stakePoolAddress, new bn_js_1.default(destinationTransientStakeSeed))];
                case 6:
                    destinationTransientStake = _c.sent();
                    return [4 /*yield*/, (0, utils_1.findEphemeralStakeProgramAddress)(constants_1.STAKE_POOL_PROGRAM_ID, stakePoolAddress, new bn_js_1.default(ephemeralStakeSeed))];
                case 7:
                    ephemeralStake = _c.sent();
                    instructions = [];
                    instructions.push(instructions_1.StakePoolInstruction.redelegate({
                        stakePool: stakePool.pubkey,
                        staker: stakePool.account.data.staker,
                        validatorList: stakePool.account.data.validatorList,
                        reserveStake: stakePool.account.data.reserveStake,
                        stakePoolWithdrawAuthority: stakePoolWithdrawAuthority,
                        ephemeralStake: ephemeralStake,
                        ephemeralStakeSeed: ephemeralStakeSeed,
                        sourceValidatorStake: sourceValidatorStake,
                        sourceTransientStake: sourceTransientStake,
                        sourceTransientStakeSeed: sourceTransientStakeSeed,
                        destinationValidatorStake: destinationValidatorStake,
                        destinationTransientStake: destinationTransientStake,
                        destinationTransientStakeSeed: destinationTransientStakeSeed,
                        validator: destinationVoteAccount,
                        lamports: lamports,
                    }));
                    return [2 /*return*/, {
                            instructions: instructions,
                        }];
            }
        });
    });
}
exports.redelegate = redelegate;
/**
 * Creates instructions required to create pool token metadata.
 */
function createPoolTokenMetadata(connection, stakePoolAddress, payer, name, symbol, uri) {
    return __awaiter(this, void 0, void 0, function () {
        var stakePool, withdrawAuthority, tokenMetadata, manager, instructions;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, getStakePoolAccount(connection, stakePoolAddress)];
                case 1:
                    stakePool = _c.sent();
                    return [4 /*yield*/, (0, utils_1.findWithdrawAuthorityProgramAddress)(constants_1.STAKE_POOL_PROGRAM_ID, stakePoolAddress)];
                case 2:
                    withdrawAuthority = _c.sent();
                    tokenMetadata = (0, utils_1.findMetadataAddress)(stakePool.account.data.poolMint);
                    manager = stakePool.account.data.manager;
                    instructions = [];
                    instructions.push(instructions_1.StakePoolInstruction.createTokenMetadata({
                        stakePool: stakePoolAddress,
                        poolMint: stakePool.account.data.poolMint,
                        payer: payer,
                        manager: manager,
                        tokenMetadata: tokenMetadata,
                        withdrawAuthority: withdrawAuthority,
                        name: name,
                        symbol: symbol,
                        uri: uri,
                    }));
                    return [2 /*return*/, {
                            instructions: instructions,
                        }];
            }
        });
    });
}
exports.createPoolTokenMetadata = createPoolTokenMetadata;
/**
 * Creates instructions required to update pool token metadata.
 */
function updatePoolTokenMetadata(connection, stakePoolAddress, name, symbol, uri) {
    return __awaiter(this, void 0, void 0, function () {
        var stakePool, withdrawAuthority, tokenMetadata, instructions;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, getStakePoolAccount(connection, stakePoolAddress)];
                case 1:
                    stakePool = _c.sent();
                    return [4 /*yield*/, (0, utils_1.findWithdrawAuthorityProgramAddress)(constants_1.STAKE_POOL_PROGRAM_ID, stakePoolAddress)];
                case 2:
                    withdrawAuthority = _c.sent();
                    tokenMetadata = (0, utils_1.findMetadataAddress)(stakePool.account.data.poolMint);
                    instructions = [];
                    instructions.push(instructions_1.StakePoolInstruction.updateTokenMetadata({
                        stakePool: stakePoolAddress,
                        manager: stakePool.account.data.manager,
                        tokenMetadata: tokenMetadata,
                        withdrawAuthority: withdrawAuthority,
                        name: name,
                        symbol: symbol,
                        uri: uri,
                    }));
                    return [2 /*return*/, {
                            instructions: instructions,
                        }];
            }
        });
    });
}
exports.updatePoolTokenMetadata = updatePoolTokenMetadata;
