import React from 'react';
import { InfiniteLoader, AutoSizer, List, CellMeasurer, CellMeasurerCache } from 'react-virtualized';
import { hot } from 'react-hot-loader';
import { compose, withHandlers, lifecycle } from 'recompose';
import isFibonacci from 'is-fibonacci';
import s from './App.css';

const createItem = n => ({
  name: `a-${n}-${Date.now()}`,
  descri: 'Lorem ipsum'.repeat(Math.floor(Math.random() * 100)),
  img: isFibonacci(n + 1)
    ? `https://dummyimage.com/600x${Math.floor(Math.random() * 1000)}/000/fff`
    : null,
});

let items = Array.from({ length: 20 }).map((_, i) => createItem(i))

const cache = new CellMeasurerCache({
  defaultHeight: 50,
  minHeight: 50,
  fixedWidth: true
});

const loadMoreRows = async () => await new Promise(r => {
  console.log('loadMoreRows');
  setTimeout(() => {
    items = items.concat(Array.from({ length: 20 }).map((_, i) => createItem(i)));
    r()
  }, 2000)
});

const rowRenderer = ({ parent, key, index, style }) => {
  return (
    <CellMeasurer
      columnIndex={0}
      cache={cache}
      rowIndex={index}
      key={key}
      parent={parent}
    >
      {({ measure }) => {
        return (
          <div style={style} className={s.item}>
            {items[index] ? (
              <div>
                <div>{items[index].name}</div>
                <p>{items[index].descri}</p>
                {items[index].img ? (
                  <img src={items[index].img} onLoad={measure} />
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
let list;
const App = () => {
  return (
    <div className='app'>
      <div className='inner'>
        <InfiniteLoader
          isRowLoaded={({ index }) => !!items[index]}
          loadMoreRows={loadMoreRows}
          rowCount={200}
        >
          {({ onRowsRendered, registerChild }) => {
            return (
              <AutoSizer>
                {({ height, width }) => {
                  return (
                    <List
                      ref={registerChild}
                      width={width}
                      height={height}
                      // rowCount={items.length}
                      rowCount={200}
                      rowHeight={cache.rowHeight}
                      onRowsRendered={onRowsRendered}
                      rowRenderer={rowRenderer}
                      deferredMeasurementCache={cache}
                    />
                  )
                }}
              </AutoSizer>
            )
          }}
        </InfiniteLoader>
      </div>
    </div>
  )
}

export default compose(
  hot(module),
  // lifecycle({
  //   componentDidMount() {
  //     // console.log('list', list);
  //     // console.log('list.scrollToRow', list.scrollToRow);
  //     // list.scrollToRow(10);
  //     setTimeout(() => {
  //       list.scrollToRow(200);
  //     }, 0);
  //   }
  // })
)(App)
