import React, { Component } from 'react';
import { InfiniteLoader, AutoSizer, List as VirtualizedList, CellMeasurer, CellMeasurerCache } from 'react-virtualized';
import isFibonacci from 'is-fibonacci';
import s from './List.css';

export default class List extends Component {
  componentDidMount() {
    console.log('this.props', this.props);
    // setTimeout(() => this.scrollToRow(this.props.items.length), 0)
  }
  registerList = c => this.list = c
  scrollToRow = n => {
    if (this.list) {
      this.list.scrollToRow(n);
    }
  }
  rowRenderer = ({ parent, key, index, style }) => {
    const { items, cellMeasurerCache } = this.props;
    return (
      <CellMeasurer
        {...{ parent, key, rowIndex: index }}
        columnIndex={0}
        cache={cellMeasurerCache}
      >
        {({ measure }) => {
          return (
            <div style={style} className={s.item}>
              {items[index] ? (
                <div>
                  <div>{items[index].name}</div>
                  <p>{items[index].descri}</p>
                  {items[index].img ? (
                    <img src={items[index].img} onLoad={measure} onError={measure} />
                  ) : null}
                </div>
              ) : (
                <div>placeholder</div>
              )}
            </div>
          )
        }}
      </CellMeasurer>
    )
  }
  render() {
    const { items, cellMeasurerCache, onRowsRendered } = this.props;
    return (
      <AutoSizer>
        {({ height, width }) => {
          return (
            <VirtualizedList
              ref={this.registerList}
              width={width}
              height={height}
              rowCount={items.length}
              // rowCount={20}
              // rowCount={200}
              rowHeight={cellMeasurerCache.rowHeight}
              onRowsRendered={onRowsRendered}
              rowRenderer={this.rowRenderer}
              deferredMeasurementCache={cellMeasurerCache}
              noRowsRenderer={() => <div>No rows yet.</div>}
              // autoHeight
              // scrollToIndex={this.props.items.length}
            />
          )
        }}
      </AutoSizer>
    )
  }
}
