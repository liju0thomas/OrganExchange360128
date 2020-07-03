pragma solidity >=0.5.0 <0.7.0;


contract OrganDonor {
    struct details {
        string name;
        string blood;
        string hla;
    }

    mapping(uint256 => details) donors;
    mapping(uint256 => details) acceptors;

    struct donorStatus {
        uint256 donorId;
        int256 acceptorId;
    }

    mapping(string => mapping(string => donorStatus[])) donorsList;

    function setDonor(
        uint256 _id,
        string memory _name,
        string memory _blood,
        string memory _hla
    ) public {
        donors[_id] = details(_name, _blood, _hla);
        donorStatus memory ds = donorStatus(_id, -1);
        donorsList[_blood][_hla].push(ds);
    }

    function setAcceptor(
        uint256 _id,
        string memory _name,
        string memory _blood,
        string memory _hla
    ) public {
        acceptors[_id] = details(_name, _blood, _hla);
    }

    function findMatch(uint256 _acceptorId)
        public
        view
        returns (uint256 _index, uint256 _donorId, string memory _donorName)
    {
        string memory _blood = acceptors[_acceptorId].blood;
        string memory _hla = acceptors[_acceptorId].hla;

        for (uint256 i = 0; i < donorsList[_blood][_hla].length; i++) {
            donorStatus memory ds = donorsList[_blood][_hla][i];
            if (ds.acceptorId == -1) {
                details memory donor = donors[ds.donorId];
                return (i, ds.donorId, donor.name);
            }
        }
    }

    function transferOrgan(uint256 _donorId, int256 _acceptorId) public {
        details memory donor = donors[_donorId];
        for (
            uint256 i = 0;
            i < donorsList[donor.blood][donor.hla].length;
            i++
        ) {
            donorStatus memory ds = donorsList[donor.blood][donor.hla][i];
            if (ds.donorId == _donorId)
                donorsList[donor.blood][donor.hla][i].acceptorId = _acceptorId;
        }
    }
}
