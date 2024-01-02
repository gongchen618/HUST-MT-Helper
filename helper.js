    // ==UserScript==
    // @name         HUST华中科技大学军理线上作业简易自动填充助手
    // @namespace    https://github.com/gongchen618
    // @version      0.1
    // @description  hust junli answer auto fulfill
    // @author       gongchen618
    // @match        http://bookcenter.hustp.com/exercises/*
    // @grant        none
    // @require      https://lib.baomitu.com/jquery/3.6.0/jquery.min.js
    // ==/UserScript==

    $('head').append('<link href="https://lib.baomitu.com/layui/2.6.8/css/layui.css" rel="stylesheet" type="text/css" />');
    $('head').append('<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>')
    $.getScript("https://lib.baomitu.com/layui/2.6.8/layui.js", function(data, status, jqxhr) {
        layui.use('element', function(){
            var element = layui.element;
        });
        layer.closeAll();
        init();
        window.onhashchange = function() {
            layer.closeAll();
            init();
        };
    });

    function init() {
        init_answer();
        show();
    }


    var answer = new Array();
    function init_answer() {
        answer[1528] = "B,D,D,C,A,A,B,B,C,C,B,C,A,B,A,A,D,B,D,B,C,C,A,A,A,B,A,B,B,B,ABCDE,ABCD,ACD,BD,ABCD,ABCE,ABCE,AD,ABC,AC,ABC,ABCD,ACD,ABD,AD,BC,ABD,ABCD,ABCD,ABC,ABC,AB,ABCD,ABCD,ABCD,ABCD,ABC,ABC,ABC,ABCD"
        answer[1529] = "C,B,C,A,B,D,A,D,C,A,B,C,D,B,C,ABCDE,ABCD,BCDE,ABDE,ACD,ABCDE,ABDE,ACD,ABCDE,ABCDE,ABCDE,ABCE,ABE,ABDE,ACD"
        answer[1530] = "A,C,D,A,B,A,D,C,B,A,A,C,A,D,C,ABC,ABCD,ABC,ABCD,ABC,ABC,ABCD,ABC,ABCD,ABD,ABC,ABD,ABC,ABC,BCD"
        answer[1531] = "C,D,B,D,B,A,A,A,B,D,A,D,D,B,A,B,C,C,A,B,C,D,B,A,C,B,A,C,D,A,C,ABCE,ABCD,ABCD,ACD,ABCD,ABD,BCD,ABCDE,ABCD,ABCD,AB,ABCD,ABCDE,ABC,ABCD,ABCD,ABCD,ABCD,ABCD,BC,AB,ABCE,BCD,BC,ABC,ABC,BCD,ABCD,ABC"
        answer[1536] = "C,C,D,C,B,A,A,A,A,A,B,A,C,A,A,B,C,D,D,A,B,B,A,A,B,A,B,C,B,B,ABCD,ABC,ABC,ABCDEF,ABC,ABC,ABCD,ABCDE,ABCDE,ABCDEF,ABCDE,ABCDE,ABCD,ABCD,BCD,ACD,ABCD,ABCD,ABC,ABCDE,ABC,ABCDEF,ABCDEF,ABCD,ABCD,ABCD,ABCD,ABCD,ABCDE,ABCD"
        answer[1690] = "C,C,B,A,B,C,B,B,D,C,B,A,A,B,C,D,C,B,A,B,ABC,ABCD,ABC,ABCDE,ABC,ABCDE,ABCD,ABCDE,BCD,ABCD,ABCD,ABCD,ABD,ABCD,ABCDE,ABCD,ABC,ABCD,AB,ABCDE,ABCD,AB,ABCDE,ABC,ABCDEF,ABCD,ABC,ABCDEF,ABC,ABC"
    }

    var conf = {
        title: "HUST军理助手",
        datalist:{},
        time:1
    };

    function show() {
        layer.open({
            type: 1,
            area: ['200px', '150px'],
            offset: 'rb',
            id: 'msgt',
            closeBtn: 0,
            title: conf.title,
            shade: 0,
            maxmin: true,
            anim: 2,
            content: '<div id="msg"><blockquote class="layui-elem-quote layui-quote-nm"><button type="button" class="layui-btn layui-btn-normal start">点我自动填充答案<button></blockquote></div>'
        });
        $(".start").click(function() {
            start();
        })
    }

    function start(){
        var item_page_id = document.getElementById("exercises_id").value;
        var item_radio_boxes = document.getElementsByClassName("radio_box");

        if (answer[item_page_id] == null) { alert("未收录该作业答案"); return; }
        var problem_answer = answer[item_page_id].split(",");
        if (problem_answer.length != item_radio_boxes.length) { alert("答案与题数不符，请检查"); return; }

        for (var i = 0; i < problem_answer.length; i++) {
            for(let ans of problem_answer[i]) {
                var box = item_radio_boxes[i].querySelector('[value="'+ ans +'"]');
                if (box != null) box.click();
            }
        }
    }
