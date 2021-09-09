import React, { Component } from "react";
import dataJson from "./data.json";
import Options from "./Options";
import Record from "./Record";

let recordList = [];

class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      loading: true,
      count: 0,
      records: "",
      //recordList: [],
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ data: dataJson, loading: false });
    }, 1000);
    console.log("creando");
  }

  handlerClick = (e) => {
    const idButton = e.target.id;
    console.log("Clickeaste: " + idButton);
    // selectButton: idButton;

    if (this.state.count > 5) {
      alert("Se acabó 7u7");
    } else if (idButton === "a" && this.state.records !== "A") {
      this.setState({
        count: this.state.count + 1,
        records: "A",
      });
    } else if (idButton === "a" && this.state.records === "A") {
      this.setState({
        count: this.state.count + 2,
        records: "A",
      });
    } else if (idButton === "b" && this.state.records === "A") {
      this.setState({
        count: this.state.count + 3,
        records: "B",
      });
    } else if (idButton === "b") {
      this.setState({
        count: this.state.count + 2,
        records: "B",
      });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.records !== this.state.records) {
      recordList.push(this.state.records);
    }

    console.log("Estado actual: " + this.state.records);
    console.log("Array con selección: " + recordList);
  }

  render() {
    return (
      <div className="App">
        {this.state.loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <div className="layout">
              <div className="story">
                <h1>{this.state.data[this.state.count].historia}</h1>
              </div>

              <div>
                <Options
                  textLine={this.state.data}
                  index={this.state.count}
                  onSelectButton={this.handlerClick}
                />
              </div>

              <div className="recordatorio">
                <Record
                  list={recordList}
                  selectButtonValue={this.state.records}
                />
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default View;
