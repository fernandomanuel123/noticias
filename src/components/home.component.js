import Axios from 'axios';
import { Component } from "react";
import { Redirect } from "react-router-dom";
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Card, CardImg, CardText, CardBody,
    CardTitle, Row, Col, Spinner
} from 'reactstrap';
import './home.css';


export default class Home extends Component {


    state = {
        categorias: ["business", "entertainment", "general", "health", "science", "sports", "technology"],
        selectedcategoria: "Escoja categoria",
        noticias: [],
        selectednoticia: [],
        mostrarspinner: false
    }

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        })
    }

    buscarnoticia = (val) => {
        this.setState({ mostrarspinner: !this.state.mostrarspinner })
        this.setState({ selectedcategoria: val })
        var baseurl = "country=ar&category=" + val + "&apiKey=eb25653693794145973cbbc9909af253"

        Axios.get(baseurl).then(
            res => {
                console.log(res.data)
                this.setState({ mostrarspinner: !this.state.mostrarspinner })
                this.setNoticias(res.data.articles)
            },
            err => {
                console.log(err);
            }
        )
    }
    setNoticias = noticias => {
        this.setState({
            noticias: noticias
        })
    }
    detallenoticia = noticia => {
        this.setState({
            abiertoP: !this.state.abiertoP,
            selectednoticia: noticia
        })

        console.log(noticia)
    }

    CerrarModalP = () => {
        this.setState({
            abiertoP: !this.state.abiertoP
        })
    }

    render() {

        const modalStyles = {
            position: 'absolute',
            width: '100%',
            top: '50%',
            left: '50%',
            maxWidth: '800px',
            transform: 'translate(-50%,-50%)'
        }
        let contenido

        if (this.state.mostrarspinner)
            contenido = <Spinner color="black" style={{ width: "10rem", height: "10rem" }}/>
        else{
            contenido = <Row>
            {this.state.noticias.map(noticia =>
                <Col sm="4">
                    <Card className="NoticiaCard">
                        <CardImg className="ImagenCard" src={noticia.urlToImage} alt="Card image cap" />
                        <CardBody>
                            <CardTitle tag="h5">{noticia.title}</CardTitle>
                            <CardText>{noticia.description}</CardText>
                        </CardBody>
                        <div text-align="center">
                            <Button className="BotonCard" color="primary" onClick={() => this.detallenoticia(noticia)} >Ver noticia completa</Button>
                        </div>
                    </Card>
                </Col>

            )}

        </Row>
        }
        return (
            <div>
                <h1 className="Titulo">
                    Noticias por categoria
                </h1>
                <br></br>
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle caret>
                        {this.state.selectedcategoria}
                    </DropdownToggle>

                    <DropdownMenu>
                        {this.state.categorias.map(categoria =>
                            <DropdownItem
                                onClick={() => this.buscarnoticia(categoria)}>{categoria}
                            </DropdownItem>)}
                    </DropdownMenu>
                </Dropdown>
                <br></br>
                <br></br>
                {contenido}

                <Modal isOpen={this.state.abiertoP} style={modalStyles} toggle={this.CerrarModalP} >
                    <ModalHeader >
                        <Label>{this.state.selectednoticia.title}</Label>
                        <Label>{this.state.selectednoticia.description}</Label>
                        <CardImg className="ImagenCard" src={this.state.selectednoticia.urlToImage} alt="Card image cap" />
                    </ModalHeader>
                    <ModalBody>
                        {this.state.selectednoticia.content}
                    </ModalBody>

                    <ModalFooter>
                        <div text-align="center">
                            <Button color="secondary" onClick={this.CerrarModalP}>Cerrar</Button>
                        </div>
                    </ModalFooter>

                </Modal>


            </div>
        )

    }
}