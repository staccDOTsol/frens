"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lamportsToSol = exports.solToLamports = void 0;
var web3_js_1 = require("@solana/web3.js");
function solToLamports(amount) {
    if (isNaN(amount))
        return Number(0);
    return Number(amount * web3_js_1.LAMPORTS_PER_SOL);
}
exports.solToLamports = solToLamports;
function lamportsToSol(lamports) {
    if (typeof lamports === 'number') {
        return Math.abs(lamports) / web3_js_1.LAMPORTS_PER_SOL;
    }
    if (typeof lamports === 'bigint') {
        return Math.abs(Number(lamports)) / web3_js_1.LAMPORTS_PER_SOL;
    }
    var signMultiplier = 1;
    if (lamports.isNeg()) {
        signMultiplier = -1;
    }
    var absLamports = lamports.abs();
    var lamportsString = absLamports.toString(10).padStart(10, '0');
    var splitIndex = lamportsString.length - 9;
    var solString = lamportsString.slice(0, splitIndex) + '.' + lamportsString.slice(splitIndex);
    return signMultiplier * parseFloat(solString);
}
exports.lamportsToSol = lamportsToSol;
