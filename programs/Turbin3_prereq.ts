import idl from "../idl.json";

export type Turbin3Prereq = {
  idl: Idl;
  version: string;
  address: string;
  metadata: {
    name: string;
    version: string;
    spec: string;
    description: string;
  };
  instructions: Array<{
    name: string;
    discriminator: number[];
    accounts: Array<{
      name: string;
      writable?: boolean;
      signer?: boolean;
      pda?: {
        seeds: Array<{
          kind: string;
          value?: number[];
          path?: string;
        }>;
      };
    }>;
    args: Array<{
      name: string;
      type: string;
    }>;
  }>;
  accounts: Array<{
    name: string;
    discriminator: number[];
  }>;
  errors?: Array<{
    code: number;
    name: string;
    msg: string;
  }>;
  types: Array<{
    name: string;
    type: {
      kind: string;
      fields: Array<{
        name: string;
        type: string;
      }>;
    };
  }>;
};
export const IDL: Turbin3Prereq = {
  version: "0.1.0", // Now matches the Turbin3Prereq type
  address: "WBAQSygkwMox2VuWKU133NxFrpDZUBdvSBeaBEue2Jq",
  metadata: {
    name: "wba_prereq",
    version: "0.1.0",
    spec: "0.1.0",
    description: "Created with Anchor",
  },
  idl: idl,
};
