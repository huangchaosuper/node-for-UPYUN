/*
 * test class
 * author:huangchaosuper@gmail.com
 * date:May 3, 2014
 * ---------------------------------
 * 
 * 
 */
var assert = require("assert")

describe('UPYUN-files',function(){
	this.timeout(15000);
	var UpYun = require("../lib/UpYun");
	var upyun = {};
	beforeEach(function(){
		upyun = new UpYun("huangchaosuper","huangchaosuper","huangchaosuper-files");
	});
	describe('upload',function(){
		it('should success return 200',function(done){
			upyun.uploadFileFromLocal('README.md','README.md1',function(err,resHeaders,resData){
				assert.equal(200,err);
				done();
			});
		});
		it('should success return 200',function(done){
			upyun.uploadFileFromStream('README.md','README.md2',function(err,resHeaders,resData){
				assert.equal(200,err);
				done();
			});
		});
	});
	describe('download',function(){
		it('should success return 200',function(done){
			upyun.downloadFileToLocal('README.md.test','README.md1',function(err,resHeaders,resData){
				assert.equal(200,err);
				done();
			});
		});
		it('should success return 200',function(done){
			upyun.downloadFileToStream('README.md2',function(err,resHeaders,resData){
				assert.equal(200,err);
				assert.notEqual(resData.length,0);
				done();
			});
		});
	});
	describe('information',function(){
		it('should success return 200',function(done){
			upyun.retrieveFileInformation('README.md1',function(err,resHeaders,resData,resInformation){
				assert.equal(200,err);
				done();
			});
		});
		it('should return file information',function(done){
			upyun.retrieveFileInformation('README.md2',function(err,resHeaders,resData,resInformation){
				assert.equal(resInformation.type,'file');
				assert.equal(resInformation.size,9);
				assert.ok(resInformation.date);
				done();
			});
		});
	});
	describe('delete file',function(){
		it('should success return 200',function(done){
			upyun.uploadFileFromLocal('README.md','README.md',function(err,resHeaders,resData){
				assert.equal(200,err);
				done();
			});
		});
		it('should success return 200',function(done){
			upyun.deleteFile('README.md',function(err,resHeaders,resData){
				assert.equal(200,err);
				done();
			});
		});
		it('should not return file information',function(done){
			upyun.retrieveFileInformation('README.md',function(err,resHeaders,resData,resInformation){
				assert.ifError(resInformation.type);
				assert.ifError(resInformation.size);
				assert.ifError(resInformation.date);
				done();
			});
		});
	});
	describe('Directory Operate',function(){
		describe('Create Directory',function(){
			it('should success return 200',function(done){
				upyun.createDirectory('README/md',function(err,resHeaders,resData){
					assert.equal(200,err);
					upyun.options.clear();
					done();
				});
			});
		});
		describe('removeDirectory',function(){
			it('should success return 200',function(done){
				upyun.removeDirectory('README/md',function(err,resHeaders,resData){
					assert.equal(200,err);
					done();
				});
			});
		});
	});
	describe('listStructure',function(){
		it('should success return 200',function(done){
			upyun.listStructure('README',function(err,resHeaders,resData,resInformations){
				assert.equal(200,err);
				assert.notEqual(resInformations.length,0);
				assert.ok(resInformations[0].name);
				assert.ok(resInformations[0].type);
				assert.ok(resInformations[0].size);
				assert.ok(resInformations[0].date);
				done();
			});
		});
	});
	describe('retrieve Cloud Usage',function(){
		it('should success return 200',function(done){
			upyun.retrieveCloudUsage(function(err,resHeaders,resData){
				assert.equal(200,err);
				assert.notEqual(resData.length,0);
				done();
			});
		});
	});
});

