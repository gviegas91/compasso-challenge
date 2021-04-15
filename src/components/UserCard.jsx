import React, { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext, APIErrorContext } from '../context/index';
import RepoList from './RepoList';
import apiUrl from '../api/index';
import '../assets/css/UserCard.scss';

const UserCard = () => {
  const { user } = useContext(UserContext);
  const { error } = useContext(APIErrorContext);
  const [list, setList] = useState([]);
  const [listTitle, setListTitle] = useState();
  const [loading, setLoading] = useState(false);

  const getList = (userLogin, listRefText) => {
    setListTitle(listRefText);
    setLoading(true);
    axios
      .get(`${apiUrl}${userLogin}/${listRefText}`)
      .then(response => {
        setLoading(false);
        setList(response.data);
      })
      .catch(err => {
        console.log('Error:', err);
      });
  };

  return (
    <>
      {error && (
        <div className="error center-align">
          <div className="error-status">
            <h4>{error.status}</h4>
          </div>

          <p className="error-message">{error.message}</p>
        </div>
      )}

      {!error && !user && (
        <div className="not-found center-align">Hey.. Search something! :)</div>
      )}

      {!error && user && (
        <article className="card z-depth-3 center-align">
          <div className="card-avatar">
            <img
              alt={user.login}
              className="circle responsive-img"
              height="150"
              src={user.avatar_url}
              width="150"
            />
          </div>
          <div className="card-content">
            <h2 className="card-title">
              {user.name} @{user.login}
            </h2>
            <div className="card-follow">
              <h4>{user.followers}</h4>
              <small>Followers</small>
            </div>
            <div className="card-follow">
              <h4>{user.following}</h4>
              <small>Following</small>
            </div>
          </div>
          <div className="card-action">
            <button
              className="card-button btn-small activator waves-effect"
              onClick={e => getList(user.login, e.target.textContent)}
              type="button"
            >
              repos
            </button>
            <button
              className="card-button btn-small activator waves-effect"
              data-url={user.starred_url}
              onClick={e => getList(user.login, e.target.textContent)}
              type="button"
            >
              starred
            </button>
          </div>

          <div className="card-reveal">
            <span className="card-title grey-text text-darken-4">
              <i className="material-icons right">close</i>
            </span>

            {loading && (
              <div className="loading">
                <div className="preloader-wrapper small active">
                  <div className="spinner-layer spinner-green-only">
                    <div className="circle-clipper left">
                      <div className="circle" />
                    </div>
                    <div className="gap-patch">
                      <div className="circle" />
                    </div>
                    <div className="circle-clipper right">
                      <div className="circle" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!error && !loading && (
              <RepoList repositories={list} title={listTitle} />
            )}
          </div>
        </article>
      )}
    </>
  );
};

export default UserCard;
