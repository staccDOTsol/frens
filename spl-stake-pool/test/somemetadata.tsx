    const { Connection, Keypair, PublicKey, Transaction } = require('@solana/web3.js');
const {
  createPoolTokenMetadata,
} = require('../src');
const fs = require('fs');
const payer = Keypair.fromSecretKey(new Uint8Array(JSON.parse(fs.readFileSync('/Users/jd//mani.json').toString())))

const symbol = "oSOL"
const connection = new Connection(process.env.ANCHOR_PROVIDER)
async function main() {
    const res = await createPoolTokenMetadata(
        connection,
        new PublicKey("5CviD3k4Ce22xgaueKqssZsRAqKN4PZnCe5vpgCUBpzx"),
        payer.publicKey,
        "Meme",
        "meSol",
        "https://gist.githubusercontent.com/staccDOTsol/76f75330accb2d6b2c946c2dd3a37728/raw/72a916ce67c969f8dd5db67e851a8ced75b907e7/gistfile1.txt",
      );

      let tx = new Transaction().add(...res.instructions)
        tx.feePayer = payer.publicKey   
        tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash
        await connection.sendTransaction(tx, [payer])


    }
    main()