import React, { Component } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import PessoaService from "../../services/PessoaService";

import avatar from "assets/img/faces/marc.jpg";
import "./styles.css";


export default class PessoaEdit extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      dataSource: {
        razaoSocial: "",
        email: ""
      }
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.salvar = this.salvar.bind(this);
    this.cancelar = this.cancelar.bind(this);
  }

  handleInputChange = event => {
    const { name, value } = event.target
  
    this.setState(prevState => {
      let dataSource = Object.assign({}, prevState.dataSource);  
      dataSource[name] = value;                            
      return { dataSource };                                 
    });
  }

  salvar = () => {
    if (!this.state.dataSource.razaoSocial) {
      alert('Dados incompletos');
      return;
    }
    

    PessoaService.insertOrUpdade(this.state.dataSource).then(
      (result) => {
        alert('Salvo com sucesso!');  
        this.props.history.push('/admin/listPessoas')
      }).catch((err)=>{
        console.log("Error in response");
        console.log(err);
    });
    
  }

  buscarPessoa(id) {
    PessoaService.getPessoa(id).then(
      (value) => {
        this.dataSource = value;
      }).catch((err)=>{
        console.log("Error in response");
        console.log(err);
    });
  }

  cancelar() {
    this.props.history.push('/admin/listPessoas');
  }

  render() {
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="primary">
                <h4 className="cardTitleWhite">Pessoa</h4>
                <p className="cardCategoryWhite">Cadastro de Pessoa</p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={5}>
                    <CustomInput
                      labelText="Código (disabled)"
                      id="id"
                      value={this.state.dataSource.id}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        disabled: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="Razão Social"
                      id="razaoSocial"
                      value={this.state.dataSource.razaoSocial}
                      inputProps={{
                        name: "razaoSocial",
                        onChange: this.handleInputChange
                      }}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Email"
                      id="email"
                      value={this.state.dataSource.email}
                      inputProps={{
                        name: "email",
                        onChange: this.handleInputChange
                      }}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color="primary" onClick={this.salvar}>Salvar</Button>
                <Button color="default" onClick={this.cancelar}>Cancelar</Button>
              </CardFooter>
            </Card>
          </GridItem>

        </GridContainer>
      </div>
    );
  }



}
