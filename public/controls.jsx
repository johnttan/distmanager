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

React.render(
  <PostButton url="controls/startinit" buttonText="Start Initial Nodes"/>,
  document.getElementById('startInit')
)

React.render(
  <PostButton url="controls/stopall" buttonText="Stop All Nodes"/>,
  document.getElementById('stopAll')
)
