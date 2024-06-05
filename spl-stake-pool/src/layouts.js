"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatorListLayout = exports.ValidatorStakeInfoLayout = exports.ValidatorStakeInfoStatus = exports.StakePoolLayout = exports.StakeAccount = exports.StakeAccountInfo = exports.StakeMeta = exports.StakeAccountType = exports.PublicKeyFromString = exports.BigNumFromString = exports.AccountType = void 0;
var borsh_1 = require("@coral-xyz/borsh");
var web3_js_1 = require("@solana/web3.js");
var bn_js_1 = require("bn.js");
var superstruct_1 = require("superstruct");
var feeFields = [(0, borsh_1.u64)('denominator'), (0, borsh_1.u64)('numerator')];
var AccountType;
(function (AccountType) {
    AccountType[AccountType["Uninitialized"] = 0] = "Uninitialized";
    AccountType[AccountType["StakePool"] = 1] = "StakePool";
    AccountType[AccountType["ValidatorList"] = 2] = "ValidatorList";
})(AccountType || (exports.AccountType = AccountType = {}));
exports.BigNumFromString = (0, superstruct_1.coerce)((0, superstruct_1.instance)(bn_js_1.default), (0, superstruct_1.string)(), function (value) {
    if (typeof value === 'string')
        return new bn_js_1.default(value, 10);
    throw new Error('invalid big num');
});
exports.PublicKeyFromString = (0, superstruct_1.coerce)((0, superstruct_1.instance)(web3_js_1.PublicKey), (0, superstruct_1.string)(), function (value) { return new web3_js_1.PublicKey(value); });
exports.StakeAccountType = (0, superstruct_1.enums)(['uninitialized', 'initialized', 'delegated', 'rewardsPool']);
exports.StakeMeta = (0, superstruct_1.type)({
    rentExemptReserve: exports.BigNumFromString,
    authorized: (0, superstruct_1.type)({
        staker: exports.PublicKeyFromString,
        withdrawer: exports.PublicKeyFromString,
    }),
    lockup: (0, superstruct_1.type)({
        unixTimestamp: (0, superstruct_1.number)(),
        epoch: (0, superstruct_1.number)(),
        custodian: exports.PublicKeyFromString,
    }),
});
exports.StakeAccountInfo = (0, superstruct_1.type)({
    meta: exports.StakeMeta,
    stake: (0, superstruct_1.nullable)((0, superstruct_1.type)({
        delegation: (0, superstruct_1.type)({
            voter: exports.PublicKeyFromString,
            stake: exports.BigNumFromString,
            activationEpoch: exports.BigNumFromString,
            deactivationEpoch: exports.BigNumFromString,
            warmupCooldownRate: (0, superstruct_1.number)(),
        }),
        creditsObserved: (0, superstruct_1.number)(),
    })),
});
exports.StakeAccount = (0, superstruct_1.type)({
    type: exports.StakeAccountType,
    info: (0, superstruct_1.optional)(exports.StakeAccountInfo),
});
exports.StakePoolLayout = (0, borsh_1.struct)([
    (0, borsh_1.u8)('accountType'),
    (0, borsh_1.publicKey)('manager'),
    (0, borsh_1.publicKey)('staker'),
    (0, borsh_1.publicKey)('stakeDepositAuthority'),
    (0, borsh_1.u8)('stakeWithdrawBumpSeed'),
    (0, borsh_1.publicKey)('validatorList'),
    (0, borsh_1.publicKey)('reserveStake'),
    (0, borsh_1.publicKey)('poolMint'),
    (0, borsh_1.publicKey)('managerFeeAccount'),
    (0, borsh_1.publicKey)('tokenProgramId'),
    (0, borsh_1.u64)('totalLamports'),
    (0, borsh_1.u64)('poolTokenSupply'),
    (0, borsh_1.u64)('lastUpdateEpoch'),
    (0, borsh_1.struct)([(0, borsh_1.u64)('unixTimestamp'), (0, borsh_1.u64)('epoch'), (0, borsh_1.publicKey)('custodian')], 'lockup'),
    (0, borsh_1.struct)(feeFields, 'epochFee'),
    (0, borsh_1.option)((0, borsh_1.struct)(feeFields), 'nextEpochFee'),
    (0, borsh_1.option)((0, borsh_1.publicKey)(), 'preferredDepositValidatorVoteAddress'),
    (0, borsh_1.option)((0, borsh_1.publicKey)(), 'preferredWithdrawValidatorVoteAddress'),
    (0, borsh_1.struct)(feeFields, 'stakeDepositFee'),
    (0, borsh_1.struct)(feeFields, 'stakeWithdrawalFee'),
    (0, borsh_1.option)((0, borsh_1.struct)(feeFields), 'nextStakeWithdrawalFee'),
    (0, borsh_1.u8)('stakeReferralFee'),
    (0, borsh_1.option)((0, borsh_1.publicKey)(), 'solDepositAuthority'),
    (0, borsh_1.struct)(feeFields, 'solDepositFee'),
    (0, borsh_1.u8)('solReferralFee'),
    (0, borsh_1.option)((0, borsh_1.publicKey)(), 'solWithdrawAuthority'),
    (0, borsh_1.struct)(feeFields, 'solWithdrawalFee'),
    (0, borsh_1.option)((0, borsh_1.struct)(feeFields), 'nextSolWithdrawalFee'),
    (0, borsh_1.u64)('lastEpochPoolTokenSupply'),
    (0, borsh_1.u64)('lastEpochTotalLamports'),
]);
var ValidatorStakeInfoStatus;
(function (ValidatorStakeInfoStatus) {
    ValidatorStakeInfoStatus[ValidatorStakeInfoStatus["Active"] = 0] = "Active";
    ValidatorStakeInfoStatus[ValidatorStakeInfoStatus["DeactivatingTransient"] = 1] = "DeactivatingTransient";
    ValidatorStakeInfoStatus[ValidatorStakeInfoStatus["ReadyForRemoval"] = 2] = "ReadyForRemoval";
})(ValidatorStakeInfoStatus || (exports.ValidatorStakeInfoStatus = ValidatorStakeInfoStatus = {}));
exports.ValidatorStakeInfoLayout = (0, borsh_1.struct)([
    /// Amount of active stake delegated to this validator
    /// Note that if `last_update_epoch` does not match the current epoch then
    /// this field may not be accurate
    (0, borsh_1.u64)('activeStakeLamports'),
    /// Amount of transient stake delegated to this validator
    /// Note that if `last_update_epoch` does not match the current epoch then
    /// this field may not be accurate
    (0, borsh_1.u64)('transientStakeLamports'),
    /// Last epoch the active and transient stake lamports fields were updated
    (0, borsh_1.u64)('lastUpdateEpoch'),
    /// Start of the validator transient account seed suffixes
    (0, borsh_1.u64)('transientSeedSuffixStart'),
    /// End of the validator transient account seed suffixes
    (0, borsh_1.u64)('transientSeedSuffixEnd'),
    /// Status of the validator stake account
    (0, borsh_1.u8)('status'),
    /// Validator vote account address
    (0, borsh_1.publicKey)('voteAccountAddress'),
]);
exports.ValidatorListLayout = (0, borsh_1.struct)([
    (0, borsh_1.u8)('accountType'),
    (0, borsh_1.u32)('maxValidators'),
    (0, borsh_1.vec)(exports.ValidatorStakeInfoLayout, 'validators'),
]);
