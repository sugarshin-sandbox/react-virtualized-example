import React, { Component } from 'react';
import { CellMeasurerCache } from 'react-virtualized';
import { hot } from 'react-hot-loader';
import isFibonacci from 'is-fibonacci';
import List from './List'
import s from './App.css';

const createItem = n => ({
  name: `a-${n}-${Date.now()}`,
  descri: 'Lorem ipsum'.repeat(Math.floor(Math.random() * 100)),
  img: isFibonacci(n + 1)
    ? `https://dummyimage.com/600x${Math.floor(Math.random() * 1000)}/000/fff`
    : null,
});

@hot(module)
export default class App extends Component {
  loadMoreRows = async () => await new Promise(r => {
    console.log('loadMoreRows');
    setTimeout(() => {
      this.setState({
        items: this.state.items.concat(
          Array.from({ length: 20 }).map((_, i) => createItem(i))
        ),
      }, r)
    }, 1000)
  })
  state = {
    // items: [],
    items: Array.from({ length: 20 }).map((_, i) => createItem(i)),
    cache: new CellMeasurerCache({
      defaultHeight: 50,
      minHeight: 50,
      fixedWidth: true,
    }),
  }
  componentDidMount() {
    this._t = setTimeout(this.loadMoreRows, 2000);
  }
  componentWillUnmount() {
    clearTimeout(this._t);
  }
  render() {
    const { items, cache } = this.state;
    return (
      <div className='app'>
        <List
          items={items}
          cellMeasurerCache={cache}
        />
      </div>
    )
  }
}
