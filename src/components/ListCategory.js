import React, { Component } from "react";
import { Col } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faCoffee,
  faCheese,
} from "@fortawesome/free-solid-svg-icons";

const Icon = ({ nama }) => {
  if (nama === "Makanan")
    return (
      <FontAwesomeIcon icon={faUtensils} style={{ marginRight: ".65rem" }} />
    );
  if (nama === "Minuman")
    return (
      <FontAwesomeIcon icon={faCoffee} style={{ marginRight: ".65rem" }} />
    );
  if (nama === "Cemilan")
    return (
      <FontAwesomeIcon icon={faCheese} style={{ marginRight: ".65rem" }} />
    );
  return (
    <FontAwesomeIcon icon={faUtensils} style={{ marginRight: ".65rem" }} />
  );
};

export default class ListCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };
  }
  componentDidMount() {
    axios
      .get("/categories")
      .then((response) =>
        this.setState({
          categories: response.data,
        })
      )
      .catch((error) => console.log(error));
  }

  render() {
    const { categories } = this.state;
    const { changeCategory, categoryYangDipilih } = this.props;
    return (
      <Col md={2} mt="2">
        <h4>
          <strong>Daftar Kategori</strong>

          <ListGroup style={{ marginTop: "1.5rem" }}>
            {categories &&
              categories.map((categorie, index) => (
                <ListGroup.Item
                  key={index}
                  onClick={() => changeCategory(categorie.nama)}
                  className={
                    categoryYangDipilih === categorie.nama
                      ? "category-aktif"
                      : ""
                  }
                  style={{ cursor: "pointer" }}
                >
                  <Icon nama={categorie.nama} />
                  {categorie.nama}
                </ListGroup.Item>
              ))}
          </ListGroup>
        </h4>
      </Col>
    );
  }
}
