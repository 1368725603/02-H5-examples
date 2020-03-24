/*
* @Author: Administrator
* @Date:   2017-11-21 14:30:03
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-26 17:21:49
*/

'use strict';
// 封装所有的网络请求
// 依赖jquery.js,interface.js,base64.js
function Api(){
	this.arr={'1':'read','4':'music','5':'movie'};
	this.get_main_list=function(call_back){//主页
		var url=mainListUrl;
		$.getJSON(url,{},function(response){
			var info=response.data;
			call_back(info);
		});
	};
	this.get_ads_list=function(call_back){//广告
		var url=adsUrl;
		$.getJSON(url,{},function(response){
			var info=response.data;
			call_back(info);
		});
	};
	// this.get_read_list=function(start,count,call_back){
	this.get_read_list=function(page,count,call_back){//阅读列表
		// var start=(page-1)*count;
		var start=(page>0?page-1:page)*count;
		var url=readListUrl;
		$.getJSON(url,{start:start,count:count,},function(response){
			var info=response.data;
			var total=response.total;
			call_back(info,total);
		});
	};
	this.get_read_detail=function(id,call_back){//阅读详情
		var url=readDetailUrl;
		$.getJSON(url,{id:id,},function(response){
			var info=response.data;
			var pre=response.pre;
			var next=response.next;
			var base64=new Base64();
			info.hp_content=base64.decode(info.hp_content);
			call_back(info,pre,next);
		});
	};
	// this.get_music_list=function(start,count,call_back){
	this.get_music_list=function(page,count,call_back){//音乐列表
		// var start=(page-1)*count;
		var start=(page>0?page-1:page)*count;
		var url=musicListUrl;
		$.getJSON(url,{start:start,count:count,},function(response){
			var info=response.data;
			var total=response.total;
			call_back(info,total);
		});
	};
	this.get_music_detail=function(id,call_back){//音乐详情
		var url=musicDetailUrl;
		$.getJSON(url,{id:id,},function(response){
			var info=response.data;
			var pre=response.pre;
			var next=response.next;
			var base64=new Base64();
			info.story=base64.decode(info.story);
			call_back(info,pre,next);
		});
	};
	// this.get_movie_list=function(start,count,call_back){
	this.get_movie_list=function(page,count,call_back){//影视列表
		// var start=(page-1)*count;
		var start=(page>0?page-1:page)*count;
		var url=movieListUrl;
		$.getJSON(url,{start:start,count:count,},function(response){
			var info=response.data;
			var total=response.total;
			call_back(info,total);
		});
	};
	this.get_movie_detail=function(id,call_back){//影视详情
		var url=movieDetailUrl;
		$.getJSON(url,{id:id,},function(response){
			var info=response.data;
			var pre=response.pre;
			var next=response.next;
			call_back(info,pre,next);
		});
	};
	this.login=function(username,password,call_back){//登录
		var url=loginUrl;
		$.getJSON(url,{username:username,password:password,},function(response){
			var info=response;
			call_back(info);
		});
	}
	this.register=function(username,password,phone,call_back){//注册
		var url=registerUrl;
		$.getJSON(url,{username:username,password:password,phone:phone,},function(response){
			var info=response;
			call_back(info);
		});
	}
	this.get_user_info=function(userId,call_back){//用户信息
		var url=userInfoUrl;
		$.getJSON(url,{userId:userId},function(response){
			var info=response;
			call_back(info);
		});
	}
	this.change_nickname=function(userId,newNickname,call_back){//修改昵称
		var url=changeNicknameUrl;
		$.getJSON(url,{userId:userId,newNickname:newNickname},function(response){
			var info=response;
			call_back(info);
		});
	}
	this.change_password=function(userId,password,newPassword,call_back){//修改密码
		var url=changePasswordUrl;
		$.getJSON(url,{userId:userId,password:password,newPassword:newPassword},function(response){
			var info=response;
			call_back(info);
		});
	}
	this.add_collect=function(userId,itemId,type,call_back){//收藏
		var url=saveFavoriteUrl;
		$.getJSON(url,{userId:userId,itemId:itemId,type:type},function(response){
			var code=response.code;
			call_back(code);
		});
	}
	this.cancel_collect=function(userId,itemId,call_back){//取消收藏
		var url=cancelFavoriteUrl;
		$.getJSON(url,{userId:userId,itemId:itemId},function(response){
			var code=response.code;
			call_back(code);
		});
	}
	this.is_collect=function(userId,itemId,call_back){//是否收藏
		var url=isFavoriteUrl;
		$.getJSON(url,{userId:userId,itemId:itemId},function(response){
			var info=response;
			call_back(info);
		});
	}
	this.add_zan=function(userId,itemId,type,call_back){//点赞
		var url=addGoodUrl;
		$.getJSON(url,{userId:userId,itemId:itemId,type:type},function(response){
			var code=response.code;
			call_back(code);
		});
	}
	this.cancel_zan=function(userId,itemId,call_back){//取消点赞
		var url=cancelGoodUrl;
		$.getJSON(url,{userId:userId,itemId:itemId},function(response){
			var code=response.code;
			call_back(code);
		});
	}
	this.is_zan=function(userId,itemId,call_back){//是否点赞
		var url=isGoodUrl;
		$.getJSON(url,{userId:userId,itemId:itemId},function(response){
			var info=response;
			call_back(info);
		});
	}
	this.add_comment=function(userId,itemId,comment,call_back){//发表评论
		var url=addCommentUrl;
		$.getJSON(url,{userId:userId,itemId:itemId,comment:comment},function(response){
			var info=response;
			call_back(info);
		});
	}
	this.get_comment=function(itemId,call_back){//获取评论列表
		var url=getCommentUrl;
		$.getJSON(url,{itemId:itemId},function(response){
			var info=response.data;
			info=info.reverse();
			call_back(info);
		});
	}
	this.search=function(userId,keyword,call_back){//搜索
		var url=searchUrl;
		$.getJSON(url,{userId:userId,keyword:keyword},function(response){
			var info=response.data;
			call_back(info);
		});
	}
	this.get_ranking=function(start,count,call_back){//获取排行
		var url=rankingListUrl;
		$.getJSON(url,{start:start,count:count},function(response){
			var info=response.data;
			call_back(info);
		});
	}
	this.get_recommend=function(start,count,call_back){//获取推荐
		var url=recommendListUrl;
		$.getJSON(url,{start:start,count:count},function(response){
			var info=response.data;
			call_back(info);
		});
	}
	this.get_recommendRandom=function(start,count,call_back){//获取随机推荐
		var url=recommendRandomListUrl;
		$.getJSON(url,{start:start,count:count},function(response){
			var info=response.data;
			call_back(info);
		});
	}
}
// 搜索
// 登录
// 注册
// 修改密码
// 修改昵称
// 修改头像
// 
// 添加收藏
// 取消收藏
// 获取是否收藏
// 获取收藏列表(1,4,5)
// 
// 发表评论
// 获取评论列表
// 
// 获取排行
// 获取推荐
// 获取随机推荐