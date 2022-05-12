// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

contract SimpleStorage {
  uint storedData;
  address owner;
  uint   public itm_np;
  enum productstate {create,paid}

  event Adding_item(uint price,string name,address from,string  received_msg, productstate p,uint index_of_item);
  event buy(string prduct,address i,productstate);
  event about_item(uint price,string name);
  struct item{
    uint price;
    string name;
    productstate p;
  }
  mapping (uint=>item) public item_des;
  uint itemindex;

 constructor() public{
      owner=msg.sender;

  }
  function set(uint x) public{
    uint j=x+100;
    storedData =j;
    


  


  }

  function get() public view returns (uint) {
    return storedData;
  }


  function get_bal() public returns(uint){
    return 10;



  }

  // adding item and and sending emit for the front ed


  function add_item(uint item_price,string memory item_name) public{
    item_des[itemindex].price=item_price;
    item_des[itemindex].name=item_name;
    item_des[itemindex].p=productstate.create;
    address ms=address(this);
    string memory sy="item added";
    emit Adding_item(item_price,item_name,ms,sy,item_des[itemindex].p,itemindex);
    itm_np=itemindex;

    itemindex++;
    

  }

  // check item price with there name

  function check_item_name(uint index) public returns(string memory){
    string memory j=item_des[index].name;
    uint k=item_des[index].price;
    emit about_item(k,j);
  }

  // payin amount of item with there status update and index

  function pay_amount(uint index) public payable{

   
    // require(item_des[itemindex].p==productstate.create,"item is already paid");
    
    //   require(msg.value==item_des[itemindex].price,"amount should be equal to price");
      string memory item_names=item_des[itemindex].name;
      item_des[itemindex].p=productstate.paid;
      emit buy("s",msg.sender,item_des[itemindex].p);
      

  }
  // address of contract

  function get_address() public returns(address){
    return address(this);

  }

  
  
// receive function
  receive() external payable{
    

  }






}