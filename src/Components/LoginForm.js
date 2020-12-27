import React from 'react';
import Login from './Login';
import Navigation from './Navigation';
import Footer from './Footer';



class LoginForm extends React.Component {
  render() {
    return (
      <div>
        <Navigation currentPage={""} />
        <div className="container p-4 pb-0">
          <div className="row login-body">
            <div className="col-12 col-lg-3"></div>
            <div className="col-12 col-lg-6 align-self-center">
              <div className="container" id="wrap">
                <div className={"row bgClass"}>
                  <div className={"col-lg-12"}>
                    <Login history={this.props.history} />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-3"></div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
export default LoginForm;
