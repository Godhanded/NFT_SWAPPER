//SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

error nftSwapper__notOwner();
error nftSwapper__invalidAmount();
error nftSwapper__transferFailed();
error nftSwapper__fullfilledOrNotOwner();
error nftSwapper__alreadyFullfilledOrInvalidAmount();

import {IERC721} from "./MockERC721.sol";

contract nftSwapper {
    enum SwapState {
        PENDING,
        FULFILLED,
        CLOSED
    }

    struct deal {
        address owner;
        address sourceNftAddress;
        address expectedNftaddress;
        uint256[] sourceTokenIds;
        uint256[] receivedTokenIds;
        uint256 amountNftExpected;
        uint256 swapId;
        string message;
        SwapState STATE;
    }

    mapping(uint256 => deal) s_deals;

    uint256 private s_count;

    uint256[] private s_emptyArray;
    address private s_owner;

    deal[] public s_dealArrays;

    constructor() {
        s_owner = msg.sender;
    }

    function createDeal(
        address _sourceAddr,
        uint256[] calldata _ids,
        address _expectedNftaddress,
        uint256 _amountNftExpected,
        string calldata _message
    ) external payable {
        if (msg.value != 0.001 ether) revert nftSwapper__invalidAmount();
        uint256 idLength = _ids.length;
        for (uint256 i = 0; i < idLength; ) {
            IERC721(_sourceAddr).transferFrom(msg.sender, address(this), _ids[i]);

            unchecked {
                i++;
            }
        }
        deal memory newDeal = deal({
            owner: msg.sender,
            sourceNftAddress: _sourceAddr,
            expectedNftaddress: _expectedNftaddress,
            sourceTokenIds: _ids,
            receivedTokenIds: s_emptyArray,
            amountNftExpected: _amountNftExpected,
            swapId: s_count,
            message: _message,
            STATE: SwapState.PENDING
        });
        s_deals[s_count] = newDeal;
        s_dealArrays.push(newDeal);
        s_count += 1;
    }

    function closeDeal(uint256 _swapId) external {
        deal memory oldDeal = s_deals[_swapId];
        if (msg.sender != oldDeal.owner && oldDeal.STATE != SwapState.PENDING)
            revert nftSwapper__fullfilledOrNotOwner();
        s_deals[_swapId].STATE = SwapState.CLOSED;
        uint256 idLength = oldDeal.sourceTokenIds.length;
        address sourceAddr = oldDeal.sourceNftAddress;
        for (uint256 i = 0; 1 < idLength; ) {
            IERC721(sourceAddr).transferFrom(
                address(this),
                msg.sender,
                oldDeal.sourceTokenIds[i]
            );
            unchecked {
                i++;
            }
        }
        (bool success, ) = payable(msg.sender).call{value: 0.001 ether}("");
        if (!success) revert nftSwapper__transferFailed();
    }

    function fullfillDeal(
        uint256 _swapId,
        address _expectedAddr,
        uint256[] calldata _ids
    ) external {
        deal memory publishedDeal = s_deals[_swapId];
        if (
            publishedDeal.STATE != SwapState.PENDING &&
            publishedDeal.amountNftExpected != _ids.length &&
            publishedDeal.expectedNftaddress != _expectedAddr
        ) revert nftSwapper__alreadyFullfilledOrInvalidAmount();
        s_deals[_swapId].STATE = SwapState.FULFILLED;
        uint256[] memory publishedIds = publishedDeal.sourceTokenIds;
        uint256 idLength = publishedIds.length;
        uint256 fullfillIdlength = _ids.length;
        address publishedAddr = publishedDeal.sourceNftAddress;
        address fullfillAddr = publishedDeal.owner;
        for (uint256 i = 0; i < fullfillIdlength; ) {
            IERC721(_expectedAddr).transferFrom(msg.sender, fullfillAddr, _ids[i]);
            unchecked {
                i++;
            }
        }
        for (uint256 i = 0; i < idLength; ) {
            IERC721(publishedAddr).transferFrom(
                address(this),
                msg.sender,
                publishedIds[i]
            );
            unchecked {
                i++;
            }
        }

        s_deals[_swapId].receivedTokenIds = _ids;
        (publishedDeal.STATE, publishedDeal.receivedTokenIds) = (
            SwapState.FULFILLED,
            _ids
        );
        s_dealArrays[_swapId] = publishedDeal;
    }

    function withdraw() external {
        if (msg.sender != s_owner) revert nftSwapper__notOwner();
        (bool sent, ) = payable(msg.sender).call{value: address(this).balance}("");
        if (!sent) revert nftSwapper__transferFailed();
    }

    function getDeals() external view returns (deal[] memory) {
        return s_dealArrays;
    }

    function getDeal(uint256 _swapId) external view returns (deal memory) {
        return s_deals[_swapId];
    }
    
}
