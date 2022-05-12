import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null,index:0,item_price:0,item_name:null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    console.log("hi");
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();
    console.log(response);

    // Update state with the result.
    this.setState({ storageValue: response });
  };
  handelsubmit=async()=>{ 

    const{item_name,item_price,accounts,contract}=this.state;

    // const j=await contract.methods.get_address().call();
    // console.log(j);
    const j=await contract.methods.add_item(item_price,item_name).send({ from: accounts[0],gas:300000 });
    const index=j.events.Adding_item.returnValues.index_of_item; 
    this.setState({item_name:item_name,item_price:item_price,index:index});




  };
  donate=async()=>{
        const{item_name,item_price,accounts,contract,index}=this.state;
        const j=await contract.methods.check_item_name(index).send({from:accounts[0]});
        const pr=j.events.about_item.returnValues.price;
        this.setState({product_price:pr});


        



  };
   handelchange=(event)=>{
    const target=event.target;
    const value=target.type=="checkbox"?target.checked:target.value;
    const name=target.name;

    this.setState({[name]:value});


  };


   buy_product=async()=>{
    const { accounts, contract,web3,index } = this.state;
    console.log(index);
    const l=await contract.methods.pay_amount(index).send({from:accounts[0],to:"0x116af2a284821a9285772f679cd67f2b39f0ae79",value:100,gas:300000});
    if(l.events.buy.returnValues[0]=="s"){
      alert("item purchased");
    }
  };


  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
    <div className="App">
      <h1>Welcome to Seller shop</h1>

      <div>
      <span>Item Name:</span><input type="text" name="item_name"  value={this.state.item_name} onChange={this.handelchange} ></input>
      <br></br>
       <span>Item  Price:</span><input type="number" name="item_price" value={this.state.item_price}   onChange={this.handelchange}></input>
       <br></br>
       <button onClick={this.handelsubmit}>submit </button>




       <br></br>


       <input type="number" name="index" value={this.state.index} onChange={this.handelchange} ></input>
       <button onClick={this.donate}>Check Product Price with There index</button>
       <h2>{this.state.product_price}</h2>

        <button type="button" onClick={this.buy_product}>buy product</button>
      </div>
      </div>


       
    );
  }
}

export default App;
