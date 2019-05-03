import React, { Component } from 'react';
import About from './aboutComponent';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import { actions } from 'react-redux-form';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';

import { postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders,postFeedback } from '../redux/ActionCreator';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
const mapDispatchToProps = dispatch => ({
  fetchDishes: () => { dispatch(fetchDishes())},
  fetchLeaders: () => { dispatch(fetchLeaders())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  postFeedback: (firstname,lastname,telnum,email,agree,contactType,message) => dispatch(postFeedback(firstname,lastname,telnum,email,agree,contactType,message))
});

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
    
    
  }
}
class Main extends Component {

  
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
    
    
  }
  onDishSelect(dishId) {
    this.setState({ selectedDish: dishId});
  }

  render() {
    const HomePage = () => {
      return(
        <Home 
        dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
        dishesLoading={this.props.dishes.isLoading}
        dishErrMess={this.props.dishes.errMess}
        promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
        promoLoading={this.props.promotions.isLoading}
        promoErrMess={this.props.promotions.errMess}
        leaders={this.props.leaders.leaders.filter((lead) => lead.featured)[0]}
        leadersLoading={this.props.leaders.isLoading}
        leadererrMess={this.props.leaders.errMess}
    />
      );
    }

    const DishWithId = ({match}) => {
      return(
        <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
        isLoading={this.props.dishes.isLoading}
        errMess={this.props.dishes.errMess}
        comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
        commentsErrMess={this.props.comments.errMess}
        addComment={this.props.addComment}
        postComment={this.props.postComment}
      />
      );
    };

    return (
      <div>
        <Header />
        <div>
        <TransitionGroup>
            <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
              <Switch location={this.props.location}>
                  <Route path='/home' component={HomePage} />
                  <Route exact path='/aboutus' component={() => <About 
                  leaders={this.props.leaders.leaders}
                  leadersLoading={this.props.leaders.isLoading}
                  leadererrMess={this.props.leaders.errMess} />} />} />
                  <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
                  <Route path='/menu/:dishId' component={DishWithId} />
                  <Route exact path='/contactus' component={() => <Contact  postFeedback={this.props.postFeedback}/>} />
                  <Redirect to="/home" />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
          
        </div>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));