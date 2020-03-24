Vue.component("navi",{
	props:["props0"],
	template:'\
	<ul class="comUl">\
		<li class="comLi1 comLi2" v-on:click="search1"><img src="icons/1.1.png"></li>\
		<li class="comLi1" v-text="props0" style="cursor:default;"></li>\
		<li class="comLi1 comLi3" v-on:click="user"><img src="icons/1.2.png"></li>\
	</ul>',
	methods:{
		user:function(){
			location.href="用户主页.html";
		},
		search1:function(){
			location.href="搜索.html";
		}
	}
});

Vue.component("naviread",{
	props:["props0","props1"],
	template:'\
		<ul class="comUl">\
			<li class="comLi1 comLi2" v-on:click="hi">&lt;</li>\
			<li class="comLi1" v-text="props0" style="cursor:default;"></li>\
			<li class="comLi1 comLi3" v-on:click="user"><img v-bind:src="props1"></li>\
		</ul>',
	methods:{	
		hi:function(){
			history.back();
		},
		user:function(){
			location.href="用户主页.html";
		}
	}
});

Vue.component("foot",{
	props:["props0","props1","props2","props3"],
	template:'\
	<ul class="comFootUl">\
		<li class="comFootLi"><a href="首页.html"><img v-bind:src="props0"></a></li>\
		<li class="comFootLi"><a href="阅读.html"><img v-bind:src="props1"></a></li>\
		<li class="comFootLi"><a href="音乐.html"><img v-bind:src="props2"></a></li>\
		<li class="comFootLi"><a href="影视.html"><img v-bind:src="props3"></a></li>\
	</ul>'
});

Vue.component("navisearch",{
	props:["props0"],
	template:'\
		<ul class="comUl">\
			<li class="comLi1 comLi2" v-on:click="hi">&lt;</li>\
			<li class="comLi1" v-text="props0" style="cursor:default;"></li>\
			<li class="comLi1 comLi3"></li>\
		</ul>',
	methods:{	
		hi:function(){
			history.back();
		}
	}
});