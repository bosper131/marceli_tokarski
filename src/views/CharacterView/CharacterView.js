import React from "react";
import axios from "axios";
import Select from "../../components/Select/Select";
import Input from "../../components/Input/Input";
import Radio from "../../components/Radio/Radio";
import "./CharacterView.css";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";

const types = {
  male: "male",
  female: "female",
  na: "na"
};


class CharacterView extends React.Component {
  state = {
    species: "",
    name: "",
    specie: [],
    gender: '',
    homeworld: "",
    errorName: "",
    errorSpecies: "",
    errorGender: ""
  };

  handleRadioButtonChange = gender => {
    this.setState({
      gender: gender
    });
  };

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  validate = () => {
    let errorName = "";
    let errorGender ='';
    let errorSpecies = '';
    if (this.state.name === "") errorName = "This field is required";
    if (this.state.species === "") errorSpecies = "This field is required";
    if (this.state.gender === "") errorGender = "This field is required";
    if (errorName || errorSpecies || errorGender) {
      this.setState({ errorName, errorSpecies, errorGender });
      return false;
    }
    return true;
  };
  handleSubmit = e => {
    e.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      this.setState({ errorName: "", errorSpecies: "", errorGender: "" });
      const { specie, ...rest } = this.state;
      axios.post(`http://localhost:3000/characters`, { ...rest }).then(res => {
        if (res.statusText === "Created") {
          this.props.history.push("/");
        }
      });
    }
  };

  componentDidMount() {
    axios.get(`http://localhost:3000/species`).then(res => {
      this.setState({
        specie: res.data
      });
    });
  }
  render() {
    const { gender } = this.state;
    return (
      <form
        autoComplete="off"
        className="form needs-validation"
        onSubmit={this.handleSubmit}
        noValidate
      >
        <Input
          id="name"
          type="text"
          classLabel="required"
          inputClass={
            this.state.errorName === "" || this.state.name !== ""
              ? "form-control "
              : "form-control is-invalid"
          }
          placeholder="Name..."
          name="name"
          value={this.state.names}
          onChange={this.handleInputChange}
          required
        >
          Name:
        </Input>
        {this.state.name === "" && (
          <div className="invalid-feedback d-block">{this.state.errorName}</div>
        )}
        <Select
          id="species"
          classLabel="select required"
          classSelect={
            this.state.errorSpecies === "" || this.state.species !== "" || this.state.errorName!==""
              ? "form-control"
              : "form-control is-invalid"
          }
          name="species"
          value={this.state.species}
          species={this.state.specie}
          onChange={this.handleInputChange}
          required
        >
          Species:
        </Select>
        {this.state.species === "" && (
          <div className="invalid-feedback d-block">
            {this.state.errorSpecies}
          </div>
        )}
        <label htmlFor={types.male} className="required">
          Gender:
          <Radio
            id={types.male}
            checked={gender === types.male}
            changeFn={() => this.handleRadioButtonChange(types.male)}
            className={
              this.state.errorGender === "" || this.state.gender !== "" || this.state.errorName!=="" ||this.state.errorSpecies!==""
                ? ""
                : "errorGender is-invalid"
            }
          >
            Male
          </Radio>
          <Radio
            id={types.female}
            checked={gender === types.female}
            changeFn={() => this.handleRadioButtonChange(types.female)}
            className={
              this.state.errorGender === "" || this.state.gender !== "" || this.state.errorName!=="" ||this.state.errorSpecies!==""
                ? ""
                : "errorGender is-invalid"
            }
          >
            Female
          </Radio>
          <Radio
            id={types.na}
            checked={gender === types.na}
            changeFn={() => this.handleRadioButtonChange(types.na)}
            className={
              this.state.errorGender === "" || this.state.gender !== "" || this.state.errorName!=="" ||this.state.errorSpecies!==""
                ? ""
                : "errorGender is-invalid"
            }
          >
            N/A
          </Radio>
        </label>
        {this.state.gender === "" && (
          <div className="invalid-feedback d-block">
            {this.state.errorGender}
          </div>
        )}
        <Input
          id="homeworld"
          type="text"
          inputClass="form-control"
          placeholder="Homeworld..."
          name="homeworld"
          value={this.state.homeworld}
          onChange={this.handleInputChange}
        >
          Homeworld:
        </Input>
        <Input
          id="submit"
          type="submit"
          inputClass="btn-outline-primary button"
          value="Submit"
          disabled={(this.state.species === "" || this.state.gender === "" || this.state.name==="")}
        />
      </form>
    );
  }
}

export default CharacterView;
