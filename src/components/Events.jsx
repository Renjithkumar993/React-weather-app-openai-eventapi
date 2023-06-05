import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Fade, Slide ,Zoom} from "react-awesome-reveal";
export default function Events({ events ,isOn}) {

  return (
    
    <div className='d-flex flex-wrap justify-content-center'>
      {events ? events.map((event, index) => (
<Zoom>
        <Card key={index} style={{ width: '18rem' }} className={`col-3  ${isOn ? "dark-mode" : "lightmode"}`}>
          <Card.Img variant="top" src={event.images[0].url} alt={event.name} />
          <Card.Body>
            <Card.Title>{event.name}</Card.Title>
            <Button variant="primary" href={event.url}>find more</Button>
          </Card.Body>
        </Card>
        </Zoom>

      )) : (
        <h1>no events found </h1>
      )}
    </div>
  );
}
