import { INDEXER_ADDRESS, INDEXER_ABI, TOPIC_RESOLVER_ADDRESS, TOPIC_RESOLVER_ABI } from './contractConstants';

export const IndexerDef = {
  address: INDEXER_ADDRESS,
  abi: INDEXER_ABI,
  inheritedFunctions: {
    version: "@ethereum-attestation-service/eas-contracts/contracts/Semver.sol",
  },
} as const;

export const TopicResolverDef = {
  address: TOPIC_RESOLVER_ADDRESS,
  abi: TOPIC_RESOLVER_ABI,
  inheritedFunctions: {
    attest: "@ethereum-attestation-service/eas-contracts/contracts/resolver/SchemaResolver.sol",
    isPayable: "@ethereum-attestation-service/eas-contracts/contracts/resolver/SchemaResolver.sol",
    multiAttest: "@ethereum-attestation-service/eas-contracts/contracts/resolver/SchemaResolver.sol",
    multiRevoke: "@ethereum-attestation-service/eas-contracts/contracts/resolver/SchemaResolver.sol",
    revoke: "@ethereum-attestation-service/eas-contracts/contracts/resolver/SchemaResolver.sol",
    version: "@ethereum-attestation-service/eas-contracts/contracts/resolver/SchemaResolver.sol",
  },
} as const;