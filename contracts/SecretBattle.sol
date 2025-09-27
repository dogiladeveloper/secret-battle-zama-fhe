// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

/*
  Updated for competition readiness:
  - encryptedMoveA / encryptedMoveB / encryptedResult should be replaced with Zama euint8 / euint64 types.
  - Relayer.js script provided to compute encrypted result and call recordResult.
*/

contract SecretBattle is Ownable {
    enum Status { Waiting, Ready, ResultRecorded, Claimed }

    struct Match {
        address playerA;
        address playerB;
        // TODO: replace bytes with euint8 / euint64 from Zama FHE library
        bytes encryptedMoveA;
        bytes encryptedMoveB;
        bytes encryptedResult;
        Status status;
        uint256 stake;
    }

    Match[] public matches;

    event MatchCreated(uint256 indexed matchId, address indexed creator);
    event MoveSubmitted(uint256 indexed matchId, address indexed player);
    event ResultRecorded(uint256 indexed matchId);
    event RewardClaimed(uint256 indexed matchId, address indexed claimer, uint256 amount);

    function createMatch(address opponent) external payable returns (uint256) {
        matches.push(Match({
            playerA: msg.sender,
            playerB: opponent,
            encryptedMoveA: "",
            encryptedMoveB: "",
            encryptedResult: "",
            status: Status.Waiting,
            stake: msg.value
        }));
        uint256 id = matches.length - 1;
        emit MatchCreated(id, msg.sender);
        return id;
    }

    function submitMove(uint256 matchId, bytes calldata encryptedMove) external {
        require(matchId < matches.length, "invalid match");
        Match storage m = matches[matchId];
        require(m.status != Status.ResultRecorded && m.status != Status.Claimed, "finished");

        if (msg.sender == m.playerA) {
            require(m.encryptedMoveA.length == 0, "A already moved");
            m.encryptedMoveA = encryptedMove;
        } else if (msg.sender == m.playerB) {
            require(m.encryptedMoveB.length == 0, "B already moved");
            m.encryptedMoveB = encryptedMove;
        } else {
            revert("not a player");
        }

        if (m.encryptedMoveA.length != 0 && m.encryptedMoveB.length != 0) {
            m.status = Status.Ready;
        }

        emit MoveSubmitted(matchId, msg.sender);
    }

    function recordResult(uint256 matchId, bytes calldata encryptedResult) external onlyOwner {
        require(matchId < matches.length, "invalid match");
        Match storage m = matches[matchId];
        require(m.status == Status.Ready, "not ready");
        m.encryptedResult = encryptedResult;
        m.status = Status.ResultRecorded;
        emit ResultRecorded(matchId);
    }

    function claim(uint256 matchId, address payable to, uint256 amount) external {
        require(matchId < matches.length, "invalid match");
        Match storage m = matches[matchId];
        require(m.status == Status.ResultRecorded, "result not recorded");
        m.status = Status.Claimed;
        if (amount > 0 && m.stake >= amount) {
            to.transfer(amount);
            emit RewardClaimed(matchId, to, amount);
        }
    }

    receive() external payable {}
}
