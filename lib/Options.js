/*
 * options class
 * author:huangchaosuper@gmail.com
 * date:May 1, 2014
 * ---------------------------------
 * @param domain 自动识别，默认
 * @param domain_CTCC 中国电信
 * @param domain_CUCC 中国联通
 * @param domain_CMCC 中国移动
 * @param bucketName 空间名称
 * @param userName 操作员名称
 * @param password 密码
 * @param signature 是否使用UPYUN签名认证
 * @param https 是否开启https访问
 * @param headers 通讯报文头
 * @param image 图像处理函数集合
 */
function Options(userName,password,bucketName) {
	this.userName = userName;
	this.password = password;
	this.bucketName = bucketName;
	this.headers = {mkdir:true};
	this.domain = 'v0.api.upyun.com';
	this.domain_CTCC = 'v1.api.upyun.com';
	this.domain_CUCC = 'v2.api.upyun.com';
	this.domain_CMCC = 'v3.api.upyun.com';
	this.signature = false;
	this.https = false;
	this.md5 = false;
}


Options.prototype.clear = function() {
  this.headers = {mkdir:true};
}
Options.prototype.imageClear = function() {
	this.headers['x-gmkerl-type'] = undefined;
	this.headers['x-gmkerl-value'] = undefined;
	this.headers['x-gmkerl-quality'] = undefined;
	this.headers['x-gmkerl-unsharp'] = undefined;
	this.headers['x-gmkerl-thumbnail'] = undefined;
	this.headers['x-gmkerl-exif-switch'] = undefined;
}
Options.prototype.imageFixWidth = function(width){
	this.headers['x-gmkerl-type'] = 'fix_width';
	this.headers['x-gmkerl-value'] = width;
}
Options.prototype.imageFixHeight = function(height){
	this.headers['x-gmkerl-type'] = 'fix_height';
	this.headers['x-gmkerl-value'] = height;
}
Options.prototype.imageFixWidthOrHeight = function(width,height){
	this.headers['x-gmkerl-type'] = 'fix_width_or_height';
	this.headers['x-gmkerl-value'] = width +'x'+ height;
}
Options.prototype.imageFixBoth = function(width,height){
	this.headers['x-gmkerl-type'] = 'fix_both';
	this.headers['x-gmkerl-value'] = width +'x'+ height;
}
Options.prototype.imageFixMax = function(size){
	this.headers['x-gmkerl-type'] = 'fix_max';
	this.headers['x-gmkerl-value'] = size;
}
Options.prototype.imageFixMin = function(size){
	this.headers['x-gmkerl-type'] = 'fix_min';
	this.headers['x-gmkerl-value'] = size;
}
Options.prototype.imageFixScale = function(scale){
	this.headers['x-gmkerl-type'] = 'fix_scale';
	this.headers['x-gmkerl-value'] = scale;
}
Options.prototype.imageQuality = function(scale){
	this.headers['x-gmkerl-quality'] = scale;
}
Options.prototype.imageUnSharp = function(){
	this.headers['x-gmkerl-unsharp'] = true;	
}
Options.prototype.imageThumbnail = function(name){
	this.headers['x-gmkerl-thumbnail'] = name;		
}
Options.prototype.imageKeepExif = function(){
	this.headers['x-gmkerl-exif-switch'] = true;	
}
Options.prototype.imageRotate = function(type){
	this.headers['x-gmkerl-rotate'] = type||'auto';	
}
Options.prototype.imageCrop = function(x,y,width,height){
	this.headers['x-gmkerl-crop'] = x||0+','+y||0+','+width||0+','+height||0;	
}

module.exports = Options;