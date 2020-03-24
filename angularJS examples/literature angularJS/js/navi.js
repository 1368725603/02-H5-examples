var app=angular.module("myApp",[]);
app.run(function($routeScope){
	
});
app.directive("navi",function(){
	return {
		scope:{
			props0:'@',
			user:function(){
				location.href="用户主页.html";
			},
			search1:function(){
				location.href="搜索.html";
			}
		},
		template:'\
		<ul class="comUl">\
			<li class="comLi1 comLi2" ng-click="search1()"><img src="icons/1.1.png"></li>\
			<li class="comLi1" ng-bind="props0" style="cursor:default;"></li>\
			<li class="comLi1 comLi3" ng-click="user()"><img src="icons/1.2.png"></li>\
		</ul>'
	}
});

app.directive("naviread",function(){
	return {
		scope:{
			props0:'@',
			props1:"@",
			hi:function(){
				history.back();
			},
			user:function(){
				location.href="用户主页.html";
			}
		},
		template:'\
		<ul class="comUl">\
			<li class="comLi1 comLi2" ng-click="hi()">&lt;</li>\
			<li class="comLi1" ng-bind="props0" style="cursor:default;"></li>\
			<li class="comLi1 comLi3" ng-click="user()"><img ng-src={{props1}}></li>\
		</ul>'
	}
});

app.directive("foot",function(){
	return {
		scope:{
			props0:"@",
			props1:"@",
			props2:"@",
			props3:"@"
		},
		template:'\
		<ul class="comFootUl">\
			<li class="comFootLi"><a href="首页.html"><img ng-src="props0"></a></li>\
			<li class="comFootLi"><a href="阅读.html"><img ng-src="props1"></a></li>\
			<li class="comFootLi"><a href="音乐.html"><img ng-src="props2"></a></li>\
			<li class="comFootLi"><a href="影视.html"><img ng-src="props3"></a></li>\
		</ul>'
	}
});

app.directive("navisearch",function(){
	return {
		scope:{
			props0:"@",
			hi:function(){
				history.back();
			}
		},
		template:'\
		<ul class="comUl">\
			<li class="comLi1 comLi2" ng-click="hi()">&lt;</li>\
			<li class="comLi1" ng-bind="props0" style="cursor:default;"></li>\
			<li class="comLi1 comLi3"></li>\
		</ul>'
	}
});