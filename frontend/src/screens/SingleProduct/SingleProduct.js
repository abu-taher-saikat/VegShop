import React, { useState, useEffect } from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import "./SingleProduct.css";
import vegitable from "../../assets/images/vegitable/oriol-portell-bHdiBIWrtTE-unsplash.jpg";
import { Tab, Tabs } from "react-bootstrap";
// import { useParams } from "react-router";
import { productDetails } from "../../actions/productActions";

function SingleProduct({ match }) {
  const dispatch = useDispatch();

  const singleProduct = useSelector((state) => state.singleProduct);
  const { loading, error, product } = singleProduct;

  const [count, setCount] = useState(1);
  console.log(product);

  useEffect(() => {
    dispatch(productDetails(match.params.id));
  }, [dispatch, match.params.id]);

  return (
    <div className="container-fluid">
      {/* breadcrumbs */}
      <Breadcrumb>
        <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="#">Library</Breadcrumb.Item>
        <Breadcrumb.Item active>Data</Breadcrumb.Item>
      </Breadcrumb>
      {loading ? (
        "loading"
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <section className="container">
          <div className="row" style={{ margin: "6rem 0px" }}>
            <div className="col-6">
              <div
                style={{ padding: "0px 3px", width: "100%" }}
                className="border  img"
              >
                <img
                  style={{ height: "100vh", width: "90vh", objectFit: "cover" }}
                  className="img-fluid"
                  src={vegitable}
                  alt="vegitable "
                />
              </div>
            </div>
            <div className="border  col-6">
              <div
                style={{ height: "80vh", padding: "0px 30px", width: "100%" }}
                className=" img"
              >
                <h1>{product.title}</h1>
                {/* <h1>{product.product.title}</h1> */}
                <h6>*****(0)</h6>
                {/* <h4>{product.product.price}</h4> */}
                <p>{product.description}</p>
                <small>
                  Availability: <span> In stock</span>
                </small>
                <h5>SKU: N/A</h5>
                {/* cart number  */}
                <div className="d-flex">
                  <div className="count d-flex">
                    <button
                      className="btn btn-primary"
                      onClick={() => setCount(count + 1)}
                    >
                      +
                    </button>
                    <p>{count}</p>
                    <button
                      className="btn btn-primary"
                      onClick={() => setCount(count + 1)}
                    >
                      -
                    </button>
                  </div>
                  <button>Add to Cart </button>
                </div>
                <hr />
                {/* cart number  */}
                <p className="collection">
                  Collections: Fruit Products, Home page
                </p>
                <p className="share">Share: </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* product page design */}

      <div className="container">
        <Tabs
          defaultActiveKey="home"
          transition={false}
          id="noanim-tab-example"
        >
          <Tab
            eventKey="home"
            title="Description
"
          >
            <div className="border ">
              <p>
                Etiam vitae bibend eros praesent a quet, maximus dignissim
                imperdiet, tellus luctus massa augue erat. Fusce egestas mi et
                lorem ornare. Etiam vitae bibend eros praesent a quet, maximus
                dignissim imperdiet, tellus luctus massa augue erat. Fusce
                egestas mi et lorem ornare Etiam vitae bibend eros praesent a
                quet, maximus dignissim imperdiet.
              </p>
              <br />
              <p>– Light green crewneck sweatshirt.</p>
              <p>– Hand pockets.</p>
              <p>– Relaxed fit.</p>
            </div>
          </Tab>
          <Tab eventKey="profile" title="Shipping">
            <div className="border ">
              <h4>Returns Policy</h4>
              <p>
                You may return most new, unopened items within 30 days of
                delivery for a full refund. We'll also pay the return shipping
                costs if the return is a result of our error (you received an
                incorrect or defective item, etc.).
              </p>
              <p>
                You should expect to receive your refund within four weeks of
                giving your package to the return shipper, however, in many
                cases you will receive a refund more quickly. This time period
                includes the transit time for us to receive your return from the
                shipper (5 to 10 business days), the time it takes us to process
                your return once we receive it (3 to 5 business days), and the
                time it takes your bank to process our refund request (5 to 10
                business days).
              </p>
              <p>
                If you need to return an item, simply login to your account,
                view the order using the 'Complete Orders' link under the My
                Account menu and click the Return Item(s) button. We'll notify
                you via e-mail of your refund once we've received and processed
                the returned item.
              </p>
              <h4>Shipping</h4>
              <p>
                We can ship to virtually any address in the world. Note that
                there are restrictions on some products, and some products
                cannot be shipped to international destinations. When you place
                an order, we will estimate shipping and delivery dates for you
                based on the availability of your items and the shipping options
                you choose.
              </p>
              <p>
                Depending on the shipping provider you choose, shipping date
                estimates may appear on the shipping quotes page. Please also
                note that the shipping rates for many items we sell are
                weight-based. The weight of any such item can be found on its
                detail page. To reflect the policies of the shipping companies
                we use, all weights will be rounded up to the next full pound.
              </p>
            </div>
          </Tab>
          <Tab eventKey="contact" title="Reviews">
            <div className="border ">
              <p>Customer Reviews No reviews yet</p>
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default SingleProduct;
