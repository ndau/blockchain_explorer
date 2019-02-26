import React, { Component } from 'react'
import { Text, Anchor } from 'grommet';
import Details from '../../templates/details'
import DetailsCard from '../../molecules/detailsCard'
import TransactionDetails from '../../organisms/transactionDetails'
import { getTransaction, makeURLQuery } from '../../../helpers'

class Transaction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      transaction: null,
      blockHeight: null,
    }

    this.getData();
  }

  render() {
    const { transaction, blockHeight } = this.state;
    if (!transaction) {
      return (
        <Details>
          <Text>No transaction data was retrieved.</Text>
        </Details>
      );
    }


    return (
      <Details>
        <Text>
          <Text as="span" weight="bold" truncate>
            Transaction {transaction && `#${transaction.hash}`}
          </Text>
          {
            blockHeight &&
            <Text as="span" style={{float: "right"}}>
              Block <Anchor href={`/block/${blockHeight}/${makeURLQuery()}`}>{`#${blockHeight}`}</Anchor>
            </Text>
          }
        </Text>
        
        <TransactionDetails transaction={transaction} />
      </Details>
    )
  }

  getData = () => {
    const { blockHeight, transactionHash } = this.props.match.params;
    getTransaction(transactionHash)
      .then(transaction => {
        this.setState({ transaction, blockHeight })
      })
  }
}

export default Transaction