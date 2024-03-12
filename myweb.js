var toggleBtn;
var menu;
var login;

// header 불러오기
$(function () { //함수가 정의되자 마자 즉시 실행    
    $("#head").load("header.html", function () {
        // 헤더 로드 시 반응형 토글버튼 로딩
        toggleBtn = document.querySelector('.navbarTogle');
        menu = document.querySelector('#topMenu');
        login = document.querySelector('#login');

        toggleBtn.addEventListener("click", function () {
            menu.classList.toggle('active');
            login.classList.toggle('active');
        });
    });
});

// footer 불러오기
$(function () {
    $("#foot").load("footer.html");
});


// 회원가입 개인정보 동의
// 먼저 로딩되어야만 
let agreeButton;
$(document).ready(function () {
    $(function () {
        agreeButton = $('#agreeCh2');
        agreeButton.on('click', agreeClick);
    });
});

// 개인정보약관 폼 동의 및 숨기기
function agreeClick(event) {
    let agreeCheckbox = $('#agreeCh');
    if (!agreeCheckbox.prop('checked')) {
        // prop 속성의 true, false값을 가져온다.
        alert("약관에 동의해야 가입이 가능합니다.");
    } else {
        $('.articles.hidden').removeClass('hidden');
        $('.articles.agree').css('display', 'none');
    }
}

// 회원가입 버튼 작동
let joinButton;
$(document).ready(function () {
    joinButton = $('#joinCheck');
    joinButton.on('click', joinCheck);
});


// 회원가입 유효성 검사
function joinCheck(event) {
    let id = $('#id').val();
    let password = $('#password').val();
    let password2 = $('#password2').val();
    let name = $('#name').val();
    let email = $('#email').val();

    if (id.trim() === "") {
        alert("id를 입력하세요.");
        $('#id').focus();
        return false;
    }

    if (password !== password2) {
        alert("비밀번호를 확인해주세요.");
        $('#password').focus();
        return false;
    }

    if (password.length < 6) {
        alert("비밀번호는 최소 6자 이상이어야 합니다.");
        $('#password').focus();
        return false;
    }

    if (name.trim() === "") {
        alert("이름을 입력하세요.");
        $('#name').focus();
        return false;
    }

    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("올바른 이메일 주소를 입력하세요.");
        $('#email').focus();
        return false;
    }

    alert("회원가입이 완료되었습니다!");
    return document.location = "/myweb/loginForm.html";
}

// 로그인 버튼 작동
let loginButton;
$(function () {
    loginButton = $('#login2');
    loginButton.on('click', loginCheck);
});

let loginId = '';
let loginPassword = '';
let id = "user";
let password = 123456;

// 로그인 유효성 체크
function loginCheck(event) {
    loginId = $('#id').val();
    loginPassword = $('#password').val();

    if (loginId === "") {
        alert("id를 입력하세요.");
        $('#id').focus();
    }
    else if (loginPassword === "") {
        alert("비밀번호를 입력하세요.");
        $('#password').focus();
    }

    else if (id != loginId || password != loginPassword) {
        alert('로그인 실패. 아이디 또는 비밀번호를 확인하세요.');
        return document.location = "/myweb/loginForm.html";
    } else {
        alert('로그인 성공! 환영합니다, ' + loginId + ' 님!');
        return document.location = "/myweb/index.html";
    }
};

// 숙박 검색 

$(document).ready(function () {

    var api_key = "SYJfCL6jOiTbw26YtZ0oBlbyN4zj9uzyHS0SCJ%2FSe2lPSatxE8s9%2B7TIKQE46pj3NTeuEtUGJ%2BGWVtFEYDGjVA%3D%3D";

    $("#btn_load").click(function () {

        var numOfRows = $("#row").val();
        var areaCode = 35; // 경상북도
        var sigunguCode = $("#sigungu").val();

        var url = `http://apis.data.go.kr/B551011/KorService1/searchStay1?serviceKey=${api_key}&numOfRows=${numOfRows}&pageNo=1&MobileOS=ETC&MobileApp=AppTest&arrange=A&listYN=Y&areaCode=${areaCode}&sigunguCode=${sigunguCode}&_type=json`;

        $.ajax({
            url: url,
            type: "GET",
            success: function (data, status) {
                (status == "success") && parseJSON(data);
            },
        });

    });

    $("#btn_remove").click(function () {
        $("#demoJSON").empty();
    });
});

function parseJSON(jsonObj) {

    const table = [];
    let count = 1;
    table.push("<tr><th>번호</th><th>이미지</th><th>숙박명</th><th>주소</th><th>연락처</th><th>장소확인</th></tr>");
    for (row of jsonObj.response.body.items.item) {
        table.push(`
               <tr>
                
               <td>${count++}</td>
               <td><img src="${row.firstimage2}" id="houseImg" onerror="this.src='images/숙박대체이미지.png'" ></td>
                   <td>${row.title}</td>
                   <td>${row.addr1}</td>
                   <td>${row.tel}</td>
                   <td><a href="https://map.naver.com/v5/search/${row.mapy},${row.mapx}" target="_blank">지도보기</a></td>
                 
               </tr>

               `);
    }
    $("#demoJSON").html(table.join('\n'));

}


// 오시는 길 - js 작성
function myMap() {
    let lat, lng;
    [lat, lng] = [36.57607, 128.5055];

    const mapProp = {
        center: new google.maps.LatLng(lat, lng),
        zoom: 17,
    };
    const map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

    // 마커 지정
    const myPos1 = { lat: lat, lng: lng };
    let marker1 = new google.maps.Marker({ position: myPos1 });
    marker1.setMap(map);

}








