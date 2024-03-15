import React from 'react';
import axios from 'axios';
import s from './users.module.css';
import userPhoto from './../../assets/images/woman.jpg';

class Users extends React.Component {
  componentDidMount() {
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`,
      )
      .then((response) => {
        this.props.setUsers(response.data.items);
        this.props.setTotalUsersCount(response.data.totalCount / 260);
      });
  }

  onPageChanged = (pageNumber) => {
    this.props.setCurrentPage(pageNumber);
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${pageNumber}`,
      )
      .then((response) => {
        this.props.setUsers(response.data.items);
      });
  };

  render() {
    let pagesCount = Math.ceil(
      this.props.totalUsersCount / this.props.pageSize,
    );
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
    }

    return (
      <div className={s.users}>
        {this.props.users.map((user) => {
          return (
            <div className={s.user} key={user.id}>
              <div className={s.user_icon_btn_block}>
                <img
                  src={user.photos.small ? user.photos.small : userPhoto}
                  alt=""
                  className={s.photo}
                />
                <div>
                  {user.followed ? (
                    <button
                      className={s.on_off_Follow}
                      onClick={() => {
                        this.props.unFollow(user.id);
                      }}
                    >
                      Unfollow
                    </button>
                  ) : (
                    <button
                      className={s.on_off_Follow}
                      onClick={() => {
                        this.props.follow(user.id);
                      }}
                    >
                      Follow
                    </button>
                  )}
                </div>
              </div>
              <div className={s.user_description}>
                <div>{user.name}</div>
                <div className={s.status}>{user.status}</div>
                <div className={s.country}>{'user.location.country'}</div>
                <div className={s.city}>{'user.location.city'}</div>
              </div>
            </div>
          );
        })}

        <div className={s.btnNumberPages}>
          {pages.map((p) => {
            return (
              <span
                className={this.props.currentPage === p ? s.selectedPage : ''}
                key={p}
                onClick={() => {
                  this.onPageChanged(p);
                }}
              >
                {p}
              </span>
            );
          })}
        </div>

        <button onClick={this.getUsers} className={s.show_more}>
          Show more
        </button>
      </div>
    );
  }
}

export default Users;
