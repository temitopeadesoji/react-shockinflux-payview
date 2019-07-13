import React from "react";
import { expect } from "chai";
import { configure, mount } from "enzyme";
import ShockinfluxPayview from "../../src/shockinflux-payview";
import sinon from "sinon";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

const callback = response => null;
const close = () => null;
const transactionid = "836327236732632671009";
const email = "foobar@example.com";
const storeid = "g1xq8y87************9XBJbKXuZo+x3uqw=";
const amount = 1000;
const btnText = "Pay Now!";

describe("Shockinflux Payview Component", () => {
  it("Shockinflux Payview component renders button", () => {
    const ShockinfluxPayviewHolder = mount(
      <ShockinfluxPayview
        transactionid={transactionid}
        email={email}
        amount={amount}
        callback={callback}
        close={close}
        storeid={storeid}
      />
    );
    expect(ShockinfluxPayviewHolder.find("button")).to.have.length(1);
  });

  it("Shockinflux Payview component renders custom tag", () => {
    const ShockinfluxPayviewHolder = mount(
      <ShockinfluxPayview
        transactionid={transactionid}
        email={email}
        amount={amount}
        callback={callback}
        close={close}
        storeid={storeid}
        tag="a"
      />
    );

    expect(ShockinfluxPayviewHolder.find("button")).to.have.length(0);
    expect(ShockinfluxPayviewHolder.find("a")).to.have.length(1);
  });

  it("Shockinflux Payview should have customize button text", () => {
    const ShockinfluxPayviewHolder = mount(
      <ShockinfluxPayview
        transactionid={transactionid}
        email={email}
        amount={amount}
        callback={callback}
        close={close}
        text={btnText}
        storeid={storeid}
      />
    );
    expect(ShockinfluxPayviewHolder.text()).to.contain(btnText);
  });

  it("Call payWithShockinflux when button is clicked", done => {
    const shockinfluxPayviewNew = sinon.mock(ShockinfluxPayview.prototype);
    shockinfluxPayviewNew.expects("payWithShockinflux").once();
    const ShockinfluxPayviewHolder = mount(
      <ShockinfluxPayview
        transactionid={transactionid}
        email={email}
        amount={amount}
        callback={callback}
        close={close}
        storeid={storeid}
      />
    );
    ShockinfluxPayviewHolder.find("button").simulate("click");
    shockinfluxPayviewNew.restore();
    shockinfluxPayviewNew.verify();
    done();
  });
  
});
