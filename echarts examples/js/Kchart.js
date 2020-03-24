//定义angular模块
var app = angular.module('myApp',[]);
//配置angular渲染模板方式
app.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');
});
//$rootScope 根作用域
app.run(function ($rootScope) {
	$rootScope.msg = "hello world";
})
//myChart局部作用域
app.controller("myChart",function ($rootScope,$scope) {				
						
})
//mySelect局部作用域
app.controller("mySelect",function ($rootScope,$scope,$http) {
	//假数据
	$scope.cities = vCityData;
	/*$http.get("url").success(function(e){			
		$scope.cities = e.data;
	});*/
						
})

var arr1 = [];
var arr2 = [];
for(var i=0;i<vCityData.length;i++){
	arr1.push(vCityData[i].city);
	arr2.push(vCityData[i].num);
}
makeChart(cityData,'本月异常分播数量',arr1,arr2);

//日期图表k线图
var responseData = [];
var dateDatas = [];
var dateDatasNum = [];
var yName = '异常分拨数量';

//请求数据
responseData = result;
var selects = document.getElementById("mySelect-select");
//获取k线图数据
getDatas();
makeChart(dateData,yName,dateDatas,dateDatasNum);
//改变城市
selects.onchange = function(){
	//数组清零
	dateDatas = [];
	dateDatasNum = [];
	getDatas();
	makeChart(dateData,yName,dateDatas,dateDatasNum);
}

//获取k线图数据
function getDatas(){
	//判断当前城市
	for(var i=0;i<responseData.length;i++){		
		if(responseData[i].name==selects.value){
			var currentRes = responseData[i].data;
			console.log(currentRes);
		}
	}
	//获取当前k线图数据
	for(var i=0;i<currentRes.length;i++){
		dateDatas.push(currentRes[i].date);
		dateDatasNum.push(currentRes[i].num);
	}
}
//创建图标方法
function makeChart(dom,name,xData,yData){
	var myChart = echarts.init(dom);
	var option = {
		//设置X轴
		xAxis: {
			data: xData
		},
		//设置Y轴
		yAxis: {
			//如果不设置，将会根据数据大小，自动生成	
		},
		tooltip: {
			//是否显示
			show: true,
			//触发器
			trrigger: "xaxis"
		},
		//连续的，系列
		series:
		{
			"name":name,
			//显示为线性图
			type:"line",
			data:yData,
			//显示标记点
			markPoint:{
				data:[{type:"max",name:"最大值"},{type:"min",name:"最小值"}]
			},
			//添加标记线
			markLine:{
				data:[{type:"average",name:"平均值"}]
			}
		}
	};
	myChart.setOption(option);
}

//判断是否为闰年
function isLeap(){
	var y = new Date().getFullYear();
	if((y%4==0&&y%100!=0)||y%400==0){
		return true;
	}
	else{
		return false;
	}
}
//根据月份判断天数
function monthDays(par){
	switch (Number(par)){
		case 2:
			if(isLeap()){
				return 28;
			}else{
				return 29;
			}
			break;
		case 4:
		case 6:
		case 9:
		case 11:
			return 30;
			break;
		default:
			return 31;
			break;
	}
}
