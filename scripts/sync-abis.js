import fs from 'fs';
import path from 'path';

let contractsPath = process.env.EFS_CONTRACTS_PATH;

if (!contractsPath) {
  // Default to sibling 'contracts' directory if no env var is provided
  contractsPath = path.resolve(process.cwd(), '../contracts');
}

const sourceFile = path.join(contractsPath, 'packages/nextjs/contracts/deployedContracts.ts');
if (!fs.existsSync(sourceFile)) {
  console.error(`❌ Could not find deployedContracts.ts at ${sourceFile}`);
  process.exit(1);
}

// Ensure generated directory exists
const genDir = path.join(process.cwd(), 'src/libefs/generated');
if (!fs.existsSync(genDir)) {
  fs.mkdirSync(genDir, { recursive: true });
}

const destFile = path.join(genDir, 'deployedContracts.ts');
fs.copyFileSync(sourceFile, destFile);

console.log(`✅ Successfully synced local ABIs`);
console.log(`   FROM: ${sourceFile}`);
console.log(`   TO:   ${destFile}`);
