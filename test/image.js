/*
 * test class
 * author:huangchaosuper@gmail.com
 * date:May 3, 2014
 * ---------------------------------
 * 
 * 
 */
var assert = require("assert");
var UpYun = require("../lib/UpYun");
var fs =  require('fs');
describe('UPYUN-image',function(){
	this.timeout(15000);
	var upyun = new UpYun();
	beforeEach(function(){
		upyun.options.userName = "huangchaosuper";
		upyun.options.password = "huangchaosuper";
		upyun.options.bucketName = "huangchaosuper-image";
	});
	describe('imageFixWidth',function(){
		it('should success return 200',function(done){
			upyun.options.imageFixWidth(100);
			upyun.uploadImageFromLocal('image.png','image1.png',function(err,resHeaders,resData,resInfomration){
				assert.equal(96,resInfomration.width);
				assert.equal(96,resInfomration.height);
				assert.equal(1,resInfomration.frames);
				assert.equal('PNG',resInfomration.type);
				assert.equal(200,err);
				done();
			});
		});
		it('should success return 200',function(done){
			upyun.options.imageFixWidth(10);
			upyun.uploadImageFromLocal('image.png','image1.png',function(err,resHeaders,resData,resInfomration){
				assert.equal(10,resInfomration.width);
				assert.equal(10,resInfomration.height);
				assert.equal(1,resInfomration.frames);
				assert.equal('PNG',resInfomration.type);
				assert.equal(200,err);
				done();
			});
		});
	});
	describe('imageFixBoth',function(){
		it('should success return 200',function(done){
			upyun.options.imageFixBoth(100,30);
			upyun.uploadImageFromLocal('image.png','image1.png',function(err,resHeaders,resData,resInfomration){
				assert.equal(100,resInfomration.width);
				assert.equal(30,resInfomration.height);
				assert.equal(1,resInfomration.frames);
				assert.equal('PNG',resInfomration.type);
				assert.equal(200,err);
				done();
			});
		});
		it('should success return 200',function(done){
			upyun.options.imageFixBoth(50,40);
			upyun.uploadImageFromLocal('image.png','image1.png',function(err,resHeaders,resData,resInfomration){
				assert.equal(50,resInfomration.width);
				assert.equal(40,resInfomration.height);
				assert.equal(1,resInfomration.frames);
				assert.equal('PNG',resInfomration.type);
				assert.equal(200,err);
				done();
			});
		});
	});
});

