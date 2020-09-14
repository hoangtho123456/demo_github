import React, {Component} from 'react';
import { connect } from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/button';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/spinner';
import {Redirect} from 'react-router-dom';
import { updateObject, checkValidity } from '../../shared/utility';

class Auth extends Component {
    state = {
        controls: {
          email: {
              elementType: 'input',
              elementConfig: {
                type: 'email',
                placeholder: 'Your Email'
              },
              value: '',
              validation: {
                required: true,
                isEmail: true
              },
              valid: false,
              touched: false
          },
          password: {
            elementType: 'input',
            elementConfig: {
              type: 'password',
              placeholder: 'password'
            },
            value: '',
            validation: {
              required: true,
              minLength: 6
            },
            valid: false,
            touched: false
          }
      },
      isSignUp: true
    };

    componentDidMount() {
      if(!this.props.buildingBurger && this.props.authRedirectPath) {
        this.props.onSetRedirectPath();
      }
    }

    // checkValidity(value, rules) {
    //   let isValid = true;
    //   if(!rules) {
    //     return true;
    //   }
  
    //   if(rules.required) {
    //     isValid = value.trim() !== '' && isValid;
    //   }
  
    //   if(rules.minLength) {
    //     isValid = value.length >= rules.minLength && isValid;
    //   }
  
    //   if(rules.maxLength) {
    //     isValid = value.length <= rules.maxLength && isValid;
    //   }
  
    //   if(rules.isEmail) {
    //     const pattern = /^[a-z][a-z0-9_]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/;
    //     isValid = pattern.test(value) && isValid;
    //   }
  
    //   return isValid;
    // }

    inputChangedHandler = (event, controlName) => {
      const updatedControls = updateObject(this.state.controls, {
        [controlName]: updateObject(this.state.controls[controlName], {
          // ...this.state.controls[controlName],
          value: event.target.value,
          valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
          touched: true
        })
      });
      // const updatedControls = {
      //     ...this.state.controls,
      //     [controlName]: {
      //         ...this.state.controls[controlName],
      //         value: event.target.value,
      //         valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
      //         touched: true
      //     }
      // };
      this.setState({controls: updatedControls});
    }

    submitHandler = (event) => {
      event.preventDefault();
      this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    };

    switchAuthHandler = () => {
      this.setState(prevState => {
        return {isSignUp: !prevState.isSignUp };
      });
    };

    render() {
        const formElementsArray = [];
        for(let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = formElementsArray.map(formElement => (
            <Input 
                key={formElement.id} elementType={formElement.config.elementType} 
                elementConfig={formElement.config.elementConfig} 
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                touched={formElement.config.touched}
                shouldValidate={formElement.config.validation}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
        ));

        if(this.props.loading) {
          form = <Spinner />;
        }
        let errorMessage = null;
        if(this.props.error) {
          errorMessage = (
            <p>{this.props.error.message}</p>
          );
        }

        let authRedirect = null;
        if(this.props.isAuthenticated) {
          authRedirect = <Redirect to={this.props.authRedirectPath}/>;
        }

        return (
          <div className={classes.Auth}>
            {authRedirect}
            {errorMessage}
            <form onSubmit={this.submitHandler}>
              {form}
              <Button btnType="Success">SUBMIT</Button>
            </form>
            <Button 
              clicked = {this.switchAuthHandler}
              btnType="Danger" >SWITCH TO {this.state.isSignUp ? 'SIGNIN': 'SIGNUP'}</Button>
          </div>
        );
    }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, pass, isSignUp) => dispatch(actions.auth(email, pass, isSignUp)),
    onSetRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
