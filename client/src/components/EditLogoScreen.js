import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import LogoDisplay from './LogoDisplay';

const GET_LOGO = gql`
    query logo($logoId: String) {
        logo(id: $logoId) {
            _id
            text
            color
            fontSize
            backgroundColor
            borderColor
            borderWidth
            borderRadius
            padding
            margin
            lastUpdate
        }
    }
`;

const UPDATE_LOGO = gql`
    mutation updateLogo(
        $id: String!,
        $text: String!,
        $color: String!,
        $fontSize: Int!,
        $backgroundColor: String!,
        $borderColor: String!,
        $borderWidth: Int!,
        $borderRadius: Int!,
        $padding: Int!,
        $margin: Int!) {
            updateLogo(
                id: $id,
                text: $text,
                color: $color,
                fontSize: $fontSize,
                backgroundColor: $backgroundColor,
                borderColor: $borderColor,
                borderWidth: $borderWidth,
                borderRadius: $borderRadius,
                padding: $padding,
                margin: $margin) {
                    lastUpdate
                }
        }
`;

class EditLogoScreen extends Component {
    constructor() {
        super();

        // WE'LL MANAGE THE UI CONTROL
        // VALUES HERE
        this.state = {
            _id: 0,
            text: "fred",
            color : "#00FF00",
            fontSize : 24,
            backgroundColor : "#FF0000",
            borderColor : "FF0000",
            borderRadius : 10,
            borderWidth : 5,
            padding : 5,
            margin : 5
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
        let it=this;
        let text, color, fontSize,backgroundColor,borderColor,borderWidth,borderRadius, padding, margin;
        return (
            <Query query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;
                    
                    if (it.state._id===0){
                        console.log(this.state.id);
                        
                        this.setState(data.logo);
                        console.log("new id "+this.state.id);
                    }
                    data.logo=this.state;
                    return (
                        <Mutation mutation={UPDATE_LOGO} key={data.logo._id} onCompleted={() => this.props.history.push(`/`)}>
                            {(updateLogo, { loading, error }) => (
                                <div className="container">
                                    <div style={{width: "50%"}}>
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h4><Link to="/">Home</Link></h4>
                                            <h3 className="panel-title">
                                                Edit Logo
                                        </h3>
                                        </div>
                                        <div className="panel-body">                                            
                                            <form onSubmit={e => {
                                                e.preventDefault();
                                                updateLogo({ variables: {id:data.logo._id, text: text.value, color: color.value, fontSize: parseInt(fontSize.value),backgroundColor: backgroundColor.value,
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
                                                    }} placeholder="Text" defaultValue={data.logo.text} onChange={this.change}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="color">Color:</label>
                                                    <input type="color" className="form-control" name="color" ref={node => {
                                                        color = node;
                                                    }} placeholder="Color" defaultValue={data.logo.color} onChange={this.change}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="fontSize">Font Size:</label>
                                                    <input type="text" className="form-control" name="fontSize" ref={node => {
                                                        fontSize = node;
                                                    }} placeholder="Font Size" defaultValue={data.logo.fontSize} onChange={this.change}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="color">Background Color:</label>
                                                    <input type="color" className="form-control" name="backgroundColor" ref={node => {
                                                        backgroundColor = node;
                                                    }} placeholder="Color" defaultValue={data.logo.backgroundColor} onChange={this.change}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="color">Border Color:</label>
                                                    <input type="color" className="form-control" name="borderColor" ref={node => {
                                                        borderColor = node;
                                                    }} placeholder="Color" defaultValue={data.logo.borderColor} onChange={this.change}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="fontSize">Border Width:</label>
                                                    <input type="number" className="form-control" name="borderWidth" ref={node => {
                                                        borderWidth = node;
                                                    }} placeholder="Border Width" defaultValue={data.logo.borderWidth} onChange={this.change}/>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="fontSize">Border Radius:</label>
                                                    <input type="number" className="form-control" name="borderRadius" ref={node => {
                                                        borderRadius = node;
                                                    }} placeholder="Border Radius" defaultValue={data.logo.borderRadius} onChange={this.change}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="fontSize">Padding:</label>
                                                    <input type="number" className="form-control" name="padding" ref={node => {
                                                        padding = node;
                                                    }} placeholder="padding" defaultValue={data.logo.padding} onChange={this.change}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="fontSize">Margin:</label>
                                                    <input type="number" className="form-control" name="margin" ref={node => {
                                                        margin= node;
                                                    }} placeholder="margin" defaultValue={data.logo.margin} onChange={this.change}/>
                                                </div>
                                                <button type="submit" className="btn btn-success">Submit</button>
                                            </form>
                                            {loading && <p>Loading...</p>}
                                            {error && <p>Error :( Please try again</p>}
                                        </div>
                                    </div>
                                    </div>
                                    <LogoDisplay logo={data.logo}/>
                                </div>
                                
                            )}
                        </Mutation>
                    );
                }
                }
               
            </Query>
        );
    }
}

export default EditLogoScreen;