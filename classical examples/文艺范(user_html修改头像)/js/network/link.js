/*
* @Author: Administrator
* @Date:   2017-11-22 22:37:02
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-26 17:29:02
*/

'use strict';
var api=new Api();
function detail(id,category){
	sessionStorage.id=id;
	if(category==1){
		location.href='readDetail.html';
	}else{
		location.href=api.arr[category]+'_detail.html';
	}
}