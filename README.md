Express middleware to render a message and redirect with the meta refresh tag.

Most of the time a 3XX status code with a location header (i.e. __res.redirect__) works, but sometimes it will be just useful to __rend__er a message before redirecting.

## Install

	npm install rendirect

## Usage

~~~javascript

//install the middleware
app.configure(function(){
  this.use(rendirect());
});

//rendirect
app.get('/', function (req, res){
  res.rendirect({
  	wait: 5, 
  	message: 'redirecting to the login', 
  	url: '/login'
  });
});
~~~

### Custom template

~~~javascript
  this.use(rendirect({view: 'myrendirectpage'}));
~~~

## License 
	
MIT - José F. Romaniello - 2013