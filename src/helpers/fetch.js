import axios from 'axios'
import qs from 'query-string'
import { HTTP_REQUEST_HEADER, NODE_ENDPOINTS, DEFUALT_NODE_NAME } from '../constants.js';
import {
  formatBlock,
  formatBlocks,
  formatTransaction,
  formatAccount,
  formatPriceInfo
} from './format'


/////////////////////////////////////////
// BLOCK
/////////////////////////////////////////

export const getBlock = (blockHeight) => {
  const blockEndpoint = `${getNodeEndpoint()}/block/height/${blockHeight}`
  
  return axios.get(blockEndpoint, HTTP_REQUEST_HEADER)
    .then(response => {
      const block = response.data.block;
      return formatBlock(block);
    })
    .catch(error => {
      console.log(error)
      return;
    })
}

export const getBlocks = ({before, after, filter, limit}) => {
  const query = `?after=${after?after:'1'}&filter=${filter?'noempty':''}&limit=${limit?limit:''}`
  const blocksEndpoint = `${getNodeEndpoint()}/block/before/${before}${query}`

  return axios.get(blocksEndpoint, HTTP_REQUEST_HEADER)
    .then(response => {
      const { last_height, block_metas } = response.data
    
      return {
        blocks: formatBlocks(block_metas),
        lastFetchedHeight: last_height,
        latestFetchedHeight: block_metas[0] && block_metas[0].header.height
      };
    })
    .catch(error => console.log(error))
}

export const pollForBlocks = ({after, filter, success}) => {
  const fetchNewBlocks = () => {
    getNodeStatus()
      .then(status => {
        if (!status) {
          return;
        }

        const currentBlockHeight = status.latest_block_height;
        const limit = currentBlockHeight - after

        if(limit > 0) {
          getBlocks({
            before: currentBlockHeight, 
            after, 
            filter, 
            // limit
          })
            .then(({blocks}) => {
              getCurrentOrder()
                .then((order={}) => {
                  if(success) {
                    success(blocks, currentBlockHeight, order);
                  } 
                })
            })
        }
      })
  }

  return fetchNewBlocks
}

export const getBlockRangeStart = (blockRangeEnd, interval=100) => {
  let blockRangeStart = parseInt(blockRangeEnd) - interval;
  return blockRangeStart > 0 ? blockRangeStart : 1;
}


/////////////////////////////////////////
// TRANSACTION
/////////////////////////////////////////

export const getTransaction = (hash) => {
  const transactionHash = window.decodeURIComponent(hash);
  const transactionEndpoint = `${getNodeEndpoint()}/transaction/${window.encodeURIComponent(transactionHash)}`;

  return axios.get(transactionEndpoint, HTTP_REQUEST_HEADER)
    .then(response => {
      return response.data && formatTransaction(response.data.Tx, { hash: transactionHash });
    })
}

export const getTransactions = (transactionHashes=[]) => { 
  const transactionRequests = transactionHashes.map(hash => {
    return getTransaction(hash);
  })
    
  return axios.all(transactionRequests);
}

export const getTransactionHashes = (blockHeight) => {
  const transactionsEndpoint = `${getNodeEndpoint()}/block/transactions/${blockHeight}`
  
  return axios.get(transactionsEndpoint, HTTP_REQUEST_HEADER)
    .then(response => {
      const hashes = response.data;
      return hashes;
    })
    .catch(error => {
      // TODO: FAIL SAFE
      return;
    })
}

export const getBlockTransactions = (blockHeight) => { 
  return getTransactionHashes(blockHeight)
    .then(hashes => {
      return getTransactions(hashes)
    })
}


/////////////////////////////////////////
// ACCOUNT
/////////////////////////////////////////

export const getAccount = (address) => {
  const accountStateEndpoint = `${getNodeEndpoint()}/account/account/${address}`

  return axios.get(accountStateEndpoint, HTTP_REQUEST_HEADER)
    .then(response => {
      const account =  {
        address,
        ...response.data[address]
      }

      return formatAccount(account)
    })
}

export const getAccountHistory = (address) => {
  const accountHistoryEndpoint = `${getNodeEndpoint()}/account/history/${address}`

  return axios.get(accountHistoryEndpoint, HTTP_REQUEST_HEADER)
    .then(response => {
      const history = response.data.Items;
      return history
    })
}

/////////////////////////////////////////
// NODE
/////////////////////////////////////////

export const getNodeStatus = (endpoint) => {
  const baseEndpoint = endpoint || getNodeEndpoint();
  const statusEndpoint = `${baseEndpoint}/node/status`;
  
  return axios.get(statusEndpoint, HTTP_REQUEST_HEADER)
    .then(response => {
      const status = response.data.sync_info;
      return status;
    })
    .catch(error => console.log(error))
}

export const getNodeEndpoint = () => {
  const query = qs.parse(window.location.search);
  const nodeEndpoint = NODE_ENDPOINTS[query.node];
  if (nodeEndpoint) {
    return nodeEndpoint
  }
  else {
    query.node = DEFUALT_NODE_NAME;
    const search = `?${qs.stringify(query)}`
    const { history, location } = window
    if (history.pushState) {
      const newurl = `${location.origin}${location.pathname}${search}`
      history.replaceState({path:newurl},'',newurl);
      location.reload();
    }
  }
}


/////////////////////////////////////////
// ORDER
/////////////////////////////////////////

export const getCurrentOrder = () => {
  const statusEndpoint = `${getNodeEndpoint()}/price/current`;
  return axios.get(statusEndpoint, HTTP_REQUEST_HEADER)
    .then(response => {
      return formatPriceInfo(response.data);
    })
    .catch(error => console.log(error))
}