import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link } from 'react-router-dom';
import LogoDisplay from './LogoDisplay';
const ADD_LOGO = gql`
    mutation AddLogo(
        $text: String!,
        $color: String!,
        $fontSize: Int!,
        $backgroundColor: String!,
        $borderColor: String!,
        $borderWidth: Int!,
        $borderRadius: Int!,
        $padding: Int!,
        $margin: Int!) {
        addLogo(
            text: $text,
            color: $color,
            fontSize: $fontSize,
            backgroundColor: $backgroundColor,
            borderColor: $borderColor,
            borderWidth: $borderWidth,
            borderRadius: $borderRadius,
            padding: $padding,
            margin: $margin) {
            _id
        }
    }
`;

class CreateLogoScreen extends Component {
    constructor() {
        super();

        // WE'LL MANAGE THE UI CONTROL
        // VALUES HERE
        this.state = {
            _id: 0,
            text: "Text",
            color : "#FF0000",
            fontSize : 10,
            backgroundColor : "#00FF00",
            borderColor : "#0000FF",
            borderRadius : 0,
            borderWidth : 0,
            padding : 0,
            margin : 0
        }
    }
    change=(event)=>{
        //console.log("name="+event.target.name);
        //console.log("value="+event.target.value);
        let temp=this.state;
        temp[event.target.name]=event.target.value;
        this.setState(temp);
    }
    render() {
        let text, color, fontSize,backgroundColor,borderColor,borderWidth,borderRadius, padding, margin;
        return (
            <Mutation mutation={ADD_LOGO} onCompleted={() => this.props.history.push('/')}>
                {(addLogo, { loading, error }) => (
                    <div className="container">
                        <div className="panel panel-default" style={{width: "50%"}}>
                            <div className="panel-heading">
                                <h4><Link to="/">Home</Link></h4>
                                <h3 className="panel-title">
                                    Create Logo
                            </h3>
                            </div>
                            <div className="panel-body">
                                <form onSubmit={e => {
                                    e.preventDefault();
                                    addLogo({ variables: { text: text.value, color: color.value, fontSize: parseInt(fontSize.value),backgroundColor: backgroundColor.value,
                                        borderColor: borderColor.value,
                                        borderWidth: parseInt(borderWidth.value),
                                        borderRadius: parseInt(borderRadius.value),
                                        padding: parseInt(padding.value),
                                        margin: parseInt(margin.value) } });
                                    text.value = "";
                                    color.value = "";
                                    fontSize.value = "";
                                    backgroundColor.value="";
                                    borderColor.value="";
                                    borderWidth.value="";
                                    borderRadius.value="";
                                    padding.value="";
                                    margin.value="";
                                }}>
                                    <div className="form-group">
                                        <label htmlFor="text">Text:</label>
                                        <input type="text" className="form-control" name="text" ref={node => {
                                            text = node;
                                        }} placeholder="Text" defaultValue={this.state.text} onChange={this.change} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="color">Color:</label>
                                        <input type="color" className="form-control" name="color" ref={node => {
                                            color = node;
                                        }} placeholder="Color"  defaultValue={this.state.color} onChange={this.change}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="fontSize">Font Size:</label>
                                        <input type="number" className="form-control" name="fontSize" ref={node => {
                                            fontSize = node;
                                        }} placeholder="Font Size" defaultValue={this.state.fontSize} onChange={this.change}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="color">Background Color:</label>
                                        <input type="color" className="form-control" name="backgroundColor" ref={node => {
                                            backgroundColor = node;
                                        }} placeholder="Color" defaultValue={this.state.backgroundColor} onChange={this.change}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="color">Border Color:</label>
                                        <input type="color" className="form-control" name="borderColor" ref={node => {
                                            borderColor = node;
                                        }} placeholder="Color" defaultValue={this.state.borderColor} onChange={this.change}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="fontSize">Border Width:</label>
                                        <input type="number" className="form-control" name="borderWidth" ref={node => {
                                            borderWidth = node;
                                        }} placeholder="Border Width" defaultValue={this.state.borderWidth} onChange={this.change} />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="fontSize">Border Radius:</label>
                                        <input type="number" className="form-control" name="borderRadius" ref={node => {
                                            borderRadius = node;
                                        }} placeholder="Border Radius" defaultValue={this.state.borderRadius} onChange={this.change}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="fontSize">Padding:</label>
                                        <input type="number" className="form-control" name="padding" ref={node => {
                                            padding = node;
                                        }} placeholder="padding" defaultValue={this.state.padding} onChange={this.change}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="fontSize">Margin:</label>
                                        <input type="number" className="form-control" name="margin" ref={node => {
                                            margin= node;
                                        }} placeholder="margin" defaultValue={this.state.margin} onChange={this.change}/>
                                    </div>
                                    <button type="submit" className="btn btn-success">Submit</button>
                                </form>
                                {loading && <p>Loading...</p>}
                                {error && <p>Error :( Please try again</p>}
                            </div>
                            
                        </div>
                        <LogoDisplay logo={this.state}/>
                    </div>
                )}
            </Mutation>
        );
    }
}

export default CreateLogoScreen;