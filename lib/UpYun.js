/*
 * upyun class
 * author:huangchaosuper@gmail.com
 * date:May 4, 2014
 * ---------------------------------
 * 
 * 
 */
var Options = require('./Options');
var utils = require('./utils');
var fs =  require('fs');
var system = require('../package.json');

function UpYun(userName,password,bucketName) {
	this.options = new Options();
	this.options.userName = userName;
	this.options.password = password;
	this.options.bucketName = bucketName;
	this.version = system.version;
}

UpYun.prototype.uploadFileFromStream = function(data,uri,callback) {  //上传文件callback(err,resHeaders,resData);
	utils.action('PUT', uri, data, this.options, function(err,resHeaders,resData){
		callback(err,resHeaders,resData);
	});
}

UpYun.prototype.uploadFileFromLocal = function(fileFullName,uri,callback){//上传文件callback(err,resHeaders,resData);
	var data = fs.readFileSync(fileFullName);
	this.uploadFileFromStream(data, uri, function(err,resHeaders,resData){
		callback(err,resHeaders,resData);
	});
}
UpYun.prototype.downloadFileToStream = function(uri,callback){//下载文件callback(err,resHeaders,resData);
	utils.action('GET', uri, null, this.options, function(err,resHeaders,resData){
		callback(err,resHeaders,resData);
	});
}
UpYun.prototype.downloadFileToLocal = function(fileFullName,uri,callback){//下载文件callback(err,resHeaders,resData);
	this.downloadFileToStream(uri, function(err,resHeaders,resData){
		if(!resData){
			callback(err,resHeaders,resData);
		}else{
			fs.writeFile(fileFullName, resData, 'utf8', function(error) {
				callback(error||err,resHeaders,resData);
			});
		}
	});
}
UpYun.prototype.retrieveFileInformation = function(uri,callback){//获取文件信息callback(err,resHeaders,resData,resInformation{type,size,date});
	utils.action('HEAD', uri, null, this.options, function(err,resHeaders,resData){
		var resInformation = new Object();
		resInformation.type = resHeaders['x-upyun-file-type'];
		resInformation.size = resHeaders['x-upyun-file-size'];
		resInformation.date = resHeaders['x-upyun-file-date'];
		callback(err,resHeaders,resData,resInformation);
	});
}
UpYun.prototype.deleteFile = function(uri,callback){//删除文件callback(err,resHeaders,resData);
	utils.action('DELETE', uri, null, this.options, function(err,resHeaders,resData){
		callback(err,resHeaders,resData);
	});
}
UpYun.prototype.createDirectory = function(uri,callback){//创建文件夹callback(err,resHeaders,resData);
	this.options.headers.folder = true;
	utils.action('POST', uri, null, this.options, function(err,resHeaders,resData){
		callback(err,resHeaders,resData);
	});
}
UpYun.prototype.removeDirectory = function(uri,callback){//删除文件夹callback(err,resHeaders,resData);
	utils.action('DELETE', uri, null, this.options, function(err,resHeaders,resData){
		callback(err,resHeaders,resData);
	});
}
UpYun.prototype.listStructure = function(uri,callback){//获取目录文件列表信息callback(err,resHeaders,resData,resInformations[{name,type,size,date}]);
	utils.action('GET', uri, null, this.options, function(err,resHeaders,resData){
		var resInformations = new Array();
		if(resData.length>0){
			var items = resData.split('\n');
			for (var i=0;i<items.length;i++){
  				var elements = items[i].split('\t');
  				if(elements.length == 4){
	  				var element = new Object();
	  				element.name = elements[0];
	  				element.type = elements[1];
	  				element.size = elements[2];
	  				element.date = elements[3];
	  				resInformations.push(element);
	  			}
			}
		}
		callback(err,resHeaders,resData,resInformations);
	});
}
UpYun.prototype.retrieveCloudUsage = function(callback){//获取bucket空间使用信息callback(err,resHeaders,resData);
	utils.action('GET', '?usage', null, this.options, function(err,resHeaders,resData){
		callback(err,resHeaders,resData);
	});
}
UpYun.prototype.uploadImageFromStream = function(data,uri,callback){//上传图片callback(err,resHeaders,resData,resInformation);
	this.uploadFileFromStream(data, uri, function(err,resHeaders,resData){
		var resInformation = new Object();
		resInformation.width = resHeaders['x-upyun-width'];
		resInformation.height = resHeaders['x-upyun-height'];
		resInformation.frames = resHeaders['x-upyun-frames'];
		resInformation.type = resHeaders['x-upyun-file-type'];
		callback(err,resHeaders,resData,resInformation);
	});
}
UpYun.prototype.uploadImageFromLocal = function(fileFullName,uri,callback){//上传图片callback(err,resHeaders,resData,resInformation);
	var data = fs.readFileSync(fileFullName);
	this.uploadImageFromStream(data, uri, function(err,resHeaders,resData,resInformation){
		callback(err,resHeaders,resData,resInformation);
	});
}
module.exports = UpYun;