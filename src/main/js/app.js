'use strict';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Radium from 'radium';
 
const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');
 
//This is the App that ReactDom.render calls.
//Each class becomes its own html "tag" just like <h1> or <div> or <p> et cetera
//For example, class App becomes <App></App>
class App extends React.Component {
 
    //We render the object as an HTML tag and set its value to the list of bDtoes retrieved from componentDidMount()
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={BDtoList}></Route>
                    <Route exact path="/write_view" component={Write}></Route>
                    <Route exact path ="/bDtoes/:id" component={Update}></Route>
                </div>
            </Router>
        )
    }  
}
//<Route path="/" component={BDtoList}></Route>
//<BDtoList bDtoes={this.state.bDtoes}/>
 
class BDtoList extends React.Component{
    //This constructor sets the state as an empty object called bDToes.
    //Javascript is dynamically typed, variables do not have a strict datatype
    //You can define an object as empty/null and then define its type when you initiate it and fill it with data.
    //Eg. Var data = '' has no type yet
    //data = "string" now has a type of string because you fill it with a string value
    constructor(props) {
        super(props);
        this.state = {bDtoes: []};
    }
   
    //When this page is loaded, it GETs the JSON data from localhost:8181/bDtoes
    //Then we set the state to the JSON response from our GET request.
    componentDidMount() {
        client({method: 'GET', path: '/bDtoes'}).done(response => {
            this.setState({bDtoes: response.entity._embedded.bDtoes});
        });
    }
       
    handleDelete = (bid) => {
        var bdata = {
                "bid": bid
        }
       
        fetch('http://localhost:8181/bDtoes/' + bid, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(bdata)
        })
        //.then(response => alert(response.text))
        .then(response => this.setState(prevState => ({bDtoes: prevState.bDtoes.filter(bdto => bdto.bid !== bid)})))
        //this.forceUpdate();
        //this.state.bDtoes.forEach(bdto => console.log(bdto.bid));
    }  
 
    render() {
        const TitleRow = {
            backgroundColor: "black",
            paddingTop: "12px",
            paddingBottom: "12px",
            backgroundColor: "purple",
            color: "white"
        }
 
        const Table = {
            margin: "auto",
            width: "60%",
            padding: "10px",
            border: "1px solid #ddd"
        }
       
        //bDtoes will render each BDto which itself will render the bid, bname, and btitle values in the database
        const bDtoes = this.state.bDtoes.map(bdto =>
//          <BDto key={bdto.bid} bdto={bdto}/>
            <BDto key={bdto._links.self.href} bdto={bdto} onDelete={this.handleDelete}/>
        );
       
        return (
            <div>
                <table style={Table}>
                    <tbody>
                        <tr style={TitleRow}>
                            <th>Number</th>
                            <th>Name</th>
                            <th>Title</th>  
                            <th>Date</th>
                            <th>Delete</th>
                        </tr>
                        {bDtoes}
                    </tbody>
                    <Link to="/write_view">WRITE</Link>
                </table>
            </div>
        )  
    }
}
     
class BDto extends React.Component{
 
    handleClick = () => this.props.onDelete(this.props.bdto.bid)
   
    render() {
        const Rows = {
            backgroundColor: "white",
 
            ':hover': {
                backgroundColor: "#ddd",
            }
        }
 
        return (
            <tr style={Rows}>
                <td>{this.props.bdto.bid}</td>
                <td>{this.props.bdto.bname}</td>
                <td><Link to={"/bDtoes/" + this.props.bdto.bid}>{this.props.bdto.btitle}</Link></td>
                <td>{this.props.bdto.bdate}</td>
                <td><button onClick={this.handleClick}>DELETE</button></td>
            </tr>
        )
    }
}
 
class Write extends React.Component {
    /*constructor(props) {
        super(props);
        this.state = {bDto: []};
    }
   
    componentDidMount() {
        client({method: 'GET', path: '/bDtoes/' + this.props.match.params.id }).done(response => {
            this.setState({bDto: response.entity.bname});
        });
    }*/
 
    handleChange = (e) => {
        console.log(e.target.name + " ***** " + e.target.value);
        this.setState({
            [e.target.name]: e.target.value,
        });
    }
   
    handleClick = () => {
        var data = {
                "bname": this.state.bName,
                "btitle": this.state.bTitle,
                "bcontent": this.state.bContent
        }
       
        console.log(data);
        /*data.set('bname', this.state.bName);
        data.set('btitle', this.state.bTitle);
        data.set('bcontent', this.state.bContent);*/
       
        fetch('http://localhost:8181/bDtoes', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        })
        //.then(response => response.text())
        //.then(response => alert(response))
       
        this.props.history.push("/");
    }
   
   
    /*
     * delete = () => {
     *  fetch('http://localhost:8181/bDtoes/' + this.state.bid, {
     * method: 'DELETE'
     * }
     */
//  handleDelete = () => {
//      var data = {
//              "bid": this.state.bId
//      }
//     
//      fetch('http://localhost:8181/bDtoes', {
//          method: 'DELETE',
//          body: JSON.stringify(data),
//          headers: {'Content-Type': 'application/json'}
//      })
//      .then(function(response) {
//          console.log(response.json())
//          return response.json();
//      })
//  }
   
    render() {
    //Console.log(this.state.bDto);
    return(
        <div>
        <table width="500" cellPadding="0" cellSpacing="0" border="1">
            <tbody action="write" method="post">
                <tr>
                    <td>Name</td>
                    <td>
                        <input
                            type="text"
                            name="bName"
                            size="50"
                            onChange={this.handleChange}>
                        </input>
                    </td>
                </tr>
                <tr>
                    <td>Title</td>
                    <td>
                        <input
                            type="text"
                            name="bTitle"
                            size="50"
                            onChange={this.handleChange}>
                        </input>
                    </td>
                </tr>
                <tr>
                    <td>Content</td>
                    <td>
                        <textarea
                            name="bContent"
                            rows="10"
                            onChange={this.handleChange}>
                        </textarea>
                    </td>
                </tr>
                <tr>
                <td colSpan="2"><button type="submit" onClick={this.handleClick}>INPUT</button></td>           
                </tr>
            </tbody>
        </table>
        </div>
        )
    }
}
 
 
class Update extends React.Component {
    constructor(props) {
        super(props);
        this.state = {bname: [], btitle: [], bcontent: []};
        //this.state = {bid: [] };
    }
   
    componentDidMount() {
        client({method: 'GET', path: '/bDtoes/' + this.props.match.params.id }).done(response => {
            this.setState({bname: response.entity.bname, btitle: response.entity.btitle, bcontent: response.entity.bcontent})
            //this.setState({bDto: response.entity});
        });
        //console.log(this.state.bDto.bid);
    }
 
    handleChange = (e) => {
        //console.log(e.target.name + " ***** " + e.target.value);
        this.setState({
            [e.target.name]: e.target.value,
        });
    }
   
    handleClick = () => {
        var data = {
                "bname": this.state.bname,
                "btitle": this.state.btitle,
                "bcontent": this.state.bContent
        }
       
        console.log(data);
        /*data.set('bname', this.state.bName);
        data.set('btitle', this.state.bTitle);
        data.set('bcontent', this.state.bContent);*/
       
        fetch('http://localhost:8181/bDtoes', {
            method: 'UPDATE',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        })
       
        this.props.history.push("/");
    }
 
    render() {
    //Console.log(this.state.bDto);
    return(
        <div>
        <table width="500" cellPadding="0" cellSpacing="0" border="1">
            <tbody action="write" method="post">
                <tr>
                    <td>Name</td>
                    <td>
                        <input
                            type="text"
                            name="bName"
                            value={this.state.bname}
                            size="50"
                            onChange={this.handleChange}>
                        </input>
                    </td>
                </tr>
                <tr>
                    <td>Title</td>
                    <td>
                        <input
                            type="text"
                            name="bTitle"
                            value={this.state.btitle}
                            size="50"
                            onChange={this.handleChange}>
                        </input>
                    </td>
                </tr>
                <tr>
                    <td>Content</td>
                    <td>
                        <textarea
                            name="bContent"
                            rows="10"
                            value={this.state.bcontent}
                            onChange={this.handleChange}>
                        </textarea>
                    </td>
                </tr>
                <tr>
                <td colSpan="2"><button type="submit" onClick={this.handleClick}>INPUT</button></td>           
                </tr>
            </tbody>
        </table>
        </div>
        )
    }
}
//this renders the Application in index.html
//Consider this as the "main method" of your React project - i.e. it is the entry point of your application
ReactDOM.render(
        <App />,
    document.getElementById('react')
)
 
//module.exports = Radium(Rows);