var PostButton = React.createClass({
  sendRequest: function(){
    $.ajax({
      url: this.props.url,
      method: 'POST',
      success: function(data){
      }.bind(this),
      error: function(xhr, status, err){
        console.error(this.props.url, status, err.toString())
      }.bind(this)
    })
  },
  render: function(){
    return (
      <div onClick={this.sendRequest} className="ui button">
        {this.props.buttonText}
      </div>
      )
  }
});

var PostInput = React.createClass({
  sendPost: function(){
    if(this.state.input){
      var url = this.props.url + this.state.input;
      $.ajax({
        url: url,
        method: 'POST',
        success: function(data){
        }.bind(this),
        error: function(xhr, status, err){
          console.error(url, status, err.toString())
        }.bind(this)
      })
    }
  },
  listenChange: function(e){
    this.setState({input:e.target.value})
  },
  render: function(){
    return (
        <div className="ui action input">
          <input id={this.name}/>
          <div className="ui button" onClick="sendPost">
            {this.props.buttonText}
          </div>
        </div>
      )
  }
})

React.render(
  <PostButton url="controls/startinit" buttonText="Start Initial Nodes"/>,
  document.getElementById('startInit')
)

React.render(
  <PostButton url="controls/stopall" buttonText="Stop All Nodes"/>,
  document.getElementById('stopAll')
)

React.render(
  <PostInput url="controls/stop/" name="stopNode" buttonText="Stop Node"/>,
  document.getElementById('stopNode')
)

React.render(
  <PostInput url="controls/start/" name="startNode" buttonText="Start Node"/>,
  document.getElementById('startNode')
)
