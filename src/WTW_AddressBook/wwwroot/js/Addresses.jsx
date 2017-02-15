var Address = React.createClass({
    render: function () {
        return (
            <div className="address">
                <h2 className="nameAddress">
                    {this.props.name}
                </h2>
                {this.props.addressLineOne}
                {this.props.addresLineTwo}
                {this.props.city}{this.props.state}{this.props.zip}
                {this.props.country}
            </div>
        );
    }
});

var AddressList = React.createClass({
    render: function () {
        var addresses = this.props.data.map(function (address) {
            return (
                <Address name={address.name} key={address.id }>
                    {address.addressLineOne}
                    {address.addressLineTwo}
                    {address.city}{address.state}{address.zip}
                    {address.country}
                </Address>
            );
        });
        return (
            <div className="addressList">
                {addresses}
            </div>
        );
    }
});

var AddressForm = React.createClass({
    getInitialState: function() {
        return {
            name: '', addressLineOne: '', addressLineTwo: '',
            city: '', state: '', zip: '', country: ''
        };
    },
    handleNameChange: function (e) {
        this.setState({ name: e.target.value });
    },
    handleAddressLineOneChange: function(e) {
        this.setState({addressLineOne: e.target.value});
    },
    handleAddressLineTwoChange: function (e) {
        this.setState({ addressLineTwo: e.target.value });
    },
    handleCityChange: function (e) {
        this.setState({ city: e.target.value });
    },
    handleStateChange: function (e) {
        this.setState({ state: e.target.value });
    },
    handleZipChange: function (e) {
        this.setState({ zip: e.target.value });
    },
    handleCountryChange: function (e) {
        this.setState({ country: e.target.value });
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var name = this.state.name.trim();
        var addressLineOne = this.state.addressLineOne.trim();
        var addressLineTwo = this.state.addressLineTwo.trim();
        var city = this.state.city.trim();
        var state = this.state.state.trim();
        var zip = this.state.zip.trim();
        var country = this.state.country.trim();
        
        if(!name) {
            return;
        }

        this.props.onCommentSubmit({
            name: name, addressLineOne: addressLineOne, addressLineTwo: addressLineTwo,
            city: city, state: state, zip: zip, country: country
        })

        this.setState( {
            name: '', addressLineOne: '', addressLineTwo: '',
            city: '', state: '', zip: '', country: ''
        });
    },
    render: function () {
        return (
        <form className="addressForm">
            <input type="text" 
                   placeholder="Name" 
                   value="this.state.name"
                   onChange={this.handleNameChange}
                   />
            <input type="text" 
                   placeholder="Address Line One"
                   value="this.state.addressLineOne"
                   onChange={this.handleAddressLineOneChange}
                   />
            <input type="text" 
                   placeholder="Address Line Two"
                   value="this.state.addressLineTwo"
                   onChange={this.handleAddressLineTwoChange}
                   />
            <input type="text" 
                   placeholder="City"
                   value="this.state.city"
                   onChange={this.handleCityChange}
                   />
            <input type="text" 
                   placeholder="State"
                   value="this.state.state"
                   onChange={this.handleStateChange}
                   />
            <input type="text" 
                   placeholder="Zip" 
                   value="this.state.zip"
                   onChange={this.handleZipChange}
                   />
            <input type="text" 
                   placeholder="Country" 
                   value="this.state.country"
                   onChange={this.handleCountryChange}
                   />
            <input type="submit" value="Add Address" />
        </form>
        );
    }
});


var AddressBox = React.createClass({
    loadAddresses: function() {
        var xhr = new XMLHttpRequest();
        xhr.open('get', this.props.url, true);
        xhr.onload = function() {
            var data = JSON.parse(xhr.responseText);
            this.setState({ data: data });
        }.bind(this);
        xhr.send();
    },
    handleAddressSubmit: function(address) {
        var data = new FormData();
        data.append('name', address.name);
        data.append('addressLineOne', address.addressLineOne);
        data.append('addressLineTwo', address.addressLineTwo);
        data.append('city', address.city);
        data.append('state', address.state);
        data.append('zip', address.zip);
        data.append('country', address.country);

        var xhr = new XMLHttpRequest();
        xhr.open('post', this.props.submitUrl, true);
        xhr.onload = function () {
            this.loadAddresses();
        }.bind(this);
        xhr.send(data);
    },
    getInitialState: function() {
        return {data: []};
    },
    componentDidMount: function() {
        this.loadAddresses();
        window.setInterval(this.loadAddresses, this.props.pollInterval);
    },
    render: function () {
        return (
            <div className="addresBox">
                <h1>Addresses</h1>
                <AddressList data={this.state.data} />
                <AddressForm onAddressSubmit={this.handleAddressSubmit}/>
            </div>
        );
    }
});

ReactDOM.render(
    <AddressBox url="/api/addresses" submitUrl="api/addresses" pollInterval={3000} />,
    document.getElementById('content')
);