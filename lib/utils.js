/*
 * utils class
 * author:huangchaosuper@gmail.com
 * date:May 1, 2014
 * ---------------------------------
 * @param md5 MD5加密
 * @param sign UPYUN签名
 * @param action 通讯层封装函数
 * 
 */
 var crypto = require('crypto');
 var http = require('http');
 var logger = require('./logger');
 var utils = {
 	md5:function(source){
 		var md5sum = crypto.createHash('md5');
 		md5sum.update(source, 'utf8');
 		return md5sum.digest('hex');
 	},
 	sign:function(username,password,method, uri, date, length){
 		var sign = method + '&' + uri + '&' + date + '&' + length + '&' + utils.md5(password);
 		return 'UpYun ' + username + ':' + utils.md5(sign);
 	},
 	action:function(method, uri, data, opts, callback){//callback(err,resHeaders,resData);
 		logger.debug('hc:'+opts);
 		var path = '/' + opts.bucketName + '/' + uri;
 		logger.debug(path);
 		var length = data ? (Buffer.isBuffer(data) ? data.length : Buffer.byteLength(data)) : 0;
 		var date = (new Date()).toUTCString();
 		opts.headers.Date = date;
 		if ((data !== null)&&opts.md5 == true) {
        	opts.headers['Content-MD5'] = utils.md5(data);
    	}
 		opts.headers['Content-Length'] = length;
 		opts.headers.Authorization = utils.sign(opts.userName,opts.password,method, path, date, length);
 		opts.headers.Host = opts.domain;
 		var options = {
 			hostname: opts.domain,
 			method: method,
 			path: path,
 			headers:opts.headers,
 		};
 		logger.debug(opts.headers);
 		var resData = '';
 		var req = http.request(options, function(res) {
	        // Hander request
	        res.setEncoding('utf8');
	        res.on('data', function (chunk) {
	        	resData += chunk;
	        });
	        res.on('end', function() {
	        	logger.debug(res.headers);
	        	callback(res.statusCode,res.headers,resData);
	        });
	    });

		req.on('error', function(e) {
			if (typeof callback == 'function') {
				callback(e, null, null);
			}
		});

		data && req.write(data);
		req.end();
	},
};

module.exports = utils;
