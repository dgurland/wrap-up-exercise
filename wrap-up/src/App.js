import { Menu, Dropdown, Button, Form, Input, Radio } from 'antd';
//import './App.css';
import 'antd/dist/antd.css';
import { Component } from 'react';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      menuItems:[],
      subItems: [],
      isLoaded: false,
    }
    [useCountry, setUseCountry] = useState(false);
  }

  fetchSubItems = (code) => {
    
    fetch("https://xc-ajax-demo.herokuapp.com/api/countries/" + code + "/states/")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          this.setState({
            ...this.state,
            subMenuItems: result
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
    let subItems = this.state.subItems;
    console.log(items);
    return (
    <Menu triggerSubMenuAction="click" >
      {items.map((item, i)=> {
        return(
          <SubMenu title={item.name} key={i} onTitleClick={()=>{this.fetchSubItems(item.code)}}>
            {this.state.subItems.map((item, i) => {
              return(
                <Menu.Item>{item.name}</Menu.Item>
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
    console.log(values);

    let postBody = {
      name: values.name,
      id: values.type == "countries" ? this.state.menuItems.length + 1 : this.state.subItems.length + 1,
      code: values.code
    }

    if(values.type == "state"){
      postBody = {
        ...postBody,
        countryId: values.countryId,
      }
    }


    fetch("https://xc-ajax-demo.herokuapp.com/api/" + values.type + "/", {
      method: "POST",
      headers: {
        ...postBody,
      }
    })
    .then(response => {
      this.fetchItems();
    })
    .catch(error => {
      console.log(error);
    });
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
      <div>
      <Form
      name="add"
      initialValues={{
        type: "countries",
      }}
      onFinish={this.onFinish}
    >
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

      <Form.Item name="countryId" label="Country" hidden={this.useCountry}>
        <Radio.Group>
          {this.state.menuItems.map((item, i)=> {
        return(
            <Radio value={item.id}>{item.name}</Radio>
          )}
          )}
        </Radio.Group>
      </Form.Item>

      
      <Form.Item name="type" label="Item Type">
        <Radio.Group onChange={() => this.setUseCountry(!this.useCountry)}>
          <Radio value="countries">Country</Radio>
          <Radio value="states">State</Radio>
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
