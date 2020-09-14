import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import CheckoutSummary from '../../components/Checkout/CheckoutSummary/checkoutSummary';
import ContactData from './ContactData/ContactData';
// import * as actions from '../../store/actions/index';

class Checkout extends Component {
  // state = {
  //   ingredients: null,
  //   totalPrice: 0
  // };

  // componentWillMount() {
  //   const query = new URLSearchParams(this.props.location.search);
  //   const ingredients = {};
  //   let price = 0;
  //   for(let param of query.entries()) {
  //     //['salad', '1']
  //     if(param[0] === 'price') {
  //       price = +param[1];
  //     } else {
  //       ingredients[param[0]] = +param[1]; //convert string to number
  //     }
  //   }
  //   this.setState({ingredients : ingredients,
  //       totalPrice: price});
  // }
  // componentDidMount() {
  //   this.props.onInitPurchase();
  // }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    let summary = <Redirect to="/"/>;
    if(this.props.ings) {
      const purchasedRedirect = this.props.purchased ? <Redirect to="/" />:null;
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary 
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler}
            ingredients={this.props.ings} />
          <Route path={this.props.match.path + '/contact-data'}
            component = {ContactData} />
        </div>
      );
    }
    // return(
    //   <div>
    //     {summary};
    //     {/* <CheckoutSummary 
    //       checkoutCancelled={this.checkoutCancelledHandler}
    //       checkoutContinued={this.checkoutContinuedHandler}
    //       ingredients={this.props.ings} /> */}
    //     {/* <Route path={this.props.match.path + '/contact-data'}
    //     component = {ContactData} /> */}
    //     {/* <Route path={this.props.match.path + '/contact-data'}
    //     component={(props) => (<ContactData ingredients={this.props.ings} 
    //             price={this.props.price} {...props}/>)} /> */}
    //   </div>
    // );
    return summary;
  }
}

const mapStateToProps =  state => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
    //price: state.totalPrice
  }
};

// const mapDispatchToProps = dispatch => {
//   return {
//     onInitPurchase: () => dispatch(actions.purchaseInit())
//   }
// };

export default connect(mapStateToProps)(Checkout);
