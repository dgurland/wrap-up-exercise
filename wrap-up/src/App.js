import { Menu, Dropdown, Button, Form, Input, Radio } from 'antd';
import './App.css';
import 'antd/dist/antd.css';
import { Component } from 'react';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      menuItems:[],
      subItems: [],
      isLoaded: false,
      hideCountry: true,
    }
  }

  fetchSubItems = (code) => {

    
    fetch("https://xc-ajax-demo.herokuapp.com/api/countries/" + (code ? code + "/" : "") + "states/")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            ...this.state,
            subItems: result
          });
        },
        (error) => {
          this.setState({
            error
          });
        }
      )

  }

  fetchItems = () => {
    fetch(" https://xc-ajax-demo.herokuapp.com/api/countries/")
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          ...this.state,
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

  menu = () => {

    const { SubMenu } = Menu;

    let items = this.state.menuItems;
    return (
    <Menu triggerSubMenuAction="click" >
      {items.map((item, i)=> {
        return(
          <SubMenu className="submenu" title={item.name} key={i} onTitleClick={()=>{this.fetchSubItems(item.code)}}>
            {this.state.subItems.map((item, i) => {
              return(
                <Menu.Item key={i}>{item.name}</Menu.Item>
              )
            })}
    </SubMenu>
        )
      })}
    </Menu>
  );
    }
  
  componentDidMount() {
    this.fetchItems();
  }

  onFinish = (values) => {

    let postBody = {
      name: values.name,
      code: values.code
    }

    if(values.type == "states"){
      this.fetchSubItems(null);
      postBody = {
        ...postBody,
        countryId: values.countryId,
        id: this.state.subItems.length + 1,
      }
    }

    else {
      postBody = {
        ...postBody,
        id: this.state.menuItems.length,
      }
    }

    console.log(postBody)

    fetch("https://xc-ajax-demo.herokuapp.com/api/" + values.type + "/", {
      method: 'POST',
      body: JSON.stringify(postBody),
      headers: {'Content-Type': 'application/json',
      dataType: "json",}
    })
    .then(response => {
      this.fetchItems();
      return response.json;
    })
    .catch(error => {
      console.log(error);
    });
  }


  render(){
    return(
      this.state.isLoaded ? (
    <div className="App">
      <Dropdown.Button className = "dropdown" overlay={this.menu()} placement="bottomLeft" trigger="click">
      <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
      View States
    </a>
      </Dropdown.Button>
      <div>
      <Form
      name="add"
      initialValues={{
        type: "countries",
      }}
      onFinish={this.onFinish}
    >
      <h3>Add New Country or State</h3>
      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Code"
        name="code"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      
      <Form.Item name="type" label="Item Type">
        <Radio.Group onChange={() => this.setState({...this.state, hideCountry: !this.state.hideCountry})}>
          <Radio value="countries">Country</Radio>
          <Radio value="states">State</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item name="countryId" label="Country" hidden={this.state.hideCountry} required={!this.state.hideCountry}>
        <Radio.Group>
          {this.state.menuItems.map((item, i)=> {
        return(
            <Radio key={i} value={item.id}>{item.name}</Radio>
          )}
          )}
        </Radio.Group>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
      </div>
    </div> ) : <div><h1>Fetching data...</h1></div>
    )
  };


 
}

export default App;
