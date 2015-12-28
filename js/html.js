/**
 * ---------------------- HTML Markup, Form, DOM Object ----------------------------
 */
var html = {
    setHeader: function() {
        element.header().html( this.header() );
    },
    setFooter: function() {
        element.footer().html( this.footer() );
    },
    setPanel: function() {
        element.panel().html( this.panel() );
    },
    /**
     *
     * @note This does not save data into database.
     * @Attention Use this function to set content on '.content'.
     *      - it does extra tasks.
     * @param html
     * @param name
     */
    setContent : function (html, name) {
        //trace('setContent(...,' + page_name + ')');
        //if ( isPanelOpen() ) hidePanel();
        if ( panel.open() ) panel.close();


        // 클릭된 (보여줄) 페이지 이름과 데이터를 다운로드한 페이지 이름이 다르면
        // 내용을 보여주지 않는다.
        // 즉, 동시에 메뉴를 여러번 빨리 눌러서 ajax_load 가 많이 실행된 경우,
        // 마지막에 클릭된 메뉴의 페이지만 보여 준다.
        /*
        if ( app.getCurrentPage() != name ) {
            console.log(app.getCurrentPage());
            console.log(name);
            console.log("widget_name and page name is not the same. data voided.");
            return;
        }
        */

        element.content().html(html);
    },
    header : function() {
        var m = '';
        m += '<nav class="navbar navbar-default top">';
        m += '  <div class="container-fluid">';
        m += '      <span class="navbar-text glyphicon glyphicon-home" page-button="front" post-id="*"></span>';
        m += '      <span class="navbar-text glyphicon glyphicon-pencil" post-id="*"></span>';
        m += '      <span class="navbar-text glyphicon glyphicon-camera" post-id="*"></span>';
        m += '      <span class="navbar-text logo">필리핀매거진</span>';
        m += '      <span class="navbar-text navbar-right glyphicon glyphicon-th-list menu-panel toggle"></span>';
        m += '  </div>';
        m += '</nav>';
        m += '<ul class="nav nav-pills nav-justified main-menu">';
        m += '  <li page-button="news" post-id="news">뉴스</li>';
        m += '  <li page-button="info" post-id="qna">정보</li>';
        m += '  <li page-button="company" post-id="company_book">업소록</li>';
        m += '  <li page-button="travel" post-id="travel">여행</li>';
        m += '  <li page-button="qna" post-id="qna">질문</span></li>';
        m += '  <li page-button="freetalk" post-id="freetalk,knowhow">토론</span></li>';
        m += '  <li widget="menu-all">더보기</span></li>';
        m += '</ul>';
        return m;
    },
    footer : function() {
        var m = '';
        m += '<ul class="nav nav-pills nav-justified bottom bottom-menu">';


        if ( member.login() ) {
            m += '  <li page-button="profile"><span class="glyphicon glyphicon-user"></span>Profile</li>';
            m += '  <li page-button="message"><span class="glyphicon glyphicon-envelope"></span>Message</li>';
        }
        else {
            m += '  <li page-button="login"><span class="glyphicon glyphicon-user"></span>Login</li>';
            m += '  <li page-button="register"><span class="glyphicon glyphicon-envelope"></span>Register</li>';
        }
        m += '  <li page-button="search"><span class="glyphicon glyphicon-search"></span>Search</li>';
        m += '  <li class="post-button" post-id=""><span class="glyphicon glyphicon-pencil"></span>Post</li>';
        m += '  <li class="setting-button"><span class="glyphicon glyphicon-wrench"></span>Setting</span></li>';
        m += '</ul>';
        return m;
    },
    panel : function() {
        var m = '';
        m += '<div class="panel panel-default menu-panel-inner">';
        m += '  <ul class="list-group top">';
        m += '      <li><div class="list-group-item">전체 메뉴 보기<span class="glyphicon glyphicon-menu-right"></span></div></li>';
        m += '      <li><div class="list-group-item message-button check-internet">쪽지 Message<span class="glyphicon glyphicon-menu-right"></span></div></li>';
        m += '      <li><div class="list-group-item">Menu 3<span class="glyphicon glyphicon-menu-right"></span></div></li>';
        m += '      <li><div class="list-group-item menu-panel toggle">Close Menu<span class="glyphicon glyphicon-remove"></span></div></li>';
        m += '  </ul>';

        var primary_photo;
        if ( member.login() ) primary_photo = member.primary_photo();
        else primary_photo = '      <img src="img/no_primary_photo.png"/>';

        m += '  <div class="panel-user-profile" page-button="login">';
        m += primary_photo;
        m += '      <div class="bottom-space"></div>';
        if ( member.login() ) {
            m += '      <div class="name">{{name}}<div>{{id}}</div></div>';
        }
        else {
            m += '      <div class="name">회원 로그인<div>Login</div></div>';
        }
        m += '  </div>';
        m += '  <ul class="list-group bottom">';

        if ( member.login() ) {
            m += '      <li><div class="list-group-item" page-button="register">회원 정보<span class="glyphicon glyphicon-menu-right"></span></div></li>';
            m += '      <li><div class="list-group-item" page-button="login">로그아웃<span class="glyphicon glyphicon-menu-right"></span></div></li>';
        }
        else {
            m += '      <li><div class="list-group-item" page-button="login">로그인 (필고 아이디 로그인)<span class="glyphicon glyphicon-menu-right"></span></div></li>';
            m += '      <li><div class="list-group-item" page-button="register">회원가입 register<span class="glyphicon glyphicon-menu-right"></span></div></li>';
        }
        m += '      <li><div class="list-group-item" page-button="admin">운영자 요청/건의 inquery<span class="glyphicon glyphicon-menu-right"></span></div></li>';
        m += '      <li><div class="list-group-item" page-button="setting">설정 Settings<span class="glyphicon glyphicon-menu-right"></span></li>';
        m += '  </ul>';
        m += '  <div class="panel-copyright">';
        /*
		m += '      <ul class="nav nav-pills nav-justified bottom">';
        m += '          <li><span>Terms & Policies</span></li>';
        m += '          <li><span>Feedback</span></li>';
        m += '          <li><span>About</span></li>';
        m += '      </ul>';
		*/
        m += '      <div class="copy-right-text">';
        m += '          필리핀 교민 홈페이지 앱 무료 제작<br>';
        m += '          신청 : thruthesky@gmail.com';
        m += '      </div>';
        m += '  </div>';
        m += '</div>';

        var str = _.template(m)(member);

        return str;
    },
    post_write_form : function (post_id) {
        var gid = etc.unique_id(member.idx + post_id);
        var forums = {
            'news' : 'News',
            'freetalk' : 'Free Talk',
            'qna' : 'Q & A',
            'buyandsell' : 'Buy & Sell',
            'travel' : 'Travel',
            'company_book' : 'Company Book'
        };
        var m = '';
        m += "<form class='post-write-form' action='"+app.getServerURL()+"' method='post' enctype='multipart/form-data'>";
        m += "  <input type='hidden' name='idx_member' value='"+member.idx+"'>";
        m += "  <input type='hidden' name='session_id' value='"+member.session_id+"'>";
        m += "  <input type='hidden' name='gid' value='"+gid+"'>";
        m += "  <input type='hidden' name='submit' value='1'>";
        m += "  <input type='hidden' name='module' value='ajax'>";
        m += "  <input type='hidden' name='action' value='post_write_submit'>";
		m += "	<div class='post-content-wrapper'>";
        m += "  	<div class='content'>";
		m += "			<textarea name='content' placeholder='Write a post.'></textarea>";		
		m += "		</div>";        
		m += '		<div class="photos clearfix"></div>';
		m += "	</div>";
		m += '<div class="row commands">';
		m += '<div class="col-xs-4">';
        m += 	this.filebox();
		m += '</div>';
        m += "  <div class='category col-xs-4'>";
        m += "      <select class='form-control' name='post_id'>";
        for( var name in forums ) {
            if ( forums.hasOwnProperty(name) ) {
                m += '<option value="'+name +'"';
                if ( name == post_id ) m += ' selected=1';
                m += '>' + forums[name] + '</optoin>';
            }
        }
        m += "      </select>";
		m += "		<span class='caret'></span>";
        m += "</div>";
        m += "<div class='submit col-xs-4'><input type='submit' value='Post'></div>";
		m += "</div>";
        m += "</form>";
        return m;
    },
    comment_write_form : function (p) {
		/*
        var gid = etc.unique_id(member.idx + p['post_id']);
        var m = '';

        m += this.filebox();
        m += '  <input type="submit">';
        m += '</form>';
        return m;
		*/
		
		
		var gid = etc.unique_id(member.idx + p['post_id']);
		var m = '';
		
		m += '<form class="comment-write-form clearfix" data-idx-parent="'+p['idx']+'" action="'+app.getServerURL()+'" method="post" enctype="multipart/form-data">';
		m += "  <input type='hidden' name='idx_parent' value='"+p['idx']+"'>";
        m += "  <input type='hidden' name='gid' value='"+gid+"'>";
        m += "  <input type='hidden' name='idx_member' value='"+member.idx+"'>";
        m += "  <input type='hidden' name='session_id' value='"+member.session_id+"'>";
        m += "  <input type='hidden' name='submit' value='1'>";
        m += '  <input type="hidden" name="module" value="ajax">';
        m += "  <input type='hidden' name='action' value='comment_write_submit'>";
		m +=	'<div class="media post-info col-xs-8">';
		
		m +=		'<a class="media-left" href="#">';
		m +=		'<img class="media-object profile-image" src="img/no_primary_photo.png" alt="Generic placeholder image">';
		m +=		'</a>';
		m +=		'<div class="media-body">';
		m +=		'<textarea name="content"></textarea>';
		m += 		'<div class="photos"></div>';		
		m +=		'</div>';
		
		m +=	'</div>';
		m +=	'<div class="col-xs-4 commands">';
		m +=		'<div class="col-xs-6">' + this.filebox() + '</div>';
		m +=		'<div class="col-xs-6">' + '<input type="submit" value="Post">' + '</div>';
		m +=	'</div>';
		m += '</form>';
		

		//trace( m );
		return m;
		
    },
    filebox : function () {
        var m;
        if ( app.isDesktop() ) {
            m = '<div class="file desktop">';
			m += '<span class="glyphicon glyphicon-camera"></span>';
			m += '<input type="file" name="file" onchange="callback.on_change_file_upload(this);">';
			m += '</div>';            
        }
        else if ( app.isBrowser() ) {
            if ( debug.browser_camera_upload ) m = '  <div class="file file-upload-button"><span class="glyphicon glyphicon-camera"></span> File Upload</div>';
            else m = '  <div class="file"><input type="file" name="file" onchange="callback.on_change_file_upload(this);"></div>';
        }
        else {
            m = '<div class="file file-upload-button"><span class="glyphicon glyphicon-camera"></span></div>';
        }
		//m = '<div class="file file-upload-button"><span class="glyphicon glyphicon-camera"></span></div>';
        return m;
    },
    clear_comment_write_form : function (p) {
        var $form = element.comment_write_form(p['idx_parent']);
        var $gid = $form.find('[name="gid"]');
        var $content = $form.find('[name="content"]');
        $gid.val( etc.unique_id(member.idx + p['post_id']) );
        $content.val('');
        $form.find('.photos').html('');
    },
    render_post : function (p) {
        //trace('get_post_render(p)');
        if (_.isEmpty(p) ) return;
        //trace('creating DOM');
        var m = '';

        trace( p );


        var date_full = etc.date_full(p['stamp']);
        var date = etc.date_short(p['stamp']);


        m += '<div class="btn-group post-menu-philzine-top" role="group">';
        if( !post.mine(p) ) {
            m += '<span type="button" class="btn btn-secondary report-button"><img src="img/post/report.png"/></span>';
        }
        else {
            m += '<span type="button" class="btn btn-secondary post-edit-button"><span class="glyphicon glyphicon-pencil"></span></span>';
            m += '<span type="button" class="btn btn-secondary post-delete-button"><span class="glyphicon glyphicon-trash"></span></span>';
        }
        m += '  <span class="menu-separator"></span>';
        m += post.markup.more(p['idx']);
        m += '</div>';

        m += '<div class="media post-info">';
        m += '  <a class="media-left" href="#">';

        var src = 'img/no_primary_photo.png';
        if ( typeof p['member']['idx_primary_photo'] != 'undefined' ) src = app.getDataURL(p['member']['idx_primary_photo']);
        m += '      <img class="media-object profile-image" src="'+src+'" alt="Generic placeholder image">';
        m += '  </a>';
        m += '  <div class="media-body">';
        m += '      <div class="name">'+p['user_name']+'<img class="send-message" src="img/post/mail.png"/></div>';
        m += '      <div class="date" title="'+date_full+'">' + date + '</div>';
        m += '  </div>';
        m += '</div>';

        if ( !_.isEmpty(p['subject']) ) {
            //m += '<h3 class="subject">' + p['subject'] + '</h3>';
        }
        var no_of_comment, likes;
        m += '<div class="subject">' + post.subject(p) + '</div>';
        m += '<div class="content">' + post.content(p) + '</div>';
        if ( p['photos'] ) m += p['photos'];
        if( p['good'] > 0 ) likes = p['good'];
        else likes = '';
        if( p['no_of_comment'] > 0 ) no_of_comment = p['no_of_comment'];
        else no_of_comment = '';

        m += '<ul class="nav nav-pills post-menu-philzine-bottom">';
        //m += '  <li class="like">'+ p['idx']+'<img src="img/post/like.png"/> Like <span class="no">' + likes + '</span></li>';
        m += '  <li class="like like-button"><span class="glyphicon glyphicon-thumbs-up"></span>Like <span class="no">' + likes + '</span></li>';
        m += '  <li class="reply"><span class="glyphicon glyphicon-comment"></span>Comment ' + no_of_comment + '</li>';
        m += '</ul>';

        m += this.comment_write_form(p);

        m = '<div class="post" idx="'+p['idx']+'" gid="'+p['gid']+'">' + m + '</div>';

        //trace(m);
        return m;
    },
    render_comments : function (comments) {
        var m = '';
        if ( comments ) {
            for( var j in comments ) {
                if ( comments.hasOwnProperty(j) ) {
                    m += html.render_comment(comments[j]);
                }
            }
        }
        return m;
    },
    render_comment : function (comment) {
		var m = '';

		var date_full = etc.date_full(comment['stamp']);
		var date = etc.date_short(comment['stamp']);
		//var humanTime = etc.humanTime(comment['stamp']); // DO NOT USE Human Time.

		var likes;
		if( comment['good'] > 0 ) likes = comment['good'];
		else likes = '';


		m += '<div class="post comment clearfix" post-id="'+comment['post_id']+'" idx="'+comment['idx']+'" gid="'+comment['gid']+'" depth="'+comment['depth']+'" idx-parent="'+comment['idx_parent']+'">';

		m += '<div class="btn-group post-menu-philzine-top" role="group">';
		
		if( ! post.mine(comment) ) {
			m += '<span type="button" class="btn btn-secondary post-delete-button glyphicon glyphicon-remove"></span>';
		}
        /*
		else {
			m += '<span type="button" class="btn btn-secondary post-edit-button"><img src="img/post/edit.png"/></span>';
			m += '<span type="button" class="btn btn-secondary post-delete-button"><img src="img/post/delete.png"/></span>';
		}
        m += '  <span class="menu-separator"></span>';
        m += post.markup.more(comment['idx']);
        */
		m += '</div>';
		
		
		m +=	'<div class="media post-info">';
		m +=		'<a class="media-left" href="#">';

        var src = 'img/no_primary_photo.png';
        if ( typeof comment['member']['idx_primary_photo'] != 'undefined' ) src = app.getDataURL(comment['member']['idx_primary_photo']);

		m +=		'<img class="media-object profile-image" src="'+src+'" alt="Generic placeholder image">';
		m +=		'</a>';
		m +=		'<div class="media-body">';
		m +=			'<div class="name">'+comment['user_name']+"</div>";
		m +=			'<div class="date" title="'+date_full+'">'+date+'</div>';
		m +=			'<div class="content">';
		m +=				'<div class="text">' + post.content(comment) + '</div>';
		if ( comment['photos'] ) m += comment['photos'];
		m +=			'</div>';
		m +=		'</div>';
		m +=	'</div>';
		
		m +=	'<nav class="btn-group post-menu-philzine-bottom pull-right">';
		m +=		'<span class="btn like"><span class="glyphicon glyphicon-thumbs-up"></span> Like <span class="no">'+likes+'</span></span>';
		m +=		'<div class="btn dropdown">';
		m +=			'<div class="dropdown-toggle" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">';
		m +=				'<span class="glyphicon glyphicon-option-horizontal"></span>';
		m +=			'</div>';
		m +=			'<ul class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu1">';
		m +=				'<li class="dropdown-item reply-button">Reply</li>';
		if( post.mine(comment) ) {
            m +=				'<li class="dropdown-item post-delete-button">Delete</li>';
            m +=				'<li class="dropdown-item post-edit-button">Edit</li>';
        }
        else {
		m +=				'<li class="dropdown-item report-button">Report</li>';
		}
		m +=			'</ul>';
		m +=		'</div>';
		m +=	'</nav>';
		
		/*
		m += ' 글번호 : '+comment['idx'];
		m += ' 글쓴이: ' + comment['user_name'];
		m += ' <span title="'+date_full+'">날짜: ' + date + '</span>';
		m += ' 수정, 메뉴 ';
        m += '<div class="content">' + post.content(comment) + '</div>';
		
		if ( comment['photos'] ) m += comment['photos'];
		*/
		
		//m += ' <span class="reply-button">Reply</span>, 추천, 비추천';
		m += '</div>';
		return m;
    },
    render_post_edit : function ( $post ) {
        var idx = $post.attr('idx');
        var gid = $post.attr('gid');
        var subject = $post.find('.subject').text();
        var content = $post.find('.content').text();
        var photos = '';
        $post.find('.photos img').each(function(index){
            var $this = $(this);
            var idx = $this.attr('idx');
            var url_thumbnail = $this.prop('src');
            var url = $this.attr('org');
            photos += html.render_photo({idx:idx, url: url, url_thumbnail: url_thumbnail});
        });

        var m = '';
        m += '<form class="post-edit-form" idx="'+idx+'" action="'+app.getServerURL()+'" method="post" enctype="multipart/form-data">';
        m += '  <input type="hidden" name="module" value="ajax">';
        m += '  <input type="hidden" name="action" value="post_edit_submit">';
        m += '  <input type="hidden" name="idx" value="'+idx+'">';
        m += '  <input type="hidden" name="gid" value="'+gid+'">';
        m += "  <input type='hidden' name='idx_member' value='"+member.idx+"'>";
        m += "  <input type='hidden' name='session_id' value='"+member.session_id+"'>";
		
		m += "  <div class='post-content-wrapper'>";
		
        m += post.edit_subject(subject);
        m += post.edit_content(content);
        m += html.photos(idx, photos); // .photos must exists.
		
		m += "</div>";

		m += '<div class="row commands">';
		m += '	<div class="col-xs-4">';
        m += 		this.filebox();
		m += '	</div>';
		m += '	<div class="col-xs-4">';
        m += 		post.edit_cancel();
		m += '	</div>';
		m += '	<div class="col-xs-4">';
        m += '		<input type="submit" value="Update">';
		m += '	</div>';
        m += '</form>';
		m += '</div>';

        m = '<div class="post-edit" idx="'+idx+'">' + m + '</div>';
        $post.after( m );
    },
    /**
     *
     * '.photo' 클래스의 HTML 값을 리턴한다.
     * 이것은 나중에 '.photos' 로 감싸져야 한다.
     * @usage 이 함수를 사용하기 위해서는 아래의 값만 들어오면 된다.
     *  - data['idx']
     *  - data['url_thumbnail']
     * @param data
     */
    render_photo : function (data) {
        //trace('render_photo');
        //trace(data['idx']);
        if (_.isUndefined(data['url'])) alert('url of photo is empty');
        if (_.isUndefined(data['idx'])) alert('idx of photo is empty');
        var m = '<div class="photo" idx-data="'+data['idx']+'">';
        m += '<span class="glyphicon glyphicon-remove photo-delete-button"></span>';
        m += '<img idx="'+data['idx']+'" src="'+data['url_thumbnail']+'" org="'+data.url+'">';
        m += '</div>';
        //trace(m);
        return m;
    },
    login_form : function () {
        var m;

        if ( member.idx ) {
            m = '<h1>User Login</h1>';
            m += "<p>You have already logged in as <b>" + member.id + '</b></p>';
            m += '<p>'+member.primary_photo()+'</p>';
            m += '<nav class="navbar navbar-default logout-button">';
            m += '<p class="navbar-brand">Logout</p>';
            m += '</nav>';
        }
        else {
            m = 	'<div class="form-wrapper">';
            m += 	'<form class="member-login-form login">';
            m += 	'<div class="input-group username">';
            m += 	'<input name="id" type="text" class="form-control" placeholder="Enter username">';
            m += 	'<span class="input-group-addon glyphicon glyphicon-user"></span>';
            m += 	'</div>';
            m += 	'<div class="input-group password">';
            m += 	'<input name="password"  type="password" class="form-control" placeholder="Enter password">';
            m += 	'<span class="input-group-addon glyphicon glyphicon-lock"></span>';
            m += 	'</div>';
            m += 	'<input type="submit" class="btn btn-primary" value="Login">';
            m += 	'<a class="forgot-password" href="#">Forgot Password?</a>';
            m += 	'</form>';
            m += 	'</div>';
        }
        return m;
    },
    photos : function ( idx, photos ) {
        return '<div class="photos" idx="'+idx+'">' + photos + '</div>';
    },
    page : {
        setting : function () {
            var m = '';
            m += '<div class="page-header">';
            m += '  <h1>설정 <small>필리핀매거진 {{version}}</small></h1>';
            m += '</div>';
            m += '<ul class="list-group">';
            m += '  <li class="list-group-item"><div class="reset">Reset</div></li>';
            m += '  <li class="list-group-item">Refresh</li>';
            m += '  <li class="list-group-item"><div class="change-server-button">Change Server - {{url_server}}</div></li>';
            m += '  <li class="list-group-item"><a href="http://work.jaeho.org/apps/philzine2/platforms/android/build/outputs/apk/android-debug.apk">Download Debugging APK</a></li>';
            m += '</ul>';
            return _.template(m)(app);
        }
    },
    update_primary_photo : function ( data ) {
        trace(data);
        el.primary_photo().prop('src', data.url);
        member.update_photo_idx(data.idx);
    },
    focus : function ($obj) {
        setTimeout(function(){
            $obj.focus();
        }, 100);
    },
    /**
     * widget 폴더의 HTML 을 로드해서 화면에 보여준다.
     *
     *      1. 먼저 캐시된 정보를 보여준다.
     *      2. 캐시된 정보가 없으면,
     *          - 오프라인이면 로컬 widget 폴더의 HTML 파일을 로드해서 보여주고
     *          - 온라인이면 서버 widget 폴더의 HTML 파일을 로드해서 보여 준다.
     *
     * @attention 이 함수는 캐시는 하지만 게시판이나 Endless load 를 보여주지는 않는다.
     * @param widget_name
     */
    setWidget : function ( widget_name ) {

        if (app.online()) {
            return cache.update(widget_name);
        }

        this.setLocalWidget( widget_name );
    },
    /**
     *
     *
     * 서버의 Widget HTML 을 로드하지 않고 그냥 로컬의 widget html 정보만 로드해서 보여준다.
     *  즉, 앱을 컴파일 할 때, 같이 추가한 HTML 과 이미지를
     *      앱 내부의 Widget 폴더에서만 보여 줄 때 사용한다.
     *
     * @param widget_name
     * @returns {*}
     */
    setLocalWidget : function ( widget_name ) {
        if ( debug.not_started() ) {
            var data = db.get( widget_name );
            if ( data ) return html.setContentWithCacheMark(widget_name, data);
        }

        ajax_load('widget/'+widget_name+'.html', function(markup){
            trace(markup);
            if ( markup ) {
                var re = {
                    html: markup,
                    length: markup.length,
                    md5: ''
                };
                save_page( widget_name, re );
                html.setContent(re.html, widget_name);
                note.post('html.setWidget() : ' + name + ' 페이지를 로드하였습니다.');
                app.setCurrentForum('');
            }
        }, true);
    },
    setContentWithCacheMark : function (widget_name, data) {
        var stamp = parseInt(db.get(widget_name + '.stamp')) / 1000;
        var date = etc.date_full(stamp);
        html.setContent( data + '<div class="cache-mark">cached at : '+date+'</div>', widget_name );
    }
};
