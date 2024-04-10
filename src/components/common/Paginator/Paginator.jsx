import s from './Paginator.module.css';
import React from 'react';

const Paginator = (props) => {
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  return (
    <div className={s.btnNumberPages}>
      {pages.map((p) => {
        return (
          <span
            className={props.currentPage === p ? s.selectedPage : ''}
            key={p}
            onClick={() => {
              props.onPageChanged(p);
            }}
          >
            {p}
          </span>
        );
      })}
    </div>
  );
};

export default Paginator;
