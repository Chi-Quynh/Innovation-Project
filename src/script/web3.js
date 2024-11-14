import web3 from "./web3";
import SimpleStorage from "../../build/contracts/SimpleStorage.json";

const contractAddress = "0x181eCa6c6Aa7AEd503F377414c099F9d3727f474";
const simpleStorage = new web3.eth.Contract(SimpleStorage.abi, contractAddress);

export default simpleStorage;
