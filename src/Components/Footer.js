import React from 'react';

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer" id="footer">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-4">
            </div>
            <div className="col-sm-4">
              <center><p className="text-muted credit">Copyrights Reserved</p></center>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer;
