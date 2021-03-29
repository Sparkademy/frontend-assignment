import * as React from "react";
import { render, fireEvent, cleanup, within, waitFor } from "@testing-library/react";

import { RegistrationForm } from "./Form";

beforeEach(cleanup);

global.matchMedia = global.matchMedia || function () {
  return {
    addListener: jest.fn(),
    removeListener: jest.fn(),
  };
};

describe("RegistrationForm", () => {

  it("all fields are required", async () => {
    const onFinishMock = jest.fn(() => Promise.resolve());

    const utils = render(<RegistrationForm onSuccess={onFinishMock}/>);
    fireEvent.click(utils.getByText("Submit"))

    const nameField = utils.getByTestId("name")
    await within(nameField).findByText("name is required")

    const emailField = utils.getByTestId("email")
    await within(emailField).findByText("email is required")

    const ageField = utils.getByTestId("age")
    await within(ageField).findByText("age is required")

    const websiteField = utils.getByTestId("website")
    await within(websiteField).findByText("website is required")

    expect(onFinishMock).toHaveBeenCalledTimes(0)
  });

  it("fields are accepted when filled in", async () => {
    const onFinishMock = jest.fn(() => Promise.resolve());
    const utils = render(<RegistrationForm onSuccess={onFinishMock}/>);

    fireEvent.change(utils.getByLabelText(/name/i), { target: { value: 'foo' } })
    fireEvent.change(utils.getByLabelText(/email/i), { target: { value: 'foo@bar.com' } })
    fireEvent.change(utils.getByLabelText(/age/i), { target: { value: '25' } })
    fireEvent.change(utils.getByLabelText(/website/i), { target: { value: 'http://foo.bar' } })

    fireEvent.click(utils.getByText("Submit"))

    await waitFor(() => {
      const nameField = utils.getByTestId("name")
      expect(within(nameField).queryByText("name is required")).toBeNull()

      const emailField = utils.getByTestId("email")
      expect(within(emailField).queryByText("email is required")).toBeNull()

      const ageField = utils.getByTestId("age")
      expect(within(ageField).queryByText("age is required")).toBeNull()

      const websiteField = utils.getByTestId("website")
      expect(within(websiteField).queryByText("website is required")).toBeNull()

      expect(onFinishMock).toHaveBeenCalledTimes(1)
    })
  });

  it("email is validated correctly", async () => {
    const onFinishMock = jest.fn(() => Promise.resolve());
    const utils = render(<RegistrationForm onSuccess={onFinishMock}/>);

    fireEvent.change(utils.getByLabelText(/email/i), { target: { value: 'foo' } })
    fireEvent.click(utils.getByText("Submit"))

    const emailField = utils.getByTestId("email")
    await within(emailField).findByText("enter a valid email address")
    expect(onFinishMock).toHaveBeenCalledTimes(0)
  });

  it("age is validated correctly", async () => {
    const onFinishMock = jest.fn(() => Promise.resolve());
    const utils = render(<RegistrationForm onSuccess={onFinishMock}/>);

    fireEvent.change(utils.getByLabelText(/age/i), { target: { value: 'foo' } })
    fireEvent.click(utils.getByText("Submit"))

    const ageField = utils.getByTestId("age")
    await within(ageField).findByText("enter a valid age")
    expect(onFinishMock).toHaveBeenCalledTimes(0)
  });

  it("website is validated correctly", async () => {
    const onFinishMock = jest.fn(() => Promise.resolve());
    const utils = render(<RegistrationForm onSuccess={onFinishMock}/>);

    fireEvent.change(utils.getByLabelText(/website/i), { target: { value: 'foo' } })
    fireEvent.click(utils.getByText("Submit"))

    const websiteField = utils.getByTestId("website")
    await within(websiteField).findByText("enter a valid website")
    expect(onFinishMock).toHaveBeenCalledTimes(0)
  });

});
