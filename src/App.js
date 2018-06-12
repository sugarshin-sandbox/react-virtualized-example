import React, { Component } from 'react';
import { CellMeasurerCache } from 'react-virtualized';
import { hot } from 'react-hot-loader';
import isFibonacci from 'is-fibonacci';
import List from './List'
import s from './App.css';

const _createItem = n => ({
  name: `a-${n}-${Date.now()}`,
  descri: 'Lorem ipsum'.repeat(Math.floor(Math.random() * 100)),
  img: isFibonacci(n + 1)
    ? `https://dummyimage.com/600x${Math.floor(Math.random() * 1000)}/000/fff`
    : null,
});

@hot(module)
export default class App extends Component {
  get _perPage() {
    return 20;
  }
  get _totalCount() {
    return 100;
  }
  loadMoreRows = async ({ startIndex, stopIndex }) => {
    const newItems = await this.prefetchItems();
    this.setState({ items: this.state.items.concat(newItems) })
  }
  prefetchItems = async () => await new Promise(resolve => {
    setTimeout(() => {
      const items = this.state.items.length >= this._totalCount
        ? []
        : Array.from({ length: this._perPage }).map((_, i) => _createItem(i));
      resolve(items)
    }, 1000)
  })
  state = {
    // items: [],
    items: Array.from({ length: this._perPage }).map((_, i) => _createItem(i)),
    cache: new CellMeasurerCache({
      defaultHeight: 100,
      minHeight: 30,
      fixedWidth: true,
    }),
    totalCount: this._totalCount,
  }
  render() {
    const { items, cache, totalCount } = this.state;
    return (
      <div className='app'>
        <List
          items={items}
          cellMeasurerCache={cache}
          loadMoreRows={this.loadMoreRows}
          totalCount={totalCount}
        />
      </div>
    )
  }
}
