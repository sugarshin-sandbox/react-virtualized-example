import React, { PureComponent, Component } from 'react';
import { InfiniteLoader, AutoSizer, List as VirtualizedList, CellMeasurer } from 'react-virtualized';
import isFibonacci from 'is-fibonacci';
import { compose } from 'recompose';
import s from './List.css';

class Item extends Component {
  componentDidMount() {
    if (this.props.didMount) {
      console.log('Item componentDidMount');
      this.props.didMount();
    }
  }
  componentDidUpdate() {
    if (this.props.didUpdate) {
      console.log('Item componentDidUpdate');
      this.props.didUpdate();
    }
  }
  shouldComponentUpdate(nextProps) {
    const { name, descri, img } = this.props;
    return nextProps.name !== name ||
      nextProps.descri !== descri ||
      nextProps.img !== img;
  }
  render() {
    const { name, descri, img, onLoadImage, onErrorImage } = this.props;
    return (
      <div>
        <div>{name}</div>
        <p>{descri}</p>
        {img ? <img src={img} onLoad={onLoadImage} onError={onErrorImage} /> : null}
      </div>
    )
  }
}

export default class List extends Component {
  componentDidMount() {
    console.log('List componentDidMount this.props', this.props);
    // setTimeout(() => this.scrollToRow(this.props.items.length), 1000)
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
                <Item
                  name={items[index].name}
                  descri={items[index].descri}
                  img={items[index].img}
                  didMount={measure}
                  didUpdate={measure}
                  onLoadImage={measure}
                  onErrorImage={measure}
                />
              ) : (
                <div>placeholder</div>
              )}
            </div>
          )
        }}
      </CellMeasurer>
    )
  }
  isRowLoaded = ({ index }) => !!this.props.items[index]
  render() {
    const { items, cellMeasurerCache, totalCount, loadMoreRows } = this.props;
    console.log('List render items.length', items.length);
    return (
      <InfiniteLoader
        isRowLoaded={this.isRowLoaded}
        loadMoreRows={loadMoreRows}
        rowCount={totalCount}
      >
        {({ onRowsRendered, registerChild }) => {
          return (
            <AutoSizer>
              {({ height, width }) => {
                return (
                  <VirtualizedList
                    ref={compose(registerChild, this.registerList)}
                    width={width}
                    height={height}
                    // rowCount={items.length}
                    rowCount={totalCount}
                    rowHeight={cellMeasurerCache.rowHeight}
                    onRowsRendered={onRowsRendered}
                    rowRenderer={this.rowRenderer}
                    deferredMeasurementCache={cellMeasurerCache}
                    noRowsRenderer={() => <div>No rows yet.</div>}
                    overscanRowCount={3}
                    // autoHeight
                    // scrollToIndex={this.props.items.length}
                  />
                )
              }}
            </AutoSizer>
          )
        }}
      </InfiniteLoader>
    )
  }
}
