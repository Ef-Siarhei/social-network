import preloader from '../../../assets/images/tube-spinner.svg';
import React from 'react';

const Preloader = (props) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <img src={preloader} alt={'loading...'} style={{ width: 100 }} />
    </div>
  );
};

export default Preloader;
