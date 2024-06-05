"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeData = exports.encodeData = void 0;
var buffer_1 = require("buffer");
/**
 * Populate a buffer of instruction data using an InstructionType
 * @internal
 */
function encodeData(type, fields) {
    var allocLength = type.layout.span;
    var data = buffer_1.Buffer.alloc(allocLength);
    var layoutFields = Object.assign({ instruction: type.index }, fields);
    type.layout.encode(layoutFields, data);
    return data;
}
exports.encodeData = encodeData;
/**
 * Decode instruction data buffer using an InstructionType
 * @internal
 */
function decodeData(type, buffer) {
    var data;
    try {
        data = type.layout.decode(buffer);
    }
    catch (err) {
        throw new Error('invalid instruction; ' + err);
    }
    if (data.instruction !== type.index) {
        throw new Error("invalid instruction; instruction index mismatch ".concat(data.instruction, " != ").concat(type.index));
    }
    return data;
}
exports.decodeData = decodeData;
