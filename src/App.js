import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './style.css';
 function Rating(props) {
   console.log("here it come");
  // return(
  //    props.rating>3000?
  //    <div>
  //    <Sert handle= {props.handle} rating ={props.rating} src={props.src }/>
  //    </div>
  //    :<h1> </h1>
  // )

  return(
    <Sert name={props.name} handle= {props.handle} rating ={props.rating} src={props.src }/>
  )
}


class Sert extends React.Component {
  state = {
    subm:[],
  }
  funct() {
    //console.log(props)
    console.log(this.state)
   // console.log('your second button click is working',props);
    fetch('http://codeforces.com/api/user.status?handle=' + this.props.handle)
        .then(submissions => submissions.json())
        .then(response => {
          //console.log(response.result);
          let subm = response.result;
          this.setState({ subm:subm });
          
        })
        .catch((e) => {
          console.log(e)
        });   
  }
  render() {
    return (
      <div class="container">
      <div class="well">
      <div class="media">
        <a class="pull-left"></a>
    <img class="media-object" src={this.props.src} alt=" "></img>
      <div class="media-body">
        <h4 class="media-heading">{this.props.handle}</h4>
          <p class="text-right"></p>
          <p>{this.props.name}</p>
          <ul class="list-inline list-unstyled">
        <li><span><i class="glyphicon glyphicon-calendar"></i> {this.props.rating} </span></li>
            <li>|</li>
            <span><i class="glyphicon glyphicon-comment"></i> 0 blogs</span>
            <li>|</li>
            <li>
                       <span class="glyphicon glyphicon-star"></span>
                        <span class="glyphicon glyphicon-star"></span>
                        <span class="glyphicon glyphicon-star"></span>
                        <span class="glyphicon glyphicon-star"></span>
                        <span class="glyphicon glyphicon-star"></span>
            </li>
            <li>|</li>
            <li>
              <span><i class="fa fa-facebook-square"></i></span>
              <span><i class="fa fa-twitter-square"></i></span>
              <span><i class="fa fa-google-plus-square"></i></span>
            </li>
            <button onClick = {() => this.funct(this.props)} > click here  </button>
  
            <div>
              {
                this.state.subm.map((A,i) => {
                  return (
                    <div key={i}>
                    <div class="container">
             
                <div class="text-block">
                 <p>    {A.problem.name} '#' {A.problem.tags}  '#'  {A.verdict}   </p>
                       </div>
                        </div>
                     
                    
                    </div>
                  )
                })
              }
            </div>
      </ul>
    </div>
    </div>
  </div>
  </div>
  );
  }
}

function Compo(props)
{
     return(
       <div>
       <div className="flex-container">
      <div className="d-inline p-2 bg-dark text-white">  {props.handle} </div> <br/>
      <div className="d-inline p-2 bg-dark text-white"> {props.rating}</div><br/>
      <div className="d-inline p-2 bg-dark text-white">  {props.rank} </div><br/>
     
      </div>
      <Photo titlephoto={props.src} handle={props.handle} className="float-right"/>  <br/>
      </div>
     )
     }

function Photo(props)
{
  return (
   <div>
<img className="div1" src={props.titlephoto} alt={props.handle}/>
</div>
  )
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
   
      result:[],
      submission:[]
     };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
    
    
  }
  
 handleClick()
{
  console.log('your button click is working');
  // fetch('http://codeforces.com/api/user.ratedList?activeOnly=true')
  fetch('http://codeforces.com/api/user.info?handles=tourist;Petr;pratsy;fateice;Syloviaely;Radewoosh;Um_nik;LHiC;dotorya;mnbvmar;rajat_jain;panjiara_2114')
      .then(results => results.json())
      .then(response => {
            //console.log(response.result);
        let users = response.result;
        console.log(users);
        this.setState(
          {
            result: users
          }
        );
      })
      .catch((e) => {
        console.log(e)
      });   
}

render() {
  return (
    <div className="App">
        
        
        <button onClick = {this.handleClick} > click here  </button>
        {
          
          
        this.state.result.map((A,i) => {
        return (
          
            <div key={i}>

              <Rating   name={A.lastName} handle= { A.handle} rating ={ A.rating } src={A.titlePhoto}  ></Rating>
           
            </div>
          
        );
      })
      }
    
    </div>
  );
}
}
export default App;