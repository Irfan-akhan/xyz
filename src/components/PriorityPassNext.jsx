import React, { Component } from "react";
import {
  Person,
  AccessTime,
  Mail,
  DateRange,
  Phone,
  FlightLand,
} from "@material-ui/icons";

export default class PriorityPassNext extends Component {
  onChangeHandler = (e) => {
    console.log("Nameeeee", e.target.name, e.target.value);
    this.props.setData({ ...this.props.data, [e.target.name]: e.target.value });
  };
  render() {
    console.log("PPPPPPPPPPPPPP", this.props);
    return (
      <div style={{ marginTop: "6rem" }}>
        <h4
          style={{
            margin: "0",
            paddingLeft: "1.4rem",
            textTransform: "uppercase",
          }}
        >
          Priority Pass Info
        </h4>
        <hr />
        <form className="checkoutForm">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className="inputControl">
              <span>
                <Person />
              </span>
              <select
                name="service"
                onChange={this.onChangeHandler}
                value={this.props.data.service}
                id=""
                required
              >
                <option selected disabled>
                  Select Service
                </option>
                <option value="Arival">Arrival Protocol Service </option>
                <option value="Departure">Departure Protocol Service </option>
              </select>
            </div>

            <div className="inputControl">
              <span>
                <Person />
              </span>
              <select
                name="airport"
                id="airport"
                onChange={this.onChangeHandler}
                required
              >
                <option value="" defaultValue disabled>
                  Select Airport
                </option>
                <option value="Murtala Muhammed International Airport">
                  Murtala Muhammed International Airport
                </option>
                <option value="Murtala Muhammed Domestic Airport">
                  Murtala Muhammed Domestic Airport
                </option>
                {/* <option value="Port Harcourt International Airport">
          Port Harcourt International Airport
        </option>
        <option value="Nnamdi Azikwe International Airport">
          Nnamdi Azikwe International Airport
        </option>
        <option value="Kotoka International Airport">
          Kotoka International Airport
        </option>
        <option value="Kumasi Airport">Kumasi Airport</option>
        <option value="London Heathrow Airport">
          London Heathrow Airport
        </option>
        <option value="Gatwick Airport">Gatwick Airport</option>
        <option value="London City Airport">London City Airport</option> */}
              </select>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className="inputControl">
              <span>
                <Person />
              </span>
              <input
                required
                placeholder="Number of Passengers"
                min="1"
                max="10"
                type="number"
                name="passengers"
                id="passengers"
                required
                value={this.props.data.passengers}
                onChange={this.onChangeHandler}
              />
            </div>

            <div className="inputControl">
              <span>
                <Person />
              </span>
              <select
                name="cabinClass"
                value={this.props.data.cabinClass}
                onChange={this.onChangeHandler}
                required
              >
                <option value="" selected disabled>
                  Select Cabin Class
                </option>

                <option value="First Class">First Class</option>
                <option value="Business Class">Business Class </option>
                <option value="Premium ">Premium Economy</option>
                <option value="Economy">Economy</option>
              </select>
            </div>
          </div>
          {/* dummy */}

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className="inputControl">
              <span>
                <FlightLand />
              </span>
              <input
                type="text"
                placeholder="Enter Flight Number"
                name="flightNumber"
                id=""
                value={this.props.data.flightNumber}
                onChange={this.onChangeHandler}
              />
            </div>

            <div className="inputControl">
              <span>
                <DateRange />
              </span>
              <input
                type="date"
                name="date"
                placeholder="Date"
                id=""
                value={this.props.data.date}
                onChange={this.onChangeHandler}
              />
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className="inputControl">
              <span>
                <AccessTime />
              </span>
              <input
                type="time"
                placeholder="time"
                name="time"
                id=""
                value={this.props.data.time}
                onChange={this.onChangeHandler}
              />
            </div>
            <div className="inputControl">
              <span>
                <Phone />
              </span>
              <input
                type="tel"
                Placeholder="Enter Your Number"
                name="mobile"
                id=""
                value={this.props.data.number}
                onChange={this.onChangeHandler}
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}
