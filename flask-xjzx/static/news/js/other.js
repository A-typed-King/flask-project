// 解析url中的查询字符串
function decodeQuery() {
    var search = decodeURI(document.location.search);
    return search.replace(/(^\?)/, '').split('&').reduce(function (result, item) {
        values = item.split('=');
        result[values[0]] = values[1];
        return result;
    }, {});
}

// news_collect
$(function () {
    $(".focused").click(function () {
        // alert('aaaa');
        $.post('/user/follow_info', {
            'csrf_token': $('#csrf_token').val(),
            'action': 2,
            'follow_user_id': $('#user_id').val()
        }, function (data) {
            if (data.result == 1) {
                $('.login_btn').click();
            } else if (data.result == 2) {
                $('.focus').show();
                $('.focused').hide();
                $('.follows>b').text(data.follow_count);
            }
        })
    });

    // 取消关注当前新闻作者
    $(".focus").click(function () {
        $.post('/user/follow_info', {
            'csrf_token': $('#csrf_token').val(),
            'action': 1,
            'follow_user_id': $('#user_id').val()
        }, function (data) {
            if (data.result == 1) {
                $('.login_btn').click();
            } else if (data.result == 2) {
                $('.focus').hide();
                $('.focused').show();
                $('.follows>b').text(data.follow_count);
            }
        })
    })

});

