1. App.js
import React, { Component } from 'react';
import PhoneForm from './components/PhoneForm';
import PhoneInfoList from './components/PhoneInfoList';

class App extends Component {

  id = 0;

  state = {
    information: [],
  }

  handleCreate = (data) => {
    const { information } = this.state;
    this.setState({
      information: information.concat({
        ...data,
        id: this.id++
      })
    });
  }

  handleRemove = (id) => {
    const { information } = this.state;
    this.setState({
      information: information.filter(info => info.id !== id)
    });
  }

  render() {
    return (
      <div>
        <PhoneForm onCreate={this.handleCreate}/>
        <PhoneInfoList 
          data={this.state.information}
          onRemove={this.handleRemove}
        />
      </div>
    );
  }
}

export default App;

2. PhoneForm.js
import React, { Component } from 'react';

class PhoneForm extends Component {

    state = {
        name: '',
        phone: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = (e)=> {
        e.preventDefault();
        this.props.onCreate(this.state);
        // this.props.onCreate({
        //     name: this.state.name,
        //     phone: this.state.phone
        // });
        this.setState({
            name:'',
            phone: '',
        })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input 
                    name="name"
                    placeholder="Name" 
                    onChange={this.handleChange} 
                    value={this.state.name}
                />
                <input 
                    name="phone"
                    placeholder="Phone Name"
                    onChange={this.handleChange}
                    value={this.state.phone}
                />
                <button type="submit">REGISTER</button>
            </form>
        );
    }
}

export default PhoneForm;

3. PhoneInfo.js
import React, { Component } from 'react';

class PhoneInfo extends Component {

    handleRemove = () => {
        const { info, onRemove } = this.props;
        onRemove(info.id);
    }

    render() {
        const { name, phone } = this.props.info;

        const style = {
            border: '1px solid black',
            padding: '8px',
            margin: '8px'
        };

        return (
            <div style={style}>
                <div><b>{name}</b></div>
                <div>{phone}</div>
                <button onClick={this.handleRemove}>DELETE</button>
            </div>
        );
    }
}

export default PhoneInfo;

4. PhoneInfoList.js
import React, { Component } from 'react';
import PhoneInfo from './PhoneInfo';

class PhoneInfoList extends Component {

    static defaultProps = {
        data: []
    }

    render() {
        const { data, onRemove } = this.props;

        const list = data.map(
            info => (
                <PhoneInfo 
                    onRemove={onRemove}
                    info={info} 
                    key={info.id}
                />
            )
        );
        return (
            <div>
                {list}
            </div>
        );
    }
}

export default PhoneInfoList;
