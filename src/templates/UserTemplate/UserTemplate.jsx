import { Fragment, useEffect } from "react";
import { Route } from "react-router";
import Footer from "../HomeTemplate/Layout/Footer/Footer";
import Header from "../HomeTemplate/Layout/Header/Header";

export const UserTemplate = (props) => {
  //path, exact, Component
  // ! logic: khi vừa vào trang phải cho scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  const { Component, ...restProps } = props;

  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        //props.location,props.history,props.match
        return (
          <div>
            <Header />
            <Component {...propsRoute} />
            {/* <Footer /> */}
          </div>
        );
      }}
    />
  );
};
