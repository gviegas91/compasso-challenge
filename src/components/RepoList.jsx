import React from 'react';
import '../assets/css/RepoList.scss';

const RepoList = ({ repositories, title }) => (
  <div className="repositories left-align">
    <h4 className="repositories-title">{title} List</h4>
    <ul className="repositories-list collection">
      {repositories.length > 0 &&
        repositories.map(item => (
          <li className="repositories-item collection-item" key={item.id}>
            <div className="repositiories-name">
              <a href={item.html_url}>{item.name}</a>
            </div>
            <div className="repositories-description">
              <p>{item.description}</p>
            </div>
            <div className="repositories-detail">
              <span className="repositories-badge teal valign-wrapper">
                {item.watchers_count}{' '}
                <i className="repositories-icon tiny material-icons">
                  remove_red_eye
                </i>
              </span>
              {item.language && (
                <span className="repositories-badge teal valign-wrapper">
                  {item.language}
                </span>
              )}
              <span className="repositories-badge teal valign-wrapper">
                {item.forks_count}
                <i className="repositories-icon tiny material-icons">
                  device_hub
                </i>
              </span>
            </div>
          </li>
        ))}

      {repositories.length <= 0 && (
        <div className="empty">This section is empty.</div>
      )}
    </ul>
  </div>
);

export default RepoList;
