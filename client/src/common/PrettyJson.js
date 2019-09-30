import React from 'react';
import { Alert } from 'react-bootstrap';

const PrettyJson = ({ json, title = '' }) => {
  return (
    <Alert variant="warning">
      <h4>{title}</h4>
      <pre>{JSON.stringify(json, null, 2)}</pre>
    </Alert>
  );
};

export default PrettyJson;
