import React, { Component } from "react";
import { Col } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";

export default class Hasil extends Component {
  render() {
    const { keranjang } = this.props;
    return (
      <Col md={3} mt="2">
        <h4>
          <strong>Hasil</strong>
          {keranjang.length !== 0 && (
            <ListGroup variant="flush">
              {keranjang.map((menuKeranjang) => (
                <ListGroup.Item>{menuKeranjang.product.nama}</ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </h4>
      </Col>
    );
  }
}
