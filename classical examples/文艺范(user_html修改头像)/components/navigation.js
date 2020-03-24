/*
* @Author: Administrator
* @Date:   2017-11-15 14:31:02
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-17 14:37:35
*/

'use strict';
Vue.component('navigation',{
	'props':['left_path','left_img','nav_title','right_path','right_img'],
	'template':'<div class="navigation">\
		<div class="nav_left">\
			<a v-bind:href="left_path"><img v-bind:src="left_img"></a>\
		</div>\
		<div class="nav_title">{{nav_title}}</div>\
		<div class="nav_right">\
			<a v-bind:href="inner_right_path"><img v-bind:src="right_img"></a>\
		</div>\
	</div>',
	data:function(){
		return {
			inner_right_path:null,
		}
	},
	created:function(){
		this.inner_right_path='login.html';
		// if(this.right_path!=undefined){
		// 	this.inner_right_path=this.right_path;
		// }
		if(localStorage.is_login==1){
			this.inner_right_path='user.html';
		}
	},
});