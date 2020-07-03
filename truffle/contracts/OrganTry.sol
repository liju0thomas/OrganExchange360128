pragma solidity >=0.5.0 <0.7.0;
contract OrganTry {
    struct details {
        uint256 hospitalid;
        string aname;
        string ablood;
        string ahla;
        string dname;
        string dblood;
        string dhla;
        string hname;
        string demail;
        string aemail;

    }
    uint256 hos1;
    mapping(uint256 => details) waitinglist;

    struct pairstatus {
        uint256 np;
        int256 cp;
    }

    mapping(string => mapping(string => mapping(string => mapping(string => pairstatus[]))))lists;

    function setkaro(
        uint256 _id,
        string memory _aname,
        string memory _ablood,
        string memory _ahla,
        string memory _dname,
        string memory _dblood,
        string memory _dhla,
        string memory _demail,
        string memory _aemail,
        uint _hospitalid,
        string memory _hname
    ) public {
        waitinglist[_id] = details(_hospitalid, _aname, _ablood, _ahla, _dname, _dblood,_dhla,_hname,_demail,_aemail);
   
    }


    function findMatch(uint256 _id)
        public
    {
        string memory ablood = waitinglist[_id].ablood;
        string memory ahla = waitinglist[_id].ahla;
        string memory dblood = waitinglist[_id].dblood;
        string memory dhla = waitinglist[_id].dhla;
        if(lists[dblood][dhla][ablood][ahla].length>0)
        {
        uint256 index = lists[dblood][dhla][ablood][ahla].length - 1;
        pairstatus memory element = lists[dblood][dhla][ablood][ahla][index];
        delete lists[dblood][dhla][ablood][ahla][index];
        hos1 = element.np;
        }
        else 
        {
            hos1 = 1000000;
            pairstatus memory ps = pairstatus (_id, -1);
            lists[ablood][ahla][dblood][dhla].push(ps);
        }

        
    }
    function newbee()
    public 
    view 
    returns(uint256)
    {
        return hos1;

    }

    function rdn(uint256 _id) public view returns(string memory) 
    {
        string memory name = waitinglist[_id].dname;
        return(name);
    }

       function hn(uint256 _id) public view returns(string memory) 
    {
        string memory name = waitinglist[_id].hname;
        return(name);
    }
    function rdblood(uint256 _id) public view returns(string memory)
    {
        string memory blood = waitinglist[_id].dblood;
        return(blood);  
    }
    function rdhla(uint256 _id) public view returns(string memory) 
    {
        string memory hla = waitinglist[_id].dhla;
        return(hla);
    }
    function raname(uint256 _id) public view returns(string memory) 
    {
        string memory name = waitinglist[_id].aname;
        return(name);
    }
    function rablood(uint256 _id) public view returns(string memory)
    {
        string memory blood = waitinglist[_id].ablood;
        return(blood);  
    }
    function rahla(uint256 _id) public view returns(string memory) 
    {
        string memory hla = waitinglist[_id].ahla;
        return(hla);
    }
    function rhosp(uint256 _id) public view returns(uint) 
    {
        uint256 hospitalid = waitinglist[_id].hospitalid;
        return(hospitalid);
    }
     function demai(uint256 _id) public view returns(string memory) 
    {
        string memory email = waitinglist[_id].demail;
        return(email);
    }
    function aemai(uint256 _id) public view returns(string memory) 
    {
        string memory email = waitinglist[_id].aemail;
        return(email);
    }
}






       