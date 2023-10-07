
const { ethers } = require('hardhat');


async function main() {
  // Deploy Usofnem contract
  const Usofnem = await ethers.getContractFactory('Usofnem');
  const usofnem = await Usofnem.deploy(
    'ARB Domain Names',
    'ARB',
    'ipfs://QmX84eZYCYv6byajWNwSw6U2XfuBL5S7Ln3og7KCep3tpq',
    '0xe6b8a5cf854791412c1f6efc7caf629f5df1c747'
  );
  await usofnem.deployed();

  console.log('Usofnem deployed to:', usofnem.address);

  // Deploy ReverseUON contract
  const ReverseUON = await ethers.getContractFactory('ReverseUON');
  const reverseUON = await ReverseUON.deploy(usofnem.address);
  await reverseUON.deployed();

  console.log('ReverseUON deployed to:', reverseUON.address);






  await hre.run("verify:verify", {
    address: usofnem.address,
    constructorArguments: [
      "ARB Domain Names", 
      "ARB",
      "ipfs://QmX84eZYCYv6byajWNwSw6U2XfuBL5S7Ln3og7KCep3tpq",
      "0xe6b8a5cf854791412c1f6efc7caf629f5df1c747"
    ],
  });

  await hre.run("verify:verify", {
    address: reverseUON.address,
    constructorArguments: [usofnem.address],
  });
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });