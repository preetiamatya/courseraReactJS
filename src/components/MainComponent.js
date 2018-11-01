import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import DishDetail from './DishDetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders, postFeedback} from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}
{/*dispatch(fetchDishes() is Thunk*/ }

const mapDispatchToProps = (dispatch) => ({

  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes: () => { dispatch(fetchDishes()) },
  resetFeedbackForm: () => { dispatch(actions.reset('feedback')) },
  fetchComments: () => { dispatch(fetchComments()) },
  fetchPromos: () => { dispatch(fetchPromos()) },
  fetchLeaders: () => { dispatch(fetchLeaders()) },
  postFeedback: (firstname, lastname, telnum, email, agree, contactType, message, date ) => dispatch(postFeedback(firstname, lastname, telnum, email, agree, contactType, message, date )),


});
{/* componentDidMount will be executed after compoment gets mounted into view*/ }
class Main extends Component {
  constructor(props) {
    super(props);
    console.log("main props = " + JSON.stringify(this.props.comment));
  }
  componentDidMount() {
    {/*lifecycle Method executes after component gets mounted*/ }
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }
  render() {


    const HomePage = () => {
      return (

        <Home
          dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishErrMess={this.props.dishes.errMess}
          promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
          promoLoading={this.props.promotions.isLoading}
          promoErrMess={this.props.promotions.errMess}
          leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
          leaderLoading={this.props.leaders.isLoading}
          leaderErrMess={this.props.leaders.errMess}
        />


      );
    }
    // const AboutPage = () => {
    //   return (

    //     <About
    //         leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
    //         leaderLoading={this.props.leaders.leaders.isLoading}
    //         leaderErrMess={this.props.leaders.leaders.errMess}
    //     />


    //   );
    // }
  


    const DishWithId = ({ match }) => {
      console.log("match" + JSON.stringify(this.props.comments.comments));
      return (
        <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
          comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}

          commentsErrMess={this.props.comments.errMess}
          postComment={this.props.postComment}
         />
      );
    }
    return (
      <div>
        <Header />
        <TransitionGroup>
        <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
        <Switch>
          <Route path="/home" component={HomePage} />
          {/*pass the props with route as function component */}
          <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
          <Route path='/menu/:dishId' component={DishWithId} />
          {/*updating contact route */}
          <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm}    postFeedback = {this.props.postFeedback}/>} />
          <Route exact path='/aboutus' component={() => <About leaders={this.props.leaders.leaders} leaderLoading={this.props.leaders.leaders.isLoading}
            leaderErrMess={this.props.leaders.leaders.errMess}/>} />
          {/*default path*/}
          <Redirect to="/home" />
        </Switch>
        </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
