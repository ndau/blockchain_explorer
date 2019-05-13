import React, { Component } from 'react'
import { 
  Box, DataTable, ResponsiveContext, Text, CheckBox
} from 'grommet'
import Anchor from '../../atoms/anchor'
import Main from '../../templates/main'
import ColumnHeader from '../../molecules/columnHeader'
import TableData from '../../molecules/tableData'
import Age from '../../atoms/age'
import { getNodeStatus, getBlocks, pollForBlocks } from '../../../helpers/fetch'
import { POLL_INTERVAL } from '../../../constants'
import './style.css'

class Blocks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      blocks: [],
      hideEmpty: false,
      lastestBlockHeight: null,
      lastFetchedHeight: null,
    }

    setTimeout(this.toggleHideEmpty, 100)
  }

  render() {
    const { blocks, hideEmpty } = this.state;

    return (
      <Main
        browserHistory={this.props.history}
        selectNode
      > 
        <Box margin={{bottom: "20px"}}>
          <Text size="large" weight="bold">
            Blocks{' '}
            {/* hide empty toggle is not fully functional */}
            <Text
              size="xsmall"
              color="#aaa"
              weight="normal"
              style={{float: "right"}}
            >
              <CheckBox
                toggle
                checked={hideEmpty}
                label="hide empty blocks"
                onChange={this.toggleHideEmpty}
                reverse
                name="small"

              />
            </Text>
          </Text>
        </Box>
        <ResponsiveContext.Consumer>
          {
            screenSize => {
              return (
                <DataTable
                  data={blocks}
                  columns={this.screenColumns(screenSize)}
                  onMore={this.loadMoreBlocks}
                  size="medium"
                  className="dataTable"
                />
              )
            }
          }
        </ResponsiveContext.Consumer>
      </Main>
    )
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.key !== prevProps.location.key) {
      this.getData();
    }
  }

  getData = () => {
    const { hideEmpty } = this.state
    getNodeStatus()
      .then(status => {
        if (!status) {
          return null
        }

        const latestBlockHeight = status.latest_block_height;
        getBlocks({before: latestBlockHeight, filter: hideEmpty})
          .then(({blocks, lastFetchedHeight}) => {
            this.setState({
              blocks,
              nodeStatus: status,
              lastFetchedHeight,
              latestBlockHeight,
              hideEmpty
            }, () => {
              this.startPolling({
                after: this.state.latestBlockHeight, 
                filter: hideEmpty,
                success: this.resetData
              })
            })
          })
      })
  }

  componentWillUnmount() {
    this.endPolling()
  }

  startPolling = ({after, filter, limit, success}) => {
    this.endPolling()

    this.pollInterval = window.setInterval(
      pollForBlocks({after, filter, limit, success}), 
      POLL_INTERVAL
    );
  }

  endPolling = () => {
    if (this.pollInterval) {
      window.clearInterval(this.pollInterval)
    }
  }

  toggleHideEmpty = () => {
    this.setState(({hideEmpty}) => {
      return { hideEmpty: !hideEmpty }
    }, () => {
      this.getData()
    })
  }

  loadMoreBlocks = () => {
    const { lastFetchedHeight, hideEmpty } = this.state
    if (!lastFetchedHeight || lastFetchedHeight < 2) {
      return
    }

    this.setState({ loading: true })

    getBlocks({before: lastFetchedHeight - 1, filter: hideEmpty})
      .then(({ blocks : previousBlocks, lastFetchedHeight}) => {
        if (previousBlocks.length < 1) {
          return
        }

        this.setState(({ blocks }) => {
          return {
            blocks: [...blocks, ...previousBlocks],
            lastFetchedHeight,
            loading: false
          }
        })
      })
  }

  resetData = (newBlocks, lastestBlockHeight) => {
    if (newBlocks && newBlocks.length > 0) {
      this.setState(({blocks=[]}) => {
        return {
          blocks: [...newBlocks, ...blocks],
          lastestBlockHeight,
        }
      })
    }
  }
  
  screenColumns = (screenSize) => {
    const { height, age, time, txns } = this.columns
    if (screenSize === "small") {
      return [height, age, txns];
    }

    // if (screenSize === "medium") {
    return [height, time, txns];
    // }

    // return [ height, age, time, txns ];
  }

  columns = {
    "height": {
      property: "height",
      header: <ColumnHeader>height</ColumnHeader>,
      align: "center",
      primary: true,
      render: ({height}) => (
        <TableData>
          <Anchor
            label={height}
            href={`/block/${height}`}
          />
        </TableData>

      ),
    },
    "age": {
      property: "age",
      header: <ColumnHeader>added</ColumnHeader>,
      align: "center",
      render: ({timestamp}) => (
        <TableData>
          <Age timestamp={timestamp} suffix="ago" />
        </TableData>
      )
    },
    "time": {
      property: "time",
      align: "center",
      header:  <ColumnHeader>added</ColumnHeader>,
      render: ({added, timestamp}) => (
        <TableData>
          <Text size="small">
            <Text size="small" style={{fontStyle: "italic"}}>
              <Age timestamp={timestamp} suffix="ago - " />
            </Text>
            {added}
          </Text>
        </TableData>
      )
    },
    "txns": {
      property: "txns",
      align: "center",
      header: <ColumnHeader>txns</ColumnHeader>,
      render: ({numberOfTransactions, height}) =>  {
        return (
          <TableData>
            {
              numberOfTransactions ?
              <Anchor
                label={`${numberOfTransactions} `}
                href={`/block/${height}`}
              />
              :
              '0'
            }
          </TableData>

        )
      }
    }
  };
}

export default Blocks;
