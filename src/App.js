import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount(){

  }

  render() {
    const { name } = this.props;
    return (
      <div>
        <h1>
          { name }
        </h1>
      </div>
    )
  }
}

export default App;