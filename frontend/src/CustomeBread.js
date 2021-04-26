import Breadcrumb from "react-bootstrap/Breadcrumb";

import React from "react";
import { withRouter } from "react-router";
import { Link, Router } from "react-router-dom";

function CustomeBread(props) {
  //   const {
  //     history,
  //     location: { pathname },
  //   } = props;
  //   const pathnames = pathname.split("/").filter((x) => x);
  //   console.log(pathnames);

  return (
    <Router>
      <div className="container">
        <Breadcrumb>
          <Link>Home/</Link>
          {/* {pathnames.map((name, index) => {
            const routeto = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;
            return isLast ? (
              <p className="text-danger">{name}</p>
            ) : (
              <Link
                key={name}
                onClick={() => {
                  if (name != "singleService") history.push(routeto);
                  else history.push("/");
                }}
              >
                {name}
              </Link>
            );
          })} */}
        </Breadcrumb>
      </div>
    </Router>
  );
}

export default withRouter(CustomeBread);
