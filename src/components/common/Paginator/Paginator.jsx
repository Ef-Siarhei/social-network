import style from './Paginator.module.css';
import React, {useState} from 'react';

const PREV = '<<'
const NEXT = '>>'

const Paginator = ({totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10}) => {
  let pagesCount = Math.ceil(totalItemsCount / pageSize);
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  let portionsCount = Math.ceil(pagesCount / portionSize);
  let [portionCurrentNumber, setPortionNumber] = useState(1);
  let leftPortionPageNumber = (portionCurrentNumber - 1) * portionSize + 1;
  let rightPortionPageNumber = portionCurrentNumber * portionSize;

  return (
    <div className={style.btnNumberPages}>
      {portionCurrentNumber > 1 &&
        <div>
          <button onClick={() => {setPortionNumber(1)}} >{PREV}</button>
          <button onClick={() => {setPortionNumber(portionCurrentNumber - 1)}}>Prev</button>
        </div>
      }

      {pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber).map((p) => {
        return (
          <span
            className={currentPage === p ? style.selectedPage : ''}
            key={p}
            onClick={() => {
              onPageChanged(p);
            }}
          >
            {p}
          </span>
        );
      })}

      {portionsCount > portionCurrentNumber &&
        <div>
          <button onClick={() => setPortionNumber(portionCurrentNumber + 1)}>Next</button>
          <button onClick={() => setPortionNumber(portionsCount)}>{NEXT}</button>
        </div>
      }
    </div>
  );
};

export default Paginator;
