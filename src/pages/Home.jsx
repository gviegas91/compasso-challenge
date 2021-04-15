import React from 'react';
import SearchField from '../components/SeachField';
import UserCard from '../components/UserCard';
import { UserProvider, APIErrorProvider } from '../context/index';
import '../assets/css/Home.scss';

const HomePage = () => (
  <>
    <div className="container">
      <div className="row">
        <div className="col s12 center-align">
          <header className="header">
            <h1 className="header-title">Challenge Compasso</h1>
          </header>
        </div>
      </div>

      <div className="row">
        <div className="col s12">
          <main className="main">
            <UserProvider>
              <APIErrorProvider>
                <SearchField />
                <section className="main-content">
                  <UserCard />
                </section>
              </APIErrorProvider>
            </UserProvider>
          </main>
        </div>
      </div>
    </div>
  </>
);

export default HomePage;
