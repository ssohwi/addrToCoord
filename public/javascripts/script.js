(function ($) {
    "use strict";
    var loading = false;    //중복실행여부 확인 변수

    function insertCoord(i, x, y){
        $.ajax({
            url: '/insertCoord',
            dataType: 'text',
            type: 'post',
            data: {longitude: x, latitude: y, seq: $('#seq'+i).text()},
            success : function(result){
                console.log(result);
            }
            , error: function (e) {
                alert('오류가 발생했습니다.:'+e);
            }
        });
    }

    function checkSearch(i, x, y) {
        var url = 'https://dapi.kakao.com//v2/local/geo/coord2address.json?'
            +'x=' + x
            +'&y=' + y;
        $.ajax({
            url: url
            , type: 'GET'
            , headers: {'Authorization': 'KakaoAK c1fa8ffb545df848bb27890e8e88e4c0'}
            , success:function(data){
                if(data.documents.length!==0)
                {
                    var item = data.documents[0];
                    $('#check'+i).text(item.address.address_name);
                    insertCoord(i, x, y);
                }
            }
            , error: function (e) {
                alert('오류가 발생했습니다.:'+e);
            }
        });
    };

    function addrSearch(i) {
        if($('#adres'+i).text() !== '') {
            var query = $('#adres'+i).text();
            var url = 'https://dapi.kakao.com/v2/local/search/address.json?'
                +'query=' + query
                +'&analyze_type=' + 'exact'

            $.ajax({
                url: url
                , type: 'GET'
                , headers: {'Authorization': 'KakaoAK c1fa8ffb545df848bb27890e8e88e4c0'}
                , success:function(data){
                    if(data.documents.length!==0)
                    {
                        var item = data.documents[0];
                        var x = item.x; // 경도(longitude)
                        var y = item.y; // 위도(latitude)

                        $('#coord'+i).text(x + ',' + y);
                        checkSearch(i, x, y);
                        loading = false;    //실행 가능 상태로 변경
                    }
                }
                , error: function (e) {
                    alert('오류가 발생했습니다.:'+e);
                }
            });
        }

    };

    var initSet = function () {
        if(!loading) //실행 가능 상태
        {
            for(var i=0; i< $('#adresTable > tbody tr').length; i++){
                loading = true; //실행 불가능 상태로 변경
                addrSearch(i);
            }
        } else //실행 불가능 상태
        {
            alert('로딩중입니다.');
        }
    };

    var initEvent = function () {
    };


    $(document).ready(function () {
        initSet();
        initEvent();
    });

})(jQuery);
