import React, { Component } from "react";
import dataJson from "./data.json";
import Options from "./Options";
import Record from "./Record";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal);

let recordList = [];

class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      loading: true,
      count: 0,
      records: "",
      img:"",
      //recordList: [],
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ data: dataJson, loading: false });
      this.setState({img: dataJson[0].img});
    }, 1000);
    console.log("creando");
  }

  handlerClick = (e) => {
    const idButton = e.target.id;
    
    if (this.state.count > 5) {
      MySwal.fire({
        title: 'Ya se acabó la historia, shu de aquí ',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
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
      <div className="stylesApp">
        {this.state.loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <div className="layout">

              <div className="story">
                <h2>{this.state.data[this.state.count].historia}</h2>
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
