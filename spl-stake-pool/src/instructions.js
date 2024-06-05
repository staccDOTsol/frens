"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StakePoolInstruction = exports.STAKE_POOL_INSTRUCTION_LAYOUTS = exports.tokenMetadataLayout = void 0;
var web3_js_1 = require("@solana/web3.js");
var BufferLayout = require("@solana/buffer-layout");
var spl_token_1 = require("@solana/spl-token");
var utils_1 = require("./utils");
var constants_1 = require("./constants");
// 'UpdateTokenMetadata' and 'CreateTokenMetadata' have dynamic layouts
var MOVE_STAKE_LAYOUT = BufferLayout.struct([
    BufferLayout.u8('instruction'),
    BufferLayout.ns64('lamports'),
    BufferLayout.ns64('transientStakeSeed'),
]);
var UPDATE_VALIDATOR_LIST_BALANCE_LAYOUT = BufferLayout.struct([
    BufferLayout.u8('instruction'),
    BufferLayout.u32('startIndex'),
    BufferLayout.u8('noMerge'),
]);
function tokenMetadataLayout(instruction, nameLength, symbolLength, uriLength) {
    if (nameLength > constants_1.METADATA_MAX_NAME_LENGTH) {
        throw 'maximum token name length is 32 characters';
    }
    if (symbolLength > constants_1.METADATA_MAX_SYMBOL_LENGTH) {
        throw 'maximum token symbol length is 10 characters';
    }
    if (uriLength > constants_1.METADATA_MAX_URI_LENGTH) {
        throw 'maximum token uri length is 200 characters';
    }
    return {
        index: instruction,
        layout: BufferLayout.struct([
            BufferLayout.u8('instruction'),
            BufferLayout.u32('nameLen'),
            BufferLayout.blob(nameLength, 'name'),
            BufferLayout.u32('symbolLen'),
            BufferLayout.blob(symbolLength, 'symbol'),
            BufferLayout.u32('uriLen'),
            BufferLayout.blob(uriLength, 'uri'),
        ]),
    };
}
exports.tokenMetadataLayout = tokenMetadataLayout;
/**
 * An enumeration of valid stake InstructionType's
 * @internal
 */
exports.STAKE_POOL_INSTRUCTION_LAYOUTS = Object.freeze({
    DecreaseValidatorStake: {
        index: 3,
        layout: MOVE_STAKE_LAYOUT,
    },
    IncreaseValidatorStake: {
        index: 4,
        layout: MOVE_STAKE_LAYOUT,
    },
    UpdateValidatorListBalance: {
        index: 6,
        layout: UPDATE_VALIDATOR_LIST_BALANCE_LAYOUT,
    },
    UpdateStakePoolBalance: {
        index: 7,
        layout: BufferLayout.struct([BufferLayout.u8('instruction')]),
    },
    CleanupRemovedValidatorEntries: {
        index: 8,
        layout: BufferLayout.struct([BufferLayout.u8('instruction')]),
    },
    DepositStake: {
        index: 9,
        layout: BufferLayout.struct([BufferLayout.u8('instruction')]),
    },
    /// Withdraw the token from the pool at the current ratio.
    WithdrawStake: {
        index: 10,
        layout: BufferLayout.struct([
            BufferLayout.u8('instruction'),
            BufferLayout.ns64('poolTokens'),
        ]),
    },
    /// Deposit SOL directly into the pool's reserve account. The output is a "pool" token
    /// representing ownership into the pool. Inputs are converted to the current ratio.
    DepositSol: {
        index: 14,
        layout: BufferLayout.struct([
            BufferLayout.u8('instruction'),
            BufferLayout.ns64('lamports'),
        ]),
    },
    /// Withdraw SOL directly from the pool's reserve account. Fails if the
    /// reserve does not have enough SOL.
    WithdrawSol: {
        index: 16,
        layout: BufferLayout.struct([
            BufferLayout.u8('instruction'),
            BufferLayout.ns64('poolTokens'),
        ]),
    },
    IncreaseAdditionalValidatorStake: {
        index: 19,
        layout: BufferLayout.struct([
            BufferLayout.u8('instruction'),
            BufferLayout.ns64('lamports'),
            BufferLayout.ns64('transientStakeSeed'),
            BufferLayout.ns64('ephemeralStakeSeed'),
        ]),
    },
    DecreaseAdditionalValidatorStake: {
        index: 20,
        layout: BufferLayout.struct([
            BufferLayout.u8('instruction'),
            BufferLayout.ns64('lamports'),
            BufferLayout.ns64('transientStakeSeed'),
            BufferLayout.ns64('ephemeralStakeSeed'),
        ]),
    },
    DecreaseValidatorStakeWithReserve: {
        index: 21,
        layout: MOVE_STAKE_LAYOUT,
    },
    Redelegate: {
        index: 22,
        layout: BufferLayout.struct([
            BufferLayout.u8('instruction'),
            /// Amount of lamports to redelegate
            BufferLayout.ns64('lamports'),
            /// Seed used to create source transient stake account
            BufferLayout.ns64('sourceTransientStakeSeed'),
            /// Seed used to create destination ephemeral account.
            BufferLayout.ns64('ephemeralStakeSeed'),
            /// Seed used to create destination transient stake account. If there is
            /// already transient stake, this must match the current seed, otherwise
            /// it can be anything
            BufferLayout.ns64('destinationTransientStakeSeed'),
        ]),
    },
});
/**
 * Stake Pool Instruction class
 */
var StakePoolInstruction = /** @class */ (function () {
    function StakePoolInstruction() {
    }
    /**
     * Creates instruction to update a set of validators in the stake pool.
     */
    StakePoolInstruction.updateValidatorListBalance = function (params) {
        var stakePool = params.stakePool, withdrawAuthority = params.withdrawAuthority, validatorList = params.validatorList, reserveStake = params.reserveStake, startIndex = params.startIndex, noMerge = params.noMerge, validatorAndTransientStakePairs = params.validatorAndTransientStakePairs;
        var type = exports.STAKE_POOL_INSTRUCTION_LAYOUTS.UpdateValidatorListBalance;
        var data = (0, utils_1.encodeData)(type, { startIndex: startIndex, noMerge: noMerge ? 1 : 0 });
        var keys = __spreadArray([
            { pubkey: stakePool, isSigner: false, isWritable: false },
            { pubkey: withdrawAuthority, isSigner: false, isWritable: false },
            { pubkey: validatorList, isSigner: false, isWritable: true },
            { pubkey: reserveStake, isSigner: false, isWritable: true },
            { pubkey: web3_js_1.SYSVAR_CLOCK_PUBKEY, isSigner: false, isWritable: false },
            { pubkey: web3_js_1.SYSVAR_STAKE_HISTORY_PUBKEY, isSigner: false, isWritable: false },
            { pubkey: web3_js_1.StakeProgram.programId, isSigner: false, isWritable: false }
        ], validatorAndTransientStakePairs.map(function (pubkey) { return ({
            pubkey: pubkey,
            isSigner: false,
            isWritable: true,
        }); }), true);
        return new web3_js_1.TransactionInstruction({
            programId: constants_1.STAKE_POOL_PROGRAM_ID,
            keys: keys,
            data: data,
        });
    };
    /**
     * Creates instruction to update the overall stake pool balance.
     */
    StakePoolInstruction.updateStakePoolBalance = function (params) {
        var stakePool = params.stakePool, withdrawAuthority = params.withdrawAuthority, validatorList = params.validatorList, reserveStake = params.reserveStake, managerFeeAccount = params.managerFeeAccount, poolMint = params.poolMint;
        var type = exports.STAKE_POOL_INSTRUCTION_LAYOUTS.UpdateStakePoolBalance;
        var data = (0, utils_1.encodeData)(type);
        var keys = [
            { pubkey: stakePool, isSigner: false, isWritable: true },
            { pubkey: withdrawAuthority, isSigner: false, isWritable: false },
            { pubkey: validatorList, isSigner: false, isWritable: true },
            { pubkey: reserveStake, isSigner: false, isWritable: false },
            { pubkey: managerFeeAccount, isSigner: false, isWritable: true },
            { pubkey: poolMint, isSigner: false, isWritable: true },
            { pubkey: spl_token_1.TOKEN_2022_PROGRAM_ID, isSigner: false, isWritable: false },
        ];
        return new web3_js_1.TransactionInstruction({
            programId: constants_1.STAKE_POOL_PROGRAM_ID,
            keys: keys,
            data: data,
        });
    };
    /**
     * Creates instruction to cleanup removed validator entries.
     */
    StakePoolInstruction.cleanupRemovedValidatorEntries = function (params) {
        var stakePool = params.stakePool, validatorList = params.validatorList;
        var type = exports.STAKE_POOL_INSTRUCTION_LAYOUTS.CleanupRemovedValidatorEntries;
        var data = (0, utils_1.encodeData)(type);
        var keys = [
            { pubkey: stakePool, isSigner: false, isWritable: false },
            { pubkey: validatorList, isSigner: false, isWritable: true },
        ];
        return new web3_js_1.TransactionInstruction({
            programId: constants_1.STAKE_POOL_PROGRAM_ID,
            keys: keys,
            data: data,
        });
    };
    /**
     * Creates `IncreaseValidatorStake` instruction (rebalance from reserve account to
     * transient account)
     */
    StakePoolInstruction.increaseValidatorStake = function (params) {
        var stakePool = params.stakePool, staker = params.staker, withdrawAuthority = params.withdrawAuthority, validatorList = params.validatorList, reserveStake = params.reserveStake, transientStake = params.transientStake, validatorStake = params.validatorStake, validatorVote = params.validatorVote, lamports = params.lamports, transientStakeSeed = params.transientStakeSeed;
        var type = exports.STAKE_POOL_INSTRUCTION_LAYOUTS.IncreaseValidatorStake;
        var data = (0, utils_1.encodeData)(type, { lamports: lamports, transientStakeSeed: transientStakeSeed });
        var keys = [
            { pubkey: stakePool, isSigner: false, isWritable: false },
            { pubkey: staker, isSigner: true, isWritable: false },
            { pubkey: withdrawAuthority, isSigner: false, isWritable: false },
            { pubkey: validatorList, isSigner: false, isWritable: true },
            { pubkey: reserveStake, isSigner: false, isWritable: true },
            { pubkey: transientStake, isSigner: false, isWritable: true },
            { pubkey: validatorStake, isSigner: false, isWritable: false },
            { pubkey: validatorVote, isSigner: false, isWritable: false },
            { pubkey: web3_js_1.SYSVAR_CLOCK_PUBKEY, isSigner: false, isWritable: false },
            { pubkey: web3_js_1.SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false },
            { pubkey: web3_js_1.SYSVAR_STAKE_HISTORY_PUBKEY, isSigner: false, isWritable: false },
            { pubkey: web3_js_1.STAKE_CONFIG_ID, isSigner: false, isWritable: false },
            { pubkey: web3_js_1.SystemProgram.programId, isSigner: false, isWritable: false },
            { pubkey: web3_js_1.StakeProgram.programId, isSigner: false, isWritable: false },
        ];
        return new web3_js_1.TransactionInstruction({
            programId: constants_1.STAKE_POOL_PROGRAM_ID,
            keys: keys,
            data: data,
        });
    };
    /**
     * Creates `IncreaseAdditionalValidatorStake` instruction (rebalance from reserve account to
     * transient account)
     */
    StakePoolInstruction.increaseAdditionalValidatorStake = function (params) {
        var stakePool = params.stakePool, staker = params.staker, withdrawAuthority = params.withdrawAuthority, validatorList = params.validatorList, reserveStake = params.reserveStake, transientStake = params.transientStake, validatorStake = params.validatorStake, validatorVote = params.validatorVote, lamports = params.lamports, transientStakeSeed = params.transientStakeSeed, ephemeralStake = params.ephemeralStake, ephemeralStakeSeed = params.ephemeralStakeSeed;
        var type = exports.STAKE_POOL_INSTRUCTION_LAYOUTS.IncreaseAdditionalValidatorStake;
        var data = (0, utils_1.encodeData)(type, { lamports: lamports, transientStakeSeed: transientStakeSeed, ephemeralStakeSeed: ephemeralStakeSeed });
        var keys = [
            { pubkey: stakePool, isSigner: false, isWritable: false },
            { pubkey: staker, isSigner: true, isWritable: false },
            { pubkey: withdrawAuthority, isSigner: false, isWritable: false },
            { pubkey: validatorList, isSigner: false, isWritable: true },
            { pubkey: reserveStake, isSigner: false, isWritable: true },
            { pubkey: ephemeralStake, isSigner: false, isWritable: true },
            { pubkey: transientStake, isSigner: false, isWritable: true },
            { pubkey: validatorStake, isSigner: false, isWritable: false },
            { pubkey: validatorVote, isSigner: false, isWritable: false },
            { pubkey: web3_js_1.SYSVAR_CLOCK_PUBKEY, isSigner: false, isWritable: false },
            { pubkey: web3_js_1.SYSVAR_STAKE_HISTORY_PUBKEY, isSigner: false, isWritable: false },
            { pubkey: web3_js_1.STAKE_CONFIG_ID, isSigner: false, isWritable: false },
            { pubkey: web3_js_1.SystemProgram.programId, isSigner: false, isWritable: false },
            { pubkey: web3_js_1.StakeProgram.programId, isSigner: false, isWritable: false },
        ];
        return new web3_js_1.TransactionInstruction({
            programId: constants_1.STAKE_POOL_PROGRAM_ID,
            keys: keys,
            data: data,
        });
    };
    /**
     * Creates `DecreaseValidatorStake` instruction (rebalance from validator account to
     * transient account)
     */
    StakePoolInstruction.decreaseValidatorStake = function (params) {
        var stakePool = params.stakePool, staker = params.staker, withdrawAuthority = params.withdrawAuthority, validatorList = params.validatorList, validatorStake = params.validatorStake, transientStake = params.transientStake, lamports = params.lamports, transientStakeSeed = params.transientStakeSeed;
        var type = exports.STAKE_POOL_INSTRUCTION_LAYOUTS.DecreaseValidatorStake;
        var data = (0, utils_1.encodeData)(type, { lamports: lamports, transientStakeSeed: transientStakeSeed });
        var keys = [
            { pubkey: stakePool, isSigner: false, isWritable: false },
            { pubkey: staker, isSigner: true, isWritable: false },
            { pubkey: withdrawAuthority, isSigner: false, isWritable: false },
            { pubkey: validatorList, isSigner: false, isWritable: true },
            { pubkey: validatorStake, isSigner: false, isWritable: true },
            { pubkey: transientStake, isSigner: false, isWritable: true },
            { pubkey: web3_js_1.SYSVAR_CLOCK_PUBKEY, isSigner: false, isWritable: false },
            { pubkey: web3_js_1.SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false },
            { pubkey: web3_js_1.SystemProgram.programId, isSigner: false, isWritable: false },
            { pubkey: web3_js_1.StakeProgram.programId, isSigner: false, isWritable: false },
        ];
        return new web3_js_1.TransactionInstruction({
            programId: constants_1.STAKE_POOL_PROGRAM_ID,
            keys: keys,
            data: data,
        });
    };
    /**
     * Creates `DecreaseValidatorStakeWithReserve` instruction (rebalance from
     * validator account to transient account)
     */
    StakePoolInstruction.decreaseValidatorStakeWithReserve = function (params) {
        var stakePool = params.stakePool, staker = params.staker, withdrawAuthority = params.withdrawAuthority, validatorList = params.validatorList, reserveStake = params.reserveStake, validatorStake = params.validatorStake, transientStake = params.transientStake, lamports = params.lamports, transientStakeSeed = params.transientStakeSeed;
        var type = exports.STAKE_POOL_INSTRUCTION_LAYOUTS.DecreaseValidatorStakeWithReserve;
        var data = (0, utils_1.encodeData)(type, { lamports: lamports, transientStakeSeed: transientStakeSeed });
        var keys = [
            { pubkey: stakePool, isSigner: false, isWritable: false },
            { pubkey: staker, isSigner: true, isWritable: false },
            { pubkey: withdrawAuthority, isSigner: false, isWritable: false },
            { pubkey: validatorList, isSigner: false, isWritable: true },
            { pubkey: reserveStake, isSigner: false, isWritable: true },
            { pubkey: validatorStake, isSigner: false, isWritable: true },
            { pubkey: transientStake, isSigner: false, isWritable: true },
            { pubkey: web3_js_1.SYSVAR_CLOCK_PUBKEY, isSigner: false, isWritable: false },
            { pubkey: web3_js_1.SYSVAR_STAKE_HISTORY_PUBKEY, isSigner: false, isWritable: false },
            { pubkey: web3_js_1.SystemProgram.programId, isSigner: false, isWritable: false },
            { pubkey: web3_js_1.StakeProgram.programId, isSigner: false, isWritable: false },
        ];
        return new web3_js_1.TransactionInstruction({
            programId: constants_1.STAKE_POOL_PROGRAM_ID,
            keys: keys,
            data: data,
        });
    };
    /**
     * Creates `DecreaseAdditionalValidatorStake` instruction (rebalance from
     * validator account to transient account)
     */
    StakePoolInstruction.decreaseAdditionalValidatorStake = function (params) {
        var stakePool = params.stakePool, staker = params.staker, withdrawAuthority = params.withdrawAuthority, validatorList = params.validatorList, reserveStake = params.reserveStake, validatorStake = params.validatorStake, transientStake = params.transientStake, lamports = params.lamports, transientStakeSeed = params.transientStakeSeed, ephemeralStakeSeed = params.ephemeralStakeSeed, ephemeralStake = params.ephemeralStake;
        var type = exports.STAKE_POOL_INSTRUCTION_LAYOUTS.DecreaseAdditionalValidatorStake;
        var data = (0, utils_1.encodeData)(type, { lamports: lamports, transientStakeSeed: transientStakeSeed, ephemeralStakeSeed: ephemeralStakeSeed });
        var keys = [
            { pubkey: stakePool, isSigner: false, isWritable: false },
            { pubkey: staker, isSigner: true, isWritable: false },
            { pubkey: withdrawAuthority, isSigner: false, isWritable: false },
            { pubkey: validatorList, isSigner: false, isWritable: true },
            { pubkey: reserveStake, isSigner: false, isWritable: true },
            { pubkey: validatorStake, isSigner: false, isWritable: true },
            { pubkey: ephemeralStake, isSigner: false, isWritable: true },
            { pubkey: transientStake, isSigner: false, isWritable: true },
            { pubkey: web3_js_1.SYSVAR_CLOCK_PUBKEY, isSigner: false, isWritable: false },
            { pubkey: web3_js_1.SYSVAR_STAKE_HISTORY_PUBKEY, isSigner: false, isWritable: false },
            { pubkey: web3_js_1.SystemProgram.programId, isSigner: false, isWritable: false },
            { pubkey: web3_js_1.StakeProgram.programId, isSigner: false, isWritable: false },
        ];
        return new web3_js_1.TransactionInstruction({
            programId: constants_1.STAKE_POOL_PROGRAM_ID,
            keys: keys,
            data: data,
        });
    };
    /**
     * Creates a transaction instruction to deposit a stake account into a stake pool.
     */
    StakePoolInstruction.depositStake = function (params) {
        var stakePool = params.stakePool, validatorList = params.validatorList, depositAuthority = params.depositAuthority, withdrawAuthority = params.withdrawAuthority, depositStake = params.depositStake, validatorStake = params.validatorStake, reserveStake = params.reserveStake, destinationPoolAccount = params.destinationPoolAccount, managerFeeAccount = params.managerFeeAccount, referralPoolAccount = params.referralPoolAccount, poolMint = params.poolMint;
        var type = exports.STAKE_POOL_INSTRUCTION_LAYOUTS.DepositStake;
        var data = (0, utils_1.encodeData)(type);
        var keys = [
            { pubkey: stakePool, isSigner: false, isWritable: true },
            { pubkey: validatorList, isSigner: false, isWritable: true },
            { pubkey: depositAuthority, isSigner: false, isWritable: false },
            { pubkey: withdrawAuthority, isSigner: false, isWritable: false },
            { pubkey: depositStake, isSigner: false, isWritable: true },
            { pubkey: validatorStake, isSigner: false, isWritable: true },
            { pubkey: reserveStake, isSigner: false, isWritable: true },
            { pubkey: destinationPoolAccount, isSigner: false, isWritable: true },
            { pubkey: managerFeeAccount, isSigner: false, isWritable: true },
            { pubkey: referralPoolAccount, isSigner: false, isWritable: true },
            { pubkey: poolMint, isSigner: false, isWritable: true },
            { pubkey: web3_js_1.SYSVAR_CLOCK_PUBKEY, isSigner: false, isWritable: false },
            { pubkey: web3_js_1.SYSVAR_STAKE_HISTORY_PUBKEY, isSigner: false, isWritable: false },
            { pubkey: spl_token_1.TOKEN_2022_PROGRAM_ID, isSigner: false, isWritable: false },
            { pubkey: web3_js_1.StakeProgram.programId, isSigner: false, isWritable: false },
        ];
        return new web3_js_1.TransactionInstruction({
            programId: constants_1.STAKE_POOL_PROGRAM_ID,
            keys: keys,
            data: data,
        });
    };
    /**
     * Creates a transaction instruction to deposit SOL into a stake pool.
     */
    StakePoolInstruction.depositSol = function (params) {
        var stakePool = params.stakePool, withdrawAuthority = params.withdrawAuthority, depositAuthority = params.depositAuthority, reserveStake = params.reserveStake, fundingAccount = params.fundingAccount, destinationPoolAccount = params.destinationPoolAccount, managerFeeAccount = params.managerFeeAccount, referralPoolAccount = params.referralPoolAccount, poolMint = params.poolMint, lamports = params.lamports;
        var type = exports.STAKE_POOL_INSTRUCTION_LAYOUTS.DepositSol;
        var data = (0, utils_1.encodeData)(type, { lamports: lamports });
        var keys = [
            { pubkey: stakePool, isSigner: false, isWritable: true },
            { pubkey: withdrawAuthority, isSigner: false, isWritable: false },
            { pubkey: reserveStake, isSigner: false, isWritable: true },
            { pubkey: fundingAccount, isSigner: true, isWritable: true },
            { pubkey: destinationPoolAccount, isSigner: false, isWritable: true },
            { pubkey: managerFeeAccount, isSigner: false, isWritable: true },
            { pubkey: referralPoolAccount, isSigner: false, isWritable: true },
            { pubkey: poolMint, isSigner: false, isWritable: true },
            { pubkey: web3_js_1.SystemProgram.programId, isSigner: false, isWritable: false },
            { pubkey: spl_token_1.TOKEN_2022_PROGRAM_ID, isSigner: false, isWritable: false },
        ];
        if (depositAuthority) {
            keys.push({
                pubkey: depositAuthority,
                isSigner: true,
                isWritable: false,
            });
        }
        return new web3_js_1.TransactionInstruction({
            programId: constants_1.STAKE_POOL_PROGRAM_ID,
            keys: keys,
            data: data,
        });
    };
    /**
     * Creates a transaction instruction to withdraw active stake from a stake pool.
     */
    StakePoolInstruction.withdrawStake = function (params) {
        var stakePool = params.stakePool, validatorList = params.validatorList, withdrawAuthority = params.withdrawAuthority, validatorStake = params.validatorStake, destinationStake = params.destinationStake, destinationStakeAuthority = params.destinationStakeAuthority, sourceTransferAuthority = params.sourceTransferAuthority, sourcePoolAccount = params.sourcePoolAccount, managerFeeAccount = params.managerFeeAccount, poolMint = params.poolMint, poolTokens = params.poolTokens;
        var type = exports.STAKE_POOL_INSTRUCTION_LAYOUTS.WithdrawStake;
        var data = (0, utils_1.encodeData)(type, { poolTokens: poolTokens });
        var keys = [
            { pubkey: stakePool, isSigner: false, isWritable: true },
            { pubkey: validatorList, isSigner: false, isWritable: true },
            { pubkey: withdrawAuthority, isSigner: false, isWritable: false },
            { pubkey: validatorStake, isSigner: false, isWritable: true },
            { pubkey: destinationStake, isSigner: false, isWritable: true },
            { pubkey: destinationStakeAuthority, isSigner: false, isWritable: false },
            { pubkey: sourceTransferAuthority, isSigner: true, isWritable: false },
            { pubkey: sourcePoolAccount, isSigner: false, isWritable: true },
            { pubkey: managerFeeAccount, isSigner: false, isWritable: true },
            { pubkey: poolMint, isSigner: false, isWritable: true },
            { pubkey: web3_js_1.SYSVAR_CLOCK_PUBKEY, isSigner: false, isWritable: false },
            { pubkey: spl_token_1.TOKEN_2022_PROGRAM_ID, isSigner: false, isWritable: false },
            { pubkey: web3_js_1.StakeProgram.programId, isSigner: false, isWritable: false },
        ];
        return new web3_js_1.TransactionInstruction({
            programId: constants_1.STAKE_POOL_PROGRAM_ID,
            keys: keys,
            data: data,
        });
    };
    /**
     * Creates a transaction instruction to withdraw SOL from a stake pool.
     */
    StakePoolInstruction.withdrawSol = function (params) {
        var stakePool = params.stakePool, withdrawAuthority = params.withdrawAuthority, sourceTransferAuthority = params.sourceTransferAuthority, sourcePoolAccount = params.sourcePoolAccount, reserveStake = params.reserveStake, destinationSystemAccount = params.destinationSystemAccount, managerFeeAccount = params.managerFeeAccount, solWithdrawAuthority = params.solWithdrawAuthority, poolMint = params.poolMint, poolTokens = params.poolTokens;
        var type = exports.STAKE_POOL_INSTRUCTION_LAYOUTS.WithdrawSol;
        var data = (0, utils_1.encodeData)(type, { poolTokens: poolTokens });
        var keys = [
            { pubkey: stakePool, isSigner: false, isWritable: true },
            { pubkey: withdrawAuthority, isSigner: false, isWritable: false },
            { pubkey: sourceTransferAuthority, isSigner: true, isWritable: false },
            { pubkey: sourcePoolAccount, isSigner: false, isWritable: true },
            { pubkey: reserveStake, isSigner: false, isWritable: true },
            { pubkey: destinationSystemAccount, isSigner: false, isWritable: true },
            { pubkey: managerFeeAccount, isSigner: false, isWritable: true },
            { pubkey: poolMint, isSigner: false, isWritable: true },
            { pubkey: web3_js_1.SYSVAR_CLOCK_PUBKEY, isSigner: false, isWritable: false },
            { pubkey: web3_js_1.SYSVAR_STAKE_HISTORY_PUBKEY, isSigner: false, isWritable: false },
            { pubkey: web3_js_1.StakeProgram.programId, isSigner: false, isWritable: false },
            { pubkey: spl_token_1.TOKEN_2022_PROGRAM_ID, isSigner: false, isWritable: false },
        ];
        if (solWithdrawAuthority) {
            keys.push({
                pubkey: solWithdrawAuthority,
                isSigner: true,
                isWritable: false,
            });
        }
        return new web3_js_1.TransactionInstruction({
            programId: constants_1.STAKE_POOL_PROGRAM_ID,
            keys: keys,
            data: data,
        });
    };
    /**
     * Creates `Redelegate` instruction (rebalance from one validator account to another)
     * @param params
     */
    StakePoolInstruction.redelegate = function (params) {
        var stakePool = params.stakePool, staker = params.staker, stakePoolWithdrawAuthority = params.stakePoolWithdrawAuthority, validatorList = params.validatorList, reserveStake = params.reserveStake, sourceValidatorStake = params.sourceValidatorStake, sourceTransientStake = params.sourceTransientStake, ephemeralStake = params.ephemeralStake, destinationTransientStake = params.destinationTransientStake, destinationValidatorStake = params.destinationValidatorStake, validator = params.validator, lamports = params.lamports, sourceTransientStakeSeed = params.sourceTransientStakeSeed, ephemeralStakeSeed = params.ephemeralStakeSeed, destinationTransientStakeSeed = params.destinationTransientStakeSeed;
        var keys = [
            { pubkey: stakePool, isSigner: false, isWritable: false },
            { pubkey: staker, isSigner: true, isWritable: false },
            { pubkey: stakePoolWithdrawAuthority, isSigner: false, isWritable: false },
            { pubkey: validatorList, isSigner: false, isWritable: true },
            { pubkey: reserveStake, isSigner: false, isWritable: true },
            { pubkey: sourceValidatorStake, isSigner: false, isWritable: true },
            { pubkey: sourceTransientStake, isSigner: false, isWritable: true },
            { pubkey: ephemeralStake, isSigner: false, isWritable: true },
            { pubkey: destinationTransientStake, isSigner: false, isWritable: true },
            { pubkey: destinationValidatorStake, isSigner: false, isWritable: false },
            { pubkey: validator, isSigner: false, isWritable: false },
            { pubkey: web3_js_1.SYSVAR_CLOCK_PUBKEY, isSigner: false, isWritable: false },
            { pubkey: web3_js_1.SYSVAR_STAKE_HISTORY_PUBKEY, isSigner: false, isWritable: false },
            { pubkey: web3_js_1.STAKE_CONFIG_ID, isSigner: false, isWritable: false },
            { pubkey: web3_js_1.SystemProgram.programId, isSigner: false, isWritable: false },
            { pubkey: web3_js_1.StakeProgram.programId, isSigner: false, isWritable: false },
        ];
        var data = (0, utils_1.encodeData)(exports.STAKE_POOL_INSTRUCTION_LAYOUTS.Redelegate, {
            lamports: lamports,
            sourceTransientStakeSeed: sourceTransientStakeSeed,
            ephemeralStakeSeed: ephemeralStakeSeed,
            destinationTransientStakeSeed: destinationTransientStakeSeed,
        });
        return new web3_js_1.TransactionInstruction({
            programId: constants_1.STAKE_POOL_PROGRAM_ID,
            keys: keys,
            data: data,
        });
    };
    /**
     * Creates an instruction to create metadata
     * using the mpl token metadata program for the pool token
     */
    StakePoolInstruction.createTokenMetadata = function (params) {
        var stakePool = params.stakePool, withdrawAuthority = params.withdrawAuthority, tokenMetadata = params.tokenMetadata, manager = params.manager, payer = params.payer, poolMint = params.poolMint, name = params.name, symbol = params.symbol, uri = params.uri;
        var keys = [
            { pubkey: stakePool, isSigner: false, isWritable: false },
            { pubkey: manager, isSigner: true, isWritable: false },
            { pubkey: withdrawAuthority, isSigner: false, isWritable: false },
            { pubkey: poolMint, isSigner: false, isWritable: false },
            { pubkey: payer, isSigner: true, isWritable: true },
            { pubkey: tokenMetadata, isSigner: false, isWritable: true },
            { pubkey: constants_1.METADATA_PROGRAM_ID, isSigner: false, isWritable: false },
            { pubkey: web3_js_1.SystemProgram.programId, isSigner: false, isWritable: false },
            { pubkey: web3_js_1.SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false },
        ];
        var type = tokenMetadataLayout(17, name.length, symbol.length, uri.length);
        var data = (0, utils_1.encodeData)(type, {
            nameLen: name.length,
            name: Buffer.from(name),
            symbolLen: symbol.length,
            symbol: Buffer.from(symbol),
            uriLen: uri.length,
            uri: Buffer.from(uri),
        });
        return new web3_js_1.TransactionInstruction({
            programId: constants_1.STAKE_POOL_PROGRAM_ID,
            keys: keys,
            data: data,
        });
    };
    /**
     * Creates an instruction to update metadata
     * in the mpl token metadata program account for the pool token
     */
    StakePoolInstruction.updateTokenMetadata = function (params) {
        var stakePool = params.stakePool, withdrawAuthority = params.withdrawAuthority, tokenMetadata = params.tokenMetadata, manager = params.manager, name = params.name, symbol = params.symbol, uri = params.uri;
        var keys = [
            { pubkey: stakePool, isSigner: false, isWritable: false },
            { pubkey: manager, isSigner: true, isWritable: false },
            { pubkey: withdrawAuthority, isSigner: false, isWritable: false },
            { pubkey: tokenMetadata, isSigner: false, isWritable: true },
            { pubkey: constants_1.METADATA_PROGRAM_ID, isSigner: false, isWritable: false },
        ];
        var type = tokenMetadataLayout(18, name.length, symbol.length, uri.length);
        var data = (0, utils_1.encodeData)(type, {
            nameLen: name.length,
            name: Buffer.from(name),
            symbolLen: symbol.length,
            symbol: Buffer.from(symbol),
            uriLen: uri.length,
            uri: Buffer.from(uri),
        });
        return new web3_js_1.TransactionInstruction({
            programId: constants_1.STAKE_POOL_PROGRAM_ID,
            keys: keys,
            data: data,
        });
    };
    /**
     * Decode a deposit stake pool instruction and retrieve the instruction params.
     */
    StakePoolInstruction.decodeDepositStake = function (instruction) {
        this.checkProgramId(instruction.programId);
        this.checkKeyLength(instruction.keys, 11);
        (0, utils_1.decodeData)(exports.STAKE_POOL_INSTRUCTION_LAYOUTS.DepositStake, instruction.data);
        return {
            stakePool: instruction.keys[0].pubkey,
            validatorList: instruction.keys[1].pubkey,
            depositAuthority: instruction.keys[2].pubkey,
            withdrawAuthority: instruction.keys[3].pubkey,
            depositStake: instruction.keys[4].pubkey,
            validatorStake: instruction.keys[5].pubkey,
            reserveStake: instruction.keys[6].pubkey,
            destinationPoolAccount: instruction.keys[7].pubkey,
            managerFeeAccount: instruction.keys[8].pubkey,
            referralPoolAccount: instruction.keys[9].pubkey,
            poolMint: instruction.keys[10].pubkey,
        };
    };
    /**
     * Decode a deposit sol instruction and retrieve the instruction params.
     */
    StakePoolInstruction.decodeDepositSol = function (instruction) {
        this.checkProgramId(instruction.programId);
        this.checkKeyLength(instruction.keys, 9);
        var amount = (0, utils_1.decodeData)(exports.STAKE_POOL_INSTRUCTION_LAYOUTS.DepositSol, instruction.data).amount;
        return {
            stakePool: instruction.keys[0].pubkey,
            depositAuthority: instruction.keys[1].pubkey,
            withdrawAuthority: instruction.keys[2].pubkey,
            reserveStake: instruction.keys[3].pubkey,
            fundingAccount: instruction.keys[4].pubkey,
            destinationPoolAccount: instruction.keys[5].pubkey,
            managerFeeAccount: instruction.keys[6].pubkey,
            referralPoolAccount: instruction.keys[7].pubkey,
            poolMint: instruction.keys[8].pubkey,
            lamports: amount,
        };
    };
    /**
     * @internal
     */
    StakePoolInstruction.checkProgramId = function (programId) {
        if (!programId.equals(web3_js_1.StakeProgram.programId)) {
            throw new Error('Invalid instruction; programId is not StakeProgram');
        }
    };
    /**
     * @internal
     */
    StakePoolInstruction.checkKeyLength = function (keys, expectedLength) {
        if (keys.length < expectedLength) {
            throw new Error("Invalid instruction; found ".concat(keys.length, " keys, expected at least ").concat(expectedLength));
        }
    };
    return StakePoolInstruction;
}());
exports.StakePoolInstruction = StakePoolInstruction;
