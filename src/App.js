import { Col, Container, Row } from "react-bootstrap";
import "./index.css";
import { Hasil, ListCategory, Menus, NavbarComponent } from "./components";
import axios from "axios";
import { Component } from "react";
import Swal from "sweetalert2";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      categoryYangDipilih: "Makanan",
      keranjang: [],
    };
  }

  componentDidMount() {
    axios
      .get(`/products?category.nama=${this.state.categoryYangDipilih}`)
      .then((res) => {
        const response = res.data;
        this.setState({
          menus: response,
        });
      })
      .catch((err) => console.log(err));

    axios
      .get("/keranjangs")
      .then((res) => {
        const keranjang = res.data;
        this.setState({
          keranjang,
        });
      })
      .catch((err) => console.log(err));
  }

  changeCategory = (value) => {
    this.setState({
      categoryYangDipilih: value,
      menus: [],
    });

    axios
      .get(`products?category.nama=${value}`)
      .then((res) => {
        const data = res.data;
        this.setState({
          menus: data,
        });
      })
      .catch((err) => console.log(err));
  };

  masukKeranjang = (value) => {
    axios.get("/keranjangs?product.id=" + value.id).then((res) => {
      if (res.data.length === 0) {
        const keranjang = {
          jumlah: 1,
          total_harga: value.harga,
          product: value,
        };

        axios
          .post("/keranjangs", keranjang)
          .then((res) => {
            Swal.fire({
              title: "Sukses Masuk Keranjang",
              text: `${keranjang.product.nama} Sukses Masuk Keranjang`,
              icon: "success",
              button: false,
            });
          })
          .catch((err) => console.log(err));
      } else {
        const keranjang = {
          jumlah: res.data[0].jumlah + 1,
          total_harga: res.data[0].total_harga + value,
          product: value,
        };

        axios
          .put(`/keranjangs/${res.data[0].id}`, keranjang)
          .then((res) => {
            Swal.fire({
              title: "Sukses Masuk Keranjang",
              text: `${keranjang.product.nama} Sukses Masuk Keranjang`,
              icon: "success",
              button: false,
            });
          })
          .catch((err) => console.log(err));
      }
    });
  };
  render() {
    const { menus, categoryYangDipilih, keranjang } = this.state;
    return (
      <>
        <div className="App">
          <NavbarComponent />
          <div className="mt-2">
            <Container fluid>
              <Row>
                <ListCategory
                  changeCategory={this.changeCategory}
                  categoryYangDipilih={categoryYangDipilih}
                />
                <Col>
                  <h4>
                    <strong>Daftar Produk</strong>

                    <Row>
                      {menus &&
                        menus.map((menu) => (
                          <Menus
                            id={menu.id}
                            menu={menu}
                            masukKeranjang={this.masukKeranjang}
                          />
                        ))}
                    </Row>
                  </h4>
                </Col>
                <Hasil keranjang={keranjang} />
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
