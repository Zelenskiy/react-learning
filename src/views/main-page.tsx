import { Component } from 'react';
import { Footer } from '../components/footer/footer';
import { Header } from '../components/header/header';
import { Main } from '../components/main/main';
import classes from './main-page.module.css';

export class MainPage extends Component {
  render() {
    return (
      <div className={classes.container}>
        <Header />
        <Main />
        <Footer />
      </div>
    );
  }
}
