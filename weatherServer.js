var http = require('http');
var fs = require('fs');
var formidable = require('formidable')
var url = require('url')

http.createServer(function(req, res){

	var path = req.url
	var q = url.parse(path,true)
	var filename = "." + q.pathname


	if(path == '/uploadFile')
	{
		
		var form = new formidable.IncomingForm()
		form.parse(req, function(err, fields, files){
			var oldpath = files.filetoupload.path;
			var newpath = "C:/Users/Ndupu Adaeze/Desktop/js/projects/api/weather_project/uploads/" + files.filetoupload.name

			fs.rename(oldpath, newpath, function(err){
				if(err) throw err;
			res.write('Successfully uploaded file')
			res.end();
		})
			})

	}

	else if(path == '/home')
	{

		res.write('<p> This application consists of a server that takes in paths for weather app, login page and a home page. it also takes in path for an upload .html file, which aids file uploads and saves it in')
		res.write(' a folder called uploads. In our node js sessions in codecenter we have talked about modules, dependencies, npm, yarn, installations of modules not built in as well.</p>')
		return res.end()
	}

	else if(path == '/login')
	{
		res.write('<form action="" method="post" style="text-align:center;padding-top:20%"><h1>LOGIN PAGE</h1>')
		res.write('<h3>Please enter your login details</h3>')
		res.write('<p>Username: <input type="text" name="uname" placeholder="Enter Username"/></p>')
		res.write('<p>Password: <input type="password" name="pword" placeholder="Enter Password"/></p>')
		res.write('<input type="submit" name="submit" value="LOGIN"/></form>')
	}
else 
{
	fs.readFile(filename,function(err, data){
		if(err){
		res.writeHead(404,{'Content-Type':'text/html'})
		return res.end('404 Error. Page Not Found.')
		}

		res.writeHead(200,{'Content-Type':'text/html'})

		res.write(data)
		return res.end()
})
	
}
}).listen(3000)
