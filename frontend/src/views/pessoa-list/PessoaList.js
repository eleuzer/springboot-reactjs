import React, { Component } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import PessoaService from "../../services/PessoaService";

import "./styles.css";

export default class PessoaList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      dataSource: [[1, "Teste", "asdasd"]]
    }

  }

  componentDidMount() {
    this.listarPessoas();
  }

  listarPessoas() {
    PessoaService.listAll()
      .then((res) => {
        let list = [];
        res.data.forEach(item => {
          list.push([item.id, item.razaoSocial, item.email]);   
        })
        
        this.setState({dataSource: list})
      });

  }

  editar(pessoa) {
    //this.router.navigate(['/pessoa-edit/'+pessoa.id]);
  }

  remover(pessoa) {
    PessoaService.remove(pessoa).subscribe(
      (values) => {
        this.listarPessoas();
      }
    )
  }


  render() {
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className="cardTitleWhite">Pessoas</h4>
              <p className="cardCategoryWhite">
                Lista de Pessoas
              </p>

            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={["Código", "Razão Social", "Email"]}
                tableData={this.state.dataSource}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }



}
