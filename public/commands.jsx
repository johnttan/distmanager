var CommandsList = React.createClass({
  getInitialState: function(){
    console.log('initializing')
    return {commands: [], visible:true}
  },
  loadCommands: function(){
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data){
        console.log(data);
        this.setState({commands: data})
      }.bind(this),
      error: function(xhr, status, err){
        console.error(this.props.url, status, err.toString())
      }.bind(this)
    })
  },
  componentDidMount: function(){
    this.loadCommands();
  },
  handleClick: function(){
    var visibility = !this.state.visible;
    this.setState({visible:visibility});
  },
  render: function(){
    var commandNodes = [];
    if(this.state.visible){
      for(var name in this.state.commands){
        var current = this.state.commands[name];
        commandNodes.push(
          <Command name={current.name} dir={current.dir} args={current.args}>
          </Command>
        )
      }
    };

    return (
      <div>
        <div className="ui header">
          List of Commands
          <div onClick={this.handleClick} className="ui red inverted right attached button">
            Show
          </div>
        </div>

        <div className="commands ui list">
          {commandNodes}
        </div>
      </div>
    )
  }
});

var Command = React.createClass({
  render: function(){
    return (
      <div className="item">
        <div className="ui header">
          {this.props.name}
        </div>
        <div className="ui small header">
          root directory: {this.props.dir}
        </div>
          arguments: {JSON.stringify(this.props.args)}
        </div>
      )
  }
});

React.render(
  <CommandsList url="controls/listcommands"/>,
  document.getElementById('commandList')
)
