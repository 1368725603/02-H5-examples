/*
* @Author: Administrator
* @Date:   2017-11-15 15:26:46
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-15 15:30:54
*/

'use strict';
Vue.component('tabbar',{
	'props':['select_index'],
	'template':'<div class="tabbar">\
		<a href="index.html" class="tabbar_item" v-bind:class="{active:select_index==0}" id="main">\
			<span></span>\
			<span>首页</span>\
		</a>\
		<a href="read.html" class="tabbar_item" v-bind:class="{active:select_index==1}" id="read">\
			<span></span>\
			<span>阅读</span>\
		</a>\
		<a href="music.html" class="tabbar_item" v-bind:class="{active:select_index==2}" id="music">\
			<span></span>\
			<span>音乐</span>\
		</a>\
		<a href="movie.html" class="tabbar_item" v-bind:class="{active:select_index==3}" id="movie">\
			<span></span>\
			<span>影视</span>\
		</a>\
	</div>'
});