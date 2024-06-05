"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MINIMUM_ACTIVE_STAKE = exports.TRANSIENT_STAKE_SEED_PREFIX = exports.EPHEMERAL_STAKE_SEED_PREFIX = exports.MAX_VALIDATORS_TO_UPDATE = exports.STAKE_POOL_PROGRAM_ID = exports.METADATA_MAX_URI_LENGTH = exports.METADATA_MAX_SYMBOL_LENGTH = exports.METADATA_MAX_NAME_LENGTH = exports.METADATA_PROGRAM_ID = void 0;
var buffer_1 = require("buffer");
var web3_js_1 = require("@solana/web3.js");
// Public key that identifies the metadata program.
exports.METADATA_PROGRAM_ID = new web3_js_1.PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');
exports.METADATA_MAX_NAME_LENGTH = 32;
exports.METADATA_MAX_SYMBOL_LENGTH = 10;
exports.METADATA_MAX_URI_LENGTH = 200;
// Public key that identifies the SPL Stake Pool program.
exports.STAKE_POOL_PROGRAM_ID = new web3_js_1.PublicKey('585UYiD9xQHgcrfty2PxW9GEUnQDKcAj931pKi9iv1pK');
// Maximum number of validators to update during UpdateValidatorListBalance.
exports.MAX_VALIDATORS_TO_UPDATE = 5;
// Seed for ephemeral stake account
exports.EPHEMERAL_STAKE_SEED_PREFIX = buffer_1.Buffer.from('ephemeral');
// Seed used to derive transient stake accounts.
exports.TRANSIENT_STAKE_SEED_PREFIX = buffer_1.Buffer.from('transient');
// Minimum amount of staked SOL required in a validator stake account to allow
// for merges without a mismatch on credits observed
exports.MINIMUM_ACTIVE_STAKE = web3_js_1.LAMPORTS_PER_SOL;
