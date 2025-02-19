// TODO: Connect a user wallet with keys and create transactions, will do this in the deploy scripts for now

import { client } from '../kernel/wallet.ts';

const IndexerDef = {
    address: "0x8E932029963f8331F4678110172A399f4aA0bAFD",
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
    try {
        const result = await client.readContract({
            address: IndexerDef.address as `0x${string}`,
            abi: IndexerDef.abi,
            functionName: 'isAttestationIndexed',
            args: [uid as `0x${string}`]
        }) as boolean;
        
        console.log('Is attestation indexed:', result);
        return result;
    } catch (error: unknown) {
        console.error('Failed to check attestation index status:', error);
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
    console.log('getReferencingAttestationUIDs running for attestationUID:', attestationUID, 'schemaUID:', schemaUID);
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
        
        console.log('Referenced attestations:', result);
        return result;
    } catch (error: unknown) {
        console.error('Failed to get referencing attestations:', error);
        throw error;
    }
}

export async function getReferencingAttestationUIDCount(
    attestationUID: string,
    schemaUID: string
): Promise<bigint> {
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
        
        console.log('Referencing attestation count:', result);
        return result;
    } catch (error: unknown) {
        console.error('Failed to get referencing attestation count:', error);
        throw error;
    }
}

// Usage:
// const uid = '0x21792c13ed1e2b20c3827ec68c644dd8a79b9c137c6e2f21aa9ccc9cafc1b7a5';
// await isAttestationIndexed(uid);

// export async function indexAttestation(uid: string) {
//     console.log('indexAttestation running');
    
//     try {
//         const result = await client.writeContract({
//             address: IndexerDef.address,
//             abi: IndexerDef.abi,
//             functionName: 'indexAttestation',
//             args: [uid]
//         });
        
//         console.log('Indexing transaction hash:', result);
//         return result;
//     } catch (error) {
//         console.error('Failed to index attestation:', error);
//         throw error;
//     }
// }