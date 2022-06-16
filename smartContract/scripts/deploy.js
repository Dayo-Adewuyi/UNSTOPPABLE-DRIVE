//implement ethers from hardhat
const{ethers} = require("hardhat");

async function main(){
     /*
  A ContractFactory in ethers.js is an abstraction used to deploy new smart contracts,
  so NestcoinContract here is a factory for instances of our Nestcoin contract.
  */
 console.log("deploying 0xPantry contract.......")
    const OxPantry = await ethers.getContractFactory("OxPantry");

    // here we deploy the contract
    const deployedOxPantryContract = await OxPantry.deploy();

    // Wait for it to finish deploying
  await deployedOxPantryContract.deployed();

  // print the address of the deployed contract
  console.log(
    "\n 🏵 0xPantry Contract Address:",
    deployedOxPantryContract.address
  );
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });