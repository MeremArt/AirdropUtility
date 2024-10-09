import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { Program, Wallet, AnchorProvider, Idl } from "@coral-xyz/anchor";
import { SystemProgram } from "@solana/web3.js";
import wallet from "./Turbin3-wallet.json";
import { Turbin3Prereq } from "./programs/Turbin3_prereq";
import idl from "./idl.json";

// Define the Turbin3Prereq type

// Cast the imported IDL to Idl type
const IDL: Idl = idl as Idl;
const IDLmetadata: any = "WBAQSygkwMox2VuWKU133NxFrpDZUBdvSBeaBEue2Jq";

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
const connection = new Connection("https://api.devnet.solana.com");
const github = Buffer.from("MeremArt", "utf8");

const provider = new AnchorProvider(connection, new Wallet(keypair), {
  commitment: "confirmed",
});
// Use the Idl type when creating the Program instance

const program: Program<Turbin3Prereq> = new Program(IDL, provider);
const enrollment_seeds = [Buffer.from("prereq"), keypair.publicKey.toBuffer()];
const [enrollment_key, _bump] = PublicKey.findProgramAddressSync(
  enrollment_seeds,
  program.programId
);

(async () => {
  try {
    const txhash = await program.methods
      .complete(github)
      .accounts({
        signer: keypair.publicKey,
        prereq: enrollment_key,
        systemProgram: SystemProgram.programId,
      })
      .signers([keypair])
      .rpc();
    console.log(`Success! Check out your TX here:
    https://explorer.solana.com/tx/${txhash}?cluster=devnet`);
  } catch (e) {
    console.error(`Oops, something went wrong: ${e}`);
  }
})();
