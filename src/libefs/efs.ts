// TODO: Connect a user wallet with keys and create transactions, will do this in the deploy scripts for now

import { client } from '../kernel/wallet.ts';

const IndexerDef = {
  address: "0x8A33b58a05b70618c3fb73E4eFa18163aA4CD0c2",
  abi: [
    {
      inputs: [
        {
          internalType: "contract IEAS",
          name: "eas",
          type: "address",
        },
        {
          internalType: "address",
          name: "prevIndexer",
          type: "address",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [],
      name: "InvalidAttestation",
      type: "error",
    },
    {
      inputs: [],
      name: "InvalidEAS",
      type: "error",
    },
    {
      inputs: [],
      name: "InvalidOffset",
      type: "error",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "uid",
          type: "bytes32",
        },
      ],
      name: "Indexed",
      type: "event",
    },
    {
      inputs: [],
      name: "getEAS",
      outputs: [
        {
          internalType: "contract IEAS",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getPrevIndexer",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "recipient",
          type: "address",
        },
        {
          internalType: "bytes32",
          name: "schemaUID",
          type: "bytes32",
        },
      ],
      name: "getReceivedAttestationUIDCount",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "recipient",
          type: "address",
        },
        {
          internalType: "bytes32",
          name: "schemaUID",
          type: "bytes32",
        },
        {
          internalType: "uint256",
          name: "start",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "length",
          type: "uint256",
        },
        {
          internalType: "bool",
          name: "reverseOrder",
          type: "bool",
        },
      ],
      name: "getReceivedAttestationUIDs",
      outputs: [
        {
          internalType: "bytes32[]",
          name: "",
          type: "bytes32[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "attestionUID",
          type: "bytes32",
        },
        {
          internalType: "bytes32",
          name: "schemaUID",
          type: "bytes32",
        },
        {
          internalType: "address",
          name: "attester",
          type: "address",
        },
      ],
      name: "getReferencingAttestationUIDByAddressCount",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "attestionUID",
          type: "bytes32",
        },
        {
          internalType: "bytes32",
          name: "schemaUID",
          type: "bytes32",
        },
      ],
      name: "getReferencingAttestationUIDCount",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "attestionUID",
          type: "bytes32",
        },
        {
          internalType: "bytes32",
          name: "schemaUID",
          type: "bytes32",
        },
        {
          internalType: "uint256",
          name: "start",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "length",
          type: "uint256",
        },
        {
          internalType: "bool",
          name: "reverseOrder",
          type: "bool",
        },
      ],
      name: "getReferencingAttestationUIDs",
      outputs: [
        {
          internalType: "bytes32[]",
          name: "",
          type: "bytes32[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "attestionUID",
          type: "bytes32",
        },
        {
          internalType: "bytes32",
          name: "schemaUID",
          type: "bytes32",
        },
        {
          internalType: "address",
          name: "attester",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "start",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "length",
          type: "uint256",
        },
        {
          internalType: "bool",
          name: "reverseOrder",
          type: "bool",
        },
      ],
      name: "getReferencingAttestationUIDsByAddress",
      outputs: [
        {
          internalType: "bytes32[]",
          name: "",
          type: "bytes32[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "schemaUID",
          type: "bytes32",
        },
      ],
      name: "getSchemaAttestationUIDCount",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "schemaUID",
          type: "bytes32",
        },
        {
          internalType: "uint256",
          name: "start",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "length",
          type: "uint256",
        },
        {
          internalType: "bool",
          name: "reverseOrder",
          type: "bool",
        },
      ],
      name: "getSchemaAttestationUIDs",
      outputs: [
        {
          internalType: "bytes32[]",
          name: "",
          type: "bytes32[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "schemaUID",
          type: "bytes32",
        },
        {
          internalType: "address",
          name: "attester",
          type: "address",
        },
        {
          internalType: "address",
          name: "recipient",
          type: "address",
        },
      ],
      name: "getSchemaAttesterRecipientAttestationUIDCount",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "schemaUID",
          type: "bytes32",
        },
        {
          internalType: "address",
          name: "attester",
          type: "address",
        },
        {
          internalType: "address",
          name: "recipient",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "start",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "length",
          type: "uint256",
        },
        {
          internalType: "bool",
          name: "reverseOrder",
          type: "bool",
        },
      ],
      name: "getSchemaAttesterRecipientAttestationUIDs",
      outputs: [
        {
          internalType: "bytes32[]",
          name: "",
          type: "bytes32[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "attester",
          type: "address",
        },
        {
          internalType: "bytes32",
          name: "schemaUID",
          type: "bytes32",
        },
      ],
      name: "getSentAttestationUIDCount",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "attester",
          type: "address",
        },
        {
          internalType: "bytes32",
          name: "schemaUID",
          type: "bytes32",
        },
        {
          internalType: "uint256",
          name: "start",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "length",
          type: "uint256",
        },
        {
          internalType: "bool",
          name: "reverseOrder",
          type: "bool",
        },
      ],
      name: "getSentAttestationUIDs",
      outputs: [
        {
          internalType: "bytes32[]",
          name: "",
          type: "bytes32[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "attestationUID",
          type: "bytes32",
        },
      ],
      name: "indexAttestation",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32[]",
          name: "attestationUIDs",
          type: "bytes32[]",
        },
      ],
      name: "indexAttestations",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "attestationUID",
          type: "bytes32",
        },
      ],
      name: "isAttestationIndexed",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "version",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ],
  inheritedFunctions: {
    version: "eas/contracts/Semver.sol",
  },
}
export { IndexerDef };

export async function isAttestationIndexed(uid: string): Promise<boolean> {
    console.log('efs.isAttestationIndexed for uid:', uid.slice(0, 7));
    try {
        const result = await client.readContract({
            address: IndexerDef.address as `0x${string}`,
            abi: IndexerDef.abi,
            functionName: 'isAttestationIndexed',
            args: [uid as `0x${string}`]
        }) as boolean;
        
        console.log('efs.isAttestationIndexed:', result, " [", uid.slice(0, 7), "]");
        return result;
    } catch (error: unknown) {
        console.error('Failed to check efs.isAttestationIndexed:', error);
        throw error;
    }
}

export async function getReferencingAttestationUIDs(
    attestationUID: string,
    schemaUID: string,
    start?: number,
    length?: number,
    reverseOrder: boolean = false
): Promise<`0x${string}`[]> {
    console.log('efs.getReferencingAttestationUIDs for attestationUID:', attestationUID.slice(0, 7), 'schemaUID:', schemaUID.slice(0, 7));
    try {
        // If length not provided, get total count
        if (length === undefined) {
            length = Number(await getReferencingAttestationUIDCount(attestationUID, schemaUID));
        }

        const result = await client.readContract({
            address: IndexerDef.address as `0x${string}`,
            abi: IndexerDef.abi,
            functionName: 'getReferencingAttestationUIDs',
            args: [
                attestationUID as `0x${string}`,
                schemaUID as `0x${string}`,
                BigInt(start ?? 0),
                BigInt(length),
                reverseOrder
            ]
        }) as `0x${string}`[];
        
        console.log('efs.getReferencingAttestationUIDs:', result);
        return result;
    } catch (error: unknown) {
        console.error('Failed to get efs.getReferencingAttestationUIDs:', error);
        throw error;
    }
}

export async function getReferencingAttestationUIDCount(
    attestationUID: string,
    schemaUID: string
): Promise<bigint> {
    console.log('efs.getReferencingAttestationUIDCount for attestationUID:', attestationUID.slice(0, 7), 'schemaUID:', schemaUID.slice(0, 7));
    try {
        const result = await client.readContract({
            address: IndexerDef.address as `0x${string}`,
            abi: IndexerDef.abi,
            functionName: 'getReferencingAttestationUIDCount',
            args: [
                attestationUID as `0x${string}`,
                schemaUID as `0x${string}`
            ]
        }) as bigint;
        
        console.log('efs.getReferencingAttestationUIDCount:', result);
        return result;
    } catch (error: unknown) {
        console.error('Failed to get efs.getReferencingAttestationUIDCount:', error);
        throw error;
    }
}