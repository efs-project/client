const deployedContracts = {
  31337: {
    Indexer: {
      address: "0xce84630CeAd1286ce6106671243c139E79f92CFe",
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
        version:
          "@ethereum-attestation-service/eas-contracts/contracts/Semver.sol",
      },
    },
    TopicResolver: {
      address: "0xDbd303b52d4F3E85Ceeced70E2361833EAEB788d",
      abi: [
        {
          inputs: [
            {
              internalType: "contract IEAS",
              name: "eas",
              type: "address",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          inputs: [],
          name: "AccessDenied",
          type: "error",
        },
        {
          inputs: [],
          name: "InsufficientValue",
          type: "error",
        },
        {
          inputs: [],
          name: "InvalidEAS",
          type: "error",
        },
        {
          inputs: [],
          name: "InvalidLength",
          type: "error",
        },
        {
          inputs: [],
          name: "NotPayable",
          type: "error",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "bytes32",
              name: "uid",
              type: "bytes32",
            },
          ],
          name: "RootTopicCreated",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "bytes32",
              name: "uid",
              type: "bytes32",
            },
            {
              indexed: false,
              internalType: "string",
              name: "name",
              type: "string",
            },
          ],
          name: "TopicCreated",
          type: "event",
        },
        {
          inputs: [
            {
              components: [
                {
                  internalType: "bytes32",
                  name: "uid",
                  type: "bytes32",
                },
                {
                  internalType: "bytes32",
                  name: "schema",
                  type: "bytes32",
                },
                {
                  internalType: "uint64",
                  name: "time",
                  type: "uint64",
                },
                {
                  internalType: "uint64",
                  name: "expirationTime",
                  type: "uint64",
                },
                {
                  internalType: "uint64",
                  name: "revocationTime",
                  type: "uint64",
                },
                {
                  internalType: "bytes32",
                  name: "refUID",
                  type: "bytes32",
                },
                {
                  internalType: "address",
                  name: "recipient",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "attester",
                  type: "address",
                },
                {
                  internalType: "bool",
                  name: "revocable",
                  type: "bool",
                },
                {
                  internalType: "bytes",
                  name: "data",
                  type: "bytes",
                },
              ],
              internalType: "struct Attestation",
              name: "attestation",
              type: "tuple",
            },
          ],
          name: "attest",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [],
          name: "isPayable",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "pure",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "_name",
              type: "string",
            },
          ],
          name: "isValidIriComponentForStorage",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "pure",
          type: "function",
        },
        {
          inputs: [
            {
              components: [
                {
                  internalType: "bytes32",
                  name: "uid",
                  type: "bytes32",
                },
                {
                  internalType: "bytes32",
                  name: "schema",
                  type: "bytes32",
                },
                {
                  internalType: "uint64",
                  name: "time",
                  type: "uint64",
                },
                {
                  internalType: "uint64",
                  name: "expirationTime",
                  type: "uint64",
                },
                {
                  internalType: "uint64",
                  name: "revocationTime",
                  type: "uint64",
                },
                {
                  internalType: "bytes32",
                  name: "refUID",
                  type: "bytes32",
                },
                {
                  internalType: "address",
                  name: "recipient",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "attester",
                  type: "address",
                },
                {
                  internalType: "bool",
                  name: "revocable",
                  type: "bool",
                },
                {
                  internalType: "bytes",
                  name: "data",
                  type: "bytes",
                },
              ],
              internalType: "struct Attestation[]",
              name: "attestations",
              type: "tuple[]",
            },
            {
              internalType: "uint256[]",
              name: "values",
              type: "uint256[]",
            },
          ],
          name: "multiAttest",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [
            {
              components: [
                {
                  internalType: "bytes32",
                  name: "uid",
                  type: "bytes32",
                },
                {
                  internalType: "bytes32",
                  name: "schema",
                  type: "bytes32",
                },
                {
                  internalType: "uint64",
                  name: "time",
                  type: "uint64",
                },
                {
                  internalType: "uint64",
                  name: "expirationTime",
                  type: "uint64",
                },
                {
                  internalType: "uint64",
                  name: "revocationTime",
                  type: "uint64",
                },
                {
                  internalType: "bytes32",
                  name: "refUID",
                  type: "bytes32",
                },
                {
                  internalType: "address",
                  name: "recipient",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "attester",
                  type: "address",
                },
                {
                  internalType: "bool",
                  name: "revocable",
                  type: "bool",
                },
                {
                  internalType: "bytes",
                  name: "data",
                  type: "bytes",
                },
              ],
              internalType: "struct Attestation[]",
              name: "attestations",
              type: "tuple[]",
            },
            {
              internalType: "uint256[]",
              name: "values",
              type: "uint256[]",
            },
          ],
          name: "multiRevoke",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [
            {
              components: [
                {
                  internalType: "bytes32",
                  name: "uid",
                  type: "bytes32",
                },
                {
                  internalType: "bytes32",
                  name: "schema",
                  type: "bytes32",
                },
                {
                  internalType: "uint64",
                  name: "time",
                  type: "uint64",
                },
                {
                  internalType: "uint64",
                  name: "expirationTime",
                  type: "uint64",
                },
                {
                  internalType: "uint64",
                  name: "revocationTime",
                  type: "uint64",
                },
                {
                  internalType: "bytes32",
                  name: "refUID",
                  type: "bytes32",
                },
                {
                  internalType: "address",
                  name: "recipient",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "attester",
                  type: "address",
                },
                {
                  internalType: "bool",
                  name: "revocable",
                  type: "bool",
                },
                {
                  internalType: "bytes",
                  name: "data",
                  type: "bytes",
                },
              ],
              internalType: "struct Attestation",
              name: "attestation",
              type: "tuple",
            },
          ],
          name: "revoke",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [],
          name: "rootTopicUid",
          outputs: [
            {
              internalType: "bytes32",
              name: "",
              type: "bytes32",
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
        {
          stateMutability: "payable",
          type: "receive",
        },
      ],
      inheritedFunctions: {
        attest:
          "@ethereum-attestation-service/eas-contracts/contracts/resolver/SchemaResolver.sol",
        isPayable:
          "@ethereum-attestation-service/eas-contracts/contracts/resolver/SchemaResolver.sol",
        multiAttest:
          "@ethereum-attestation-service/eas-contracts/contracts/resolver/SchemaResolver.sol",
        multiRevoke:
          "@ethereum-attestation-service/eas-contracts/contracts/resolver/SchemaResolver.sol",
        revoke:
          "@ethereum-attestation-service/eas-contracts/contracts/resolver/SchemaResolver.sol",
        version:
          "@ethereum-attestation-service/eas-contracts/contracts/resolver/SchemaResolver.sol",
      },
    },
  },
} as const;

export const IndexerDef = deployedContracts[31337].Indexer;
export const TopicResolverDef = deployedContracts[31337].TopicResolver;