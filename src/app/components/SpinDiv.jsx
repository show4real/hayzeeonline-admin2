import React from "react";

import { Spinner } from 'reactstrap';
import {Spin} from 'antd'

class SpinDiv extends React.Component {
  render() {
    const {text} = this.props
    return (
      <>
        <div
          style={{
            position: 'absolute', left: 0, right: 0, width: '100%', height: '100%',
            display: 'flex', justifyContent: 'center', paddingLeft: 50, alignItems: 'center', zIndex: 10000,
            backgroundColor: '#fff', opacity: 0.8
          }}
        >
         <Spin size="large" />
          
        </div>
      </>
    );
  }
}

export default SpinDiv;
