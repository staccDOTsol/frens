/// <reference types="node" />
import { PublicKey } from '@solana/web3.js';
import BN from 'bn.js';
export interface Layout<T> {
    span: number;
    property?: string;
    decode(b: Buffer, offset?: number): T;
    encode(src: T, b: Buffer, offset?: number): number;
    getSpan(b: Buffer, offset?: number): number;
    replicate(name: string): this;
}
export declare function u64(property?: string): Layout<BN>;
export declare function publicKey(property?: string): Layout<PublicKey>;
export declare function option<T>(layout: Layout<T>, property?: string): Layout<T | null>;
export declare function bool(property?: string): Layout<boolean>;
export declare function vec<T>(elementLayout: Layout<T>, property?: string): Layout<T[]>;
