/*
 * system test class
 * author:huangchaosuper@gmail.com
 * date:May 3, 2014
 * ---------------------------------
 * 
 * 
 */
var assert = require("assert")

describe('system',function(){
	var UpYun = require("../lib/UpYun");
	var upyun = new UpYun();
	describe('version',function(){
		it('should be 0.0.7',function(){
			assert.equal('0.0.7',upyun.version);
		});
	})
});