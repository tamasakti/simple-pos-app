import { Col, Container, Row } from "react-bootstrap";
import "./index.css";
import { Hasil, ListCategory, Menus, NavbarComponent } from "./components";
import axios from "axios";
import { Component } from "react";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
    };
  }

  componentDidMount() {
    axios
      .get("/products")
      .then((res) => {
        const response = res.data;
        this.setState({
          menus: response,
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    const { menus } = this.state;
    return (
      <>
        <div className="App">
          <NavbarComponent />
          <div className="mt-2">
            <Container fluid>
              <Row>
                <ListCategory />
                <Col>
                  <h4>
                    <strong>Daftar Produk</strong>

                    <Row>
                      {menus &&
                        menus.map((menu) => <Menus id={menu.id} menu={menu} />)}
                    </Row>
                  </h4>
                </Col>
                <Hasil />
              </Row>
              <hr />
            </Container>
          </div>
        </div>
      </>
    );
  }
}

// function App() {
//   return (
//
//   );
// }

export default App;
