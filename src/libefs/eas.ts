import { ethersProvider, client } from '../kernel/wallet.ts';
import * as eassdk from "@ethereum-attestation-service/eas-sdk";

const easObj = new eassdk.EAS('0xC2679fBD37d54388Ce493F1DB75320D236e1815e');
const schemaRegistry = new eassdk.SchemaRegistry('0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0');

export class EASx extends eassdk.EAS {
    constructor(address: string) {
        super(address);
    }

    async getAttestation(uid: string): Promise<eassdk.Attestation> {
        return await this.getAttestation(uid);
    }

    async getAttestationItems(uid: string): Promise<eassdk.SchemaItem[]> {
        return await this.getAttestationItems(uid);
    }
}

export async function getAttestation(uid: string): Promise<eassdk.Attestation> {
    console.log('eas.getAttestation running for %s', uid);
    
    if (!uid) {
        uid = "0x6e4851b1ee4ee826a06a4514895640816b4143bf2408c33e5c1263275daf53ce";
    }

    easObj.connect(ethersProvider);
    schemaRegistry.connect(ethersProvider);

    const attestation = await easObj.getAttestation(uid);
    const schemaRecord = await schemaRegistry.getSchema({ uid: attestation.schema });
    const schemaEncoder = new eassdk.SchemaEncoder(schemaRecord.schema);
    const items: eassdk.SchemaDecodedItem[] = schemaEncoder.decodeData(attestation.data);
    
    // Log decoded data
    items.forEach((item) => {
        console.log(uid.slice(0, 7), ": ", item.value.name, " = ", item.value.value, " [", item.value.type, "]");
    });

    return attestation;
}



export async function getAttestationItems(uid: string): Promise<eassdk.SchemaItem[]> {
    console.log('eas.getAttestationItems running for', uid.slice(0, 7));

    easObj.connect(ethersProvider);
    schemaRegistry.connect(ethersProvider);

    const attestation = await easObj.getAttestation(uid);
    const schemaRecord = await schemaRegistry.getSchema({ uid: attestation.schema });
    const schemaEncoder = new eassdk.SchemaEncoder(schemaRecord.schema);
    const decodedItems: eassdk.SchemaDecodedItem[] = schemaEncoder.decodeData(attestation.data);

    // Convert decoded items to SchemaItems
    return decodedItems.map(item => ({
        name: item.value.name,
        value: item.value.value,
        type: item.value.type
    }));
}

const IndexerDef = {
    "address": "0xA3A32D9b5e315804E2E013B4822A6Ef413d3dA3f",
    "abi": [
      {
        "inputs": [
          {
            "internalType": "contract IEAS",
            "name": "eas",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "prevIndexer",
            "type": "address"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "inputs": [],
        "name": "InvalidAttestation",
        "type": "error"
      },
      {
        "inputs": [],
        "name": "InvalidEAS",
        "type": "error"
      },
      {
        "inputs": [],
        "name": "InvalidOffset",
        "type": "error"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "bytes32",
            "name": "uid",
            "type": "bytes32"
          }
        ],
        "name": "Indexed",
        "type": "event"
      },
      {
        "inputs": [],
        "name": "getEAS",
        "outputs": [
          {
            "internalType": "contract IEAS",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getPrevIndexer",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "recipient",
            "type": "address"
          },
          {
            "internalType": "bytes32",
            "name": "schemaUID",
            "type": "bytes32"
          }
        ],
        "name": "getReceivedAttestationUIDCount",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "recipient",
            "type": "address"
          },
          {
            "internalType": "bytes32",
            "name": "schemaUID",
            "type": "bytes32"
          },
          {
            "internalType": "uint256",
            "name": "start",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "length",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "reverseOrder",
            "type": "bool"
          }
        ],
        "name": "getReceivedAttestationUIDs",
        "outputs": [
          {
            "internalType": "bytes32[]",
            "name": "",
            "type": "bytes32[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "attestionUID",
            "type": "bytes32"
          },
          {
            "internalType": "bytes32",
            "name": "schemaUID",
            "type": "bytes32"
          },
          {
            "internalType": "address",
            "name": "attester",
            "type": "address"
          }
        ],
        "name": "getReferencingAttestationUIDByAddressCount",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "attestionUID",
            "type": "bytes32"
          },
          {
            "internalType": "bytes32",
            "name": "schemaUID",
            "type": "bytes32"
          }
        ],
        "name": "getReferencingAttestationUIDCount",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "attestionUID",
            "type": "bytes32"
          },
          {
            "internalType": "bytes32",
            "name": "schemaUID",
            "type": "bytes32"
          },
          {
            "internalType": "uint256",
            "name": "start",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "length",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "reverseOrder",
            "type": "bool"
          }
        ],
        "name": "getReferencingAttestationUIDs",
        "outputs": [
          {
            "internalType": "bytes32[]",
            "name": "",
            "type": "bytes32[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "attestionUID",
            "type": "bytes32"
          },
          {
            "internalType": "bytes32",
            "name": "schemaUID",
            "type": "bytes32"
          },
          {
            "internalType": "address",
            "name": "attester",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "start",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "length",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "reverseOrder",
            "type": "bool"
          }
        ],
        "name": "getReferencingAttestationUIDsByAddress",
        "outputs": [
          {
            "internalType": "bytes32[]",
            "name": "",
            "type": "bytes32[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "schemaUID",
            "type": "bytes32"
          }
        ],
        "name": "getSchemaAttestationUIDCount",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "schemaUID",
            "type": "bytes32"
          },
          {
            "internalType": "uint256",
            "name": "start",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "length",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "reverseOrder",
            "type": "bool"
          }
        ],
        "name": "getSchemaAttestationUIDs",
        "outputs": [
          {
            "internalType": "bytes32[]",
            "name": "",
            "type": "bytes32[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "schemaUID",
            "type": "bytes32"
          },
          {
            "internalType": "address",
            "name": "attester",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "recipient",
            "type": "address"
          }
        ],
        "name": "getSchemaAttesterRecipientAttestationUIDCount",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "schemaUID",
            "type": "bytes32"
          },
          {
            "internalType": "address",
            "name": "attester",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "recipient",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "start",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "length",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "reverseOrder",
            "type": "bool"
          }
        ],
        "name": "getSchemaAttesterRecipientAttestationUIDs",
        "outputs": [
          {
            "internalType": "bytes32[]",
            "name": "",
            "type": "bytes32[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "attester",
            "type": "address"
          },
          {
            "internalType": "bytes32",
            "name": "schemaUID",
            "type": "bytes32"
          }
        ],
        "name": "getSentAttestationUIDCount",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "attester",
            "type": "address"
          },
          {
            "internalType": "bytes32",
            "name": "schemaUID",
            "type": "bytes32"
          },
          {
            "internalType": "uint256",
            "name": "start",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "length",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "reverseOrder",
            "type": "bool"
          }
        ],
        "name": "getSentAttestationUIDs",
        "outputs": [
          {
            "internalType": "bytes32[]",
            "name": "",
            "type": "bytes32[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "attestationUID",
            "type": "bytes32"
          }
        ],
        "name": "indexAttestation",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32[]",
            "name": "attestationUIDs",
            "type": "bytes32[]"
          }
        ],
        "name": "indexAttestations",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "attestationUID",
            "type": "bytes32"
          }
        ],
        "name": "isAttestationIndexed",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "version",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
    ],
    "transactionHash": "0xd689dde87b4afda26a7cc1d84f3c9bd3679c51fa47ab1e86cf3f62878176783e",
    "receipt": {
      "to": null,
      "from": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      "contractAddress": "0xA3A32D9b5e315804E2E013B4822A6Ef413d3dA3f",
      "transactionIndex": 0,
      "gasUsed": "1103399",
      "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
      "blockHash": "0x69d86e5dad472c8b9b94a073648a004f3afb9b67f58039ee2defdbd794847bdf",
      "transactionHash": "0xd689dde87b4afda26a7cc1d84f3c9bd3679c51fa47ab1e86cf3f62878176783e",
      "logs": [],
      "blockNumber": 8028841,
      "cumulativeGasUsed": "1103399",
      "status": 1,
      "byzantium": true
    },
    "args": [
      "0xC2679fBD37d54388Ce493F1DB75320D236e1815e",
      "0xaEF4103A04090071165F78D45D83A0C0782c2B2a"
    ],
    "numDeployments": 1,
    "solcInputHash": "ad70e5a411858b829e2ddeac4d472a19",
    "metadata": "{\"compiler\":{\"version\":\"0.8.28+commit.7893614a\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[{\"internalType\":\"contract IEAS\",\"name\":\"eas\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"prevIndexer\",\"type\":\"address\"}],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"inputs\":[],\"name\":\"InvalidAttestation\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidEAS\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidOffset\",\"type\":\"error\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"}],\"name\":\"Indexed\",\"type\":\"event\"},{\"inputs\":[],\"name\":\"getEAS\",\"outputs\":[{\"internalType\":\"contract IEAS\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"getPrevIndexer\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"bytes32\",\"name\":\"schemaUID\",\"type\":\"bytes32\"}],\"name\":\"getReceivedAttestationUIDCount\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"bytes32\",\"name\":\"schemaUID\",\"type\":\"bytes32\"},{\"internalType\":\"uint256\",\"name\":\"start\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"length\",\"type\":\"uint256\"},{\"internalType\":\"bool\",\"name\":\"reverseOrder\",\"type\":\"bool\"}],\"name\":\"getReceivedAttestationUIDs\",\"outputs\":[{\"internalType\":\"bytes32[]\",\"name\":\"\",\"type\":\"bytes32[]\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"attestionUID\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schemaUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"}],\"name\":\"getReferencingAttestationUIDByAddressCount\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"attestionUID\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schemaUID\",\"type\":\"bytes32\"}],\"name\":\"getReferencingAttestationUIDCount\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"attestionUID\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schemaUID\",\"type\":\"bytes32\"},{\"internalType\":\"uint256\",\"name\":\"start\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"length\",\"type\":\"uint256\"},{\"internalType\":\"bool\",\"name\":\"reverseOrder\",\"type\":\"bool\"}],\"name\":\"getReferencingAttestationUIDs\",\"outputs\":[{\"internalType\":\"bytes32[]\",\"name\":\"\",\"type\":\"bytes32[]\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"attestionUID\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schemaUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"start\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"length\",\"type\":\"uint256\"},{\"internalType\":\"bool\",\"name\":\"reverseOrder\",\"type\":\"bool\"}],\"name\":\"getReferencingAttestationUIDsByAddress\",\"outputs\":[{\"internalType\":\"bytes32[]\",\"name\":\"\",\"type\":\"bytes32[]\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"schemaUID\",\"type\":\"bytes32\"}],\"name\":\"getSchemaAttestationUIDCount\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"schemaUID\",\"type\":\"bytes32\"},{\"internalType\":\"uint256\",\"name\":\"start\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"length\",\"type\":\"uint256\"},{\"internalType\":\"bool\",\"name\":\"reverseOrder\",\"type\":\"bool\"}],\"name\":\"getSchemaAttestationUIDs\",\"outputs\":[{\"internalType\":\"bytes32[]\",\"name\":\"\",\"type\":\"bytes32[]\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"schemaUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"}],\"name\":\"getSchemaAttesterRecipientAttestationUIDCount\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"schemaUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"start\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"length\",\"type\":\"uint256\"},{\"internalType\":\"bool\",\"name\":\"reverseOrder\",\"type\":\"bool\"}],\"name\":\"getSchemaAttesterRecipientAttestationUIDs\",\"outputs\":[{\"internalType\":\"bytes32[]\",\"name\":\"\",\"type\":\"bytes32[]\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bytes32\",\"name\":\"schemaUID\",\"type\":\"bytes32\"}],\"name\":\"getSentAttestationUIDCount\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bytes32\",\"name\":\"schemaUID\",\"type\":\"bytes32\"},{\"internalType\":\"uint256\",\"name\":\"start\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"length\",\"type\":\"uint256\"},{\"internalType\":\"bool\",\"name\":\"reverseOrder\",\"type\":\"bool\"}],\"name\":\"getSentAttestationUIDs\",\"outputs\":[{\"internalType\":\"bytes32[]\",\"name\":\"\",\"type\":\"bytes32[]\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"attestationUID\",\"type\":\"bytes32\"}],\"name\":\"indexAttestation\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32[]\",\"name\":\"attestationUIDs\",\"type\":\"bytes32[]\"}],\"name\":\"indexAttestations\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"attestationUID\",\"type\":\"bytes32\"}],\"name\":\"isAttestationIndexed\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"version\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"}],\"devdoc\":{\"events\":{\"Indexed(bytes32)\":{\"params\":{\"uid\":\"The UID the attestation.\"}}},\"kind\":\"dev\",\"methods\":{\"constructor\":{\"details\":\"Creates a new Indexer instance.\",\"params\":{\"eas\":\"The address of the global EAS contract.\"}},\"getReceivedAttestationUIDCount(address,bytes32)\":{\"params\":{\"recipient\":\"The recipient of the attestation.\",\"schemaUID\":\"The UID of the schema.\"},\"returns\":{\"_0\":\"The total number of attestations.\"}},\"getReceivedAttestationUIDs(address,bytes32,uint256,uint256,bool)\":{\"params\":{\"length\":\"The number of total members to retrieve.\",\"recipient\":\"The recipient of the attestation.\",\"reverseOrder\":\"Whether the offset starts from the end and the data is returned in reverse.\",\"schemaUID\":\"The UID of the schema.\",\"start\":\"The offset to start from.\"},\"returns\":{\"_0\":\"An array of attestation UIDs.\"}},\"getReferencingAttestationUIDByAddressCount(bytes32,bytes32,address)\":{\"params\":{\"attester\":\"The attester of the referencing attestations.\",\"attestionUID\":\"The UID of the attestation.\",\"schemaUID\":\"The UID of the schema.\"},\"returns\":{\"_0\":\"An array of attestation UIDs.\"}},\"getReferencingAttestationUIDCount(bytes32,bytes32)\":{\"params\":{\"attestionUID\":\"The UID of the attestation.\",\"schemaUID\":\"The UID of the schema.\"},\"returns\":{\"_0\":\"An array of attestation UIDs.\"}},\"getReferencingAttestationUIDs(bytes32,bytes32,uint256,uint256,bool)\":{\"params\":{\"attestionUID\":\"The UID of the attestation being referenced.\",\"length\":\"The number of total members to retrieve.\",\"reverseOrder\":\"Whether the offset starts from the end and the data is returned in reverse.\",\"schemaUID\":\"The UID of the schema of the referencing attestations.\",\"start\":\"The offset to start from.\"},\"returns\":{\"_0\":\"An array of attestation UIDs.\"}},\"getReferencingAttestationUIDsByAddress(bytes32,bytes32,address,uint256,uint256,bool)\":{\"params\":{\"attester\":\"The attester of the referencing attestations.\",\"attestionUID\":\"The UID of the attestation being referenced.\",\"length\":\"The number of total members to retrieve.\",\"reverseOrder\":\"Whether the offset starts from the end and the data is returned in reverse.\",\"schemaUID\":\"The UID of the schema of the referencing attestations.\",\"start\":\"The offset to start from.\"},\"returns\":{\"_0\":\"An array of attestation UIDs.\"}},\"getSchemaAttestationUIDCount(bytes32)\":{\"params\":{\"schemaUID\":\"The UID of the schema.\"},\"returns\":{\"_0\":\"An array of attestation UIDs.\"}},\"getSchemaAttestationUIDs(bytes32,uint256,uint256,bool)\":{\"params\":{\"length\":\"The number of total members to retrieve.\",\"reverseOrder\":\"Whether the offset starts from the end and the data is returned in reverse.\",\"schemaUID\":\"The UID of the schema.\",\"start\":\"The offset to start from.\"},\"returns\":{\"_0\":\"An array of attestation UIDs.\"}},\"getSchemaAttesterRecipientAttestationUIDCount(bytes32,address,address)\":{\"params\":{\"attester\":\"The attester of the attestation.\",\"recipient\":\"The recipient of the attestation.\",\"schemaUID\":\"The UID of the schema.\"},\"returns\":{\"_0\":\"An array of attestation UIDs.\"}},\"getSchemaAttesterRecipientAttestationUIDs(bytes32,address,address,uint256,uint256,bool)\":{\"params\":{\"attester\":\"The attester of the attestation.\",\"length\":\"The number of total members to retrieve.\",\"recipient\":\"The recipient of the attestation.\",\"reverseOrder\":\"Whether the offset starts from the end and the data is returned in reverse.\",\"schemaUID\":\"The UID of the schema.\",\"start\":\"The offset to start from.\"},\"returns\":{\"_0\":\"An array of attestation UIDs.\"}},\"getSentAttestationUIDCount(address,bytes32)\":{\"params\":{\"attester\":\"The attester of the attestation.\",\"schemaUID\":\"The UID of the schema.\"},\"returns\":{\"_0\":\"The total number of attestations.\"}},\"getSentAttestationUIDs(address,bytes32,uint256,uint256,bool)\":{\"params\":{\"attester\":\"The attester of the attestation.\",\"length\":\"The number of total members to retrieve.\",\"reverseOrder\":\"Whether the offset starts from the end and the data is returned in reverse.\",\"schemaUID\":\"The UID of the schema.\",\"start\":\"The offset to start from.\"},\"returns\":{\"_0\":\"An array of attestation UIDs.\"}},\"indexAttestation(bytes32)\":{\"params\":{\"attestationUID\":\"The UID of the attestation to index.\"}},\"indexAttestations(bytes32[])\":{\"params\":{\"attestationUIDs\":\"The UIDs of the attestations to index.\"}},\"isAttestationIndexed(bytes32)\":{\"params\":{\"attestationUID\":\"The UID of the attestation to check.\"},\"returns\":{\"_0\":\"Whether an attestation has been already indexed.\"}},\"version()\":{\"returns\":{\"_0\":\"Semver contract version as a string.\"}}},\"title\":\"Indexer\",\"version\":1},\"userdoc\":{\"events\":{\"Indexed(bytes32)\":{\"notice\":\"Emitted when an attestation has been indexed.\"}},\"kind\":\"user\",\"methods\":{\"getEAS()\":{\"notice\":\"Returns the EAS.\"},\"getPrevIndexer()\":{\"notice\":\"Returns the previously deployed EAS Indexer.\"},\"getReceivedAttestationUIDCount(address,bytes32)\":{\"notice\":\"Returns the total number of attestations to a specific schema which were attested to/received by a     specific recipient.\"},\"getReceivedAttestationUIDs(address,bytes32,uint256,uint256,bool)\":{\"notice\":\"Returns the UIDs of attestations to a specific schema which were attested to/received by a specific     recipient.\"},\"getReferencingAttestationUIDByAddressCount(bytes32,bytes32,address)\":{\"notice\":\"Returns the total number of references to a specific attestation.\"},\"getReferencingAttestationUIDCount(bytes32,bytes32)\":{\"notice\":\"Returns the total number of references to a specific attestation.\"},\"getReferencingAttestationUIDs(bytes32,bytes32,uint256,uint256,bool)\":{\"notice\":\"Returns the UIDs of attestations referencing a specific attestation.\"},\"getReferencingAttestationUIDsByAddress(bytes32,bytes32,address,uint256,uint256,bool)\":{\"notice\":\"Returns the UIDs of attestations referencing a specific attestation.\"},\"getSchemaAttestationUIDCount(bytes32)\":{\"notice\":\"Returns the total number of attestations to a specific schema.\"},\"getSchemaAttestationUIDs(bytes32,uint256,uint256,bool)\":{\"notice\":\"Returns the UIDs of attestations to a specific schema.\"},\"getSchemaAttesterRecipientAttestationUIDCount(bytes32,address,address)\":{\"notice\":\"Returns the total number of UIDs of attestations to a specific schema which were attested by a specific     attester to a specific recipient.\"},\"getSchemaAttesterRecipientAttestationUIDs(bytes32,address,address,uint256,uint256,bool)\":{\"notice\":\"Returns the UIDs of attestations to a specific schema which were attested by a specific attester to a     specific recipient.\"},\"getSentAttestationUIDCount(address,bytes32)\":{\"notice\":\"Returns the total number of attestations to a specific schema which were attested by a specific attester.\"},\"getSentAttestationUIDs(address,bytes32,uint256,uint256,bool)\":{\"notice\":\"Returns the UIDs of attestations to a specific schema which were attested by a specific attester.\"},\"indexAttestation(bytes32)\":{\"notice\":\"Indexes an existing attestation.\"},\"indexAttestations(bytes32[])\":{\"notice\":\"Indexes multiple existing attestations.\"},\"isAttestationIndexed(bytes32)\":{\"notice\":\"Returns whether an existing attestation has been already indexed.\"},\"version()\":{\"notice\":\"Returns the full semver contract version.\"}},\"notice\":\"Indexing Service for the Ethereum Attestation Service\",\"version\":1}},\"settings\":{\"compilationTarget\":{\"contracts/Indexer.sol\":\"Indexer\"},\"evmVersion\":\"paris\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\",\"useLiteralContent\":true},\"optimizer\":{\"enabled\":true,\"runs\":200},\"remappings\":[]},\"sources\":{\"@openzeppelin/contracts/utils/Strings.sol\":{\"content\":\"// SPDX-License-Identifier: MIT\\n// OpenZeppelin Contracts (last updated v5.0.0) (utils/Strings.sol)\\n\\npragma solidity ^0.8.20;\\n\\nimport {Math} from \\\"./math/Math.sol\\\";\\nimport {SignedMath} from \\\"./math/SignedMath.sol\\\";\\n\\n/**\\n * @dev String operations.\\n */\\nlibrary Strings {\\n    bytes16 private constant HEX_DIGITS = \\\"0123456789abcdef\\\";\\n    uint8 private constant ADDRESS_LENGTH = 20;\\n\\n    /**\\n     * @dev The `value` string doesn't fit in the specified `length`.\\n     */\\n    error StringsInsufficientHexLength(uint256 value, uint256 length);\\n\\n    /**\\n     * @dev Converts a `uint256` to its ASCII `string` decimal representation.\\n     */\\n    function toString(uint256 value) internal pure returns (string memory) {\\n        unchecked {\\n            uint256 length = Math.log10(value) + 1;\\n            string memory buffer = new string(length);\\n            uint256 ptr;\\n            /// @solidity memory-safe-assembly\\n            assembly {\\n                ptr := add(buffer, add(32, length))\\n            }\\n            while (true) {\\n                ptr--;\\n                /// @solidity memory-safe-assembly\\n                assembly {\\n                    mstore8(ptr, byte(mod(value, 10), HEX_DIGITS))\\n                }\\n                value /= 10;\\n                if (value == 0) break;\\n            }\\n            return buffer;\\n        }\\n    }\\n\\n    /**\\n     * @dev Converts a `int256` to its ASCII `string` decimal representation.\\n     */\\n    function toStringSigned(int256 value) internal pure returns (string memory) {\\n        return string.concat(value < 0 ? \\\"-\\\" : \\\"\\\", toString(SignedMath.abs(value)));\\n    }\\n\\n    /**\\n     * @dev Converts a `uint256` to its ASCII `string` hexadecimal representation.\\n     */\\n    function toHexString(uint256 value) internal pure returns (string memory) {\\n        unchecked {\\n            return toHexString(value, Math.log256(value) + 1);\\n        }\\n    }\\n\\n    /**\\n     * @dev Converts a `uint256` to its ASCII `string` hexadecimal representation with fixed length.\\n     */\\n    function toHexString(uint256 value, uint256 length) internal pure returns (string memory) {\\n        uint256 localValue = value;\\n        bytes memory buffer = new bytes(2 * length + 2);\\n        buffer[0] = \\\"0\\\";\\n        buffer[1] = \\\"x\\\";\\n        for (uint256 i = 2 * length + 1; i > 1; --i) {\\n            buffer[i] = HEX_DIGITS[localValue & 0xf];\\n            localValue >>= 4;\\n        }\\n        if (localValue != 0) {\\n            revert StringsInsufficientHexLength(value, length);\\n        }\\n        return string(buffer);\\n    }\\n\\n    /**\\n     * @dev Converts an `address` with fixed length of 20 bytes to its not checksummed ASCII `string` hexadecimal\\n     * representation.\\n     */\\n    function toHexString(address addr) internal pure returns (string memory) {\\n        return toHexString(uint256(uint160(addr)), ADDRESS_LENGTH);\\n    }\\n\\n    /**\\n     * @dev Returns true if the two strings are equal.\\n     */\\n    function equal(string memory a, string memory b) internal pure returns (bool) {\\n        return bytes(a).length == bytes(b).length && keccak256(bytes(a)) == keccak256(bytes(b));\\n    }\\n}\\n\",\"keccak256\":\"0x55f102ea785d8399c0e58d1108e2d289506dde18abc6db1b7f68c1f9f9bc5792\",\"license\":\"MIT\"},\"@openzeppelin/contracts/utils/math/Math.sol\":{\"content\":\"// SPDX-License-Identifier: MIT\\n// OpenZeppelin Contracts (last updated v5.0.0) (utils/math/Math.sol)\\n\\npragma solidity ^0.8.20;\\n\\n/**\\n * @dev Standard math utilities missing in the Solidity language.\\n */\\nlibrary Math {\\n    /**\\n     * @dev Muldiv operation overflow.\\n     */\\n    error MathOverflowedMulDiv();\\n\\n    enum Rounding {\\n        Floor, // Toward negative infinity\\n        Ceil, // Toward positive infinity\\n        Trunc, // Toward zero\\n        Expand // Away from zero\\n    }\\n\\n    /**\\n     * @dev Returns the addition of two unsigned integers, with an overflow flag.\\n     */\\n    function tryAdd(uint256 a, uint256 b) internal pure returns (bool, uint256) {\\n        unchecked {\\n            uint256 c = a + b;\\n            if (c < a) return (false, 0);\\n            return (true, c);\\n        }\\n    }\\n\\n    /**\\n     * @dev Returns the subtraction of two unsigned integers, with an overflow flag.\\n     */\\n    function trySub(uint256 a, uint256 b) internal pure returns (bool, uint256) {\\n        unchecked {\\n            if (b > a) return (false, 0);\\n            return (true, a - b);\\n        }\\n    }\\n\\n    /**\\n     * @dev Returns the multiplication of two unsigned integers, with an overflow flag.\\n     */\\n    function tryMul(uint256 a, uint256 b) internal pure returns (bool, uint256) {\\n        unchecked {\\n            // Gas optimization: this is cheaper than requiring 'a' not being zero, but the\\n            // benefit is lost if 'b' is also tested.\\n            // See: https://github.com/OpenZeppelin/openzeppelin-contracts/pull/522\\n            if (a == 0) return (true, 0);\\n            uint256 c = a * b;\\n            if (c / a != b) return (false, 0);\\n            return (true, c);\\n        }\\n    }\\n\\n    /**\\n     * @dev Returns the division of two unsigned integers, with a division by zero flag.\\n     */\\n    function tryDiv(uint256 a, uint256 b) internal pure returns (bool, uint256) {\\n        unchecked {\\n            if (b == 0) return (false, 0);\\n            return (true, a / b);\\n        }\\n    }\\n\\n    /**\\n     * @dev Returns the remainder of dividing two unsigned integers, with a division by zero flag.\\n     */\\n    function tryMod(uint256 a, uint256 b) internal pure returns (bool, uint256) {\\n        unchecked {\\n            if (b == 0) return (false, 0);\\n            return (true, a % b);\\n        }\\n    }\\n\\n    /**\\n     * @dev Returns the largest of two numbers.\\n     */\\n    function max(uint256 a, uint256 b) internal pure returns (uint256) {\\n        return a > b ? a : b;\\n    }\\n\\n    /**\\n     * @dev Returns the smallest of two numbers.\\n     */\\n    function min(uint256 a, uint256 b) internal pure returns (uint256) {\\n        return a < b ? a : b;\\n    }\\n\\n    /**\\n     * @dev Returns the average of two numbers. The result is rounded towards\\n     * zero.\\n     */\\n    function average(uint256 a, uint256 b) internal pure returns (uint256) {\\n        // (a + b) / 2 can overflow.\\n        return (a & b) + (a ^ b) / 2;\\n    }\\n\\n    /**\\n     * @dev Returns the ceiling of the division of two numbers.\\n     *\\n     * This differs from standard division with `/` in that it rounds towards infinity instead\\n     * of rounding towards zero.\\n     */\\n    function ceilDiv(uint256 a, uint256 b) internal pure returns (uint256) {\\n        if (b == 0) {\\n            // Guarantee the same behavior as in a regular Solidity division.\\n            return a / b;\\n        }\\n\\n        // (a + b - 1) / b can overflow on addition, so we distribute.\\n        return a == 0 ? 0 : (a - 1) / b + 1;\\n    }\\n\\n    /**\\n     * @notice Calculates floor(x * y / denominator) with full precision. Throws if result overflows a uint256 or\\n     * denominator == 0.\\n     * @dev Original credit to Remco Bloemen under MIT license (https://xn--2-umb.com/21/muldiv) with further edits by\\n     * Uniswap Labs also under MIT license.\\n     */\\n    function mulDiv(uint256 x, uint256 y, uint256 denominator) internal pure returns (uint256 result) {\\n        unchecked {\\n            // 512-bit multiply [prod1 prod0] = x * y. Compute the product mod 2^256 and mod 2^256 - 1, then use\\n            // use the Chinese Remainder Theorem to reconstruct the 512 bit result. The result is stored in two 256\\n            // variables such that product = prod1 * 2^256 + prod0.\\n            uint256 prod0 = x * y; // Least significant 256 bits of the product\\n            uint256 prod1; // Most significant 256 bits of the product\\n            assembly {\\n                let mm := mulmod(x, y, not(0))\\n                prod1 := sub(sub(mm, prod0), lt(mm, prod0))\\n            }\\n\\n            // Handle non-overflow cases, 256 by 256 division.\\n            if (prod1 == 0) {\\n                // Solidity will revert if denominator == 0, unlike the div opcode on its own.\\n                // The surrounding unchecked block does not change this fact.\\n                // See https://docs.soliditylang.org/en/latest/control-structures.html#checked-or-unchecked-arithmetic.\\n                return prod0 / denominator;\\n            }\\n\\n            // Make sure the result is less than 2^256. Also prevents denominator == 0.\\n            if (denominator <= prod1) {\\n                revert MathOverflowedMulDiv();\\n            }\\n\\n            ///////////////////////////////////////////////\\n            // 512 by 256 division.\\n            ///////////////////////////////////////////////\\n\\n            // Make division exact by subtracting the remainder from [prod1 prod0].\\n            uint256 remainder;\\n            assembly {\\n                // Compute remainder using mulmod.\\n                remainder := mulmod(x, y, denominator)\\n\\n                // Subtract 256 bit number from 512 bit number.\\n                prod1 := sub(prod1, gt(remainder, prod0))\\n                prod0 := sub(prod0, remainder)\\n            }\\n\\n            // Factor powers of two out of denominator and compute largest power of two divisor of denominator.\\n            // Always >= 1. See https://cs.stackexchange.com/q/138556/92363.\\n\\n            uint256 twos = denominator & (0 - denominator);\\n            assembly {\\n                // Divide denominator by twos.\\n                denominator := div(denominator, twos)\\n\\n                // Divide [prod1 prod0] by twos.\\n                prod0 := div(prod0, twos)\\n\\n                // Flip twos such that it is 2^256 / twos. If twos is zero, then it becomes one.\\n                twos := add(div(sub(0, twos), twos), 1)\\n            }\\n\\n            // Shift in bits from prod1 into prod0.\\n            prod0 |= prod1 * twos;\\n\\n            // Invert denominator mod 2^256. Now that denominator is an odd number, it has an inverse modulo 2^256 such\\n            // that denominator * inv = 1 mod 2^256. Compute the inverse by starting with a seed that is correct for\\n            // four bits. That is, denominator * inv = 1 mod 2^4.\\n            uint256 inverse = (3 * denominator) ^ 2;\\n\\n            // Use the Newton-Raphson iteration to improve the precision. Thanks to Hensel's lifting lemma, this also\\n            // works in modular arithmetic, doubling the correct bits in each step.\\n            inverse *= 2 - denominator * inverse; // inverse mod 2^8\\n            inverse *= 2 - denominator * inverse; // inverse mod 2^16\\n            inverse *= 2 - denominator * inverse; // inverse mod 2^32\\n            inverse *= 2 - denominator * inverse; // inverse mod 2^64\\n            inverse *= 2 - denominator * inverse; // inverse mod 2^128\\n            inverse *= 2 - denominator * inverse; // inverse mod 2^256\\n\\n            // Because the division is now exact we can divide by multiplying with the modular inverse of denominator.\\n            // This will give us the correct result modulo 2^256. Since the preconditions guarantee that the outcome is\\n            // less than 2^256, this is the final result. We don't need to compute the high bits of the result and prod1\\n            // is no longer required.\\n            result = prod0 * inverse;\\n            return result;\\n        }\\n    }\\n\\n    /**\\n     * @notice Calculates x * y / denominator with full precision, following the selected rounding direction.\\n     */\\n    function mulDiv(uint256 x, uint256 y, uint256 denominator, Rounding rounding) internal pure returns (uint256) {\\n        uint256 result = mulDiv(x, y, denominator);\\n        if (unsignedRoundsUp(rounding) && mulmod(x, y, denominator) > 0) {\\n            result += 1;\\n        }\\n        return result;\\n    }\\n\\n    /**\\n     * @dev Returns the square root of a number. If the number is not a perfect square, the value is rounded\\n     * towards zero.\\n     *\\n     * Inspired by Henry S. Warren, Jr.'s \\\"Hacker's Delight\\\" (Chapter 11).\\n     */\\n    function sqrt(uint256 a) internal pure returns (uint256) {\\n        if (a == 0) {\\n            return 0;\\n        }\\n\\n        // For our first guess, we get the biggest power of 2 which is smaller than the square root of the target.\\n        //\\n        // We know that the \\\"msb\\\" (most significant bit) of our target number `a` is a power of 2 such that we have\\n        // `msb(a) <= a < 2*msb(a)`. This value can be written `msb(a)=2**k` with `k=log2(a)`.\\n        //\\n        // This can be rewritten `2**log2(a) <= a < 2**(log2(a) + 1)`\\n        // \\u2192 `sqrt(2**k) <= sqrt(a) < sqrt(2**(k+1))`\\n        // \\u2192 `2**(k/2) <= sqrt(a) < 2**((k+1)/2) <= 2**(k/2 + 1)`\\n        //\\n        // Consequently, `2**(log2(a) / 2)` is a good first approximation of `sqrt(a)` with at least 1 correct bit.\\n        uint256 result = 1 << (log2(a) >> 1);\\n\\n        // At this point `result` is an estimation with one bit of precision. We know the true value is a uint128,\\n        // since it is the square root of a uint256. Newton's method converges quadratically (precision doubles at\\n        // every iteration). We thus need at most 7 iteration to turn our partial result with one bit of precision\\n        // into the expected uint128 result.\\n        unchecked {\\n            result = (result + a / result) >> 1;\\n            result = (result + a / result) >> 1;\\n            result = (result + a / result) >> 1;\\n            result = (result + a / result) >> 1;\\n            result = (result + a / result) >> 1;\\n            result = (result + a / result) >> 1;\\n            result = (result + a / result) >> 1;\\n            return min(result, a / result);\\n        }\\n    }\\n\\n    /**\\n     * @notice Calculates sqrt(a), following the selected rounding direction.\\n     */\\n    function sqrt(uint256 a, Rounding rounding) internal pure returns (uint256) {\\n        unchecked {\\n            uint256 result = sqrt(a);\\n            return result + (unsignedRoundsUp(rounding) && result * result < a ? 1 : 0);\\n        }\\n    }\\n\\n    /**\\n     * @dev Return the log in base 2 of a positive value rounded towards zero.\\n     * Returns 0 if given 0.\\n     */\\n    function log2(uint256 value) internal pure returns (uint256) {\\n        uint256 result = 0;\\n        unchecked {\\n            if (value >> 128 > 0) {\\n                value >>= 128;\\n                result += 128;\\n            }\\n            if (value >> 64 > 0) {\\n                value >>= 64;\\n                result += 64;\\n            }\\n            if (value >> 32 > 0) {\\n                value >>= 32;\\n                result += 32;\\n            }\\n            if (value >> 16 > 0) {\\n                value >>= 16;\\n                result += 16;\\n            }\\n            if (value >> 8 > 0) {\\n                value >>= 8;\\n                result += 8;\\n            }\\n            if (value >> 4 > 0) {\\n                value >>= 4;\\n                result += 4;\\n            }\\n            if (value >> 2 > 0) {\\n                value >>= 2;\\n                result += 2;\\n            }\\n            if (value >> 1 > 0) {\\n                result += 1;\\n            }\\n        }\\n        return result;\\n    }\\n\\n    /**\\n     * @dev Return the log in base 2, following the selected rounding direction, of a positive value.\\n     * Returns 0 if given 0.\\n     */\\n    function log2(uint256 value, Rounding rounding) internal pure returns (uint256) {\\n        unchecked {\\n            uint256 result = log2(value);\\n            return result + (unsignedRoundsUp(rounding) && 1 << result < value ? 1 : 0);\\n        }\\n    }\\n\\n    /**\\n     * @dev Return the log in base 10 of a positive value rounded towards zero.\\n     * Returns 0 if given 0.\\n     */\\n    function log10(uint256 value) internal pure returns (uint256) {\\n        uint256 result = 0;\\n        unchecked {\\n            if (value >= 10 ** 64) {\\n                value /= 10 ** 64;\\n                result += 64;\\n            }\\n            if (value >= 10 ** 32) {\\n                value /= 10 ** 32;\\n                result += 32;\\n            }\\n            if (value >= 10 ** 16) {\\n                value /= 10 ** 16;\\n                result += 16;\\n            }\\n            if (value >= 10 ** 8) {\\n                value /= 10 ** 8;\\n                result += 8;\\n            }\\n            if (value >= 10 ** 4) {\\n                value /= 10 ** 4;\\n                result += 4;\\n            }\\n            if (value >= 10 ** 2) {\\n                value /= 10 ** 2;\\n                result += 2;\\n            }\\n            if (value >= 10 ** 1) {\\n                result += 1;\\n            }\\n        }\\n        return result;\\n    }\\n\\n    /**\\n     * @dev Return the log in base 10, following the selected rounding direction, of a positive value.\\n     * Returns 0 if given 0.\\n     */\\n    function log10(uint256 value, Rounding rounding) internal pure returns (uint256) {\\n        unchecked {\\n            uint256 result = log10(value);\\n            return result + (unsignedRoundsUp(rounding) && 10 ** result < value ? 1 : 0);\\n        }\\n    }\\n\\n    /**\\n     * @dev Return the log in base 256 of a positive value rounded towards zero.\\n     * Returns 0 if given 0.\\n     *\\n     * Adding one to the result gives the number of pairs of hex symbols needed to represent `value` as a hex string.\\n     */\\n    function log256(uint256 value) internal pure returns (uint256) {\\n        uint256 result = 0;\\n        unchecked {\\n            if (value >> 128 > 0) {\\n                value >>= 128;\\n                result += 16;\\n            }\\n            if (value >> 64 > 0) {\\n                value >>= 64;\\n                result += 8;\\n            }\\n            if (value >> 32 > 0) {\\n                value >>= 32;\\n                result += 4;\\n            }\\n            if (value >> 16 > 0) {\\n                value >>= 16;\\n                result += 2;\\n            }\\n            if (value >> 8 > 0) {\\n                result += 1;\\n            }\\n        }\\n        return result;\\n    }\\n\\n    /**\\n     * @dev Return the log in base 256, following the selected rounding direction, of a positive value.\\n     * Returns 0 if given 0.\\n     */\\n    function log256(uint256 value, Rounding rounding) internal pure returns (uint256) {\\n        unchecked {\\n            uint256 result = log256(value);\\n            return result + (unsignedRoundsUp(rounding) && 1 << (result << 3) < value ? 1 : 0);\\n        }\\n    }\\n\\n    /**\\n     * @dev Returns whether a provided rounding mode is considered rounding up for unsigned integers.\\n     */\\n    function unsignedRoundsUp(Rounding rounding) internal pure returns (bool) {\\n        return uint8(rounding) % 2 == 1;\\n    }\\n}\\n\",\"keccak256\":\"0x005ec64c6313f0555d59e278f9a7a5ab2db5bdc72a027f255a37c327af1ec02d\",\"license\":\"MIT\"},\"@openzeppelin/contracts/utils/math/SignedMath.sol\":{\"content\":\"// SPDX-License-Identifier: MIT\\n// OpenZeppelin Contracts (last updated v5.0.0) (utils/math/SignedMath.sol)\\n\\npragma solidity ^0.8.20;\\n\\n/**\\n * @dev Standard signed math utilities missing in the Solidity language.\\n */\\nlibrary SignedMath {\\n    /**\\n     * @dev Returns the largest of two signed numbers.\\n     */\\n    function max(int256 a, int256 b) internal pure returns (int256) {\\n        return a > b ? a : b;\\n    }\\n\\n    /**\\n     * @dev Returns the smallest of two signed numbers.\\n     */\\n    function min(int256 a, int256 b) internal pure returns (int256) {\\n        return a < b ? a : b;\\n    }\\n\\n    /**\\n     * @dev Returns the average of two signed numbers without overflow.\\n     * The result is rounded towards zero.\\n     */\\n    function average(int256 a, int256 b) internal pure returns (int256) {\\n        // Formula from the book \\\"Hacker's Delight\\\"\\n        int256 x = (a & b) + ((a ^ b) >> 1);\\n        return x + (int256(uint256(x) >> 255) & (a ^ b));\\n    }\\n\\n    /**\\n     * @dev Returns the absolute unsigned value of a signed value.\\n     */\\n    function abs(int256 n) internal pure returns (uint256) {\\n        unchecked {\\n            // must be unchecked in order to support `n = type(int256).min`\\n            return uint256(n >= 0 ? n : -n);\\n        }\\n    }\\n}\\n\",\"keccak256\":\"0x5f7e4076e175393767754387c962926577f1660dd9b810187b9002407656be72\",\"license\":\"MIT\"},\"contracts/Indexer.sol\":{\"content\":\"// SPDX-License-Identifier: MIT\\n\\npragma solidity 0.8.28;\\n\\nimport { IEAS, Attestation } from \\\"../eas/contracts/IEAS.sol\\\";\\nimport { EMPTY_UID } from \\\"../eas/contracts/Common.sol\\\";\\nimport { Semver } from \\\"../eas/contracts/Semver.sol\\\";\\n\\n/// @title Indexer\\n/// @notice Indexing Service for the Ethereum Attestation Service\\ncontract Indexer is Semver {\\n    error InvalidEAS();\\n    error InvalidAttestation();\\n    error InvalidOffset();\\n\\n    /// @notice Emitted when an attestation has been indexed.\\n    /// @param uid The UID the attestation.\\n    event Indexed(bytes32 indexed uid);\\n\\n    /// A mapping between an attestation and its referencing attestations.\\n    mapping(bytes32 attestationUID => mapping(bytes32 schemaUID => bytes32[] uids) referencingAttestations) private _referencingAttestations;\\n\\n    /// A mapping between an attestation and its referencing attestations indexed by user.\\n    mapping(bytes32 attestationUID => mapping(bytes32 schemaUID => mapping(address attester => bytes32[] uids)) referencingAttestationsByAddress) private _referencingAttestationsByAddress;\\n\\n    /// A mapping between an account and its received attestations.\\n    mapping(address account => mapping(bytes32 schemaUID => bytes32[] uids) receivedAttestations) private _receivedAttestations;\\n\\n    // A mapping between an account and its sent attestations.\\n    mapping(address account => mapping(bytes32 schemaUID => bytes32[] uids) sentAttestations) private _sentAttestations;\\n\\n    // A mapping between a schema, attester, and recipient.\\n    mapping(bytes32 schemaUID => mapping(address attester => mapping(address recipient => bytes32[] uids)))\\n        private _schemaAttesterRecipientAttestations;\\n\\n    // A mapping between a schema and its attestations.\\n    mapping(bytes32 schemaUID => bytes32[] uids) private _schemaAttestations;\\n\\n    // The global mapping of attestation indexing status.\\n    mapping(bytes32 attestationUID => bool status) private _indexedAttestations;\\n\\n    // The address of the global EAS contract.\\n    IEAS private immutable _eas;\\n\\n    // Previously deployed Indexer contract address.\\n    address private immutable _prevIndexer;\\n\\n    /// @dev Creates a new Indexer instance.\\n    /// @param eas The address of the global EAS contract.\\n    constructor(IEAS eas, address prevIndexer) Semver(2, 0, 0) {\\n        if (address(eas) == address(0)) {\\n            revert InvalidEAS();\\n        }\\n        if (prevIndexer != address(0)) {\\n            _prevIndexer = prevIndexer;\\n        }\\n\\n        _eas = eas;\\n    }\\n\\n    /// @notice Returns the EAS.\\n    function getEAS() external view returns (IEAS) {\\n        return _eas;\\n    }\\n\\n    /// @notice Returns the previously deployed EAS Indexer.\\n    function getPrevIndexer() external view returns (address) {\\n        return _prevIndexer;\\n    }\\n\\n    /// @notice Indexes an existing attestation.\\n    /// @param attestationUID The UID of the attestation to index.\\n    function indexAttestation(bytes32 attestationUID) external {\\n        _indexAttestation(attestationUID);\\n    }\\n\\n    /// @notice Indexes multiple existing attestations.\\n    /// @param attestationUIDs The UIDs of the attestations to index.\\n    function indexAttestations(bytes32[] calldata attestationUIDs) external {\\n        uint256 length = attestationUIDs.length;\\n        for (uint256 i = 0; i < length; ++i) {\\n            _indexAttestation(attestationUIDs[i]);\\n        }\\n    }\\n\\n    /// @notice Returns whether an existing attestation has been already indexed.\\n    /// @param attestationUID The UID of the attestation to check.\\n    /// @return Whether an attestation has been already indexed.\\n    function isAttestationIndexed(bytes32 attestationUID) external view returns (bool) {\\n        return _indexedAttestations[attestationUID];\\n    }\\n\\n    /// @notice Returns the UIDs of attestations referencing a specific attestation.\\n    /// @param attestionUID The UID of the attestation being referenced.\\n    /// @param schemaUID The UID of the schema of the referencing attestations.\\n    /// @param start The offset to start from.\\n    /// @param length The number of total members to retrieve.\\n    /// @param reverseOrder Whether the offset starts from the end and the data is returned in reverse.\\n    /// @return An array of attestation UIDs.\\n    function getReferencingAttestationUIDs(\\n        bytes32 attestionUID,\\n        bytes32 schemaUID,\\n        uint256 start,\\n        uint256 length,\\n        bool reverseOrder\\n    ) external view returns (bytes32[] memory) {\\n        return _sliceUIDs(_referencingAttestations[attestionUID][schemaUID], start, length, reverseOrder);\\n    }\\n\\n    /// @notice Returns the total number of references to a specific attestation.\\n    /// @param attestionUID The UID of the attestation.\\n    /// @param schemaUID The UID of the schema.\\n    /// @return An array of attestation UIDs.\\n    function getReferencingAttestationUIDCount(bytes32 attestionUID, bytes32 schemaUID) external view returns (uint256) {\\n        return _referencingAttestations[attestionUID][schemaUID].length;\\n    }\\n\\n    /// @notice Returns the UIDs of attestations referencing a specific attestation.\\n    /// @param attestionUID The UID of the attestation being referenced.\\n    /// @param schemaUID The UID of the schema of the referencing attestations.\\n    /// @param attester The attester of the referencing attestations.\\n    /// @param start The offset to start from.\\n    /// @param length The number of total members to retrieve.\\n    /// @param reverseOrder Whether the offset starts from the end and the data is returned in reverse.\\n    /// @return An array of attestation UIDs.\\n    function getReferencingAttestationUIDsByAddress(\\n        bytes32 attestionUID,\\n        bytes32 schemaUID,\\n        address attester,\\n        uint256 start,\\n        uint256 length,\\n        bool reverseOrder\\n    ) external view returns (bytes32[] memory) {\\n        return _sliceUIDs(_referencingAttestationsByAddress[attestionUID][schemaUID][attester], start, length, reverseOrder);\\n    }\\n\\n    /// @notice Returns the total number of references to a specific attestation.\\n    /// @param attestionUID The UID of the attestation.\\n    /// @param schemaUID The UID of the schema.\\n    /// @param attester The attester of the referencing attestations.\\n    /// @return An array of attestation UIDs.\\n    function getReferencingAttestationUIDByAddressCount(bytes32 attestionUID, bytes32 schemaUID, address attester) external view returns (uint256) {\\n        return _referencingAttestationsByAddress[attestionUID][schemaUID][attester].length;\\n    }\\n\\n    /// @notice Returns the UIDs of attestations to a specific schema which were attested to/received by a specific\\n    ///     recipient.\\n    /// @param recipient The recipient of the attestation.\\n    /// @param schemaUID The UID of the schema.\\n    /// @param start The offset to start from.\\n    /// @param length The number of total members to retrieve.\\n    /// @param reverseOrder Whether the offset starts from the end and the data is returned in reverse.\\n    /// @return An array of attestation UIDs.\\n    function getReceivedAttestationUIDs(\\n        address recipient,\\n        bytes32 schemaUID,\\n        uint256 start,\\n        uint256 length,\\n        bool reverseOrder\\n    ) external view returns (bytes32[] memory) {\\n        return _sliceUIDs(_receivedAttestations[recipient][schemaUID], start, length, reverseOrder);\\n    }\\n\\n    /// @notice Returns the total number of attestations to a specific schema which were attested to/received by a\\n    ///     specific recipient.\\n    /// @param recipient The recipient of the attestation.\\n    /// @param schemaUID The UID of the schema.\\n    /// @return The total number of attestations.\\n    function getReceivedAttestationUIDCount(address recipient, bytes32 schemaUID) external view returns (uint256) {\\n        return _receivedAttestations[recipient][schemaUID].length;\\n    }\\n\\n    /// @notice Returns the UIDs of attestations to a specific schema which were attested by a specific attester.\\n    /// @param attester The attester of the attestation.\\n    /// @param schemaUID The UID of the schema.\\n    /// @param start The offset to start from.\\n    /// @param length The number of total members to retrieve.\\n    /// @param reverseOrder Whether the offset starts from the end and the data is returned in reverse.\\n    /// @return An array of attestation UIDs.\\n    function getSentAttestationUIDs(\\n        address attester,\\n        bytes32 schemaUID,\\n        uint256 start,\\n        uint256 length,\\n        bool reverseOrder\\n    ) external view returns (bytes32[] memory) {\\n        return _sliceUIDs(_sentAttestations[attester][schemaUID], start, length, reverseOrder);\\n    }\\n\\n    /// @notice Returns the total number of attestations to a specific schema which were attested by a specific\\n    /// attester.\\n    /// @param attester The attester of the attestation.\\n    /// @param schemaUID The UID of the schema.\\n    /// @return The total number of attestations.\\n    function getSentAttestationUIDCount(address attester, bytes32 schemaUID) external view returns (uint256) {\\n        return _sentAttestations[attester][schemaUID].length;\\n    }\\n\\n    /// @notice Returns the UIDs of attestations to a specific schema which were attested by a specific attester to a\\n    ///     specific recipient.\\n    /// @param schemaUID The UID of the schema.\\n    /// @param attester The attester of the attestation.\\n    /// @param recipient The recipient of the attestation.\\n    /// @param start The offset to start from.\\n    /// @param length The number of total members to retrieve.\\n    /// @param reverseOrder Whether the offset starts from the end and the data is returned in reverse.\\n    /// @return An array of attestation UIDs.\\n    function getSchemaAttesterRecipientAttestationUIDs(\\n        bytes32 schemaUID,\\n        address attester,\\n        address recipient,\\n        uint256 start,\\n        uint256 length,\\n        bool reverseOrder\\n    ) external view returns (bytes32[] memory) {\\n        return\\n            _sliceUIDs(\\n                _schemaAttesterRecipientAttestations[schemaUID][attester][recipient],\\n                start,\\n                length,\\n                reverseOrder\\n            );\\n    }\\n\\n    /// @notice Returns the total number of UIDs of attestations to a specific schema which were attested by a specific\\n    ///     attester to a specific recipient.\\n    /// @param schemaUID The UID of the schema.\\n    /// @param attester The attester of the attestation.\\n    /// @param recipient The recipient of the attestation.\\n    /// @return An array of attestation UIDs.\\n    function getSchemaAttesterRecipientAttestationUIDCount(\\n        bytes32 schemaUID,\\n        address attester,\\n        address recipient\\n    ) external view returns (uint256) {\\n        return _schemaAttesterRecipientAttestations[schemaUID][attester][recipient].length;\\n    }\\n\\n    /// @notice Returns the UIDs of attestations to a specific schema.\\n    /// @param schemaUID The UID of the schema.\\n    /// @param start The offset to start from.\\n    /// @param length The number of total members to retrieve.\\n    /// @param reverseOrder Whether the offset starts from the end and the data is returned in reverse.\\n    /// @return An array of attestation UIDs.\\n    function getSchemaAttestationUIDs(\\n        bytes32 schemaUID,\\n        uint256 start,\\n        uint256 length,\\n        bool reverseOrder\\n    ) external view returns (bytes32[] memory) {\\n        return _sliceUIDs(_schemaAttestations[schemaUID], start, length, reverseOrder);\\n    }\\n\\n    /// @notice Returns the total number of attestations to a specific schema.\\n    /// @param schemaUID The UID of the schema.\\n    /// @return An array of attestation UIDs.\\n    function getSchemaAttestationUIDCount(bytes32 schemaUID) external view returns (uint256) {\\n        return _schemaAttestations[schemaUID].length;\\n    }\\n\\n    /// @dev Indexes an existing attestation.\\n    /// @param attestationUID The UID of the attestation to index.\\n    function _indexAttestation(bytes32 attestationUID) private {\\n        // Skip already indexed attestations.\\n        if (_indexedAttestations[attestationUID]) {\\n            return;\\n        }\\n\\n        // Check if the attestation exists.\\n        Attestation memory attestation = _eas.getAttestation(attestationUID);\\n\\n        bytes32 uid = attestation.uid;\\n        if (uid == EMPTY_UID) {\\n            revert InvalidAttestation();\\n        }\\n\\n        // Index the attestation.\\n        address attester = attestation.attester;\\n        address recipient = attestation.recipient;\\n        bytes32 schemaUID = attestation.schema;\\n        bytes32 refUID = attestation.refUID;\\n\\n        _indexedAttestations[attestationUID] = true;\\n        _schemaAttestations[schemaUID].push(attestationUID);\\n        _receivedAttestations[recipient][schemaUID].push(attestationUID);\\n        _sentAttestations[attester][schemaUID].push(attestationUID);\\n        _schemaAttesterRecipientAttestations[schemaUID][attester][recipient].push(attestationUID);\\n\\n        if (refUID != EMPTY_UID) {\\n            _referencingAttestations[refUID][schemaUID].push(attestationUID);\\n            _referencingAttestationsByAddress[refUID][schemaUID][attester].push(attestationUID);\\n\\n            // Ensure the referenced attestation is also indexed\\n            _indexAttestation(refUID);\\n        }\\n\\n        // Add attestation to old index as well\\n        if (_prevIndexer != address(0)) {\\n            Indexer(_prevIndexer).indexAttestation(attestationUID);\\n        }\\n\\n        emit Indexed({ uid: uid });\\n    }\\n\\n    /// @dev Returns a slice in an array of attestation UIDs.\\n    /// @param uids The array of attestation UIDs.\\n    /// @param start The offset to start from.\\n    /// @param length The number of total members to retrieve.\\n    /// @param reverseOrder Whether the offset starts from the end and the data is returned in reverse.\\n    /// @return An array of attestation UIDs.\\n    function _sliceUIDs(\\n        bytes32[] memory uids,\\n        uint256 start,\\n        uint256 length,\\n        bool reverseOrder\\n    ) private pure returns (bytes32[] memory) {\\n        uint256 attestationsLength = uids.length;\\n        if (attestationsLength == 0) {\\n            return new bytes32[](0);\\n        }\\n\\n        if (start >= attestationsLength) {\\n            revert InvalidOffset();\\n        }\\n\\n        unchecked {\\n            uint256 len = length;\\n            if (attestationsLength < start + length) {\\n                len = attestationsLength - start;\\n            }\\n\\n            bytes32[] memory res = new bytes32[](len);\\n\\n            for (uint256 i = 0; i < len; ++i) {\\n                res[i] = uids[reverseOrder ? attestationsLength - (start + i + 1) : start + i];\\n            }\\n\\n            return res;\\n        }\\n    }\\n}\\n\",\"keccak256\":\"0x39d29138f981f15d7961c5260ab6facc3d983affb9408e0469bec3c80e5beaff\",\"license\":\"MIT\"},\"eas/contracts/Common.sol\":{\"content\":\"// SPDX-License-Identifier: MIT\\n\\npragma solidity ^0.8.0;\\n\\n// A representation of an empty/uninitialized UID.\\nbytes32 constant EMPTY_UID = 0;\\n\\n// A zero expiration represents an non-expiring attestation.\\nuint64 constant NO_EXPIRATION_TIME = 0;\\n\\nerror AccessDenied();\\nerror DeadlineExpired();\\nerror InvalidEAS();\\nerror InvalidLength();\\nerror InvalidSignature();\\nerror NotFound();\\n\\n/// @notice A struct representing ECDSA signature data.\\nstruct Signature {\\n    uint8 v; // The recovery ID.\\n    bytes32 r; // The x-coordinate of the nonce R.\\n    bytes32 s; // The signature data.\\n}\\n\\n/// @notice A struct representing a single attestation.\\nstruct Attestation {\\n    bytes32 uid; // A unique identifier of the attestation.\\n    bytes32 schema; // The unique identifier of the schema.\\n    uint64 time; // The time when the attestation was created (Unix timestamp).\\n    uint64 expirationTime; // The time when the attestation expires (Unix timestamp).\\n    uint64 revocationTime; // The time when the attestation was revoked (Unix timestamp).\\n    bytes32 refUID; // The UID of the related attestation.\\n    address recipient; // The recipient of the attestation.\\n    address attester; // The attester/sender of the attestation.\\n    bool revocable; // Whether the attestation is revocable.\\n    bytes data; // Custom attestation data.\\n}\\n\",\"keccak256\":\"0x6fceca4625d652ece6b11b21cbfa9cb165797b60b9788e682f2b1e226527d4fb\",\"license\":\"MIT\"},\"eas/contracts/IEAS.sol\":{\"content\":\"// SPDX-License-Identifier: MIT\\n\\npragma solidity ^0.8.0;\\n\\nimport { ISchemaRegistry } from \\\"./ISchemaRegistry.sol\\\";\\nimport { ISemver } from \\\"./ISemver.sol\\\";\\nimport { Attestation, Signature } from \\\"./Common.sol\\\";\\n\\n/// @notice A struct representing the arguments of the attestation request.\\nstruct AttestationRequestData {\\n    address recipient; // The recipient of the attestation.\\n    uint64 expirationTime; // The time when the attestation expires (Unix timestamp).\\n    bool revocable; // Whether the attestation is revocable.\\n    bytes32 refUID; // The UID of the related attestation.\\n    bytes data; // Custom attestation data.\\n    uint256 value; // An explicit ETH amount to send to the resolver. This is important to prevent accidental user errors.\\n}\\n\\n/// @notice A struct representing the full arguments of the attestation request.\\nstruct AttestationRequest {\\n    bytes32 schema; // The unique identifier of the schema.\\n    AttestationRequestData data; // The arguments of the attestation request.\\n}\\n\\n/// @notice A struct representing the full arguments of the full delegated attestation request.\\nstruct DelegatedAttestationRequest {\\n    bytes32 schema; // The unique identifier of the schema.\\n    AttestationRequestData data; // The arguments of the attestation request.\\n    Signature signature; // The ECDSA signature data.\\n    address attester; // The attesting account.\\n    uint64 deadline; // The deadline of the signature/request.\\n}\\n\\n/// @notice A struct representing the full arguments of the multi attestation request.\\nstruct MultiAttestationRequest {\\n    bytes32 schema; // The unique identifier of the schema.\\n    AttestationRequestData[] data; // The arguments of the attestation request.\\n}\\n\\n/// @notice A struct representing the full arguments of the delegated multi attestation request.\\nstruct MultiDelegatedAttestationRequest {\\n    bytes32 schema; // The unique identifier of the schema.\\n    AttestationRequestData[] data; // The arguments of the attestation requests.\\n    Signature[] signatures; // The ECDSA signatures data. Please note that the signatures are assumed to be signed with increasing nonces.\\n    address attester; // The attesting account.\\n    uint64 deadline; // The deadline of the signature/request.\\n}\\n\\n/// @notice A struct representing the arguments of the revocation request.\\nstruct RevocationRequestData {\\n    bytes32 uid; // The UID of the attestation to revoke.\\n    uint256 value; // An explicit ETH amount to send to the resolver. This is important to prevent accidental user errors.\\n}\\n\\n/// @notice A struct representing the full arguments of the revocation request.\\nstruct RevocationRequest {\\n    bytes32 schema; // The unique identifier of the schema.\\n    RevocationRequestData data; // The arguments of the revocation request.\\n}\\n\\n/// @notice A struct representing the arguments of the full delegated revocation request.\\nstruct DelegatedRevocationRequest {\\n    bytes32 schema; // The unique identifier of the schema.\\n    RevocationRequestData data; // The arguments of the revocation request.\\n    Signature signature; // The ECDSA signature data.\\n    address revoker; // The revoking account.\\n    uint64 deadline; // The deadline of the signature/request.\\n}\\n\\n/// @notice A struct representing the full arguments of the multi revocation request.\\nstruct MultiRevocationRequest {\\n    bytes32 schema; // The unique identifier of the schema.\\n    RevocationRequestData[] data; // The arguments of the revocation request.\\n}\\n\\n/// @notice A struct representing the full arguments of the delegated multi revocation request.\\nstruct MultiDelegatedRevocationRequest {\\n    bytes32 schema; // The unique identifier of the schema.\\n    RevocationRequestData[] data; // The arguments of the revocation requests.\\n    Signature[] signatures; // The ECDSA signatures data. Please note that the signatures are assumed to be signed with increasing nonces.\\n    address revoker; // The revoking account.\\n    uint64 deadline; // The deadline of the signature/request.\\n}\\n\\n/// @title IEAS\\n/// @notice EAS - Ethereum Attestation Service interface.\\ninterface IEAS is ISemver {\\n    /// @notice Emitted when an attestation has been made.\\n    /// @param recipient The recipient of the attestation.\\n    /// @param attester The attesting account.\\n    /// @param uid The UID of the new attestation.\\n    /// @param schemaUID The UID of the schema.\\n    event Attested(address indexed recipient, address indexed attester, bytes32 uid, bytes32 indexed schemaUID);\\n\\n    /// @notice Emitted when an attestation has been revoked.\\n    /// @param recipient The recipient of the attestation.\\n    /// @param attester The attesting account.\\n    /// @param schemaUID The UID of the schema.\\n    /// @param uid The UID the revoked attestation.\\n    event Revoked(address indexed recipient, address indexed attester, bytes32 uid, bytes32 indexed schemaUID);\\n\\n    /// @notice Emitted when a data has been timestamped.\\n    /// @param data The data.\\n    /// @param timestamp The timestamp.\\n    event Timestamped(bytes32 indexed data, uint64 indexed timestamp);\\n\\n    /// @notice Emitted when a data has been revoked.\\n    /// @param revoker The address of the revoker.\\n    /// @param data The data.\\n    /// @param timestamp The timestamp.\\n    event RevokedOffchain(address indexed revoker, bytes32 indexed data, uint64 indexed timestamp);\\n\\n    /// @notice Returns the address of the global schema registry.\\n    /// @return The address of the global schema registry.\\n    function getSchemaRegistry() external view returns (ISchemaRegistry);\\n\\n    /// @notice Attests to a specific schema.\\n    /// @param request The arguments of the attestation request.\\n    /// @return The UID of the new attestation.\\n    ///\\n    /// Example:\\n    ///     attest({\\n    ///         schema: \\\"0facc36681cbe2456019c1b0d1e7bedd6d1d40f6f324bf3dd3a4cef2999200a0\\\",\\n    ///         data: {\\n    ///             recipient: \\\"0xdEADBeAFdeAdbEafdeadbeafDeAdbEAFdeadbeaf\\\",\\n    ///             expirationTime: 0,\\n    ///             revocable: true,\\n    ///             refUID: \\\"0x0000000000000000000000000000000000000000000000000000000000000000\\\",\\n    ///             data: \\\"0xF00D\\\",\\n    ///             value: 0\\n    ///         }\\n    ///     })\\n    function attest(AttestationRequest calldata request) external payable returns (bytes32);\\n\\n    /// @notice Attests to a specific schema via the provided ECDSA signature.\\n    /// @param delegatedRequest The arguments of the delegated attestation request.\\n    /// @return The UID of the new attestation.\\n    ///\\n    /// Example:\\n    ///     attestByDelegation({\\n    ///         schema: '0x8e72f5bc0a8d4be6aa98360baa889040c50a0e51f32dbf0baa5199bd93472ebc',\\n    ///         data: {\\n    ///             recipient: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',\\n    ///             expirationTime: 1673891048,\\n    ///             revocable: true,\\n    ///             refUID: '0x0000000000000000000000000000000000000000000000000000000000000000',\\n    ///             data: '0x1234',\\n    ///             value: 0\\n    ///         },\\n    ///         signature: {\\n    ///             v: 28,\\n    ///             r: '0x148c...b25b',\\n    ///             s: '0x5a72...be22'\\n    ///         },\\n    ///         attester: '0xc5E8740aD971409492b1A63Db8d83025e0Fc427e',\\n    ///         deadline: 1673891048\\n    ///     })\\n    function attestByDelegation(\\n        DelegatedAttestationRequest calldata delegatedRequest\\n    ) external payable returns (bytes32);\\n\\n    /// @notice Attests to multiple schemas.\\n    /// @param multiRequests The arguments of the multi attestation requests. The requests should be grouped by distinct\\n    ///     schema ids to benefit from the best batching optimization.\\n    /// @return The UIDs of the new attestations.\\n    ///\\n    /// Example:\\n    ///     multiAttest([{\\n    ///         schema: '0x33e9094830a5cba5554d1954310e4fbed2ef5f859ec1404619adea4207f391fd',\\n    ///         data: [{\\n    ///             recipient: '0xdEADBeAFdeAdbEafdeadbeafDeAdbEAFdeadbeaf',\\n    ///             expirationTime: 1673891048,\\n    ///             revocable: true,\\n    ///             refUID: '0x0000000000000000000000000000000000000000000000000000000000000000',\\n    ///             data: '0x1234',\\n    ///             value: 1000\\n    ///         },\\n    ///         {\\n    ///             recipient: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',\\n    ///             expirationTime: 0,\\n    ///             revocable: false,\\n    ///             refUID: '0x480df4a039efc31b11bfdf491b383ca138b6bde160988222a2a3509c02cee174',\\n    ///             data: '0x00',\\n    ///             value: 0\\n    ///         }],\\n    ///     },\\n    ///     {\\n    ///         schema: '0x5ac273ce41e3c8bfa383efe7c03e54c5f0bff29c9f11ef6ffa930fc84ca32425',\\n    ///         data: [{\\n    ///             recipient: '0xdEADBeAFdeAdbEafdeadbeafDeAdbEAFdeadbeaf',\\n    ///             expirationTime: 0,\\n    ///             revocable: true,\\n    ///             refUID: '0x75bf2ed8dca25a8190c50c52db136664de25b2449535839008ccfdab469b214f',\\n    ///             data: '0x12345678',\\n    ///             value: 0\\n    ///         },\\n    ///     }])\\n    function multiAttest(MultiAttestationRequest[] calldata multiRequests) external payable returns (bytes32[] memory);\\n\\n    /// @notice Attests to multiple schemas using via provided ECDSA signatures.\\n    /// @param multiDelegatedRequests The arguments of the delegated multi attestation requests. The requests should be\\n    ///     grouped by distinct schema ids to benefit from the best batching optimization.\\n    /// @return The UIDs of the new attestations.\\n    ///\\n    /// Example:\\n    ///     multiAttestByDelegation([{\\n    ///         schema: '0x8e72f5bc0a8d4be6aa98360baa889040c50a0e51f32dbf0baa5199bd93472ebc',\\n    ///         data: [{\\n    ///             recipient: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',\\n    ///             expirationTime: 1673891048,\\n    ///             revocable: true,\\n    ///             refUID: '0x0000000000000000000000000000000000000000000000000000000000000000',\\n    ///             data: '0x1234',\\n    ///             value: 0\\n    ///         },\\n    ///         {\\n    ///             recipient: '0xdEADBeAFdeAdbEafdeadbeafDeAdbEAFdeadbeaf',\\n    ///             expirationTime: 0,\\n    ///             revocable: false,\\n    ///             refUID: '0x0000000000000000000000000000000000000000000000000000000000000000',\\n    ///             data: '0x00',\\n    ///             value: 0\\n    ///         }],\\n    ///         signatures: [{\\n    ///             v: 28,\\n    ///             r: '0x148c...b25b',\\n    ///             s: '0x5a72...be22'\\n    ///         },\\n    ///         {\\n    ///             v: 28,\\n    ///             r: '0x487s...67bb',\\n    ///             s: '0x12ad...2366'\\n    ///         }],\\n    ///         attester: '0x1D86495b2A7B524D747d2839b3C645Bed32e8CF4',\\n    ///         deadline: 1673891048\\n    ///     }])\\n    function multiAttestByDelegation(\\n        MultiDelegatedAttestationRequest[] calldata multiDelegatedRequests\\n    ) external payable returns (bytes32[] memory);\\n\\n    /// @notice Revokes an existing attestation to a specific schema.\\n    /// @param request The arguments of the revocation request.\\n    ///\\n    /// Example:\\n    ///     revoke({\\n    ///         schema: '0x8e72f5bc0a8d4be6aa98360baa889040c50a0e51f32dbf0baa5199bd93472ebc',\\n    ///         data: {\\n    ///             uid: '0x101032e487642ee04ee17049f99a70590c735b8614079fc9275f9dd57c00966d',\\n    ///             value: 0\\n    ///         }\\n    ///     })\\n    function revoke(RevocationRequest calldata request) external payable;\\n\\n    /// @notice Revokes an existing attestation to a specific schema via the provided ECDSA signature.\\n    /// @param delegatedRequest The arguments of the delegated revocation request.\\n    ///\\n    /// Example:\\n    ///     revokeByDelegation({\\n    ///         schema: '0x8e72f5bc0a8d4be6aa98360baa889040c50a0e51f32dbf0baa5199bd93472ebc',\\n    ///         data: {\\n    ///             uid: '0xcbbc12102578c642a0f7b34fe7111e41afa25683b6cd7b5a14caf90fa14d24ba',\\n    ///             value: 0\\n    ///         },\\n    ///         signature: {\\n    ///             v: 27,\\n    ///             r: '0xb593...7142',\\n    ///             s: '0x0f5b...2cce'\\n    ///         },\\n    ///         revoker: '0x244934dd3e31bE2c81f84ECf0b3E6329F5381992',\\n    ///         deadline: 1673891048\\n    ///     })\\n    function revokeByDelegation(DelegatedRevocationRequest calldata delegatedRequest) external payable;\\n\\n    /// @notice Revokes existing attestations to multiple schemas.\\n    /// @param multiRequests The arguments of the multi revocation requests. The requests should be grouped by distinct\\n    ///     schema ids to benefit from the best batching optimization.\\n    ///\\n    /// Example:\\n    ///     multiRevoke([{\\n    ///         schema: '0x8e72f5bc0a8d4be6aa98360baa889040c50a0e51f32dbf0baa5199bd93472ebc',\\n    ///         data: [{\\n    ///             uid: '0x211296a1ca0d7f9f2cfebf0daaa575bea9b20e968d81aef4e743d699c6ac4b25',\\n    ///             value: 1000\\n    ///         },\\n    ///         {\\n    ///             uid: '0xe160ac1bd3606a287b4d53d5d1d6da5895f65b4b4bab6d93aaf5046e48167ade',\\n    ///             value: 0\\n    ///         }],\\n    ///     },\\n    ///     {\\n    ///         schema: '0x5ac273ce41e3c8bfa383efe7c03e54c5f0bff29c9f11ef6ffa930fc84ca32425',\\n    ///         data: [{\\n    ///             uid: '0x053d42abce1fd7c8fcddfae21845ad34dae287b2c326220b03ba241bc5a8f019',\\n    ///             value: 0\\n    ///         },\\n    ///     }])\\n    function multiRevoke(MultiRevocationRequest[] calldata multiRequests) external payable;\\n\\n    /// @notice Revokes existing attestations to multiple schemas via provided ECDSA signatures.\\n    /// @param multiDelegatedRequests The arguments of the delegated multi revocation attestation requests. The requests\\n    ///     should be grouped by distinct schema ids to benefit from the best batching optimization.\\n    ///\\n    /// Example:\\n    ///     multiRevokeByDelegation([{\\n    ///         schema: '0x8e72f5bc0a8d4be6aa98360baa889040c50a0e51f32dbf0baa5199bd93472ebc',\\n    ///         data: [{\\n    ///             uid: '0x211296a1ca0d7f9f2cfebf0daaa575bea9b20e968d81aef4e743d699c6ac4b25',\\n    ///             value: 1000\\n    ///         },\\n    ///         {\\n    ///             uid: '0xe160ac1bd3606a287b4d53d5d1d6da5895f65b4b4bab6d93aaf5046e48167ade',\\n    ///             value: 0\\n    ///         }],\\n    ///         signatures: [{\\n    ///             v: 28,\\n    ///             r: '0x148c...b25b',\\n    ///             s: '0x5a72...be22'\\n    ///         },\\n    ///         {\\n    ///             v: 28,\\n    ///             r: '0x487s...67bb',\\n    ///             s: '0x12ad...2366'\\n    ///         }],\\n    ///         revoker: '0x244934dd3e31bE2c81f84ECf0b3E6329F5381992',\\n    ///         deadline: 1673891048\\n    ///     }])\\n    function multiRevokeByDelegation(\\n        MultiDelegatedRevocationRequest[] calldata multiDelegatedRequests\\n    ) external payable;\\n\\n    /// @notice Timestamps the specified bytes32 data.\\n    /// @param data The data to timestamp.\\n    /// @return The timestamp the data was timestamped with.\\n    function timestamp(bytes32 data) external returns (uint64);\\n\\n    /// @notice Timestamps the specified multiple bytes32 data.\\n    /// @param data The data to timestamp.\\n    /// @return The timestamp the data was timestamped with.\\n    function multiTimestamp(bytes32[] calldata data) external returns (uint64);\\n\\n    /// @notice Revokes the specified bytes32 data.\\n    /// @param data The data to timestamp.\\n    /// @return The timestamp the data was revoked with.\\n    function revokeOffchain(bytes32 data) external returns (uint64);\\n\\n    /// @notice Revokes the specified multiple bytes32 data.\\n    /// @param data The data to timestamp.\\n    /// @return The timestamp the data was revoked with.\\n    function multiRevokeOffchain(bytes32[] calldata data) external returns (uint64);\\n\\n    /// @notice Returns an existing attestation by UID.\\n    /// @param uid The UID of the attestation to retrieve.\\n    /// @return The attestation data members.\\n    function getAttestation(bytes32 uid) external view returns (Attestation memory);\\n\\n    /// @notice Checks whether an attestation exists.\\n    /// @param uid The UID of the attestation to retrieve.\\n    /// @return Whether an attestation exists.\\n    function isAttestationValid(bytes32 uid) external view returns (bool);\\n\\n    /// @notice Returns the timestamp that the specified data was timestamped with.\\n    /// @param data The data to query.\\n    /// @return The timestamp the data was timestamped with.\\n    function getTimestamp(bytes32 data) external view returns (uint64);\\n\\n    /// @notice Returns the timestamp that the specified data was timestamped with.\\n    /// @param data The data to query.\\n    /// @return The timestamp the data was timestamped with.\\n    function getRevokeOffchain(address revoker, bytes32 data) external view returns (uint64);\\n}\\n\",\"keccak256\":\"0xdad0674defce04905dc7935f2756d6c477a6e876c0b1b7094b112a862f164c12\",\"license\":\"MIT\"},\"eas/contracts/ISchemaRegistry.sol\":{\"content\":\"// SPDX-License-Identifier: MIT\\n\\npragma solidity ^0.8.0;\\n\\nimport { ISemver } from \\\"./ISemver.sol\\\";\\n\\nimport { ISchemaResolver } from \\\"./resolver/ISchemaResolver.sol\\\";\\n\\n/// @notice A struct representing a record for a submitted schema.\\nstruct SchemaRecord {\\n    bytes32 uid; // The unique identifier of the schema.\\n    ISchemaResolver resolver; // Optional schema resolver.\\n    bool revocable; // Whether the schema allows revocations explicitly.\\n    string schema; // Custom specification of the schema (e.g., an ABI).\\n}\\n\\n/// @title ISchemaRegistry\\n/// @notice The interface of global attestation schemas for the Ethereum Attestation Service protocol.\\ninterface ISchemaRegistry is ISemver {\\n    /// @notice Emitted when a new schema has been registered\\n    /// @param uid The schema UID.\\n    /// @param registerer The address of the account used to register the schema.\\n    /// @param schema The schema data.\\n    event Registered(bytes32 indexed uid, address indexed registerer, SchemaRecord schema);\\n\\n    /// @notice Submits and reserves a new schema\\n    /// @param schema The schema data schema.\\n    /// @param resolver An optional schema resolver.\\n    /// @param revocable Whether the schema allows revocations explicitly.\\n    /// @return The UID of the new schema.\\n    function register(string calldata schema, ISchemaResolver resolver, bool revocable) external returns (bytes32);\\n\\n    /// @notice Returns an existing schema by UID\\n    /// @param uid The UID of the schema to retrieve.\\n    /// @return The schema data members.\\n    function getSchema(bytes32 uid) external view returns (SchemaRecord memory);\\n}\\n\",\"keccak256\":\"0xea97dcd36a0c422169cbaac06698249e199049b627c16bff93fb8ab829058754\",\"license\":\"MIT\"},\"eas/contracts/ISemver.sol\":{\"content\":\"// SPDX-License-Identifier: MIT\\n\\npragma solidity ^0.8.0;\\n\\n/// @title ISemver\\n/// @notice A semver interface.\\ninterface ISemver {\\n    /// @notice Returns the full semver contract version.\\n    /// @return Semver contract version as a string.\\n    function version() external view returns (string memory);\\n}\\n\",\"keccak256\":\"0x04a67939b4e1a8d0a51101b8f69f8882930bbdc66319f38023828625b5d1ff18\",\"license\":\"MIT\"},\"eas/contracts/Semver.sol\":{\"content\":\"// SPDX-License-Identifier: MIT\\n\\npragma solidity ^0.8.4;\\n\\nimport { Strings } from \\\"@openzeppelin/contracts/utils/Strings.sol\\\";\\n\\nimport { ISemver } from \\\"./ISemver.sol\\\";\\n\\n/// @title Semver\\n/// @notice A simple contract for managing contract versions.\\ncontract Semver is ISemver {\\n    // Contract's major version number.\\n    uint256 private immutable _major;\\n\\n    // Contract's minor version number.\\n    uint256 private immutable _minor;\\n\\n    // Contract's patch version number.\\n    uint256 private immutable _patch;\\n\\n    /// @dev Create a new Semver instance.\\n    /// @param major Major version number.\\n    /// @param minor Minor version number.\\n    /// @param patch Patch version number.\\n    constructor(uint256 major, uint256 minor, uint256 patch) {\\n        _major = major;\\n        _minor = minor;\\n        _patch = patch;\\n    }\\n\\n    /// @notice Returns the full semver contract version.\\n    /// @return Semver contract version as a string.\\n    function version() external view returns (string memory) {\\n        return\\n            string(\\n                abi.encodePacked(Strings.toString(_major), \\\".\\\", Strings.toString(_minor), \\\".\\\", Strings.toString(_patch))\\n            );\\n    }\\n}\\n\",\"keccak256\":\"0x4f23442d048661b6aaa188ddc16b69cb310c2e44066b3852026afcb4201d61a9\",\"license\":\"MIT\"},\"eas/contracts/resolver/ISchemaResolver.sol\":{\"content\":\"// SPDX-License-Identifier: MIT\\n\\npragma solidity ^0.8.0;\\n\\nimport { Attestation } from \\\"./../Common.sol\\\";\\nimport { ISemver } from \\\"./../ISemver.sol\\\";\\n\\n/// @title ISchemaResolver\\n/// @notice The interface of an optional schema resolver.\\ninterface ISchemaResolver is ISemver {\\n    /// @notice Checks if the resolver can be sent ETH.\\n    /// @return Whether the resolver supports ETH transfers.\\n    function isPayable() external pure returns (bool);\\n\\n    /// @notice Processes an attestation and verifies whether it's valid.\\n    /// @param attestation The new attestation.\\n    /// @return Whether the attestation is valid.\\n    function attest(Attestation calldata attestation) external payable returns (bool);\\n\\n    /// @notice Processes multiple attestations and verifies whether they are valid.\\n    /// @param attestations The new attestations.\\n    /// @param values Explicit ETH amounts which were sent with each attestation.\\n    /// @return Whether all the attestations are valid.\\n    function multiAttest(\\n        Attestation[] calldata attestations,\\n        uint256[] calldata values\\n    ) external payable returns (bool);\\n\\n    /// @notice Processes an attestation revocation and verifies if it can be revoked.\\n    /// @param attestation The existing attestation to be revoked.\\n    /// @return Whether the attestation can be revoked.\\n    function revoke(Attestation calldata attestation) external payable returns (bool);\\n\\n    /// @notice Processes revocation of multiple attestation and verifies they can be revoked.\\n    /// @param attestations The existing attestations to be revoked.\\n    /// @param values Explicit ETH amounts which were sent with each revocation.\\n    /// @return Whether the attestations can be revoked.\\n    function multiRevoke(\\n        Attestation[] calldata attestations,\\n        uint256[] calldata values\\n    ) external payable returns (bool);\\n}\\n\",\"keccak256\":\"0xb7d1961ed928c620cddf35c2bf46845b10828bc5d73145214630202ed355b6bb\",\"license\":\"MIT\"}},\"version\":1}",
    "bytecode": "0x61012060405234801561001157600080fd5b50604051611433380380611433833981016040819052610030916100ae565b6002608052600060a081905260c0526001600160a01b038216610066576040516341bc07ff60e11b815260040160405180910390fd5b6001600160a01b03811615610084576001600160a01b038116610100525b506001600160a01b031660e0526100e8565b6001600160a01b03811681146100ab57600080fd5b50565b600080604083850312156100c157600080fd5b82516100cc81610096565b60208401519092506100dd81610096565b809150509250929050565b60805160a05160c05160e051610100516112f26101416000396000818161011d01528181610b280152610b6b01526000818161023e015261095501526000610480015260006104570152600061042e01526112f26000f3fe608060405234801561001057600080fd5b50600436106101165760003560e01c806389a82fbe116100a2578063bbbdc81811610071578063bbbdc8181461030d578063ce232ea014610320578063ea51994b14610333578063ec864cba14610371578063f3f725541461038457600080fd5b806389a82fbe146102755780639f1a7b50146102a8578063af288efe146102e5578063b616352a146102f857600080fd5b80635478235c116100e95780635478235c146101f457806354fd4d501461021457806363bbf81b1461022957806365c40b9c1461023c578063715ecdf61461026257600080fd5b80630d2461dc1461011b5780632412e9cc1461015a578063288a0a7b1461019e5780632f45f90e146101d4575b600080fd5b7f00000000000000000000000000000000000000000000000000000000000000005b6040516001600160a01b0390911681526020015b60405180910390f35b610190610168366004610cf2565b6001600160a01b03919091166000908152600260209081526040808320938352929052205490565b604051908152602001610151565b6101906101ac366004610cf2565b6001600160a01b03919091166000908152600360209081526040808320938352929052205490565b6101906101e2366004610d1e565b60009081526005602052604090205490565b610207610202366004610d45565b6103ad565b6040516101519190610d92565b61021c610427565b6040516101519190610df9565b610207610237366004610e2c565b6104ca565b7f000000000000000000000000000000000000000000000000000000000000000061013d565b610207610270366004610e6d565b610542565b610298610283366004610d1e565b60009081526006602052604090205460ff1690565b6040519015158152602001610151565b6101906102b6366004610ed4565b60009283526001602090815260408085209385529281528284206001600160a01b039290921684525290205490565b6102076102f3366004610f0d565b6105d2565b61030b610306366004610f55565b61064c565b005b61030b61031b366004610d1e565b610687565b61020761032e366004610fcc565b610693565b610190610341366004610ffe565b60009283526004602090815260408085206001600160a01b03948516865282528085209290931684525290205490565b61020761037f366004610f0d565b610714565b610190610392366004611035565b60009182526020828152604080842092845291905290205490565b600085815260208181526040808320878452825291829020805483518184028101840190945280845260609361041d939092919083018282801561041057602002820191906000526020600020905b8154815260200190600101908083116103fc575b505050505085858561078a565b9695505050505050565b60606104527f000000000000000000000000000000000000000000000000000000000000000061088f565b61047b7f000000000000000000000000000000000000000000000000000000000000000061088f565b6104a47f000000000000000000000000000000000000000000000000000000000000000061088f565b6040516020016104b693929190611057565b604051602081830303815290604052905090565b60606105376005600087815260200190815260200160002080548060200260200160405190810160405280929190818152602001828054801561041057602002820191906000526020600020908154815260200190600101908083116103fc57505050505085858561078a565b90505b949350505050565b60008681526004602090815260408083206001600160a01b03808a168552908352818420908816845282529182902080548351818402810184019094528084526060936105c7939092919083018282801561041057602002820191906000526020600020908154815260200190600101908083116103fc57505050505085858561078a565b979650505050505050565b6001600160a01b0385166000908152600260209081526040808320878452825291829020805483518184028101840190945280845260609361041d939092919083018282801561041057602002820191906000526020600020908154815260200190600101908083116103fc57505050505085858561078a565b8060005b818110156106815761067984848381811061066d5761066d6110b6565b90506020020135610922565b600101610650565b50505050565b61069081610922565b50565b600086815260016020908152604080832088845282528083206001600160a01b038816845282529182902080548351818402810184019094528084526060936105c7939092919083018282801561041057602002820191906000526020600020908154815260200190600101908083116103fc57505050505085858561078a565b6001600160a01b0385166000908152600360209081526040808320878452825291829020805483518184028101840190945280845260609361041d939092919083018282801561041057602002820191906000526020600020908154815260200190600101908083116103fc5750505050508585855b835160609060008190036107ae57505060408051600081526020810190915261053a565b8085106107cd5760405162ed0ab960e11b815260040160405180910390fd5b838581018210156107dd57508481035b60008167ffffffffffffffff8111156107f8576107f86110cc565b604051908082528060200260200182016040528015610821578160200160208202803683370190505b50905060005b8281101561088357888661083d57818901610846565b81890160010185035b81518110610856576108566110b6565b6020026020010151828281518110610870576108706110b6565b6020908102919091010152600101610827565b50979650505050505050565b6060600061089c83610c04565b600101905060008167ffffffffffffffff8111156108bc576108bc6110cc565b6040519080825280601f01601f1916602001820160405280156108e6576020820181803683370190505b5090508181016020015b600019016f181899199a1a9b1b9c1cb0b131b232b360811b600a86061a8153600a85049450846108f057509392505050565b60008181526006602052604090205460ff161561093c5750565b6040516328c44a9960e21b8152600481018290526000907f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03169063a3112a6490602401600060405180830381865afa1580156109a4573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526109cc91908101906111c2565b8051909150806109ef5760405163bd8ba84d60e01b815260040160405180910390fd5b60e082015160c083015160208085015160a08601516000888152600684526040808220805460ff191660019081179091558483526005865281832080548083018255908452868420018b90556001600160a01b0380881680855260028852838520878652885283852080548085018255908652888620018d905590891680855260038852838520878652885283852080548085018255908652888620018d90558685526004885283852090855287528284209084528652908220805491820181558252939020909201879055908015610b26576000818152602081815260408083208584528252808320805460018181018355918552838520018b905584845280835281842086855283528184206001600160a01b03891685528352908320805491820181558352912001879055610b2681610922565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031615610bd057604051631777b90360e31b8152600481018890527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03169063bbbdc81890602401600060405180830381600087803b158015610bb757600080fd5b505af1158015610bcb573d6000803e3d6000fd5b505050505b60405185907f2178f435e9624d54115e1d50a7313c90518a363b292678118444c0a239f11cf990600090a250505050505050565b60008072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b8310610c435772184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b830492506040015b6d04ee2d6d415b85acef81000000008310610c6f576d04ee2d6d415b85acef8100000000830492506020015b662386f26fc100008310610c8d57662386f26fc10000830492506010015b6305f5e1008310610ca5576305f5e100830492506008015b6127108310610cb957612710830492506004015b60648310610ccb576064830492506002015b600a8310610cd7576001015b92915050565b6001600160a01b038116811461069057600080fd5b60008060408385031215610d0557600080fd5b8235610d1081610cdd565b946020939093013593505050565b600060208284031215610d3057600080fd5b5035919050565b801515811461069057600080fd5b600080600080600060a08688031215610d5d57600080fd5b853594506020860135935060408601359250606086013591506080860135610d8481610d37565b809150509295509295909350565b602080825282518282018190526000918401906040840190835b81811015610dca578351835260209384019390920191600101610dac565b509095945050505050565b60005b83811015610df0578181015183820152602001610dd8565b50506000910152565b6020815260008251806020840152610e18816040850160208701610dd5565b601f01601f19169190910160400192915050565b60008060008060808587031215610e4257600080fd5b8435935060208501359250604085013591506060850135610e6281610d37565b939692955090935050565b60008060008060008060c08789031215610e8657600080fd5b863595506020870135610e9881610cdd565b94506040870135610ea881610cdd565b9350606087013592506080870135915060a0870135610ec681610d37565b809150509295509295509295565b600080600060608486031215610ee957600080fd5b83359250602084013591506040840135610f0281610cdd565b809150509250925092565b600080600080600060a08688031215610f2557600080fd5b8535610f3081610cdd565b94506020860135935060408601359250606086013591506080860135610d8481610d37565b60008060208385031215610f6857600080fd5b823567ffffffffffffffff811115610f7f57600080fd5b8301601f81018513610f9057600080fd5b803567ffffffffffffffff811115610fa757600080fd5b8560208260051b8401011115610fbc57600080fd5b6020919091019590945092505050565b60008060008060008060c08789031215610fe557600080fd5b86359550602087013594506040870135610ea881610cdd565b60008060006060848603121561101357600080fd5b83359250602084013561102581610cdd565b91506040840135610f0281610cdd565b6000806040838503121561104857600080fd5b50508035926020909101359150565b60008451611069818460208901610dd5565b601760f91b9083019081528451611087816001840160208901610dd5565b601760f91b6001929091019182015283516110a9816002840160208801610dd5565b0160020195945050505050565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b604051610140810167ffffffffffffffff81118282101715611106576111066110cc565b60405290565b805167ffffffffffffffff8116811461112457600080fd5b919050565b805161112481610cdd565b805161112481610d37565b600082601f83011261115057600080fd5b815167ffffffffffffffff81111561116a5761116a6110cc565b604051601f8201601f19908116603f0116810167ffffffffffffffff81118282101715611199576111996110cc565b6040528181528382016020018510156111b157600080fd5b61053a826020830160208701610dd5565b6000602082840312156111d457600080fd5b815167ffffffffffffffff8111156111eb57600080fd5b820161014081850312156111fe57600080fd5b6112066110e2565b81518152602080830151908201526112206040830161110c565b60408201526112316060830161110c565b60608201526112426080830161110c565b608082015260a0828101519082015261125d60c08301611129565b60c082015261126e60e08301611129565b60e08201526112806101008301611134565b61010082015261012082015167ffffffffffffffff8111156112a157600080fd5b6112ad8682850161113f565b6101208301525094935050505056fea26469706673582212203560fbda48954b8a583fa54477394d225d34128fdcc286ca5584fd81e62115ae64736f6c634300081c0033",
    "deployedBytecode": "0x608060405234801561001057600080fd5b50600436106101165760003560e01c806389a82fbe116100a2578063bbbdc81811610071578063bbbdc8181461030d578063ce232ea014610320578063ea51994b14610333578063ec864cba14610371578063f3f725541461038457600080fd5b806389a82fbe146102755780639f1a7b50146102a8578063af288efe146102e5578063b616352a146102f857600080fd5b80635478235c116100e95780635478235c146101f457806354fd4d501461021457806363bbf81b1461022957806365c40b9c1461023c578063715ecdf61461026257600080fd5b80630d2461dc1461011b5780632412e9cc1461015a578063288a0a7b1461019e5780632f45f90e146101d4575b600080fd5b7f00000000000000000000000000000000000000000000000000000000000000005b6040516001600160a01b0390911681526020015b60405180910390f35b610190610168366004610cf2565b6001600160a01b03919091166000908152600260209081526040808320938352929052205490565b604051908152602001610151565b6101906101ac366004610cf2565b6001600160a01b03919091166000908152600360209081526040808320938352929052205490565b6101906101e2366004610d1e565b60009081526005602052604090205490565b610207610202366004610d45565b6103ad565b6040516101519190610d92565b61021c610427565b6040516101519190610df9565b610207610237366004610e2c565b6104ca565b7f000000000000000000000000000000000000000000000000000000000000000061013d565b610207610270366004610e6d565b610542565b610298610283366004610d1e565b60009081526006602052604090205460ff1690565b6040519015158152602001610151565b6101906102b6366004610ed4565b60009283526001602090815260408085209385529281528284206001600160a01b039290921684525290205490565b6102076102f3366004610f0d565b6105d2565b61030b610306366004610f55565b61064c565b005b61030b61031b366004610d1e565b610687565b61020761032e366004610fcc565b610693565b610190610341366004610ffe565b60009283526004602090815260408085206001600160a01b03948516865282528085209290931684525290205490565b61020761037f366004610f0d565b610714565b610190610392366004611035565b60009182526020828152604080842092845291905290205490565b600085815260208181526040808320878452825291829020805483518184028101840190945280845260609361041d939092919083018282801561041057602002820191906000526020600020905b8154815260200190600101908083116103fc575b505050505085858561078a565b9695505050505050565b60606104527f000000000000000000000000000000000000000000000000000000000000000061088f565b61047b7f000000000000000000000000000000000000000000000000000000000000000061088f565b6104a47f000000000000000000000000000000000000000000000000000000000000000061088f565b6040516020016104b693929190611057565b604051602081830303815290604052905090565b60606105376005600087815260200190815260200160002080548060200260200160405190810160405280929190818152602001828054801561041057602002820191906000526020600020908154815260200190600101908083116103fc57505050505085858561078a565b90505b949350505050565b60008681526004602090815260408083206001600160a01b03808a168552908352818420908816845282529182902080548351818402810184019094528084526060936105c7939092919083018282801561041057602002820191906000526020600020908154815260200190600101908083116103fc57505050505085858561078a565b979650505050505050565b6001600160a01b0385166000908152600260209081526040808320878452825291829020805483518184028101840190945280845260609361041d939092919083018282801561041057602002820191906000526020600020908154815260200190600101908083116103fc57505050505085858561078a565b8060005b818110156106815761067984848381811061066d5761066d6110b6565b90506020020135610922565b600101610650565b50505050565b61069081610922565b50565b600086815260016020908152604080832088845282528083206001600160a01b038816845282529182902080548351818402810184019094528084526060936105c7939092919083018282801561041057602002820191906000526020600020908154815260200190600101908083116103fc57505050505085858561078a565b6001600160a01b0385166000908152600360209081526040808320878452825291829020805483518184028101840190945280845260609361041d939092919083018282801561041057602002820191906000526020600020908154815260200190600101908083116103fc5750505050508585855b835160609060008190036107ae57505060408051600081526020810190915261053a565b8085106107cd5760405162ed0ab960e11b815260040160405180910390fd5b838581018210156107dd57508481035b60008167ffffffffffffffff8111156107f8576107f86110cc565b604051908082528060200260200182016040528015610821578160200160208202803683370190505b50905060005b8281101561088357888661083d57818901610846565b81890160010185035b81518110610856576108566110b6565b6020026020010151828281518110610870576108706110b6565b6020908102919091010152600101610827565b50979650505050505050565b6060600061089c83610c04565b600101905060008167ffffffffffffffff8111156108bc576108bc6110cc565b6040519080825280601f01601f1916602001820160405280156108e6576020820181803683370190505b5090508181016020015b600019016f181899199a1a9b1b9c1cb0b131b232b360811b600a86061a8153600a85049450846108f057509392505050565b60008181526006602052604090205460ff161561093c5750565b6040516328c44a9960e21b8152600481018290526000907f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03169063a3112a6490602401600060405180830381865afa1580156109a4573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526109cc91908101906111c2565b8051909150806109ef5760405163bd8ba84d60e01b815260040160405180910390fd5b60e082015160c083015160208085015160a08601516000888152600684526040808220805460ff191660019081179091558483526005865281832080548083018255908452868420018b90556001600160a01b0380881680855260028852838520878652885283852080548085018255908652888620018d905590891680855260038852838520878652885283852080548085018255908652888620018d90558685526004885283852090855287528284209084528652908220805491820181558252939020909201879055908015610b26576000818152602081815260408083208584528252808320805460018181018355918552838520018b905584845280835281842086855283528184206001600160a01b03891685528352908320805491820181558352912001879055610b2681610922565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031615610bd057604051631777b90360e31b8152600481018890527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03169063bbbdc81890602401600060405180830381600087803b158015610bb757600080fd5b505af1158015610bcb573d6000803e3d6000fd5b505050505b60405185907f2178f435e9624d54115e1d50a7313c90518a363b292678118444c0a239f11cf990600090a250505050505050565b60008072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b8310610c435772184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b830492506040015b6d04ee2d6d415b85acef81000000008310610c6f576d04ee2d6d415b85acef8100000000830492506020015b662386f26fc100008310610c8d57662386f26fc10000830492506010015b6305f5e1008310610ca5576305f5e100830492506008015b6127108310610cb957612710830492506004015b60648310610ccb576064830492506002015b600a8310610cd7576001015b92915050565b6001600160a01b038116811461069057600080fd5b60008060408385031215610d0557600080fd5b8235610d1081610cdd565b946020939093013593505050565b600060208284031215610d3057600080fd5b5035919050565b801515811461069057600080fd5b600080600080600060a08688031215610d5d57600080fd5b853594506020860135935060408601359250606086013591506080860135610d8481610d37565b809150509295509295909350565b602080825282518282018190526000918401906040840190835b81811015610dca578351835260209384019390920191600101610dac565b509095945050505050565b60005b83811015610df0578181015183820152602001610dd8565b50506000910152565b6020815260008251806020840152610e18816040850160208701610dd5565b601f01601f19169190910160400192915050565b60008060008060808587031215610e4257600080fd5b8435935060208501359250604085013591506060850135610e6281610d37565b939692955090935050565b60008060008060008060c08789031215610e8657600080fd5b863595506020870135610e9881610cdd565b94506040870135610ea881610cdd565b9350606087013592506080870135915060a0870135610ec681610d37565b809150509295509295509295565b600080600060608486031215610ee957600080fd5b83359250602084013591506040840135610f0281610cdd565b809150509250925092565b600080600080600060a08688031215610f2557600080fd5b8535610f3081610cdd565b94506020860135935060408601359250606086013591506080860135610d8481610d37565b60008060208385031215610f6857600080fd5b823567ffffffffffffffff811115610f7f57600080fd5b8301601f81018513610f9057600080fd5b803567ffffffffffffffff811115610fa757600080fd5b8560208260051b8401011115610fbc57600080fd5b6020919091019590945092505050565b60008060008060008060c08789031215610fe557600080fd5b86359550602087013594506040870135610ea881610cdd565b60008060006060848603121561101357600080fd5b83359250602084013561102581610cdd565b91506040840135610f0281610cdd565b6000806040838503121561104857600080fd5b50508035926020909101359150565b60008451611069818460208901610dd5565b601760f91b9083019081528451611087816001840160208901610dd5565b601760f91b6001929091019182015283516110a9816002840160208801610dd5565b0160020195945050505050565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b604051610140810167ffffffffffffffff81118282101715611106576111066110cc565b60405290565b805167ffffffffffffffff8116811461112457600080fd5b919050565b805161112481610cdd565b805161112481610d37565b600082601f83011261115057600080fd5b815167ffffffffffffffff81111561116a5761116a6110cc565b604051601f8201601f19908116603f0116810167ffffffffffffffff81118282101715611199576111996110cc565b6040528181528382016020018510156111b157600080fd5b61053a826020830160208701610dd5565b6000602082840312156111d457600080fd5b815167ffffffffffffffff8111156111eb57600080fd5b820161014081850312156111fe57600080fd5b6112066110e2565b81518152602080830151908201526112206040830161110c565b60408201526112316060830161110c565b60608201526112426080830161110c565b608082015260a0828101519082015261125d60c08301611129565b60c082015261126e60e08301611129565b60e08201526112806101008301611134565b61010082015261012082015167ffffffffffffffff8111156112a157600080fd5b6112ad8682850161113f565b6101208301525094935050505056fea26469706673582212203560fbda48954b8a583fa54477394d225d34128fdcc286ca5584fd81e62115ae64736f6c634300081c0033",
    "devdoc": {
      "events": {
        "Indexed(bytes32)": {
          "params": {
            "uid": "The UID the attestation."
          }
        }
      },
      "kind": "dev",
      "methods": {
        "constructor": {
          "details": "Creates a new Indexer instance.",
          "params": {
            "eas": "The address of the global EAS contract."
          }
        },
        "getReceivedAttestationUIDCount(address,bytes32)": {
          "params": {
            "recipient": "The recipient of the attestation.",
            "schemaUID": "The UID of the schema."
          },
          "returns": {
            "_0": "The total number of attestations."
          }
        },
        "getReceivedAttestationUIDs(address,bytes32,uint256,uint256,bool)": {
          "params": {
            "length": "The number of total members to retrieve.",
            "recipient": "The recipient of the attestation.",
            "reverseOrder": "Whether the offset starts from the end and the data is returned in reverse.",
            "schemaUID": "The UID of the schema.",
            "start": "The offset to start from."
          },
          "returns": {
            "_0": "An array of attestation UIDs."
          }
        },
        "getReferencingAttestationUIDByAddressCount(bytes32,bytes32,address)": {
          "params": {
            "attester": "The attester of the referencing attestations.",
            "attestionUID": "The UID of the attestation.",
            "schemaUID": "The UID of the schema."
          },
          "returns": {
            "_0": "An array of attestation UIDs."
          }
        },
        "getReferencingAttestationUIDCount(bytes32,bytes32)": {
          "params": {
            "attestionUID": "The UID of the attestation.",
            "schemaUID": "The UID of the schema."
          },
          "returns": {
            "_0": "An array of attestation UIDs."
          }
        },
        "getReferencingAttestationUIDs(bytes32,bytes32,uint256,uint256,bool)": {
          "params": {
            "attestionUID": "The UID of the attestation being referenced.",
            "length": "The number of total members to retrieve.",
            "reverseOrder": "Whether the offset starts from the end and the data is returned in reverse.",
            "schemaUID": "The UID of the schema of the referencing attestations.",
            "start": "The offset to start from."
          },
          "returns": {
            "_0": "An array of attestation UIDs."
          }
        },
        "getReferencingAttestationUIDsByAddress(bytes32,bytes32,address,uint256,uint256,bool)": {
          "params": {
            "attester": "The attester of the referencing attestations.",
            "attestionUID": "The UID of the attestation being referenced.",
            "length": "The number of total members to retrieve.",
            "reverseOrder": "Whether the offset starts from the end and the data is returned in reverse.",
            "schemaUID": "The UID of the schema of the referencing attestations.",
            "start": "The offset to start from."
          },
          "returns": {
            "_0": "An array of attestation UIDs."
          }
        },
        "getSchemaAttestationUIDCount(bytes32)": {
          "params": {
            "schemaUID": "The UID of the schema."
          },
          "returns": {
            "_0": "An array of attestation UIDs."
          }
        },
        "getSchemaAttestationUIDs(bytes32,uint256,uint256,bool)": {
          "params": {
            "length": "The number of total members to retrieve.",
            "reverseOrder": "Whether the offset starts from the end and the data is returned in reverse.",
            "schemaUID": "The UID of the schema.",
            "start": "The offset to start from."
          },
          "returns": {
            "_0": "An array of attestation UIDs."
          }
        },
        "getSchemaAttesterRecipientAttestationUIDCount(bytes32,address,address)": {
          "params": {
            "attester": "The attester of the attestation.",
            "recipient": "The recipient of the attestation.",
            "schemaUID": "The UID of the schema."
          },
          "returns": {
            "_0": "An array of attestation UIDs."
          }
        },
        "getSchemaAttesterRecipientAttestationUIDs(bytes32,address,address,uint256,uint256,bool)": {
          "params": {
            "attester": "The attester of the attestation.",
            "length": "The number of total members to retrieve.",
            "recipient": "The recipient of the attestation.",
            "reverseOrder": "Whether the offset starts from the end and the data is returned in reverse.",
            "schemaUID": "The UID of the schema.",
            "start": "The offset to start from."
          },
          "returns": {
            "_0": "An array of attestation UIDs."
          }
        },
        "getSentAttestationUIDCount(address,bytes32)": {
          "params": {
            "attester": "The attester of the attestation.",
            "schemaUID": "The UID of the schema."
          },
          "returns": {
            "_0": "The total number of attestations."
          }
        },
        "getSentAttestationUIDs(address,bytes32,uint256,uint256,bool)": {
          "params": {
            "attester": "The attester of the attestation.",
            "length": "The number of total members to retrieve.",
            "reverseOrder": "Whether the offset starts from the end and the data is returned in reverse.",
            "schemaUID": "The UID of the schema.",
            "start": "The offset to start from."
          },
          "returns": {
            "_0": "An array of attestation UIDs."
          }
        },
        "indexAttestation(bytes32)": {
          "params": {
            "attestationUID": "The UID of the attestation to index."
          }
        },
        "indexAttestations(bytes32[])": {
          "params": {
            "attestationUIDs": "The UIDs of the attestations to index."
          }
        },
        "isAttestationIndexed(bytes32)": {
          "params": {
            "attestationUID": "The UID of the attestation to check."
          },
          "returns": {
            "_0": "Whether an attestation has been already indexed."
          }
        },
        "version()": {
          "returns": {
            "_0": "Semver contract version as a string."
          }
        }
      },
      "title": "Indexer",
      "version": 1
    },
    "userdoc": {
      "events": {
        "Indexed(bytes32)": {
          "notice": "Emitted when an attestation has been indexed."
        }
      },
      "kind": "user",
      "methods": {
        "getEAS()": {
          "notice": "Returns the EAS."
        },
        "getPrevIndexer()": {
          "notice": "Returns the previously deployed EAS Indexer."
        },
        "getReceivedAttestationUIDCount(address,bytes32)": {
          "notice": "Returns the total number of attestations to a specific schema which were attested to/received by a     specific recipient."
        },
        "getReceivedAttestationUIDs(address,bytes32,uint256,uint256,bool)": {
          "notice": "Returns the UIDs of attestations to a specific schema which were attested to/received by a specific     recipient."
        },
        "getReferencingAttestationUIDByAddressCount(bytes32,bytes32,address)": {
          "notice": "Returns the total number of references to a specific attestation."
        },
        "getReferencingAttestationUIDCount(bytes32,bytes32)": {
          "notice": "Returns the total number of references to a specific attestation."
        },
        "getReferencingAttestationUIDs(bytes32,bytes32,uint256,uint256,bool)": {
          "notice": "Returns the UIDs of attestations referencing a specific attestation."
        },
        "getReferencingAttestationUIDsByAddress(bytes32,bytes32,address,uint256,uint256,bool)": {
          "notice": "Returns the UIDs of attestations referencing a specific attestation."
        },
        "getSchemaAttestationUIDCount(bytes32)": {
          "notice": "Returns the total number of attestations to a specific schema."
        },
        "getSchemaAttestationUIDs(bytes32,uint256,uint256,bool)": {
          "notice": "Returns the UIDs of attestations to a specific schema."
        },
        "getSchemaAttesterRecipientAttestationUIDCount(bytes32,address,address)": {
          "notice": "Returns the total number of UIDs of attestations to a specific schema which were attested by a specific     attester to a specific recipient."
        },
        "getSchemaAttesterRecipientAttestationUIDs(bytes32,address,address,uint256,uint256,bool)": {
          "notice": "Returns the UIDs of attestations to a specific schema which were attested by a specific attester to a     specific recipient."
        },
        "getSentAttestationUIDCount(address,bytes32)": {
          "notice": "Returns the total number of attestations to a specific schema which were attested by a specific attester."
        },
        "getSentAttestationUIDs(address,bytes32,uint256,uint256,bool)": {
          "notice": "Returns the UIDs of attestations to a specific schema which were attested by a specific attester."
        },
        "indexAttestation(bytes32)": {
          "notice": "Indexes an existing attestation."
        },
        "indexAttestations(bytes32[])": {
          "notice": "Indexes multiple existing attestations."
        },
        "isAttestationIndexed(bytes32)": {
          "notice": "Returns whether an existing attestation has been already indexed."
        },
        "version()": {
          "notice": "Returns the full semver contract version."
        }
      },
      "notice": "Indexing Service for the Ethereum Attestation Service",
      "version": 1
    },
    "storageLayout": {
      "storage": [
        {
          "astId": 1444,
          "contract": "contracts/Indexer.sol:Indexer",
          "label": "_referencingAttestations",
          "offset": 0,
          "slot": "0",
          "type": "t_mapping(t_bytes32,t_mapping(t_bytes32,t_array(t_bytes32)dyn_storage))"
        },
        {
          "astId": 1454,
          "contract": "contracts/Indexer.sol:Indexer",
          "label": "_referencingAttestationsByAddress",
          "offset": 0,
          "slot": "1",
          "type": "t_mapping(t_bytes32,t_mapping(t_bytes32,t_mapping(t_address,t_array(t_bytes32)dyn_storage)))"
        },
        {
          "astId": 1462,
          "contract": "contracts/Indexer.sol:Indexer",
          "label": "_receivedAttestations",
          "offset": 0,
          "slot": "2",
          "type": "t_mapping(t_address,t_mapping(t_bytes32,t_array(t_bytes32)dyn_storage))"
        },
        {
          "astId": 1469,
          "contract": "contracts/Indexer.sol:Indexer",
          "label": "_sentAttestations",
          "offset": 0,
          "slot": "3",
          "type": "t_mapping(t_address,t_mapping(t_bytes32,t_array(t_bytes32)dyn_storage))"
        },
        {
          "astId": 1478,
          "contract": "contracts/Indexer.sol:Indexer",
          "label": "_schemaAttesterRecipientAttestations",
          "offset": 0,
          "slot": "4",
          "type": "t_mapping(t_bytes32,t_mapping(t_address,t_mapping(t_address,t_array(t_bytes32)dyn_storage)))"
        },
        {
          "astId": 1483,
          "contract": "contracts/Indexer.sol:Indexer",
          "label": "_schemaAttestations",
          "offset": 0,
          "slot": "5",
          "type": "t_mapping(t_bytes32,t_array(t_bytes32)dyn_storage)"
        },
        {
          "astId": 1487,
          "contract": "contracts/Indexer.sol:Indexer",
          "label": "_indexedAttestations",
          "offset": 0,
          "slot": "6",
          "type": "t_mapping(t_bytes32,t_bool)"
        }
      ],
      "types": {
        "t_address": {
          "encoding": "inplace",
          "label": "address",
          "numberOfBytes": "20"
        },
        "t_array(t_bytes32)dyn_storage": {
          "base": "t_bytes32",
          "encoding": "dynamic_array",
          "label": "bytes32[]",
          "numberOfBytes": "32"
        },
        "t_bool": {
          "encoding": "inplace",
          "label": "bool",
          "numberOfBytes": "1"
        },
        "t_bytes32": {
          "encoding": "inplace",
          "label": "bytes32",
          "numberOfBytes": "32"
        },
        "t_mapping(t_address,t_array(t_bytes32)dyn_storage)": {
          "encoding": "mapping",
          "key": "t_address",
          "label": "mapping(address => bytes32[])",
          "numberOfBytes": "32",
          "value": "t_array(t_bytes32)dyn_storage"
        },
        "t_mapping(t_address,t_mapping(t_address,t_array(t_bytes32)dyn_storage))": {
          "encoding": "mapping",
          "key": "t_address",
          "label": "mapping(address => mapping(address => bytes32[]))",
          "numberOfBytes": "32",
          "value": "t_mapping(t_address,t_array(t_bytes32)dyn_storage)"
        },
        "t_mapping(t_address,t_mapping(t_bytes32,t_array(t_bytes32)dyn_storage))": {
          "encoding": "mapping",
          "key": "t_address",
          "label": "mapping(address => mapping(bytes32 => bytes32[]))",
          "numberOfBytes": "32",
          "value": "t_mapping(t_bytes32,t_array(t_bytes32)dyn_storage)"
        },
        "t_mapping(t_bytes32,t_array(t_bytes32)dyn_storage)": {
          "encoding": "mapping",
          "key": "t_bytes32",
          "label": "mapping(bytes32 => bytes32[])",
          "numberOfBytes": "32",
          "value": "t_array(t_bytes32)dyn_storage"
        },
        "t_mapping(t_bytes32,t_bool)": {
          "encoding": "mapping",
          "key": "t_bytes32",
          "label": "mapping(bytes32 => bool)",
          "numberOfBytes": "32",
          "value": "t_bool"
        },
        "t_mapping(t_bytes32,t_mapping(t_address,t_array(t_bytes32)dyn_storage))": {
          "encoding": "mapping",
          "key": "t_bytes32",
          "label": "mapping(bytes32 => mapping(address => bytes32[]))",
          "numberOfBytes": "32",
          "value": "t_mapping(t_address,t_array(t_bytes32)dyn_storage)"
        },
        "t_mapping(t_bytes32,t_mapping(t_address,t_mapping(t_address,t_array(t_bytes32)dyn_storage)))": {
          "encoding": "mapping",
          "key": "t_bytes32",
          "label": "mapping(bytes32 => mapping(address => mapping(address => bytes32[])))",
          "numberOfBytes": "32",
          "value": "t_mapping(t_address,t_mapping(t_address,t_array(t_bytes32)dyn_storage))"
        },
        "t_mapping(t_bytes32,t_mapping(t_bytes32,t_array(t_bytes32)dyn_storage))": {
          "encoding": "mapping",
          "key": "t_bytes32",
          "label": "mapping(bytes32 => mapping(bytes32 => bytes32[]))",
          "numberOfBytes": "32",
          "value": "t_mapping(t_bytes32,t_array(t_bytes32)dyn_storage)"
        },
        "t_mapping(t_bytes32,t_mapping(t_bytes32,t_mapping(t_address,t_array(t_bytes32)dyn_storage)))": {
          "encoding": "mapping",
          "key": "t_bytes32",
          "label": "mapping(bytes32 => mapping(bytes32 => mapping(address => bytes32[])))",
          "numberOfBytes": "32",
          "value": "t_mapping(t_bytes32,t_mapping(t_address,t_array(t_bytes32)dyn_storage))"
        }
      }
    }
  }
  export { IndexerDef };
  
  export async function isAttestationIndexed(uid: string): Promise<boolean> {
      console.log('eas.isAttestationIndexed for uid:', uid.slice(0, 7));
      try {
          const result = await client.readContract({
              address: IndexerDef.address as `0x${string}`,
              abi: IndexerDef.abi,
              functionName: 'isAttestationIndexed',
              args: [uid as `0x${string}`]
          }) as boolean;
          
          console.log('eas.isAttestationIndexed:', result, " [", uid.slice(0, 7), "]");
          return result;
      } catch (error: unknown) {
          console.error('Failed to check eas.isAttestationIndexed:', error);
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
      console.log('eas.getReferencingAttestationUIDs for attestationUID:', attestationUID.slice(0, 7), 'schemaUID:', schemaUID.slice(0, 7));
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
          
          console.log('eas.getReferencingAttestationUIDs:', result);
          return result;
      } catch (error: unknown) {
          console.error('Failed to get eas.getReferencingAttestationUIDs:', error);
          throw error;
      }
  }
  
  export async function getReferencingAttestationUIDCount(
      attestationUID: string,
      schemaUID: string
  ): Promise<bigint> {
      console.log('eas.getReferencingAttestationUIDCount for attestationUID:', attestationUID.slice(0, 7), 'schemaUID:', schemaUID.slice(0, 7));
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
          
          console.log('eas.getReferencingAttestationUIDCount:', result);
          return result;
      } catch (error: unknown) {
          console.error('Failed to get eas.getReferencingAttestationUIDCount:', error);
          throw error;
      }
  }

export { easObj, schemaRegistry, eassdk};