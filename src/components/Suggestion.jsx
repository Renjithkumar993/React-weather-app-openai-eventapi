import React from 'react';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';

export default function Suggestion({ suggestionData , isOn , city}) {
  var dataList = suggestionData.split('\n').map((item) => item.trim()).filter((item) => item !== '');
  return (
    <Card className={`col-12 col-md-8 thingstoDo ${isOn ? "dark-mode" : "lightmode"}`} style={{ borderRadius: '30px' }}>
      <Card.Header>Things to do in {city}</Card.Header>
      <Card.Body>
        {dataList.length ? (
          <div>
            {dataList.map((item, index) => (
              <div key={index}>
                {item}
                <br />
              </div>
            ))}
            </div>
        
        ) : (
          <h1>hi</h1>
        )}
      </Card.Body>
    </Card>
  );
}
