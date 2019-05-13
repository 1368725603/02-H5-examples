var api=new Api();
//电影排行接口（推荐）
api.rankingListUrl(function(e){
	var ulLis=document.getElementsByClassName('ranking_ul');
	var ol=document.getElementById('ranking_ol');
	ulLis[0].style.color='red';
	var str='';
	for(var i=0;i<e.data[0].length;i++){
		str+='<li><span>'+(i+1)+'</span> '+ e.data[0][i].title+'</li>';
	}
	ol.innerHTML=str;
	var lis=ol.getElementsByTagName("li");
	for(var i=0;i<lis.length;i++){
		lis[i].index=i;
		lis[i].onclick=function(){
			var that=this;
			setCookie('movieId',e.data[0][that.index].id);
			sessionStorage.id=e.data[0][this.index].id;
			location.href="movie_detail.html";
		}
	}
	var str1='';
	for(var i=0;i<ulLis.length;i++){
		ulLis[i].index=i;
		ulLis[i].onclick=function(){			
			for(var j=0;j<ulLis.length;j++){
				ulLis[j].style.color='';
			}			
			this.style.color="red";
			str1='';
			for(var k=0;k<e.data[this.index].length;k++){
				str1+='<li><span>'+(k+1)+'</span> '+ e.data[this.index][k].title+'</li>';
			}
			ol.innerHTML=str1;
			var lis=ol.getElementsByTagName("li");
			var that=this;
			for(var l=0;l<lis.length;l++){
				lis[l].index=l;
				lis[l].onclick=function(){
					console.log(this.index);
					console.log(this.index1);
					console.log(e.data[0][0].id);
					setCookie('movieId',e.data[that.index][this.index].id);
					sessionStorage.id=e.data[that.index][this.index].id;
					location.href="movie_detail.html";
				}
			}
		}
	}	
});
//随机推荐列表接口 （手气不错，阅读、音乐、视频）
api.recommendRandomListUrl(function(e){
	var containerRightLuck=document.getElementById("container_right_luck");
	var str='';
	for(var i=0;i<5;i++){
		str+='<li>';
		str+='<h4>'+e.data[i].title+'</h4>';
		str+='<p class="container_right_luck_p">'+e.data[i].forward+'</p>';
		str+='</li>';
	}
	containerRightLuck.innerHTML=str;
	var h4s=containerRightLuck.getElementsByTagName("h4");
	for(var i=0;i<h4s.length;i++){
		h4s[i].index=i;
		h4s[i].onclick=function(){
			var that=this;
			if(e.data[that.index].category=='1'){
				setCookie('readId',e.data[that.index].id);
				localStorage.readId=e.data[that.index].id;
				location.href="readDetail.html";
			}else if(e.data[that.index].category=='4'){
				setCookie('musicId',e.data[that.index].id);
				sessionStorage.id=e.data[that.index].id;
				location.href="music_detail.html";
			}else if(e.data[that.index].category=='5'){
				setCookie('movieId',e.data[that.index].id);
				sessionStorage.id=e.data[that.index].id;
				location.href="movie_detail.html";
			}
		}
	}
});
//音乐列表接口（音乐推荐）
api.musicListUrl(function(e){
	var musicRecommend=document.getElementById('musicRecommend');
	var str='<div>';
	str+='<p class="recommend" style="width: 80px;">音乐推荐</p>';
	str+='</div>';
	for(var i=5;i<9;i++){
		str+='<div class="read_big" style="margin-top:0;">';
		str+='<div style="width: 470px;height: 300px;margin-top:30px;">';
		var src=imagePrefix+e.data[i].img_url;
		str+='<img src='+src+'>';
		str+='</div>';
		str+='<h3 style="margin-top: 20px;width:470px;">'+e.data[i].title+'</h3>';
		str+='<p style="width:470px;">更新 '+e.data[i].post_date+' 点击：'+e.data[i].like_count+'次</p>';
		str+='</div>';
	}
	musicRecommend.innerHTML=str;
	var imgs=musicRecommend.getElementsByTagName("img");
	for(var i=0;i<imgs.length;i++){
		imgs[i].index=i;
		imgs[i].onclick=function(){
			var that=this;
			setCookie('musicId',e.data[that.index].id);
			sessionStorage.id=e.data[that.index].id;
			location.href="music_detail.html";
		}
	}
},0);