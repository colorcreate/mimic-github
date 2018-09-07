var filterList = $('.filter-list')
var flTop = filterList[0].offsetTop
var nav = $('.UnderlineNav-body')
var navTop = nav[0].offsetTop
var user = $('.user-profile-mini-vcard')
var bio = $('.profile-bio')
var userBottom = bio[0].offsetTop
function getQuery(){
    var query = {
        tab: 'overview'
    }
    var search = window.location.search.substring(1).split('&')
    search.forEach(function(item){
        var x = item.split('=')
        query[x[0]] = x[1]
    })
    return query
}
function setQuery(queries){
    var origin = window.location.origin
    var path = window.location.pathname
    var query = new Array()
    for(var item in queries){
        query.push(item+'='+queries[item])
    }
    window.history.replaceState( {} , 'github', origin+path+'?'+query.join('&'));
}
function initTab(){
    var query = getQuery()
    var tab = query.tab || ""
    var name = tab.charAt(0).toUpperCase() + tab.slice(1)
    var $tab = $('.UnderlineNav-item[title="'+ name +'"]')
    $tab.addClass('selected')
    $tab.siblings().removeClass('selected')

    var $mainTab = $('.main-tab-content[tab="'+ tab +'"]') 
    $mainTab.addClass('selected')
    $mainTab.siblings().removeClass('selected')
    controlTab(tab)
}
function controlTab(tab){
    if(!tab || tab == 'overview'){
        filterList = $('.filter-list')
        flTop = filterList[0].offsetTop
    }
}
$('input.header-search-input').on('focus', function(){
    $(this).closest('.header-search-wrapper').addClass('active')
})
$('input.header-search-input').on('blur', function(){
    $(this).closest('.header-search-wrapper').removeClass('active')
})
$('.header-user-link .dropdown').on('click', function(e){
    $('.item-detail').removeClass('active')
    if($(this).hasClass('active')){
        $('.dropdown').removeClass('active')
    } else {
        $('.dropdown').removeClass('active')
        $(this).addClass('active')
    }
    e.stopPropagation()
})
$('summary.btn-link').on('click', function(e){
    $('.dropdown').removeClass('active')
    var $parent = $(this).closest('.item-detail')
    if($parent.hasClass('active')){
        $('.item-detail').removeClass('active')
    } else {
        $('.item-detail').removeClass('active')
        $parent.addClass('active')
    }
    e.stopPropagation()
})
$(window).on('click', function(e){
    var $this = $(e.target)
    if(!$this.closest('.dropdown-menu').hasClass('dropdown-menu')){
        $('.item-detail').removeClass('active')
        $('.dropdown').removeClass('active')
    }
})
$(window).on('scroll', function(){
    var scrollTop = document.documentElement.scrollTop
    if(scrollTop < navTop) {
        nav.css({
            position: 'static'
        })
    } else {
        nav.css({
            position: 'fixed',
            zIndex: 1000,
            top: '0px',
            width: nav[0].offsetWidth
        })
    }
    if(scrollTop < userBottom){
        user.removeClass('isStick')
    } else {
        user.addClass('isStick')
    }
    if(scrollTop + 105 < flTop) {
        filterList.css({
            position: 'static'
        })
    } else {
        filterList.css({
            position: 'fixed',
            top: '74px',
            width: filterList[0].offsetWidth
        })
    }
})
$('button.discution-item-header').on('click', function(){
    $(this).closest('.profile-rollup-wrapper').toggleClass('open')
})
$('rect').on('mouseenter', function(e){
    var $svg = $('.svg-tip')
    var date = new Date(this.dataset.date)
    var count = this.dataset.count
    var Months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Des']
    var format = Months[date.getMonth()] +' '+ date.getDate() + ', '+ date.getFullYear()
    
    $svg.html('<strong>'+(+count || 'No')+" contributions"+'</strong> on '+format)
    $svg.css({
        top: e.pageY - $svg[0].offsetHeight - 9,
        left:e.pageX - $svg[0].offsetWidth/2,
        zIndex: 1000
    })
})
$('rect').on('mouseleave', function(e){
    var $svg = $('.svg-tip')
    $svg.css({
        top: 0,
        left:0,
        zIndex: -1
    })
})
$('.UnderlineNav-item').on('click', function(){
    var tab = $(this).attr('title').toLowerCase()
    var query = getQuery()
    if(!tab || tab == query.tab) return
    setQuery({tab: tab})
    initTab()
})
function initRepository(){
    var colorlan = {
        "Javascript": '#f1e05a',
        "HTML": '#e34c26',
        "CSS": '#563d7c',
        "Go": '#375eab',
        "C#": '#178600',
        "Default":'#a9a9a9'
    }
    var SVG = ['<svg width="155" height="30"> <defs> <linearGradient id="gradient-144095614" x1="0" x2="0" y1="1" y2="0"> <stop offset="10%" stop-color="#c6e48b"></stop> <stop offset="33%" stop-color="#7bc96f"></stop> <stop offset="66%" stop-color="#239a3b"></stop> <stop offset="90%" stop-color="#196127"></stop> </linearGradient> <mask id="sparkline-144095614" x="0" y="0" width="155" height="28"> <polyline transform="translate(0, 28) scale(1,-1)" points="0,6.46 3,11.24 6,2.37 9,1.0 12,3.73 15,3.73 18,4.41 21,6.46 24,5.1 27,3.73 30,6.46 33,5.1 36,1.6800000000000002 39,3.05 42,4.41 45,6.46 48,6.46 51,4.41 54,9.2 57,7.15 60,24.9 63,3.05 66,16.02 69,15.34 72,28.32 75,29.0 78,9.2 81,5.78 84,13.29 87,11.93 90,6.46 93,9.88 96,3.05 99,2.37 102,2.37 105,7.83 108,2.37 111,1.6800000000000002 114,4.41 117,1.0 120,5.78 123,3.73 126,1.0 129,1.0 132,9.2 135,11.93 138,3.73 141,11.24 144,1.0 147,1.0 150,1.0 153,1.0 " fill="transparent" stroke="#8cc665" stroke-width="2"> </polyline></mask> </defs> <g transform="translate(0, 2.0)"> <rect x="0" y="-2" width="155" height="30" style="stroke: none; fill: url(#gradient-144095614); mask: url(#sparkline-144095614)"></rect> </g> </svg>',
                '<svg width="155" height="30"> <defs> <linearGradient id="gradient-144965925" x1="0" x2="0" y1="1" y2="0"> <stop offset="10%" stop-color="#c6e48b"></stop> <stop offset="33%" stop-color="#7bc96f"></stop> <stop offset="66%" stop-color="#239a3b"></stop> <stop offset="90%" stop-color="#196127"></stop> </linearGradient> <mask id="sparkline-144965925" x="0" y="0" width="155" height="28"> <polyline transform="translate(0, 28) scale(1,-1)" points="0,3 3,1 6,1 9,13 12,4 15,1 18,12 21,3 24,1 27,5 30,7 33,11 36,3 39,8 42,3 45,10 48,1 51,1 54,1 57,1 60,2 63,3 66,1 69,1 72,1 75,1 78,1 81,1 84,1 87,1 90,1 93,1 96,1 99,1 102,15 105,2 108,1 111,1 114,2 117,1 120,1 123,1 126,2 129,3 132,1 135,1 138,1 141,1 144,1 147,1 150,1 153,1 " fill="transparent" stroke="#8cc665" stroke-width="2"> </polyline></mask> </defs> <g transform="translate(0, -5)"> <rect x="0" y="-2" width="155" height="30" style="stroke: none; fill: url(#gradient-144965925); mask: url(#sparkline-144965925)"></rect> </g> </svg>',
                '<svg width="155" height="30"> <defs> <linearGradient id="gradient-144935299" x1="0" x2="0" y1="1" y2="0"> <stop offset="10%" stop-color="#c6e48b"></stop> <stop offset="33%" stop-color="#7bc96f"></stop> <stop offset="66%" stop-color="#239a3b"></stop> <stop offset="90%" stop-color="#196127"></stop> </linearGradient> <mask id="sparkline-144935299" x="0" y="0" width="155" height="28"> <polyline transform="translate(0, 28) scale(1,-1)" points="0,7 3,1 6,1 9,5 12,2 15,1 18,1 21,5 24,6 27,1 30,1 33,1 36,1 39,1 42,1 45,1 48,4 51,4 54,1 57,1 60,4 63,1 66,2 69,2 72,1 75,2 78,1 81,1 84,1 87,2 90,1 93,1 96,1 99,1 102,2 105,6 108,1 111,1 114,1 117,1 120,1 123,1 126,1 129,3 132,1 135,1 138,1 141,1 144,1 147,1 150,1 153,1 " fill="transparent" stroke="#8cc665" stroke-width="2"> </polyline></mask> </defs> <g transform="translate(0, -9)"> <rect x="0" y="-2" width="155" height="30" style="stroke: none; fill: url(#gradient-144935299); mask: url(#sparkline-144935299)"></rect> </g> </svg>',
                '<svg width="155" height="30"> <defs> <linearGradient id="gradient-114436032" x1="0" x2="0" y1="1" y2="0"> <stop offset="10%" stop-color="#c6e48b"></stop> <stop offset="33%" stop-color="#7bc96f"></stop> <stop offset="66%" stop-color="#239a3b"></stop> <stop offset="90%" stop-color="#196127"></stop> </linearGradient> <mask id="sparkline-114436032" x="0" y="0" width="155" height="28"> <polyline transform="translate(0, 28) scale(1,-1)" points="0,1 3,1 6,1 9,1 12,1 15,1 18,1 21,1 24,1 27,1 30,1 33,1 36,1 39,1 42,6 45,1 48,1 51,1 54,1 57,1 60,1 63,1 66,1 69,1 72,1 75,1 78,1 81,1 84,1 87,1 90,1 93,1 96,1 99,1 102,1 105,3 108,1 111,1 114,1 117,1 120,1 123,1 126,1 129,1 132,1 135,1 138,1 141,1 144,1 147,1 150,1 153,1 " fill="transparent" stroke="#8cc665" stroke-width="2"> </polyline></mask> </defs> <g transform="translate(0, -10)"> <rect x="0" y="-2" width="155" height="30" style="stroke: none; fill: url(#gradient-114436032); mask: url(#sparkline-114436032)"></rect> </g> </svg>',
                '<svg width="155" height="30"> <defs> <linearGradient id="gradient-114796177" x1="0" x2="0" y1="1" y2="0"> <stop offset="10%" stop-color="#c6e48b"></stop> <stop offset="33%" stop-color="#7bc96f"></stop> <stop offset="66%" stop-color="#239a3b"></stop> <stop offset="90%" stop-color="#196127"></stop> </linearGradient> <mask id="sparkline-114796177" x="0" y="0" width="155" height="28"> <polyline transform="translate(0, 28) scale(1,-1)" points="0,1 3,1 6,1 9,1 12,1 15,1 18,1 21,1 24,1 27,1 30,1 33,1 36,1 39,1 42,9 45,1 48,1 51,1 54,1 57,1 60,1 63,1 66,1 69,1 72,1 75,1 78,1 81,1 84,1 87,1 90,1 93,1 96,1 99,1 102,1 105,1 108,1 111,1 114,1 117,1 120,1 123,1 126,1 129,1 132,1 135,1 138,1 141,1 144,1 147,1 150,1 153,1 " fill="transparent" stroke="#8cc665" stroke-width="2"> </polyline></mask> </defs> <g transform="translate(0, -8)"> <rect x="0" y="-2" width="155" height="30" style="stroke: none; fill: url(#gradient-114796177); mask: url(#sparkline-114796177)"></rect> </g> </svg>']
    var repo = [{
        "name": "repo",
        "updated":"18 hours ago"
    }, {
        "name": "banana",
        "lan": "Javascript",
        "updated": "11 days ago"
    }, {
        "name": "ace",
        "fork":{
            "link": "ajaxorg/ace",
            "num":"4012"
        },
        "des":"Ace (Ajax.org Cloud9 Editor)",
        "lan": "Javascript",
        "updated": "29 days ago"
    }, {
        "name": "showdown",
        "fork":{
            "link": "showdownjs/showdown",
            "num":"1081"
        },
        "des": "A bidirectional MD to HTML to MD converter written in Javascript",
        "lan": "Javascript",
        "updated": "29 days ago"
    }, {
        "name": "computer-science",
        "fork":{
            "link": "ossu/computer-science",
            "num":"4861",
            "license":"MIT"
        },
        "des":"🎓 Path to a free self-taught education in Computer Science!",
        "updated": "Jul 9"
    }, {
        "name": "colorcreate.github.io",
        "lan": "HTML",
        "updated": "May 15"
    }, {
        "name": "calculator_time",
        "lan": "CSS",
        "updated": "May 15"
    }, {
        "name": "golang_doc",
        "lan": "Go",
        "updated": "Mar 16"
    }, {
        "name": "primeCount",
        "lan": "CSS",
        "updated":"Dec 20, 2017"
    }, {
        "name": "replit",
        "lan": "CSS",
        "updated":"Dec 18, 2017"
    }, {
        "name": "prime",
        "lan":"Javascript",
        "updated":"Dec 16, 2017"
    }, {
        "name": "snake_game",
        "lan":"Javascript",
        "updated":"Oct 30, 2017"
    }, {
        "name": "game_of_life",
        "lan":"Javascript",
        "updated":"Oct 29, 2017"
    }, {
        "name": "Firebase",
        "lan":"HTML",
        "updated":"Sep 11, 2017"
    }, {
        "name": "Algorithm",
        "lan": "C#",
        "des": "Learning c # Algorithm technique based on the type of problem",
        "updated":"Sep 6, 2017"
    }, {
        "name": "new",
        "lan": "Javascript",
        "updated": "Aug 30, 2017"
    }, {
        "name": "Portofolio",
        "lan": "Javascript",
        "updated":"Aug 30, 2017"
    }, {
        "name": "cheat_sheet",
        "des": "cheat sheet, cheat sheet, cheat sheet",
        "updated": "Aug 23, 2017"
    }, {
        "name": "cSharp_basic",
        "lan": "C#",
        "des": "Learning c # basic problems from internet other than codewar, hackerrank, etc.",
        "updated":"Aug 21, 2017"
    }, {
        "name": "awesome-markdown",
        "fork":{
            "link": "mundimark/awesome-markdown",
            "num":"46"
        },
        "des": "A collection of awesome markdown goodies (libraries, services, editors, tools, cheatsheets, etc.)",
        "updated":"Jul 26, 2017"
    }, {
        "name": "Final",
        "lan":"C#",
        "updated":"Jul 20, 2017"
    }, {
        "name": "ComicBook",
        "lan": "C#",
        "updated":"Jul 22, 2017"
    }, {
        "name": "FitnessFrogTest",
        "lan": "C#",
        "updated": "Jun 22, 2017"
    }, {
        "name": "hackerrank",
        "des": "Trying to solve hackerrank problem",
        "updated": "Jun 13, 2017"
    }, {
        "name": "codewars",
        "des": "Trying to solve codewars problem",
        "updated": "Jun 10, 2017"
    }, {
        "name": "OOP",
        "lan": "C#",
        "des":"belajar c# di Makers",
        "updated":"May 31, 2017"
    }, {
        "name": "Bing",
        "lan": "C#",
        "updated":"May 30, 2017"
    }, {
        "name": "JSON",
        "lan":"C#",
        "updated":"May 29, 2017"
    }, {
        "name": "FirstRun",
        "lan": "C#",
        "updated": "May 29, 2017"
    }]
    function genitemli(data){
        var $li = $('<li class="repo-filter-item">')
        
        //header
        var $header = $('<div class="repo-header"></div>')
        $header.append('<h3><a href="#">'+ data.name)
        if(data.fork && data.fork.link)  $header.append('<span>Forked from <a href="#">'+ data.fork.link+'</a></span>')
            
        //des
        var $des = $('<div class="repo-des"></div>')
        if(data.des) $des.append('<p>'+ data.des+'</p>')
        $des.append('<span class="repo-graph">'+SVG[Math.floor(Math.random()*SVG.length)])
        // detail
        var $detail = $('<div class="repo-detail"></div>')
        if(data.lan) $detail.append('<span class="repo-language-color" style="background-color:'+ (colorlan[data.lan] || colorlan.Default)+'"></span><span class="programmingLanguage">'+ data.lan +'</span>')
        if(data.fork && data.fork.num) $detail.append('<a href="#" class="repo-fork"><svg aria-label="fork" class="octicon octicon-repo-forked" viewBox="0 0 10 16" version="1.1" width="10" height="16" role="img"><path fill-rule="evenodd" d="M8 1a1.993 1.993 0 0 0-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 0 0 2 1a1.993 1.993 0 0 0-1 3.72V6.5l3 3v1.78A1.993 1.993 0 0 0 5 15a1.993 1.993 0 0 0 1-3.72V9.5l3-3V4.72A1.993 1.993 0 0 0 8 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"></path></svg>'+ data.fork.num +'</a>')
        if(data.fork && data.fork.license) $detail.append('<span><svg class="octicon octicon-law mr-1" viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7 4c-.83 0-1.5-.67-1.5-1.5S6.17 1 7 1s1.5.67 1.5 1.5S7.83 4 7 4zm7 6c0 1.11-.89 2-2 2h-1c-1.11 0-2-.89-2-2l2-4h-1c-.55 0-1-.45-1-1H8v8c.42 0 1 .45 1 1h1c.42 0 1 .45 1 1H3c0-.55.58-1 1-1h1c0-.55.58-1 1-1h.03L6 5H5c0 .55-.45 1-1 1H3l2 4c0 1.11-.89 2-2 2H2c-1.11 0-2-.89-2-2l2-4H1V5h3c0-.55.45-1 1-1h4c.55 0 1 .45 1 1h3v1h-1l2 4zM2.5 7L1 10h3L2.5 7zM13 10l-1.5-3-1.5 3h3z"></path></svg>'+ data.fork.license+'</span>')
        $detail.append('<span>Updated on '+ data.updated+'</span>')

        return $li.append($header, $des, $detail)
    }
    var $ul = $('<ul class="repo-filter">')
    repo.forEach(function(item){
        $ul.append(genitemli(item))
    })

    $('.main-tab-content[tab="repositories"]').append($ul)
}
function controlRepo(){
    $('.select-btn').on('click', function(e){
        $(this).toggleClass('selected')
        $(this).closest('.select-menu').toggleClass('selected')

        var $siblings = $(this).closest('.select-menu').siblings()
        $siblings.removeClass('selected')
        $siblings.find('.select-btn').removeClass('selected')
        e.stopPropagation()
    })
    $('.select-menu-item').on('click', function(){
        $(this).addClass('selected')
        $(this).siblings().removeClass('selected')
    })
    $('.follow-item .follow-button button').on('click', function(){
        $(this).closest('.follow-button').toggleClass('on')
    })
    $(window).on('click', function(e){
        var $target = $(e.target)
        var $svg = $target.closest('svg')
        var $modal = $target.closest('.select-menu-modal')
        if(!$modal.length || $svg.hasClass('js-menu-close')){
            $('.select-menu').removeClass('selected')
            $('.select-menu .select-btn').removeClass('selected')
        }
    })
}
initTab()
initRepository()
controlRepo()