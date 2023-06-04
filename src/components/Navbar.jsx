import React from "react";
import Nav from "react-bootstrap/Nav";

export default function Navbar({ currentPage, handlePageChange ,city}) {
  return (
    <Nav className="justify-content-center"  href="#home">
      <Nav.Item>
        <Nav.Link
          href="#home"
          onClick={() => handlePageChange("home")}
          className={currentPage === "home" ? "nav-link active" : "nav-link"}
        >
         {city} now
        </Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link href="#5day"onClick={() => handlePageChange("5day")}className={currentPage === "5day" ? "nav-link active" : "nav-link"}>Next 5 Days in {city}</Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link href="#news"onClick={() => handlePageChange("video")}className={currentPage === "videos" ? "nav-link active" : "nav-link"}>Events in {city}</Nav.Link>
      </Nav.Item>
      <Nav.Item></Nav.Item>
    </Nav>
  );
}
