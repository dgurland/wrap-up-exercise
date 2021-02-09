import { Menu, Dropdown } from 'antd';
//import './App.css';
import 'antd/dist/antd.css';
import { Component } from 'react';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      menuItems:[],
      isLoaded: false,
    }
  }


  menu = () => {

    const { SubMenu } = Menu;

    let items = this.state.menuItems;
    return (
    <Menu>
      {items.map((item, i)=> {
        return(
          <SubMenu title={item.name} key={i}>
      <Menu.Item>3rd menu item</Menu.Item>
      <Menu.Item>4th menu item</Menu.Item>
    </SubMenu>
        )
      })}
    </Menu>
  );
    }
  
  componentDidMount() {
    fetch(" https://xc-ajax-demo.herokuapp.com/api/countries/")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            menuItems: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }



  render(){
    return(
      this.state.isLoaded ? (
    <div className="App">
      <Dropdown className = "dropdown" overlay={this.menu()} placement="bottomLeft" trigger="click">
      <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
      Dropdown Menu
    </a>
      </Dropdown>
    </div> ) : <div><h1>Fetching data...</h1></div>
    )
  };


 
}

export default App;
