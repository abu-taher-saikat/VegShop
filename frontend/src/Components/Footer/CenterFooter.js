import React from "react";
import { Link } from "react-router-dom";

const CenterFooter = () => {
  return (
    <div className="mt-5 pt-5">
      <div className="footerCenter" id="centerFooter">
        <div className="container">
          <div className="footerCenterInner">
            <div className="rowFlex rowFlexMargin">
              <div className="col-xs-12 col-md-8 mb20">
                <div className="rowFlex rowFlexMargin">
                  <div className="col-xs-12 col-sm-4 mb10">
                    <div className="centerFooterMenu">
                      <h4 className="centerFooterTitle">About Store</h4>
                      <div className="Content">
                        <ul className="centerFooterLinks list-unstyled">
                          <li className="">
                            <Link to="/pages/about" title="">
                              About Us
                            </Link>
                          </li>

                          <li className="">
                            <Link to="/pages/contact-us" title="">
                              Contact Us
                            </Link>
                          </li>

                          <li className="">
                            <Link to="/pages/faqs" title="">
                              FAQs
                            </Link>
                          </li>

                          <li className="active">
                            <Link to="/" title="">
                              Our policies
                            </Link>
                          </li>

                          <li className="active">
                            <Link to="/" title="">
                              Work with us
                            </Link>
                          </li>

                          <li className="active">
                            <Link to="/" title="">
                              Offices
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="col-xs-12 col-sm-4 mb10">
                    <div className="centerFooterMenu">
                      <h4 className="centerFooterTitle">Top Categories</h4>
                      <div className="Content">
                        <ul className="centerFooterLinks list-unstyled">
                          <li className="">
                            <Link to="/collections/fruit-products" title="">
                              Fruit Products
                            </Link>
                          </li>

                          <li className="">
                            <Link to="/collections/new-products" title="">
                              Fresh Meats
                            </Link>
                          </li>

                          <li className="">
                            <Link to="/collections/frontpage" title="">
                              Ocean Foods
                            </Link>
                          </li>

                          <li className="">
                            <Link to="/collections/feature-product" title="">
                              Feature Product
                            </Link>
                          </li>

                          <li className="">
                            <Link to="/collections/new-products" title="">
                              New products
                            </Link>
                          </li>

                          <li className="">
                            <Link to="/collections/sale-off" title="">
                              Sale off
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="col-xs-12 col-sm-4 mb10">
                    <div className="centerFooterMenu">
                      <h4 className="centerFooterTitle">Our Store</h4>

                      <div className="Content">
                        <ul className="centerFooterLinks list-unstyled">
                          <li className="active">
                            <Link to="/" title="">
                              New York
                            </Link>
                          </li>

                          <li className="active">
                            <Link to="/" title="">
                              Londona SF
                            </Link>
                          </li>

                          <li className="active">
                            <Link to="/" title="">
                              Cockfosters BP
                            </Link>
                          </li>

                          <li className="active">
                            <Link to="/" title="">
                              Los Angeles
                            </Link>
                          </li>

                          <li className="active">
                            <Link to="/" title="">
                              Chicago
                            </Link>
                          </li>

                          <li className="active">
                            <Link to="/" title="">
                              Las Vegas
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-md-4 mbItemGutter">
                <div className="ContentInfo">
                  <div className="Content">
                    <div className="contactinfo-phone">
                      <i className="icons"></i>
                      Got Question? Call us 24/7!<span>1-888-123-456-89</span>
                    </div>
                    <div className="contactinfo-desc">
                      <p>
                        Address: 7563 St. Vicent Place, Glasgow, Greater NewYork
                        NH7689, UK
                      </p>
                      <p>Email: contact@support.com</p>
                    </div>
                  </div>
                  <div className="paymentLogo clearfix">
                    <div
                      className="paymentLogoInner"
                      style={{ width: "350px" }}
                    >
                      <div className="p-relative">
                        <div
                          className="product-card__image"
                          style={{ paddingTop: "8.571428571428571%" }}
                        ></div>
                        <div
                          className="placeholder-background placeholder-background--animation"
                          data-image-placeholder=""
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CenterFooter;
