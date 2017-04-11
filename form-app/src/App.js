import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Form from "react-jsonschema-form";
import './App.css';
import Input from './input'


class App extends Component {

  constructor(props){
    super(props)
    this.state ={
        schema: {
          title: "Formulario",
          type: "object",
          required: [],
          properties: {}
        },
        uiSchema :{},
        currentIndex: 0
    }


    this.addShortText = this.addShortText.bind(this)
    this.addLongText = this.addLongText.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.newInput = this.newInput.bind(this)
    this.addDate = this.addDate.bind(this)
    this.addSelect = this.addSelect.bind(this)
    this.addRadio = this.addRadio.bind(this)
    this.addInteger = this.addInteger.bind(this)
    this.addNumber = this.addNumber.bind(this)
    this.addShortTextWithMask = this.addShortTextWithMask.bind(this)

  }



  addField(state, field){
    state.currentIndex += 1
    const name = `Questão ${state.currentIndex}`
    const _name = `questao_${state.currentIndex}`
    state.schema.properties[_name] = { ...field.jsonSchema, title: name}
    state.uiSchema[_name] = field.uiSchema;
    state.uiSchema["ui:order"] = (state.uiSchema["ui:order"] || []).concat(_name);
    return state;
  }


  addShortText(){
    
    const field = {
                    jsonSchema : {type: "string", title: '', default: ""}
                  }

    const newState = this.addField(this.state, field)
    this.setState({ ...newState})

  }

  addShortTextWithMask(className){
    
    const field = {
                    jsonSchema : {type: "string", title: '', default: ""},
                    uiSchema: {classNames: className}
                  }

    const newState = this.addField(this.state, field)
    this.setState({ ...newState})

  }

  addLongText(){
    const field = {
                    jsonSchema : {type: "string", title: '', default: ""},
                    uiSchema: {"ui:widget": "textarea"}
                  }
    
    const newState = this.addField(this.state, field)
    this.setState({ ...newState})

  }

  addInteger(){
    const field = {
                    jsonSchema : {type: "integer", title: '', default: ""},
                    uiSchema: {"ui:widget": "updown"}
                  }
    
    const newState = this.addField(this.state, field)
    this.setState({ ...newState})
  }

  addNumber(){
    const field = {
                    jsonSchema : {type: "number", title: ''}
                  }
    
    const newState = this.addField(this.state, field)
    this.setState({ ...newState})
  }

  addDate(){
    const field = {
                    jsonSchema : {type: "string", title: '', default: "", format: "date"},
                    uiSchema: {"ui:widget": "date"}
                  }
    
    const newState = this.addField(this.state, field)
    this.setState({ ...newState})

  }


  addSelect(){
    let values = [
        "Casa",
        "UEPB",
        "CG"
      ]
    const field = {
                    jsonSchema : {type: "string", title: '', default: "", enum: values },
                    uiSchema: {"ui:widget": "select"}
                  }
    
    const newState = this.addField(this.state, field)
    this.setState({ ...newState})
  }

  addRadio(){
    let values = [
        "Casa",
        "UEPB",
        "CG"
      ]
    const field = {
                    jsonSchema : {type: "string", title: '', default: "", enum: values },
                    uiSchema: {"ui:widget": "radio", "ui:options": {"inline": true}}
                  }
    
    const newState = this.addField(this.state, field)
    this.setState({ ...newState})
  }


  onSubmit(formData) {
    console.log("Finally", formData);
    ReactDOM.render(
            <div className=''>
                <h1>Resultado</h1>
                schema
                <pre>{JSON.stringify(formData.schema, null, 2) }</pre>

                uiSchema
                <pre>{JSON.stringify(formData.uiSchema, null, 2) }</pre>

                data
                <pre>{JSON.stringify(formData.formData, null, 2) }</pre>
            </div>
            , document.getElementById("root"));
  }

  

  newInput(){
    return (
      <Input />
    )
  }

  render() {

    return (
      <div className='container'>
        <div className='col-md-offset-3 col-md-6'>

          <div>
            <div className="btn-group">
              <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Action <span className="caret"></span>
              </button>
              <ul className="dropdown-menu">
                <li><a href="#" onClick={this.addShortText} >Texto Curto</a></li>
                <li><a href="#" onClick={() => this.addShortTextWithMask("phone_with_ddd")} >Telefone</a></li>
                <li><a href="#" onClick={() => this.addShortTextWithMask("cpf_mask")} >CPF</a></li>
                <li><a href="#" onClick={this.addLongText}>Texto Longo</a></li>
                <li><a href="#" onClick={this.addInteger}>Inteiro</a></li>
                <li><a href="#" onClick={this.addNumber}>Real</a></li>
                <li><a href="#" onClick={this.addDate}>Data</a></li>
                <li><a href="#" onClick={this.addSelect}>Select</a></li>
                <li><a href="#" onClick={this.addRadio}>Radio</a></li>
                <li><a href="#">Something else here</a></li>
                <li role="separator" className="divider"></li>
                <li><a href="#" onClick={this.newInput}>Novo</a></li>
              </ul>
            </div>
          </div>

          <Form 
                schema={this.state.schema} 
                uiSchema={this.state.uiSchema}
                onSubmit={this.onSubmit} />
        </div>
      </div>
    );
  }
}

export default App;
